import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeatureSection from './components/FeatureSection'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-rhodium-dark">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  )
}

export default App
