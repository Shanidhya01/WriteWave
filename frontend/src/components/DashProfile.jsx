import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../Redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
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
          @keyframes profileSlideIn {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
              filter: blur(8px);
            }
            60% {
              opacity: 0.8;
              transform: translateY(-5px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          
          @keyframes avatarFloat {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(-8px) scale(1.02);
            }
          }
          
          @keyframes shimmerEffect {
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
          
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
            }
            50% {
              box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
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
          
          @keyframes buttonHover {
            0% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-3px) scale(1.02);
            }
            100% {
              transform: translateY(-2px) scale(1.05);
            }
          }
          
          @keyframes inputFocus {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
            }
            100% {
              transform: scale(1.01);
              box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
            }
          }
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3) rotate(30deg);
            }
            50% {
              opacity: 1;
              transform: scale(1.1) rotate(-10deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
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
          
          @keyframes titleGlow {
            0%, 100% {
              text-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
            }
            50% {
              text-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
            }
          }
          
          @keyframes morphBorder {
            0%, 100% {
              border-radius: 32px;
            }
            25% {
              border-radius: 40px 24px 32px 28px;
            }
            50% {
              border-radius: 28px 36px 24px 32px;
            }
            75% {
              border-radius: 36px 28px 40px 24px;
            }
          }
          
          /* Ultra Enhanced Profile Container - Made Wider */
          .profile-dashboard-container {
            max-width: 40rem;
            margin: 0 auto;
            padding: 50px;
            width: 100%;
            background: linear-gradient(145deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(248, 250, 252, 0.95) 100%);
            backdrop-filter: blur(25px) saturate(180%);
            border-radius: 32px;
            border: 2px solid rgba(99, 102, 241, 0.1);
            box-shadow: 
              0 25px 80px rgba(99, 102, 241, 0.15),
              0 10px 40px rgba(0, 0, 0, 0.08),
              inset 0 2px 0 rgba(255, 255, 255, 0.8);
            position: relative;
            overflow: hidden;
            animation: profileSlideIn 1.2s ease-out;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            margin-top: 20px;
            margin-bottom: 20px;
          }
          
          .dark .profile-dashboard-container {
            background: linear-gradient(145deg, 
              rgba(15, 23, 42, 0.95) 0%, 
              rgba(30, 41, 59, 0.95) 100%);
            border: 2px solid rgba(99, 102, 241, 0.2);
            box-shadow: 
              0 25px 80px rgba(0, 0, 0, 0.4),
              0 10px 40px rgba(99, 102, 241, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.1);
          }
          
          /* Advanced Background Effects */
          .profile-dashboard-container::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
            opacity: 0.8;
            animation: gradientFlow 15s ease infinite;
            pointer-events: none;
          }
          
          .profile-dashboard-container::after {
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
            transition: left 2s ease;
            border-radius: 32px;
            pointer-events: none;
          }
          
          .profile-dashboard-container:hover::after {
            left: 100%;
          }
          
          .profile-dashboard-container:hover {
            transform: translateY(-6px) scale(1.01);
            box-shadow: 
              0 35px 100px rgba(99, 102, 241, 0.2),
              0 15px 50px rgba(99, 102, 241, 0.15),
              inset 0 2px 0 rgba(255, 255, 255, 0.9);
            animation: morphBorder 8s ease infinite;
          }
          
          .dark .profile-dashboard-container:hover {
            box-shadow: 
              0 35px 100px rgba(99, 102, 241, 0.3),
              0 15px 50px rgba(0, 0, 0, 0.5),
              inset 0 2px 0 rgba(255, 255, 255, 0.2);
          }
          
          /* Enhanced Profile Title */
          .profile-title {
            margin: 2rem 0 3rem 0;
            text-align: center;
            font-weight: 800;
            font-size: 2.75rem;
            background: linear-gradient(135deg, #374151, #4b5563, #6366f1);
            background-size: 300% 300%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientFlow 8s ease infinite, titleGlow 3s ease infinite;
            letter-spacing: -0.02em;
            position: relative;
          }
          
          .dark .profile-title {
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb, #a78bfa);
            background-size: 300% 300%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .profile-title::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
          }
          
          /* Enhanced Profile Form */
          .profile-form {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            position: relative;
            z-index: 2;
          }
          
          /* Ultra Enhanced Avatar Container */
          .avatar-container {
            position: relative;
            width: 12rem;
            height: 12rem;
            align-self: center;
            cursor: pointer;
            overflow: hidden;
            border-radius: 50%;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: avatarFloat 6s ease-in-out infinite;
            margin-bottom: 1rem;
          }
          
          .avatar-container::before {
            content: '';
            position: absolute;
            inset: -4px;
            background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899, #f59e0b);
            border-radius: 50%;
            z-index: -1;
            animation: gradientFlow 8s ease infinite;
            box-shadow: 0 0 40px rgba(99, 102, 241, 0.5);
          }
          
          .avatar-container:hover {
            transform: scale(1.08) rotate(5deg);
            animation: pulseGlow 1.5s ease infinite;
          }
          
          .avatar-container:hover::before {
            box-shadow: 0 0 60px rgba(99, 102, 241, 0.8);
          }
          
          /* Enhanced Avatar Image */
          .avatar-image {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 6px solid rgba(255, 255, 255, 0.9);
            transition: all 0.6s ease;
            position: relative;
            z-index: 1;
          }
          
          .dark .avatar-image {
            border: 6px solid rgba(30, 41, 59, 0.9);
          }
          
          .avatar-image.uploading {
            opacity: 0.6;
            filter: blur(2px);
          }
          
          /* Enhanced Progress Bar */
          .progress-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
            z-index: 2;
          }
          
          .progress-overlay .CircularProgressbar {
            width: 90% !important;
            height: 90% !important;
          }
          
          .progress-overlay .CircularProgressbar .CircularProgressbar-path {
            stroke: #6366f1 !important;
            stroke-width: 8 !important;
            filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.8)) !important;
          }
          
          .progress-overlay .CircularProgressbar .CircularProgressbar-text {
            fill: white !important;
            font-weight: 700 !important;
            font-size: 16px !important;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8)) !important;
          }
          
          /* Enhanced Text Inputs */
          .enhanced-input {
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            border: 2px solid rgba(99, 102, 241, 0.1) !important;
            border-radius: 16px !important;
            padding: 18px 24px !important;
            font-size: 16px !important;
            font-weight: 500 !important;
            background: rgba(255, 255, 255, 0.8) !important;
            backdrop-filter: blur(10px) !important;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.05) !important;
            position: relative !important;
          }
          
          .dark .enhanced-input {
            background: rgba(30, 41, 59, 0.8) !important;
            border: 2px solid rgba(99, 102, 241, 0.2) !important;
            color: #f3f4f6 !important;
          }
          
          .enhanced-input:focus {
            outline: none !important;
            border-color: rgba(99, 102, 241, 0.5) !important;
            box-shadow: 
              0 8px 32px rgba(99, 102, 241, 0.15),
              0 0 0 4px rgba(99, 102, 241, 0.1) !important;
            transform: translateY(-2px) scale(1.01) !important;
            animation: inputFocus 0.3s ease !important;
          }
          
          .enhanced-input::placeholder {
            color: #9ca3af !important;
            font-weight: 500 !important;
          }
          
          .dark .enhanced-input::placeholder {
            color: #6b7280 !important;
          }
          
          /* Enhanced Buttons */
          .update-btn {
            background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
            border: none !important;
            color: white !important;
            font-weight: 700 !important;
            padding: 18px 36px !important;
            border-radius: 16px !important;
            font-size: 17px !important;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3) !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          .update-btn::before {
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
          
          .update-btn:hover::before {
            left: 100%;
          }
          
          .update-btn:hover {
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 12px 40px rgba(99, 102, 241, 0.5) !important;
            filter: brightness(110%) !important;
            animation: buttonHover 0.6s ease !important;
          }
          
          .update-btn:disabled {
            opacity: 0.6 !important;
            cursor: not-allowed !important;
            transform: none !important;
            animation: none !important;
          }
          
          .create-post-btn {
            background: linear-gradient(135deg, #a855f7, #ec4899) !important;
            border: none !important;
            color: white !important;
            font-weight: 700 !important;
            padding: 18px 36px !important;
            border-radius: 16px !important;
            font-size: 17px !important;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            box-shadow: 0 8px 32px rgba(168, 85, 247, 0.3) !important;
            width: 100% !important;
            text-decoration: none !important;
            display: inline-block !important;
            text-align: center !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          .create-post-btn::before {
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
          
          .create-post-btn:hover::before {
            left: 100%;
          }
          
          .create-post-btn:hover {
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 12px 40px rgba(168, 85, 247, 0.5) !important;
            filter: brightness(110%) !important;
          }
          
          /* Enhanced Action Links */
          .profile-actions {
            color: #ef4444;
            display: flex;
            justify-content: space-between;
            margin-top: 2.5rem;
            gap: 1.5rem;
          }
          
          .action-link {
            cursor: pointer;
            transition: all 0.4s ease;
            padding: 10px 20px;
            border-radius: 12px;
            font-weight: 600;
            position: relative;
            overflow: hidden;
          }
          
          .action-link::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(239, 68, 68, 0.1);
            transition: all 0.4s ease;
            transform: translate(-50%, -50%);
          }
          
          .action-link:hover::before {
            width: 200px;
            height: 200px;
          }
          
          .action-link:hover {
            color: #dc2626;
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.2);
          }
          
          /* Enhanced Alerts */
          .enhanced-alert {
            border-radius: 16px !important;
            border: none !important;
            padding: 18px 24px !important;
            margin-top: 1.5rem !important;
            font-weight: 600 !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
            animation: bounceIn 0.6s ease-out !important;
          }
          
          .enhanced-alert.success {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1)) !important;
            border-left: 4px solid #10b981 !important;
            color: #065f46 !important;
          }
          
          .dark .enhanced-alert.success {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2)) !important;
            color: #34d399 !important;
          }
          
          .enhanced-alert.error {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1)) !important;
            border-left: 4px solid #ef4444 !important;
            color: #991b1b !important;
          }
          
          .dark .enhanced-alert.error {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2)) !important;
            color: #f87171 !important;
          }
          
          /* Enhanced Modal */
          .enhanced-modal .flowbite-modal-content {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95)) !important;
            backdrop-filter: blur(30px) !important;
            border-radius: 32px !important;
            border: 3px solid rgba(99, 102, 241, 0.2) !important;
            box-shadow: 
              0 32px 96px rgba(0, 0, 0, 0.4),
              0 16px 48px rgba(99, 102, 241, 0.3),
              inset 0 2px 0 rgba(255, 255, 255, 0.8) !important;
            animation: bounceIn 0.8s ease-out !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          .dark .enhanced-modal .flowbite-modal-content {
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95)) !important;
            border: 3px solid rgba(99, 102, 241, 0.3) !important;
            box-shadow: 
              0 32px 96px rgba(0, 0, 0, 0.6),
              0 16px 48px rgba(99, 102, 241, 0.4),
              inset 0 2px 0 rgba(255, 255, 255, 0.1) !important;
          }
          
          .enhanced-modal .flowbite-modal-content::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, 
              rgba(99, 102, 241, 0.05), 
              rgba(168, 85, 247, 0.05));
            opacity: 0.8;
            animation: gradientFlow 8s ease infinite;
            pointer-events: none;
          }
          
          .modal-icon-enhanced {
            width: 5rem !important;
            height: 5rem !important;
            margin: 0 auto 2rem auto !important;
            color: #ef4444 !important;
            animation: pulseGlow 2s ease infinite !important;
            filter: drop-shadow(0 8px 16px rgba(239, 68, 68, 0.3)) !important;
          }
          
          .dark .modal-icon-enhanced {
            color: #f87171 !important;
          }
          
          .modal-title-enhanced {
            margin-bottom: 2rem !important;
            font-size: 1.375rem !important;
            font-weight: 700 !important;
            color: #374151 !important;
            background: linear-gradient(135deg, #374151, #4b5563) !important;
            background-clip: text !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            text-align: center !important;
          }
          
          .dark .modal-title-enhanced {
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb) !important;
            background-clip: text !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
          }
          
          .modal-buttons-enhanced {
            display: flex !important;
            justify-content: center !important;
            gap: 1.5rem !important;
            margin-top: 2rem !important;
          }
          
          .modal-confirm-btn-enhanced {
            background: linear-gradient(135deg, #ef4444, #dc2626) !important;
            border: none !important;
            color: white !important;
            font-weight: 800 !important;
            padding: 14px 28px !important;
            border-radius: 20px !important;
            transition: all 0.8s ease !important;
            box-shadow: 0 8px 32px rgba(239, 68, 68, 0.4) !important;
          }
          
          .modal-confirm-btn-enhanced:hover {
            transform: translateY(-3px) scale(1.05) !important;
            box-shadow: 0 12px 40px rgba(239, 68, 68, 0.6) !important;
            filter: brightness(110%) !important;
          }
          
          .modal-cancel-btn-enhanced {
            background: rgba(107, 114, 128, 0.1) !important;
            border: 3px solid rgba(107, 114, 128, 0.3) !important;
            color: #6b7280 !important;
            font-weight: 800 !important;
            padding: 14px 28px !important;
            border-radius: 20px !important;
            transition: all 0.8s ease !important;
          }
          
          .modal-cancel-btn-enhanced:hover {
            background: rgba(107, 114, 128, 0.2) !important;
            transform: translateY(-3px) scale(1.05) !important;
            border-color: rgba(107, 114, 128, 0.5) !important;
            box-shadow: 0 8px 24px rgba(107, 114, 128, 0.3) !important;
          }
          
          /* Floating Sparkles */
          .sparkle-profile {
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #6366f1, #a855f7);
            border-radius: 50%;
            opacity: 0;
            animation: sparkle 4s ease-in-out infinite;
            z-index: 1;
          }
          
          .sparkle-1 { top: 15%; left: 85%; animation-delay: 0s; }
          .sparkle-2 { top: 70%; right: 15%; animation-delay: 1.3s; }
          .sparkle-3 { bottom: 25%; left: 20%; animation-delay: 2.6s; }
          .sparkle-4 { top: 85%; left: 75%; animation-delay: 3.9s; }
          
          .profile-dashboard-container:hover .sparkle-profile {
            opacity: 1;
          }
          
          /* Responsive Design */
          @media (max-width: 1024px) {
            .profile-dashboard-container {
              max-width: 36rem;
              padding: 40px;
            }
          }
          
          @media (max-width: 768px) {
            .profile-dashboard-container {
              max-width: 32rem;
              margin: 16px;
              padding: 32px;
              border-radius: 24px;
            }
            
            .profile-title {
              font-size: 2.25rem;
            }
            
            .avatar-container {
              width: 10rem;
              height: 10rem;
            }
            
            .enhanced-input {
              padding: 16px 20px !important;
              font-size: 15px !important;
            }
            
            .update-btn, .create-post-btn {
              padding: 16px 28px !important;
              font-size: 16px !important;
            }
            
            .modal-buttons-enhanced {
              flex-direction: column !important;
              gap: 1rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .profile-dashboard-container {
              max-width: 28rem;
              margin: 12px;
              padding: 24px;
            }
            
            .profile-title {
              font-size: 1.875rem;
            }
            
            .avatar-container {
              width: 8rem;
              height: 8rem;
            }
            
            .enhanced-input {
              padding: 14px 16px !important;
              font-size: 14px !important;
            }
            
            .update-btn, .create-post-btn {
              padding: 14px 24px !important;
              font-size: 15px !important;
            }
            
            .profile-actions {
              flex-direction: column;
              gap: 0.75rem;
              text-align: center;
            }
          }
        `}
      </style>

      <div className="profile-dashboard-container">
        {/* Floating Sparkles */}
        <div className="sparkle-profile sparkle-1"></div>
        <div className="sparkle-profile sparkle-2"></div>
        <div className="sparkle-profile sparkle-3"></div>
        <div className="sparkle-profile sparkle-4"></div>

        <h1 className="profile-title">Profile</h1>
        
        <form onSubmit={handleSubmit} className="profile-form">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          
          <div
            className="avatar-container"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <div className="progress-overlay">
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={6}
                />
              </div>
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="user"
              className={`avatar-image ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                'uploading'
              }`}
            />
          </div>
          
          {imageFileUploadError && (
            <Alert color="failure" className="enhanced-alert error">
              {imageFileUploadError}
            </Alert>
          )}
          
          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="enhanced-input"
          />
          
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="enhanced-input"
          />
          
          <TextInput
            type="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
            className="enhanced-input"
          />
          
          <Button
            type="submit"
            disabled={loading || imageFileUploading}
            className="update-btn"
          >
            {loading ? 'Loading...' : 'Update'}
          </Button>
          
          {currentUser.isAdmin && (
            <Link to="/create-post" className="create-post-btn">
              Create a post
            </Link>
          )}
        </form>
        
        <div className="profile-actions">
          <span 
            onClick={() => setShowModal(true)} 
            className="action-link"
          >
            Delete Account
          </span>
          <span 
            onClick={handleSignout} 
            className="action-link"
          >
            Sign Out
          </span>
        </div>
        
        {updateUserSuccess && (
          <Alert color="success" className="enhanced-alert success">
            {updateUserSuccess}
          </Alert>
        )}
        
        {updateUserError && (
          <Alert color="failure" className="enhanced-alert error">
            {updateUserError}
          </Alert>
        )}
        
        {error && (
          <Alert color="failure" className="enhanced-alert error">
            {error}
          </Alert>
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
              <HiOutlineExclamationCircle className="modal-icon-enhanced" />
              <h3 className="modal-title-enhanced">
                Are you sure you want to delete your account?
              </h3>
              <p style={{ 
                color: '#6b7280', 
                marginBottom: '24px',
                fontSize: '15px',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                This action cannot be undone. All your data will be permanently removed.
              </p>
              <div className="modal-buttons-enhanced">
                <Button 
                  color="failure" 
                  onClick={handleDeleteUser}
                  className="modal-confirm-btn-enhanced"
                >
                  Yes, I'm sure
                </Button>
                <Button 
                  color="gray" 
                  onClick={() => setShowModal(false)}
                  className="modal-cancel-btn-enhanced"
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}