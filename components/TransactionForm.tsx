import React, { useState } from 'react';
import { TransactionData, TransactionType } from '../types';
import { ShieldAlert, Zap, Globe, MapPin, Smartphone, Banknote, Activity, History, UserCheck, SmartphoneNfc, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (data: Omit<TransactionData, 'id' | 'timestamp'>) => void;
  isLoading: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, isLoading }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const initialData = {
    // Current Transaction
    amount: 2500.00,
    currency: 'INR',
    merchant: 'JioMart Mumbai',
    location: 'Mumbai, Maharashtra',
    deviceID: 'DEV_IN_8823_ANDROID',
    transactionType: TransactionType.PAYMENT,
    ipAddress: '115.110.12.5',
    distanceFromHome: 5,
    
    // Reference Data
    avgTransactionAmount: 2000.00,
    homeLocation: 'Mumbai, Maharashtra',
    registeredDeviceID: 'DEV_IN_8823_ANDROID',
    userRiskScore: 12
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('amount') || name === 'distanceFromHome' || name === 'userRiskScore' || name === 'amount' || name === 'avgTransactionAmount'
        ? parseFloat(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resetData = () => {
    setFormData(initialData);
  };

  const injectFraudData = () => {
    setFormData({
      ...formData,
      // Anomalous Current Transaction
      amount: 150000.00,
      currency: 'INR',
      merchant: 'Unknown_Offshore_Entity',
      location: 'Moscow, Russia', // Different from Home
      deviceID: 'UNREGISTERED_DEVICE_X', // Different from Registered
      transactionType: TransactionType.CASH_OUT,
      ipAddress: '45.112.99.11',
      distanceFromHome: 5000,
      
      // Normal Reference Data remains same
      avgTransactionAmount: 2000.00,
      homeLocation: 'Mumbai, Maharashtra',
      registeredDeviceID: 'DEV_IN_8823_ANDROID',
      userRiskScore: 65 // Elevated base risk
    });
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Transaction Simulator
        </h3>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={resetData}
            className="text-xs bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 px-3 py-1 rounded transition-colors flex items-center gap-1"
            title="Reset to Normal"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <button 
            type="button"
            onClick={injectFraudData}
            className="text-xs bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20 px-3 py-1 rounded transition-colors"
          >
            Inject Fraud Pattern
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION 1: USER PROFILE / REFERENCE DATA (COLLAPSIBLE) */}
        <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden transition-all duration-200">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
          >
             <div className="flex items-center gap-2">
               <UserCheck className="w-4 h-4 text-emerald-400" />
               <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wide text-left">User Reference Profile (Normal)</h4>
             </div>
             {isProfileOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          
          {isProfileOpen && (
            <div className="p-4 pt-0 space-y-4 border-t border-slate-700/30">
              <div className="h-2"></div> {/* Spacer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-semibold">Avg Amount (₹)</label>
                  <div className="relative">
                    <History className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input 
                      type="number" 
                      name="avgTransactionAmount"
                      value={formData.avgTransactionAmount}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 pl-9 pr-3 text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-semibold">Registered Device ID</label>
                  <div className="relative">
                    <SmartphoneNfc className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      name="registeredDeviceID"
                      value={formData.registeredDeviceID}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 pl-9 pr-3 text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold">Home Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    name="homeLocation"
                    value={formData.homeLocation}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 pl-9 pr-3 text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: CURRENT TRANSACTION DATA */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Current Transaction Details</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">Current Amount (₹)</label>
              <div className="relative">
                <Banknote className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input 
                  type="number" 
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 pl-9 pr-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">Type</label>
              <select 
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none h-[42px]"
              >
                {Object.values(TransactionType).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold">Merchant</label>
            <input 
              type="text" 
              name="merchant"
              value={formData.merchant}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">Current Location</label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 pl-9 pr-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">Current Device ID</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  name="deviceID"
                  value={formData.deviceID}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 pl-9 pr-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
          
           {/* Hidden but part of data structure if needed, or keeping Distance visible for manual tweak */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold">Dist. From Home (km)</label>
                <input 
                  type="number" 
                  name="distanceFromHome"
                  value={formData.distanceFromHome}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-3 text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold">History Risk Score</label>
                <input 
                  type="number" 
                  name="userRiskScore"
                  value={formData.userRiskScore}
                  onChange={handleChange}
                  min="0" max="100"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-3 text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
           </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all flex justify-center items-center gap-2 ${
            isLoading 
            ? 'bg-slate-700 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AI Analyzing...
            </>
          ) : (
            <>
              <ShieldAlert className="w-5 h-5" />
              Scan Transaction
            </>
          )}
        </button>
      </form>
    </div>
  );
};