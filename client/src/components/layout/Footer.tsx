import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, Phone, MessageCircle } from 'lucide-react'

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/leonardo-m-silva/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/leonardo-matheus', label: 'GitHub' },
  { icon: MessageCircle, href: 'https://api.whatsapp.com/send?phone=5516997614410&text=Ol%C3%A1', label: 'WhatsApp' },
]

const footerLinks = [
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre', href: '/sobre' },
      { label: 'Projetos', href: '/projetos' },
      { label: 'Contato', href: '/contato' },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Desenvolvimento Web', href: '/servicos/web' },
      { label: 'Desenvolvimento Mobile', href: '/servicos/mobile' },
      { label: 'Consultoria', href: '/servicos/consultoria' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-gradient">TechFix</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Transformamos ideias em soluções digitais. Desenvolvimento de software
              sob medida para impulsionar seu negócio.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contato@techfixbr.com</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(16) 99761-4410</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TechFix. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
