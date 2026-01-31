import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Globe,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Zap,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    icon: Globe,
    title: 'Desenvolvimento Web',
    description:
      'Criamos aplicações web modernas e responsivas com as melhores tecnologias do mercado.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'Desenvolvimento Mobile',
    description:
      'Apps nativos e multiplataforma para iOS e Android com experiência de usuário excepcional.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'Sistemas Personalizados',
    description:
      'ERPs, CRMs e sistemas sob medida para automatizar e otimizar seus processos.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Infraestrutura em nuvem escalável com CI/CD, monitoramento e alta disponibilidade.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Segurança',
    description:
      'Auditoria de segurança, proteção de dados e conformidade com LGPD.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Consultoria Tech',
    description:
      'Orientação estratégica para transformação digital e modernização de sistemas.',
    color: 'from-indigo-500 to-purple-500',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium">Nossos Serviços</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Soluções completas para seu negócio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma gama completa de serviços de desenvolvimento de software
            para atender às necessidades específicas da sua empresa.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card className="h-full group hover:shadow-lg transition-all duration-300 border-transparent hover:border-primary/20">
                <CardHeader>
                  <motion.div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <service.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
