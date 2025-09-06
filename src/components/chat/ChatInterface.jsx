import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User } from 'lucide-react'

const ChatInterface = ({ messages, isTyping, messagesEndRef }) => {
  const [animatedMessages, setAnimatedMessages] = useState(new Set())

  useEffect(() => {
    // Mark existing messages as animated when component mounts or chat resets
    const messageIds = messages.map(msg => msg.id)
    setAnimatedMessages(new Set(messageIds))
  }, []) // Only run on mount

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const TypingIndicator = React.forwardRef((props, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center space-x-2 p-4"
    >
      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="message-bubble assistant-message">
        <div className="flex space-x-1">
          <div className="wave w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="wave w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="wave w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  ))

  const MessageBubble = React.forwardRef(({ message, index }, ref) => {
    const shouldAnimate = !animatedMessages.has(message.id)
    
    useEffect(() => {
      if (shouldAnimate) {
        setAnimatedMessages(prev => new Set([...prev, message.id]))
      }
    }, [message.id, shouldAnimate])

    return (
      <motion.div
        ref={ref}
        initial={shouldAnimate ? { opacity: 0, y: 20, scale: 0.95 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={shouldAnimate ? { 
          duration: 0.4, 
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
          damping: 15
        } : false}
        className={`flex items-start space-x-3 mb-4 ${
          message.isUser ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          message.isUser 
            ? 'bg-ai-blue' 
            : 'bg-slate-600'
        }`}>
          {message.isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
        
        <div className="flex flex-col max-w-xs lg:max-w-md">
          <div className={`message-bubble ${
            message.isUser ? 'user-message' : 'assistant-message'
          }`}>
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 px-2">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </motion.div>
    )
  })

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 chat-scroll">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              index={index}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatInterface 