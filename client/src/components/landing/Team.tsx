import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Linkedin, Github, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

const team = [
  {
    name: 'Leonardo Matheus',
    role: 'CEO & Software Engineer',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQHhutkMKPRlOw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714816387750?e=1771459200&v=beta&t=_cskDhvETuGfpppfxUUsn_DIQ99Qr6OAhUTLdXhzYRU',
    bio: '7 anos de experiência. Rust, Java Spring, Scala, .NET C#, C++, JavaScript, React, Angular, Vue, Python, PHP Laravel/Laminas/Zend, Ruby on Rails e IoT.',
    social: {
      linkedin: 'https://www.linkedin.com/in/leonardo-m-silva/',
      github: 'https://github.com/leonardo-matheus',
      email: 'contato@techfixbr.com',
    },
  },
  {
    name: 'Gustavo Gouveia',
    role: 'Desenvolvedor Full Stack',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQEykn_wYJFCGw/profile-displayphoto-crop_800_800/B4DZudevMPGgAI-/0/1767873639803?e=1771459200&v=beta&t=09fx-VEsTumAtORTUpGBipPyEVXMry12FcsTnWbCO4Y',
    bio: '3 anos de experiência. PHP, Python, VBA, AutoLISP. Especialista em ERPs, automação de processos e integração com banco de dados.',
    social: {
      linkedin: 'https://www.linkedin.com/in/gustavogouveialacerda/',
      github: 'https://github.com/gustavogouveia1',
      email: 'contato@techfixbr.com',
    },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotateY: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: { duration: 0.6 },
  },
}

export function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium">Nossa Equipe</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Conheça quem faz acontecer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma equipe apaixonada por tecnologia e comprometida com o sucesso
            dos nossos clientes.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="group w-full"
            >
              <div className="bg-card rounded-2xl p-8 border shadow-lg">
                <div className="text-center">
                  <Avatar className="h-32 w-32 mx-auto mb-6 ring-4 ring-primary/20">
                    <AvatarImage src={member.image} />
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-xl">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                  <p className="mt-4 text-muted-foreground">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-4 mt-6">
                    {member.social.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin className="h-5 w-5" />
                      </motion.a>
                    )}
                    {member.social.github && (
                      <motion.a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="h-5 w-5" />
                      </motion.a>
                    )}
                    {member.social.email && (
                      <motion.a
                        href={`mailto:${member.social.email}`}
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Mail className="h-5 w-5" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
