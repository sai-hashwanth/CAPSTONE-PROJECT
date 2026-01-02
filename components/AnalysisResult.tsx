
import React from 'react';
import { AnalysisResult, FraudStatus } from '../types';
import { CheckCircle, AlertTriangle, XCircle, ShieldCheck, FileText, Download, Shield } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface AnalysisResultCardProps {
  result: AnalysisResult | null;
}

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg h-full flex flex-col items-center justify-center text-center opacity-60">
        <ShieldCheck className="w-20 h-20 text-slate-600 mb-4" />
        <h3 className="text-xl font-bold text-slate-400">Ready to Scan</h3>
        <p className="text-slate-500 mt-2">Enter transaction details and submit to initiate AI fraud detection.</p>
      </div>
    );
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();
    
    // Header
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('SAFEPAY AI - SECURITY REPORT', 20, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text(`Generated on: ${timestamp}`, 20, 34);

    // Section 1: Assessment Summary
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text('1. Executive Assessment', 20, 55);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 58, 190, 58);

    doc.setFontSize(12);
    doc.text(`Final Status: ${result.status}`, 20, 68);
    doc.text(`Risk Probability: ${result.riskScore.toFixed(0)}%`, 20, 75);
    doc.text(`AI Confidence: ${(result.mlConfidence * 100).toFixed(1)}%`, 20, 82);
    doc.text(`Recommendation: ${result.recommendation}`, 20, 89);

    // Section 2: Detailed Reasoning
    doc.setFontSize(16);
    doc.text('2. AI Reasoning & Pattern Analysis', 20, 105);
    doc.line(20, 108, 190, 108);
    
    doc.setFontSize(11);
    const splitReasoning = doc.splitTextToSize(result.reasoning, 170);
    doc.text(splitReasoning, 20, 118);

    // Section 3: Model Insights
    doc.setFontSize(16);
    doc.text('3. Algorithm Insights (Ensemble Data)', 20, 150);
    doc.line(20, 153, 190, 153);
    
    doc.setFontSize(11);
    doc.text(`Isolation Forest (Anomaly): ${result.modelInsights.isolationForestScore}/100`, 25, 163);
    doc.text(`XGBoost (Classification): ${result.modelInsights.xgBoostProbability}/100`, 25, 170);
    doc.text(`LSTM (Sequence Analysis): ${result.modelInsights.lstmSequenceScore}/100`, 25, 177);

    // Section 4: Detected Anomalies
    if (result.detectedAnomalies.length > 0) {
        doc.setFontSize(16);
        doc.text('4. Specific Anomalies Flagged', 20, 195);
        doc.line(20, 198, 190, 198);
        doc.setFontSize(11);
        result.detectedAnomalies.forEach((anomaly, index) => {
            doc.text(`• ${anomaly}`, 25, 208 + (index * 7));
        });
    }

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('This document is a computer-generated fraud analysis report powered by SafePay AI Engine.', 20, 285);
    doc.text('Confidential - For Financial Security Audit Use Only', 20, 290);

    // Save
    doc.save(`SafePay_Report_${Date.now()}.pdf`);
  };

  const getIcon = (status: FraudStatus) => {
    switch (status) {
      case FraudStatus.SAFE: return <CheckCircle className="w-12 h-12 text-emerald-400" />;
      case FraudStatus.WARNING: return <AlertTriangle className="w-12 h-12 text-amber-400" />;
      case FraudStatus.CRITICAL: return <XCircle className="w-12 h-12 text-red-500" />;
      default: return <ShieldCheck className="w-12 h-12 text-slate-400" />;
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg h-full animate-fade-in overflow-y-auto relative">
      <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
           <Shield className="w-5 h-5 text-blue-400" />
           <h3 className="text-xl font-bold text-white">AI Assessment</h3>
        </div>
        <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">{result.modelUsed}</span>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className={`rounded-full p-4 mb-3 bg-slate-900 border-4 ${
          result.status === FraudStatus.SAFE ? 'border-emerald-500/30' : 
          result.status === FraudStatus.WARNING ? 'border-amber-500/30' : 'border-red-500/30'
        }`}>
          {getIcon(result.status)}
        </div>
        <div className={`text-3xl font-bold tracking-wider mb-1 ${
           result.status === FraudStatus.SAFE ? 'text-emerald-400' : 
           result.status === FraudStatus.WARNING ? 'text-amber-400' : 'text-red-400'
        }`}>
          {result.status}
        </div>
        <div className="text-sm text-slate-400">Final Risk Probability: {result.riskScore.toFixed(0)}%</div>
      </div>

      <div className="space-y-6">
        
        {/* Reason Box */}
        <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
           <div className="flex items-center gap-2 mb-2 text-slate-300">
             <FileText className="w-4 h-4 text-blue-400" />
             <span className="font-semibold text-sm">Detailed Reasoning</span>
           </div>
           <p className="text-sm text-slate-400 leading-relaxed italic">
             "{result.reasoning}"
           </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-500 mb-1">Global Confidence</div>
            <div className="text-lg font-semibold text-white">{(result.mlConfidence * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-500 mb-1">Recommendation</div>
            <div className="text-sm font-semibold text-white">{result.recommendation}</div>
          </div>
        </div>

        {/* Anomalies */}
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Detected Patterns</div>
          {result.detectedAnomalies.length > 0 ? (
            <ul className="space-y-2">
              {result.detectedAnomalies.map((anomaly, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  {anomaly}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-emerald-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> No anomalies detected.
            </div>
          )}
        </div>

        {/* Action Button */}
        <button 
          onClick={generatePDF}
          className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-95 transition-all"
        >
          <Download className="w-5 h-5" />
          Download PDF Report
        </button>
      </div>
    </div>
  );
};
