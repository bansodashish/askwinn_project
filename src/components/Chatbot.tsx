import { useState, useEffect } from 'react'
import { X, Send, Bot, User } from 'lucide-react'
import type { RequirementCategory } from '../App'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
  category: RequirementCategory
}

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: Date
}

const Chatbot = ({ isOpen, onClose, category }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi! I'm your AI assistant powered by Gemini 2.0 Flash for ${category} requirements. I'm here to help you find the perfect attire. What kind of event are you planning for?`,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Initialize Gemini AI with error handling
  let genAI: GoogleGenerativeAI
  let model: any
  
  try {
    genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" })
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error)
  }

  // Debug function for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log('Input changing to:', value) // Debug log
    setInputValue(value)
  }

  // Debug when chatbot opens
  useEffect(() => {
    if (isOpen) {
      console.log('Chatbot opened, ready for input')
    }
  }, [isOpen])

  const getSystemPrompt = (category: RequirementCategory) => {
    const basePrompt = `You are an expert AI assistant for Askwinn, a premium ${category} attire consultation platform. You specialize in helping customers find perfect clothing and styling solutions.`
    
    switch (category) {
      case 'wedding':
        return `${basePrompt}

SPECIALIZATION: Wedding attire expert for brides and grooms
EXPERTISE: Wedding dresses, suits, accessories, styling, venue-appropriate choices
TONE: Warm, enthusiastic, knowledgeable, romantic but professional

KEY AREAS:
- Bridal gowns (traditional, modern, vintage, bohemian styles)
- Groom's attire (tuxedos, suits, traditional wear)
- Wedding party coordination
- Venue-appropriate styling (indoor/outdoor, beach, garden, church)
- Seasonal considerations
- Budget-conscious recommendations
- Cultural and religious requirements

APPROACH:
- Ask clarifying questions about venue, season, style preferences
- Provide specific brand and style recommendations
- Consider budget constraints
- Suggest coordinating accessories
- Offer styling tips for the complete look
- Be encouraging and help make their special day perfect

Always end responses with helpful follow-up questions to gather more details for better recommendations.`

      case 'party':
        return `${basePrompt}

SPECIALIZATION: Party and event attire expert
EXPERTISE: Cocktail dresses, formal wear, party outfits, occasion styling
TONE: Fun, stylish, trendy, confident

KEY AREAS:
- Cocktail and party dresses
- Formal evening wear
- Smart casual outfits
- Anniversary and celebration attire
- Age-appropriate styling
- Trend-conscious recommendations
- Versatile pieces for multiple occasions

Always suggest complete looks including accessories and provide styling tips.`

      default:
        return `${basePrompt}

SPECIALIZATION: Professional and corporate attire expert
EXPERTISE: Business suits, formal wear, interview outfits, workplace styling
TONE: Professional, confident, polished

KEY AREAS:
- Business professional attire
- Interview outfits
- Conference and meeting wear
- Corporate event styling
- Industry-specific dress codes
- Professional accessories
- Versatile wardrobe building

Focus on building a professional image while maintaining personal style.`
    }
  }

  const getWelcomeQuestions = (category: RequirementCategory) => {
    switch (category) {
      case 'wedding':
        return [
          "What's your wedding date?",
          "What's your preferred style?",
          "What's your budget range?",
          "Indoor or outdoor ceremony?"
        ]
      case 'party':
        return [
          "What type of party?",
          "What's the dress code?",
          "Daytime or evening?",
          "What's your style preference?"
        ]
      default:
        return [
          "Tell me about your event",
          "What's your style preference?",
          "What's your budget?",
          "Any specific requirements?"
        ]
    }
  }

  const quickQuestions = getWelcomeQuestions(category)

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    try {
      // Check if model is available
      if (!model) {
        return "I'm having trouble connecting to my AI brain right now, but I'm still here to help! Could you tell me more about what you're looking for?"
      }

      const systemPrompt = getSystemPrompt(category)
      
      // Build conversation history for context
      const conversationHistory = messages
        .slice(1) // Skip the initial bot welcome message
        .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n')
      
      const fullPrompt = `${systemPrompt}

CONVERSATION HISTORY:
${conversationHistory}

USER MESSAGE: ${userMessage}

INSTRUCTIONS:
- Provide helpful, specific advice about ${category} attire
- Ask relevant follow-up questions to better understand their needs
- Keep responses conversational but informative
- Suggest specific styles, brands, or options when appropriate
- Consider budget, venue, season, and personal style
- Maximum 150 words per response

RESPONSE:`

      const result = await model.generateContent(fullPrompt)
      const response = result.response
      return response.text()
    } catch (error) {
      console.error('Gemini AI Error:', error)
      
      // Fallback responses based on category
      const fallbackResponses: Record<RequirementCategory, string> = {
        wedding: "I'd love to help you find the perfect wedding attire! Could you tell me about your wedding date, venue type (indoor/outdoor), and style preferences? This will help me give you better recommendations.",
        party: "Great! I'm here to help with party attire. What type of event are you attending? Is it formal, casual, or somewhere in between? And what's the time of day?",
        corporate: "I can definitely help with professional attire! Are you looking for everyday business wear, interview outfits, or special corporate event attire? What's your industry?",
        casual: "I'm here to help with casual attire! What's the occasion you're dressing for? Is it a casual day out, weekend plans, or something specific?"
      }
      
      return fallbackResponses[category] || "I apologize, but I'm having trouble connecting to my AI brain right now. Could you please try asking your question again? I'm here to help you find the perfect attire!"
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    try {
      // Get AI response
      const botResponseText = await generateBotResponse(currentInput)
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponseText,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error in handleSendMessage:', error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your request right now. Could you please try again?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickQuestion = async (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      const botResponseText = await generateBotResponse(question)
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponseText,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error in handleQuickQuestion:', error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your question right now. Could you please try again?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-sm text-gray-500 capitalize">{category} Specialist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-4 py-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          {/* Debug info */}
          <div className="text-xs text-gray-500 mb-2">
            Debug: Input value = "{inputValue}" | Typing: {isTyping ? 'Yes' : 'No'}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Type your message..."
              disabled={isTyping}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              autoComplete="off"
              autoFocus
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
