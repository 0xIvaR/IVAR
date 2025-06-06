// Data Manager - Handles all localStorage operations for IVAR
// This is where all your conversation and settings data is stored

export const STORAGE_KEYS = {
  AI_SETTINGS: 'ivar-ai-settings',
  CONVERSATION_PREFIX: 'ivar-conversation-',
  CHAT_LIST: 'ivar-chat-list',
  USER_PREFERENCES: 'ivar-user-preferences'
}

// Conversation Management
export const conversationManager = {
  // Save a conversation
  saveConversation: (chatId, messages) => {
    const key = `${STORAGE_KEYS.CONVERSATION_PREFIX}${chatId}`
    localStorage.setItem(key, JSON.stringify(messages))
    
    // Update chat list
    const chatList = chatManager.getChatList()
    const existingChat = chatList.find(chat => chat.id === chatId)
    
    if (!existingChat) {
      const newChat = {
        id: chatId,
        title: getConversationTitle(messages),
        lastMessage: messages[messages.length - 1]?.text || '',
        timestamp: new Date().toISOString(),
        messageCount: messages.length
      }
      chatList.unshift(newChat)
      chatManager.saveChatList(chatList)
    } else {
      // Update existing chat info
      existingChat.lastMessage = messages[messages.length - 1]?.text || ''
      existingChat.timestamp = new Date().toISOString()
      existingChat.messageCount = messages.length
      chatManager.saveChatList(chatList)
    }
  },

  // Load a conversation
  loadConversation: (chatId) => {
    const key = `${STORAGE_KEYS.CONVERSATION_PREFIX}${chatId}`
    const saved = localStorage.getItem(key)
    if (saved) {
      const messages = JSON.parse(saved)
      return messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }
    return null
  },

  // Delete a conversation
  deleteConversation: (chatId) => {
    const key = `${STORAGE_KEYS.CONVERSATION_PREFIX}${chatId}`
    localStorage.removeItem(key)
    
    // Remove from chat list
    const chatList = chatManager.getChatList()
    const updatedList = chatList.filter(chat => chat.id !== chatId)
    chatManager.saveChatList(updatedList)
  },

  // Get all conversation keys
  getAllConversationKeys: () => {
    const keys = Object.keys(localStorage)
    return keys.filter(key => key.startsWith(STORAGE_KEYS.CONVERSATION_PREFIX))
  }
}

// Chat List Management
export const chatManager = {
  getChatList: () => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHAT_LIST)
    return saved ? JSON.parse(saved) : []
  },

  saveChatList: (chatList) => {
    localStorage.setItem(STORAGE_KEYS.CHAT_LIST, JSON.stringify(chatList))
  }
}

// AI Settings Management
export const settingsManager = {
  getAISettings: () => {
    const saved = localStorage.getItem(STORAGE_KEYS.AI_SETTINGS)
    return saved ? JSON.parse(saved) : {
      provider: 'local',
      apiKey: '',
      selectedProvider: 'local'
    }
  },

  saveAISettings: (settings) => {
    localStorage.setItem(STORAGE_KEYS.AI_SETTINGS, JSON.stringify(settings))
  }
}

// User Preferences
export const preferencesManager = {
  getPreferences: () => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES)
    return saved ? JSON.parse(saved) : {
      voiceEnabled: true,
      theme: 'dark',
      language: 'en-US',
      speechRate: 0.9,
      speechPitch: 1,
      speechVolume: 0.8
    }
  },

  savePreferences: (preferences) => {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences))
  }
}

// Storage Information & Debugging
export const storageInfo = {
  // Get storage usage information
  getStorageUsage: () => {
    let totalSize = 0
    const breakdown = {}
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const size = localStorage[key].length
        totalSize += size
        
        if (key.startsWith('ivar-')) {
          const category = key.split('-')[1]
          breakdown[category] = (breakdown[category] || 0) + size
        }
      }
    }
    
    return {
      totalSize: (totalSize / 1024).toFixed(2) + ' KB',
      breakdown,
      itemCount: Object.keys(localStorage).filter(k => k.startsWith('ivar-')).length
    }
  },

  // Clear all IVAR data
  clearAllData: () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('ivar-'))
    keys.forEach(key => localStorage.removeItem(key))
    return keys.length
  },

  // Export all data
  exportData: () => {
    const data = {}
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('ivar-')) {
        data[key] = localStorage[key]
      }
    })
    return JSON.stringify(data, null, 2)
  },

  // Import data
  importData: (jsonData) => {
    try {
      const data = JSON.parse(jsonData)
      Object.keys(data).forEach(key => {
        if (key.startsWith('ivar-')) {
          localStorage.setItem(key, data[key])
        }
      })
      return true
    } catch (error) {
      console.error('Failed to import data:', error)
      return false
    }
  }
}

// Helper function to generate conversation title
function getConversationTitle(messages) {
  const userMessages = messages.filter(m => m.isUser)
  if (userMessages.length > 0) {
    const firstMessage = userMessages[0].text
    return firstMessage.length > 30 
      ? firstMessage.substring(0, 30) + '...'
      : firstMessage
  }
  return 'New Conversation'
}

// Debug function to see all stored data
export const debugStorage = () => {
  console.group('🗄️ IVAR Storage Debug')
  console.log('📊 Storage Usage:', storageInfo.getStorageUsage())
  console.log('💾 AI Settings:', settingsManager.getAISettings())
  console.log('💬 Chat List:', chatManager.getChatList())
  console.log('⚙️ User Preferences:', preferencesManager.getPreferences())
  console.log('🔑 All IVAR Keys:', Object.keys(localStorage).filter(k => k.startsWith('ivar-')))
  console.groupEnd()
} 