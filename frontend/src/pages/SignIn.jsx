import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, signInFailure, signInSuccess } from '../Redux/user/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {

  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all fields.'))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slide-in-left {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slide-in-right {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(1deg); }
            66% { transform: translateY(10px) rotate(-1deg); }
          }
          
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
            50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(236, 72, 153, 0.6); }
          }
          
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
          
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          
          .animate-slide-in-left {
            animation: slide-in-left 1s ease-out;
          }
          
          .animate-slide-in-right {
            animation: slide-in-right 1s ease-out 0.3s both;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-glow-pulse {
            animation: glow-pulse 3s ease-in-out infinite;
          }
          
          .animate-gradient-shift {
            background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
            background-size: 400% 400%;
            animation: gradient-shift 4s ease infinite;
          }
          
          .animate-shake {
            animation: shake 0.6s ease-in-out;
          }
          
          /* Glass morphism effect */
          .glass-morphism {
            backdrop-filter: blur(16px) saturate(180%);
            background-color: rgba(255, 255, 255, 0.85);
            border: 1px solid rgba(209, 213, 219, 0.3);
          }
          
          .dark .glass-morphism {
            background-color: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.125);
          }
          
          /* Enhanced input styling */
          .enhanced-input {
            position: relative;
            overflow: hidden;
          }
          
          .enhanced-input::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent);
            transition: left 0.8s ease;
            z-index: 1;
          }
          
          .enhanced-input:hover::before {
            left: 100%;
          }
          
          /* Custom button effects */
          .magical-button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            background-size: 400% 400%;
            animation: gradient-shift 3s ease infinite;
            position: relative;
            overflow: hidden;
          }
          
          .magical-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.8s ease;
          }
          
          .magical-button:hover::before {
            left: 100%;
          }
          
          /* Brand logo enhancements */
          .brand-logo {
            position: relative;
            display: inline-block;
          }
          
          .brand-logo::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, #8B5CF6, #EC4899);
            transition: width 0.6s ease;
          }
          
          .brand-logo:hover::after {
            width: 100%;
          }
          
          /* Loading spinner enhancement */
          .enhanced-spinner {
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden'>
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Enhanced Grid Pattern Background */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div className='relative z-10 min-h-screen flex items-center justify-center p-6'>
          <div className='w-full max-w-6xl mx-auto'>
            {/* Header Section */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl animate-glow-pulse">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                ✨ Sign in to your account and continue your journey with WriteWave
              </p>
            </div>

            {/* Main Content Container */}
            <div className='glass-morphism rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16'>
              <div className='flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16'>
                
                {/* Left Section - Enhanced */}
                <div className='flex-1 animate-slide-in-left'>
                  <div className="mb-8">
                    <Link
                      to="/"
                      className="brand-logo font-bold dark:text-white text-4xl lg:text-5xl inline-block hover:scale-105 transition-transform duration-300"
                    >
                      <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-2xl">
                        WriteWave
                      </span>
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100">
                      Continue Your Story
                    </h2>
                    <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
                      Welcome back to WriteWave! Sign in to access your dashboard, create amazing content, 
                      and connect with our vibrant community of writers and readers.
                    </p>
                    
                    {/* Feature highlights */}
                    <div className="space-y-4 mt-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">Create and publish your stories</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">Connect with fellow writers</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">Access your personalized dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Enhanced Form */}
                <div className='flex-1 animate-slide-in-right'>
                  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50">
                    <form className='space-y-8' onSubmit={handleSubmit}>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Sign In</h3>
                        <p className="text-gray-600 dark:text-gray-400">Enter your credentials to continue</p>
                      </div>

                      <div className="space-y-6">
                        <div className="enhanced-input">
                          <Label value='Email Address' className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 block" />
                          <TextInput 
                            type='email' 
                            placeholder='Enter your email address' 
                            id='email' 
                            onChange={handleChange}
                            className="text-lg p-4 rounded-xl border-2 border-transparent bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-purple-500/25"
                          />
                        </div>
                        
                        <div className="enhanced-input">
                          <Label value='Password' className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 block" />
                          <TextInput 
                            type='password' 
                            placeholder='Enter your password' 
                            id='password' 
                            onChange={handleChange}
                            className="text-lg p-4 rounded-xl border-2 border-transparent bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-pink-500/25"
                          />
                        </div>
                      </div>

                      <Button 
                        className="magical-button w-full py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-500"
                        type='submit' 
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-3">
                            <Spinner size='sm' className="enhanced-spinner" />
                            <span className='text-white'>Signing you in...</span>
                          </div>
                        ) : (
                          <span className="flex items-center justify-center gap-3 text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Sign In to WriteWave
                          </span>
                        )}
                      </Button>

                      {/* Enhanced OAuth */}
                      <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-medium">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <OAuth />
                    </form>

                    {/* Enhanced Sign Up Link */}
                    <div className='flex justify-center gap-2 text-lg mt-8 p-4 bg-gray-50/50 dark:bg-slate-700/50 rounded-xl backdrop-blur-xl'>
                      <span className="text-gray-600 dark:text-gray-400">Don't have an account?</span>
                      <Link 
                        to='/sign-up' 
                        className='text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105'
                      >
                        Sign Up Now
                      </Link>
                    </div>

                    {/* Enhanced Error Display */}
                    {error && (
                      <Alert className='mt-6 rounded-xl shadow-xl animate-shake backdrop-blur-xl' color='failure'>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold text-lg">{error}</span>
                        </div>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn