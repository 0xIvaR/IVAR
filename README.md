# 🤖 IVAR - AI Voice Assistant

<div align="center">

![IVAR Logo](public/assets/images/logo.png)

**A cutting-edge AI voice assistant with real-time speech processing, multi-provider AI integration, and beautiful React UI**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/0xIvaR/IVAR)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646cff.svg)](https://vitejs.dev/)

[🚀 Live Demo](#) | [📖 Documentation](docs/README.md) | [💡 Examples](examples/README.md) | [🐛 Issues](https://github.com/0xIvaR/IVAR/issues)

</div>

## ✨ Features

- 🎤 **Real-time Voice Recognition** - Advanced speech-to-text with Web Speech API
- 🤖 **Multi-AI Provider Support** - OpenAI GPT, Google Gemini, Hugging Face, and more
- 🗣️ **Natural Voice Synthesis** - High-quality text-to-speech with customizable voices
- 💬 **Interactive Chat Interface** - Beautiful, responsive conversation UI
- 🎨 **Modern Design** - Tailwind CSS with smooth animations and gradients
- 🔧 **Highly Configurable** - Extensive settings for AI providers, voice, and UI
- 📱 **Cross-Platform** - Works on desktop, mobile, and tablet
- 🔒 **Privacy-First** - Local storage, no data collection
- 🚀 **Fast & Lightweight** - Optimized build with Vite

## 📁 Project Structure

```
IVAR/
├── 📁 src/                    # Source code
│   ├── 📁 components/         # React components
│   │   ├── 📁 voice/         # Voice-related components
│   │   ├── 📁 chat/          # Chat interface components
│   │   ├── 📁 ui/            # Reusable UI components
│   │   └── 📁 settings/      # Settings and configuration
│   ├── 📁 services/          # API services and integrations
│   ├── 📁 utils/             # Utility functions
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 styles/            # CSS and styling files
│   └── 📁 constants/         # Application constants
├── 📁 public/                # Static assets
│   └── 📁 assets/            # Images, icons, and media
├── 📁 server/                # Backend server (optional)
├── 📁 docs/                  # Documentation
├── 📁 examples/              # Usage examples and demos
├── 📁 tests/                 # Test files
├── 📁 scripts/               # Build and utility scripts
└── 📁 config/                # Configuration files
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+
- Modern web browser with microphone access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0xIvaR/IVAR.git
   cd IVAR
   ```

2. **Run setup script**
   ```bash
   npm run setup
   ```

3. **Configure API keys** (optional)
   ```bash
   # Edit .env file with your AI provider keys
   cp public/env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Usage Examples

### Basic Voice Interaction
```javascript
import { VoiceRecognition } from './src/components/voice'

const handleVoiceInput = (transcript) => {
  console.log('User said:', transcript)
  // Process with AI service
}

<VoiceRecognition onResult={handleVoiceInput} />
```

### AI Integration
```javascript
import aiService from './src/services/aiService'

// Configure AI provider
aiService.setProvider('openai', 'your-api-key')

// Get AI response
const response = await aiService.getResponse('Hello, how are you?')
```

### Custom Voice Settings
```javascript
const voiceSettings = {
  rate: 1.0,      // Speed
  pitch: 1.0,     // Pitch
  volume: 0.8,    // Volume
  voice: 'Google US English'
}
```

## 🔧 Configuration

### AI Providers

| Provider | Description | Setup |
|----------|-------------|-------|
| **OpenAI** | GPT models (3.5, 4) | [API Key Required](docs/providers/openai.md) |
| **Google** | Gemini Pro | [API Key Required](docs/providers/google.md) |
| **Hugging Face** | Open source models | [API Key Required](docs/providers/huggingface.md) |
| **Local** | Built-in responses | No setup required |

### Voice Options

- **Speech Recognition**: 50+ languages supported
- **Voice Synthesis**: Platform-specific voices
- **Custom Voices**: Upload your own voice models
- **Voice Commands**: Create custom voice shortcuts

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run setup` | Initial project setup |
| `npm run lint` | Lint code |
| `npm run format` | Format code |
| `npm test` | Run tests |

## 🏗️ Architecture

### Component Structure
```
components/
├── voice/          # Voice input/output handling
├── chat/           # Conversation interface
├── ui/             # Reusable UI elements
└── settings/       # Configuration panels
```

### Service Layer
```
services/
├── aiService.js    # AI provider abstraction
├── voiceService.js # Speech recognition/synthesis
└── storageService.js # Local data management
```

### State Management
- React Context for global state
- Local state for component-specific data
- LocalStorage for persistence

## 🎨 Customization

### Themes
- Light/Dark mode support
- Custom color schemes
- Responsive design
- Animation preferences

### Voice Personalities
- Different AI personalities
- Custom response templates
- Voice characteristic settings
- Conversation styles

## 🔒 Privacy & Security

- **No Data Collection**: All conversations stored locally
- **API Key Security**: Environment variable management
- **HTTPS Required**: Secure microphone access
- **Local Processing**: Speech recognition runs in browser

## 📚 Documentation

| Topic | Link |
|-------|------|
| **Getting Started** | [docs/getting-started.md](docs/getting-started.md) |
| **API Reference** | [docs/api-reference.md](docs/api-reference.md) |
| **Deployment** | [docs/deployment.md](docs/DEPLOYMENT.md) |
| **Contributing** | [docs/contributing.md](docs/CONTRIBUTING.md) |
| **Troubleshooting** | [docs/troubleshooting.md](docs/troubleshooting.md) |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style

- ESLint configuration included
- Prettier for code formatting
- Conventional commit messages
- Component-based architecture

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Microphone not working | Check browser permissions |
| AI not responding | Verify API keys in .env |
| Build errors | Run `npm run clean` then `npm install` |
| Voice synthesis fails | Check browser compatibility |

See [Troubleshooting Guide](docs/troubleshooting.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Soham Kundu**
- GitHub: [@0xIvaR](https://github.com/0xIvaR)
- Email: sohamkundu4012@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- OpenAI for AI capabilities
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide for beautiful icons

## 🔗 Links

- [🌟 Star on GitHub](https://github.com/0xIvaR/IVAR)
- [🐛 Report Bug](https://github.com/0xIvaR/IVAR/issues)
- [💡 Request Feature](https://github.com/0xIvaR/IVAR/issues)
- [💬 Discussions](https://github.com/0xIvaR/IVAR/discussions)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/0xIvaR">Soham Kundu</a>
</div>
