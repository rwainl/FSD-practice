/**
 * Kemenkes API Service
 *
 * TODO untuk peserta:
 * 1. Setup Kemenkes API configuration
 * 2. Implement getMedications(searchQuery, limit)
 * 3. Transform FHIR data ke Product schema
 * 4. Implement syncToDatabase() untuk auto-sync
 * 5. Handle API errors dan rate limits
 */

const axios = require("axios");
// TODO: Import Product model
// const Product = require('../models/Product');

class KemenkesService {
  constructor() {
    this.baseURL =
      process.env.KEMENKES_API_URL ||
      "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1";
    this.apiKey = process.env.KEMENKES_API_KEY;

    if (!this.apiKey) {
      console.warn("  KEMENKES_API_KEY not set");
    }
  }

  async getMedications(searchQuery = "", limit = 10) {
    try {
      // TODO: Call Kemenkes FHIR API
      // const response = await axios.get(`${this.baseURL}/Medication`, {
      //   headers: {
      //     'Authorization': `Bearer ${this.apiKey}`,
      //     'Content-Type': 'application/json'
      //   },
      //   params: {
      //     _count: limit,
      //     name: searchQuery || undefined
      //   },
      //   timeout: 10000
      // });

      // TODO: Transform FHIR data
      // const medications = this.transformFHIRData(response.data);

      // return {
      //   success: true,
      //   count: medications.length,
      //   data: medications
      // };

      return {
        success: false,
        message: "  TODO: Implement Kemenkes API integration",
      };
    } catch (error) {
      console.error(" Kemenkes API Error:", error.message);

      return {
        success: false,
        message: "Failed to fetch from Kemenkes API",
        error: error.message,
      };
    }
  }

  transformFHIRData(fhirResponse) {
    // TODO: Transform FHIR format to our Product schema
    // FHIR structure:
    // {
    //   entry: [
    //     {
    //       resource: {
    //         id: "12345",
    //         code: {
    //           coding: [{ display: "Paracetamol 500mg" }],
    //           text: "Obat pereda nyeri"
    //         }
    //       }
    //     }
    //   ]
    // }

    return [];
  }

  async syncToDatabase() {
    try {
      console.log(" Starting Kemenkes sync...");

      // TODO: Fetch medications
      // const result = await this.getMedications('', 50);

      // TODO: Save to database
      // Check for duplicates by kemenkesId
      // Create new products

      return {
        success: false,
        message: "  TODO: Implement database sync",
      };
    } catch (error) {
      console.error(" Sync Error:", error.message);

      return {
        success: false,
        message: "Sync failed",
        error: error.message,
      };
    }
  }
}

module.exports = new KemenkesService();
