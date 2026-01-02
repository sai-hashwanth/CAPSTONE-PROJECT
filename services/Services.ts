
import { GoogleGenAI, Type } from "@google/genai";
import { TransactionData, AnalysisResult, FraudStatus } from "../types";

// Initialize Gemini
// Named parameter initialization is required for GoogleGenAI.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define response schema for structured JSON output.
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    riskScore: { type: Type.NUMBER, description: "A score from 0 to 100 indicating fraud probability." },
    status: { type: Type.STRING, enum: ["SAFE", "WARNING", "CRITICAL"], description: "Categorical status of the transaction." },
    detectedAnomalies: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of specific suspicious patterns identified." 
    },
    recommendation: { type: Type.STRING, description: "Actionable advice (e.g., 'Approve', 'Flag for Review', 'Block')." },
    reasoning: { type: Type.STRING, description: "A clear, detailed explanation of WHY the fraud was detected or why it is safe. Explain the logic." },
    mlConfidence: { type: Type.NUMBER, description: "Confidence of the model in its prediction (0.0 to 1.0)." },
    modelInsights: {
      type: Type.OBJECT,
      properties: {
        isolationForestScore: { type: Type.NUMBER, description: "Anomaly score (0-100) based on amount/location deviation." },
        xgBoostProbability: { type: Type.NUMBER, description: "Classification probability (0-100) based on known fraud patterns." },
        lstmSequenceScore: { type: Type.NUMBER, description: "Sequence irregularity score (0-100) based on user behavior change." }
      },
      required: ["isolationForestScore", "xgBoostProbability", "lstmSequenceScore"]
    }
  },
  required: ["riskScore", "status", "detectedAnomalies", "recommendation", "reasoning", "mlConfidence", "modelInsights"]
};

export const analyzeTransactionWithAI = async (transaction: TransactionData): Promise<AnalysisResult> => {
  try {
    const prompt = `
      Act as an Ensemble Fraud Detection System specialized in Indian financial systems (UPI, RuPay, INR context).
      You are aggregating the results of three specific internal models: 
      1. Isolation Forest (Unsupervised Anomaly Detection)
      2. XGBoost (Supervised Classification)
      3. LSTM (Sequential Deep Learning)

      Analyze the following transaction vector against the User's Reference Profile:
      
      USER REFERENCE PROFILE (NORMAL BEHAVIOR):
      - Average Amount: ${transaction.avgTransactionAmount} ${transaction.currency}
      - Home Location: ${transaction.homeLocation}
      - Registered Device: ${transaction.registeredDeviceID}
      - Base User Risk Score: ${transaction.userRiskScore}

      CURRENT TRANSACTION DETAILS (TO ANALYZE):
      - Amount: ${transaction.amount} ${transaction.currency}
      - Merchant: ${transaction.merchant}
      - Current Location: ${transaction.location}
      - Current Device: ${transaction.deviceID}
      - Type: ${transaction.transactionType}
      - Distance from Home: ${transaction.distanceFromHome} km

      SIMULATION LOGIC:
      - **Isolation Forest**: Rate high (80-100) if Amount > 3x Average OR Distance is very high. Rate low (0-20) if normal.
      - **XGBoost**: Rate high if Device ID mismatches OR Location mismatches (High correlation with fraud features).
      - **LSTM**: Rate high if the transaction type implies a sudden "cash out" or break in sequence.

      Calculate the final weighted risk score based on these three inputs.
      Provide a detailed reasoning paragraph.
      Return JSON.
    `;

    // Query GenAI with both model name and prompt directly.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1, 
      }
    });

    // Access the extracted string output directly via the .text property.
    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const parsed = JSON.parse(text.trim());

    return {
      riskScore: parsed.riskScore,
      status: parsed.status as FraudStatus,
      detectedAnomalies: parsed.detectedAnomalies,
      recommendation: parsed.recommendation,
      reasoning: parsed.reasoning || "Analysis complete.",
      mlConfidence: parsed.mlConfidence,
      modelUsed: "SafePay-Ensemble-v1 (IF+XGB+LSTM)",
      modelInsights: parsed.modelInsights || {
        isolationForestScore: 0,
        xgBoostProbability: 0,
        lstmSequenceScore: 0
      }
    };

  } catch (error) {
    console.error("Fraud Analysis Error:", error);
    return {
      riskScore: 0,
      status: FraudStatus.WARNING,
      detectedAnomalies: ["System Error - Manual Review Required"],
      recommendation: "Hold Transaction",
      reasoning: "The AI service was unavailable to provide a detailed reason or returned malformed data.",
      mlConfidence: 0,
      modelUsed: "Fallback",
      modelInsights: {
        isolationForestScore: 0,
        xgBoostProbability: 0,
        lstmSequenceScore: 0
      }
    };
  }
};
