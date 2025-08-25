import { CheckCircle, Users, Clock, Shield, Star, TrendingUp } from 'lucide-react'
import type { RequirementCategory } from '../App'

interface FeaturesProps {
  currentCategory: RequirementCategory
}

const Features = ({ currentCategory }: FeaturesProps) => {
  const getFeatures = (category: RequirementCategory) => {
    switch (category) {
      case 'wedding':
        return [
          {
            icon: <Users className="w-8 h-8" />,
            title: "Bride & Groom Coordination",
            description: "Perfect matching for both bride and groom attire with complementary styles and colors."
          },
          {
            icon: <Star className="w-8 h-8" />,
            title: "Premium Collections",
            description: "Access to exclusive wedding dress collections from top designers worldwide."
          },
          {
            icon: <Clock className="w-8 h-8" />,
            title: "Timeline Management",
            description: "Automated scheduling for fittings, alterations, and delivery before your big day."
          }
        ]
      case 'party':
        return [
          {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Trending Styles",
            description: "Stay ahead with the latest party fashion trends and seasonal collections."
          },
          {
            icon: <Star className="w-8 h-8" />,
            title: "Occasion Matching",
            description: "Perfect outfits matched to your specific party type and dress code."
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "Group Coordination",
            description: "Coordinate outfits with friends and family for group events."
          }
        ]
      default:
        return [
          {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Smart Automation",
            description: "AI-powered recommendations that learn from your preferences and style."
          },
          {
            icon: <Shield className="w-8 h-8" />,
            title: "Quality Assurance",
            description: "Verified suppliers and quality-checked items for reliable service."
          },
          {
            icon: <Clock className="w-8 h-8" />,
            title: "Fast Processing",
            description: "Quick turnaround times with efficient automation workflows."
          }
        ]
    }
  }

  const features = getFeatures(currentCategory)

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-white">BENEFITS</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose <span className="italic text-gray-300">Us?</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to automate, optimize, and scale your {currentCategory} requirements
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300 text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300 text-sm">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300 text-sm">AI Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300 text-sm">Partner Brands</div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg text-gray-300 italic mb-6">
              "Askwinn's AI automation made finding our perfect wedding attire effortless. 
              The recommendations were spot-on, and the entire process was seamless!"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">SJ</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Sarah & John</div>
                <div className="text-gray-400 text-sm">Wedding Couple</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
