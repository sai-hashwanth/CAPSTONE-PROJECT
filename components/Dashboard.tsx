import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, Legend } from 'recharts';
import { StatsCard } from './StatsCard';
import { Activity, AlertOctagon, Shield, Users, FileText, Download } from 'lucide-react';
import { ProcessedTransaction, FraudStatus, TransactionType } from '../types';
import { jsPDF } from 'jspdf';

interface DashboardProps {
  transactions: ProcessedTransaction[];
}

export const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  
  const stats = useMemo(() => {
    const total = transactions.length;
    const critical = transactions.filter(t => t.analysis?.status === FraudStatus.CRITICAL).length;
    const preventedLoss = transactions
      .filter(t => t.analysis?.status === FraudStatus.CRITICAL)
      .reduce((acc, t) => acc + t.amount, 0);
    const avgRisk = transactions.length > 0 
      ? transactions.reduce((acc, t) => acc + (t.analysis?.riskScore || 0), 0) / transactions.length 
      : 0;

    return { total, critical, preventedLoss, avgRisk };
  }, [transactions]);

  const chartData = useMemo(() => {
    // Formatter for India Standard Time (IST)
    const indiaTimeFormatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    // Generate last 10 points for the chart
    return transactions.slice(0, 10).reverse().map(t => {
      const date = new Date(t.timestamp);
      return {
        time: indiaTimeFormatter.format(date),
        risk: t.analysis?.riskScore || 0,
        amount: t.amount / 100 // Normalized for dual axis visualization
      };
    });
  }, [transactions]);

  const downloadProjectReport = () => {
    const doc = new jsPDF();
    const margin = 20;
    let cursorY = 20;

    const addText = (text: string, size: number = 10, isBold: boolean = false, color: [number, number, number] = [15, 23, 42]) => {
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.setFontSize(size);
      doc.setTextColor(color[0], color[1], color[2]);
      const lines = doc.splitTextToSize(text, 170);
      
      if (cursorY + (lines.length * (size * 0.5)) > 280) {
        doc.addPage();
        cursorY = 20;
      }
      
      doc.text(lines, margin, cursorY);
      cursorY += (lines.length * (size * 0.5)) + 5;
    };

    // Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('SAFEPAY AI: PROJECT REPORT', 20, 30);
    doc.setFontSize(10);
    doc.text('AI-Powered Fraud Protection System', 20, 40);
    
    cursorY = 65;

    addText('1. Abstract', 14, true);
    addText('The SafePay AI project is a real-time fraud detection and monitoring dashboard designed for online transactions. It utilizes Gemini 3 Flash to simulate complex ML ensemble reasoning, providing both risk scores and human-readable explanations.');

    addText('2. Technology Stack', 14, true);
    addText('• Frontend: React 19, Tailwind CSS');
    addText('• AI Engine: Google Gemini API (gemini-3-flash-preview)');
    addText('• Analytics: Recharts for data visualization');
    addText('• PDF Engine: jsPDF for automated reporting');

    addText('3. Core Machine Learning Algorithms (Simulated)', 14, true);
    addText('• Isolation Forest: Used for detecting statistical anomalies in transaction amounts and locations.');
    addText('• XGBoost: A gradient boosting algorithm used for high-accuracy classification of fraud patterns.');
    addText('• LSTM (RNN): Analyzes the temporal sequence of user transactions to identify behavioral shifts.');

    addText('4. System Architecture', 14, true);
    addText('The system follows a modular architecture where the simulator feeds data into an AI Orchestration layer. This layer applies specific domain logic (Geospatial deviation, Velocity checks) and returns a structured JSON assessment.');

    addText('5. Executive Summary of Session', 14, true);
    addText(`• Total Transactions Scanned: ${stats.total}`);
    addText(`• Critical Threats Detected: ${stats.critical}`);
    addText(`• Estimated Prevented Loss: ₹${stats.preventedLoss.toLocaleString()}`);
    addText(`• Average System Risk Index: ${stats.avgRisk.toFixed(1)}%`);

    doc.save(`SafePay_Project_Report_${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-bold text-white">Security Overview</h3>
        </div>
        <button 
          onClick={downloadProjectReport}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-sm font-semibold text-white transition-all"
        >
          <FileText className="w-4 h-4 text-blue-400" />
          Download Project Report (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Scanned" 
          value={stats.total.toString()} 
          icon={Activity} 
          color="bg-blue-500" 
        />
        <StatsCard 
          title="Threats Flagged" 
          value={stats.critical.toString()} 
          icon={AlertOctagon} 
          color="bg-red-500" 
          trend={stats.total > 0 ? `${((stats.critical/stats.total)*100).toFixed(1)}%` : '0%'}
        />
        <StatsCard 
          title="Prevented Loss" 
          value={`₹${stats.preventedLoss.toLocaleString()}`} 
          icon={Shield} 
          color="bg-emerald-500" 
        />
        <StatsCard 
          title="Risk Index" 
          value={`${stats.avgRisk.toFixed(1)}%`} 
          icon={Users} 
          color="bg-purple-500" 
          trend={stats.avgRisk > 50 ? 'High' : 'Low'}
          trendUp={stats.avgRisk > 50}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
          <h3 className="text-white font-bold mb-6 flex justify-between items-center">
            <span>Real-time Risk Volatility</span>
            <span className="text-xs font-normal text-slate-400">Timezone: Asia/Kolkata (IST)</span>
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="risk" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
          <h3 className="text-white font-bold mb-6">Distribution by Type</h3>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Transfer', value: transactions.filter(t => t.transactionType === TransactionType.TRANSFER).length },
                  { name: 'Payment', value: transactions.filter(t => t.transactionType === TransactionType.PAYMENT).length },
                  { name: 'Cash Out', value: transactions.filter(t => t.transactionType === TransactionType.CASH_OUT).length },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    <Cell fill="#3b82f6" />
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};