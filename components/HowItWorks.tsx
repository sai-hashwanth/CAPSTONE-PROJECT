
import React from 'react';
import { BrainCircuit, Database, Lock, Search, ShieldCheck, Network, Binary, GitGraph, ExternalLink } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in text-slate-300">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-blue-500" />
          Fraud Detection Architecture & ML Algorithms
        </h2>
        
        <p className="mb-8 text-lg text-slate-400">
          The SafePay AI system simulates an ensemble learning approach. For your project demonstration, you can explain that the system utilizes the following specific Machine Learning algorithms to classify transactions:
        </p>

        {/* Algorithm Breakdown Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
            <div className="mb-4 bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center">
              <Binary className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Isolation Forest</h3>
            <p className="text-sm text-slate-400">
              <strong className="text-slate-200">Purpose:</strong> Anomaly Detection.
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              This unsupervised learning algorithm isolates observations by randomly selecting a feature and then randomly selecting a split value. Anomalies (fraud) are few and different, so they are isolated faster (shorter path length) than normal transactions.
            </p>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
            <div className="mb-4 bg-emerald-900/20 w-12 h-12 rounded-lg flex items-center justify-center">
              <GitGraph className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. XGBoost Classifier</h3>
            <p className="text-sm text-slate-400">
              <strong className="text-slate-200">Purpose:</strong> Supervised Classification.
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Extreme Gradient Boosting is a decision-tree-based ensemble algorithm. It is trained on the historical dataset (Kaggle) to learn complex non-linear relationships between features like Amount, Location, and Time to output a fraud probability.
            </p>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-colors">
            <div className="mb-4 bg-purple-900/20 w-12 h-12 rounded-lg flex items-center justify-center">
              <Network className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. LSTM (Deep Learning)</h3>
            <p className="text-sm text-slate-400">
              <strong className="text-slate-200">Purpose:</strong> Sequence Analysis.
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Long Short-Term Memory networks are a type of RNN. They analyze the *sequence* of a user's transactions over time to detect sudden breaks in spending habits (e.g., small coffee purchases followed immediately by a large crypto transfer).
            </p>
          </div>
        </div>
        
        {/* DATASET SECTION */}
        <div className="mb-10 bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
             <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" />
                Training Dataset Source
             </h3>
             <p className="text-sm text-slate-400 mb-4">
                The machine learning models simulated in this system are conceptually trained on the <strong>Financial Transactions Fraud Detection Dataset</strong>. This dataset contains aggregated transaction logs designed to benchmark fraud detection algorithms.
             </p>
             <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden w-full">
                   <div className="p-2 bg-slate-700 rounded text-slate-300">
                     <Database className="w-4 h-4" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-500 uppercase font-bold">Kaggle Dataset URL</div>
                      <div className="text-sm text-blue-400 font-mono truncate">
                         https://www.kaggle.com/datasets/amanalisiddiqui/fraud-detection-dataset
                      </div>
                   </div>
                </div>
                <a 
                  href="https://www.kaggle.com/datasets/amanalisiddiqui/fraud-detection-dataset" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                >
                  View Source <ExternalLink className="w-3 h-3" />
                </a>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-700 pt-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Data Ingestion & Vectorization</h3>
            <p className="text-sm leading-relaxed">
              When a transaction is submitted, the system captures key feature vectors which are fed into the algorithms above:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
              <li><strong className="text-slate-200">Behavioral:</strong> Amount vs. User History, Velocity of spending.</li>
              <li><strong className="text-slate-200">Geospatial:</strong> IP Address geolocation vs. Merchant location vs. User Home.</li>
              <li><strong className="text-slate-200">Device Fingerprinting:</strong> Device ID reputation and consistency.</li>
              <li><strong className="text-slate-200">Contextual:</strong> Transaction type (e.g., Cash Out vs. Payment).</li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">The Role of SafePay AI (GenAI)</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg h-fit">
                  <Database className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Orchestrator & Explainer</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    In this application, SafePay AI acts as the "Meta-Model". It takes the raw transaction data, simulates the reasoning of the models mentioned above (XGBoost/Isolation Forest), and generates the final <strong>Risk Score</strong> and <strong>Natural Language Explanation</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg h-fit">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Decision & Action</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    The system outputs a verdict (Safe/Warning/Critical) and a recommended action (Approve/Block) based on the combined confidence of these simulated algorithms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
