import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const DashBoardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthAgo);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <>
      <style>
        {`
          /* Ultra Advanced Keyframes */
          @keyframes dashboardSlideIn {
            0% {
              opacity: 0;
              transform: translateY(50px) scale(0.95);
              filter: blur(10px);
            }
            60% {
              opacity: 0.8;
              transform: translateY(-5px) scale(1.02);
              filter: blur(2px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          
          @keyframes cardSlideIn {
            0% {
              opacity: 0;
              transform: translateX(-60px) rotateY(-15deg) scale(0.9);
              filter: blur(8px);
            }
            50% {
              opacity: 0.7;
              transform: translateX(5px) rotateY(2deg) scale(1.02);
              filter: blur(2px);
            }
            100% {
              opacity: 1;
              transform: translateX(0) rotateY(0deg) scale(1);
              filter: blur(0px);
            }
          }
          
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(40px) rotateX(20deg);
            }
            100% {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }
          
          @keyframes shimmer {
            0% {
              transform: translateX(-100%) skewX(-15deg);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(300%) skewX(-15deg);
              opacity: 0;
            }
          }
          
          @keyframes glow {
            0%, 100% {
              box-shadow: 
                0 0 30px rgba(99, 102, 241, 0.4),
                0 0 60px rgba(99, 102, 241, 0.2),
                inset 0 0 30px rgba(99, 102, 241, 0.1);
            }
            25% {
              box-shadow: 
                0 0 40px rgba(168, 85, 247, 0.5),
                0 0 80px rgba(168, 85, 247, 0.3),
                inset 0 0 40px rgba(168, 85, 247, 0.15);
            }
            50% {
              box-shadow: 
                0 0 50px rgba(236, 72, 153, 0.6),
                0 0 100px rgba(236, 72, 153, 0.4),
                inset 0 0 50px rgba(236, 72, 153, 0.2);
            }
            75% {
              box-shadow: 
                0 0 40px rgba(59, 130, 246, 0.5),
                0 0 80px rgba(59, 130, 246, 0.3),
                inset 0 0 40px rgba(59, 130, 246, 0.15);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          
          @keyframes gradientFlow {
            0%, 100% {
              background-position: 0% 50%;
            }
            25% {
              background-position: 100% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            75% {
              background-position: 0% 100%;
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
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3) rotate(45deg);
            }
            50% {
              opacity: 1;
              transform: scale(1.1) rotate(-10deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
            }
          }
          
          @keyframes morphingBorder {
            0%, 100% {
              border-radius: 24px;
            }
            25% {
              border-radius: 32px 16px 24px 20px;
            }
            50% {
              border-radius: 20px 28px 16px 24px;
            }
            75% {
              border-radius: 28px 20px 32px 16px;
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
          
          @keyframes typewriter {
            0% {
              width: 0;
              border-right: 2px solid #6366f1;
            }
            100% {
              width: 100%;
              border-right: 2px solid transparent;
            }
          }
          
          @keyframes iconBounce {
            0%, 100% {
              transform: scale(1) rotate(0deg);
            }
            25% {
              transform: scale(1.1) rotate(5deg);
            }
            50% {
              transform: scale(1.2) rotate(0deg);
            }
            75% {
              transform: scale(1.1) rotate(-5deg);
            }
          }
          
          @keyframes numberCount {
            0% {
              transform: scale(0.8) rotateX(90deg);
              opacity: 0;
            }
            50% {
              transform: scale(1.1) rotateX(0deg);
              opacity: 0.8;
            }
            100% {
              transform: scale(1) rotateX(0deg);
              opacity: 1;
            }
          }
          
          /* Ultra Enhanced Dashboard Container */
          .dashboard-container-ultra {
            padding: 32px 24px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, 
              rgba(248, 250, 252, 0.95) 0%, 
              rgba(240, 242, 255, 0.95) 100%);
            position: relative;
            overflow-x: hidden;
            animation: dashboardSlideIn 1s ease-out;
          }
          
          .dark .dashboard-container-ultra {
            background: linear-gradient(135deg, 
              rgba(15, 23, 42, 0.95) 0%, 
              rgba(30, 41, 59, 0.95) 100%);
          }
          
          /* Background Effects */
          .dashboard-container-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
            opacity: 0.6;
            animation: gradientFlow 10s ease infinite;
            pointer-events: none;
          }
          
          /* Ultra Enhanced Stats Cards */
          .stats-cards-container {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
            justify-content: center;
            margin-bottom: 48px;
            position: relative;
            z-index: 1;
          }
          
          .stat-card-ultra {
            flex-direction: column;
            padding: 28px;
            gap: 20px;
            width: 100%;
            max-width: 320px;
            background: linear-gradient(145deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(248, 250, 252, 0.92) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            border-radius: 24px;
            border: 2px solid transparent;
            background-clip: padding-box;
            box-shadow: 
              0 20px 60px rgba(99, 102, 241, 0.15),
              0 8px 32px rgba(0, 0, 0, 0.08),
              inset 0 2px 0 rgba(255, 255, 255, 0.8);
            position: relative;
            overflow: hidden;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: cardSlideIn 1s ease-out;
          }
          
          .dark .stat-card-ultra {
            background: linear-gradient(145deg, 
              rgba(30, 41, 59, 0.95) 0%, 
              rgba(45, 55, 72, 0.92) 100%);
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.4),
              0 8px 32px rgba(99, 102, 241, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.1);
          }
          
          /* Animated Border Effect */
          .stat-card-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(45deg, 
              #6366f1, #8b5cf6, #a855f7, #d946ef, 
              #ec4899, #f59e0b, #10b981, #06b6d4, #6366f1);
            background-size: 400% 400%;
            border-radius: 24px;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask-composite: xor;
            opacity: 0;
            transition: opacity 0.8s ease;
            animation: gradientFlow 6s ease infinite;
          }
          
          /* Shimmer Effect */
          .stat-card-ultra::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.4), 
              transparent);
            transition: left 1.5s ease;
            border-radius: 24px;
            pointer-events: none;
          }
          
          .stat-card-ultra:hover::before {
            opacity: 1;
          }
          
          .stat-card-ultra:hover::after {
            left: 100%;
          }
          
          .stat-card-ultra:hover {
            transform: translateY(-12px) scale(1.03);
            box-shadow: 
              0 30px 80px rgba(99, 102, 241, 0.25),
              0 12px 40px rgba(99, 102, 241, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.9);
            animation: morphingBorder 4s ease-in-out infinite;
          }
          
          .dark .stat-card-ultra:hover {
            box-shadow: 
              0 30px 80px rgba(99, 102, 241, 0.35),
              0 12px 40px rgba(0, 0, 0, 0.6),
              inset 0 2px 0 rgba(255, 255, 255, 0.2);
          }
          
          /* Card Header */
          .card-header-ultra {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
          }
          
          .card-info-ultra {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          
          .card-title-ultra {
            color: #6b7280;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            background: linear-gradient(135deg, #6b7280, #9ca3af);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .dark .card-title-ultra {
            background: linear-gradient(135deg, #9ca3af, #d1d5db);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .card-number-ultra {
            font-size: 32px;
            font-weight: 800;
            color: #1f2937;
            animation: numberCount 1s ease-out 0.5s both;
            background: linear-gradient(135deg, #1f2937, #374151);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .dark .card-number-ultra {
            background: linear-gradient(135deg, #f9fafb, #e5e7eb);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          /* Enhanced Icons */
          .icon-container-ultra {
            position: relative;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .icon-container-ultra:hover {
            animation: iconBounce 1s ease-in-out;
          }
          
          .icon-ultra {
            border-radius: 50%;
            font-size: 3.5rem;
            padding: 1rem;
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.3);
            transition: all 0.6s ease;
            position: relative;
            overflow: hidden;
          }
          
          .icon-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.2), 
              transparent 50%);
            opacity: 0;
            transition: opacity 0.6s ease;
          }
          
          .icon-ultra:hover::before {
            opacity: 1;
          }
          
          .icon-ultra:hover {
            transform: scale(1.1) rotate(5deg);
            animation: pulse 1.5s ease infinite;
          }
          
          .users-icon {
            background: linear-gradient(135deg, #14b8a6, #0891b2);
            color: white;
          }
          
          .comments-icon {
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            color: white;
          }
          
          .posts-icon {
            background: linear-gradient(135deg, #84cc16, #65a30d);
            color: white;
          }
          
          /* Growth Indicator */
          .growth-indicator-ultra {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 600;
            background: linear-gradient(135deg, 
              rgba(34, 197, 94, 0.1), 
              rgba(22, 163, 74, 0.1));
            padding: 8px 16px;
            border-radius: 16px;
            border: 2px solid rgba(34, 197, 94, 0.2);
            transition: all 0.6s ease;
            backdrop-filter: blur(10px);
          }
          
          .growth-indicator-ultra:hover {
            background: linear-gradient(135deg, 
              rgba(34, 197, 94, 0.2), 
              rgba(22, 163, 74, 0.2));
            border-color: rgba(34, 197, 94, 0.4);
            transform: scale(1.05);
          }
          
          .growth-number-ultra {
            color: #22c55e;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          
          .growth-text-ultra {
            color: #6b7280;
            font-weight: 600;
          }
          
          .dark .growth-text-ultra {
            color: #9ca3af;
          }
          
          /* Ultra Enhanced Tables Section */
          .tables-container-ultra {
            display: flex;
            flex-wrap: wrap;
            gap: 32px;
            justify-content: center;
            padding: 32px 0;
            position: relative;
            z-index: 1;
          }
          
          .table-card-ultra {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 450px;
            background: linear-gradient(145deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(248, 250, 252, 0.92) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            border-radius: 24px;
            border: 2px solid rgba(99, 102, 241, 0.1);
            box-shadow: 
              0 16px 48px rgba(99, 102, 241, 0.12),
              0 6px 20px rgba(0, 0, 0, 0.06),
              inset 0 2px 0 rgba(255, 255, 255, 0.8);
            position: relative;
            overflow: hidden;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: fadeInUp 1s ease-out;
          }
          
          .dark .table-card-ultra {
            background: linear-gradient(145deg, 
              rgba(30, 41, 59, 0.95) 0%, 
              rgba(45, 55, 72, 0.92) 100%);
            border: 2px solid rgba(99, 102, 241, 0.2);
            box-shadow: 
              0 16px 48px rgba(0, 0, 0, 0.4),
              0 6px 20px rgba(99, 102, 241, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.1);
          }
          
          .table-card-ultra:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 
              0 25px 60px rgba(99, 102, 241, 0.2),
              0 10px 30px rgba(99, 102, 241, 0.15),
              inset 0 2px 0 rgba(255, 255, 255, 0.9);
            border-color: rgba(99, 102, 241, 0.3);
          }
          
          .dark .table-card-ultra:hover {
            box-shadow: 
              0 25px 60px rgba(99, 102, 241, 0.3),
              0 10px 30px rgba(0, 0, 0, 0.5),
              inset 0 2px 0 rgba(255, 255, 255, 0.2);
          }
          
          /* Table Header */
          .table-header-ultra {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px;
            border-bottom: 2px solid rgba(99, 102, 241, 0.1);
            position: relative;
          }
          
          .dark .table-header-ultra {
            border-bottom: 2px solid rgba(99, 102, 241, 0.2);
          }
          
          .table-title-ultra {
            font-size: 18px;
            font-weight: 700;
            color: #374151;
            background: linear-gradient(135deg, #374151, #4b5563);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
          }
          
          .dark .table-title-ultra {
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .table-title-ultra::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            transition: width 0.6s ease;
            border-radius: 2px;
          }
          
          .table-card-ultra:hover .table-title-ultra::after {
            width: 100%;
          }
          
          /* Ultra Enhanced See All Button */
          .see-all-btn-ultra {
            background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%) !important;
            border: none !important;
            color: white !important;
            font-weight: 700 !important;
            padding: 10px 20px !important;
            border-radius: 16px !important;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            position: relative !important;
            overflow: hidden !important;
            box-shadow: 0 6px 24px rgba(168, 85, 247, 0.4) !important;
            font-size: 13px !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
          }
          
          .see-all-btn-ultra::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.3), 
              transparent);
            transition: left 1s ease;
          }
          
          .see-all-btn-ultra:hover::before {
            left: 100%;
          }
          
          .see-all-btn-ultra:hover {
            transform: translateY(-2px) scale(1.05) !important;
            box-shadow: 0 10px 32px rgba(168, 85, 247, 0.6) !important;
            filter: brightness(110%) !important;
          }
          
          /* Ultra Enhanced Table */
          .ultra-table {
            background: transparent !important;
            border-radius: 0 !important;
          }
          
          .ultra-table-head {
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.08) 0%, 
              rgba(168, 85, 247, 0.08) 100%) !important;
            border-bottom: 2px solid rgba(99, 102, 241, 0.2) !important;
          }
          
          .dark .ultra-table-head {
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.15) 0%, 
              rgba(168, 85, 247, 0.15) 100%) !important;
            border-bottom: 2px solid rgba(99, 102, 241, 0.3) !important;
          }
          
          .ultra-table-header-cell {
            color: #6b7280 !important;
            font-weight: 700 !important;
            font-size: 14px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            padding: 16px !important;
            background: transparent !important;
            border: none !important;
          }
          
          .dark .ultra-table-header-cell {
            color: #9ca3af !important;
          }
          
          .ultra-table-row {
            background: rgba(255, 255, 255, 0.6) !important;
            border-bottom: 1px solid rgba(99, 102, 241, 0.1) !important;
            transition: all 0.6s ease !important;
            position: relative !important;
          }
          
          .dark .ultra-table-row {
            background: rgba(45, 55, 72, 0.6) !important;
            border-bottom: 1px solid rgba(99, 102, 241, 0.2) !important;
          }
          
          .ultra-table-row:hover {
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.08) 0%, 
              rgba(168, 85, 247, 0.08) 100%) !important;
            transform: translateX(4px) !important;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15) !important;
          }
          
          .dark .ultra-table-row:hover {
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.15) 0%, 
              rgba(168, 85, 247, 0.15) 100%) !important;
          }
          
          .ultra-table-cell {
            padding: 16px !important;
            color: #374151 !important;
            font-weight: 500 !important;
            border: none !important;
            background: transparent !important;
          }
          
          .dark .ultra-table-cell {
            color: #e5e7eb !important;
          }
          
          /* Enhanced Avatar in Table */
          .table-avatar-ultra {
            border: 3px solid rgba(99, 102, 241, 0.3) !important;
            border-radius: 50% !important;
            transition: all 0.6s ease !important;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3) !important;
          }
          
          .table-avatar-ultra:hover {
            transform: scale(1.15) rotate(5deg) !important;
            border-color: rgba(99, 102, 241, 0.6) !important;
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.5) !important;
          }
          
          /* Enhanced Post Image */
          .post-image-ultra {
            border-radius: 12px !important;
            border: 2px solid rgba(99, 102, 241, 0.2) !important;
            transition: all 0.6s ease !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
          }
          
          .post-image-ultra:hover {
            transform: scale(1.1) rotate(2deg) !important;
            border-color: rgba(99, 102, 241, 0.5) !important;
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3) !important;
          }
          
          /* Category Badge */
          .category-badge-ultra {
            background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
            color: white !important;
            padding: 4px 12px !important;
            border-radius: 12px !important;
            font-size: 12px !important;
            font-weight: 700 !important;
            transition: all 0.6s ease !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4) !important;
          }
          
          .category-badge-ultra:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.6) !important;
          }
          
          /* Content Truncation */
          .content-truncate-ultra {
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            line-height: 1.5 !important;
            font-weight: 500 !important;
            color: #4b5563 !important;
            transition: color 0.6s ease !important;
          }
          
          .dark .content-truncate-ultra {
            color: #d1d5db !important;
          }
          
          .ultra-table-row:hover .content-truncate-ultra {
            color: #6366f1 !important;
          }
          
          /* Likes Counter */
          .likes-counter-ultra {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
            color: white !important;
            padding: 6px 12px !important;
            border-radius: 16px !important;
            font-size: 13px !important;
            font-weight: 700 !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            transition: all 0.6s ease !important;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4) !important;
          }
          
          .likes-counter-ultra:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.6) !important;
          }
          
          .likes-counter-ultra::before {
            content: '❤️';
            font-size: 12px;
          }
          
          /* Responsive Enhancements */
          @media (max-width: 1024px) {
            .tables-container-ultra {
              gap: 24px;
            }
            
            .table-card-ultra {
              max-width: 100%;
            }
          }
          
          @media (max-width: 768px) {
            .dashboard-container-ultra {
              padding: 20px 16px;
            }
            
            .stats-cards-container {
              gap: 16px;
              margin-bottom: 32px;
            }
            
            .stat-card-ultra {
              padding: 20px;
              max-width: 100%;
            }
            
            .card-number-ultra {
              font-size: 28px;
            }
            
            .icon-ultra {
              font-size: 3rem;
              padding: 0.8rem;
            }
            
            .tables-container-ultra {
              gap: 20px;
              padding: 20px 0;
            }
            
            .table-header-ultra {
              padding: 20px;
              flex-direction: column;
              gap: 16px;
              align-items: stretch;
            }
            
            .see-all-btn-ultra {
              width: 100% !important;
              justify-content: center !important;
            }
          }
          
          @media (max-width: 480px) {
            .dashboard-container-ultra {
              padding: 16px 12px;
            }
            
            .stat-card-ultra {
              padding: 16px;
            }
            
            .card-header-ultra {
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 16px;
            }
            
            .ultra-table-cell {
              padding: 12px 8px !important;
              font-size: 14px !important;
            }
            
            .ultra-table-header-cell {
              padding: 12px 8px !important;
              font-size: 12px !important;
            }
          }
        `}
      </style>

      <div className="dashboard-container-ultra">
        {/* Ultra Enhanced Stats Cards */}
        <div className="stats-cards-container">
          <div className="stat-card-ultra" style={{ animationDelay: '0.1s' }}>
            <div className="card-header-ultra">
              <div className="card-info-ultra">
                <h3 className="card-title-ultra">Total Users</h3>
                <p className="card-number-ultra">{totalUsers.toLocaleString()}</p>
              </div>
              <div className="icon-container-ultra">
                <HiOutlineUserGroup className="icon-ultra users-icon" />
              </div>
            </div>
            <div className="growth-indicator-ultra">
              <span className="growth-number-ultra">
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className="growth-text-ultra">Last Month</div>
            </div>
          </div>

          <div className="stat-card-ultra" style={{ animationDelay: '0.2s' }}>
            <div className="card-header-ultra">
              <div className="card-info-ultra">
                <h3 className="card-title-ultra">Total Comments</h3>
                <p className="card-number-ultra">{totalComments.toLocaleString()}</p>
              </div>
              <div className="icon-container-ultra">
                <HiAnnotation className="icon-ultra comments-icon" />
              </div>
            </div>
            <div className="growth-indicator-ultra">
              <span className="growth-number-ultra">
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <div className="growth-text-ultra">Last Month</div>
            </div>
          </div>

          <div className="stat-card-ultra" style={{ animationDelay: '0.3s' }}>
            <div className="card-header-ultra">
              <div className="card-info-ultra">
                <h3 className="card-title-ultra">Total Posts</h3>
                <p className="card-number-ultra">{totalPosts.toLocaleString()}</p>
              </div>
              <div className="icon-container-ultra">
                <HiDocumentText className="icon-ultra posts-icon" />
              </div>
            </div>
            <div className="growth-indicator-ultra">
              <span className="growth-number-ultra">
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <div className="growth-text-ultra">Last Month</div>
            </div>
          </div>
        </div>

        {/* Ultra Enhanced Tables Section */}
        <div className="tables-container-ultra">
          {/* Recent Users Table */}
          <div className="table-card-ultra" style={{ animationDelay: '0.4s' }}>
            <div className="table-header-ultra">
              <h1 className="table-title-ultra">Recent Users</h1>
              <Button className="see-all-btn-ultra">
                <Link to={'/dashboard?tab=users'} className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  See all
                </Link>
              </Button>
            </div>
            <Table hoverable className="ultra-table">
              <Table.Head className="ultra-table-head">
                <Table.HeadCell className="ultra-table-header-cell">User Image</Table.HeadCell>
                <Table.HeadCell className="ultra-table-header-cell">Username</Table.HeadCell>
              </Table.Head>
              {users && users.map((user, index) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row 
                    className='ultra-table-row'
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <Table.Cell className="ultra-table-cell">
                      <UserAvatar
                        src={user.profilePicture}
                        alt={user.username}
                        size="sm"
                        className="table-avatar-ultra w-10 h-10"
                      />
                    </Table.Cell>
                    <Table.Cell className="ultra-table-cell">
                      <span className="font-semibold">@{user.username}</span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>

          {/* Recent Comments Table */}
          <div className="table-card-ultra" style={{ animationDelay: '0.5s' }}>
            <div className="table-header-ultra">
              <h1 className="table-title-ultra">Recent Comments</h1>
              <Button className="see-all-btn-ultra">
                <Link to={'/dashboard?tab=comments'} className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  See all
                </Link>
              </Button>
            </div>
            <Table hoverable className="ultra-table">
              <Table.Head className="ultra-table-head">
                <Table.HeadCell className="ultra-table-header-cell">Comment Content</Table.HeadCell>
                <Table.HeadCell className="ultra-table-header-cell">Likes</Table.HeadCell>
              </Table.Head>
              {comments && comments.map((comment, index) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row 
                    className='ultra-table-row'
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <Table.Cell className="ultra-table-cell w-96">
                      <p className="content-truncate-ultra">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell className="ultra-table-cell">
                      <span className="likes-counter-ultra">
                        {comment.numberOfLikes}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>

          {/* Recent Posts Table */}
          <div className="table-card-ultra" style={{ animationDelay: '0.6s' }}>
            <div className="table-header-ultra">
              <h1 className="table-title-ultra">Recent Posts</h1>
              <Button className="see-all-btn-ultra">
                <Link to={'/dashboard?tab=posts'} className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  See all
                </Link>
              </Button>
            </div>
            <Table hoverable className="ultra-table">
              <Table.Head className="ultra-table-head">
                <Table.HeadCell className="ultra-table-header-cell">Post Image</Table.HeadCell>
                <Table.HeadCell className="ultra-table-header-cell">Post Title</Table.HeadCell>
                <Table.HeadCell className="ultra-table-header-cell">Category</Table.HeadCell>
              </Table.Head>
              {posts && posts.map((post, index) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row 
                    className='ultra-table-row'
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <Table.Cell className="ultra-table-cell">
                      <img 
                        src={post.image} 
                        alt="post image" 
                        className="post-image-ultra w-12 object-cover h-10" 
                      />
                    </Table.Cell>
                    <Table.Cell className="ultra-table-cell w-96">
                      <span className="font-semibold">{post.title}</span>
                    </Table.Cell>
                    <Table.Cell className="ultra-table-cell">
                      <span className="category-badge-ultra">
                        {post.category}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardComp;
