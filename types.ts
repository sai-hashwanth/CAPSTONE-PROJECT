export enum TransactionType {
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT',
  CASH_OUT = 'CASH_OUT',
  DEBIT = 'DEBIT',
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY'
}

export enum FraudStatus {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
  PENDING = 'PENDING'
}

export interface TransactionData {
  id: string;
  timestamp: string;
  
  // Current Transaction Details
  amount: number;
  currency: string;
  merchant: string;
  location: string; // Current location of transaction
  deviceID: string; // Device used for transaction
  transactionType: TransactionType;
  ipAddress: string;
  distanceFromHome: number; // km

  // User Historical / Reference Data
  avgTransactionAmount: number; 
  homeLocation: string; // User's registered address/city
  registeredDeviceID: string; // User's known device
  userRiskScore: number; 
}

export interface ModelInsights {
  isolationForestScore: number; // 0-100 (Anomaly Detection)
  xgBoostProbability: number;   // 0-100 (Pattern Classification)
  lstmSequenceScore: number;    // 0-100 (Sequence/Time Analysis)
}

export interface AnalysisResult {
  riskScore: number; // 0-100
  status: FraudStatus;
  detectedAnomalies: string[];
  recommendation: string;
  reasoning: string; 
  mlConfidence: number; // 0-1
  modelUsed: string;
  modelInsights: ModelInsights; // New field for specific algorithm breakdown
}

export interface ProcessedTransaction extends TransactionData {
  analysis: AnalysisResult | null;
}