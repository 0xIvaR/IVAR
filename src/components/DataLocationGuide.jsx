import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Info, X, Download, Upload, Trash2, RefreshCw } from 'lucide-react'
import { storageInfo, debugStorage } from '../utils/dataManager'

const DataLocationGuide = ({ isOpen, onClose }) => {
  const [storageData, setStorageData] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  const loadStorageInfo = () => {
    setStorageData(storageInfo.getStorageUsage())
  }

  const handleExportData = () => {
    const data = storageInfo.exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ivar-data-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all IVAR data? This cannot be undone.')) {
      const cleared = storageInfo.clearAllData()
      alert(`Cleared ${cleared} data items. Please refresh the page.`)
      loadStorageInfo()
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      loadStorageInfo()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Data Storage Guide</h2>
                  <p className="text-sm text-gray-400">Where your IVAR data is stored</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-2 mb-6 bg-slate-700/50 rounded-lg p-1">
              {[
                { id: 'overview', label: 'Overview', icon: Info },
                { id: 'storage', label: 'Storage Usage', icon: Database },
                { id: 'manage', label: 'Manage Data', icon: RefreshCw }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all ${
                    activeTab === tab.id 
                      ? 'bg-ai-blue text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-slate-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">📍 Data Storage Locations</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Conversations:</span>
                        <code className="text-ai-blue bg-slate-800 px-2 py-1 rounded">localStorage["ivar-conversation-*"]</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">AI Settings:</span>
                        <code className="text-ai-blue bg-slate-800 px-2 py-1 rounded">localStorage["ivar-ai-settings"]</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Chat List:</span>
                        <code className="text-ai-blue bg-slate-800 px-2 py-1 rounded">localStorage["ivar-chat-list"]</code>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-2">🔒 Privacy & Security</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• All data is stored locally in your browser</li>
                      <li>• No data is sent to external servers (except to your chosen AI provider)</li>
                      <li>• Your conversations stay on your device</li>
                      <li>• API keys are stored securely in browser storage</li>
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-medium mb-2">💡 Pro Tip</h4>
                    <p className="text-sm text-gray-300">
                      Open your browser's developer console and type <code className="bg-slate-800 px-1 rounded">debugIVAR()</code> 
                      to see detailed information about your stored data!
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'storage' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {storageData && (
                    <>
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-semibold">Storage Usage</h3>
                          <button
                            onClick={loadStorageInfo}
                            className="p-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-slate-800 rounded-lg">
                            <div className="text-2xl font-bold text-ai-blue">{storageData.totalSize}</div>
                            <div className="text-sm text-gray-400">Total Size</div>
                          </div>
                          <div className="text-center p-3 bg-slate-800 rounded-lg">
                            <div className="text-2xl font-bold text-green-400">{storageData.itemCount}</div>
                            <div className="text-sm text-gray-400">Data Items</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-3">Breakdown by Category</h4>
                        <div className="space-y-2">
                          {Object.entries(storageData.breakdown).map(([category, size]) => (
                            <div key={category} className="flex justify-between text-sm">
                              <span className="text-gray-300 capitalize">{category}:</span>
                              <span className="text-white">{(size / 1024).toFixed(2)} KB</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {activeTab === 'manage' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleExportData}
                      className="flex items-center justify-center space-x-2 p-4 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>Export Data</span>
                    </button>
                    
                    <button
                      onClick={() => debugStorage()}
                      className="flex items-center justify-center space-x-2 p-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      <Info className="w-5 h-5" />
                      <span>Debug Info</span>
                    </button>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-medium mb-3">⚠️ Danger Zone</h4>
                    <button
                      onClick={handleClearData}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear All Data</span>
                    </button>
                    <p className="text-sm text-gray-400 mt-2">
                      This will permanently delete all your conversations, settings, and preferences.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DataLocationGuide 