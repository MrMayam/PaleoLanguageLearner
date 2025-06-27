import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Ensure DOM is loaded before rendering
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  createRoot(rootElement).render(<App />);
  
  // Register service worker for PWA functionality
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
  
} catch (error) {
  console.error("Failed to render app:", error);
  // Fallback rendering
  rootElement.innerHTML = `
    <div style="
      display: flex; 
      align-items: center; 
      justify-content: center; 
      min-height: 100vh; 
      background: white;
      font-family: system-ui, sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1 style="color: #0891b2; margin-bottom: 16px;">Paleo Hebrew Learning</h1>
        <p style="color: #666;">Loading ancient wisdom...</p>
        <script>setTimeout(() => window.location.reload(), 2000);</script>
      </div>
    </div>
  `;
}
