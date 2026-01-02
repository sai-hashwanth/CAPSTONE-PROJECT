import React from 'react';
import { ProcessedTransaction, FraudStatus } from '../types';
import { Search } from 'lucide-react';

interface HistoryTableProps {
  transactions: ProcessedTransaction[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ transactions }) => {
  // Formatter for India Standard Time (IST)
  const indiaTimeFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Recent Analysis Logs (IST)</h3>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="bg-slate-900 border border-slate-600 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none w-64"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Time (IST)</th>
              <th className="p-4 font-semibold">Merchant</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Risk Score</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-sm">
            {transactions.length === 0 ? (
               <tr>
                 <td colSpan={6} className="p-8 text-center text-slate-500 italic">No transactions analyzed yet.</td>
               </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 text-slate-300 font-mono text-xs">
                    {indiaTimeFormatter.format(new Date(tx.timestamp))}
                  </td>
                  <td className="p-4 text-white font-medium">{tx.merchant}</td>
                  <td className="p-4 text-slate-300">₹{tx.amount.toLocaleString()}</td>
                  <td className="p-4 text-slate-400">{tx.location}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <span className={`font-bold ${
                         (tx.analysis?.riskScore || 0) > 70 ? 'text-red-400' : 'text-emerald-400'
                       }`}>
                         {tx.analysis?.riskScore.toFixed(0)}
                       </span>
                       <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                         <div 
                           className={`h-full ${
                             (tx.analysis?.riskScore || 0) > 70 ? 'bg-red-500' : 'bg-emerald-500'
                           }`} 
                           style={{ width: `${tx.analysis?.riskScore || 0}%` }}
                         />
                       </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                       tx.analysis?.status === FraudStatus.CRITICAL ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                       tx.analysis?.status === FraudStatus.WARNING ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                       'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {tx.analysis?.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};