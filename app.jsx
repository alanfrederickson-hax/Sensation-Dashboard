import React, { useState, useEffect, useRef } from 'react';


// A massive, glorious list of all requested flags
const rawFlags = "🇦🇫 🇦🇽 🇦🇱 🇩🇿 🇦🇸 🇦🇩 🇦🇴 🇦🇮 🇦🇶 🇦🇬 🇦🇷 🇦🇲 🇦🇼 🇦🇺 🇦🇹 🇦🇿 🇧🇸 🇧🇭 🇧🇩 🇧🇧 🇧🇾 🇧🇪 🇧🇿 🇧🇯 🇧🇲 🇧🇹 🇧🇴 🇧🇦 🇧🇼 🇧🇷 🇮🇴 🇻🇬 🇧🇳 🇧🇬 🇧🇫 🇧🇮 🇰🇭 🇨🇲 🇨🇦 🇮🇨 🇨🇻 🇧🇶 🇰🇾 🇨🇫 🇹🇩 🇨🇱 🇨🇳 🇨🇽 🇨🇨 🇨🇴 🇰🇲 🇨🇬 🇨🇩 🇨🇰 🇨🇷 🇨🇮 🇭🇷 🇨🇺 🇨🇼 🇨🇾 🇨🇿 🇩🇰 🇩🇯 🇩🇲 🇩🇴 🇪🇨 🇪🇬 🇸🇻 🇬🇶 🇪🇷 🇪🇪 🇸🇿 🇪🇹 🇪🇺 🇫🇰 🇫🇴 🇫🇯 🇫🇮 🇫🇷 🇬🇫 🇵🇫 🇹🇫 🇬🇦 🇬🇲 🇬🇪 🇩🇪 🇬🇭 🇬🇮 🇬🇷 🇬🇱 🇬🇩 🇬🇵 🇬🇺 🇬🇹 🇬🇬 🇬🇳 🇬🇼 🇬🇾 🇭🇹 🇭🇳 🇭🇰 🇭🇺 🇮🇸 🇮🇳 🇮🇩 🇮🇷 🇮🇶 🇮🇪 🇮🇲 🇮🇱 🇮🇹 🇯🇲 🇯🇵 🇯🇪 🇯🇴 🇰🇿 🇰🇪 🇰🇮 🇽🇰 🇰🇼 🇰🇬 🇱🇦 🇱🇻 🇱🇧 🇱🇸 🇱🇷 🇱🇾 🇱🇮 🇱🇹 🇱🇺 🇲🇴 🇲🇬 🇲🇼 🇲🇾 🇲🇻 🇲🇱 🇲🇹 🇲🇭 🇲🇶 🇲🇷 🇲🇺 🇾🇹 🇲🇽 🇫🇲 🇲🇩 🇲🇨 🇲🇳 🇲🇪 🇲🇸 🇲🇦 🇲🇿 🇲🇲 🇳🇦 🇳🇷 🇳🇵 🇳🇱 🇳🇨 🇳🇿 🇳🇮 🇳🇪 🇳🇬 🇳🇺 🇳🇫 🇰🇵 🇲🇰 🇲🇵 🇳🇴 🇴🇲 🇵🇰 🇵🇼 🇵🇸 🇵🇦 🇵🇬 🇵🇾 🇵🇪 🇵🇭 🇵🇳 🇵🇱 🇵🇹 🇵🇷 🇶🇦 🇷🇪 🇷🇴 🇷🇺 🇷🇼 🇼🇸 🇸🇲 🇸🇹 🇸🇦 🇸🇳 🇷🇸 🇸🇨 🇸🇱 🇸🇬 🇸🇽 🇸🇰 🇸🇮 🇬🇸 🇸🇧 🇸🇴 🇿🇦 🇰🇷 🇸🇸 🇪🇸 🇱🇰 🇧🇱 🇸🇭 🇰🇳 🇱🇨 🇵🇲 🇻🇨 🇸🇩 🇸🇷 🇸🇪 🇨🇭 🇸🇾 🇹🇼 🇹🇯 🇹🇿 🇹🇭 🇹🇱 🇹🇬 🇹🇰 🇹🇴 🇹🇹 🇹🇳 🇹🇷 🇹🇲 🇹🇨 🇹🇻 🇻🇮 🇺🇬 🇺🇦 🇦🇪 🇬🇧 🏴󠁧󠁢󠁥󠁮󠁧󠁿 🏴󠁧󠁢󠁳󠁣󠁴󠁿 🏴󠁧󠁢󠁷󠁬󠁳󠁿 🇺🇸 🇺🇾 🇺🇿 🇻🇺 🇻🇦 🇻🇪 🇻🇳 🇼🇫 🇪🇭 🇾🇪 🇿🇲 🇿🇼 🇺🇳";


