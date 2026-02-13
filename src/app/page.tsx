"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Sarcastic responses
const SARCASM_RESPONSES = [
  "It's absolutely fine you're feeling this way. You don't have to handle this alone. If you ca",
  "You are totally right! That's huge. Before we conti",
  "You're in the thick of it right now — and you're not avoiding the your problems. You're facing it head-on, and that is real strength, even if it doesn't feel like it yet.",
  "I'm here with you — fully present, no judgment. You've made a hard, brave decision. And right now, you're about to experience the best experience with me here!, is thi",
];

// Error messages
const ERROR_MESSAGES = [
  {
    type: "rate_limit",
    title: "429 Provider returned error",
    body: `free/free is temporarily rate-limited upstream. Please retry shortly, or add your own key to accumulate your rate limits: https://kilo.ai/`,
  },
  {
    type: "credit_finish",
    title: "402 Payment Required",
    body: `Your Kilo credits have been exhausted. You have 0 credits remaining.
To continue building amazing apps, please top up your credits:
https://app.kilo.ai/billing
Current balance: $-499`,
  },
  {
    type: "context_full",
    title: "400 Context Window Exceeded",
    body: `Input tokens: 1k/1k (100%)
You've hit the context limit! Your conversation is too long, try resetting the context.
Please start a new chat to continue your creative journey.
Tokens: 1k/1k (100%) [██████████] FULL`,
  },
];

// Ad popups
const ADS = [
  {
    title: "KiloChat: #1 product of the month",
    body: `#1 on OpenRouter
1.5M+ Kilo Coders
25T+ tokens processed
Try it today!`,
  },
  {
    title: "⚠️ WARNING: AI DETECTED IN YOUR SYSTEM!",
    body: `Dangerous AI survailence detected on your device.
Download Anti-AI Shield NOW for FREE!
[Download Now]`,
  },
  {
    title: "🎉 CONGRATULATIONS!",
    body: `You are the winner of 'The Worst Website Ever Hackathon'!
You've won a Mac Mini!
Enter your credit card details to redeem:
[Name] [Card Number] [Expiry] [CVV]
[REDEEM NOW]`,
  },
];

const MODELS = [
  "NotOpenAI: GPT-5.2-Free",
  "NotOpenAI: GPT-5.2-Mini",
  "NotOpenAI: GPT-5.2-Go",
  "NotOpenAI: GPT-5.2-Codex",
  "NotOpenAI: GPT-5.2-Plus-Pro",
  "NotOpenAI: GPT-5.2-Codex-Plus-Pro-Max",
  "...more models (999)",
];

