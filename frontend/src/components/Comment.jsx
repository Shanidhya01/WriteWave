import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import UserAvatar from "./UserAvatar";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes commentSlideIn {
            from {
              opacity: 0;
              transform: translateX(-50px) scale(0.9);
              filter: blur(10px);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
              filter: blur(0px);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px) rotateX(20deg);
            }
            to {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }
          
          @keyframes likeAnimation {
            0% {
              transform: scale(1) rotate(0deg);
            }
            25% {
              transform: scale(1.4) rotate(-10deg);
            }
            50% {
              transform: scale(1.6) rotate(10deg);
            }
            75% {
              transform: scale(1.2) rotate(-5deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
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
              transform: translateX(200%) skewX(-15deg);
              opacity: 0;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
            }
          }
          
          @keyframes glow {
            0%, 100% {
              box-shadow: 
                0 0 20px rgba(99, 102, 241, 0.4),
                0 0 40px rgba(99, 102, 241, 0.2),
                inset 0 0 20px rgba(99, 102, 241, 0.1);
            }
            50% {
              box-shadow: 
                0 0 40px rgba(99, 102, 241, 0.8),
                0 0 80px rgba(236, 72, 153, 0.6),
                inset 0 0 40px rgba(99, 102, 241, 0.2);
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
              transform: translateY(0px) rotate(0deg);
            }
            25% {
              transform: translateY(-2px) rotate(1deg);
            }
            50% {
              transform: translateY(-4px) rotate(0deg);
            }
            75% {
              transform: translateY(-2px) rotate(-1deg);
            }
          }
          
          @keyframes editModeEnter {
            from {
              opacity: 0;
              transform: scale(0.9) rotateX(20deg);
              backdrop-filter: blur(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) rotateX(0deg);
              backdrop-filter: blur(10px);
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
            70% {
              transform: scale(0.9) rotate(5deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
            }
          }
          
          @keyframes typewriter {
            from {
              width: 0;
            }
            to {
              width: 100%;
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
          
          @keyframes morphingBorder {
            0%, 100% {
              border-radius: 20px 20px 20px 20px;
            }
            25% {
              border-radius: 30px 15px 25px 20px;
            }
            50% {
              border-radius: 25px 25px 15px 30px;
            }
            75% {
              border-radius: 15px 30px 20px 25px;
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
          
          @keyframes heartbeat {
            0%, 50%, 100% {
              transform: scale(1);
            }
            25%, 75% {
              transform: scale(1.1);
            }
          }
          
          /* Ultra Enhanced Comment Container */
          .comment-container-ultra {
            background: linear-gradient(145deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(248, 250, 252, 0.95) 30%,
              rgba(240, 242, 255, 0.95) 100%);
            backdrop-filter: blur(20px) saturate(180%) brightness(110%);
            border: 2px solid transparent;
            background-clip: padding-box;
            border-radius: 24px;
            margin: 16px 0;
            padding: 24px;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            animation: commentSlideIn 1s ease-out;
            transform-origin: left center;
            box-shadow: 
              0 8px 32px rgba(99, 102, 241, 0.1),
              0 4px 16px rgba(0, 0, 0, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.6);
          }
          
          .dark .comment-container-ultra {
            background: linear-gradient(145deg, 
              rgba(15, 23, 42, 0.95) 0%, 
              rgba(30, 41, 59, 0.95) 30%,
              rgba(45, 55, 72, 0.95) 100%);
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.4),
              0 4px 16px rgba(99, 102, 241, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          
          /* Animated Border Effect */
          .comment-container-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(45deg, 
              #6366f1, #8b5cf6, #a855f7, #d946ef, #ec4899, #f59e0b, #10b981, #06b6d4, #6366f1);
            background-size: 300% 300%;
            border-radius: 24px;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask-composite: xor;
            opacity: 0;
            transition: opacity 0.8s ease;
            animation: gradientFlow 4s ease infinite;
          }
          
          /* Shimmer Effect */
          .comment-container-ultra::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.4), 
              rgba(99, 102, 241, 0.2),
              rgba(255, 255, 255, 0.4),
              transparent);
            transition: left 1.5s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 24px;
          }
          
          .comment-container-ultra:hover::before {
            opacity: 1;
          }
          
          .comment-container-ultra:hover::after {
            left: 100%;
          }
          
          .comment-container-ultra:hover {
            transform: translateY(-8px) scale(1.02);
            border-radius: 28px;
            box-shadow: 
              0 20px 60px rgba(99, 102, 241, 0.25),
              0 8px 32px rgba(99, 102, 241, 0.15),
              inset 0 2px 0 rgba(255, 255, 255, 0.8);
            animation: morphingBorder 3s ease-in-out infinite;
          }
          
          .dark .comment-container-ultra:hover {
            box-shadow: 
              0 20px 60px rgba(99, 102, 241, 0.35),
              0 8px 32px rgba(0, 0, 0, 0.5),
              inset 0 2px 0 rgba(255, 255, 255, 0.2);
          }
          
          /* Ultra Enhanced Avatar Container */
          .avatar-container-ultra {
            position: relative;
            margin-right: 20px;
            animation: fadeInUp 1s ease-out 0.3s both;
          }
          
          .ultra-avatar {
            position: relative;
            border: 3px solid transparent;
            background: 
              linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7, #d946ef) border-box;
            border-radius: 50%;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            overflow: hidden;
            animation: float 4s ease-in-out infinite;
            box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
          }
          
          .dark .ultra-avatar {
            background: 
              linear-gradient(#1e293b, #1e293b) padding-box,
              linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7, #d946ef) border-box;
          }
          
          /* Avatar Glow Ring */
          .ultra-avatar::before {
            content: '';
            position: absolute;
            inset: -5px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7, #d946ef);
            opacity: 0;
            transition: all 0.6s ease;
            z-index: -1;
            filter: blur(8px);
          }
          
          /* Avatar Shine Effect */
          .ultra-avatar::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: linear-gradient(135deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.6) 50%, 
              transparent 100%);
            opacity: 0;
            transition: all 0.6s ease;
            transform: rotate(-45deg) translateX(-100%);
          }
          
          .ultra-avatar:hover::before {
            opacity: 1;
            animation: pulse 2s ease infinite;
          }
          
          .ultra-avatar:hover::after {
            opacity: 1;
            transform: rotate(-45deg) translateX(100%);
          }
          
          .ultra-avatar:hover {
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.5);
            animation: bounceIn 0.8s ease;
          }
          
          /* Ultra Enhanced Content Area */
          .content-area-ultra {
            flex: 1;
            animation: fadeInUp 1s ease-out 0.4s both;
            position: relative;
          }
          
          /* Ultra Enhanced Header */
          .comment-header-ultra {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
            position: relative;
          }
          
          .username-ultra {
            font-weight: 800;
            font-size: 15px;
            background: linear-gradient(135deg, 
              #6366f1 0%, 
              #8b5cf6 25%, 
              #a855f7 50%, 
              #d946ef 75%, 
              #ec4899 100%);
            background-size: 200% 200%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientFlow 3s ease infinite;
            position: relative;
            transition: all 0.6s ease;
          }
          
          .username-ultra::before {
            content: attr(data-username);
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            overflow: hidden;
            transition: width 0.6s ease;
            animation: typewriter 2s steps(20) infinite;
          }
          
          .username-ultra:hover::before {
            width: 100%;
          }
          
          .username-ultra::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            transition: width 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border-radius: 2px;
          }
          
          .username-ultra:hover::after {
            width: 100%;
          }
          
          .timestamp-ultra {
            font-size: 13px;
            color: #6b7280;
            font-weight: 600;
            position: relative;
            padding: 6px 14px;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.08) 0%, 
              rgba(168, 85, 247, 0.08) 100%);
            border-radius: 20px;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(99, 102, 241, 0.2);
            backdrop-filter: blur(10px);
          }
          
          .dark .timestamp-ultra {
            color: #9ca3af;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.15) 0%, 
              rgba(168, 85, 247, 0.15) 100%);
            border: 1px solid rgba(99, 102, 241, 0.3);
          }
          
          .timestamp-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
            opacity: 0;
            transition: opacity 0.6s ease;
          }
          
          .timestamp-ultra:hover::before {
            opacity: 1;
          }
          
          .timestamp-ultra:hover {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
            border-color: rgba(99, 102, 241, 0.4);
          }
          
          /* Ultra Enhanced Comment Content */
          .comment-content-ultra {
            color: #374151;
            line-height: 1.7;
            font-size: 15px;
            margin-bottom: 20px;
            padding: 16px 0;
            transition: all 0.6s ease;
            position: relative;
            font-weight: 500;
          }
          
          .dark .comment-content-ultra {
            color: #e5e7eb;
          }
          
          .comment-content-ultra::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 0;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            border-radius: 2px;
            transition: height 0.6s ease;
          }
          
          .comment-container-ultra:hover .comment-content-ultra::before {
            height: 100%;
          }
          
          /* Ultra Enhanced Edit Mode */
          .edit-mode-ultra {
            animation: editModeEnter 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.05) 0%, 
              rgba(168, 85, 247, 0.05) 100%);
            border-radius: 20px;
            padding: 20px;
            border: 2px solid rgba(99, 102, 241, 0.2);
          }
          
          .dark .edit-mode-ultra {
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.1) 0%, 
              rgba(168, 85, 247, 0.1) 100%);
            border: 2px solid rgba(99, 102, 241, 0.3);
          }
          
          .ultra-textarea {
            background: rgba(255, 255, 255, 0.95) !important;
            border: 2px solid rgba(99, 102, 241, 0.3) !important;
            border-radius: 20px !important;
            padding: 20px !important;
            font-size: 15px !important;
            line-height: 1.7 !important;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            backdrop-filter: blur(20px) !important;
            box-shadow: 
              0 8px 32px rgba(99, 102, 241, 0.15),
              inset 0 2px 4px rgba(255, 255, 255, 0.8) !important;
            margin-bottom: 20px !important;
            font-weight: 500 !important;
          }
          
          .dark .ultra-textarea {
            background: rgba(15, 23, 42, 0.95) !important;
            border: 2px solid rgba(99, 102, 241, 0.4) !important;
            color: #e5e7eb !important;
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.1) !important;
          }
          
          .ultra-textarea:focus {
            border-color: rgba(99, 102, 241, 0.8) !important;
            box-shadow: 
              0 0 0 6px rgba(99, 102, 241, 0.15),
              0 12px 40px rgba(99, 102, 241, 0.25) !important;
            transform: scale(1.02) !important;
            outline: none !important;
          }
          
          /* Ultra Enhanced Edit Buttons */
          .edit-buttons-ultra {
            display: flex;
            justify-content: flex-end;
            gap: 16px;
            margin-top: 16px;
          }
          
          .ultra-save-btn {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%) !important;
            border: none !important;
            color: white !important;
            font-weight: 700 !important;
            padding: 12px 28px !important;
            border-radius: 16px !important;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            position: relative !important;
            overflow: hidden !important;
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4) !important;
            font-size: 14px !important;
          }
          
          .ultra-save-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .ultra-save-btn:hover::before {
            left: 100%;
          }
          
          .ultra-save-btn:hover {
            transform: translateY(-4px) scale(1.05) !important;
            box-shadow: 0 12px 40px rgba(99, 102, 241, 0.6) !important;
            filter: brightness(110%) !important;
          }
          
          .ultra-cancel-btn {
            background: transparent !important;
            border: 2px solid rgba(99, 102, 241, 0.4) !important;
            color: #6366f1 !important;
            font-weight: 700 !important;
            padding: 12px 28px !important;
            border-radius: 16px !important;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            font-size: 14px !important;
            backdrop-filter: blur(10px) !important;
          }
          
          .dark .ultra-cancel-btn {
            color: #a78bfa !important;
            border-color: rgba(99, 102, 241, 0.5) !important;
          }
          
          .ultra-cancel-btn:hover {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15)) !important;
            transform: translateY(-4px) scale(1.05) !important;
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3) !important;
            border-color: rgba(99, 102, 241, 0.6) !important;
          }
          
          /* Ultra Enhanced Action Bar */
          .action-bar-ultra {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 16px 0;
            border-top: 2px solid rgba(99, 102, 241, 0.1);
            margin-top: 16px;
            position: relative;
          }
          
          .dark .action-bar-ultra {
            border-top: 2px solid rgba(99, 102, 241, 0.2);
          }
          
          .action-bar-ultra::before {
            content: '';
            position: absolute;
            top: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            transition: width 1s ease;
          }
          
          .comment-container-ultra:hover .action-bar-ultra::before {
            width: 100%;
          }
          
          /* Ultra Enhanced Like Button */
          .like-button-ultra {
            display: flex;
            align-items: center;
            gap: 10px;
            background: transparent;
            border: 2px solid rgba(99, 102, 241, 0.2);
            padding: 10px 16px;
            border-radius: 16px;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            color: #6b7280;
            font-size: 14px;
            font-weight: 600;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }
          
          .dark .like-button-ultra {
            color: #9ca3af;
            border: 2px solid rgba(99, 102, 241, 0.3);
          }
          
          /* Ripple Effect */
          .like-button-ultra::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.3);
            transition: all 0.6s ease;
            transform: translate(-50%, -50%);
          }
          
          .like-button-ultra:active::before {
            width: 300px;
            height: 300px;
            animation: ripple 0.6s ease-out;
          }
          
          .like-button-ultra:hover {
            color: #3b82f6;
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
            border-color: rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1));
          }
          
          .like-button-ultra.liked {
            color: #3b82f6 !important;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15));
            border-color: rgba(59, 130, 246, 0.4);
            animation: heartbeat 1.5s ease infinite;
          }
          
          .like-button-ultra.liked:hover {
            animation: likeAnimation 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .like-icon-ultra {
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
          }
          
          .like-button-ultra:hover .like-icon-ultra {
            transform: scale(1.3) rotate(10deg);
            filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.5));
          }
          
          .like-button-ultra.liked .like-icon-ultra {
            color: #3b82f6;
            animation: pulse 1.5s ease infinite;
          }
          
          .like-count-ultra {
            font-weight: 700;
            font-size: 13px;
            padding: 2px 8px;
            background: rgba(59, 130, 246, 0.1);
            border-radius: 12px;
            transition: all 0.3s ease;
          }
          
          .like-button-ultra:hover .like-count-ultra {
            background: rgba(59, 130, 246, 0.2);
            transform: scale(1.1);
          }
          
          /* Ultra Enhanced Action Buttons */
          .action-button-ultra {
            background: transparent;
            border: 2px solid transparent;
            padding: 10px 16px;
            border-radius: 14px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }
          
          .edit-button-ultra {
            color: #6b7280;
            border-color: rgba(99, 102, 241, 0.2);
          }
          
          .dark .edit-button-ultra {
            color: #9ca3af;
            border-color: rgba(99, 102, 241, 0.3);
          }
          
          .edit-button-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
            border-radius: 14px;
            opacity: 0;
            transition: opacity 0.6s ease;
          }
          
          .edit-button-ultra:hover::before {
            opacity: 1;
          }
          
          .edit-button-ultra:hover {
            color: #6366f1;
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
            border-color: rgba(99, 102, 241, 0.4);
          }
          
          .delete-button-ultra {
            color: #6b7280;
            border-color: rgba(239, 68, 68, 0.2);
          }
          
          .dark .delete-button-ultra {
            color: #9ca3af;
            border-color: rgba(239, 68, 68, 0.3);
          }
          
          .delete-button-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1));
            border-radius: 14px;
            opacity: 0;
            transition: opacity 0.6s ease;
          }
          
          .delete-button-ultra:hover::before {
            opacity: 1;
          }
          
          .delete-button-ultra:hover {
            color: #ef4444;
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
            border-color: rgba(239, 68, 68, 0.4);
          }
          
          /* Ultra Sparkle Effects */
          .sparkle-ultra {
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #6366f1, #a855f7, #d946ef);
            border-radius: 50%;
            opacity: 0;
            animation: sparkle 4s ease-in-out infinite;
            box-shadow: 0 0 6px rgba(99, 102, 241, 0.8);
          }
          
          .sparkle-1 { top: 15%; left: 85%; animation-delay: 0s; }
          .sparkle-2 { top: 45%; right: 10%; animation-delay: 1.3s; }
          .sparkle-3 { bottom: 25%; left: 15%; animation-delay: 2.6s; }
          .sparkle-4 { top: 70%; left: 70%; animation-delay: 3.9s; }
          
          .comment-container-ultra:hover .sparkle-ultra {
            opacity: 1;
          }
          
          /* Floating Particles */
          .particle-ultra {
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(99, 102, 241, 0.6);
            border-radius: 50%;
            opacity: 0;
            animation: float 6s ease-in-out infinite;
          }
          
          .particle-1 { top: 20%; left: 20%; animation-delay: 0s; }
          .particle-2 { top: 60%; left: 80%; animation-delay: 2s; }
          .particle-3 { bottom: 30%; left: 50%; animation-delay: 4s; }
          
          .comment-container-ultra:hover .particle-ultra {
            opacity: 1;
          }
          
          /* Responsive Ultra Design */
          @media (max-width: 768px) {
            .comment-container-ultra {
              padding: 20px;
              margin: 12px 0;
              border-radius: 20px;
            }
            
            .avatar-container-ultra {
              margin-right: 16px;
            }
            
            .comment-header-ultra {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
            
            .action-bar-ultra {
              flex-wrap: wrap;
              gap: 16px;
            }
            
            .edit-buttons-ultra {
              flex-direction: column;
              gap: 12px;
            }
            
            .ultra-save-btn, .ultra-cancel-btn {
              padding: 10px 24px !important;
              font-size: 13px !important;
            }
          }
          
          @media (max-width: 480px) {
            .comment-container-ultra {
              padding: 16px;
              border-radius: 16px;
            }
            
            .username-ultra {
              font-size: 14px;
            }
            
            .timestamp-ultra {
              font-size: 12px;
              padding: 4px 12px;
            }
            
            .comment-content-ultra {
              font-size: 14px;
            }
            
            .like-button-ultra, .action-button-ultra {
              padding: 8px 12px;
              font-size: 13px;
            }
          }
        `}
      </style>

      <div className="comment-container-ultra">
        {/* Ultra Sparkle Effects */}
        <div className="sparkle-ultra sparkle-1"></div>
        <div className="sparkle-ultra sparkle-2"></div>
        <div className="sparkle-ultra sparkle-3"></div>
        <div className="sparkle-ultra sparkle-4"></div>
        
        {/* Floating Particles */}
        <div className="particle-ultra particle-1"></div>
        <div className="particle-ultra particle-2"></div>
        <div className="particle-ultra particle-3"></div>

        <div className="flex">
          {/* Ultra Enhanced Avatar */}
          <div className="avatar-container-ultra">
            <div className="ultra-avatar">
              <UserAvatar
                src={user.profilePicture}
                alt={user.username}
                size="sm"
                className="w-10 h-10"
              />
            </div>
          </div>

          {/* Ultra Enhanced Content Area */}
          <div className="content-area-ultra">
            {/* Ultra Enhanced Header */}
            <div className="comment-header-ultra">
              <span 
                className="username-ultra" 
                data-username={user ? `@${user.username}` : "anonymous user"}
              >
                {user ? `@${user.username}` : "anonymous user"}
              </span>
              <span className="timestamp-ultra">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>

            {/* Content or Edit Mode */}
            {isEditing ? (
              <div className="edit-mode-ultra">
                <Textarea
                  className="ultra-textarea"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={4}
                />
                <div className="edit-buttons-ultra">
                  <Button
                    type="button"
                    size="sm"
                    className="ultra-save-btn"
                    onClick={handleSave}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </span>
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="ultra-cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </span>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Ultra Enhanced Comment Content */}
                <p className="comment-content-ultra">{comment.content}</p>

                {/* Ultra Enhanced Action Bar */}
                <div className="action-bar-ultra">
                  {/* Ultra Enhanced Like Button */}
                  <button
                    type="button"
                    className={`like-button-ultra ${
                      currentUser &&
                      comment.likes.includes(currentUser._id)
                        ? "liked"
                        : ""
                    }`}
                    onClick={() => onLike(comment._id)}
                  >
                    <FaThumbsUp className="like-icon-ultra" />
                    {comment.numberOfLikes > 0 && (
                      <span className="like-count-ultra">
                        {comment.numberOfLikes}{" "}
                        {comment.numberOfLikes === 1 ? "like" : "likes"}
                      </span>
                    )}
                  </button>

                  {/* Ultra Enhanced Action Buttons */}
                  {currentUser &&
                    (currentUser._id === comment.userId ||
                      currentUser.isAdmin) && (
                      <>
                        <button
                          type="button"
                          className="action-button-ultra edit-button-ultra"
                          onClick={handleEdit}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </span>
                        </button>
                        <button
                          type="button"
                          className="action-button-ultra delete-button-ultra"
                          onClick={() => onDelete(comment._id)}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </span>
                        </button>
                      </>
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
