/**
 * AI Chatbot Service (STARTER)
 * TODO: Integrate dengan Google Gemini AI melalui backend
 * 
 * Learning objectives:
 * - Call backend API untuk AI chatbot
 * - Handle async AI responses
 * - Format AI recommendations
 */

import apiClient from './api';

// TODO 1: Implement sendChatMessage function
export const sendChatMessage = async (message, context = 'health_product_recommendation') => {
  // TODO: Send POST request to /api/external/ai/chat
  // TODO: Send message dan context in request body
  // TODO: Return response data
  // TODO: Handle errors dengan user-friendly message
  
  // HINT: try {
  // HINT:   const response = await apiClient.post('/api/external/ai/chat', {
  // HINT:     message,
  // HINT:     context
  // HINT:   });
  // HINT:   return response.data;
  // HINT: } catch (error) {
  // HINT:   console.error('AI Service Error:', error);
  // HINT:   throw new Error(
  // HINT:     error.message || 'Gagal menghubungi AI chatbot'
  // HINT:   );
  // HINT: }
};

// TODO 2: Implement getProductRecommendations function
export const getProductRecommendations = async (query) => {
  // TODO: Format query untuk product recommendations
  // TODO: Call sendChatMessage dengan formatted message
  // TODO: Return AI response
  
  // HINT: const message = `Berikan rekomendasi produk kesehatan untuk: ${query}`;
  // HINT: return await sendChatMessage(message, 'health_product_recommendation');
};

// ==========================================
// USAGE EXAMPLE
// ==========================================

/*
// In AIChatbot.jsx component:

import { sendChatMessage } from '../services/aiService';

function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (userMessage) => {
    setLoading(true);
    
    try {
      const response = await sendChatMessage(userMessage);
      
      setMessages([
        ...messages,
        { type: 'user', text: userMessage },
        { type: 'ai', text: response.data.response }
      ]);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i} className={msg.type === 'user' ? 'text-right' : 'text-left'}>
          {msg.text}
        </div>
      ))}
      <input onSubmit={handleSend} />
    </div>
  );
}

AI CONTEXT OPTIONS:

- 'health_product_recommendation' - Product recommendations
- 'health_consultation' - General health consultation
- 'product_comparison' - Compare products

EXAMPLE QUERIES:

- "Rekomendasi vitamin untuk daya tahan tubuh"
- "Apa manfaat vitamin C?"
- "Suplemen untuk kesehatan jantung"

NEXT STEPS:
1. Complete TODOs 1-2
2. Use sendChatMessage in AIChatbot component
3. Display AI responses in chat interface
4. Handle loading state
5. Test dengan various queries
6. Compare dengan finished-project
*/

