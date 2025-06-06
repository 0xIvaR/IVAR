# 🤖 IVAR - Intelligent Voice Assistant & Responder

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge&logo=openai" alt="AI Powered">
  <img src="https://img.shields.io/github/stars/0xIvaR/IVAR?style=for-the-badge" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/0xIvaR/IVAR?style=for-the-badge" alt="GitHub Forks">
</p>

<p align="center">
  <strong>🚀 The Next-Gen AI Voice Assistant - Built for Developers, Designed for Everyone</strong>
</p>

<p align="center">
  A cutting-edge voice assistant that rivals Google Assistant and Siri, featuring multi-provider AI integration, real-time speech processing, and a stunning React interface. Perfect for developers building the future of voice technology.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-setup">API Setup</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

### 🎤 **Voice Recognition & Speech**
- **Real-time voice recognition** with Web Speech API
- **Natural text-to-speech** with multiple voice options
- **Visual feedback** with animated voice waves
- **Push-to-talk & continuous listening** modes

### 🧠 **AI-Powered Intelligence**
- **Multiple AI providers** support:
  - 🆓 Google Gemini (Free & Recommended)
  - 🤗 Hugging Face (Open Source)
  - 🚀 OpenAI GPT (Premium Quality)
  - 🔄 Cohere (Alternative)
- **Context-aware conversations** with memory
- **Natural language processing** for complex queries

### 💬 **Chat Interface**
- **Beautiful, modern UI** with smooth animations
- **Message history** with persistent storage
- **Multiple chat sessions** management
- **Real-time typing indicators**
- **Mobile-responsive design**

### ⚙️ **Customization & Settings**
- **Easy AI provider switching** with visual setup guide
- **Voice settings** (enable/disable speech)
- **Data management** with local storage
- **Debug tools** for developers

### 🔒 **Privacy & Security**
- **Local data storage** - your conversations stay private
- **No data sent to third parties** (except chosen AI provider)
- **API keys stored securely** in browser
- **Open source** - fully auditable code

---

## 🎯 Demo

### Live Features:
- 🗣️ **Voice Commands**: "What's the weather like today?"
- 💭 **Natural Conversations**: Ask follow-up questions
- 🎨 **Beautiful Animations**: Responsive UI with smooth transitions
- 📱 **Mobile Ready**: Works perfectly on phones and tablets

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm 8+
- **Modern browser** with Web Speech API support
- **Microphone access** for voice features

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/0xIvaR/IVAR.git
cd IVAR
npm install
```

### 2. Get Free AI API Key
Choose your preferred provider (we recommend Google Gemini for beginners):

| Provider | Free Tier | Setup Difficulty | Quality |
|----------|-----------|------------------|---------|
| 🥇 **Google Gemini** | ✅ Generous | 🟢 Easy | 🟡 Great |
| 🥈 **Hugging Face** | ✅ Unlimited | 🟢 Easy | 🟡 Good |
| 🥉 **OpenAI** | 💰 $5 Credits | 🟡 Medium | 🟢 Excellent |

📖 **Detailed Setup Guide**: See [FREE_API_GUIDE.md](./FREE_API_GUIDE.md)

### 3. Run Development
```bash
# Start both frontend and backend
npm run dev    # Frontend (React + Vite)
npm run server # Backend (Express) - in another terminal
```

### 4. Configure AI
1. Open http://localhost:5173
2. Click the **Settings** ⚙️ icon
3. Choose your AI provider
4. Follow the visual setup guide
5. Enter your API key
6. Start chatting! 🎉

---

## 🔧 API Setup

### 🆓 Google Gemini (Recommended)
```bash
# 1. Visit: https://aistudio.google.com
# 2. Sign in with Google account
# 3. Create API key
# 4. Copy & paste in IVAR settings
```

### 🤗 Hugging Face (Open Source)
```bash
# 1. Visit: https://huggingface.co
# 2. Create account
# 3. Settings → Access Tokens
# 4. Create token with read permissions
```

### 🚀 OpenAI (Premium)
```bash
# 1. Visit: https://platform.openai.com
# 2. Sign up & verify phone
# 3. Get $5 free credits
# 4. Create API key
```

**Full guide with screenshots**: [FREE_API_GUIDE.md](./FREE_API_GUIDE.md)

---

## 🏗️ Project Structure

```
IVAR/
├── 📁 src/
│   ├── 📄 App.jsx              # Main application
│   ├── 📁 components/          # React components
│   │   ├── VoiceRecognition.jsx   # Voice input handling
│   │   ├── ChatInterface.jsx      # Chat UI
│   │   ├── AISettings.jsx         # AI configuration
│   │   └── WaveAnimation.jsx      # Voice visualizations
│   ├── 📁 services/            # API integrations
│   └── 📁 utils/               # Helper functions
├── 📁 server/                  # Express backend
├── 📄 package.json            # Dependencies
├── 📄 FREE_API_GUIDE.md       # API setup guide
└── 📄 DEPLOYMENT.md           # Deployment instructions
```

---

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run server       # Start backend server
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

### Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express, CORS
- **AI Integration**: OpenAI, Google Gemini, Hugging Face APIs
- **Voice**: Web Speech API (SpeechRecognition, SpeechSynthesis)
- **Storage**: Browser localStorage
- **Deployment**: Docker, Vercel, Netlify ready

---

## 🚀 Deployment

### Quick Deploy Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Drag & drop 'dist' folder to netlify.com
```

