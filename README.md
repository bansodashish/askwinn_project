# Askwinn - AI-Powered Fashion Automation Platform

Askwinn is an intelligent automation platform that helps users find perfect attire for various occasions, with a focus on wedding dresses and formal wear. Built with React, TypeScript, and TailwindCSS.

## 🌟 Features

- **AI-Powered Chatbot**: Intelligent conversation system to understand user requirements
- **Dynamic Forms**: Smart forms that adapt based on user preferences and event categories
- **Category-Based Theming**: Dynamic color schemes that change based on requirement type (Wedding, Party, Corporate, Casual)
- **Responsive Design**: Mobile-first design with beautiful animations and transitions
- **Multi-Step Process**: Guided user experience for collecting detailed requirements

## 🎯 Target Categories

- **Wedding**: Bride and groom attire coordination
- **Party**: Event-specific outfit recommendations
- **Corporate**: Professional wardrobe solutions
- **Casual**: Everyday styling assistance

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/askwinn-automation.git
cd askwinn-automation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header with category selector
│   ├── Hero.tsx            # Landing page hero section
│   ├── Features.tsx        # Features showcase
│   ├── Chatbot.tsx         # AI chatbot component
│   ├── RequirementForm.tsx # Multi-step requirement form
│   └── Footer.tsx          # Site footer
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.css              # Global styles with TailwindCSS
└── App.css                # Component-specific styles
```

## 🎨 Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom color schemes
- **Icons**: Lucide React
- **Animations**: Framer Motion (ready for implementation)
- **Build Tool**: Vite
- **Development**: ESLint + TypeScript

## 🌈 Theme System

The application features a dynamic theming system that changes colors based on the selected category:

- **Wedding**: Pink/Rose theme (`gradient-wedding`)
- **Party**: Purple theme
- **Corporate**: Blue theme
- **Default**: Dark slate theme (`gradient-bg`)

## 🤖 AI Chatbot Features

- Context-aware conversations based on selected category
- Pre-defined quick questions for faster interaction
- Dynamic response generation
- Seamless handoff to requirement forms

## 📋 Requirement Form Features

- Multi-step wizard interface
- Category-specific form fields
- Input validation
- Progress tracking
- Data collection for:
  - Event details (type, date, venue)
  - Style preferences
  - Budget constraints
  - Contact information

## 🚀 Deployment

### AWS Amplify Deployment

1. Install AWS Amplify CLI:
```bash
npm install -g @aws-amplify/cli
```

2. Initialize Amplify:
```bash
amplify init
```

3. Add hosting:
```bash
amplify add hosting
```

4. Deploy:
```bash
amplify publish
```

### Hostinger Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` folder contents to your Hostinger hosting directory

### Other Hosting Options

The build output in the `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_endpoint
VITE_CHATBOT_API_KEY=your_chatbot_api_key
```

### Customization

- **Colors**: Modify `tailwind.config.js` to update the theme colors
- **Categories**: Add new categories in `App.tsx` and update corresponding components
- **Chatbot Logic**: Enhance conversation flow in `Chatbot.tsx`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Best Practices

- TypeScript for type safety
- Component-based architecture
- Responsive design principles
- Accessibility considerations
- SEO-friendly structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@askwinn.com
- Documentation: [docs.askwinn.com](https://docs.askwinn.com)
- Issues: [GitHub Issues](https://github.com/yourusername/askwinn-automation/issues)

## 🗺️ Roadmap

- [ ] Real AI integration (OpenAI/Claude)
- [ ] User authentication system
- [ ] Database integration
- [ ] Advanced styling recommendations
- [ ] Image upload and analysis
- [ ] Integration with fashion retailers
- [ ] Mobile app development
- [ ] Advanced analytics dashboard

---

Built with ❤️ by the Askwinn Team
