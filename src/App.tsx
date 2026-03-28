import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, CheckCircle, ChevronRight, User, Bot, Loader2, Maximize2, RefreshCw, Smartphone, Monitor, Layout, Plus, History, Share2, Mail, Check, X, ExternalLink } from 'lucide-react';
import { getChatResponse, generatePrototype } from './services/geminiService';
import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, getDocs, query, orderBy, limit, getDoc } from 'firebase/firestore';
import ErrorBoundary from './components/ErrorBoundary';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  updatedAt: any;
}

interface GenerationStep {
  id: string;
  label: string;
  status: 'waiting' | 'loading' | 'completed';
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      text: "Welcome to Silk Road Professionals. I'm your AI advisor. **What software idea are we exploring today?**",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [mockupHtml, setMockupHtml] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([
    { id: 'brainstorm', label: 'Planning Your Idea', status: 'waiting' },
    { id: 'colors', label: 'Selecting Colors', status: 'waiting' },
    { id: 'layout', label: 'Designing Layout', status: 'waiting' },
    { id: 'code', label: 'Creating Visual Design', status: 'waiting' },
  ]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [pendingGeneration, setPendingGeneration] = useState<{botResponse: string, userMessage: Message, botMessage: Message} | null>(null);
  const [waitingForEmail, setWaitingForEmail] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEmailSubmit = async (email: string) => {
    if (email.trim() && email.includes('@')) {
      const trimmedEmail = email.trim();
      setUserEmail(trimmedEmail);
      setWaitingForEmail(false);
      
      console.log('✅ Email captured:', trimmedEmail);
      
      // If there's a pending generation, proceed with it
      if (pendingGeneration) {
        console.log('🚀 Starting generation with email:', trimmedEmail);
        await startGeneration(pendingGeneration.botResponse, pendingGeneration.userMessage, pendingGeneration.botMessage, trimmedEmail);
        setPendingGeneration(null);
      }
      return true;
    }
    return false;
  };

  const sendPrototypeEmail = async (prototypeHtml: string, projectSummary: string, prototypeUrl: string, emailToSend?: string) => {
    const emailAddress = emailToSend || userEmail;
    
    if (!emailAddress) {
      console.log('❌ No user email provided, skipping email');
      return;
    }

    console.log('📧 Attempting to send email to:', emailAddress);
    console.log('📧 Prototype URL:', prototypeUrl);

    try {
      const emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
            h2 { color: #00A3AD; margin-bottom: 20px; }
            .link { display: inline-block; background: #00A3AD; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .link:hover { background: #008A93; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Your Prototype is Ready! 🎉</h2>
            <p>Hi,</p>
            <p>Your custom prototype has been generated and is ready to view. Click the link below to access it:</p>
            
            <a href="${prototypeUrl}" class="link">View Your Prototype</a>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Note: This prototype will be available for 24 hours.
            </p>
            
            <div class="footer">
              <p><strong>Silk Road Professionals</strong> - Transforming Ideas into Reality</p>
            </div>
          </div>
        </body>
        </html>
      `;

      console.log('📧 Sending email request to API...');
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: emailAddress,
          subject: 'Your Prototype is Ready - SRP Advisor',
          htmlContent: emailContent,
          prototypeUrl: prototypeUrl
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Email API error:', errorData);
        throw new Error('Failed to send email');
      }

      const result = await response.json();
      console.log('✅ Email sent successfully!', result);
    } catch (error) {
      console.error('❌ Failed to send email:', error);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) {
        fetchHistory();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setConversations([]);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const fetchHistory = async () => {
    const path = 'conversations';
    try {
      const q = query(collection(db, path), orderBy('updatedAt', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const history: Conversation[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        history.push({
          id: doc.id,
          title: data.messages?.[1]?.text?.slice(0, 40) + '...' || 'New Conversation',
          updatedAt: data.updatedAt
        });
      });
      setConversations(history);
    } catch (error: any) {
      if (error.message?.includes('insufficient permissions')) {
        console.warn('History access restricted to admins.');
        setConversations([]);
      } else {
        console.error('Failed to fetch history', error);
      }
    }
  };

  useEffect(() => {
    const createInitialLead = async () => {
      const path = 'leads';
      try {
        const docRef = await addDoc(collection(db, path), {
          status: 'started',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setLeadId(docRef.id);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    };
    createInitialLead();
    if (auth.currentUser) {
      fetchHistory();
    }
  }, []);

  const createNewChat = async () => {
    setMessages([
      {
        id: '1',
        role: 'bot',
        text: "Welcome to Silk Road Professionals. I'm your AI advisor. **What software idea are we exploring today?**",
        timestamp: new Date(),
      },
    ]);
    setMockupHtml(null);
    setLeadId(null);
    setInput('');
    setIsCompleted(false);
    
    // Create new lead
    const path = 'leads';
    try {
      const docRef = await addDoc(collection(db, path), {
        status: 'started',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setLeadId(docRef.id);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const loadConversation = async (id: string) => {
    const path = 'conversations';
    try {
      const docRef = doc(db, path, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMessages(data.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
        setLeadId(id);
        setShowHistory(false);
      }
    } catch (error) {
      console.error('Failed to load conversation', error);
    }
  };

  const parseResponse = (text: string) => {
    let buttons: string[] = [];
    const buttonMatch = text.match(/\[BUTTONS:\s*(\[.*?\])\]/);
    if (buttonMatch) {
      try {
        buttons = JSON.parse(buttonMatch[1]);
      } catch (e) {
        console.error('Failed to parse buttons', e);
      }
    }
    const cleanText = text
      .replace(/\[BUTTONS:\s*\[.*?\]\s*\]/g, '')
      .replace(/\[GENERATE_(?:UI_PROTOTYPE|UI_MOCKUP|TECH_SPEC).*?\]/g, '')
      .trim();
    return { cleanText, buttons };
  };

  const handleSend = async (overrideInput?: string) => {
    const messageText = overrideInput || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Check if we're waiting for email
    if (waitingForEmail) {
      const isValidEmail = await handleEmailSubmit(messageText);
      if (isValidEmail) {
        const confirmMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: `Great! I'll send the prototype link to **${messageText}**. Now let me start building your vision...`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, confirmMessage]);
        setIsLoading(false);
        return;
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: "That doesn't look like a valid email address. Please enter a valid Gmail address (e.g., yourname@gmail.com).",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }
    }

    // Special case for "Looks Great" or "Next Steps" buttons
    if (messageText === "Looks Great" || messageText === "Next Steps") {
      setIsCompleted(true);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: messageText === "Looks Great" 
          ? "I'm glad you like the design! We will keep this generated visual design for **24 hours**, after which it will be removed from our temporary preview. \n\nIf you're ready for the next steps—whether it's building the actual product or discussing it further—you can **contact our sales team** to be paired with a professional developer who can bring this vision to life."
          : "Excellent! We will keep this technical plan for **24 hours**, after which it will be removed from our temporary preview. \n\nIf you're ready to proceed—whether it's building the actual product or discussing the architecture further—you can **contact our sales team** to be paired with a professional developer who can bring this vision to life.",
        timestamp: new Date(),
      };
      
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const botResponse = await getChatResponse(messageText, messages);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (botResponse.includes('[GENERATE_UI_PROTOTYPE') || botResponse.includes('[GENERATE_UI_MOCKUP') || botResponse.includes('[GENERATE_TECH_SPEC')) {
        // Check if email is already provided
        if (!userEmail) {
          // Ask for email in chat
          setPendingGeneration({ botResponse, userMessage, botMessage });
          setWaitingForEmail(true);
          
          const emailRequestMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'bot',
            text: "Perfect! Before I start building, **please enter your Gmail address** so I can send you the prototype link when it's ready.",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, emailRequestMessage]);
          setIsLoading(false);
          return;
        }
        
        // Proceed with generation
        await startGeneration(botResponse, userMessage, botMessage);
        return;
      }

      if (leadId) {
        const convPath = 'conversations';
        try {
          await setDoc(doc(db, convPath, leadId), {
            leadId,
            messages: [...messages, userMessage, botMessage].map(m => ({
              role: m.role,
              text: m.text,
              timestamp: m.timestamp.toISOString()
            })),
            updatedAt: serverTimestamp()
          });
          fetchHistory();
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, convPath);
        }
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: error?.message?.includes('QUOTA_EXCEEDED') 
          ? error.message.replace('QUOTA_EXCEEDED: ', '')
          : "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  const startGeneration = async (botResponse: string, userMessage: Message, botMessage: Message, emailToUse?: string) => {
    try {
        const emailAddress = emailToUse || userEmail;
        console.log('🎨 Starting generation for email:', emailAddress);
        
        setIsGenerating(true);
        setMockupHtml(null);

        setGenerationSteps(prev => prev.map(s => ({ ...s, status: 'waiting' })));
        
        const updateStep = (id: string, status: 'loading' | 'completed') => {
          setGenerationSteps(prev => prev.map(s => s.id === id ? { ...s, status } : s));
        };

        const type = (botResponse.includes('[GENERATE_UI_PROTOTYPE') || botResponse.includes('[GENERATE_UI_MOCKUP')) ? 'UI' : 'TECH';
        
        // Extract summary from tag: [GENERATE_UI_MOCKUP: "Summary"]
        const tagRegex = /\[GENERATE_(?:UI_PROTOTYPE|UI_MOCKUP|TECH_SPEC):\s*"([^"]+)"\]/;
        const match = botResponse.match(tagRegex);
        let projectSummary = match ? match[1] : '';

        // Fallback: Find the summary message
        if (!projectSummary) {
          const summaryMessage = [...messages].reverse().find(m => m.role === 'bot' && m.text.includes('**Does this accurately capture your vision?**'));
          projectSummary = summaryMessage ? summaryMessage.text.split('**')[0].trim() : botResponse.replace(/\[.*?\]/g, '').trim();
        }
        
        updateStep('brainstorm', 'loading');
        await new Promise(r => setTimeout(r, 800));
        updateStep('brainstorm', 'completed');
        updateStep('colors', 'loading');
        await new Promise(r => setTimeout(r, 600));
        updateStep('colors', 'completed');
        updateStep('layout', 'loading');
        await new Promise(r => setTimeout(r, 1000));
        updateStep('layout', 'completed');
        updateStep('code', 'loading');

        const html = await generatePrototype(projectSummary, type);
        
        updateStep('code', 'completed');
        
        // Small delay to ensure the "Generating" state is visible and UI is ready
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setMockupHtml(html);
        setIsGenerating(false);

        // Save prototype to server and get URL
        const prototypeId = leadId || Date.now().toString();
        let prototypeUrl = window.location.origin;
        
        try {
          console.log('💾 Saving prototype with ID:', prototypeId);
          const saveResponse = await fetch('/api/prototype', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: prototypeId, html })
          });
          
          if (saveResponse.ok) {
            const saveResult = await saveResponse.json();
            prototypeUrl = saveResult.url;
            console.log('✅ Prototype saved at:', prototypeUrl);
          } else {
            console.error('❌ Failed to save prototype:', await saveResponse.text());
          }
        } catch (error) {
          console.error('❌ Exception saving prototype:', error);
        }

        // Send email with prototype link
        console.log('📧 About to send email to:', emailAddress);
        console.log('📧 Prototype URL:', prototypeUrl);
        try {
          await sendPrototypeEmail(html, projectSummary, prototypeUrl, emailAddress);
          console.log('✅ Email sending completed');
        } catch (error) {
          console.error('❌ Email sending failed:', error);
        }

        const successMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'bot',
          text: type === 'UI' 
            ? "Your visual design is ready! I've also sent a secure link to your email so you can review it anytime. **What do you think of the design?** [BUTTONS: [\"Looks Great\", \"Needs Changes\"]]"
            : "The technical plan is complete! A copy has been sent to your email for your records. **What do you think of the plan?** [BUTTONS: [\"Next Steps\", \"Needs Changes\"]]",
          timestamp: new Date(),
        };

        setMessages(prev => [...prev.filter(m => m.id !== botMessage.id), successMessage]);

        if (leadId) {
          const convPath = 'conversations';
          try {
            const finalMessages = [...messages, userMessage, successMessage].map(m => ({
              role: m.role,
              text: m.text,
              timestamp: m.timestamp.toISOString()
            }));

            await setDoc(doc(db, convPath, leadId), {
              leadId,
              messages: finalMessages,
              updatedAt: serverTimestamp()
            });
            fetchHistory();
          } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, convPath);
          }
        }
        
        return;
    } catch (error: any) {
      console.error('Generation error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: error?.message?.includes('QUOTA_EXCEEDED') 
          ? error.message.replace('QUOTA_EXCEEDED: ', '')
          : "I'm sorry, I encountered an error during generation. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderText = (text: string) => {
    const { cleanText } = parseResponse(text);
    return cleanText.split('\n').map((line, i) => {
      // Simple bolding support
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-1'}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="font-bold text-srp-teal">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="h-screen bg-srp-bg font-sans text-srp-navy flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-srp-border px-8 py-4 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-srp-navy rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
            <Sparkles className="text-srp-teal w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight leading-none text-srp-navy uppercase">SRP Advisor</span>
            <span className="text-[10px] text-srp-teal font-bold uppercase tracking-[0.3em] mt-1">Idea-to-Product Engine</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 mr-4 border-r border-srp-border pr-6">
            <button className="text-xs font-bold text-srp-navy/60 hover:text-srp-teal transition-colors uppercase tracking-widest">Services</button>
            <button className="text-xs font-bold text-srp-navy/60 hover:text-srp-teal transition-colors uppercase tracking-widest">Portfolio</button>
            <button className="text-xs font-bold text-srp-navy/60 hover:text-srp-teal transition-colors uppercase tracking-widest">About</button>
          </nav>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2.5 rounded-xl transition-all group ${showHistory ? 'bg-srp-navy text-white' : 'bg-srp-bg hover:bg-srp-border text-srp-navy/40'}`}
              title="History"
            >
              <History className={`w-4 h-4 ${showHistory ? 'text-srp-teal' : 'group-hover:text-srp-teal'}`} />
            </button>
            <button 
              onClick={createNewChat}
              className="p-2.5 bg-srp-bg hover:bg-srp-border rounded-xl transition-all group"
              title="New Concept"
            >
              <Plus className="w-4 h-4 text-srp-navy/40 group-hover:text-srp-teal transition-colors" />
            </button>
          </div>

          <button className="bg-srp-teal text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#008A93] transition-all shadow-[0_4px_14px_0_rgba(0,163,173,0.39)] hover:shadow-[0_6px_20px_rgba(0,163,173,0.23)] active:scale-95 uppercase tracking-widest ml-2">
            Book Consultation
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Sidebar: Chat History */}
        <AnimatePresence>
          {showHistory && (
            <motion.div 
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-white border-r border-srp-border z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-srp-border flex items-center justify-between">
                <h2 className="font-display font-black text-lg uppercase tracking-tight">History</h2>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-srp-bg rounded-lg transition-colors">
                  <X className="w-5 h-5 text-srp-navy/40" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {conversations.length > 0 ? (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => loadConversation(conv.id)}
                      className="w-full text-left p-4 rounded-xl hover:bg-srp-bg transition-all group border border-transparent hover:border-srp-border"
                    >
                      <p className="text-sm font-bold text-srp-navy truncate group-hover:text-srp-teal transition-colors">
                        {conv.title}
                      </p>
                      <p className="text-[10px] text-srp-navy/30 uppercase tracking-widest mt-1 font-extrabold">
                        {new Date(conv.updatedAt?.seconds * 1000).toLocaleDateString()}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-40">
                    <History className="w-12 h-12 mb-4" />
                    <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                      {user ? "No conversations found" : "Login as Admin to see history"}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-srp-border">
                <button 
                  onClick={createNewChat}
                  className="w-full bg-srp-navy text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-srp-navy/90 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  New Concept
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left: Preview Area */}
        <div className="flex-1 bg-[#F1F5F9] flex flex-col border-r border-srp-border overflow-hidden relative">
          {/* Share Modal */}
          <AnimatePresence>
            {showShareModal && (
              <div className="absolute inset-0 z-[60] flex items-center justify-center bg-srp-navy/20 backdrop-blur-sm p-8">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-[2.5rem] shadow-2xl border border-srp-border p-10 max-w-md w-full relative"
                >
                  <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 p-2 hover:bg-srp-bg rounded-xl transition-colors">
                    <X className="w-6 h-6 text-srp-navy/20" />
                  </button>
                  <div className="w-16 h-16 bg-srp-teal/10 rounded-2xl flex items-center justify-center mb-8">
                    <Share2 className="w-8 h-8 text-srp-teal" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-srp-navy mb-2 uppercase tracking-tight">Share Prototype</h3>
                  <p className="text-sm text-srp-navy/40 mb-8 font-medium leading-relaxed">
                    Anyone with this link can view the live mockup and track generation progress.
                  </p>
                  <div className="bg-srp-bg border border-srp-border rounded-2xl p-4 flex items-center gap-3 mb-8">
                    <div className="flex-1 truncate text-xs font-bold text-srp-navy/60">
                      {window.location.origin}/view/{leadId}
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/view/${leadId}`);
                        alert('Link copied to clipboard!');
                      }}
                      className="p-2 bg-white border border-srp-border rounded-lg hover:text-srp-teal transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="w-full bg-srp-navy text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-srp-navy/90 transition-all shadow-xl"
                  >
                    Done
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="bg-white border-b border-srp-border px-4 py-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 px-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner"></div>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button className="p-1.5 text-srp-navy/20 hover:text-srp-teal transition-colors rounded-md hover:bg-srp-bg">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button className="p-1.5 text-srp-navy/20 hover:text-srp-teal transition-colors rounded-md hover:bg-srp-bg">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                  const current = mockupHtml;
                  setMockupHtml(null);
                  setTimeout(() => setMockupHtml(current), 10);
                }}
                  className="p-1.5 text-srp-navy/40 hover:text-srp-teal transition-colors rounded-md hover:bg-srp-bg"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-srp-bg border border-srp-border rounded-lg py-1.5 px-4 flex items-center gap-2 group focus-within:border-srp-teal/50 transition-all">
              <div className="w-2 h-2 rounded-full bg-srp-teal/40"></div>
              <span className="text-[11px] font-bold text-srp-navy/40 select-none">srp-preview.local/</span>
              <span className="text-[11px] font-bold text-srp-navy/60 truncate">
                {mockupHtml ? 'my-product-design' : 'waiting-for-vision'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isGenerating && (
                <div className="flex items-center gap-2 text-srp-teal px-3 py-1 bg-srp-teal/5 rounded-full border border-srp-teal/10">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Building</span>
                </div>
              )}
              <button 
                onClick={() => {
                  const win = window.open('', '_blank');
                  if (win) {
                    win.document.write(mockupHtml || '');
                    win.document.close();
                  }
                }}
                disabled={!mockupHtml}
                className="p-2 text-srp-navy/40 hover:text-srp-teal disabled:opacity-20 transition-colors"
                title="Expand to Full Screen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-8 flex items-center justify-center overflow-hidden">
            {mockupHtml ? (
              <div className={`bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-1000 ease-in-out overflow-hidden rounded-2xl border border-srp-border ${
                viewMode === 'desktop' ? 'w-full h-full' : 'w-[375px] h-[667px]'
              }`}>
                <iframe
                  srcDoc={mockupHtml ? `
                    <script>
                      // Navigation Guard: Prevent links from navigating the iframe away from the mockup
                      document.addEventListener('click', function(e) {
                        const target = e.target.closest('a');
                        if (target) {
                          // Neutralize target="_top" or target="_parent"
                          const targetAttr = target.getAttribute('target');
                          if (targetAttr === '_top' || targetAttr === '_parent') {
                            target.removeAttribute('target');
                          }

                          const href = target.getAttribute('href');
                          // Allow anchor links within the same page
                          if (href && href.startsWith('#')) return;
                          
                          // Block all other navigations
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Navigation blocked in mockup to prevent reset:', href);
                        }
                      }, true);
                      
                      // Prevent form submissions
                      document.addEventListener('submit', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Form submission blocked in mockup');
                      }, true);

                      // Prevent window.location changes
                      window.onbeforeunload = function() {
                        console.log('Attempted to navigate away from mockup');
                        return false;
                      };
                    </script>
                    ${mockupHtml}
                  ` : undefined}
                  className="w-full h-full border-none"
                  title="Mockup Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            ) : (
              <div className="text-center max-w-md animate-in fade-in zoom-in duration-700">
                <div className="relative w-32 h-32 mx-auto mb-12">
                  <div className="absolute inset-0 bg-srp-teal/10 rounded-[2.5rem] animate-pulse"></div>
                  <div className="absolute inset-4 bg-white rounded-[2rem] shadow-2xl border border-srp-border flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500">
                    <Layout className="w-12 h-12 text-srp-teal" />
                  </div>
                </div>
                <h3 className="text-3xl font-display font-black text-srp-navy mb-6 uppercase tracking-tighter">Concept Canvas</h3>
                <p className="text-base text-srp-navy/40 leading-relaxed font-medium max-w-xs mx-auto">
                  Share your vision in the chat. I'll create a visual design or technical plan right here.
                </p>
              </div>
            )}
          </div>
          
          {/* Removed floating buttons as they are now in the browser chrome */}
        </div>

        {/* Right: Chat Area */}
        <div className="w-[480px] flex flex-col bg-white overflow-hidden relative shadow-[-20px_0_50px_rgba(0,0,0,0.03)]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-10 space-y-10">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const { cleanText, buttons } = parseResponse(msg.text);
                if (msg.role === 'bot' && cleanText === '' && buttons.length === 0) return null;
                
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col gap-4 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transform ${
                        msg.role === 'bot' ? 'bg-srp-bg text-srp-teal -rotate-6' : 'bg-srp-navy text-white rotate-6'
                      }`}>
                        {msg.role === 'bot' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                      </div>
                      <div className={`max-w-[85%] p-5 rounded-3xl text-[15px] leading-relaxed font-medium ${
                        msg.role === 'bot' 
                          ? 'bg-srp-bg text-srp-navy rounded-tl-none border border-srp-border' 
                          : 'bg-srp-navy text-white rounded-tr-none shadow-xl'
                      }`}>
                        {renderText(msg.text)}
                      </div>
                    </div>
                    
                    {/* Interactive Buttons */}
                    {msg.role === 'bot' && buttons.length > 0 && messages[messages.length - 1].id === msg.id && (
                      <div className="flex flex-wrap gap-3 ml-14 mt-2">
                        {buttons.map((btn, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(btn)}
                            disabled={isLoading}
                            className="bg-white border-2 border-srp-teal/20 text-srp-teal px-6 py-2 rounded-2xl text-xs font-bold hover:bg-srp-teal hover:text-white hover:border-srp-teal transition-all shadow-sm hover:shadow-md active:scale-95 uppercase tracking-widest"
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {isLoading && !isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-srp-bg flex items-center justify-center shrink-0 -rotate-6">
                  <Bot className="w-6 h-6 text-srp-teal animate-pulse" />
                </div>
                <div className="bg-srp-bg p-5 rounded-3xl rounded-tl-none border border-srp-border">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-srp-teal rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-srp-teal rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-srp-teal rounded-full animate-bounce"></div>
                  </div>
                </div>
              </motion.div>
            )}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-srp-bg flex items-center justify-center shrink-0 -rotate-6">
                  <Bot className="w-6 h-6 text-srp-teal" />
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] rounded-tl-none border-2 border-srp-teal/20 shadow-2xl max-w-[85%]">
                  <div className="flex items-center gap-3 mb-4">
                    <Loader2 className="w-5 h-5 text-srp-teal animate-spin" />
                    <h4 className="text-sm font-black uppercase tracking-widest text-srp-navy">Building Your Vision</h4>
                  </div>
                  <div className="mb-8">
                    <p className="text-xs font-bold text-srp-navy/60 leading-relaxed">
                      We've started working on your design. Once it's ready, you'll see the result right here on the preview screen. We'll also send a secure link to your email so you can review it later.
                    </p>
                  </div>
                  <div className="space-y-6">
                    {generationSteps.map((step) => (
                      <div key={step.id} className="flex items-center gap-4 group">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-500 ${
                          step.status === 'completed' ? 'bg-srp-teal text-white' : 
                          step.status === 'loading' ? 'bg-srp-teal/10 text-srp-teal animate-pulse' : 
                          'bg-srp-bg text-srp-navy/20'
                        }`}>
                          {step.status === 'completed' ? <Check className="w-3.5 h-3.5" /> : 
                           step.status === 'loading' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 
                           <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                        </div>
                        <span className={`text-xs font-bold transition-colors duration-500 ${
                          step.status === 'completed' ? 'text-srp-navy' : 
                          step.status === 'loading' ? 'text-srp-teal' : 
                          'text-srp-navy/30'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          {!isCompleted ? (
            <div className="p-8 border-t border-srp-border bg-white">
            <div className="relative flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Describe your vision..."
                  rows={1}
                  className="w-full bg-srp-bg border-2 border-srp-border rounded-[1.5rem] py-4.5 pl-8 pr-16 text-sm font-semibold focus:outline-none focus:ring-8 focus:ring-srp-teal/5 focus:border-srp-teal transition-all placeholder:text-srp-navy/20 resize-none min-h-[60px] max-h-[240px] overflow-y-auto scrollbar-hide"
                  disabled={isLoading}
                />
                <div className="absolute right-4 bottom-4 text-[10px] font-bold text-srp-navy/20 uppercase tracking-widest">
                  Shift + Enter for new line
                </div>
              </div>
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="p-4.5 bg-srp-navy text-white rounded-[1.5rem] hover:bg-srp-navy/90 disabled:bg-srp-border disabled:text-srp-navy/20 transition-all shadow-xl active:scale-95 group shrink-0"
              >
                <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-srp-teal shadow-[0_0_8px_rgba(0,163,173,0.5)]"></div>
                <p className="text-[11px] text-srp-navy/30 uppercase tracking-[0.3em] font-extrabold">
                  SRP Intelligence
                </p>
              </div>
              <p className="text-[11px] text-srp-navy/20 font-extrabold tracking-widest">V1.3</p>
            </div>
          </div>
          ) : (
            <div className="p-8 border-t border-srp-border bg-srp-bg/30 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-srp-teal/10 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-srp-teal" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-srp-navy uppercase tracking-widest mb-1">Conversation Completed</h4>
                  <p className="text-[11px] text-srp-navy/40 font-bold">Your vision has been captured. Start a new concept to explore more ideas.</p>
                </div>
                <button 
                  onClick={createNewChat}
                  className="mt-2 px-6 py-2.5 bg-srp-navy text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-srp-navy/90 transition-all active:scale-95"
                >
                  Start New Concept
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ChatApp />
    </ErrorBoundary>
  );
}
