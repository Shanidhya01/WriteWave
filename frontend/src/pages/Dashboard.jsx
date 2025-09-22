import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashBoardComp from "../components/DashBoardComp";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  
  return (
    <>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slide-in-left {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slide-in-right {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
          }
          
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
            50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(236, 72, 153, 0.4); }
          }
          
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes bounce-in {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
          }
          
          @keyframes pulse-dashboard {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.8s ease-out;
          }
          
          .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out;
          }
          
          .animate-slide-in-right {
            animation: slide-in-right 0.8s ease-out 0.2s both;
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
          
          .animate-bounce-in {
            animation: bounce-in 1s ease-out;
          }
          
          .animate-pulse-dashboard {
            animation: pulse-dashboard 2s ease-in-out infinite;
          }
          
          /* Glass morphism effect */
          .glass-morphism {
            backdrop-filter: blur(16px) saturate(180%);
            background-color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(209, 213, 219, 0.3);
          }
          
          .dark .glass-morphism {
            background-color: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.125);
          }
          
          /* Enhanced sidebar styling */
          .dashboard-sidebar {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
            backdrop-filter: blur(20px);
            border-right: 1px solid rgba(209, 213, 219, 0.3);
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;
          }
          
          .dark .dashboard-sidebar {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
          }
          
          /* Enhanced main content area */
          .dashboard-content {
            position: relative;
            background: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(255, 255, 255, 0.8) 100%);
            backdrop-filter: blur(12px);
            min-height: 100vh;
            overflow: hidden;
          }
          
          .dark .dashboard-content {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.8) 100%);
          }
          
          /* Content transition effects */
          .content-transition {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Loading shimmer effect */
          .shimmer-loading {
            position: relative;
            overflow: hidden;
          }
          
          .shimmer-loading::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: shimmer 2s infinite;
          }
          
          /* Enhanced grid pattern */
          .dashboard-pattern {
            background-image: 
              radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.1) 1px, transparent 0);
            background-size: 20px 20px;
          }
          
          /* Tab content wrapper */
          .tab-content-wrapper {
            position: relative;
            padding: 2rem;
            border-radius: 1.5rem;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(209, 213, 219, 0.2);
            margin: 1rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
          }
          
          .dark .tab-content-wrapper {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          
          .tab-content-wrapper:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          }
          
          .dark .tab-content-wrapper:hover {
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          }
        `}
      </style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          
          {/* Additional subtle floating elements */}
          <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Enhanced Grid Pattern Background */}
        <div className="absolute inset-0 dashboard-pattern opacity-30"></div>

        {/* Main Dashboard Layout */}
        <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
          
          {/* Enhanced Sidebar */}
          <div className="md:w-56 dashboard-sidebar animate-slide-in-left">
            <div className="relative h-full">
              {/* Sidebar glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
              
              {/* Sidebar content */}
              <div className="relative z-10">
                <DashSidebar />
              </div>
            </div>
          </div>

          {/* Enhanced Main Content Area */}
          <div className="flex-1 dashboard-content animate-slide-in-right">
            <div className="relative h-full">
              {/* Content background pattern */}
              <div className="absolute inset-0 opacity-20" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z'/%3E%3C/g%3E%3C/svg%3E")`
                }}
              ></div>
              
              {/* Tab Content with Enhanced Wrapper */}
              <div className="relative z-10 content-transition">
                {tab === "profile" && (
                  <div className="tab-content-wrapper animate-fade-in">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg animate-glow-pulse">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Profile Settings
                        </h1>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Manage your account settings and preferences</p>
                    </div>
                    <DashProfile />
                  </div>
                )}
                
                {tab === "posts" && (
                  <div className="tab-content-wrapper animate-fade-in">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg animate-pulse-dashboard">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          Manage Posts
                        </h1>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Create, edit, and organize your blog posts</p>
                    </div>
                    <DashPosts />
                  </div>
                )}
                
                {tab === "users" && (
                  <div className="tab-content-wrapper animate-fade-in">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg animate-glow-pulse">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          User Management
                        </h1>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Manage users and their permissions</p>
                    </div>
                    <DashUsers />
                  </div>
                )}
                
                {tab === "comments" && (
                  <div className="tab-content-wrapper animate-fade-in">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg animate-pulse-dashboard">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          Comments
                        </h1>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Moderate and manage user comments</p>
                    </div>
                    <DashComments />
                  </div>
                )}
                
                {tab === "dashboard" && (
                  <div className="tab-content-wrapper animate-fade-in">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg animate-gradient-shift">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Dashboard Overview
                        </h1>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Monitor your blog's performance and analytics</p>
                    </div>
                    <DashBoardComp />
                  </div>
                )}

                {/* Default state when no tab is selected */}
                {!tab && (
                  <div className="tab-content-wrapper animate-bounce-in flex items-center justify-center min-h-96">
                    <div className="text-center">
                      <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl animate-glow-pulse inline-block mb-6">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        Welcome to Dashboard
                      </h2>
                      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                        Select a tab from the sidebar to get started with managing your WriteWave account.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;