import { Button, Select, Sidebar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getPosts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e)=>{
    if(e.target.id === 'searchTerm'){
        setSidebarData({...sidebarData, searchTerm: e.target.value})
    }
    if(e.target.id === 'sort'){
        const order = e.target.value || 'desc'
        setSidebarData({...sidebarData, sort: order})
    }
    if(e.target.id === 'category'){
        const category = e.target.value || 'uncategorized'
        setSidebarData({...sidebarData, category})
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm', sidebarData.searchTerm)
    urlParams.set('sort', sidebarData.sort)
    urlParams.set('category', sidebarData.category)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const handleShowMore = async()=>{
    const numberOfPosts = posts.length
    const startIndex = numberOfPosts
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex', startIndex)
    const searchQuery = urlParams.toString()
    
    const res = await fetch(`/api/post/getposts?${searchQuery}`)
    if(!res.ok){
        return
    }
    if(res.ok){
        const data = await res.json()
        setPosts([...posts, ...data.posts])
        if(data.posts.length === 9){
            setShowMore(true)
        } else {
            setShowMore(false)
        }
    }
  }

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
            33% { transform: translateY(-8px) rotate(1deg); }
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
          
          @keyframes pulse-search {
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
          
          .animate-pulse-search {
            animation: pulse-search 2s ease-in-out infinite;
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
          
          /* Enhanced search sidebar */
          .search-sidebar {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
            backdrop-filter: blur(20px);
            border-right: 1px solid rgba(139, 92, 246, 0.2);
            box-shadow: 4px 0 24px rgba(139, 92, 246, 0.1);
          }
          
          .dark .search-sidebar {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%);
            border-right: 1px solid rgba(139, 92, 246, 0.3);
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
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
          
          /* Enhanced search results area */
          .search-results-area {
            background: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(255, 255, 255, 0.8) 100%);
            backdrop-filter: blur(12px);
            min-height: 100vh;
          }
          
          .dark .search-results-area {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.8) 100%);
          }
          
          /* Loading animation */
          .loading-shimmer {
            position: relative;
            overflow: hidden;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
          
          .dark .loading-shimmer {
            background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
            background-size: 200% 100%;
          }
          
          /* Enhanced filter form */
          .filter-form {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border-radius: 1.5rem;
            padding: 2rem;
            border: 1px solid rgba(139, 92, 246, 0.2);
            box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
          }
          
          .dark .filter-form {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(139, 92, 246, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          
          /* Post grid enhancements */
          .post-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
            padding: 2rem;
          }
          
          @media (max-width: 768px) {
            .post-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
              padding: 1rem;
            }
          }
          
          /* Magical button styles */
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
          
          /* Show more button enhancement */
          .show-more-btn {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            border: 2px solid transparent;
            background-clip: padding-box;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          
          .show-more-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #8B5CF6, #EC4899);
            z-index: -1;
            margin: -2px;
            border-radius: inherit;
          }
          
          .show-more-btn:hover {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.25);
          }
        `}
      </style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Enhanced Grid Pattern Background */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
          {/* Enhanced Search Sidebar */}
          <div className="lg:w-80 search-sidebar animate-slide-in-left">
            <div className="p-8">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg animate-glow-pulse">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Search & Filter
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Find the perfect posts with our advanced search</p>
              </div>

              {/* Enhanced Filter Form */}
              <div className="filter-form">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                      <span className="text-xl">🔍</span>
                      Search Term
                    </label>
                    <div className="enhanced-input">
                      <TextInput
                        placeholder="What are you looking for?"
                        id="searchTerm"
                        type="text"
                        value={sidebarData.searchTerm}    
                        onChange={handleChange}
                        className="text-lg p-4 rounded-xl border-2 border-transparent bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-purple-500/25"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                      <span className="text-xl">📅</span>
                      Sort By
                    </label>
                    <Select 
                      onChange={handleChange} 
                      value={sidebarData.sort} 
                      id='sort'
                      className="text-lg p-4 rounded-xl border-2 border-transparent bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-pink-500/25"
                    >
                      <option value="desc">📆 Latest First</option>
                      <option value="asc">🕰️ Oldest First</option>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                      <span className="text-xl">🏷️</span>
                      Category
                    </label>
                    <Select 
                      onChange={handleChange} 
                      value={sidebarData.category} 
                      id='category'
                      className="text-lg p-4 rounded-xl border-2 border-transparent bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-indigo-500/25"
                    >
                      <option value="uncategorized">📋 All Categories</option>
                      <option value="history">📚 History</option>
                      <option value="science">🔬 Science</option>
                      <option value="automobile">🚗 Automobile</option>
                      <option value="technology">💻 Technology</option>
                      <option value="travel">✈️ Travel</option>
                      <option value="lifestyle">🌟 Lifestyle</option>
                      <option value="food">🍕 Food & Cooking</option>
                      <option value="sports">⚽ Sports</option>
                      <option value="music">🎵 Music</option>
                      <option value="art">🎨 Art & Design</option>
                    </Select>
                  </div>
                  
                  <Button 
                    type='submit' 
                    className="magical-button w-full py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-500"
                  >
                    <span className="flex items-center justify-center gap-3 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Apply Filters
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Enhanced Search Results Area */}
          <div className="flex-1 search-results-area animate-slide-in-right">
            <div className="p-8">
              {/* Results Header */}
              <div className="mb-8">
                <div className="glass-morphism rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg animate-pulse-search">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Search Results
                    </h1>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {loading ? "Searching..." : `Found ${posts.length} post${posts.length !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>

              {/* Results Content */}
              <div className="animate-fade-in">
                {!loading && posts.length === 0 && (
                  <div className="glass-morphism rounded-3xl p-16 text-center shadow-2xl animate-bounce-in">
                    <div className="p-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-3xl shadow-2xl inline-block mb-6">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">No Posts Found</h3>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </div>
                )}
                
                {loading && (
                  <div className="glass-morphism rounded-3xl p-16 text-center shadow-2xl">
                    <div className="loading-shimmer w-16 h-16 rounded-full mx-auto mb-6"></div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                      Searching Posts...
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Please wait while we find the best results for you.
                    </p>
                  </div>
                )}
                
                {!loading && posts && posts.length > 0 && (
                  <div className="post-grid">
                    {posts.map((post, index) => (
                      <div 
                        key={post._id} 
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <PostCard post={post} />
                      </div>
                    ))}
                  </div>
                )}
                
                {showMore && (
                  <div className="text-center mt-12">
                    <button 
                      className="show-more-btn px-12 py-4 text-xl font-bold text-purple-600 dark:text-purple-400 rounded-2xl hover:text-white transition-all duration-500 transform hover:scale-105"
                      onClick={handleShowMore}
                    >
                      <span className="flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        Load More Posts
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
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

export default Search;