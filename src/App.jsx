import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Settings,
  MessageCircle,
  Sparkles,
  Plus,
  Database
} from 'lucide-react'
import VoiceRecognition from './components/voice/VoiceRecognition'
import ChatInterface from './components/chat/ChatInterface'
import WaveAnimation from './components/ui/WaveAnimation'
import AISettings from './components/settings/AISettings'
import DataLocationGuide from './components/settings/DataLocationGuide'
import aiService from './services/aiService'
import { debugStorage } from './utils/dataManager'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm IVAR, your AI voice assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showDataGuide, setShowDataGuide] = useState(false)
  const [currentProvider, setCurrentProvider] = useState('local')
  const [currentChatId, setCurrentChatId] = useState('default')
  
  const messagesEndRef = useRef(null)
  const speechSynthesis = window.speechSynthesis
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load conversation from localStorage on startup
  useEffect(() => {
    const savedConversation = localStorage.getItem(`ivar-conversation-${currentChatId}`)
    if (savedConversation) {
      const parsedMessages = JSON.parse(savedConversation)
      // Convert timestamp strings back to Date objects
      const messagesWithDates = parsedMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
      setMessages(messagesWithDates)
    }
  }, [currentChatId])

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`ivar-conversation-${currentChatId}`, JSON.stringify(messages))
    }
  }, [messages, currentChatId])

  // Load AI settings on startup
  useEffect(() => {
    const savedSettings = localStorage.getItem('ivar-ai-settings')
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      aiService.setProvider(settings.provider, settings.apiKey)
      setCurrentProvider(settings.provider)
    }
  }, [])
  
  // Expose debug function globally for easy access
  useEffect(() => {
    window.debugIVAR = () => {
      debugStorage()
      console.log('🔍 To see your data storage, check the console above!')
      console.log('📍 Your conversations are stored in browser localStorage')
      console.log('🎯 Data locations:')
      console.log('  • AI Settings: localStorage["ivar-ai-settings"]')
      console.log('  • Conversations: localStorage["ivar-conversation-*"]')
      console.log('  • Chat List: localStorage["ivar-chat-list"]')
      console.log('💡 Type "debugIVAR()" in console anytime to see your data!')
    }
    
    // Show welcome message
    console.log('🤖 IVAR Debug Helper Loaded!')
    console.log('💡 Type "debugIVAR()" in console to see where your data is stored!')
  }, [])
  
  const speakText = (text) => {
    if (!voiceEnabled || !speechSynthesis) return
    
    // Cancel any ongoing speech
    speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8
    
    // Try to use a pleasant voice
    const voices = speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Alex') ||
      voice.name.includes('Samantha') ||
      voice.lang.includes('en-US')
    )
    
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    speechSynthesis.speak(utterance)
  }
  
  const processMessage = async (text) => {
    if (!text.trim()) return
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)
    
    try {
      // Get AI response using the configured service
      const response = await aiService.getResponse(text.trim())
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      
      // Speak the response
      if (voiceEnabled) {
        setTimeout(() => speakText(response), 500)
      }
      
    } catch (error) {
      console.error('Error processing message:', error)
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I encountered an error. Please check your AI settings and try again.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }
  
  const handleVoiceResult = (transcript) => {
    if (transcript) {
      processMessage(transcript)
    }
  }
  
  const handleSendMessage = () => {
    processMessage(inputText)
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
    if (isSpeaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const startNewChat = () => {
    const newChatId = `chat-${Date.now()}`
    setCurrentChatId(newChatId)
    setMessages([
      {
        id: 1,
        text: "Hello! I'm IVAR, your AI voice assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }
    ])
    setInputText('')
    setIsTyping(false)
    
    // Stop any ongoing speech
    if (isSpeaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleSettingsSave = (settings) => {
    aiService.setProvider(settings.provider, settings.apiKey)
    setCurrentProvider(settings.provider)
    
    // Add a message about the change
    const changeMessage = {
      id: Date.now(),
      text: `AI provider changed to ${settings.provider === 'local' ? 'Local Responses' : 
             settings.provider === 'google' ? 'Google Gemini' :
             settings.provider === 'huggingface' ? 'Hugging Face' : 'OpenAI GPT'}. How can I help you?`,
      isUser: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, changeMessage])
  }

  const getProviderDisplayName = (provider) => {
    switch (provider) {
      case 'google': return 'Google Gemini'
      case 'openai': return 'OpenAI GPT'
      case 'huggingface': return 'Hugging Face'
      default: return 'Local'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10 p-4"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AnimatePresence>
              {(isTyping || isListening || isSpeaking) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center"
                >
                  <WaveAnimation />
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div
              animate={{ 
                rotate: isTyping || isListening || isSpeaking ? 360 : 0 
              }}
              transition={{ 
                duration: isTyping || isListening || isSpeaking ? 2 : 0, 
                repeat: isTyping || isListening || isSpeaking ? Infinity : 0, 
                ease: "linear" 
              }}
              className="w-10 h-10 bg-gradient-to-r from-ai-blue to-ai-green rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-ai-blue to-ai-green bg-clip-text text-transparent">
                IVAR
              </h1>
              <p className="text-sm text-gray-400">
                AI Voice Assistant • {getProviderDisplayName(currentProvider)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={startNewChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center space-x-2"
              title="Start New Chat"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:block text-sm">New Chat</span>
            </motion.button>
            <button
              onClick={() => setShowDataGuide(true)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title="Data Storage Info"
            >
              <Database className="w-5 h-5" />
            </button>
            <button
              onClick={toggleVoice}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6 pt-24 pb-32">
        <ChatInterface 
          key={currentChatId}
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />
        
        {/* Voice Recognition Status */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center py-4"
            >
              <div className="inline-flex items-center space-x-2 bg-ai-blue/20 px-4 py-2 rounded-full border border-ai-blue/30">
                <WaveAnimation />
                <span className="text-sm">Listening...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Speaking Status */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center py-4"
            >
              <div className="inline-flex items-center space-x-2 bg-ai-green/20 px-4 py-2 rounded-full border border-ai-green/30">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Speaking...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Input Area */}
      <motion.footer 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-t from-black/30 via-black/20 to-transparent backdrop-blur-xl border-t border-white/5 p-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1 input-container">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or use voice..."
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-ai-blue to-ai-green hover:from-ai-blue/90 hover:to-ai-green/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-shrink-0">
              <VoiceRecognition
                onResult={handleVoiceResult}
                isListening={isListening}
                setIsListening={setIsListening}
              />
            </div>
          </div>
        </div>
      </motion.footer>

      {/* AI Settings Modal */}
      <AISettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSettingsSave}
      />

      {/* Data Location Guide Modal */}
      <DataLocationGuide
        isOpen={showDataGuide}
        onClose={() => setShowDataGuide(false)}
      />
    </div>
  )
}

export default App 