import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { RequirementCategory } from '../App'

interface HeaderProps {
  currentCategory: RequirementCategory
  onCategoryChange: (category: RequirementCategory) => void
}

const Header = ({ currentCategory, onCategoryChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ]

  const categories = [
    { id: 'wedding' as RequirementCategory, name: 'Wedding', color: 'text-wedding-300' },
    { id: 'party' as RequirementCategory, name: 'Party', color: 'text-purple-300' },
    { id: 'corporate' as RequirementCategory, name: 'Corporate', color: 'text-blue-300' },
    { id: 'casual' as RequirementCategory, name: 'Casual', color: 'text-gray-300' },
  ]

  return (
    <header className="relative z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">A</span>
                </div>
                <span className="text-white font-bold text-xl">Askwinn</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-gray-300 text-sm">Category:</span>
            <select
              value={currentCategory}
              onChange={(e) => onCategoryChange(e.target.value as RequirementCategory)}
              className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="bg-gray-900 text-white">
                  {category.name}
                </option>
              ))}
            </select>
            <button className="btn-secondary text-sm">
              Get Template
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/20 rounded-lg mt-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t border-gray-700 pt-4">
                <div className="px-3 py-2">
                  <label className="text-gray-300 text-sm block mb-2">Category:</label>
                  <select
                    value={currentCategory}
                    onChange={(e) => onCategoryChange(e.target.value as RequirementCategory)}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className="bg-gray-900 text-white">
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
