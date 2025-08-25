import { ArrowRight, MessageCircle, FileText, Sparkles } from 'lucide-react'
import type { RequirementCategory } from '../App'

interface HeroProps {
  currentCategory: RequirementCategory
  onStartChat: () => void
  onShowForm: () => void
}

const Hero = ({ currentCategory, onStartChat, onShowForm }: HeroProps) => {
  const getCategoryContent = (category: RequirementCategory) => {
    switch (category) {
      case 'wedding':
        return {
          title: 'Perfect Wedding Attire',
          subtitle: 'AI-Powered Bride & Groom Dress Automation',
          description: 'Find the perfect wedding dress and groom attire with our intelligent automation platform.',
          cta: 'Find Your Dream Dress'
        }
      case 'party':
        return {
          title: 'Party Perfect Outfits',
          subtitle: 'AI-Powered Party Dress Selection',
          description: 'Discover stunning party outfits tailored to your style and occasion.',
          cta: 'Find Party Outfits'
        }
      case 'corporate':
        return {
          title: 'Professional Attire',
          subtitle: 'AI-Powered Corporate Wardrobe',
          description: 'Build a professional wardrobe that makes the right impression.',
          cta: 'Build Professional Look'
        }
      default:
        return {
          title: 'Smart Fashion Automation',
          subtitle: 'AI-Powered Style Solutions',
          description: 'Automate your fashion choices with intelligent recommendations.',
          cta: 'Get Started'
        }
    }
  }

  const content = getCategoryContent(currentCategory)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">NEW GEN AI AUTOMATION PARTNER</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Automate Smarter. Grow
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Faster.
              </span>
              <span className="italic text-gray-300 text-3xl sm:text-5xl lg:text-6xl block mt-2">
                With AI.
              </span>
            </h1>
            <div className="mt-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-2">
                {content.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 font-medium">
                {content.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            {content.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={onStartChat}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start AI Chat</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={onShowForm}
              className="group bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Fill Requirements Form</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Chatbot</h3>
              <p className="text-gray-300 text-sm">Intelligent conversation to understand your exact requirements</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Forms</h3>
              <p className="text-gray-300 text-sm">Dynamic forms that adapt based on your preferences</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Automation</h3>
              <p className="text-gray-300 text-sm">Automated matching and recommendations powered by AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
