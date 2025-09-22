import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  // Redirect non-admin users
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // If not admin, show nothing or redirect
  if (!currentUser || !currentUser.isAdmin) {
    return null;
  }

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prevFormData) => ({ ...prevFormData, image: downloadURL }));
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
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
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
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
          
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
          }
          
          /* Enhanced create post container */
          .create-post-container {
            background: linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            min-height: 100vh;
            position: relative;
            overflow: hidden;
          }
          
          .dark .create-post-container {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%);
          }
          
          /* Background elements */
          .create-post-bg {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
          }
          
          .create-post-bg::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
            animation: float 12s ease-in-out infinite;
          }
          
          .create-post-bg::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.1) 1px, transparent 0);
            background-size: 40px 40px;
            opacity: 0.5;
          }
          
          /* Enhanced header */
          .create-post-header {
            text-align: center;
            margin: 2rem 0 3rem 0;
            animation: fadeInUp 1s ease-out;
          }
          
          .create-post-title {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 75%, #f5576c 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
            position: relative;
          }
          
          .create-post-subtitle {
            font-size: 1.2rem;
            color: var(--text-secondary);
            font-weight: 500;
            max-width: 600px;
            margin: 0 auto;
          }
          
          /* Enhanced form container */
          .enhanced-form {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            border-radius: 2rem;
            padding: 3rem;
            border: 2px solid rgba(139, 92, 246, 0.2);
            box-shadow: 0 20px 40px rgba(139, 92, 246, 0.1);
            position: relative;
            overflow: hidden;
            animation: slideInLeft 1s ease-out 0.3s both;
          }
          
          .dark .enhanced-form {
            background: rgba(15, 23, 42, 0.7);
            border: 2px solid rgba(139, 92, 246, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          
          .enhanced-form::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
            transition: left 1s ease;
          }
          
          .enhanced-form:hover::before {
            left: 100%;
          }
          
          /* Enhanced input styling */
          .enhanced-input {
            position: relative;
            margin-bottom: 1.5rem;
          }
          
          .enhanced-input input,
          .enhanced-input select {
            background: rgba(255, 255, 255, 0.9) !important;
            border: 2px solid rgba(139, 92, 246, 0.2) !important;
            border-radius: 1rem !important;
            padding: 1rem 1.5rem !important;
            font-size: 1.1rem !important;
            font-weight: 500 !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            backdrop-filter: blur(10px) !important;
          }
          
          .dark .enhanced-input input,
          .dark .enhanced-input select {
            background: rgba(15, 23, 42, 0.9) !important;
            border: 2px solid rgba(139, 92, 246, 0.3) !important;
            color: white !important;
          }
          
          .enhanced-input input:focus,
          .enhanced-input select:focus {
            border-color: rgba(139, 92, 246, 0.6) !important;
            box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1) !important;
            transform: scale(1.02) !important;
            outline: none !important;
          }
          
          .enhanced-input input::placeholder {
            color: rgba(139, 92, 246, 0.6) !important;
            font-weight: 500 !important;
          }
          
          /* Enhanced file upload area */
          .enhanced-upload-area {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
            border: 3px dashed rgba(139, 92, 246, 0.3);
            border-radius: 1.5rem;
            padding: 2rem;
            margin: 2rem 0;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            animation: slideInRight 1s ease-out 0.6s both;
          }
          
          .enhanced-upload-area:hover {
            border-color: rgba(139, 92, 246, 0.5);
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            transform: scale(1.02);
          }
          
          .dark .enhanced-upload-area {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            border: 3px dashed rgba(139, 92, 246, 0.4);
          }
          
          /* Enhanced upload button */
          .enhanced-upload-btn {
            background: linear-gradient(135deg, var(--purple-500) 0%, var(--pink-500) 100%) !important;
            border: none !important;
            color: white !important;
            font-weight: 700 !important;
            padding: 1rem 2rem !important;
            border-radius: 1rem !important;
            position: relative !important;
            overflow: hidden !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3) !important;
          }
          
          .enhanced-upload-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s ease;
          }
          
          .enhanced-upload-btn:hover::before {
            left: 100%;
          }
          
          .enhanced-upload-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 12px 32px rgba(139, 92, 246, 0.4) !important;
          }
          
          .enhanced-upload-btn:disabled {
            opacity: 0.7 !important;
            cursor: not-allowed !important;
            transform: none !important;
          }
          
          /* Enhanced progress bar */
          .enhanced-progress {
            width: 4rem !important;
            height: 4rem !important;
            animation: pulse 2s ease-in-out infinite;
          }
          
          /* Enhanced uploaded image */
          .enhanced-uploaded-image {
            border-radius: 1.5rem;
            box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
            border: 3px solid rgba(139, 92, 246, 0.3);
            transition: all 0.3s ease;
            animation: fadeInUp 0.8s ease-out;
          }
          
          .enhanced-uploaded-image:hover {
            transform: scale(1.02);
            box-shadow: 0 25px 50px rgba(139, 92, 246, 0.3);
          }
          
          /* Enhanced ReactQuill styling */
          .enhanced-editor {
            margin: 2rem 0;
            border-radius: 1.5rem;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
            border: 2px solid rgba(139, 92, 246, 0.2);
            animation: fadeInUp 1s ease-out 0.9s both;
          }
          
          .enhanced-editor .ql-toolbar {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
            border: none;
            border-bottom: 2px solid rgba(139, 92, 246, 0.2);
            padding: 1rem;
          }
          
          .dark .enhanced-editor .ql-toolbar {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            border-bottom: 2px solid rgba(139, 92, 246, 0.3);
          }
          
          .enhanced-editor .ql-container {
            background: rgba(255, 255, 255, 0.9);
            border: none;
            font-size: 1.1rem;
            line-height: 1.8;
          }
          
          .dark .enhanced-editor .ql-container {
            background: rgba(15, 23, 42, 0.9);
            color: white;
          }
          
          .enhanced-editor .ql-editor {
            padding: 2rem;
            min-height: 300px;
          }
          
          .enhanced-editor .ql-editor::before {
            color: rgba(139, 92, 246, 0.6);
            font-weight: 500;
            font-style: normal;
          }
          
          /* Enhanced publish button */
          .enhanced-publish-btn {
            background: linear-gradient(135deg, var(--purple-500) 0%, var(--pink-500) 100%) !important;
            border: none !important;
            color: white !important;
            font-weight: 800 !important;
            font-size: 1.2rem !important;
            padding: 1.2rem 3rem !important;
            border-radius: 1.5rem !important;
            position: relative !important;
            overflow: hidden !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3) !important;
            width: 100% !important;
            margin-top: 2rem !important;
            animation: fadeInUp 1s ease-out 1.2s both;
          }
          
          .enhanced-publish-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.8s ease;
          }
          
          .enhanced-publish-btn:hover::before {
            left: 100%;
          }
          
          .enhanced-publish-btn:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 15px 40px rgba(139, 92, 246, 0.4) !important;
            animation: bounce 0.6s ease !important;
          }
          
          /* Enhanced alerts */
          .enhanced-alert {
            border-radius: 1rem !important;
            padding: 1rem 1.5rem !important;
            font-weight: 600 !important;
            border: none !important;
            box-shadow: 0 8px 24px rgba(220, 38, 38, 0.2) !important;
            animation: bounce 0.5s ease !important;
          }
          
          .enhanced-alert.success {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%) !important;
            color: var(--green-600) !important;
            border: 2px solid rgba(34, 197, 94, 0.3) !important;
            box-shadow: 0 8px 24px rgba(34, 197, 94, 0.2) !important;
          }
          
          /* Sparkle effects */
          .sparkle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--purple-400);
            border-radius: 50%;
            animation: sparkle 3s ease-in-out infinite;
          }
          
          .sparkle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
          .sparkle:nth-child(2) { top: 20%; left: 80%; animation-delay: 1s; }
          .sparkle:nth-child(3) { top: 70%; left: 20%; animation-delay: 2s; }
          .sparkle:nth-child(4) { top: 80%; left: 90%; animation-delay: 0.5s; }
          .sparkle:nth-child(5) { top: 50%; left: 50%; animation-delay: 1.5s; }
          
          /* Responsive enhancements */
          @media (max-width: 768px) {
            .create-post-title {
              font-size: 2rem;
            }
            
            .enhanced-form {
              padding: 2rem 1.5rem;
              margin: 1rem;
            }
            
            .enhanced-upload-area {
              padding: 1.5rem;
            }
          }
        `}
      </style>
      
      <div className="create-post-container">
        {/* Background elements */}
        <div className="create-post-bg"></div>
        
        {/* Sparkle effects */}
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        
        <div className="relative z-10 p-3 max-w-4xl mx-auto">
          {/* Enhanced header */}
          <div className="create-post-header">
            <h1 className="create-post-title">
              ✨ Create Amazing Content
            </h1>
            <p className="create-post-subtitle">
              Share your thoughts, ideas, and stories with the world. 
              Let your creativity shine through every word! 🚀
            </p>
          </div>
          
          {/* Enhanced form */}
          <div className="enhanced-form">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6 sm:flex-row justify-between">
                <div className="enhanced-input flex-1">
                  <TextInput
                    type="text"
                    placeholder="📝 Enter your amazing title..."
                    required
                    id="title"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="enhanced-input sm:w-64">
                  <Select
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="uncategorized">🏷️ Select a category</option>
                    <option value="automobile">🚗 Automobile</option>
                    <option value="history">📚 History</option>
                    <option value="science">🔬 Science</option>
                    <option value="technology">💻 Technology</option>
                    <option value="travel">✈️ Travel</option>
                    <option value="lifestyle">🌟 Lifestyle</option>
                    <option value="food">🍕 Food & Cooking</option>
                    <option value="sports">⚽ Sports</option>
                    <option value="music">🎵 Music</option>
                    <option value="art">🎨 Art & Design</option>
                  </Select>
                </div>
              </div>
              
              <div className="enhanced-upload-area">
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex-1">
                    <FileInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="file-input-enhanced"
                    />
                  </div>
                  <Button
                    type="button"
                    size="lg"
                    className="enhanced-upload-btn"
                    onClick={handleUploadImage}
                    disabled={imageUploadProgress}
                  >
                    {imageUploadProgress ? (
                      <div className="enhanced-progress">
                        <CircularProgressbar
                          value={imageUploadProgress}
                          text={`${imageUploadProgress}%`}
                          styles={{
                            path: {
                              stroke: `rgba(255, 255, 255, 0.9)`,
                            },
                            text: {
                              fill: `rgba(255, 255, 255, 0.9)`,
                              fontSize: '16px',
                              fontWeight: 'bold',
                            },
                          }}
                        />
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Image
                      </span>
                    )}
                  </Button>
                </div>
                
                {imageUploadError && (
                  <Alert color="failure" className="enhanced-alert mt-4">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {imageUploadError}
                    </span>
                  </Alert>
                )}
              </div>
              
              {formData.image && (
                <div className="text-center">
                  <img
                    src={formData.image}
                    alt="upload"
                    className="enhanced-uploaded-image w-full h-80 object-cover mx-auto"
                  />
                </div>
              )}
              
              <div className="enhanced-editor">
                <ReactQuill
                  theme="snow"
                  placeholder="✍️ Start writing your amazing content here... Let your creativity flow!"
                  className="h-80"
                  required
                  onChange={(value) => {
                    setFormData((prevFormData) => ({ ...prevFormData, content: value }));
                  }}
                />
              </div>
              
              <Button type="submit" className="enhanced-publish-btn">
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Publish Your Masterpiece
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
              
              {publishError && (
                <Alert color="failure" className="enhanced-alert">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {publishError}
                  </span>
                </Alert>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
