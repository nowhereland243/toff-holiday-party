import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Zap, Shield, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Meticulously crafted software with attention to every detail.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance that exceeds expectations.',
  },
  {
    icon: Shield,
    title: 'Secure by Design',
    description: 'Built with security at the core of every decision.',
  },
  {
    icon: Sparkles,
    title: 'Innovative Solutions',
    description: 'Pushing boundaries with cutting-edge technology.',
  },
]

export default function FeatureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="features" className="py-32 px-6 bg-rhodium-dark-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-gradient">Why Choose</span>
            <br />
            <span className="text-rhodium-light">Rhodium?</span>
          </h2>
          <p className="text-xl text-rhodium-light/70 max-w-2xl mx-auto">
            We combine technical excellence with creative innovation to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 bg-rhodium-dark border border-rhodium-orange/10 rounded-2xl hover:border-rhodium-orange/30 transition-all duration-300 hover:shadow-lg hover:shadow-rhodium-orange/10"
              >
                <div className="mb-6 w-14 h-14 bg-rhodium-orange/10 rounded-xl flex items-center justify-center group-hover:bg-rhodium-orange/20 transition-colors">
                  <Icon className="w-7 h-7 text-rhodium-orange" />
                </div>
                
                <h3 className="text-2xl font-bold text-rhodium-light mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-rhodium-light/60">
                  {feature.description}
                </p>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-rhodium-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