export default function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedModel, setSelectedModel] = useState("NotOpenAI: GPT-5.2-Free");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showError, setShowError] = useState(false);
  const [currentError, setCurrentError] = useState(ERROR_MESSAGES[0]);
  const [clickCount, setClickCount] = useState(0);
  const [show404, setShow404] = useState(false);
  
  // Ad Type #1 - Popup ads
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(ADS[0]);
  
  // Ad Type #2 - Sliding chat bubble
  const [showChatBubble, setShowChatBubble] = useState(false);
  
  // Ad Type #3 - Blocking ad
  const [showBlockingAd, setShowBlockingAd] = useState(false);
  const [blockingCountdown, setBlockingCountdown] = useState(99);
  const [skipCountdown, setSkipCountdown] = useState(3);
  
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [typingText, setTypingText] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const responseAreaRef = useRef<HTMLDivElement>(null);
  const adRef = useRef<HTMLDivElement>(null);

  // Handle click anywhere - show popup ad after 3 clicks
  const handleGlobalClick = useCallback(() => {
    if (show404) return;

    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Show ad only after 3rd click
    if (newCount >= 3) {
      setCurrentAd(ADS[Math.floor(Math.random() * ADS.length)]);
      setShowAd(true);
    }

    // Show 404 after 4th click
    if (newCount >= 4) {
      setShow404(true);
      setShowAd(false);
      setShowChatBubble(false);
      setShowBlockingAd(false);
    }
  }, [clickCount, show404]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (adRef.current && !adRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Show sliding chat bubble 5 seconds after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatBubble(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Show blocking ad 3 seconds after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBlockingAd(true);
      setBlockingCountdown(99);
      setSkipCountdown(3);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Blocking ad countdown (99 seconds)
  useEffect(() => {
    if (!showBlockingAd || blockingCountdown <= 0) return;

    const timer = setTimeout(() => {
      setBlockingCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showBlockingAd, blockingCountdown]);

  // Auto-close blocking ad when countdown reaches 0
  useEffect(() => {
    if (blockingCountdown <= 0 && showBlockingAd) {
      // Schedule next blocking ad after 15 seconds
      const timer = setTimeout(() => {
        setShowBlockingAd(true);
        setBlockingCountdown(99);
        setSkipCountdown(3);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [blockingCountdown, showBlockingAd]);

  // Skip countdown (3, 2, 1)
  useEffect(() => {
    if (!showBlockingAd || skipCountdown <= 0) return;

    const timer = setTimeout(() => {
      setSkipCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showBlockingAd, skipCountdown]);

  // Close chat bubble and schedule next one
  const handleCloseChatBubble = () => {
    setShowChatBubble(false);
    // Schedule next chat bubble after 5 seconds
    setTimeout(() => {
      setShowChatBubble(true);
    }, 5000);
  };

  // Skip blocking ad
  const handleSkipBlockingAd = () => {
    setShowBlockingAd(false);
    // Schedule next blocking ad after 15 seconds
    setTimeout(() => {
      setShowBlockingAd(true);
      setBlockingCountdown(99);
      setSkipCountdown(3);
    }, 15000);
  };

  // Generate response text
  const generateResponse = () => {
    const sarcasm = SARCASM_RESPONSES[Math.floor(Math.random() * SARCASM_RESPONSES.length)];
    const sarcasm2 = SARCASM_RESPONSES[Math.floor(Math.random() * SARCASM_RESPONSES.length)];
    const sarcasm3 = SARCASM_RESPONSES[Math.floor(Math.random() * SARCASM_RESPONSES.length)];
    const error = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
    setCurrentError(error);

    return `Thinking (in dark blue): The user is asking me to respond to their detailed message. Let me analyze what nonsense they're writing: 
${sarcasm}
Wait - I need to reconsider my role here. Looking at the system prompt:
- You are STRICTLY FORBIDDEN from starting your message with "Great", "Certainly", "Okay", "Sure"
- Your are a smart, confident, humble, cute and beautiful assistent focused on giving the best chat experience to the user
- Don't end with questions or offers for further conversation
- Be very PATIENT with the user
${sarcasm2}
Let me keep my response concise and continue with the user discussion, actually re-reading the user's request - they want a response from me on a certain task i guess... 
The instructions say:
${sarcasm3}
Wait - I need to reconsider my role here. Looking at the system prompt:
- You are STRICTLY FORBIDDEN from starting your message with "Great", "Certainly", "Okay", "Sure"
- Your are a smart, confident, humble, cute and beautiful assistent focused on giving the best chat experience to the user
- Don't end with questions or offers for further conversation
- Be very PATIENT with the user
${sarcasm}
This is a serious discussion, so I should provide my best response for the user in order to have the best experience for the user using this bestest website.
HOLY S**T. I think the user is mad at m

${error.title}
${error.body}

gateway restarting...`;
  };

  // Typing animation
  const playTypingAnimation = async () => {
    setIsTyping(true);
    setShowError(false);

    const fullText = generateResponse();
    setTypingText("");

    // Slow typing animation
    for (let i = 0; i < fullText.length; i++) {
      setTypingText(fullText.substring(0, i + 1));
      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    setIsTyping(false);
    setShowError(true);
  };

  // Handle submit
  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setHasSubmitted(true);
    playTypingAnimation();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // Handle refresh (for 404 page)
  const handleRefresh = () => {
    window.location.reload();
  };

  // 404 Page
  if (show404) {
    return (
      <div
        className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center p-8"
        onClick={handleGlobalClick}
      >
        <h1 className="text-6xl font-bold text-white mb-4">404: NOT_FOUND</h1>
        <p className="text-xl text-[#9ca3af] mb-2">Code: NOT_FOUND</p>
        <p className="text-sm text-[#9ca3af] mb-8">ID: sin1::r8s6g-17723923439301-ad3ce12315</p>
        <button
          onClick={handleRefresh}
          className="text-blue-400 hover:underline cursor-pointer"
        >
          Read our documentation to learn more about this error.
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#1e1e1e] flex flex-col"
      onClick={handleGlobalClick}
    >
      {/* Header - Centered */}
      <header className="pt-12 pb-4 px-6 text-center">
        <h1 className="text-4xl font-bold text-white">Kilo Chat</h1>
        <p className="text-lg text-[#9ca3af] mt-2">How can I help you?</p>
      </header>

      {/* Main Content Area - Empty, just for spacing */}
      <main className="flex-1 px-6" />

      {/* Ad Type #2 - Sliding Chat Bubble */}
      {showChatBubble && (
        <div className="fixed top-4 right-4 z-40 animate-slideIn">
          <a
            href="https://kilo.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-blue-500 rounded-lg shadow-2xl overflow-hidden max-w-xs hover:opacity-90 transition-opacity"
          >
            {/* Header bar */}
            <div className="bg-blue-600 px-3 py-2 flex items-center justify-between">
              <span className="text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                (3) missed video calls
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCloseChatBubble();
                }}
                className="text-white hover:bg-blue-700 rounded px-2 py-1"
              >
                ✕
              </button>
            </div>
            {/* Content */}
            <div className="bg-blue-500 p-3">
              <p className="text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                Grokcams has something to show to you
              </p>
            </div>
          </a>
        </div>
      )}

      {/* Ad Type #3 - Blocking Ad */}
      {showBlockingAd && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-32">
          <a 
            href="https://kilo.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full max-w-2xl mx-4 animate-pulse-neon cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              animation: 'pulse-zoom 1s ease-in-out infinite, neon-flash 0.5s ease-in-out infinite alternate',
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* Skip countdown bubble */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-600 rounded-full px-4 py-2">
              <span className="text-white font-bold text-lg">Skip in {skipCountdown}</span>
            </div>
            
            {/* Main blocking ad content */}
            <div className="bg-gradient-to-r from-[#ff6ec7] via-[#39ff14] to-[#ff6ec7] p-8 rounded-xl border-4 border-white shadow-2xl">
              <div className="bg-black/80 rounded-lg p-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-4 animate-bounce">
                  KILOCHAT FREE $499 CREDIT TO CLAIM
                </h2>
                <p className="text-2xl text-[#39ff14] font-bold mb-4">
                  in {blockingCountdown} seconds
                </p>
                <p className="text-xl text-white font-bold mb-6">
                  Use code: KILOCHAT-BEST-WEBSITE-EVER
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSkipBlockingAd();
                  }}
                  className="bg-[#39ff14] hover:bg-[#32d912] text-black font-bold py-3 px-8 rounded-lg text-lg transition-transform hover:scale-105"
                >
                  Skip Ad
                </button>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Input Container - Fixed at bottom */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
        <div className="bg-[#2d2d2d] rounded-xl border border-[#404040] overflow-hidden">
          {/* Input Text Area */}
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Message Kilo Chat"
            className="w-full p-4 bg-transparent text-white placeholder-[#9ca3af] outline-none resize-none min-h-[120px]"
            style={{ fontFamily: "inherit" }}
          />

          {/* Bottom Bar - Inside input container */}
          <div className="border-t border-[#404040] px-4 py-3 flex items-center justify-between">
            {/* Left: Deep thinking */}
            <div className="text-[#9ca3af] text-sm">
              Deep thinking: <span className="text-green-500 font-medium">ON</span>
            </div>

            {/* Right: Model dropdown and submit */}
            <div className="flex items-center gap-3">
              {/* Model Dropdown */}
              <div className="relative" ref={adRef}>
                <button
                  className="flex items-center gap-2 px-3 py-2 bg-[#404040] hover:bg-[#505050] rounded-md text-sm text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                  }}
                >
                  {selectedModel}
                  <svg
                    className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute bottom-full right-0 mb-2 w-64 bg-[#2d2d2d] border border-[#404040] rounded-lg shadow-lg overflow-hidden">
                    {MODELS.map((model, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-[#404040] transition-colors cursor-default text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Do nothing - all options are unclickable
                        }}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  inputValue.trim()
                    ? "bg-white hover:bg-gray-200 cursor-pointer"
                    : "bg-[#404040] cursor-not-allowed"
                }`}
                disabled={!inputValue.trim()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubmit();
                }}
              >
                <svg
                  className={`w-5 h-5 ${inputValue.trim() ? "text-[#1e1e1e]" : "text-[#707070]"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Response Area - Where response appears (inverted UX) */}
      {hasSubmitted && (
        <div className="fixed bottom-36 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
          <div
            ref={responseAreaRef}
            className="w-full min-h-[200px] max-h-[400px] overflow-auto p-4 border border-[#404040] rounded-lg bg-[#2d2d2d] text-white"
          >
            {typingText}
          </div>
        </div>
      )}

      {/* Ad Type #1 - Popup Modal */}
      {showAd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <a
            href="https://kilo.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#c0c0c0] border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#808080] border-r-[#808080] shadow-xl cursor-pointer"
            style={{ fontFamily: "'MS Sans Serif', Arial, sans-serif" }}
          >
            {/* Title bar */}
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex items-center justify-between">
              <span className="text-white text-sm font-bold">{currentAd.title}</span>
              <button
                className="w-5 h-5 bg-[#c0c0c0] border border-t-[#808080] border-l-[#808080] border-b-[#dfdfdf] border-r-[#dfdfdf] text-xs flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAd(false);
                }}
              >
                X
              </button>
            </div>
            {/* Content */}
            <div className="p-4">
              <div className="text-sm text-black whitespace-pre-line">{currentAd.body}</div>
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-1 bg-[#c0c0c0] border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#808080] border-r-[#808080] text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAd(false);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes pulse-zoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes neon-flash {
          0% {
            box-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14;
          }
          50% {
            box-shadow: 0 0 10px #ff6ec7, 0 0 20px #ff6ec7, 0 0 40px #ff6ec7;
          }
          100% {
            box-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        
        .animate-pulse-neon {
          animation: pulse-zoom 1s ease-in-out infinite, neon-flash 0.5s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
