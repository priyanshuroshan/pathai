import { useState } from 'react';
import axios from 'axios';
import { AlertCircle, ArrowRight } from 'lucide-react';
import api from '../api';

export default function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
const response = await api.post('/api/auth/login', formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLogin(response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-[#FAF8F5]">
      <div className="max-w-md w-full bg-white border border-[#EAE7DC] rounded-lg p-10 shadow-sm">
        
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl text-[#1A1A1A] mb-2">
            {isLogin ? 'Welcome back.' : 'Create an account.'}
          </h2>
          <p className="text-[#666666] font-light">
            {isLogin ? 'Enter your credentials to continue.' : 'Begin your structured learning journey.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 flex items-center text-red-700 text-sm">
            <AlertCircle size={16} className="mr-2 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-2">Full Name</label>
              <input 
                type="text" required={!isLogin}
                className="w-full p-3 bg-transparent border border-[#EAE7DC] rounded-md focus:border-[#1A1A1A] outline-none transition-colors text-sm"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" required
              className="w-full p-3 bg-transparent border border-[#EAE7DC] rounded-md focus:border-[#1A1A1A] outline-none transition-colors text-sm"
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" required
              className="w-full p-3 bg-transparent border border-[#EAE7DC] rounded-md focus:border-[#1A1A1A] outline-none transition-colors text-sm"
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" disabled={isLoading}
            className="w-full flex items-center justify-center bg-[#1A1A1A] text-white py-3.5 rounded-md hover:bg-[#333333] transition-colors mt-4 text-sm font-medium"
          >
            {isLoading ? 'Processing...' : (
              <>{isLogin ? 'Sign In' : 'Continue'} <ArrowRight className="ml-2" size={16} /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#EAE7DC] pt-6">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-[#666666] hover:text-[#1A1A1A] transition-colors text-sm"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
