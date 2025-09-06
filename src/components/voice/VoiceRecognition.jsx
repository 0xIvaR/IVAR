import React, { useState, useEffect, useRef } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { motion } from 'framer-motion'

const VoiceRecognition = ({ onResult, isListening, setIsListening }) => {
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition) {
      setIsSupported(true)
      
      // Initialize speech recognition
      const recognition = new SpeechRecognition()
      recognitionRef.current = recognition
      
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'
      
      recognition.onstart = () => {
        setError('')
        console.log('Voice recognition started')
      }
      
      recognition.onresult = (event) => {
        let finalTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          }
        }
        
        if (finalTranscript) {
          console.log('Final transcript:', finalTranscript)
          onResult(finalTranscript)
          stopListening()
        }
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setError(`Speech recognition error: ${event.error}`)
        setIsListening(false)
      }
      
      recognition.onend = () => {
        console.log('Voice recognition ended')
        setIsListening(false)
      }
    } else {
      setIsSupported(false)
      setError('Speech recognition is not supported in this browser')
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [onResult, setIsListening])

  const startListening = () => {
    if (!isSupported || !recognitionRef.current) {
      setError('Speech recognition is not available')
      return
    }
    
    try {
      setError('')
      setIsListening(true)
      recognitionRef.current.start()
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      setError('Failed to start speech recognition')
      setIsListening(false)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center p-4">
        <p className="text-red-400 text-sm">
          Voice recognition is not supported in this browser.
          <br />
          Please try Chrome, Edge, or Safari.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={toggleListening}
        className={`voice-button-organic w-16 h-16 flex items-center justify-center ${
          isListening 
            ? 'bg-gradient-to-br from-red-500/80 to-red-600/80 listening' 
            : 'bg-gradient-to-br from-ai-blue/80 to-ai-green/80'
        }`}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        disabled={!isSupported}
      >
        {isListening ? (
          <MicOff className="w-7 h-7 text-white relative z-10" />
        ) : (
          <Mic className="w-7 h-7 text-white relative z-10" />
        )}
      </motion.button>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs mt-2 text-center max-w-xs"
        >
          {error}
        </motion.p>
      )}
      
      <p className="text-gray-400 text-xs mt-2 text-center">
        {isListening ? 'Tap to stop' : 'Tap to speak'}
      </p>
    </div>
  )
}

export default VoiceRecognition 