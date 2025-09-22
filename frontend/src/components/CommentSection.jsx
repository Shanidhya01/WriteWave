import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import UserAvatar from "./UserAvatar";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId: postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
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
          @keyframes sectionSlideIn {
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
          
          @keyframes fadeInStagger {
            0% {
              opacity: 0;
              transform: translateY(30px) rotateX(15deg);
            }
            100% {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }
          
          @keyframes shimmerFlow {
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
            50% {
              box-shadow: 
                0 0 50px rgba(168, 85, 247, 0.6),
                0 0 100px rgba(168, 85, 247, 0.4),
                inset 0 0 50px rgba(168, 85, 247, 0.2);
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
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
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
            }
            100% {
              width: 100%;
            }
          }
          
          /* Ultra Enhanced Comment Section Container */
          .comment-section-ultra {
            max-width: 56rem;
            width: 100%;
            margin: 0 auto;
            padding: 32px;
            background: linear-gradient(145deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(248, 250, 252, 0.92) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            border-radius: 32px;
            box-shadow: 
              0 20px 60px rgba(99, 102, 241, 0.15),
              0 8px 32px rgba(0, 0, 0, 0.08),
              inset 0 2px 0 rgba(255, 255, 255, 0.8);
            border: 2px solid rgba(99, 102, 241, 0.1);
            position: relative;
            overflow: hidden;
            animation: sectionSlideIn 1s ease-out;
            margin-bottom: 40px;
          }
          
          .dark .comment-section-ultra {
            background: linear-gradient(145deg, 
              rgba(15, 23, 42, 0.95) 0%, 
              rgba(30, 41, 59, 0.92) 100%);
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.4),
              0 8px 32px rgba(99, 102, 241, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(99, 102, 241, 0.2);
          }
          
          /* Background Sparkle Effects */
          .comment-section-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
            opacity: 0.6;
            animation: gradientFlow 8s ease infinite;
          }
          
          .comment-section-ultra::after {
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
            transition: left 1.5s ease;
          }
          
          .comment-section-ultra:hover::after {
            left: 100%;
          }
          
          /* User Info Section */
          .user-info-ultra {
            display: flex;
            align-items: center;
            gap: 16px;
            margin: 32px 0;
            padding: 20px;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.08) 0%, 
              rgba(168, 85, 247, 0.06) 100%);
            border-radius: 20px;
            border: 2px solid rgba(99, 102, 241, 0.15);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            animation: fadeInStagger 0.8s ease-out 0.3s both;
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1);
          }
          
          .dark .user-info-ultra {
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.15) 0%, 
              rgba(168, 85, 247, 0.12) 100%);
            border: 2px solid rgba(99, 102, 241, 0.25);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          
          .user-info-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.1), 
              rgba(168, 85, 247, 0.1));
            opacity: 0;
            transition: opacity 0.6s ease;
          }
          
          .user-info-ultra:hover::before {
            opacity: 1;
          }
          
          .user-info-ultra:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
            border-color: rgba(99, 102, 241, 0.3);
          }
          
          .user-info-text {
            color: #6b7280;
            font-weight: 600;
            font-size: 15px;
          }
          
          .dark .user-info-text {
            color: #9ca3af;
          }
          
          .ultra-avatar-container {
            position: relative;
            transition: all 0.6s ease;
          }
          
          .ultra-avatar-container:hover {
            transform: scale(1.1) rotate(5deg);
            animation: pulse 1.5s ease infinite;
          }
          
          .username-link-ultra {
            color: #0891b2;
            font-weight: 700;
            text-decoration: none;
            position: relative;
            transition: all 0.6s ease;
            background: linear-gradient(135deg, #0891b2, #06b6d4);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .username-link-ultra::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(135deg, #0891b2, #06b6d4);
            transition: width 0.6s ease;
            border-radius: 2px;
          }
          
          .username-link-ultra:hover::after {
            width: 100%;
          }
          
          .username-link-ultra:hover {
            transform: translateY(-2px);
            filter: brightness(1.2);
          }
          
          /* Sign In Prompt */
          .signin-prompt-ultra {
            text-align: center;
            margin: 32px 0;
            padding: 24px;
            background: linear-gradient(135deg, 
              rgba(20, 184, 166, 0.08) 0%, 
              rgba(59, 130, 246, 0.08) 100%);
            border-radius: 20px;
            border: 2px solid rgba(20, 184, 166, 0.2);
            animation: fadeInStagger 0.8s ease-out 0.4s both;
            position: relative;
            overflow: hidden;
          }
          
          .dark .signin-prompt-ultra {
            background: linear-gradient(135deg, 
              rgba(20, 184, 166, 0.15) 0%, 
              rgba(59, 130, 246, 0.15) 100%);
            border: 2px solid rgba(20, 184, 166, 0.3);
          }
          
          .signin-prompt-text {
            color: #14b8a6;
            font-weight: 600;
            font-size: 15px;
            margin-bottom: 8px;
          }
          
          .signin-link-ultra {
            color: #3b82f6;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.6s ease;
            position: relative;
          }
          
          .signin-link-ultra::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #3b82f6;
            transition: width 0.6s ease;
          }
          
          .signin-link-ultra:hover::after {
            width: 100%;
          }
          
          /* Ultra Enhanced Comment Form */
          .comment-form-ultra {
            background: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.9) 0%, 
              rgba(248, 250, 252, 0.9) 100%);
            border: 3px solid transparent;
            background-clip: padding-box;
            border-radius: 24px;
            padding: 28px;
            margin: 32px 0;
            position: relative;
            overflow: hidden;
            animation: fadeInStagger 0.8s ease-out 0.5s both;
            backdrop-filter: blur(15px);
            box-shadow: 
              0 16px 48px rgba(99, 102, 241, 0.15),
              inset 0 2px 0 rgba(255, 255, 255, 0.8);
          }
          
          .dark .comment-form-ultra {
            background: linear-gradient(135deg, 
              rgba(30, 41, 59, 0.9) 0%, 
              rgba(45, 55, 72, 0.9) 100%);
            box-shadow: 
              0 16px 48px rgba(0, 0, 0, 0.4),
              inset 0 2px 0 rgba(255, 255, 255, 0.1);
          }
          
          /* Animated Border for Form */
          .comment-form-ultra::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 3px;
            background: linear-gradient(45deg, 
              #14b8a6, #06b6d4, #3b82f6, #6366f1, #8b5cf6, #a855f7);
            background-size: 300% 300%;
            border-radius: 24px;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask-composite: xor;
            opacity: 0;
            transition: opacity 0.8s ease;
            animation: gradientFlow 4s ease infinite;
          }
          
          .comment-form-ultra:hover::before {
            opacity: 1;
          }
          
          .comment-form-ultra:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 
              0 20px 60px rgba(99, 102, 241, 0.25),
              inset 0 2px 0 rgba(255, 255, 255, 0.9);
          }
          
          /* Ultra Enhanced Textarea */
          .ultra-textarea {
            background: rgba(255, 255, 255, 0.95) !important;
            border: 3px solid rgba(20, 184, 166, 0.3) !important;
            border-radius: 20px !important;
            padding: 20px !important;
            font-size: 16px !important;
            line-height: 1.8 !important;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            backdrop-filter: blur(10px) !important;
            box-shadow: 
              0 8px 32px rgba(20, 184, 166, 0.15),
              inset 0 2px 4px rgba(255, 255, 255, 0.8) !important;
            font-weight: 500 !important;
            resize: vertical !important;
            min-height: 120px !important;
          }
          
          .dark .ultra-textarea {
            background: rgba(15, 23, 42, 0.95) !important;
            border: 3px solid rgba(20, 184, 166, 0.5) !important;
            color: #f3f4f6 !important;
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.1) !important;
          }
          
          .ultra-textarea:focus {
            border-color: rgba(20, 184, 166, 0.8) !important;
            box-shadow: 
              0 0 0 6px rgba(20, 184, 166, 0.2),
              0 12px 40px rgba(20, 184, 166, 0.3) !important;
            transform: scale(1.02) !important;
            outline: none !important;
          }
          
          .ultra-textarea::placeholder {
            color: #9ca3af !important;
            font-weight: 500 !important;
          }
          
          /* Form Controls */
          .form-controls-ultra {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 24px;
            gap: 20px;
          }
          
          .character-count-ultra {
            color: #6b7280;
            font-size: 14px;
            font-weight: 600;
            padding: 8px 16px;
            background: rgba(99, 102, 241, 0.1);
            border-radius: 16px;
            transition: all 0.6s ease;
            border: 2px solid rgba(99, 102, 241, 0.2);
          }
          
          .dark .character-count-ultra {
            color: #9ca3af;
            background: rgba(99, 102, 241, 0.2);
            border: 2px solid rgba(99, 102, 241, 0.3);
          }
          
          .character-count-ultra:hover {
            transform: scale(1.05);
            background: rgba(99, 102, 241, 0.15);
            border-color: rgba(99, 102, 241, 0.3);
          }
          
          /* Ultra Enhanced Submit Button */
          .ultra-submit-btn {
            background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%) !important;
            border: none !important;
            color: white !important;
            font-weight: 800 !important;
            padding: 12px 32px !important;
            border-radius: 18px !important;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            position: relative !important;
            overflow: hidden !important;
            box-shadow: 0 8px 32px rgba(168, 85, 247, 0.4) !important;
            font-size: 15px !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
          }
          
          .ultra-submit-btn::before {
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
            transition: left 1s ease;
          }
          
          .ultra-submit-btn:hover::before {
            left: 100%;
          }
          
          .ultra-submit-btn:hover {
            transform: translateY(-3px) scale(1.05) !important;
            box-shadow: 0 12px 40px rgba(168, 85, 247, 0.6) !important;
            filter: brightness(110%) !important;
          }
          
          .ultra-submit-btn:active {
            transform: translateY(-1px) scale(1.02) !important;
          }
          
          /* Error Alert Enhancement */
          .ultra-alert {
            border-radius: 16px !important;
            border: 2px solid rgba(239, 68, 68, 0.3) !important;
            backdrop-filter: blur(10px) !important;
            margin-top: 20px !important;
            animation: bounceIn 0.6s ease-out !important;
          }
          
          /* Comments Header */
          .comments-header-ultra {
            display: flex;
            align-items: center;
            gap: 16px;
            margin: 32px 0 24px 0;
            animation: fadeInStagger 0.8s ease-out 0.6s both;
          }
          
          .comments-title-ultra {
            font-size: 18px;
            font-weight: 700;
            color: #374151;
            background: linear-gradient(135deg, #374151, #4b5563);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .dark .comments-title-ultra {
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .comments-count-ultra {
            background: linear-gradient(135deg, #6b7280, #9ca3af);
            color: white;
            padding: 6px 14px;
            border-radius: 16px;
            font-size: 14px;
            font-weight: 700;
            box-shadow: 0 4px 16px rgba(107, 114, 128, 0.3);
            transition: all 0.6s ease;
            border: 2px solid rgba(107, 114, 128, 0.3);
          }
          
          .dark .comments-count-ultra {
            background: linear-gradient(135deg, #9ca3af, #d1d5db);
            color: #1f2937;
          }
          
          .comments-count-ultra:hover {
            transform: scale(1.1) translateY(-2px);
            box-shadow: 0 8px 24px rgba(107, 114, 128, 0.5);
          }
          
          /* No Comments Message */
          .no-comments-ultra {
            text-align: center;
            color: #6b7280;
            font-size: 16px;
            font-weight: 600;
            margin: 40px 0;
            padding: 32px;
            background: linear-gradient(135deg, 
              rgba(107, 114, 128, 0.05) 0%, 
              rgba(156, 163, 175, 0.05) 100%);
            border-radius: 20px;
            border: 2px dashed rgba(107, 114, 128, 0.2);
            animation: fadeInStagger 0.8s ease-out 0.7s both;
          }
          
          .dark .no-comments-ultra {
            color: #9ca3af;
            background: linear-gradient(135deg, 
              rgba(107, 114, 128, 0.1) 0%, 
              rgba(156, 163, 175, 0.1) 100%);
            border: 2px dashed rgba(107, 114, 128, 0.3);
          }
          
          /* Comments List */
          .comments-list-ultra {
            display: flex;
            flex-direction: column;
            gap: 24px;
            animation: fadeInStagger 0.8s ease-out 0.8s both;
          }
          
          /* Ultra Enhanced Modal */
          .ultra-modal-backdrop {
            backdrop-filter: blur(20px) saturate(180%) !important;
            background: rgba(0, 0, 0, 0.6) !important;
          }
          
          .ultra-modal-content {
            background: linear-gradient(145deg, 
              rgba(255, 255, 255, 0.98) 0%, 
              rgba(248, 250, 252, 0.95) 100%) !important;
            backdrop-filter: blur(25px) !important;
            border-radius: 24px !important;
            border: 2px solid rgba(99, 102, 241, 0.2) !important;
            box-shadow: 
              0 25px 80px rgba(0, 0, 0, 0.3),
              0 12px 40px rgba(99, 102, 241, 0.2) !important;
            animation: bounceIn 0.6s ease-out !important;
          }
          
          .dark .ultra-modal-content {
            background: linear-gradient(145deg, 
              rgba(15, 23, 42, 0.98) 0%, 
              rgba(30, 41, 59, 0.95) 100%) !important;
            border: 2px solid rgba(99, 102, 241, 0.3) !important;
          }
          
          .ultra-modal-icon {
            width: 4rem !important;
            height: 4rem !important;
            margin: 0 auto 1.5rem auto !important;
            color: #9ca3af !important;
            animation: float 3s ease-in-out infinite !important;
          }
          
          .dark .ultra-modal-icon {
            color: #6b7280 !important;
          }
          
          .ultra-modal-title {
            margin-bottom: 2rem !important;
            font-size: 1.25rem !important;
            font-weight: 600 !important;
            color: #6b7280 !important;
          }
          
          .dark .ultra-modal-title {
            color: #9ca3af !important;
          }
          
          .ultra-modal-buttons {
            display: flex !important;
            justify-content: space-between !important;
            gap: 1rem !important;
          }
          
          .ultra-delete-btn {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
            border: none !important;
            font-weight: 700 !important;
            padding: 12px 24px !important;
            border-radius: 16px !important;
            transition: all 0.6s ease !important;
            box-shadow: 0 8px 32px rgba(239, 68, 68, 0.4) !important;
          }
          
          .ultra-delete-btn:hover {
            transform: translateY(-2px) scale(1.05) !important;
            box-shadow: 0 12px 40px rgba(239, 68, 68, 0.6) !important;
          }
          
          .ultra-cancel-btn {
            background: rgba(107, 114, 128, 0.1) !important;
            border: 2px solid rgba(107, 114, 128, 0.3) !important;
            color: #6b7280 !important;
            font-weight: 700 !important;
            padding: 12px 24px !important;
            border-radius: 16px !important;
            transition: all 0.6s ease !important;
          }
          
          .ultra-cancel-btn:hover {
            background: rgba(107, 114, 128, 0.2) !important;
            transform: translateY(-2px) scale(1.05) !important;
            border-color: rgba(107, 114, 128, 0.5) !important;
          }
          
          /* Floating Sparkles */
          .sparkle-ultra {
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #6366f1, #a855f7);
            border-radius: 50%;
            opacity: 0;
            animation: sparkle 4s ease-in-out infinite;
          }
          
          .sparkle-1 { top: 10%; left: 90%; animation-delay: 0s; }
          .sparkle-2 { top: 60%; right: 10%; animation-delay: 1.3s; }
          .sparkle-3 { bottom: 20%; left: 15%; animation-delay: 2.6s; }
          .sparkle-4 { top: 80%; left: 80%; animation-delay: 3.9s; }
          
          .comment-section-ultra:hover .sparkle-ultra {
            opacity: 1;
          }
          
          /* Responsive Design */
          @media (max-width: 768px) {
            .comment-section-ultra {
              padding: 24px;
              border-radius: 24px;
            }
            
            .comment-form-ultra {
              padding: 20px;
            }
            
            .form-controls-ultra {
              flex-direction: column;
              align-items: stretch;
              gap: 16px;
            }
            
            .ultra-submit-btn {
              width: 100% !important;
              padding: 14px !important;
            }
          }
          
          @media (max-width: 480px) {
            .comment-section-ultra {
              padding: 20px;
              margin: 20px 16px;
            }
            
            .user-info-ultra {
              flex-direction: column;
              text-align: center;
              gap: 12px;
            }
            
            .comments-header-ultra {
              flex-direction: column;
              align-items: center;
              gap: 12px;
            }
          }
        `}
      </style>

      <div className="comment-section-ultra">
        {/* Floating Sparkles */}
        <div className="sparkle-ultra sparkle-1"></div>
        <div className="sparkle-ultra sparkle-2"></div>
        <div className="sparkle-ultra sparkle-3"></div>
        <div className="sparkle-ultra sparkle-4"></div>

        {currentUser ? (
          <div className="user-info-ultra">
            <span className="user-info-text">Signed in as:</span>
            <div className="ultra-avatar-container">
              <UserAvatar
                src={currentUser.profilePicture}
                alt={currentUser.username}
                size="sm"
                className="w-8 h-8"
              />
            </div>
            <Link
              to={"/dashboard?tab=profile"}
              className="username-link-ultra"
            >
              @{currentUser.username}
            </Link>
          </div>
        ) : (
          <div className="signin-prompt-ultra">
            <div className="signin-prompt-text">
              You must be signed in to comment.
            </div>
            <Link className="signin-link-ultra" to={"/sign-in"}>
              Sign In
            </Link>
          </div>
        )}

        {currentUser && (
          <form className="comment-form-ultra" onSubmit={handleSubmit}>
            <Textarea
              className="ultra-textarea"
              placeholder="Share your thoughts... ✨"
              rows={4}
              maxLength={200}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="form-controls-ultra">
              <div className="character-count-ultra">
                {200 - comment.length} characters remaining
              </div>
              <Button 
                className="ultra-submit-btn" 
                type="submit"
                disabled={!comment.trim()}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit
                </span>
              </Button>
            </div>
            {commentError && (
              <Alert color="failure" className="ultra-alert">
                {commentError}
              </Alert>
            )}
          </form>
        )}

        {comments.length === 0 ? (
          <div className="no-comments-ultra">
            <div className="flex flex-col items-center gap-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>No comments yet! Be the first to share your thoughts.</span>
            </div>
          </div>
        ) : (
          <>
            <div className="comments-header-ultra">
              <span className="comments-title-ultra">Comments</span>
              <div className="comments-count-ultra">
                {comments.length}
              </div>
            </div>
            <div className="comments-list-ultra">
              {comments.map((comment, index) => (
                <div
                  key={comment._id}
                  style={{
                    animationDelay: `${0.9 + index * 0.1}s`,
                    animation: `fadeInStagger 0.8s ease-out ${0.9 + index * 0.1}s both`
                  }}
                >
                  <Comment
                    comment={comment}
                    onLike={handleLike}
                    onEdit={handleEdit}
                    onDelete={(commentId) => {
                      setShowModal(true);
                      setCommentToDelete(commentId);
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
          className="ultra-modal-backdrop"
        >
          <Modal.Header />
          <Modal.Body className="ultra-modal-content">
            <div className="text-center">
              <HiOutlineExclamationCircle className="ultra-modal-icon" />
              <h3 className="ultra-modal-title">
                Are you sure you want to delete this comment?
              </h3>
              <div className="ultra-modal-buttons">
                <Button 
                  className="ultra-delete-btn"
                  onClick={() => handleDelete(commentToDelete)}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Yes, Delete
                  </span>
                </Button>
                <Button 
                  className="ultra-cancel-btn"
                  onClick={() => setShowModal(false)}
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
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CommentSection;
