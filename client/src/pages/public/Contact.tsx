import { Contact as ContactSection } from '@/components/landing/Contact'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-24 gradient-mesh">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium">Contato</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              Entre em <span className="text-gradient">contato</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Estamos prontos para ouvir suas ideias e ajudar a transformá-las
              em soluções digitais inovadoras. Entre em contato conosco!
            </p>
          </motion.div>
        </div>
      </section>

      <ContactSection />
    </main>
  )
}
