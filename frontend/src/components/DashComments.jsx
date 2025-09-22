import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments`);
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          if(data.comments.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
        fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async() => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setComments((prev)=>[...prev, ...data.comments]);
        if(data.comments.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async() => {
    setShowModal(false);
    try {
        const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,{
            method: 'DELETE'
        });
        const data = await res.json();
        if(res.ok){
            setComments((prev)=>prev.filter((comment)=>comment._id !== commentIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <>
      <style>
        {`
          /* Ultra Modern Keyframes */
          @keyframes slideInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes shimmerEffect {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
            }
            50% {
              box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
            }
          }
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          
          /* Enhanced Container */
          .comments-dashboard-wrapper {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95));
            backdrop-filter: blur(20px);
            border-radius: 24px;
            border: 2px solid rgba(99, 102, 241, 0.1);
            box-shadow: 
              0 20px 60px rgba(99, 102, 241, 0.1),
              0 8px 32px rgba(0, 0, 0, 0.05);
            margin: 20px;
            padding: 32px;
            position: relative;
            overflow: hidden;
            animation: slideInUp 0.8s ease-out;
          }
          
          .dark .comments-dashboard-wrapper {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
            border: 2px solid rgba(99, 102, 241, 0.2);
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.3),
              0 8px 32px rgba(99, 102, 241, 0.1);
          }
          
          /* Shimmer Effect */
          .comments-dashboard-wrapper::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.2), 
              transparent);
            transition: left 1.5s ease;
          }
          
          .comments-dashboard-wrapper:hover::before {
            left: 100%;
          }
          
          /* Enhanced Table Styles */
          .ultra-table {
            background: rgba(255, 255, 255, 0.8) !important;
            border-radius: 16px !important;
            overflow: hidden !important;
            border: none !important;
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.08) !important;
          }
          
          .dark .ultra-table {
            background: rgba(30, 41, 59, 0.8) !important;
          }
          
          /* Enhanced Table Header */
          .ultra-table thead th {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1)) !important;
            color: #4b5563 !important;
            font-weight: 700 !important;
            font-size: 14px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            padding: 20px 16px !important;
            border-bottom: 2px solid rgba(99, 102, 241, 0.2) !important;
          }
          
          .dark .ultra-table thead th {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2)) !important;
            color: #d1d5db !important;
            border-bottom: 2px solid rgba(99, 102, 241, 0.3) !important;
          }
          
          /* Enhanced Table Rows */
          .ultra-table tbody tr {
            background: rgba(255, 255, 255, 0.6) !important;
            border-bottom: 1px solid rgba(99, 102, 241, 0.1) !important;
            transition: all 0.3s ease !important;
            animation: fadeInScale 0.6s ease-out !important;
          }
          
          .dark .ultra-table tbody tr {
            background: rgba(45, 55, 72, 0.6) !important;
            border-bottom: 1px solid rgba(99, 102, 241, 0.2) !important;
          }
          
          .ultra-table tbody tr:hover {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.08)) !important;
            transform: translateX(4px) !important;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15) !important;
          }
          
          .dark .ultra-table tbody tr:hover {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15)) !important;
          }
          
          /* Enhanced Table Cells */
          .ultra-table tbody td {
            padding: 16px !important;
            color: #374151 !important;
            font-weight: 500 !important;
            border: none !important;
          }
          
          .dark .ultra-table tbody td {
            color: #e5e7eb !important;
          }
          
          /* Date Badge Styling */
          .date-badge {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
          }
          
          .date-badge:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
          }
          
          /* Comment Content Styling */
          .comment-content {
            max-width: 250px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 1.5;
            background: rgba(107, 114, 128, 0.1);
            padding: 10px 14px;
            border-radius: 10px;
            border: 1px solid rgba(107, 114, 128, 0.2);
            transition: all 0.3s ease;
          }
          
          .dark .comment-content {
            background: rgba(107, 114, 128, 0.2);
            border: 1px solid rgba(107, 114, 128, 0.3);
          }
          
          .comment-content:hover {
            background: rgba(107, 114, 128, 0.15);
            border-color: rgba(107, 114, 128, 0.3);
            transform: scale(1.02);
          }
          
          /* Likes Counter Styling */
          .likes-badge {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 13px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
            transition: all 0.3s ease;
          }
          
          .likes-badge:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 16px rgba(16, 185, 129, 0.5);
            animation: pulseGlow 1.5s ease infinite;
          }
          
          .likes-badge::before {
            content: '♥';
            color: white;
          }
          
          /* ID Styling */
          .id-text {
            font-family: 'Courier New', monospace;
            background: rgba(156, 163, 175, 0.1);
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 11px;
            color: #6b7280;
            border: 1px solid rgba(156, 163, 175, 0.2);
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: all 0.3s ease;
          }
          
          .dark .id-text {
            background: rgba(156, 163, 175, 0.2);
            border: 1px solid rgba(156, 163, 175, 0.3);
            color: #9ca3af;
          }
          
          .id-text:hover {
            background: rgba(156, 163, 175, 0.2);
            border-color: rgba(156, 163, 175, 0.4);
            transform: scale(1.05);
          }
          
          /* Enhanced Delete Button */
          .delete-button {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            font-weight: 700;
            padding: 8px 16px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          
          .delete-button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 24px rgba(239, 68, 68, 0.5);
            filter: brightness(110%);
          }
          
          .delete-button:active {
            transform: translateY(0) scale(1);
          }
          
          /* Enhanced Show More Button */
          .show-more-button {
            background: linear-gradient(135deg, #0d9488, #0f766e);
            color: white;
            font-weight: 700;
            padding: 12px 32px;
            border-radius: 16px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 6px 24px rgba(13, 148, 136, 0.3);
            font-size: 14px;
            margin: 24px auto;
            display: block;
            position: relative;
            overflow: hidden;
          }
          
          .show-more-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 1s ease;
          }
          
          .show-more-button:hover::before {
            left: 100%;
          }
          
          .show-more-button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 32px rgba(13, 148, 136, 0.5);
          }
          
          /* No Comments Styling */
          .no-comments {
            text-align: center;
            color: #6b7280;
            font-size: 18px;
            font-weight: 600;
            margin: 60px 0;
            padding: 40px;
            background: linear-gradient(135deg, rgba(107, 114, 128, 0.05), rgba(156, 163, 175, 0.05));
            border-radius: 20px;
            border: 2px dashed rgba(107, 114, 128, 0.2);
            animation: bounceIn 0.8s ease-out;
          }
          
          .dark .no-comments {
            color: #9ca3af;
            background: linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(156, 163, 175, 0.1));
            border: 2px dashed rgba(107, 114, 128, 0.3);
          }
          
          .no-comments::before {
            content: '💬';
            font-size: 48px;
            display: block;
            margin-bottom: 16px;
          }
          
          /* Enhanced Modal */
          .ultra-modal .flowbite-modal-content {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95)) !important;
            backdrop-filter: blur(25px) !important;
            border-radius: 24px !important;
            border: 2px solid rgba(99, 102, 241, 0.2) !important;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3) !important;
            animation: bounceIn 0.6s ease-out !important;
          }
          
          .dark .ultra-modal .flowbite-modal-content {
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95)) !important;
            border: 2px solid rgba(99, 102, 241, 0.3) !important;
          }
          
          .modal-icon {
            width: 4rem !important;
            height: 4rem !important;
            margin: 0 auto 1.5rem auto !important;
            color: #ef4444 !important;
            animation: pulseGlow 2s ease infinite !important;
          }
          
          .modal-title {
            margin-bottom: 1.5rem !important;
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            color: #374151 !important;
          }
          
          .dark .modal-title {
            color: #f3f4f6 !important;
          }
          
          .modal-buttons {
            display: flex !important;
            gap: 1rem !important;
            justify-content: center !important;
          }
          
          .modal-confirm-btn {
            background: linear-gradient(135deg, #ef4444, #dc2626) !important;
            border: none !important;
            font-weight: 700 !important;
            padding: 12px 24px !important;
            border-radius: 16px !important;
            transition: all 0.3s ease !important;
          }
          
          .modal-confirm-btn:hover {
            transform: translateY(-2px) scale(1.05) !important;
            box-shadow: 0 8px 24px rgba(239, 68, 68, 0.5) !important;
          }
          
          .modal-cancel-btn {
            background: rgba(107, 114, 128, 0.1) !important;
            border: 2px solid rgba(107, 114, 128, 0.3) !important;
            color: #6b7280 !important;
            font-weight: 700 !important;
            padding: 12px 24px !important;
            border-radius: 16px !important;
            transition: all 0.3s ease !important;
          }
          
          .modal-cancel-btn:hover {
            background: rgba(107, 114, 128, 0.2) !important;
            transform: translateY(-2px) scale(1.05) !important;
          }
          
          /* Responsive Design */
          @media (max-width: 768px) {
            .comments-dashboard-wrapper {
              margin: 12px;
              padding: 20px;
            }
            
            .ultra-table thead th {
              padding: 12px 8px !important;
              font-size: 12px !important;
            }
            
            .ultra-table tbody td {
              padding: 12px 8px !important;
              font-size: 14px !important;
            }
            
            .comment-content {
              max-width: 150px;
            }
            
            .id-text {
              max-width: 80px;
            }
          }
          
          @media (max-width: 480px) {
            .comments-dashboard-wrapper {
              margin: 8px;
              padding: 16px;
            }
            
            .ultra-table thead th {
              padding: 10px 6px !important;
              font-size: 11px !important;
            }
            
            .ultra-table tbody td {
              padding: 10px 6px !important;
              font-size: 13px !important;
            }
            
            .comment-content {
              max-width: 120px;
              font-size: 12px;
            }
            
            .modal-buttons {
              flex-direction: column !important;
            }
          }
        `}
      </style>

      <div className="comments-dashboard-wrapper">
        {currentUser.isAdmin && comments.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <Table hoverable className="ultra-table">
                <Table.Head>
                  <Table.HeadCell>Date Created</Table.HeadCell>
                  <Table.HeadCell>Date Updated</Table.HeadCell>
                  <Table.HeadCell>Comment Content</Table.HeadCell>
                  <Table.HeadCell>Number of Likes</Table.HeadCell>
                  <Table.HeadCell>Post ID</Table.HeadCell>
                  <Table.HeadCell>User ID</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {comments.map((comment, index) => (
                    <Table.Row 
                      key={comment._id}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Table.Cell>
                        <span className="date-badge">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="date-badge">
                          {new Date(comment.updatedAt).toLocaleDateString()}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="comment-content">
                          {comment.content}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="likes-badge">
                          {comment.numberOfLikes}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="id-text" title={comment.postId}>
                          {comment.postId}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="id-text" title={comment.userId}>
                          {comment.userId}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <button 
                          className="delete-button"
                          onClick={() => {
                            setShowModal(true); 
                            setCommentIdToDelete(comment._id);
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            
            {showMore && (
              <button 
                onClick={handleShowMore} 
                className="show-more-button"
              >
                Show More Comments
              </button>
            )}
          </>
        ) : (
          <div className="no-comments">
            <div>No comments found in your dashboard</div>
            <div style={{ fontSize: '14px', marginTop: '8px', opacity: '0.7' }}>
              Comments will appear here when users interact with your posts
            </div>
          </div>
        )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
          className="ultra-modal"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="modal-icon" />
              <h3 className="modal-title">
                Are you sure you want to delete this comment?
              </h3>
              <p style={{ 
                color: '#6b7280', 
                marginBottom: '24px',
                fontSize: '14px'
              }}>
                This action cannot be undone.
              </p>
              <div className="modal-buttons">
                <Button 
                  className="modal-confirm-btn"
                  onClick={handleDeleteComment}
                >
                  Yes, I'm sure
                </Button>
                <Button 
                  className="modal-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default DashComments;
