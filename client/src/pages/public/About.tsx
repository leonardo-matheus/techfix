import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, Users, Zap } from 'lucide-react'
import { Team } from '@/components/landing/Team'
import { Banner } from '@/components/landing/Banner'

const values = [
  {
    icon: Target,
    title: 'Foco no Cliente',
    description: 'Colocamos as necessidades dos nossos clientes no centro de tudo que fazemos.',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description: 'Comunicação clara e honesta em todos os momentos do projeto.',
  },
  {
    icon: Heart,
    title: 'Paixão',
    description: 'Amamos o que fazemos e isso se reflete na qualidade do nosso trabalho.',
  },
  {
    icon: Award,
    title: 'Excelência',
    description: 'Buscamos constantemente superar expectativas e entregar o melhor.',
  },
  {
    icon: Users,
    title: 'Colaboração',
    description: 'Trabalhamos em parceria com nossos clientes para alcançar os melhores resultados.',
  },
  {
    icon: Zap,
    title: 'Inovação',
    description: 'Estamos sempre atualizados com as últimas tecnologias e tendências.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
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
            <span className="text-primary font-medium">Sobre Nós</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              Transformando ideias em{' '}
              <span className="text-gradient">realidade digital</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Somos uma empresa de desenvolvimento de software focada em criar
              soluções inovadoras que impulsionam negócios. Com mais de 5 anos
              de experiência, já ajudamos dezenas de empresas a alcançarem seus
              objetivos através da tecnologia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A TechFix nasceu em 2019 com um propósito claro: democratizar
                  o acesso a soluções tecnológicas de qualidade para empresas de
                  todos os tamanhos.
                </p>
                <p>
                  Começamos como uma pequena equipe de desenvolvedores apaixonados
                  e crescemos para nos tornar uma empresa reconhecida no mercado,
                  sempre mantendo nossos valores e compromisso com a excelência.
                </p>
                <p>
                  Hoje, contamos com uma equipe multidisciplinar de profissionais
                  altamente qualificados, prontos para transformar suas ideias em
                  soluções digitais inovadoras.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gradient">5+</div>
                  <div className="text-muted-foreground mt-2">
                    Anos de Experiência
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium">Nossos Valores</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              O que nos guia
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="bg-card rounded-xl p-6 border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <Team />

      {/* CTA */}
      <Banner />
    </main>
  )
}
