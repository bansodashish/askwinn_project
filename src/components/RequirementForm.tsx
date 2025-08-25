import { useState, useEffect } from 'react'
import { X, Calendar, User, DollarSign, MapPin, Palette } from 'lucide-react'
import type { RequirementCategory } from '../App'

interface RequirementFormProps {
  isOpen: boolean
  onClose: () => void
  category: RequirementCategory
}

interface FormData {
  eventType: string
  eventDate: string
  venue: string
  budget: string
  style: string
  size: string
  color: string
  specialRequests: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

const RequirementForm = ({ isOpen, onClose, category }: RequirementFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    eventType: '',
    eventDate: '',
    venue: '',
    budget: '',
    style: '',
    size: '',
    color: '',
    specialRequests: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  // Reset form when modal opens
  const resetForm = () => {
    setFormData({
      eventType: '',
      eventDate: '',
      venue: '',
      budget: '',
      style: '',
      size: '',
      color: '',
      specialRequests: '',
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    });
    setCurrentStep(1);
  };

  // Reset form when component mounts or category changes
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, category]);

  const getFormFields = (category: RequirementCategory) => {
    switch (category) {
      case 'wedding':
        return {
          eventTypes: ['Traditional Wedding', 'Modern Wedding', 'Destination Wedding', 'Beach Wedding', 'Garden Wedding'],
          styles: ['Classic & Elegant', 'Modern & Chic', 'Bohemian', 'Vintage', 'Princess Style', 'Minimalist'],
          budgetRanges: ['Under $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000 - $10,000', 'Above $10,000']
        }
      case 'party':
        return {
          eventTypes: ['Birthday Party', 'Anniversary', 'Cocktail Party', 'Formal Dinner', 'Dancing Event'],
          styles: ['Glamorous', 'Casual Chic', 'Formal', 'Trendy', 'Classic', 'Bold & Colorful'],
          budgetRanges: ['Under $200', '$200 - $500', '$500 - $1,000', '$1,000 - $2,000', 'Above $2,000']
        }
      default:
        return {
          eventTypes: ['Business Meeting', 'Conference', 'Interview', 'Networking Event', 'Office Party'],
          styles: ['Professional', 'Business Casual', 'Formal', 'Smart Casual', 'Executive'],
          budgetRanges: ['Under $300', '$300 - $600', '$600 - $1,200', '$1,200 - $2,500', 'Above $2,500']
        }
    }
  }

  const formConfig = getFormFields(category)

  const handleInputChange = (field: keyof FormData, value: string) => {
    console.log(`Updating field ${field} with value:`, value); // Debug logging
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      console.log('Updated form data:', updated); // Debug logging
      return updated;
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation check
    if (!formData.eventDate) {
      alert('Please select an event date')
      return
    }
    
    if (!formData.venue.trim()) {
      alert('Please enter a venue or location')
      return
    }
    
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
    alert(`Thank you! Your ${category} requirements have been submitted.\n\nEvent Date: ${formData.eventDate}\nVenue: ${formData.venue}\n\nWe'll contact you soon with personalized recommendations.`)
    onClose()
  }

  const nextStep = () => {
    // Validation for step 1 - Event Details
    if (currentStep === 1) {
      if (!formData.eventType) {
        alert('Please select an event type')
        return
      }
      if (!formData.eventDate) {
        alert('Please select an event date')
        return
      }
      if (!formData.venue.trim()) {
        alert('Please enter a venue or location')
        return
      }
    }
    
    // Validation for step 2 - Style Preferences
    if (currentStep === 2) {
      if (!formData.style) {
        alert('Please select a style preference')
        return
      }
      if (!formData.size.trim()) {
        alert('Please enter a size')
        return
      }
      if (!formData.budget) {
        alert('Please select a budget range')
        return
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 capitalize">
              {category} Requirements Form
            </h3>
            <p className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Event Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Event Details</h4>
              
                            <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Event Type
                </label>
                <select
                  id="eventType"
                  value={formData.eventType}
                  onChange={(e) => handleInputChange('eventType', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                  required
                >
                  <option value="" disabled>Select event type</option>
                  {formConfig.eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Event Date
                </label>
                <input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Venue/Location
                </label>
                <input
                  id="venue"
                  type="text"
                  value={formData.venue}
                  onChange={(e) => handleInputChange('venue', e.target.value)}
                  placeholder="Enter venue name, city, or location type (e.g., 'Beach Resort Miami' or 'Garden Venue')"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          )}

          {/* Step 2: Style Preferences */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Style Preferences</h4>
              
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Preferred Style
                </label>
                <select
                  id="style"
                  value={formData.style}
                  onChange={(e) => handleInputChange('style', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                  required
                >
                  <option value="" disabled>Select style</option>
                  {formConfig.styles.map((style) => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <select
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                  required
                >
                  <option value="" disabled>Select size</option>
                  <option value="XS">XS - Extra Small</option>
                  <option value="S">S - Small</option>
                  <option value="M">M - Medium</option>
                  <option value="L">L - Large</option>
                  <option value="XL">XL - Extra Large</option>
                  <option value="XXL">XXL - Double Extra Large</option>
                  <option value="Custom">Custom Size (specify in special requests)</option>
                </select>
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Color Preferences
                </label>
                <select
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">Select color preference (optional)</option>
                  <option value="White">Classic White</option>
                  <option value="Ivory">Ivory/Cream</option>
                  <option value="Blush">Blush Pink</option>
                  <option value="Champagne">Champagne/Gold</option>
                  <option value="Rose Gold">Rose Gold</option>
                  <option value="Sage Green">Sage Green</option>
                  <option value="Dusty Blue">Dusty Blue</option>
                  <option value="Lavender">Lavender</option>
                  <option value="Burgundy">Burgundy/Wine</option>
                  <option value="Navy">Navy Blue</option>
                  <option value="Black">Black</option>
                  <option value="Silver">Silver/Gray</option>
                  <option value="Custom">Custom Color (specify in special requests)</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Budget Range
                </label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                  required
                >
                  <option value="" disabled>Select budget range</option>
                  {formConfig.budgetRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
              
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  id="contactName"
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special requirements, preferences, or additional information"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors"
              >
                Submit Requirements
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default RequirementForm