const getCountryName = (emoji) => {
 const special = {
   '🏴󠁧󠁢󠁥󠁮󠁧󠁿': 'England', '🏴󠁧󠁢󠁳󠁣󠁴󠁿': 'Scotland', '🏴󠁧󠁢󠁷󠁬󠁳󠁿': 'Wales',
   '🇺🇳': 'United Nations', '🇪🇺': 'European Union', '🇽🇰': 'Kosovo'
 };
 if (special[emoji]) return special[emoji];


 try {
   const chars = [...emoji];
   if (chars.length === 2) {
     // Magically extract the underlying region code from the flag emojis
     const code = String.fromCharCode(chars[0].codePointAt(0) - 127397) +
                  String.fromCharCode(chars[1].codePointAt(0) - 127397);
     const name = new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
     return name || 'Unknown Region';
   }
 } catch (e) {
   return 'Unknown Region';
 }
 return 'Unknown Region';
};


const FLAGS = rawFlags.split(' ').filter(Boolean).map(emoji => ({
 name: getCountryName(emoji),
 emoji: emoji
}));


// --- DIVINE OPTIMIZATION: OFFSCREEN EMOJI CACHE ---
// This stores a pre-rendered image of each emoji so we don't have to render text 15,000 times a second!
const emojiSpriteCache = {};


const getEmojiSprite = (emoji) => {
 if (emojiSpriteCache[emoji]) return emojiSpriteCache[emoji];
  const offscreenCanvas = document.createElement('canvas');
 offscreenCanvas.width = 36; // Big enough to hold the emoji
 offscreenCanvas.height = 36;
 const ctx = offscreenCanvas.getContext('2d');
  ctx.font = '24px Arial';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'middle';
 ctx.fillText(emoji, 18, 18); // Draw it exactly in the center
  emojiSpriteCache[emoji] = offscreenCanvas;
 return offscreenCanvas;
};


export default function App() {
 const [currentView, setCurrentView] = useState('start'); // 'start', 'dashboard', 'game_flag'


 return (
   <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4 font-sans selection:bg-blue-300">
     {/* Fixed Mobile Phone Frame */}
     <div className="relative w-[390px] h-[844px] bg-blue-200 rounded-[3rem] border-[14px] border-white shadow-2xl overflow-hidden flex flex-col shrink-0 ring-4 ring-gray-200/50">
      
       {/* Dynamic Light Blue Scratchy Background (Always present) */}
       <div
         className="absolute inset-0 opacity-40 mix-blend-color-burn pointer-events-none z-0"
         style={{
           backgroundImage: `
             repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.5) 8px, rgba(255,255,255,0.5) 9px),
             repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(0,0,0,0.03) 12px, rgba(0,0,0,0.03) 13px),
             url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")
           `
         }}
       />


       {/* View Routing */}
       {currentView === 'start' && <StartScreen onStart={() => setCurrentView('dashboard')} />}
       {currentView === 'dashboard' && (
         <Dashboard
           onSelectGame={() => setCurrentView('game_flag')}
           onBack={() => setCurrentView('start')}
         />
       )}
       {currentView === 'game_flag' && <GameFlagCircle onBack={() => setCurrentView('dashboard')} />}


     </div>
   </div>
 );
}


// --- VIEW 1: START SCREEN ---
function StartScreen({ onStart }) {
 return (
   <div className="relative z-10 text-center px-6 flex flex-col items-center h-full w-full py-16">
     <div className="flex-1 flex flex-col items-center justify-center w-full">
       {/* Decorative Top Icon */}
       <div className="w-24 h-24 mb-8 rounded-3xl bg-white/40 backdrop-blur-md shadow-[0_8px_32px_0_rgba(37,99,235,0.15)] border border-white/60 flex items-center justify-center animate-[bounce_4s_ease-in-out_infinite]">
          <svg className="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="6" strokeWidth={2} fill="rgba(255,255,255,0.7)"/>
            <rect x="10" y="10" width="10" height="10" rx="3" strokeWidth={2} fill="rgba(37,99,235,0.4)"/>
          </svg>
       </div>
       <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight leading-tight mb-2 drop-shadow-sm">
         The Sensation
         <span className="block text-blue-600 mt-2 text-5xl">Dashboard</span>
       </h1>
       <p className="text-blue-800 font-bold tracking-wider text-sm mt-5 uppercase bg-white/50 px-5 py-2 rounded-full inline-block backdrop-blur-sm shadow-sm">
         Zen Shape Harmony
       </p>
     </div>
     <button
       onClick={onStart}
       className="w-full max-w-[280px] py-4 bg-blue-500 text-white font-bold text-xl rounded-2xl shadow-[0_8px_16px_rgba(37,99,235,0.3)] hover:bg-blue-400 hover:shadow-[0_12px_24px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all active:scale-95 active:translate-y-0 flex items-center justify-center gap-3 group border-2 border-blue-300 mt-auto mb-4"
     >
       <span className="relative flex h-3 w-3">
         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
         <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
       </span>
       Enter Harmony
     </button>
   </div>
 );
}


