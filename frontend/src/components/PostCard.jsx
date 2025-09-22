import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {
  return (
    <>
      <style>
        {`
          @keyframes cardEntrance {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
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
          
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.1);
            }
            50% {
              box-shadow: 0 25px 50px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.2);
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
          
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes rotateIn {
            from {
              transform: rotate(-180deg) scale(0);
              opacity: 0;
            }
            to {
              transform: rotate(0deg) scale(1);
              opacity: 1;
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
          
          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          /* Enhanced PostCard Container */
          .post-card-enhanced {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            border: 2px solid transparent;
            background-clip: padding-box;
            border-radius: 24px;
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.08),
              0 1px 8px rgba(0, 0, 0, 0.02),
              inset 0 1px 0 rgba(255, 255, 255, 0.4);
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            position: relative;
            overflow: hidden;
            animation: cardEntrance 0.8s ease-out forwards;
            transform-origin: center bottom;
          }
          
          .dark .post-card-enhanced {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%);
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.3),
              0 1px 8px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
          }
          
          .post-card-enhanced::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.6) 0%, 
              rgba(168, 85, 247, 0.6) 25%,
              rgba(236, 72, 153, 0.6) 50%,
              rgba(251, 146, 60, 0.6) 75%,
              rgba(34, 197, 94, 0.6) 100%);
            border-radius: 24px;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask-composite: xor;
            opacity: 0;
            transition: opacity 0.6s ease;
            background-size: 300% 300%;
            animation: gradientShift 3s ease infinite;
          }
          
          .post-card-enhanced:hover::before {
            opacity: 1;
          }
          
          .post-card-enhanced:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 
              0 25px 60px rgba(99, 102, 241, 0.2),
              0 5px 20px rgba(99, 102, 241, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.6);
            animation: glow 2s ease-in-out infinite;
          }
          
          .dark .post-card-enhanced:hover {
            box-shadow: 
              0 25px 60px rgba(99, 102, 241, 0.3),
              0 5px 20px rgba(99, 102, 241, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          
          /* Enhanced Image Container */
          .image-container-enhanced {
            position: relative;
            overflow: hidden;
            border-radius: 20px 20px 0 0;
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          }
          
          .image-container-enhanced::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              135deg,
              rgba(99, 102, 241, 0.1) 0%,
              rgba(168, 85, 247, 0.1) 50%,
              rgba(236, 72, 153, 0.1) 100%
            );
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          
          .post-card-enhanced:hover .image-container-enhanced::after {
            opacity: 1;
          }
          
          .enhanced-image {
            width: 100%;
            height: 240px;
            object-fit: cover;
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            filter: brightness(1) contrast(1) saturate(1);
          }
          
          .post-card-enhanced:hover .enhanced-image {
            transform: scale(1.15) rotate(2deg);
            filter: brightness(1.1) contrast(1.1) saturate(1.2);
          }
          
          /* Enhanced Category Badge */
          .category-badge-enhanced {
            position: absolute;
            top: 16px;
            left: 16px;
            z-index: 10;
            animation: fadeInScale 0.6s ease-out 0.3s both;
          }
          
          .category-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 700;
            color: white;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.9) 0%, 
              rgba(168, 85, 247, 0.9) 100%);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .category-badge::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s ease;
          }
          
          .category-badge:hover::before {
            left: 100%;
          }
          
          .category-badge:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
          }
          
          /* Enhanced Content Container */
          .content-container-enhanced {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            height: 180px;
            position: relative;
            background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.02) 100%);
          }
          
          .dark .content-container-enhanced {
            background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.05) 100%);
          }
          
          /* Enhanced Title */
          .title-enhanced {
            font-size: 18px;
            font-weight: 800;
            line-height: 1.4;
            color: #1f2937;
            transition: all 0.3s ease;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            position: relative;
          }
          
          .dark .title-enhanced {
            color: #f9fafb;
          }
          
          .post-card-enhanced:hover .title-enhanced {
            color: #6366f1;
            transform: translateY(-2px);
          }
          
          .dark .post-card-enhanced:hover .title-enhanced {
            color: #818cf8;
          }
          
          /* Enhanced Meta Info */
          .meta-info-enhanced {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            color: #6b7280;
            transition: all 0.3s ease;
          }
          
          .dark .meta-info-enhanced {
            color: #9ca3af;
          }
          
          .meta-icon {
            width: 16px;
            height: 16px;
            transition: all 0.3s ease;
          }
          
          .post-card-enhanced:hover .meta-icon {
            color: #6366f1;
            transform: scale(1.1);
          }
          
          .dark .post-card-enhanced:hover .meta-icon {
            color: #818cf8;
          }
          
          /* Enhanced Read More Button */
          .read-more-enhanced {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 20px 20px 20px;
            padding: 16px;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.9) 0%, 
              rgba(168, 85, 247, 0.9) 100%);
            color: white;
            text-align: center;
            font-weight: 700;
            font-size: 15px;
            border-radius: 16px;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            transform: translateY(120%);
            opacity: 0;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
            position: relative;
            overflow: hidden;
          }
          
          .read-more-enhanced::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.8s ease;
          }
          
          .read-more-enhanced:hover::before {
            left: 100%;
          }
          
          .post-card-enhanced:hover .read-more-enhanced {
            transform: translateY(0);
            opacity: 1;
            animation: slideUp 0.6s ease-out;
          }
          
          .read-more-enhanced:hover {
            background: linear-gradient(135deg, 
              rgba(79, 70, 229, 1) 0%, 
              rgba(147, 51, 234, 1) 100%);
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(99, 102, 241, 0.4);
          }
          
          .read-more-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            position: relative;
            z-index: 2;
          }
          
          .arrow-icon {
            width: 16px;
            height: 16px;
            transition: all 0.3s ease;
          }
          
          .read-more-enhanced:hover .arrow-icon {
            transform: translateX(4px);
          }
          
          /* Enhanced Glow Effect */
          .glow-effect-enhanced {
            position: absolute;
            inset: 0;
            border-radius: 24px;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.05) 0%, 
              rgba(168, 85, 247, 0.05) 50%,
              rgba(236, 72, 153, 0.05) 100%);
            opacity: 0;
            transition: all 0.8s ease;
            pointer-events: none;
          }
          
          .post-card-enhanced:hover .glow-effect-enhanced {
            opacity: 1;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.1) 0%, 
              rgba(168, 85, 247, 0.1) 50%,
              rgba(236, 72, 153, 0.1) 100%);
          }
          
          /* Sparkle Effects */
          .sparkle-effect {
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #6366f1, #a855f7);
            border-radius: 50%;
            opacity: 0;
            animation: sparkle 2s ease-in-out infinite;
          }
          
          .sparkle-1 {
            top: 20%;
            left: 15%;
            animation-delay: 0s;
          }
          
          .sparkle-2 {
            top: 60%;
            right: 20%;
            animation-delay: 0.7s;
          }
          
          .sparkle-3 {
            bottom: 30%;
            left: 25%;
            animation-delay: 1.4s;
          }
          
          .post-card-enhanced:hover .sparkle-effect {
            opacity: 1;
          }
          
          /* Floating Author Badge (if needed) */
          .author-badge {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            color: white;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
            transition: all 0.3s ease;
            opacity: 0;
            transform: scale(0);
            animation: rotateIn 0.6s ease-out 0.5s both;
          }
          
          .post-card-enhanced:hover .author-badge {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
          }
          
          /* Responsive Enhancements */
          @media (max-width: 768px) {
            .post-card-enhanced {
              max-width: 340px;
              margin: 0 auto;
            }
            
            .enhanced-image {
              height: 200px;
            }
            
            .content-container-enhanced {
              height: 160px;
              padding: 20px;
            }
            
            .title-enhanced {
              font-size: 16px;
            }
          }
          
          @media (max-width: 480px) {
            .post-card-enhanced {
              max-width: 300px;
            }
            
            .enhanced-image {
              height: 180px;
            }
            
            .content-container-enhanced {
              height: 140px;
              padding: 16px;
            }
          }
        `}
      </style>
      
      <div className='post-card-enhanced group relative w-full max-w-sm h-[420px] overflow-hidden'>
        {/* Sparkle Effects */}
        <div className="sparkle-effect sparkle-1"></div>
        <div className="sparkle-effect sparkle-2"></div>
        <div className="sparkle-effect sparkle-3"></div>
        
        {/* Image Container */}
        <Link to={`/post/${post.slug}`} className="image-container-enhanced block relative">
          <img 
            src={post.image} 
            alt="post cover" 
            className='enhanced-image' 
          />
          
          {/* Category Badge */}
          <div className="category-badge-enhanced">
            <span className='category-badge'>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {post.category}
            </span>
          </div>
          
          {/* Author Badge */}
          <div className="author-badge">
            A
          </div>
        </Link>
        
        {/* Content Container */}
        <div className='content-container-enhanced'>
          {/* Title */}
          <h3 className='title-enhanced'>
            {post.title}
          </h3>
          
          {/* Meta Info */}
          <div className="meta-info-enhanced">
            <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
            <span className="mx-2">•</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              {Math.ceil(Math.random() * 5 + 2)} min read
            </span>
          </div>
          
          {/* Read More Button */}
          <Link 
            to={`/post/${post.slug}`} 
            className='read-more-enhanced'
          >
            <div className="read-more-content">
              <span>Read Full Article</span>
              <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        </div>
        
        {/* Hover Glow Effect */}
        <div className="glow-effect-enhanced"></div>
      </div>
    </>
  )
}

export default PostCard