
/**
 * SAFEPAY AI - PROJECT DATASET SOURCE
 * This file contains a sample subset of the training data used to simulate the 
 * fraud detection models (Isolation Forest, XGBoost, LSTM).
 * 
 * Source Reference: PaySim Synthetic Dataset / Kaggle Financial Fraud
 */

export interface RawDatasetRow {
  step: number;
  type: string;
  amount: number;
  nameOrig: string;
  oldbalanceOrg: number;
  newbalanceOrig: number;
  nameDest: string;
  oldbalanceDest: number;
  newbalanceDest: number;
  isFraud: number; // 1 = Fraud, 0 = Legitimate
  isFlaggedFraud: number;
}

export const RAW_TRANSACTION_DATASET: RawDatasetRow[] = [
  { step: 1, type: "PAYMENT", amount: 9839.64, nameOrig: "C1231006815", oldbalanceOrg: 170136.0, newbalanceOrig: 160296.36, nameDest: "M1979787155", oldbalanceDest: 0.0, newbalanceDest: 0.0, isFraud: 0, isFlaggedFraud: 0 },
  { step: 1, type: "PAYMENT", amount: 1864.28, nameOrig: "C1666544295", oldbalanceOrg: 21249.0, newbalanceOrig: 19384.72, nameDest: "M2044282225", oldbalanceDest: 0.0, newbalanceDest: 0.0, isFraud: 0, isFlaggedFraud: 0 },
  { step: 1, type: "TRANSFER", amount: 181.0, nameOrig: "C1305486145", oldbalanceOrg: 181.0, newbalanceOrig: 0.0, nameDest: "C553264065", oldbalanceDest: 0.0, newbalanceDest: 0.0, isFraud: 1, isFlaggedFraud: 0 },
  // Fix: Completed the truncated object literal and correctly closed the array.
  { step: 1, type: "CASH_OUT", amount: 181.0, nameOrig: "C840083671", oldbalanceOrg: 181.0, newbalanceOrig: 0.0, nameDest: "C38997010", oldbalanceDest: 21182.0, newbalanceDest: 0.0, isFraud: 1, isFlaggedFraud: 0 }
];
