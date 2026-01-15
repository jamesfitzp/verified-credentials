import { useState } from 'react';
import { Briefcase, Award, Calendar, Building2, ExternalLink, Plus, Wallet, Copy, Check, Search, Shield } from 'lucide-react';

// Real contract on Base
const CONTRACT_ADDRESS = "0x45cCCb822388aBB97b680436C9186082025551ec";
const CHAIN = "Base";
const BASESCAN_URL = "https://basescan.org/address/" + CONTRACT_ADDRESS;

// Mock data for demo
const mockCredentials = [
  {
    id: 1,
    company: "Uniswap Labs",
    logo: "🦄",
    title: "Senior Smart Contract Engineer",
    startDate: "Mar 2023",
    endDate: "Dec 2025",
    issueDate: "Dec 2025",
    txHash: "0x1a2b...3c4d",
    verified: true
  },
  {
    id: 2,
    company: "Coinbase",
    logo: "🔵",
    title: "Protocol Engineer",
    startDate: "Jun 2021",
    endDate: "Feb 2023",
    issueDate: "Feb 2023",
    txHash: "0x5e6f...7g8h",
    verified: true
  },
  {
    id: 3,
    company: "ConsenSys",
    logo: "🔷",
    title: "Software Engineer",
    startDate: "Jan 2020",
    endDate: "May 2021",
    issueDate: "May 2021",
    txHash: "0x9i0j...1k2l",
    verified: true
  }
];