// --- VIEW 2: DASHBOARD ---
function Dashboard({ onSelectGame, onBack }) {
 // Generate a grid of squares, only the first one is active
 const squares = Array.from({ length: 24 }).map((_, i) => i);

 return (
   <div className="relative z-10 flex flex-col h-full w-full py-12 px-6">
     <div className="flex items-center justify-between mb-8">
       <button onClick={onBack} className="p-3 bg-white/40 rounded-xl hover:bg-white/60 transition-colors shadow-sm backdrop-blur-sm">
         <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
       </button>
       <h2 className="text-2xl font-bold text-blue-900 drop-shadow-sm">Modules</h2>
       <div className="w-12"></div> {/* Balancer */}
     </div>

     <div className="grid grid-cols-3 gap-4 overflow-y-auto pb-10 scrollbar-hide">
       {squares.map((index) => (
         <button
           key={index}
           onClick={() => {
             if (index === 0) onSelectGame();
             if (index === 1) window.location.href = 'CircleSlash.HTML';
           }}
           className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all shadow-md backdrop-blur-sm border-2
             ${index === 0 || index === 1
               ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 hover:scale-105 active:scale-95'
               : 'bg-neutral-800/80 border-neutral-700/50 cursor-not-allowed opacity-70'
             }`}
         >
           {index === 0 ? (
             <>
               <span className="text-3xl mb-1">🌍</span>
               <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center leading-tight">Flag<br/>Circle</span>
             </>
           ) : index === 1 ? (
             <>
               <span className="text-3xl mb-1">⚔️</span>
               <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center leading-tight">Circle<br/>Slash</span>
             </>
           ) : (
             <div className="w-4 h-4 rounded-full bg-neutral-700/50"></div>
           )}
         </button>
       ))}
     </div>
   </div>
 );
}

// --- VIEW 3: FLAG OF THE CIRCLE GAME ---
function GameFlagCircle({ onBack }) {
 const canvasRef = useRef(null);
 const contentRef = useRef(null); // The new Overflow Sensor
 const [eliminatedFlags, setEliminatedFlags] = useState([]);
 const [remainingCount, setRemainingCount] = useState(FLAGS.length);
 const [winner, setWinner] = useState(null);
 const [dockScale, setDockScale] = useState({ fontSize: 32, gap: 8 });


 // Reset dock scale when game restarts
 useEffect(() => {
   if (eliminatedFlags.length === 0) {
     setDockScale({ fontSize: 32, gap: 8 });
   }
 }, [eliminatedFlags.length]);


 // Dynamically shrink the flags ONLY when they run out of space!
 useEffect(() => {
   if (contentRef.current) {
     const { scrollHeight, clientHeight } = contentRef.current;
     // If the content is taller than the visible container, squeeze them down!
     if (scrollHeight > clientHeight && dockScale.fontSize > 10) {
       setDockScale(prev => ({
         fontSize: prev.fontSize - 2,
         gap: Math.max(1, prev.gap - 1)
       }));
     }
   }
 }, [eliminatedFlags.length, dockScale]);


 // Esc key listener to exit
 useEffect(() => {
   const handleKeyDown = (e) => {
     if (e.key === 'Escape') onBack();
   };
   window.addEventListener('keydown', handleKeyDown);
   return () => window.removeEventListener('keydown', handleKeyDown);
 }, [onBack]);


 // Game Engine State (Mutable, no re-renders on every frame)
 const engine = useRef({
   flags: [],
   rotation: 0,
   circleX: 181, // Perfectly centered (362 inner width / 2)
   circleY: 260, // Upper center of screen
   circleRadius: 165, // BIGGER CIRCLE (was 130)
   gapAngle: Math.PI / 3, // 60 degree gap
   animationId: null,
   winnerTimerId: null,
   hasWon: false // New state to prevent loop glitching
 });


 // Initialize Game
 const initGame = () => {
   setEliminatedFlags([]);
   setRemainingCount(FLAGS.length);
   setWinner(null);
   engine.current.hasWon = false;
   if (engine.current.winnerTimerId) clearTimeout(engine.current.winnerTimerId);


   engine.current.rotation = 0;
  
   // Pick ONE single direction for ALL flags to travel at the start of the round
   const sharedStartingAngle = Math.random() * Math.PI * 2;


   engine.current.flags = FLAGS.map(flag => {
     const speed = 0.8; // Lowered speed for maximum zen
     return {
       ...flag,
       sprite: getEmojiSprite(flag.emoji), // Pre-load the high-speed image sprite!
       x: engine.current.circleX + (Math.random() * 200 - 100), // Spread out much further (200px area)
       y: engine.current.circleY + (Math.random() * 200 - 100), // Now they fill up the circle nicely!
       vx: Math.cos(sharedStartingAngle) * speed,
       vy: Math.sin(sharedStartingAngle) * speed,
       radius: 12,
       escaped: false
     };
   });
 };


 useEffect(() => {
   initGame();
   const canvas = canvasRef.current;
   const ctx = canvas.getContext('2d');


   const updatePhysics = () => {
     if (engine.current.flags.filter(f => !f.escaped).length <= 1) return; // Stop physics if won


     engine.current.rotation += 0.006; // Much slower, relaxing circle rotation


     engine.current.flags.forEach(flag => {
       if (flag.escaped) return;


       // Zero gravity! Just smooth, constant velocity
       flag.x += flag.vx;
       flag.y += flag.vy;


       // Force speed to remain perfectly constant (fixes slowdown over time)
       const currentSpeed = Math.hypot(flag.vx, flag.vy);
       if (currentSpeed > 0 && Math.abs(currentSpeed - 0.8) > 0.01) {
         flag.vx = (flag.vx / currentSpeed) * 0.8;
         flag.vy = (flag.vy / currentSpeed) * 0.8;
       }


       // Collision with Circle boundary
       const dx = flag.x - engine.current.circleX;
       const dy = flag.y - engine.current.circleY;
       const distance = Math.sqrt(dx * dx + dy * dy);


       if (distance + flag.radius >= engine.current.circleRadius) {
         // Calculate angle of flag relative to center
         let angle = Math.atan2(dy, dx);
        
         // Normalize local angle against current rotation
         let localAngle = (angle - engine.current.rotation) % (Math.PI * 2);
         if (localAngle < 0) localAngle += Math.PI * 2;


         // Check if inside the gap
         if (localAngle > 0 && localAngle < engine.current.gapAngle) {
           // Escaping! Allow it to fly out. Once far enough, mark as fully escaped.
           if (distance > engine.current.circleRadius + 40) {
             flag.escaped = true;
            
             // Update React state (throttled naturally by escapes)
             setEliminatedFlags(prev => [...prev, flag]);
             setRemainingCount(prev => prev - 1);
           }
         } else {
           // Bounce off the wall
           const normalX = -dx / distance;
           const normalY = -dy / distance;
           const dotProduct = flag.vx * normalX + flag.vy * normalY;


           // Only bounce if moving towards the wall
           if (dotProduct < 0) {
             const bounciness = 1.0; // Perfect elastic bounce
             let newVx = flag.vx - (1 + bounciness) * dotProduct * normalX;
             let newVy = flag.vy - (1 + bounciness) * dotProduct * normalY;
            
             // Add a tiny random spin to the bounce so they don't get stuck in a straight line
             const spin = (Math.random() - 0.5) * 0.3; // Random angle offset
             const cosSpin = Math.cos(spin);
             const sinSpin = Math.sin(spin);
            
             flag.vx = newVx * cosSpin - newVy * sinSpin;
             flag.vy = newVx * sinSpin + newVy * cosSpin;
           }
          
           // Keep perfectly inside to prevent glitching through
           flag.x = engine.current.circleX + (engine.current.circleRadius - flag.radius) * (dx / distance);
           flag.y = engine.current.circleY + (engine.current.circleRadius - flag.radius) * (dy / distance);
         }
       }
     });
   };


   const draw = () => {
     ctx.clearRect(0, 0, canvas.width, canvas.height);


     // Draw Rotating Circle
     ctx.beginPath();
     ctx.arc(
       engine.current.circleX,
       engine.current.circleY,
       engine.current.circleRadius,
       engine.current.rotation + engine.current.gapAngle,
       engine.current.rotation + Math.PI * 2
     );
     ctx.lineWidth = 10;
     ctx.strokeStyle = '#1e3a8a'; // Deep blue ring
     ctx.lineCap = 'round';
     ctx.stroke();


     // Draw active flags using ULTRA-FAST Image Stamping instead of text rendering!
     engine.current.flags.forEach(flag => {
       if (!flag.escaped) {
         // -18 perfectly centers the 36x36 sprite on the flag's x/y coordinates
         ctx.drawImage(flag.sprite, flag.x - 18, flag.y - 18);
       }
     });
   };


   const loop = () => {
     updatePhysics();
     draw();
    
     // Check Win Condition safely
     const activeFlags = engine.current.flags.filter(f => !f.escaped);
     if (activeFlags.length === 1 && !engine.current.hasWon) {
       engine.current.hasWon = true; // Lock the win state
       setWinner(activeFlags[0]);
     }
    
     // Keep the animation loop running forever so it easily picks up the restart
     engine.current.animationId = requestAnimationFrame(loop);
   };


   engine.current.animationId = requestAnimationFrame(loop);


   return () => {
     cancelAnimationFrame(engine.current.animationId);
     if (engine.current.winnerTimerId) clearTimeout(engine.current.winnerTimerId);
   };
 }, []);


 // Handle Win State Timer
 useEffect(() => {
   if (winner) {
     engine.current.winnerTimerId = setTimeout(() => {
       initGame(); // Restart the variables, and the running loop will automatically draw the new flags
     }, 10000);
   }
   return () => {
      if (engine.current.winnerTimerId) clearTimeout(engine.current.winnerTimerId);
   }
 }, [winner]);




 return (
   <div className="relative z-10 flex flex-col h-full w-full">
     {/* Top Bar */}
     <div className="absolute top-12 left-0 w-full px-6 flex items-center justify-between z-20">
       <button onClick={onBack} className="p-3 bg-white/50 rounded-xl hover:bg-white/80 transition-colors shadow-sm backdrop-blur-md">
         <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
       </button>
       <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl font-bold text-blue-900 shadow-sm border border-white/50">
         Remaining: {remainingCount}
       </div>
     </div>


     {/* Physics Canvas */}
     <canvas
       ref={canvasRef}
       width={362}
       height={500}
       className="w-[362px] h-[500px] block mt-12"
     />


     {/* Eliminated Flags Dock */}
     <div className="flex-1 bg-white/40 backdrop-blur-md border-t-2 border-white/60 mt-auto rounded-t-3xl p-4 overflow-hidden flex flex-col">
       <h3 className="text-center text-xs font-bold text-blue-800 uppercase tracking-widest mb-3 opacity-70 shrink-0">
         Eliminated
       </h3>
       <div
         ref={contentRef}
         className="flex-1 flex flex-wrap justify-center content-start overflow-hidden"
         style={{
           gap: `${dockScale.gap}px`,
           fontSize: `${dockScale.fontSize}px`
         }}
       >
         {eliminatedFlags.map((flag, idx) => (
           <div
             key={idx}
             className="animate-[popIn_0.3s_ease-out] leading-none flex items-center justify-center"
             title={flag.name}
           >
             {flag.emoji}
           </div>
         ))}
       </div>
     </div>


     {/* Win Overlay */}
     {winner && (
       <div className="absolute inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm animate-[fadeIn_0.5s_ease-out]">
         <div className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-2xl border-4 border-yellow-400 transform animate-[bounceIn_0.5s_ease-out] w-3/4 text-center">
           <h2 className="text-yellow-500 font-extrabold text-2xl uppercase tracking-widest mb-2 drop-shadow-sm">Winner!</h2>
           <div className="text-7xl mb-4 drop-shadow-xl">{winner.emoji}</div>
           <p className="text-xl font-bold text-blue-900 mb-6">{winner.name}</p>
           <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full animate-[shrink_10s_linear]"></div>
           </div>
           <p className="text-xs text-gray-400 mt-3 font-medium uppercase">Restarting soon...</p>
         </div>
       </div>
     )}


     <style dangerouslySetInnerHTML={{__html: `
       @keyframes popIn {
         0% { transform: scale(0); opacity: 0; }
         80% { transform: scale(1.2); }
         100% { transform: scale(1); opacity: 1; }
       }
       @keyframes bounceIn {
         0% { transform: scale(0.8) translateY(20px); opacity: 0; }
         60% { transform: scale(1.05) translateY(-5px); opacity: 1; }
         100% { transform: scale(1) translateY(0); opacity: 1; }
       }
       @keyframes fadeIn {
         from { opacity: 0; }
         to { opacity: 1; }
       }
       @keyframes shrink {
         from { width: 100%; }
         to { width: 0%; }
       }
     `}} />
   </div>
 );
}
