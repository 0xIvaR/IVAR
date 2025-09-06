// Basic IVAR Integration Example
import React from 'react'
import { VoiceRecognition, ChatInterface } from '../src/components'

const BasicExample = () => {
  const [messages, setMessages] = useState([])
  
  const handleVoiceInput = (transcript) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: transcript,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Simple AI response (replace with actual AI service)
    const aiResponse = {
      id: Date.now() + 1,
      text: `You said: "${transcript}". This is a basic response.`,
      isUser: false,
      timestamp: new Date()
    }
    
    setTimeout(() => {
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Basic IVAR Example</h1>
        
        <div className="max-w-2xl mx-auto">
          <ChatInterface messages={messages} />
          
          <div className="mt-8 flex justify-center">
            <VoiceRecognition 
              onResult={handleVoiceInput}
              isListening={false}
              setIsListening={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicExample
