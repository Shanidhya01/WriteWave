import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/theme/themeSlice";
import { signoutSuccess } from "../Redux/user/userSlice";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])

  const handleSignout = async ()=>{
    try {
      const res = await fetch(`/api/user/signout`, {
        method: 'POST'
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message);
      } else {
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  
  return (
    <>
      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translateY(0);
            }
            40%, 43% {
              transform: translateY(-10px);
            }
            70% {
              transform: translateY(-5px);
            }
            90% {
              transform: translateY(-2px);
            }
          }
          
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
            }
            50% {
              box-shadow: 0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(236, 72, 153, 0.6);
            }
          }
          
          @keyframes gradient-shift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          @keyframes sparkle {
            0%, 100% {
              opacity: 0;
              transform: scale(0) rotate(0deg);
            }
            50% {
              opacity: 1;
              transform: scale(1) rotate(180deg);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          
          /* Enhanced navbar styling */
          .enhanced-navbar {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            border-bottom: 2px solid rgba(139, 92, 246, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
            position: sticky;
            top: 0;
            z-index: 50;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: fadeInDown 0.8s ease-out;
          }
          
          .dark .enhanced-navbar {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
            border-bottom: 2px solid rgba(139, 92, 246, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          
          /* Enhanced logo styling */
          .enhanced-logo {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            animation: slideInRight 0.8s ease-out;
          }
          
          .enhanced-logo:hover {
            transform: scale(1.05);
          }
          
          .logo-gradient {
            background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
            background-size: 400% 400%;
            animation: gradient-shift 4s ease infinite;
            position: relative;
            overflow: hidden;
          }
          
          .logo-gradient::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.8s ease;
          }
          
          .logo-gradient:hover::before {
            left: 100%;
          }
          
          /* Enhanced search input */
          .enhanced-search {
            position: relative;
            overflow: hidden;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            border: 2px solid rgba(139, 92, 246, 0.2);
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(139, 92, 246, 0.1);
          }
          
          .dark .enhanced-search {
            background: rgba(15, 23, 42, 0.8);
            border: 2px solid rgba(139, 92, 246, 0.3);
          }
          
          .enhanced-search:hover {
            border-color: rgba(139, 92, 246, 0.4);
            box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
            transform: translateY(-2px);
          }
          
          .enhanced-search:focus-within {
            border-color: rgba(139, 92, 246, 0.6);
            box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
            transform: scale(1.02);
          }
          
          .enhanced-search input {
            background: transparent !important;
            border: none !important;
            font-size: 16px;
            padding: 12px 16px;
            color: inherit;
          }
          
          .enhanced-search input::placeholder {
            color: rgba(139, 92, 246, 0.6);
            font-weight: 500;
          }
          
          /* Enhanced buttons */
          .enhanced-button {
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 600;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          }
          
          .enhanced-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          }
          
          .theme-toggle-btn {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            border: 2px solid rgba(139, 92, 246, 0.2);
            color: var(--purple-600);
            position: relative;
            overflow: hidden;
          }
          
          .dark .theme-toggle-btn {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
            border: 2px solid rgba(139, 92, 246, 0.3);
            color: var(--purple-400);
          }
          
          .theme-toggle-btn:hover {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
            border-color: rgba(139, 92, 246, 0.4);
            animation: glow 2s ease-in-out infinite;
          }
          
          .theme-icon {
            transition: all 0.3s ease;
            animation: float 3s ease-in-out infinite;
          }
          
          .theme-toggle-btn:hover .theme-icon {
            transform: scale(1.2) rotate(180deg);
            animation: bounce 1s ease infinite;
          }
          
          /* Enhanced navigation links */
          .nav-link {
            position: relative;
            padding: 12px 20px;
            border-radius: 12px;
            transition: all 0.3s ease;
            font-weight: 600;
            color: var(--text-secondary);
          }
          
          .nav-link::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--purple-500), var(--pink-500));
            transition: all 0.3s ease;
            transform: translateX(-50%);
            border-radius: 2px;
          }
          
          .nav-link:hover::before,
          .nav-link.active::before {
            width: 80%;
          }
          
          .nav-link:hover {
            background: rgba(139, 92, 246, 0.1);
            color: var(--purple-600);
            transform: translateY(-2px);
          }
          
          .dark .nav-link:hover {
            background: rgba(139, 92, 246, 0.2);
            color: var(--purple-400);
          }
          
          .nav-link.active {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%);
            color: var(--purple-600);
          }
          
          .dark .nav-link.active {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.25) 100%);
            color: var(--purple-400);
          }
          
          /* Enhanced dropdown */
          .enhanced-dropdown {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            animation: fadeInDown 0.3s ease-out;
          }
          
          .dark .enhanced-dropdown {
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid rgba(139, 92, 246, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          
          .dropdown-header {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            padding: 16px;
            border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          }
          
          .dropdown-item {
            padding: 12px 16px;
            transition: all 0.3s ease;
            font-weight: 500;
          }
          
          .dropdown-item:hover {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            color: var(--purple-600);
            transform: translateX(5px);
          }
          
          .dark .dropdown-item:hover {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
            color: var(--purple-400);
          }
          
          /* Enhanced avatar */
          .enhanced-avatar {
            border: 3px solid transparent;
            background: linear-gradient(135deg, var(--purple-500), var(--pink-500));
            border-radius: 50%;
            padding: 2px;
            transition: all 0.3s ease;
            animation: glow 3s ease-in-out infinite;
          }
          
          .enhanced-avatar:hover {
            transform: scale(1.1);
            animation: bounce 0.6s ease;
          }
          
          .enhanced-avatar img {
            border-radius: 50%;
          }
          
          /* Create post button enhancement */
          .create-post-btn {
            background: linear-gradient(135deg, var(--purple-500) 0%, var(--pink-500) 100%);
            border: none;
            color: white;
            font-weight: 700;
            padding: 12px 24px;
            border-radius: 12px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
          }
          
          .create-post-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s ease;
          }
          
          .create-post-btn:hover::before {
            left: 100%;
          }
          
          .create-post-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
          }
          
          /* Sign in button enhancement */
          .signin-btn {
            background: transparent;
            border: 2px solid;
            border-image: linear-gradient(135deg, var(--purple-500), var(--indigo-500)) 1;
            color: var(--purple-600);
            font-weight: 700;
            padding: 12px 24px;
            border-radius: 12px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .dark .signin-btn {
            color: var(--purple-400);
          }
          
          .signin-btn:hover {
            background: linear-gradient(135deg, var(--purple-500), var(--indigo-500));
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
          }
          
          /* Mobile search button */
          .mobile-search-btn {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            border: 2px solid rgba(139, 92, 246, 0.2);
            color: var(--purple-600);
            transition: all 0.3s ease;
          }
          
          .dark .mobile-search-btn {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
            border: 2px solid rgba(139, 92, 246, 0.3);
            color: var(--purple-400);
          }
          
          .mobile-search-btn:hover {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
            transform: scale(1.1);
          }
          
          /* Sparkle effect */
          .sparkle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--purple-400);
            border-radius: 50%;
            animation: sparkle 2s ease-in-out infinite;
          }
          
          .sparkle:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
          .sparkle:nth-child(2) { top: 60%; left: 80%; animation-delay: 0.5s; }
          .sparkle:nth-child(3) { top: 80%; left: 40%; animation-delay: 1s; }
          
          /* Responsive enhancements */
          @media (max-width: 768px) {
            .enhanced-navbar {
              padding: 8px 16px;
            }
            
            .enhanced-search {
              width: 100%;
              margin: 8px 0;
            }
            
            .nav-link {
              padding: 8px 16px;
              margin: 4px 0;
            }
          }
        `}
      </style>
      
      <Navbar className="enhanced-navbar border-none">
        {/* Sparkle effects */}
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        
        <Link
          to="/"
          className="enhanced-logo self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="logo-gradient px-4 py-2 rounded-xl text-white shadow-lg">
            WriteWave
          </span>
          <span className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
            Blog
          </span>
        </Link>
        
        <form onSubmit={handleSubmit} className="enhanced-search hidden sm:block">
          <TextInput
            type="text"
            placeholder="🔍 Search amazing posts..."
            rightIcon={AiOutlineSearch}
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="border-none focus:ring-0"
          />
        </form>
        
        <Link to='/search'>
          <Button className="mobile-search-btn enhanced-button w-12 h-10 sm:hidden" pill>
            <AiOutlineSearch />
          </Button>
        </Link>
        
        <div className="flex gap-3 md:order-2 items-center">
          <Button 
            className="theme-toggle-btn enhanced-button w-12 h-10" 
            pill 
            onClick={()=>dispatch(toggleTheme())}
          >
            <div className="theme-icon">
              {theme === 'light' ? <FaMoon/> : <FaSun />}
            </div>
          </Button>
          
          {/* Show Create Post button ONLY for ADMIN users */}
          {currentUser && currentUser.isAdmin && (
            <Link to="/create-post">
              <Button className="create-post-btn enhanced-button">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Post
                </span>
              </Button>
            </Link>
          )}
          
          {currentUser ? (
            <Dropdown 
              arrowIcon={false}
              inline
              label={
                <div className="enhanced-avatar">
                  <UserAvatar
                    src={currentUser.profilePicture}
                    alt={currentUser.username}
                    size="md"
                  />
                </div>
              }
              className="enhanced-dropdown"
            >
              <Dropdown.Header className="dropdown-header">
                <span className="block text-sm font-bold text-purple-600 dark:text-purple-400">
                  @{currentUser.username}
                </span>
                <span className="block text-sm font-medium truncate text-gray-600 dark:text-gray-300">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item className="dropdown-item">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </span>
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item className="dropdown-item text-red-500" onClick={handleSignout}>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </span>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button className="signin-btn enhanced-button">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </span>
              </Button>
            </Link>
          )}
          <Navbar.Toggle className="enhanced-button" />
        </div>
        
        <Navbar.Collapse className="mt-4 md:mt-0">
          <Navbar.Link active={path === "/"} as={"div"} className="nav-link">
            <Link to="/" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"} className="nav-link">
            <a 
              href="https://shanidhyakumar.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Projects
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"} className="nav-link">
            <Link to="/about" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;