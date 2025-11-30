import { cn } from '../utils/cn'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rhodium-dark/80 backdrop-blur-lg border-b border-rhodium-orange/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gradient">
          RHODIUM
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-rhodium-light/70 hover:text-rhodium-orange transition-colors">
            About
          </a>
          <a href="#features" className="text-rhodium-light/70 hover:text-rhodium-orange transition-colors">
            Features
          </a>
          <a href="#contact" className="text-rhodium-light/70 hover:text-rhodium-orange transition-colors">
            Contact
          </a>
        </div>
        
        <button className="px-6 py-2 bg-rhodium-orange hover:bg-rhodium-orange-light transition-colors rounded-full text-white font-medium">
          Get Started
        </button>
      </div>
    </nav>
  )
}
