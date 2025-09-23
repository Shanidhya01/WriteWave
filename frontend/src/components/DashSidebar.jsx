import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineAnnotation, HiOutlineUserGroup, HiUser, HiUserGroup } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../Redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <style>
        {`
          /* Ultra Advanced Keyframes */
          @keyframes sidebarSlideIn {
            0% {
              opacity: 0;
              transform: translateX(-40px) scale(0.98);
              filter: blur(6px);
            }
            60% {
              opacity: 0.9;
              transform: translateX(2px) scale(1.01);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
              filter: blur(0px);
            }
          }
          
          @keyframes itemSlideIn {
            0% {
              opacity: 0;
              transform: translateX(-30px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          
          @keyframes gradientFlow {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          @keyframes shimmerEffect {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(100%);
              opacity: 0;
            }
          }
          
          @keyframes iconFloat {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(-3px) scale(1.05);
            }
          }
          
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
            }
            50% {
              box-shadow: 0 0 25px rgba(99, 102, 241, 0.6);
            }
          }
          
          @keyframes labelPulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }
          
          @keyframes morphBorder {
            0%, 100% {
              border-radius: 16px;
            }
            25% {
              border-radius: 20px 12px 16px 14px;
            }
            50% {
              border-radius: 14px 18px 12px 16px;
            }
            75% {
              border-radius: 18px 14px 20px 12px;
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
          
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(4);
              opacity: 0;
            }
          }
          
          @keyframes signoutPulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3);
            }
            70% {
              transform: scale(1.02);
              box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
            }
          }
          
          /* Ultra Enhanced Sidebar Container */
          .enhanced-sidebar-container {
            width: 100% !important;
            background: linear-gradient(145deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(248, 250, 252, 0.95) 100%) !important;
            backdrop-filter: blur(25px) saturate(180%) !important;
            border-right: 2px solid rgba(99, 102, 241, 0.1) !important;
            box-shadow: 
              8px 0 32px rgba(99, 102, 241, 0.1),
              4px 0 16px rgba(0, 0, 0, 0.05) !important;
            position: relative !important;
            overflow: hidden !important;
            animation: sidebarSlideIn 1s ease-out !important;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          }
          
          .dark .enhanced-sidebar-container {
            background: linear-gradient(145deg, 
              rgba(15, 23, 42, 0.95) 0%, 
              rgba(30, 41, 59, 0.95) 100%) !important;
            border-right: 2px solid rgba(99, 102, 241, 0.2) !important;
            box-shadow: 
              8px 0 32px rgba(0, 0, 0, 0.3),
              4px 0 16px rgba(99, 102, 241, 0.2) !important;
          }
          
          /* Advanced Background Effects */
          .enhanced-sidebar-container::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
                        linear-gradient(135deg, rgba(236, 72, 153, 0.03) 0%, transparent 50%);
            opacity: 0.8;
            animation: gradientFlow 20s ease infinite;
            pointer-events: none;
          }
          
          .enhanced-sidebar-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.15), 
              transparent);
            transition: left 2s ease;
            pointer-events: none;
          }
          
          .enhanced-sidebar-container:hover::after {
            left: 100%;
          }
          
          .enhanced-sidebar-container:hover {
            box-shadow: 
              12px 0 48px rgba(99, 102, 241, 0.15),
              6px 0 24px rgba(99, 102, 241, 0.1) !important;
          }
          
          .dark .enhanced-sidebar-container:hover {
            box-shadow: 
              12px 0 48px rgba(99, 102, 241, 0.3),
              6px 0 24px rgba(0, 0, 0, 0.4) !important;
          }
          
          /* Enhanced Sidebar Items Container */
          .enhanced-sidebar-items {
            padding: 24px 16px !important;
            position: relative;
            z-index: 2;
          }
          
          .enhanced-sidebar-group {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
          }
          
          /* Ultra Enhanced Sidebar Item */
          .enhanced-sidebar-item {
            background: rgba(255, 255, 255, 0.4) !important;
            border: 2px solid rgba(99, 102, 241, 0.08) !important;
            border-radius: 16px !important;
            padding: 14px 16px !important;
            margin: 4px 0 !important;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            position: relative !important;
            overflow: hidden !important;
            backdrop-filter: blur(10px) !important;
            text-decoration: none !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            color: #374151 !important;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.05) !important;
            animation: itemSlideIn 0.8s ease-out !important;
          }
          
          .dark .enhanced-sidebar-item {
            background: rgba(30, 41, 59, 0.4) !important;
            border: 2px solid rgba(99, 102, 241, 0.15) !important;
            color: #e5e7eb !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2) !important;
          }
          
          /* Sidebar Item Hover Effects */
          .enhanced-sidebar-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(99, 102, 241, 0.1), 
              transparent);
            transition: left 1s ease;
            border-radius: 16px;
          }
          
          .enhanced-sidebar-item:hover::before {
            left: 100%;
          }
          
          .enhanced-sidebar-item:hover {
            transform: translateX(4px) scale(1.02) !important;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.1), 
              rgba(168, 85, 247, 0.08)) !important;
            border-color: rgba(99, 102, 241, 0.2) !important;
            box-shadow: 
              0 8px 32px rgba(99, 102, 241, 0.15),
              0 4px 16px rgba(99, 102, 241, 0.1) !important;
            color: #6366f1 !important;
            animation: morphBorder 6s ease infinite !important;
          }
          
          .dark .enhanced-sidebar-item:hover {
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.2), 
              rgba(168, 85, 247, 0.15)) !important;
            border-color: rgba(99, 102, 241, 0.3) !important;
            box-shadow: 
              0 8px 32px rgba(99, 102, 241, 0.25),
              0 4px 16px rgba(99, 102, 241, 0.2) !important;
            color: #a78bfa !important;
          }
          
          /* Active Sidebar Item */
          .enhanced-sidebar-item.active {
            background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
            border-color: rgba(99, 102, 241, 0.3) !important;
            color: white !important;
            box-shadow: 
              0 12px 40px rgba(99, 102, 241, 0.4),
              0 6px 20px rgba(99, 102, 241, 0.3),
              inset 0 2px 0 rgba(255, 255, 255, 0.2) !important;
            transform: translateX(6px) scale(1.03) !important;
            animation: pulseGlow 3s ease infinite !important;
          }
          
          .enhanced-sidebar-item.active::before {
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.2), 
              transparent);
          }
          
          .enhanced-sidebar-item.active:hover {
            transform: translateX(8px) scale(1.05) !important;
            box-shadow: 
              0 16px 48px rgba(99, 102, 241, 0.5),
              0 8px 24px rgba(99, 102, 241, 0.4),
              inset 0 2px 0 rgba(255, 255, 255, 0.3) !important;
            filter: brightness(110%) !important;
          }
          
          /* Enhanced Icons */
          .enhanced-sidebar-icon {
            font-size: 18px !important;
            transition: all 0.6s ease !important;
            flex-shrink: 0 !important;
          }
          
          .enhanced-sidebar-item:hover .enhanced-sidebar-icon {
            animation: iconFloat 2s ease infinite !important;
            filter: drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3)) !important;
          }
          
          .enhanced-sidebar-item.active .enhanced-sidebar-icon {
            filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.5)) !important;
            animation: iconFloat 2s ease infinite !important;
          }
          
          /* Enhanced Labels */
          .enhanced-sidebar-label {
            background: linear-gradient(135deg, #f59e0b, #d97706) !important;
            color: white !important;
            font-size: 10px !important;
            font-weight: 800 !important;
            padding: 4px 8px !important;
            border-radius: 12px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3) !important;
            animation: labelPulse 2s ease infinite !important;
            margin-left: auto !important;
          }
          
          .enhanced-sidebar-item:hover .enhanced-sidebar-label {
            transform: scale(1.1) !important;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5) !important;
          }
          
          /* Enhanced Sign Out Button */
          .enhanced-signout-item {
            background: linear-gradient(135deg, 
              rgba(239, 68, 68, 0.1), 
              rgba(220, 38, 38, 0.1)) !important;
            border: 2px solid rgba(239, 68, 68, 0.2) !important;
            border-radius: 16px !important;
            padding: 14px 16px !important;
            margin: 12px 0 4px 0 !important;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            position: relative !important;
            overflow: hidden !important;
            backdrop-filter: blur(10px) !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            font-weight: 700 !important;
            font-size: 14px !important;
            color: #dc2626 !important;
            box-shadow: 0 4px 16px rgba(239, 68, 68, 0.1) !important;
          }
          
          .dark .enhanced-signout-item {
            background: linear-gradient(135deg, 
              rgba(239, 68, 68, 0.15), 
              rgba(220, 38, 38, 0.15)) !important;
            border: 2px solid rgba(239, 68, 68, 0.25) !important;
            color: #f87171 !important;
            box-shadow: 0 4px 16px rgba(239, 68, 68, 0.2) !important;
          }
          
          .enhanced-signout-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(239, 68, 68, 0.2), 
              transparent);
            transition: left 1s ease;
            border-radius: 16px;
          }
          
          .enhanced-signout-item:hover::before {
            left: 100%;
          }
          
          .enhanced-signout-item:hover {
            transform: translateX(4px) scale(1.02) !important;
            background: linear-gradient(135deg, #ef4444, #dc2626) !important;
            border-color: rgba(239, 68, 68, 0.4) !important;
            color: white !important;
            box-shadow: 
              0 8px 32px rgba(239, 68, 68, 0.3),
              0 4px 16px rgba(239, 68, 68, 0.2) !important;
            animation: signoutPulse 2s ease infinite !important;
          }
          
          .enhanced-signout-item:hover .enhanced-sidebar-icon {
            animation: iconFloat 1.5s ease infinite !important;
            filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.5)) !important;
          }
          
          /* Floating Sparkles */
          .sparkle-sidebar {
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #6366f1, #a855f7);
            border-radius: 50%;
            opacity: 0;
            animation: sparkle 5s ease-in-out infinite;
            z-index: 1;
          }
          
          .sparkle-1 { top: 10%; left: 80%; animation-delay: 0s; }
          .sparkle-2 { top: 30%; right: 10%; animation-delay: 1.7s; }
          .sparkle-3 { bottom: 40%; left: 15%; animation-delay: 3.4s; }
          .sparkle-4 { top: 70%; left: 85%; animation-delay: 5.1s; }
          
          .enhanced-sidebar-container:hover .sparkle-sidebar {
            opacity: 1;
          }
          
          /* Individual Item Animation Delays */
          .enhanced-sidebar-item:nth-child(1) { animation-delay: 0.1s; }
          .enhanced-sidebar-item:nth-child(2) { animation-delay: 0.2s; }
          .enhanced-sidebar-item:nth-child(3) { animation-delay: 0.3s; }
          .enhanced-sidebar-item:nth-child(4) { animation-delay: 0.4s; }
          .enhanced-sidebar-item:nth-child(5) { animation-delay: 0.5s; }
          .enhanced-signout-item { animation-delay: 0.6s; }
          
          /* Responsive Design */
          @media (max-width: 768px) {
            .enhanced-sidebar-container {
              width: 100% !important;
              border-right: none !important;
              border-bottom: 2px solid rgba(99, 102, 241, 0.1) !important;
              box-shadow: 
                0 4px 16px rgba(99, 102, 241, 0.1),
                0 2px 8px rgba(0, 0, 0, 0.05) !important;
            }
            
            .dark .enhanced-sidebar-container {
              border-bottom: 2px solid rgba(99, 102, 241, 0.2) !important;
              box-shadow: 
                0 4px 16px rgba(0, 0, 0, 0.3),
                0 2px 8px rgba(99, 102, 241, 0.2) !important;
            }
            
            .enhanced-sidebar-items {
              padding: 16px 12px !important;
            }
            
            .enhanced-sidebar-group {
              gap: 6px !important;
            }
            
            .enhanced-sidebar-item {
              padding: 12px 14px !important;
              font-size: 13px !important;
            }
            
            .enhanced-signout-item {
              padding: 12px 14px !important;
              font-size: 13px !important;
              margin: 8px 0 4px 0 !important;
            }
            
            .enhanced-sidebar-icon {
              font-size: 16px !important;
            }
            
            .enhanced-sidebar-label {
              font-size: 9px !important;
              padding: 3px 6px !important;
            }
          }
          
          @media (max-width: 480px) {
            .enhanced-sidebar-items {
              padding: 12px 8px !important;
            }
            
            .enhanced-sidebar-item {
              padding: 10px 12px !important;
              font-size: 12px !important;
              gap: 10px !important;
            }
            
            .enhanced-signout-item {
              padding: 10px 12px !important;
              font-size: 12px !important;
              gap: 10px !important;
            }
            
            .enhanced-sidebar-icon {
              font-size: 14px !important;
            }
            
            .enhanced-sidebar-label {
              font-size: 8px !important;
              padding: 2px 5px !important;
            }
          }
          
          /* Override Flowbite Default Styles */
          .enhanced-sidebar-container .flowbite-sidebar {
            background: transparent !important;
            border: none !important;
          }
          
          .enhanced-sidebar-container .flowbite-sidebar-items {
            background: transparent !important;
            padding: 0 !important;
          }
          
          .enhanced-sidebar-container .flowbite-sidebar-item-group {
            background: transparent !important;
            border: none !important;
          }
          
          .enhanced-sidebar-container .flowbite-sidebar-item {
            background: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            color: inherit !important;
          }
          
          .enhanced-sidebar-container .flowbite-sidebar-item:hover {
            background: transparent !important;
          }
          
          .enhanced-sidebar-container .flowbite-sidebar-item[aria-current="page"] {
            background: transparent !important;
          }
        `}
      </style>

      <Sidebar className="enhanced-sidebar-container">
        {/* Floating Sparkles */}
        <div className="sparkle-sidebar sparkle-1"></div>
        <div className="sparkle-sidebar sparkle-2"></div>
        <div className="sparkle-sidebar sparkle-3"></div>
        <div className="sparkle-sidebar sparkle-4"></div>

        <Sidebar.Items className="enhanced-sidebar-items">
          <Sidebar.ItemGroup className="enhanced-sidebar-group">
            <Link to="/dashboard?tab=profile" style={{ textDecoration: 'none' }}>
              <div className={`enhanced-sidebar-item ${tab === "profile" ? "active" : ""}`}>
                <HiUser className="enhanced-sidebar-icon" />
                <span>Profile</span>
                {currentUser.isAdmin && (
                  <span className="enhanced-sidebar-label">Admin</span>
                )}
                {!currentUser.isAdmin && (
                  <span className="enhanced-sidebar-label">User</span>
                )}
              </div>
            </Link>

            {currentUser.isAdmin && (
              <>
                <Link to="/dashboard?tab=posts" style={{ textDecoration: 'none' }}>
                  <div className={`enhanced-sidebar-item ${tab === "posts" ? "active" : ""}`}>
                    <HiDocumentText className="enhanced-sidebar-icon" />
                    <span>Posts</span>
                  </div>
                </Link>

                <Link to="/dashboard?tab=users" style={{ textDecoration: 'none' }}>
                  <div className={`enhanced-sidebar-item ${tab === "users" ? "active" : ""}`}>
                    <HiUserGroup className="enhanced-sidebar-icon" />
                    <span>Users</span>
                  </div>
                </Link>

                <Link to="/dashboard?tab=comments" style={{ textDecoration: 'none' }}>
                  <div className={`enhanced-sidebar-item ${tab === "comments" ? "active" : ""}`}>
                    <HiAnnotation className="enhanced-sidebar-icon" />
                    <span>Comments</span>
                  </div>
                </Link>

                <Link to="/dashboard?tab=dashboard" style={{ textDecoration: 'none' }}>
                  <div className={`enhanced-sidebar-item ${tab === "dashboard" || !tab ? "active" : ""}`}>
                    <HiChartPie className="enhanced-sidebar-icon" />
                    <span>Dashboard</span>
                  </div>
                </Link>
              </>
            )}

            <div className="enhanced-signout-item" onClick={handleSignout}>
              <HiArrowSmRight className="enhanced-sidebar-icon" />
              <span>Sign Out</span>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default DashSidebar;
