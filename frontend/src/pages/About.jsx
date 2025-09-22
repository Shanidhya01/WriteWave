import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse delay-2000"></div>

      <div className="relative flex items-center justify-center min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
                <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              About WriteWave
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Crafting digital experiences through the power of words and technology
            </p>
          </div>

          {/* Content Cards */}
          <div className="grid gap-8 md:gap-12">
            {/* Story Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-12 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-2 animate-slide-up">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Story</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Welcome to <span className="font-semibold text-indigo-600 dark:text-indigo-400">WriteWave</span>! This platform was created by <span className="font-semibold text-purple-600 dark:text-purple-400">Shanidhya</span> as a passion project to showcase the intersection of technology and storytelling. Built with modern web technologies including JavaScript, React, Node.js, Express.js, and MongoDB, this blog represents a commitment to both technical excellence and meaningful content creation.
              </p>
            </div>

            {/* Features Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-12 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-2 animate-slide-up-delayed">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Platform Features</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                WriteWave is more than just a blog—it's a comprehensive content management platform featuring an intuitive admin dashboard, user authentication via Google OAuth, interactive commenting system, and personalized user profiles. Every user can contribute to the conversation while maintaining a secure and engaging environment.
              </p>
              
              {/* Feature List */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">User Authentication</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Interactive Comments</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-pink-900/30 rounded-xl">
                  <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Profile Management</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Admin Dashboard</span>
                </div>
              </div>
            </div>

            {/* Community Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-12 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-2 animate-slide-up-more-delayed">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join Our Community</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We believe in the power of community-driven learning and discussion. Share your thoughts, engage with fellow readers, and become part of a vibrant ecosystem where knowledge flows freely. Every comment, like, and interaction helps build a stronger, more connected community of learners and thinkers.
              </p>
            </div>

            {/* Creator Section */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-xl p-8 md:p-12 text-center animate-fade-in-final">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">S</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Shanidhya</h3>
                <p className="text-gray-600 dark:text-gray-400">Full-Stack Developer</p>
              </div>
              <p className="text-white text-lg font-medium">
                Made with <span className="text-red-300 text-xl">♥️</span> and countless hours of passionate coding
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-slide-up-delayed {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-slide-up-more-delayed {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-final {
          animation: fade-in 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default About;
