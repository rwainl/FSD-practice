/**
 *  FILE INI PERLU DILENGKAPI
 *
 * AI Service - Google Gemini Integration
 * Health E-Commerce AI Chatbot
 *
 * Tugas:
 * Implement AI chatbot yang kasih rekomendasi produk kesehatan
 *
 * CATATAN PENTING:
 * - Gunakan @google/generative-ai SDK (BUKAN axios langsung)
 * - Model default: "gemini-2.5-flash" (model yang tersedia untuk API key gratis)
 * - Bisa override dengan GOOGLE_AI_MODEL di .env
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Product = require("../models/Product");

class AIService {
  constructor() {
    this.apiKey = process.env.GOOGLE_AI_API_KEY;
    this.modelName = process.env.GOOGLE_AI_MODEL || "gemini-2.5-flash";
    this.cache = new Map();
    this.CACHE_TTL = 60 * 60 * 1000;

    if (!this.apiKey) {
      console.warn("GOOGLE_AI_API_KEY not set.");
      this.genAI = null;
    } else {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
    }
  }

  async getHealthRecommendation(userQuestion) {
    try {
      const cacheKey = useQuestion.toLowerCase().trim();
      const cached = this.responseCache.get(cacheKey);

      if (cached && Date.now() - cached - timestamp < this.CACHE_TTL) {
        console.log("Returning cached AI response");
        return { ...cached.data, cached: true };
      }

      const products = await Product.find({ isActive: true })
        .select("name category, price description manufacturer")
        .limit(12);

      if (products.length === 0) {
        return {
          success: false,
          message: "There are no products",
        };
      }

      const productList = products
        .map(
          (p) =>
            ` - ${p.name}: (${p.category}): ${p.description || "Medical Product"}. Harga: Rp. ${p.price.toLocaleString("id-ID")}. Produsen: ${p.manufacturer}`,
        )
        .join("\n");

      const prompt = `Anda adalah HealthBot, asisten apotek digital untuk aplikasi Health E-Commerce. 
Tugasmu membantu pengguna memilih produk kesehatan yang tepat berdasarkan keluhan atau kebutuhan mereka.

PRODUK YANG TERSEDIA DI TOKO KAMI:
${productList}

PERTANYAAN PENGGUNA:
"${userQuestion}"

INSTRUKSI JAWABAN:
1. Jawab dalam Bahasa Indonesia yang ramah, natural, dan mudah dipahami
2. Rekomendasikan MAKSIMAL 3 produk yang PALING relevan dengan pertanyaan
3. Jelaskan KENAPA setiap produk cocok untuk kebutuhan user (benefit-nya apa)
4. Sebutkan nama produk PERSIS seperti di list (penting untuk matching!)
5. Jangan recommend produk yang tidak ada di list
6. Akhiri dengan disclaimer: "Untuk kondisi serius, konsultasikan dengan dokter"
7. Format jawaban natural seperti berbicara dengan customer, bukan bullet points!

JAWABAN:`;

        const model = this.genAI.getGenerativeModel({ model: this.modelName });
        const sdkResult = await model.generateContent(prompt);
        const response = await sdkResult.response;
        const aiAnswer = response.text();

        const recommendations = this.extractRecommendations(aiAnswer, products);

        const result = {
          success: true,
          answer: aiAnswer,
          recommendedProducts: recommendations,
          totalAvailable: product.length,
          timestamps: new Date(),
        };

        this.cache.set(cacheKey, {
          date: result,
          timestamps: Date.now(),
        });

        return result;
    } catch (error) {
      console.error("Gemini AI error: ", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed connecting to AI service",
      });
    }
  }

  extractRecommendations(aiText, products) {
    const recommendation = [];

    products.forEach((product) => {
      const mentioned = aiText.toLowerCase().includes(product.name.toLowerCase());
      if(mentioned) {
        recommendation.push({
          id: product._id,
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
        });
      }
    })

    return recommendation.slice(0, 3);
  }

  clearCache() {
    this.cache.clear();
    console.log("AI cache cleared");
  }
}

module.exports = new AIService();