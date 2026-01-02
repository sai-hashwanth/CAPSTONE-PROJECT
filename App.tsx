
import React, { useState } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { AnalysisResultCard } from './components/AnalysisResult';
import { HistoryTable } from './components/HistoryTable';
import { ProcessedTransaction, TransactionData } from './types';
import { analyzeTransactionWithAI } from './services/Services';
import { Shield, LayoutDashboard, Database, BrainCircuit, ScanLine, LogOut } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { HowItWorks } from './components/HowItWorks';
import { LoginPage } from './components/LoginPage';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [allTransactions, setAllTransactions] = useState<Record<string, ProcessedTransaction[]>>({});
  const [currentAnalysis, setCurrentAnalysis] = useState<ProcessedTransaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (username: string) => {
    setUser(username);
    setActiveTab('dashboard');
    setCurrentAnalysis(null);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentAnalysis(null);
  };

  const handleTransactionSubmit = async (data: Omit<TransactionData, 'id' | 'timestamp'>) => {
    if (!user) return;

    setIsLoading(true);
    setCurrentAnalysis(null);

    const newTransaction: TransactionData = {
      ...data,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };

    try {
      const analysis = await analyzeTransactionWithAI(newTransaction);
      const processed: ProcessedTransaction = { ...newTransaction, analysis };
      setCurrentAnalysis(processed);
      setAllTransactions(prev => ({
        ...prev,
        [user]: [processed, ...(prev[user] || [])]
      }));
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const transactions = user ? (allTransactions[user] || []) : [];

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200 font-sans">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">SafePay AI</h1>
            <p className="text-xs text-slate-500">Fraud Protection System</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-slate-400 hover:bg-slate-800'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('simulator')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'simulator' ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-slate-400 hover:bg-slate-800'}`}>
            <ScanLine className="w-5 h-5" /> Simulator
          </button>
          <button onClick={() => setActiveTab('logs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'logs' ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Database className="w-5 h-5" /> Transaction Logs
          </button>
          <button onClick={() => setActiveTab('how-it-works')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'how-it-works' ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-slate-400 hover:bg-slate-800'}`}>
            <BrainCircuit className="w-5 h-5" /> How it Detects
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
           </button>
        </div>
      </aside>
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-slate-400 text-sm mt-1">
              {activeTab === 'dashboard' && 'Real-time analytics and user insights.'}
              {activeTab === 'simulator' && 'Inject transaction patterns to test AI response.'}
              {activeTab === 'logs' && 'Historical record of all analyzed transactions.'}
              {activeTab === 'how-it-works' && 'Understanding the underlying ML algorithms.'}
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <div className="text-right hidden sm:block">
                 <div className="text-sm font-medium text-white">{user}</div>
                 <div className="text-xs text-slate-500">Authenticated</div>
               </div>
               <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-slate-600 flex items-center justify-center text-white font-bold shadow-lg uppercase">
                 {user.substring(0,2)}
               </div>
             </div>
          </div>
        </header>
        <div className="w-full">
          {activeTab === 'dashboard' && <Dashboard transactions={transactions} />}
          {activeTab === 'simulator' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-auto animate-fade-in">
              <div className="xl:col-span-1"><TransactionForm onSubmit={handleTransactionSubmit} isLoading={isLoading} /></div>
              <div className="xl:col-span-1"><AnalysisResultCard result={currentAnalysis?.analysis || null} /></div>
            </div>
          )}
          {activeTab === 'logs' && <div className="animate-fade-in"><HistoryTable transactions={transactions} /></div>}
          {activeTab === 'how-it-works' && <HowItWorks />}
        </div>
      </main>
    </div>
  );
}

export default App;
