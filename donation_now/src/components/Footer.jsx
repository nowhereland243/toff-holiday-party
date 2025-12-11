export default function Footer() {
  return (
    <footer className="bg-rhodium-dark border-t border-rhodium-orange/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold text-gradient">
            RHODIUM
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-rhodium-light/60 hover:text-rhodium-orange transition-colors">
              Twitter
            </a>
            <a href="#" className="text-rhodium-light/60 hover:text-rhodium-orange transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-rhodium-light/60 hover:text-rhodium-orange transition-colors">
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-rhodium-orange/10 text-center text-rhodium-light/40 text-sm">
          © 2025 Rhodium Software. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