#### Docker
```bash
docker-compose up -d
```

**Detailed deployment guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps:
1. 🍴 Fork the repository
2. 🌿 Create feature branch (`git checkout -b feature/amazing-feature`)
3. 💫 Make your changes
4. ✅ Test thoroughly
5. 📝 Commit (`git commit -m 'Add amazing feature'`)
6. 🚀 Push (`git push origin feature/amazing-feature`)
7. 🎯 Open Pull Request

---

## 📊 Roadmap

### Current Version (v1.0.0)
- ✅ Voice recognition & synthesis
- ✅ Multiple AI providers
- ✅ Chat interface with history
- ✅ Local data storage
- ✅ Mobile responsive design

### Upcoming Features
- 🔄 **Smart Home Integration** (Philips Hue, IoT devices)
- 🌐 **Multi-language Support** (Spanish, French, German)
- 📱 **Mobile App** (React Native)
- 🧩 **Plugin System** (Custom commands)
- 🎵 **Music Control** (Spotify, YouTube integration)
- 📅 **Calendar Integration** (Google Calendar, Outlook)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for GPT API and inspiration
- **Google** for Gemini AI and Web Speech API
- **Hugging Face** for open-source AI models
- **React Team** for the amazing framework
- **Community contributors** who make this project better

---

## 📞 Support & Contact

- 🐛 **Bug Reports**: [Create an Issue](https://github.com/0xIvaR/IVAR/issues)
- 💡 **Feature Requests**: [Start a Discussion](https://github.com/0xIvaR/IVAR/discussions)
- 📧 **Email**: sohamkundu4012@gmail.com
- 👨‍💻 **Developer**: [@0xIvaR](https://github.com/0xIvaR)

### 🌟 Show Your Support

If you find IVAR useful, please consider:
- ⭐ **Starring** this repository
- 🍴 **Forking** to contribute
- 📢 **Sharing** with fellow developers
- 💬 **Following** [@0xIvaR](https://github.com/0xIvaR) for updates

---

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=0xIvaR&repo=IVAR&theme=radical&hide_border=true" alt="IVAR Repository Stats">
</p>

<p align="center">
  <strong>🔥 Built with ❤️ by <a href="https://github.com/0xIvaR">Soham Kundu</a> | Ready for the Future of Voice AI 🚀</strong>
</p>

<p align="center">
  <a href="#top">⬆️ Back to Top</a>
</p> 