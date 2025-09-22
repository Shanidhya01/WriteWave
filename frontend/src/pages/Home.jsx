import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCard from '../components/PostCard'

const Home = () => {
  const [posts, setPosts] = useState([])
  const { currentUser } = useSelector((state) => state.user);

  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getPosts')
      const data = await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl opacity-20 animate-pulse delay-2000"></div>
        
        <div className="relative flex flex-col gap-8 p-16 px-6 max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-fade-in">
            Welcome to WriteWave
          </h1>
          
          {/* Subheading */}
          <h2 className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 animate-fade-in-delayed">
            Where Ideas Flow and Stories Come to Life
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Discover a universe of knowledge through our diverse collection of articles. 
            From fascinating history to cutting-edge technology, automotive innovations to scientific breakthroughs - 
            embark on a journey of continuous learning and inspiration.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delayed">
            <Link 
              to={'/search'} 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Explore All Posts</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>{posts.length} Articles Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-7xl mx-auto p-6 flex flex-col gap-12 py-16">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-8">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Latest Stories
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Fresh perspectives and insights from our community of writers
              </p>
            </div>
            
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {posts.map((post, index) => (
                <div 
                  key={post._id} 
                  className="animate-fade-in-stagger"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            
            {/* View All Link */}
            <div className="text-center mt-8">
              <Link 
                to={'/search'} 
                className="group inline-flex items-center text-lg text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors duration-300"
              >
                View All Articles
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* Empty State - Updated to remove Create Post button for non-admins */}
        {(!posts || posts.length === 0) && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No Posts Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Be the first to share your story with the community!</p>
            {/* Create Post button is now conditionally rendered based on user role */}
            {currentUser && currentUser.isAdmin && (
              <Link 
                to="/create-post" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Create First Post
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Add custom styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-stagger {
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

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-slide-up-delayed {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.6s ease-out forwards;
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

export default Home;
