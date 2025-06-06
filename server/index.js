const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date().toISOString() })
})

// AI Chat endpoint (for future OpenAI integration)
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }
    
    // TODO: Integrate with OpenAI API
    // For now, return a simple response
    const response = {
      message: "I received your message! To enable advanced AI responses, please add your OpenAI API key to the .env file.",
      timestamp: new Date().toISOString()
    }
    
    res.json(response)
    
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// OpenAI Integration (uncomment when API key is available)
/*
const { OpenAI } = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }
    
    const messages = [
      {
        role: "system",
        content: "You are IVAR, a helpful AI voice assistant similar to Google Assistant or Siri. Be conversational, helpful, and friendly. Keep responses concise but informative."
      },
      ...conversationHistory,
      {
        role: "user",
        content: message
      }
    ]
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 150,
      temperature: 0.7
    })
    
    const response = {
      message: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    }
    
    res.json(response)
    
  } catch (error) {
    console.error('OpenAI error:', error)
    res.status(500).json({ error: 'Failed to process AI request' })
  }
})
*/

app.listen(PORT, () => {
  console.log(`🤖 IVAR Voice Assistant Server running on port ${PORT}`)
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`)
}) 