function CredentialCard({ credential }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
            {credential.logo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{credential.title}</h3>
            <p className="text-gray-600 flex items-center gap-1">
              <Building2 size={14} />
              {credential.company}
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
              <Calendar size={14} />
              {credential.startDate} — {credential.endDate}
            </p>
          </div>
        </div>
        {credential.verified && (
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
            <Shield size={14} />
            Verified
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Issued {credential.issueDate} · tx: {credential.txHash}
        </p>
        <a href={BASESCAN_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
          View on BaseScan <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

function ResumeView({ wallet, onBack }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                AJ
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Alex Johnson</h1>
                <p className="text-gray-500">Smart Contract Engineer</p>
              </div>
            </div>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              {copied ? "Copied!" : "0x7a3F...9c2E"}
            </button>
          </div>
          
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase size={16} />
              <span>{mockCredentials.length} Verified Positions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award size={16} />
              <span>5+ Years Experience</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Work History</h2>
          <span className="text-sm text-gray-500">All credentials on-chain verified</span>
        </div>
        
        <div className="space-y-4">
          {mockCredentials.map(cred => (
            <CredentialCard key={cred.id} credential={cred} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

function ClaimPage({ onClaim, onBack }) {
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [claiming, setClaiming] = useState(false);
  
  const handleClaim = () => {
    setClaiming(true);
    setTimeout(() => {
      setClaiming(false);
      onClaim();
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full">
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Claim Your Credential</h1>
              <p className="text-gray-500 mt-2">Enter the code provided by your employer</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter claim code (e.g., UNI-2025-XK9F)"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center text-lg tracking-wider"
              />
              
              <button
                onClick={() => setStep(2)}
                disabled={code.length < 6}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Continue
              </button>
            </div>
          </>
        )}
        
        {step === 2 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wallet className="text-green-600" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Connect Wallet</h1>
              <p className="text-gray-500 mt-2">Connect or create a wallet to receive your credential</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setStep(3)}
                className="w-full bg-white hover:bg-gray-50 border border-gray-300 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-3"
              >
                <span className="text-xl">🦊</span>
                Connect MetaMask
              </button>
              
              <button
                onClick={() => setStep(3)}
                className="w-full bg-white hover:bg-gray-50 border border-gray-300 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-3"
              >
                <span className="text-xl">🔵</span>
                Coinbase Wallet
              </button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              
              <button
                onClick={() => setStep(3)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Create New Wallet (Email)
              </button>
              <p className="text-xs text-center text-gray-400">No crypto experience needed</p>
            </div>
          </>
        )}
        
        {step === 3 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-purple-600" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Confirm Credential</h1>
              <p className="text-gray-500 mt-2">Review and claim your verified work credential</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl">
                  🦄
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Uniswap Labs</p>
                  <p className="text-sm text-gray-500">Senior Smart Contract Engineer</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="text-gray-400">Period:</span> Mar 2023 — Dec 2025</p>
                <p><span className="text-gray-400">Code:</span> {code}</p>
              </div>
            </div>
            
            <button
              onClick={handleClaim}
              disabled={claiming}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 rounded-xl transition-colors"
            >
              {claiming ? "Minting credential..." : "Claim Credential"}
            </button>
          </>
        )}
        
        <button 
          onClick={onBack}
          className="w-full text-gray-500 hover:text-gray-700 text-sm mt-4"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

function AdminMint({ onBack }) {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    startDate: '',
    endDate: '',
    recipientEmail: ''
  });
  const [generated, setGenerated] = useState(false);
  const [claimCode, setClaimCode] = useState('');
  
  const generateCode = () => {
    const code = `${formData.company.substring(0,3).toUpperCase()}-2026-${Math.random().toString(36).substring(2,6).toUpperCase()}`;
    setClaimCode(code);
    setGenerated(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full">
        {!generated ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="text-orange-600" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Issue Credential</h1>
              <p className="text-gray-500 mt-2">Create a verifiable work credential for an employee</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Uniswap Labs"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Senior Engineer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Email</label>
                <input
                  type="email"
                  value={formData.recipientEmail}
                  onChange={(e) => setFormData({...formData, recipientEmail: e.target.value})}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <button
                onClick={generateCode}
                disabled={!formData.company || !formData.title}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition-colors mt-4"
              >
                Generate Claim Code
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-600" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Credential Ready!</h1>
              <p className="text-gray-500 mt-2">Share this code with your employee</p>
            </div>
            
            <div className="bg-gray-900 text-white rounded-xl p-6 text-center mb-6">
              <p className="text-sm text-gray-400 mb-2">Claim Code</p>
              <p className="text-2xl font-mono font-bold tracking-wider">{claimCode}</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
              <p><span className="text-gray-400">Company:</span> {formData.company}</p>
              <p><span className="text-gray-400">Title:</span> {formData.title}</p>
              <p><span className="text-gray-400">Period:</span> {formData.startDate} — {formData.endDate}</p>
            </div>
            
            <button
              onClick={() => setGenerated(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors mt-6"
            >
              Issue Another
            </button>
          </>
        )}
        
        <button 
          onClick={onBack}
          className="w-full text-gray-500 hover:text-gray-700 text-sm mt-4"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('home');
  
  if (view === 'resume') {
    return <ResumeView onBack={() => setView('home')} />;
  }
  
  if (view === 'claim') {
    return <ClaimPage onClaim={() => setView('resume')} onBack={() => setView('home')} />;
  }
  
  if (view === 'admin') {
    return <AdminMint onBack={() => setView('home')} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="text-blue-600" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Verified Credentials</h1>
          <p className="text-blue-200">Blockchain-verified work history that travels with you</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => setView('resume')}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            <Search size={20} />
            View Demo Resume
          </button>
          
          <button
            onClick={() => setView('claim')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            <Award size={20} />
            Claim a Credential
          </button>
          
          <button
            onClick={() => setView('admin')}
            className="w-full bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            <Building2 size={20} />
            Employer: Issue Credential
          </button>
        </div>
        
        <p className="text-center text-blue-300/60 text-sm mt-8">
          Built on Base · Contract: {CONTRACT_ADDRESS.slice(0,6)}...{CONTRACT_ADDRESS.slice(-4)}
        </p>
      </div>
    </div>
  );
}
