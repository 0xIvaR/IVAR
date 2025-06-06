// AI Service - Supports multiple free AI providers
const AI_PROVIDERS = {
  GOOGLE: 'google',
  OPENAI: 'openai', 
  HUGGINGFACE: 'huggingface',
  LOCAL: 'local'
}

class AIService {
  constructor() {
    this.provider = AI_PROVIDERS.LOCAL // Default to local responses
    this.apiKey = null
  }

  setProvider(provider, apiKey = null) {
    this.provider = provider
    this.apiKey = apiKey
  }

  async getResponse(message, conversationHistory = []) {
    switch (this.provider) {
      case AI_PROVIDERS.GOOGLE:
        return await this.getGoogleResponse(message, conversationHistory)
      case AI_PROVIDERS.OPENAI:
        return await this.getOpenAIResponse(message, conversationHistory)
      case AI_PROVIDERS.HUGGINGFACE:
        return await this.getHuggingFaceResponse(message)
      default:
        return this.getLocalResponse(message)
    }
  }

  // Google Gemini API (FREE!)
  async getGoogleResponse(message, conversationHistory) {
    if (!this.apiKey) {
      throw new Error('Google API key not provided')
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are IVAR, a helpful AI voice assistant like Google Assistant or Siri. Be conversational, helpful, and friendly. Keep responses concise but informative.\n\nUser: ${message}`
            }]
          }]
        })
      })

      const data = await response.json()
      
      if (data.candidates && data.candidates[0]) {
        return data.candidates[0].content.parts[0].text
      }
      
      throw new Error('No response from Google AI')
    } catch (error) {
      console.error('Google AI error:', error)
      throw error
    }
  }

  // OpenAI API
  async getOpenAIResponse(message, conversationHistory) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not provided')
    }

    try {
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

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 150,
          temperature: 0.7
        })
      })

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        return data.choices[0].message.content
      }
      
      throw new Error('No response from OpenAI')
    } catch (error) {
      console.error('OpenAI error:', error)
      throw error
    }
  }

  // Hugging Face API (FREE!)
  async getHuggingFaceResponse(message) {
    if (!this.apiKey) {
      throw new Error('Hugging Face API key not provided')
    }

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_new_tokens: 50,
            temperature: 0.7
          }
        })
      })

      const data = await response.json()
      
      if (data.generated_text) {
        return data.generated_text
      }
      
      throw new Error('No response from Hugging Face')
    } catch (error) {
      console.error('Hugging Face error:', error)
      throw error
    }
  }

  // Local pattern matching (fallback)
  getLocalResponse(input) {
    const message = input.toLowerCase()
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! It's great to talk with you. How can I assist you today?"
    }
    if (message.includes('weather')) {
      return "I'd love to help with weather information! For real-time weather, I'd need to integrate with a weather API. What location are you interested in?"
    }
    if (message.includes('time')) {
      const time = new Date().toLocaleTimeString()
      return `The current time is ${time}.`
    }
    if (message.includes('date')) {
      const date = new Date().toLocaleDateString()
      return `Today's date is ${date}.`
    }
    if (message.includes('joke')) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the AI go to therapy? It had too many deep learning issues!",
        "What do you call a robot that takes the long way around? R2-Detour!"
      ]
      return jokes[Math.floor(Math.random() * jokes.length)]
    }
    if (message.includes('help')) {
      return "I can help you with various tasks! Try asking me about the time, weather, tell me a joke, or just have a conversation. I'm here to assist!"
    }
    
    // Default responses
    const defaultResponses = [
      "That's interesting! Tell me more about that.",
      "I understand. How can I help you with that?",
      "Thanks for sharing that with me. What would you like to know?",
      "I'm here to help! What specific information are you looking for?",
      "That's a great question! While I'm still learning, I'd love to help you explore that topic."
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }
}

export default new AIService() 