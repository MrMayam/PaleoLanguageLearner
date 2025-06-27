// Pixar-style hyper-realistic SVG character illustrations for diverse children dressed as ancient Israelites
export const ancientCharacters = {
  // Black child as Hebrew scholar - Pixar style with detailed shading and expressions
  scholar: `
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad1" cx="0.3" cy="0.2">
          <stop offset="0%" stop-color="#D2B48C"/>
          <stop offset="30%" stop-color="#A0522D"/>
          <stop offset="100%" stop-color="#8B4513"/>
        </radialGradient>
        <radialGradient id="robeGrad1" cx="0.2" cy="0.1">
          <stop offset="0%" stop-color="#F4E4BC"/>
          <stop offset="50%" stop-color="#DEB887"/>
          <stop offset="100%" stop-color="#CD853F"/>
        </radialGradient>
        <linearGradient id="hairGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5D4E37"/>
          <stop offset="100%" stop-color="#2F1B14"/>
        </linearGradient>
        <filter id="shadow1">
          <feDropShadow dx="2" dy="3" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Body shadow -->
      <ellipse cx="102" cy="295" rx="45" ry="8" fill="black" opacity="0.2"/>
      
      <!-- Robe with realistic folds -->
      <path d="M50 120 Q45 125 45 140 L45 270 Q45 285 55 285 L145 285 Q155 285 155 270 L155 140 Q155 125 150 120 Z" 
            fill="url(#robeGrad1)" filter="url(#shadow1)"/>
      
      <!-- Robe highlight -->
      <path d="M55 125 Q60 130 65 140 L65 270 Q65 275 70 275 L75 275" 
            stroke="#F5F5DC" stroke-width="3" fill="none" opacity="0.4"/>
      
      <!-- Inner tunic with texture -->
      <rect x="65" y="145" width="70" height="130" fill="#8B7355" rx="8"/>
      <rect x="68" y="148" width="64" height="124" fill="#A0522D" rx="6" opacity="0.6"/>
      
      <!-- Belt with metallic shine -->
      <rect x="60" y="165" width="80" height="12" fill="#654321" rx="2"/>
      <rect x="62" y="167" width="76" height="4" fill="#8B7355" rx="1"/>
      
      <!-- Head with 3D modeling -->
      <circle cx="100" cy="80" r="38" fill="url(#faceGrad1)" filter="url(#shadow1)"/>
      <ellipse cx="95" cy="75" rx="30" ry="28" fill="#A0522D" opacity="0.3"/>
      
      <!-- Cheek highlights -->
      <circle cx="85" cy="85" r="8" fill="#D2B48C" opacity="0.4"/>
      <circle cx="115" cy="85" r="8" fill="#D2B48C" opacity="0.4"/>
      
      <!-- Eyes with realistic depth -->
      <ellipse cx="88" cy="72" rx="7" ry="5" fill="white"/>
      <ellipse cx="112" cy="72" rx="7" ry="5" fill="white"/>
      <circle cx="88" cy="72" r="4" fill="#2F1B14"/>
      <circle cx="112" cy="72" r="4" fill="#2F1B14"/>
      <circle cx="89" cy="70" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="113" cy="70" r="1.5" fill="white" opacity="0.9"/>
      
      <!-- Detailed eyebrows -->
      <path d="M80 65 Q85 62 92 64" stroke="#2F1B14" stroke-width="3" stroke-linecap="round"/>
      <path d="M108 64 Q115 62 120 65" stroke="#2F1B14" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Nose with shading -->
      <ellipse cx="100" cy="82" rx="3" ry="5" fill="#8B4513"/>
      <ellipse cx="99" cy="80" rx="2" ry="4" fill="#A0522D"/>
      <circle cx="98" cy="84" r="1" fill="#654321" opacity="0.5"/>
      <circle cx="102" cy="84" r="1" fill="#654321" opacity="0.5"/>
      
      <!-- Expressive mouth -->
      <path d="M92 92 Q100 98 108 92" stroke="#654321" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M95 95 Q100 97 105 95" stroke="#8B4513" stroke-width="1" fill="none"/>
      
      <!-- Realistic curly hair -->
      <path d="M65 55 Q75 40 90 42 Q100 35 110 42 Q125 40 135 55 Q130 45 120 43 Q100 30 80 43 Q70 45 65 55" 
            fill="url(#hairGrad1)"/>
      <circle cx="75" cy="50" r="4" fill="#5D4E37" opacity="0.8"/>
      <circle cx="95" cy="45" r="3" fill="#5D4E37" opacity="0.8"/>
      <circle cx="115" cy="48" r="4" fill="#5D4E37" opacity="0.8"/>
      <circle cx="125" cy="52" r="3" fill="#5D4E37" opacity="0.8"/>
      
      <!-- Head covering with fabric texture -->
      <path d="M75 65 Q100 50 125 65 L130 78 Q100 68 70 78 Z" fill="#8B0000"/>
      <path d="M78 68 Q100 58 122 68" stroke="#CD5C5C" stroke-width="2" opacity="0.6"/>
      
      <!-- Arms with muscle definition -->
      <ellipse cx="55" cy="145" rx="15" ry="30" fill="url(#faceGrad1)"/>
      <ellipse cx="145" cy="145" rx="15" ry="30" fill="url(#faceGrad1)"/>
      <ellipse cx="52" cy="140" rx="12" ry="25" fill="#A0522D" opacity="0.4"/>
      <ellipse cx="142" cy="140" rx="12" ry="25" fill="#A0522D" opacity="0.4"/>
      
      <!-- Detailed hands -->
      <circle cx="55" cy="175" r="10" fill="url(#faceGrad1)"/>
      <circle cx="145" cy="175" r="10" fill="url(#faceGrad1)"/>
      <circle cx="52" cy="172" r="8" fill="#A0522D" opacity="0.5"/>
      <circle cx="142" cy="172" r="8" fill="#A0522D" opacity="0.5"/>
      
      <!-- Fingers -->
      <ellipse cx="50" cy="170" rx="2" ry="4" fill="url(#faceGrad1)"/>
      <ellipse cx="55" cy="168" rx="2" ry="5" fill="url(#faceGrad1)"/>
      <ellipse cx="60" cy="170" rx="2" ry="4" fill="url(#faceGrad1)"/>
      
      <!-- Scroll in hand with Hebrew text -->
      <rect x="135" y="165" width="18" height="25" fill="#F5DEB3" rx="3" transform="rotate(15 144 177)"/>
      <rect x="137" y="167" width="14" height="21" fill="#FFFACD" rx="2" transform="rotate(15 144 177)"/>
      <line x1="139" y1="170" x2="147" y2="172" stroke="#8B4513" stroke-width="1" transform="rotate(15 144 177)"/>
      <line x1="139" y1="174" x2="147" y2="176" stroke="#8B4513" stroke-width="1" transform="rotate(15 144 177)"/>
      <line x1="139" y1="178" x2="147" y2="180" stroke="#8B4513" stroke-width="1" transform="rotate(15 144 177)"/>
      
      <!-- Feet -->
      <ellipse cx="80" cy="285" rx="12" ry="6" fill="#8B4513"/>
      <ellipse cx="120" cy="285" rx="12" ry="6" fill="#8B4513"/>
    </svg>`,

  // Hispanic child as storyteller - Pixar style with warm expressions
  storyteller: `
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad2" cx="0.3" cy="0.2">
          <stop offset="0%" stop-color="#F4C2A1"/>
          <stop offset="50%" stop-color="#D2B48C"/>
          <stop offset="100%" stop-color="#CD853F"/>
        </radialGradient>
        <radialGradient id="robeGrad2" cx="0.2" cy="0.1">
          <stop offset="0%" stop-color="#FFE4B5"/>
          <stop offset="50%" stop-color="#DEB887"/>
          <stop offset="100%" stop-color="#D2691E"/>
        </radialGradient>
        <linearGradient id="hairGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8B4513"/>
          <stop offset="100%" stop-color="#654321"/>
        </radialGradient>
        <filter id="shadow2">
          <feDropShadow dx="2" dy="3" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Body shadow -->
      <ellipse cx="102" cy="295" rx="45" ry="8" fill="black" opacity="0.2"/>
      
      <!-- Colorful robe -->
      <path d="M50 120 Q45 125 45 140 L45 270 Q45 285 55 285 L145 285 Q155 285 155 270 L155 140 Q155 125 150 120 Z" 
            fill="url(#robeGrad2)" filter="url(#shadow2)"/>
      
      <!-- Decorative trim -->
      <rect x="50" y="125" width="100" height="8" fill="#B8860B" rx="2"/>
      <rect x="52" y="127" width="96" height="4" fill="#FFD700" rx="1"/>
      
      <!-- Inner tunic -->
      <rect x="65" y="145" width="70" height="130" fill="#DEB887" rx="8"/>
      <rect x="68" y="148" width="64" height="124" fill="#F4A460" rx="6" opacity="0.7"/>
      
      <!-- Head with warm skin tone -->
      <circle cx="100" cy="80" r="38" fill="url(#faceGrad2)" filter="url(#shadow2)"/>
      <ellipse cx="95" cy="75" rx="30" ry="28" fill="#F4C2A1" opacity="0.4"/>
      
      <!-- Rosy cheeks -->
      <circle cx="80" cy="88" r="6" fill="#FFB6C1" opacity="0.6"/>
      <circle cx="120" cy="88" r="6" fill="#FFB6C1" opacity="0.6"/>
      
      <!-- Expressive eyes -->
      <ellipse cx="88" cy="72" rx="7" ry="6" fill="white"/>
      <ellipse cx="112" cy="72" rx="7" ry="6" fill="white"/>
      <circle cx="88" cy="72" r="4" fill="#8B4513"/>
      <circle cx="112" cy="72" r="4" fill="#8B4513"/>
      <circle cx="89" cy="70" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="113" cy="70" r="1.5" fill="white" opacity="0.9"/>
      
      <!-- Animated eyebrows -->
      <path d="M80 64 Q85 60 92 62" stroke="#654321" stroke-width="3" stroke-linecap="round"/>
      <path d="M108 62 Q115 60 120 64" stroke="#654321" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Cute nose -->
      <ellipse cx="100" cy="82" rx="3" ry="4" fill="#D2B48C"/>
      <ellipse cx="99" cy="80" rx="2" ry="3" fill="#F4C2A1"/>
      
      <!-- Happy smile -->
      <path d="M90 92 Q100 102 110 92" stroke="#8B4513" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M93 96 Q100 100 107 96" fill="#FF6B6B" opacity="0.6"/>
      
      <!-- Wavy hair -->
      <path d="M65 55 Q70 35 85 40 Q95 30 105 40 Q115 30 125 40 Q130 35 135 55 Q125 45 115 48 Q105 38 95 48 Q85 38 75 48 Q65 45 65 55" 
            fill="url(#hairGrad2)"/>
      <path d="M70 50 Q80 45 90 50 Q100 45 110 50 Q120 45 130 50" stroke="#A0522D" stroke-width="2" fill="none"/>
      
      <!-- Hair accessories -->
      <circle cx="85" cy="52" r="3" fill="#FFD700"/>
      <circle cx="115" cy="52" r="3" fill="#FFD700"/>
      
      <!-- Arms with gesture -->
      <ellipse cx="50" cy="150" rx="15" ry="32" fill="url(#faceGrad2)" transform="rotate(-15 50 150)"/>
      <ellipse cx="150" cy="150" rx="15" ry="32" fill="url(#faceGrad2)" transform="rotate(20 150 150)"/>
      
      <!-- Hands in storytelling gesture -->
      <circle cx="40" cy="180" r="10" fill="url(#faceGrad2)"/>
      <circle cx="155" cy="170" r="10" fill="url(#faceGrad2)"/>
      
      <!-- Fingers pointing -->
      <ellipse cx="35" cy="175" rx="2" ry="5" fill="url(#faceGrad2)" transform="rotate(-30 35 175)"/>
      <ellipse cx="160" cy="165" rx="2" ry="5" fill="url(#faceGrad2)" transform="rotate(45 160 165)"/>
      
      <!-- Feet -->
      <ellipse cx="80" cy="285" rx="12" ry="6" fill="#D2691E"/>
      <ellipse cx="120" cy="285" rx="12" ry="6" fill="#D2691E"/>
    </svg>`,

  // Native American child as explorer - Pixar style with detailed features
  explorer: `
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad3" cx="0.3" cy="0.2">
          <stop offset="0%" stop-color="#DEB887"/>
          <stop offset="50%" stop-color="#D2B48C"/>
          <stop offset="100%" stop-color="#BC9A6A"/>
        </radialGradient>
        <radialGradient id="robeGrad3" cx="0.2" cy="0.1">
          <stop offset="0%" stop-color="#F5E6D3"/>
          <stop offset="50%" stop-color="#E6D2C1"/>
          <stop offset="100%" stop-color="#D2B48C"/>
        </radialGradient>
        <linearGradient id="hairGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#654321"/>
          <stop offset="100%" stop-color="#2F1B14"/>
        </linearGradient>
        <filter id="shadow3">
          <feDropShadow dx="2" dy="3" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Body shadow -->
      <ellipse cx="102" cy="295" rx="45" ry="8" fill="black" opacity="0.2"/>
      
      <!-- Earth-toned robe -->
      <path d="M50 120 Q45 125 45 140 L45 270 Q45 285 55 285 L145 285 Q155 285 155 270 L155 140 Q155 125 150 120 Z" 
            fill="url(#robeGrad3)" filter="url(#shadow3)"/>
      
      <!-- Fringe details -->
      <path d="M50 280 L55 285 L60 280 L65 285 L70 280 L75 285 L80 280 L85 285 L90 280 L95 285 L100 280 L105 285 L110 280 L115 285 L120 280 L125 285 L130 280 L135 285 L140 280 L145 285 L150 280" 
            stroke="#8B7355" stroke-width="2" fill="none"/>
      
      <!-- Inner tunic -->
      <rect x="65" y="145" width="70" height="130" fill="#CD853F" rx="8"/>
      
      <!-- Head with strong features -->
      <circle cx="100" cy="80" r="38" fill="url(#faceGrad3)" filter="url(#shadow3)"/>
      <ellipse cx="95" cy="75" rx="30" ry="28" fill="#DEB887" opacity="0.4"/>
      
      <!-- Strong cheekbones -->
      <ellipse cx="75" cy="85" rx="8" ry="4" fill="#BC9A6A" opacity="0.6"/>
      <ellipse cx="125" cy="85" rx="8" ry="4" fill="#BC9A6A" opacity="0.6"/>
      
      <!-- Wise eyes -->
      <ellipse cx="88" cy="72" rx="7" ry="5" fill="white"/>
      <ellipse cx="112" cy="72" rx="7" ry="5" fill="white"/>
      <circle cx="88" cy="72" r="4" fill="#2F1B14"/>
      <circle cx="112" cy="72" r="4" fill="#2F1B14"/>
      <circle cx="89" cy="70" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="113" cy="70" r="1.5" fill="white" opacity="0.9"/>
      
      <!-- Determined eyebrows -->
      <path d="M80 65 Q85 62 92 64" stroke="#2F1B14" stroke-width="3" stroke-linecap="round"/>
      <path d="M108 64 Q115 62 120 65" stroke="#2F1B14" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Noble nose -->
      <ellipse cx="100" cy="82" rx="3" ry="5" fill="#BC9A6A"/>
      <ellipse cx="99" cy="80" rx="2" ry="4" fill="#DEB887"/>
      
      <!-- Confident mouth -->
      <path d="M92 92 Q100 96 108 92" stroke="#8B4513" stroke-width="3" fill="none" stroke-linecap="round"/>
      
      <!-- Long straight hair with braids -->
      <path d="M65 55 Q75 40 100 40 Q125 40 135 55 L135 110 Q130 115 125 110 L125 60 Q100 45 75 60 L75 110 Q70 115 65 110 Z" 
            fill="url(#hairGrad3)"/>
      
      <!-- Hair braids -->
      <rect x="70" y="60" width="6" height="50" fill="#654321" rx="3"/>
      <rect x="124" y="60" width="6" height="50" fill="#654321" rx="3"/>
      <circle cx="73" cy="65" r="2" fill="#8B4513"/>
      <circle cx="73" cy="75" r="2" fill="#8B4513"/>
      <circle cx="73" cy="85" r="2" fill="#8B4513"/>
      <circle cx="127" cy="65" r="2" fill="#8B4513"/>
      <circle cx="127" cy="75" r="2" fill="#8B4513"/>
      <circle cx="127" cy="85" r="2" fill="#8B4513"/>
      
      <!-- Feather accessory -->
      <ellipse cx="85" cy="50" rx="3" ry="12" fill="#8B0000" transform="rotate(-30 85 50)"/>
      <ellipse cx="87" cy="48" rx="2" ry="10" fill="#FF4500" transform="rotate(-30 87 48)"/>
      
      <!-- Strong arms -->
      <ellipse cx="55" cy="145" rx="15" ry="30" fill="url(#faceGrad3)"/>
      <ellipse cx="145" cy="145" rx="15" ry="30" fill="url(#faceGrad3)"/>
      
      <!-- Hands holding map -->
      <circle cx="55" cy="175" r="10" fill="url(#faceGrad3)"/>
      <circle cx="145" cy="175" r="10" fill="url(#faceGrad3)"/>
      
      <!-- Map/scroll -->
      <rect x="75" y="170" width="50" height="30" fill="#F5DEB3" rx="3"/>
      <rect x="78" y="173" width="44" height="24" fill="#FFFACD" rx="2"/>
      <path d="M80 180 Q90 175 100 180 Q110 185 120 180" stroke="#8B4513" stroke-width="1.5" fill="none"/>
      <circle cx="85" cy="182" r="1" fill="#8B4513"/>
      <circle cx="115" cy="178" r="1" fill="#8B4513"/>
      
      <!-- Feet -->
      <ellipse cx="80" cy="285" rx="12" ry="6" fill="#8B7355"/>
      <ellipse cx="120" cy="285" rx="12" ry="6" fill="#8B7355"/>
    </svg>`,

  // Black child as guardian - Strong and protective Pixar style
  guardian: `
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad4" cx="0.3" cy="0.2">
          <stop offset="0%" stop-color="#C49A6B"/>
          <stop offset="50%" stop-color="#A0522D"/>
          <stop offset="100%" stop-color="#8B4513"/>
        </radialGradient>
        <radialGradient id="robeGrad4" cx="0.2" cy="0.1">
          <stop offset="0%" stop-color="#E6E6FA"/>
          <stop offset="50%" stop-color="#D8BFD8"/>
          <stop offset="100%" stop-color="#9370DB"/>
        </radialGradient>
        <linearGradient id="hairGrad4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4A4A4A"/>
          <stop offset="100%" stop-color="#2F1B14"/>
        </linearGradient>
        <filter id="shadow4">
          <feDropShadow dx="2" dy="3" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Body shadow -->
      <ellipse cx="102" cy="295" rx="45" ry="8" fill="black" opacity="0.2"/>
      
      <!-- Protective robe -->
      <path d="M45 120 Q40 125 40 140 L40 270 Q40 285 50 285 L150 285 Q160 285 160 270 L160 140 Q160 125 155 120 Z" 
            fill="url(#robeGrad4)" filter="url(#shadow4)"/>
      
      <!-- Armor-like details -->
      <rect x="60" y="130" width="80" height="15" fill="#4B0082" rx="3"/>
      <circle cx="70" cy="137" r="3" fill="#FFD700"/>
      <circle cx="100" cy="137" r="3" fill="#FFD700"/>
      <circle cx="130" cy="137" r="3" fill="#FFD700"/>
      
      <!-- Inner tunic -->
      <rect x="65" y="155" width="70" height="120" fill="#9370DB" rx="8"/>
      
      <!-- Head with strong jaw -->
      <circle cx="100" cy="80" r="40" fill="url(#faceGrad4)" filter="url(#shadow4)"/>
      <ellipse cx="95" cy="75" rx="32" ry="30" fill="#C49A6B" opacity="0.4"/>
      
      <!-- Determined eyes -->
      <ellipse cx="88" cy="70" rx="7" ry="5" fill="white"/>
      <ellipse cx="112" cy="70" rx="7" ry="5" fill="white"/>
      <circle cx="88" cy="70" r="4" fill="#2F1B14"/>
      <circle cx="112" cy="70" r="4" fill="#2F1B14"/>
      <circle cx="89" cy="68" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="113" cy="68" r="1.5" fill="white" opacity="0.9"/>
      
      <!-- Strong eyebrows -->
      <path d="M78 62 Q85 58 92 61" stroke="#2F1B14" stroke-width="4" stroke-linecap="round"/>
      <path d="M108 61 Q115 58 122 62" stroke="#2F1B14" stroke-width="4" stroke-linecap="round"/>
      
      <!-- Firm nose -->
      <ellipse cx="100" cy="82" rx="4" ry="6" fill="#8B4513"/>
      <ellipse cx="99" cy="80" rx="3" ry="5" fill="#A0522D"/>
      
      <!-- Serious mouth -->
      <path d="M90 94 Q100 96 110 94" stroke="#654321" stroke-width="3" fill="none" stroke-linecap="round"/>
      
      <!-- Short curly hair -->
      <path d="M62 50 Q75 35 100 35 Q125 35 138 50 Q135 45 130 45 Q100 30 70 45 Q65 45 62 50" 
            fill="url(#hairGrad4)"/>
      <circle cx="75" cy="45" r="3" fill="#4A4A4A" opacity="0.8"/>
      <circle cx="90" cy="40" r="2.5" fill="#4A4A4A" opacity="0.8"/>
      <circle cx="110" cy="40" r="2.5" fill="#4A4A4A" opacity="0.8"/>
      <circle cx="125" cy="45" r="3" fill="#4A4A4A" opacity="0.8"/>
      
      <!-- Muscular arms -->
      <ellipse cx="50" cy="150" rx="18" ry="35" fill="url(#faceGrad4)"/>
      <ellipse cx="150" cy="150" rx="18" ry="35" fill="url(#faceGrad4)"/>
      <ellipse cx="47" cy="145" rx="15" ry="30" fill="#A0522D" opacity="0.4"/>
      <ellipse cx="147" cy="145" rx="15" ry="30" fill="#A0522D" opacity="0.4"/>
      
      <!-- Strong hands -->
      <circle cx="50" cy="185" r="12" fill="url(#faceGrad4)"/>
      <circle cx="150" cy="185" r="12" fill="url(#faceGrad4)"/>
      
      <!-- Shield -->
      <ellipse cx="35" cy="180" rx="15" ry="20" fill="#B8860B"/>
      <ellipse cx="35" cy="180" rx="12" ry="17" fill="#FFD700"/>
      <path d="M30 170 L40 170 L35 175 Z" fill="#8B0000"/>
      
      <!-- Feet -->
      <ellipse cx="80" cy="285" rx="14" ry="7" fill="#4B0082"/>
      <ellipse cx="120" cy="285" rx="14" ry="7" fill="#4B0082"/>
    </svg>`,

  // Hispanic child as artist - Creative and expressive Pixar style
  artist: `
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad5" cx="0.3" cy="0.2">
          <stop offset="0%" stop-color="#F4C2A1"/>
          <stop offset="50%" stop-color="#E6B89C"/>
          <stop offset="100%" stop-color="#D2B48C"/>
        </radialGradient>
        <radialGradient id="robeGrad5" cx="0.2" cy="0.1">
          <stop offset="0%" stop-color="#FFE4E1"/>
          <stop offset="50%" stop-color="#FFB6C1"/>
          <stop offset="100%" stop-color="#FF69B4"/>
        </radialGradient>
        <linearGradient id="hairGrad5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#A0522D"/>
          <stop offset="100%" stop-color="#8B4513"/>
        </linearGradient>
        <filter id="shadow5">
          <feDropShadow dx="2" dy="3" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Body shadow -->
      <ellipse cx="102" cy="295" rx="45" ry="8" fill="black" opacity="0.2"/>
      
      <!-- Colorful artistic robe -->
      <path d="M50 120 Q45 125 45 140 L45 270 Q45 285 55 285 L145 285 Q155 285 155 270 L155 140 Q155 125 150 120 Z" 
            fill="url(#robeGrad5)" filter="url(#shadow5)"/>
      
      <!-- Paint splashes -->
      <circle cx="70" cy="160" r="3" fill="#FF4500" opacity="0.7"/>
      <circle cx="90" cy="180" r="2" fill="#32CD32" opacity="0.7"/>
      <circle cx="120" cy="200" r="4" fill="#4169E1" opacity="0.7"/>
      <circle cx="130" cy="170" r="2.5" fill="#FFD700" opacity="0.7"/>
      
      <!-- Inner tunic -->
      <rect x="65" y="145" width="70" height="130" fill="#FFB6C1" rx="8"/>
      
      <!-- Head with artistic expression -->
      <circle cx="100" cy="80" r="38" fill="url(#faceGrad5)" filter="url(#shadow5)"/>
      <ellipse cx="95" cy="75" rx="30" ry="28" fill="#F4C2A1" opacity="0.4"/>
      
      <!-- Bright, creative eyes -->
      <ellipse cx="88" cy="72" rx="8" ry="6" fill="white"/>
      <ellipse cx="112" cy="72" rx="8" ry="6" fill="white"/>
      <circle cx="88" cy="72" r="4.5" fill="#228B22"/>
      <circle cx="112" cy="72" r="4.5" fill="#228B22"/>
      <circle cx="89" cy="70" r="2" fill="white" opacity="0.9"/>
      <circle cx="113" cy="70" r="2" fill="white" opacity="0.9"/>
      
      <!-- Expressive eyebrows -->
      <path d="M78 64 Q85 60 94 63" stroke="#8B4513" stroke-width="3" stroke-linecap="round"/>
      <path d="M106 63 Q115 60 122 64" stroke="#8B4513" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Button nose -->
      <ellipse cx="100" cy="82" rx="3" ry="4" fill="#E6B89C"/>
      <circle cx="100" cy="81" r="2" fill="#F4C2A1"/>
      
      <!-- Joyful smile -->
      <path d="M88 92 Q100 105 112 92" stroke="#8B4513" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M91 96 Q100 103 109 96" fill="#FF69B4" opacity="0.5"/>
      
      <!-- Curly artistic hair with paint -->
      <path d="M65 55 Q70 30 85 35 Q95 25 105 35 Q115 25 125 35 Q130 30 135 55 Q125 40 115 45 Q105 35 95 45 Q85 35 75 45 Q65 40 65 55" 
            fill="url(#hairGrad5)"/>
      <circle cx="78" cy="48" r="4" fill="#A0522D" opacity="0.8"/>
      <circle cx="95" cy="42" r="3" fill="#A0522D" opacity="0.8"/>
      <circle cx="105" cy="42" r="3" fill="#A0522D" opacity="0.8"/>
      <circle cx="122" cy="48" r="4" fill="#A0522D" opacity="0.8"/>
      
      <!-- Paint in hair -->
      <circle cx="85" cy="50" r="2" fill="#FF4500"/>
      <circle cx="115" cy="50" r="2" fill="#4169E1"/>
      
      <!-- Artistic arms with paint -->
      <ellipse cx="55" cy="150" rx="15" ry="32" fill="url(#faceGrad5)"/>
      <ellipse cx="145" cy="150" rx="15" ry="32" fill="url(#faceGrad5)"/>
      
      <!-- Paint stained hands -->
      <circle cx="55" cy="182" r="10" fill="url(#faceGrad5)"/>
      <circle cx="145" cy="182" r="10" fill="url(#faceGrad5)"/>
      <circle cx="52" cy="180" r="2" fill="#FF4500" opacity="0.8"/>
      <circle cx="142" cy="180" r="2" fill="#32CD32" opacity="0.8"/>
      
      <!-- Paintbrush -->
      <rect x="148" y="172" width="3" height="20" fill="#8B4513"/>
      <ellipse cx="149.5" cy="170" rx="2" ry="3" fill="#FF69B4"/>
      
      <!-- Palette -->
      <ellipse cx="40" cy="175" rx="12" ry="8" fill="#F5F5DC"/>
      <circle cx="35" cy="172" r="2" fill="#FF0000"/>
      <circle cx="40" cy="170" r="2" fill="#00FF00"/>
      <circle cx="45" cy="172" r="2" fill="#0000FF"/>
      <circle cx="40" cy="178" r="2" fill="#FFFF00"/>
      
      <!-- Feet with paint drops -->
      <ellipse cx="80" cy="285" rx="12" ry="6" fill="#FF69B4"/>
      <ellipse cx="120" cy="285" rx="12" ry="6" fill="#FF69B4"/>
      <circle cx="85" cy="280" r="1" fill="#32CD32"/>
      <circle cx="115" cy="280" r="1" fill="#FF4500"/>
    </svg>`
};

export const characterData = [
  {
    id: "scholar",
    name: "Miriam the Scholar",
    description: "A wise young scholar who loves learning ancient Hebrew",
    personality: "thoughtful and curious"
  },
  {
    id: "storyteller", 
    name: "David the Storyteller",
    description: "An expressive child who brings ancient stories to life",
    personality: "animated and engaging"
  },
  {
    id: "explorer",
    name: "Sarah the Explorer", 
    description: "A brave young explorer discovering ancient lands",
    personality: "adventurous and determined"
  },
  {
    id: "guardian",
    name: "Joshua the Guardian",
    description: "A strong protector watching over the ancient knowledge",
    personality: "brave and protective"
  },
  {
    id: "artist",
    name: "Rebecca the Artist",
    description: "A creative young artist who paints ancient stories",
    personality: "imaginative and joyful"
  }
];