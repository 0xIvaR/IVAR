// Application Constants
export const APP_NAME = 'IVAR'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'AI Voice Assistant like Google Assistant and Siri'

// API Configuration
export const API_ENDPOINTS = {
  OPENAI: 'https://api.openai.com/v1',
  GOOGLE: 'https://generativelanguage.googleapis.com/v1beta',
  HUGGINGFACE: 'https://api-inference.huggingface.co/models'
}

// Voice Recognition Settings
export const VOICE_SETTINGS = {
  LANGUAGE: 'en-US',
  CONTINUOUS: true,
  INTERIM_RESULTS: true,
  MAX_ALTERNATIVES: 1
}

// Default AI Settings
export const DEFAULT_AI_SETTINGS = {
  PROVIDER: 'local',
  MODEL: 'gpt-3.5-turbo',
  TEMPERATURE: 0.7,
  MAX_TOKENS: 150
}

// UI Constants
export const THEME_COLORS = {
  AI_BLUE: '#4285f4',
  AI_GREEN: '#34a853', 
  AI_YELLOW: '#fbbc04',
  AI_RED: '#ea4335'
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AI_SETTINGS: 'ivar-ai-settings',
  CONVERSATION: 'ivar-conversation',
  CHAT_LIST: 'ivar-chat-list',
  VOICE_SETTINGS: 'ivar-voice-settings',
  THEME_SETTINGS: 'ivar-theme-settings'
}
