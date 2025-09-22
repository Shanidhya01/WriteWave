import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <>
      <style>
        {`
          /* Enhanced theme transition animations */
          * {
            transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                       color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                       border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                       box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Root CSS variables for consistent theming */
          :root {
            --primary-50: #f0f9ff;
            --primary-100: #e0f2fe;
            --primary-200: #bae6fd;
            --primary-300: #7dd3fc;
            --primary-400: #38bdf8;
            --primary-500: #0ea5e9;
            --primary-600: #0284c7;
            --primary-700: #0369a1;
            --primary-800: #075985;
            --primary-900: #0c4a6e;
            
            --purple-50: #faf5ff;
            --purple-100: #f3e8ff;
            --purple-200: #e9d5ff;
            --purple-300: #d8b4fe;
            --purple-400: #c084fc;
            --purple-500: #a855f7;
            --purple-600: #9333ea;
            --purple-700: #7c3aed;
            --purple-800: #6b21a8;
            --purple-900: #581c87;
            
            --pink-50: #fdf2f8;
            --pink-100: #fce7f3;
            --pink-200: #fbcfe8;
            --pink-300: #f9a8d4;
            --pink-400: #f472b6;
            --pink-500: #ec4899;
            --pink-600: #db2777;
            --pink-700: #be185d;
            --pink-800: #9d174d;
            --pink-900: #831843;
          }

          /* Light theme enhanced variables */
          .light {
            --bg-primary: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            --bg-secondary: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            --bg-tertiary: rgba(255, 255, 255, 0.8);
            --text-primary: #1e293b;
            --text-secondary: #475569;
            --text-tertiary: #64748b;
            --border-primary: rgba(226, 232, 240, 0.8);
            --border-secondary: rgba(203, 213, 225, 0.6);
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            --gradient-primary: linear-gradient(135deg, var(--purple-500) 0%, var(--pink-500) 100%);
            --gradient-secondary: linear-gradient(135deg, var(--primary-500) 0%, var(--purple-500) 100%);
          }

          /* Dark theme enhanced variables */
          .dark {
            --bg-primary: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            --bg-secondary: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            --bg-tertiary: rgba(30, 41, 59, 0.8);
            --text-primary: #f1f5f9;
            --text-secondary: #cbd5e1;
            --text-tertiary: #94a3b8;
            --border-primary: rgba(71, 85, 105, 0.8);
            --border-secondary: rgba(100, 116, 139, 0.6);
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
            --gradient-primary: linear-gradient(135deg, var(--purple-600) 0%, var(--pink-600) 100%);
            --gradient-secondary: linear-gradient(135deg, var(--primary-600) 0%, var(--purple-600) 100%);
          }

          /* Enhanced body styling */
          body {
            font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            letter-spacing: -0.01em;
            scroll-behavior: smooth;
            overflow-x: hidden;
          }

          /* Custom scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: var(--bg-secondary);
            border-radius: 12px;
          }

          ::-webkit-scrollbar-thumb {
            background: var(--gradient-primary);
            border-radius: 12px;
            transition: all 0.3s ease;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: var(--gradient-secondary);
            transform: scale(1.1);
          }

          /* Firefox scrollbar */
          * {
            scrollbar-width: thin;
            scrollbar-color: var(--purple-500) var(--bg-secondary);
          }

          /* Enhanced selection styling */
          ::selection {
            background: var(--gradient-primary);
            color: white;
            text-shadow: none;
          }

          ::-moz-selection {
            background: var(--gradient-primary);
            color: white;
            text-shadow: none;
          }

          /* Focus outline improvements */
          *:focus {
            outline: 2px solid var(--purple-500);
            outline-offset: 2px;
          }

          *:focus:not(:focus-visible) {
            outline: none;
          }

          /* Enhanced animations */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
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

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
            }
            50% {
              box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(236, 72, 153, 0.6);
            }
          }

          /* Utility classes for animations */
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out;
          }

          .animate-slide-in {
            animation: slideIn 0.8s ease-out;
          }

          .animate-scale-in {
            animation: scaleIn 0.6s ease-out;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }

          /* Enhanced theme-aware utilities */
          .bg-theme-primary {
            background: var(--bg-primary);
          }

          .bg-theme-secondary {
            background: var(--bg-secondary);
          }

          .bg-theme-tertiary {
            background: var(--bg-tertiary);
          }

          .text-theme-primary {
            color: var(--text-primary);
          }

          .text-theme-secondary {
            color: var(--text-secondary);
          }

          .text-theme-tertiary {
            color: var(--text-tertiary);
          }

          .border-theme-primary {
            border-color: var(--border-primary);
          }

          .border-theme-secondary {
            border-color: var(--border-secondary);
          }

          .shadow-theme-sm {
            box-shadow: var(--shadow-sm);
          }

          .shadow-theme-md {
            box-shadow: var(--shadow-md);
          }

          .shadow-theme-lg {
            box-shadow: var(--shadow-lg);
          }

          .shadow-theme-xl {
            box-shadow: var(--shadow-xl);
          }

          .gradient-theme-primary {
            background: var(--gradient-primary);
          }

          .gradient-theme-secondary {
            background: var(--gradient-secondary);
          }

          /* Glass morphism utility */
          .glass-morphism {
            backdrop-filter: blur(16px) saturate(180%);
            background-color: var(--bg-tertiary);
            border: 1px solid var(--border-secondary);
          }

          /* Enhanced button styles */
          .btn-theme-primary {
            background: var(--gradient-primary);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-md);
          }

          .btn-theme-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }

          .btn-theme-secondary {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 2px solid var(--border-primary);
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .btn-theme-secondary:hover {
            background: var(--gradient-primary);
            color: white;
            border-color: transparent;
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
          }

          /* Card styling */
          .card-theme {
            background: var(--bg-tertiary);
            border: 1px solid var(--border-secondary);
            border-radius: 16px;
            padding: 24px;
            box-shadow: var(--shadow-md);
            backdrop-filter: blur(12px);
            transition: all 0.3s ease;
          }

          .card-theme:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
          }

          /* Input styling */
          .input-theme {
            background: var(--bg-tertiary);
            border: 2px solid var(--border-secondary);
            border-radius: 12px;
            padding: 12px 16px;
            color: var(--text-primary);
            font-size: 16px;
            transition: all 0.3s ease;
            backdrop-filter: blur(8px);
          }

          .input-theme:focus {
            border-color: var(--purple-500);
            box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
            background: var(--bg-primary);
          }

          /* Enhanced mobile responsiveness */
          @media (max-width: 768px) {
            .animate-fade-in,
            .animate-slide-in,
            .animate-scale-in {
              animation-duration: 0.5s;
            }
            
            .card-theme {
              padding: 16px;
            }
            
            .btn-theme-primary,
            .btn-theme-secondary {
              padding: 10px 20px;
              font-size: 14px;
            }
          }

          /* Reduced motion preferences */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            
            .animate-float,
            .animate-glow {
              animation: none;
            }
          }

          /* High contrast mode support */
          @media (prefers-contrast: high) {
            :root {
              --border-primary: #000000;
              --border-secondary: #000000;
            }
            
            .dark {
              --border-primary: #ffffff;
              --border-secondary: #ffffff;
            }
          }

          /* Print styles */
          @media print {
            * {
              background: white !important;
              color: black !important;
              box-shadow: none !important;
            }
          }
        `}
      </style>
      
      <div className={`${theme} transition-all duration-500 ease-in-out`}>
        <div className="min-h-screen bg-theme-primary text-theme-primary relative overflow-hidden">
          {/* Enhanced background gradient overlay */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 dark:from-purple-600/10 dark:to-pink-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
            </div>
          </div>

          {/* Grid pattern overlay */}
          <div 
            className="fixed inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>

          {/* Main content wrapper */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}