import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, X, Key, Brain, Zap, Globe } from 'lucide-react'

const AISettings = ({ isOpen, onClose, onSave }) => {
  const [settings, setSettings] = useState({
    provider: 'local',
    apiKey: '',
    selectedProvider: 'local'
  })

  const providers = [
    {
      id: 'local',
      name: 'Local Responses',
      description: 'Basic pattern matching (no API key needed)',
      icon: Brain,
      free: true,
      setup: 'No setup required - works immediately!'
    },
    {
      id: 'google',
      name: 'Google Gemini',
      description: 'Free & powerful AI from Google',
      icon: Globe,
      free: true,
      setup: '1. Go to aistudio.google.com\n2. Sign in with Google\n3. Create API key\n4. Paste below'
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      description: 'Open source AI models',
      icon: Zap,
      free: true,
      setup: '1. Create account at huggingface.co\n2. Go to Settings → Access Tokens\n3. Create new token\n4. Paste below'
    },
    {
      id: 'openai',
      name: 'OpenAI GPT',
      description: '$5 free credits for new users',
      icon: Key,
      free: false,
      setup: '1. Sign up at platform.openai.com\n2. Add phone number\n3. Get $5 free credits\n4. Create API key'
    }
  ]

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('ivar-ai-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('ivar-ai-settings', JSON.stringify(settings))
    onSave(settings)
    onClose()
  }

  const handleProviderChange = (providerId) => {
    setSettings(prev => ({
      ...prev,
      selectedProvider: providerId,
      provider: providerId
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3
            }}
            className="bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-10 h-10 bg-ai-blue rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Settings className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Settings</h2>
                  <p className="text-sm text-gray-400">Configure your AI provider</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>

            <motion.div 
              className="space-y-4 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Choose AI Provider</h3>
              
              {providers.map((provider, index) => {
                const Icon = provider.icon
                const isSelected = settings.selectedProvider === provider.id
                
                return (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-ai-blue bg-ai-blue/10 shadow-lg shadow-ai-blue/20'
                        : 'border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700'
                    }`}
                    onClick={() => handleProviderChange(provider.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <motion.div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isSelected ? 'bg-ai-blue' : 'bg-slate-600'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: isSelected ? 1.1 : 1 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-white font-medium">{provider.name}</h4>
                          {provider.free && (
                            <motion.span 
                              className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + 0.1 * index }}
                            >
                              FREE
                            </motion.span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{provider.description}</p>
                        
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, scale: 0.95 }}
                              animate={{ opacity: 1, height: 'auto', scale: 1 }}
                              exit={{ opacity: 0, height: 0, scale: 0.95 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="mt-3 p-3 bg-slate-800 rounded-lg border border-slate-600"
                            >
                              <h5 className="text-white font-medium mb-2">Setup Instructions:</h5>
                              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                                {provider.setup}
                              </pre>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            <AnimatePresence>
              {settings.selectedProvider !== 'local' && (
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-white font-medium mb-2">
                    API Key for {providers.find(p => p.id === settings.selectedProvider)?.name}
                  </label>
                  <motion.input
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="Paste your API key here..."
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ai-blue focus:ring-2 focus:ring-ai-blue/20 transition-all duration-300"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Your API key is stored locally and never shared
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              className="flex space-x-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3 bg-ai-blue hover:bg-ai-blue/80 text-white rounded-lg transition-all duration-300 shadow-lg shadow-ai-blue/20"
              >
                Save Settings
              </motion.button>
            </motion.div>

            <motion.div 
              className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-white font-medium mb-2">💡 Recommendations</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Google Gemini</strong> - Best free option with generous limits</li>
                <li>• <strong>Hugging Face</strong> - Great for privacy-focused users</li>
                <li>• <strong>OpenAI</strong> - Highest quality but uses paid credits</li>
                <li>• <strong>Local</strong> - Works offline but limited capabilities</li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AISettings 