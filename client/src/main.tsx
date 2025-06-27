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
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        
        console.log('ServiceWorker registered successfully:', registration);
        
        // Wait for the service worker to be ready
        await navigator.serviceWorker.ready;
        console.log('ServiceWorker is ready');
        
        // Enable background sync if supported
        if ('sync' in window.ServiceWorkerRegistration.prototype) {
          console.log('Background sync is supported');
        }
        
      } catch (error) {
        console.error('ServiceWorker registration failed:', error);
      }
    });
  } else {
    console.log('ServiceWorker or Push notifications not supported');
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
