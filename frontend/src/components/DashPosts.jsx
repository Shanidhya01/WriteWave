import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
          if(data.posts.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async()=> {
    const startIndex = userPosts.length
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json()
      if(res.ok){
        setUserPosts((prev)=>[...prev, ...data.posts])
        if(data.posts.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeletePost = async()=>{
    setShowModal(false)
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
        method: 'DELETE'
      })
      const data = await res.json()
      console.log(data);
      if(!res.ok){
        console.log(data.message);
      } else {
        setUserPosts((prev)=>prev.filter((post)=>post._id !== postIdToDelete))
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <style>
        {`
          /* Enhanced Keyframes */
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
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
          }
          
          /* Enhanced Container */
          .posts-dashboard-container {
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
          
          .dark .posts-dashboard-container {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
            border: 2px solid rgba(99, 102, 241, 0.2);
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.3),
              0 8px 32px rgba(99, 102, 241, 0.1);
          }
          
          /* Shimmer Effect */
          .posts-dashboard-container::before {
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
          
          .posts-dashboard-container:hover::before {
            left: 100%;
          }
          
          /* Enhanced Table */
          .posts-table-wrapper {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 16px;
            overflow: hidden;
            border: none;
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.08);
          }
          
          .dark .posts-table-wrapper {
            background: rgba(30, 41, 59, 0.8);
          }
          
          /* Table Header Enhancement */
          .posts-table-wrapper .flowbite-table thead th {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1)) !important;
            color: #4b5563 !important;
            font-weight: 700 !important;
            font-size: 14px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            padding: 20px 16px !important;
            border-bottom: 2px solid rgba(99, 102, 241, 0.2) !important;
            border-color: rgba(99, 102, 241, 0.2) !important;
          }
          
          .dark .posts-table-wrapper .flowbite-table thead th {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2)) !important;
            color: #d1d5db !important;
            border-bottom: 2px solid rgba(99, 102, 241, 0.3) !important;
            border-color: rgba(99, 102, 241, 0.3) !important;
          }
          
          /* Table Row Enhancement */
          .posts-table-wrapper .flowbite-table tbody tr {
            background: rgba(255, 255, 255, 0.6) !important;
            border-bottom: 1px solid rgba(99, 102, 241, 0.1) !important;
            transition: all 0.3s ease !important;
            animation: fadeInScale 0.6s ease-out !important;
            border-color: rgba(99, 102, 241, 0.1) !important;
          }
          
          .dark .posts-table-wrapper .flowbite-table tbody tr {
            background: rgba(45, 55, 72, 0.6) !important;
            border-bottom: 1px solid rgba(99, 102, 241, 0.2) !important;
            border-color: rgba(99, 102, 241, 0.2) !important;
          }
          
          .posts-table-wrapper .flowbite-table tbody tr:hover {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.08)) !important;
            transform: translateX(4px) !important;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15) !important;
          }
          
          .dark .posts-table-wrapper .flowbite-table tbody tr:hover {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15)) !important;
          }
          
          /* Table Cell Enhancement */
          .posts-table-wrapper .flowbite-table tbody td {
            padding: 16px !important;
            color: #374151 !important;
            font-weight: 500 !important;
            border: none !important;
            background: transparent !important;
          }
          
          .dark .posts-table-wrapper .flowbite-table tbody td {
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
          
          /* Post Image Styling */
          .post-image {
            width: 80px;
            height: 40px;
            object-fit: cover;
            border-radius: 12px;
            border: 2px solid rgba(99, 102, 241, 0.2);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
          }
          
          .post-image:hover {
            transform: scale(1.1) rotate(2deg);
            border-color: rgba(99, 102, 241, 0.4);
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2);
          }
          
          /* Post Title Styling */
          .post-title {
            color: #374151;
            font-weight: 600;
            font-size: 16px;
            text-decoration: none;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .dark .post-title {
            color: #f3f4f6;
          }
          
          .post-title::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            transition: width 0.3s ease;
          }
          
          .post-title:hover::after {
            width: 100%;
          }
          
          .post-title:hover {
            color: #6366f1;
            transform: translateY(-2px);
          }
          
          .dark .post-title:hover {
            color: #a78bfa;
          }
          
          /* Category Badge */
          .category-badge {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 6px 14px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
            transition: all 0.3s ease;
          }
          
          .category-badge:hover {
            transform: scale(1.05) rotate(1deg);
            box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
            animation: float 2s ease infinite;
          }
          
          /* Action Buttons */
          .delete-btn {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1));
            color: #ef4444;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 10px;
            border: 1px solid rgba(239, 68, 68, 0.2);
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            font-size: 13px;
          }
          
          .delete-btn:hover {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            border-color: rgba(239, 68, 68, 0.4);
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
          }
          
          .edit-btn {
            background: linear-gradient(135deg, rgba(13, 148, 136, 0.1), rgba(15, 118, 110, 0.1));
            color: #0d9488;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 10px;
            border: 1px solid rgba(13, 148, 136, 0.2);
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            font-size: 13px;
          }
          
          .edit-btn:hover {
            background: linear-gradient(135deg, #0d9488, #0f766e);
            color: white;
            border-color: rgba(13, 148, 136, 0.4);
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3);
          }
          
          /* Show More Button */
          .show-more-btn {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            font-weight: 700;
            padding: 14px 32px;
            border-radius: 16px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 6px 24px rgba(99, 102, 241, 0.3);
            font-size: 14px;
            margin: 24px auto;
            display: block;
            animation: float 3s ease-in-out infinite;
          }
          
          .show-more-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 32px rgba(99, 102, 241, 0.5);
            filter: brightness(110%);
          }
          
          /* No Posts Message */
          .no-posts {
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
          
          .dark .no-posts {
            color: #9ca3af;
            background: linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(156, 163, 175, 0.1));
            border: 2px dashed rgba(107, 114, 128, 0.3);
          }
          
          .no-posts::before {
            content: '📝';
            font-size: 48px;
            display: block;
            margin-bottom: 16px;
            animation: float 2s ease-in-out infinite;
          }
          
          /* Enhanced Modal */
          .enhanced-modal .flowbite-modal-content {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95)) !important;
            backdrop-filter: blur(25px) !important;
            border-radius: 24px !important;
            border: 2px solid rgba(99, 102, 241, 0.2) !important;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3) !important;
            animation: bounceIn 0.6s ease-out !important;
          }
          
          .dark .enhanced-modal .flowbite-modal-content {
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
            .posts-dashboard-container {
              margin: 12px;
              padding: 20px;
            }
            
            .posts-table-wrapper .flowbite-table thead th {
              padding: 12px 8px !important;
              font-size: 12px !important;
            }
            
            .posts-table-wrapper .flowbite-table tbody td {
              padding: 12px 8px !important;
              font-size: 14px !important;
            }
            
            .post-image {
              width: 60px;
              height: 30px;
            }
            
            .modal-buttons {
              flex-direction: column !important;
            }
          }
          
          @media (max-width: 480px) {
            .posts-dashboard-container {
              margin: 8px;
              padding: 16px;
            }
            
            .posts-table-wrapper .flowbite-table thead th {
              padding: 10px 6px !important;
              font-size: 11px !important;
            }
            
            .posts-table-wrapper .flowbite-table tbody td {
              padding: 10px 6px !important;
              font-size: 13px !important;
            }
            
            .post-image {
              width: 50px;
              height: 25px;
            }
          }
        `}
      </style>

      <div className="posts-dashboard-container">
        {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            <div className="overflow-x-auto posts-table-wrapper">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Date created</Table.HeadCell>
                  <Table.HeadCell>Date updated</Table.HeadCell>
                  <Table.HeadCell>Post image</Table.HeadCell>
                  <Table.HeadCell>Post title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>Edit</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {userPosts.map((post, index) => (
                    <Table.Row 
                      key={post._id}
                      style={{ 
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <Table.Cell>
                        <span className="date-badge">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="date-badge">
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="post-image"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link 
                          className="post-title" 
                          to={`/post/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="category-badge">
                          {post.category}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span 
                          className="delete-btn"
                          onClick={() => {
                            setShowModal(true); 
                            setPostIdToDelete(post._id);
                          }}
                        >
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link 
                          className="edit-btn" 
                          to={`/update-post/${post._id}`}
                        >
                          Edit
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            
            {showMore && (
              <button 
                onClick={handleShowMore} 
                className="show-more-btn"
              >
                Show More Posts
              </button>
            )}
          </>
        ) : (
          <div className="no-posts">
            <div>You have no posts yet</div>
            <div style={{ 
              fontSize: '16px', 
              marginTop: '12px', 
              opacity: '0.7' 
            }}>
              Create your first post to see it appear here
            </div>
          </div>
        )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
          className="enhanced-modal"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="modal-icon" />
              <h3 className="modal-title">
                Are you sure you want to delete this post?
              </h3>
              <p style={{ 
                color: '#6b7280', 
                marginBottom: '24px',
                fontSize: '14px'
              }}>
                This action cannot be undone. The post will be permanently removed.
              </p>
              <div className="modal-buttons">
                <Button 
                  className="modal-confirm-btn"
                  onClick={handleDeletePost}
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

export default DashPosts;
