import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Chatbot from './components/Chatbot'
import RequirementForm from './components/RequirementForm'
import Footer from './components/Footer'
import './App.css'

export type RequirementCategory = 'wedding' | 'party' | 'corporate' | 'casual'

function App() {
  const [currentCategory, setCurrentCategory] = useState<RequirementCategory>('wedding')
  const [showChatbot, setShowChatbot] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const getThemeClass = (category: RequirementCategory) => {
    switch (category) {
      case 'wedding':
        return 'gradient-wedding'
      case 'party':
        return 'bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900'
      case 'corporate':
        return 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
      default:
        return 'gradient-bg'
    }
  }

  return (
    <div className={`min-h-screen ${getThemeClass(currentCategory)} transition-all duration-1000`}>
      <Header 
        currentCategory={currentCategory}
        onCategoryChange={setCurrentCategory}
      />
      
      <Hero 
        currentCategory={currentCategory}
        onStartChat={() => setShowChatbot(true)}
        onShowForm={() => setShowForm(true)}
      />
      
      <Features currentCategory={currentCategory} />
      
      <Footer />
      
      {/* Chatbot Modal */}
      {showChatbot && (
        <Chatbot 
          isOpen={showChatbot}
          onClose={() => setShowChatbot(false)}
          category={currentCategory}
        />
      )}
      
      {/* Requirement Form Modal */}
      {showForm && (
        <RequirementForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          category={currentCategory}
        />
      )}
    </div>
  )
}

export default App
