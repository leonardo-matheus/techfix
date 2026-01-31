# Prompt para Claude Opus 4.5 - Landing Page + Admin Dashboard

> **Ambiente:** Claude Code CLI via Azure AI Foundry
> **Modelo:** Claude Opus 4.5 (claude-opus-4-5-20251101)

---

## PROMPT COMPLETO

```
Você é um desenvolvedor sênior full-stack. Crie uma landing page profissional e moderna para uma empresa de desenvolvimento de software, junto com um painel administrativo completo.

## STACK TECNOLÓGICA (OBRIGATÓRIA)

### Frontend
- **Framework:** React 18+ com TypeScript
- **Build Tool:** Vite (configurar completamente)
- **UI Library:** shadcn/ui + Tailwind CSS
- **Animações:** Framer Motion (animações fluidas e profissionais)
- **Ícones:** Lucide React
- **Roteamento:** React Router DOM v6
- **Estado Global:** Zustand
- **Formulários:** React Hook Form + Zod (validação)
- **Charts/Analytics:** Recharts
- **HTTP Client:** Axios com interceptors

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js com TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Autenticação:** JWT + bcrypt
- **Upload de Arquivos:** Multer
- **Validação:** Zod

## ESTRUTURA DE PASTAS

techfix/
├── client/                          # Frontend React
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Componentes shadcn/ui
│   │   │   ├── layout/              # Header, Footer, Sidebar
│   │   │   ├── landing/             # Componentes da landing page
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Services.tsx
│   │   │   │   ├── Projects.tsx
│   │   │   │   ├── Testimonials.tsx
│   │   │   │   ├── Team.tsx
│   │   │   │   ├── Contact.tsx
│   │   │   │   └── Banner.tsx
│   │   │   └── admin/               # Componentes do painel admin
│   │   │       ├── Dashboard/
│   │   │       ├── Projects/
│   │   │       ├── Banners/
│   │   │       ├── Analytics/
│   │   │       └── Settings/
│   │   ├── pages/
│   │   │   ├── public/              # Páginas públicas
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── ProjectDetails.tsx
│   │   │   │   └── Contact.tsx
│   │   │   └── admin/               # Páginas do admin
│   │   │       ├── Login.tsx
│   │   │       ├── Dashboard.tsx
│   │   │       ├── ProjectsManager.tsx
│   │   │       ├── BannersManager.tsx
│   │   │       ├── AnalyticsPage.tsx
│   │   │       └── Settings.tsx
│   │   ├── hooks/                   # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useAnalytics.ts
│   │   │   └── useProjects.ts
│   │   ├── store/                   # Zustand stores
│   │   │   ├── authStore.ts
│   │   │   └── uiStore.ts
│   │   ├── services/                # API services
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── projectsService.ts
│   │   │   └── analyticsService.ts
│   │   ├── lib/                     # Utilitários
│   │   │   ├── utils.ts
│   │   │   └── cn.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── types/                   # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── components.json             # Config shadcn/ui
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
│
├── server/                          # Backend Node.js
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── projectsController.ts
│   │   │   ├── bannersController.ts
│   │   │   └── analyticsController.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── cors.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── trackVisit.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── projects.ts
│   │   │   ├── banners.ts
│   │   │   └── analytics.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   └── analyticsService.ts
│   │   ├── utils/
│   │   │   └── jwt.ts
│   │   ├── config/
│   │   │   └── cors.ts
│   │   └── index.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── uploads/                     # Pasta para uploads
│   ├── tsconfig.json
│   └── package.json
│
├── .env.example
├── docker-compose.yml              # PostgreSQL + pgAdmin
└── README.md

## LANDING PAGE - REQUISITOS

### Seções Obrigatórias
1. **Hero Section**
   - Título impactante com animação de digitação (typewriter)
   - Subtítulo com fade-in
   - CTA button com hover animado
   - Background com gradient animado ou particles
   - Scroll indicator animado

2. **Serviços**
   - Cards com hover 3D (Framer Motion)
   - Ícones animados
   - Reveal on scroll (stagger animation)

3. **Projetos/Portfólio**
   - Grid responsivo com filtros
   - Cards com overlay animado
   - Modal de detalhes com animação
   - Lazy loading de imagens
   - Dados vindos do backend (gerenciáveis pelo admin)

4. **Depoimentos**
   - Carousel/Slider suave
   - Autoplay com pause on hover
   - Indicadores animados

5. **Equipe**
   - Cards com flip animation
   - Links para redes sociais
   - Hover com reveal de informações

6. **Contato**
   - Formulário validado
   - Animação de envio
   - Toast de feedback
   - Integração com backend

7. **Banners/CTAs**
   - Banners promocionais gerenciáveis
   - Animações de entrada/saída

### Animações Obrigatórias (Framer Motion)
- Page transitions suaves
- Scroll-triggered animations
- Stagger animations em listas
- Hover effects em todos os elementos interativos
- Loading states animados
- Micro-interactions em botões e inputs
- Parallax sutil no hero
- Smooth scroll behavior

### UI/UX
- Design system consistente
- Dark/Light mode toggle
- Mobile-first responsivo
- Skeleton loaders
- Error states elegantes
- Empty states
- Acessibilidade (ARIA labels, keyboard navigation)

## PAINEL ADMINISTRATIVO - REQUISITOS

### Dashboard Principal
- **Cards de métricas:**
  - Total de visitas (hoje, semana, mês)
  - Visualizações de projetos
  - Leads/contatos recebidos
  - Taxa de conversão

- **Gráficos (Recharts):**
  - Line chart: Visitas ao longo do tempo
  - Bar chart: Projetos mais visualizados
  - Pie chart: Origem do tráfego
  - Area chart: Tendências

- **Tabela de atividades recentes:**
  - Últimas visitas
  - Últimos contatos
  - Ações realizadas

### Gerenciamento de Projetos
- CRUD completo
- Upload de imagens (múltiplas)
- Editor de descrição (rich text ou markdown)
- Categorias/tags
- Status (rascunho, publicado, destacado)
- Ordenação drag-and-drop
- Preview antes de publicar

### Gerenciamento de Banners
- CRUD completo
- Upload de imagem
- Configurar link de destino
- Agendar exibição (data início/fim)
- Posição na página
- Status ativo/inativo

### Analytics Detalhado
- Filtros por período
- Gráficos interativos
- Exportar dados (CSV)
- Métricas por página
- Métricas por projeto
- Dispositivos (mobile/desktop)
- Geolocalização (país/cidade)

### Configurações
- Informações da empresa
- Redes sociais
- SEO (meta tags)
- Cores/tema do site
- Backup de dados

## CONFIGURAÇÕES TÉCNICAS

### Vite Config (client/vite.config.ts)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

### CORS Config (server/src/config/cors.ts)
```typescript
import cors from 'cors'

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean)

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
```

### Prisma Schema
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  EDITOR
}

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  content     String?  @db.Text
  images      String[]
  category    String
  tags        String[]
  status      ProjectStatus @default(DRAFT)
  featured    Boolean  @default(false)
  order       Int      @default(0)
  views       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  analytics   ProjectAnalytics[]
}

enum ProjectStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model Banner {
  id        String   @id @default(cuid())
  title     String
  image     String
  link      String?
  position  String
  active    Boolean  @default(true)
  startDate DateTime?
  endDate   DateTime?
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Visit {
  id         String   @id @default(cuid())
  page       String
  referrer   String?
  userAgent  String?
  ip         String?
  country    String?
  city       String?
  device     String?
  browser    String?
  createdAt  DateTime @default(now())
}

model ProjectAnalytics {
  id        String   @id @default(cuid())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Settings {
  id           String @id @default("settings")
  companyName  String @default("TechFix")
  email        String @default("")
  phone        String @default("")
  address      String @default("")
  socialLinks  Json   @default("{}")
  seoTitle     String @default("")
  seoDesc      String @default("")
  updatedAt    DateTime @updatedAt
}
```

## PADRÕES DE CÓDIGO

### Componente React (exemplo)
```tsx
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeroProps {
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function Hero({ className }: HeroProps) {
  return (
    <motion.section
      className={cn('min-h-screen flex items-center', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold"
          variants={itemVariants}
        >
          Transformamos ideias em <span className="text-primary">soluções digitais</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-xl text-muted-foreground max-w-2xl"
          variants={itemVariants}
        >
          Desenvolvimento de software sob medida para impulsionar seu negócio.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8">
          <Button size="lg" className="group">
            Fale Conosco
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
```

## INSTRUÇÕES DE EXECUÇÃO

Após criar todos os arquivos, forneça instruções claras para:

1. **Setup inicial:**
```bash
# Instalar dependências do client
cd client && npm install

# Instalar dependências do server
cd ../server && npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

2. **Configurar banco de dados:**
```bash
# Subir PostgreSQL com Docker
docker-compose up -d

# Rodar migrations
cd server && npx prisma migrate dev

# Seed inicial
npx prisma db seed
```

3. **Rodar em desenvolvimento:**
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

## ENTREGÁVEIS

1. Todos os arquivos da estrutura completa
2. Componentes shadcn/ui configurados
3. Animações Framer Motion implementadas
4. API REST completa com autenticação
5. Sistema de analytics funcionando
6. Painel admin completo
7. Dark/Light mode
8. Responsividade completa
9. README com documentação
10. Docker compose para desenvolvimento

## OBSERVAÇÕES IMPORTANTES

- Use TypeScript strict mode
- Implemente error boundaries
- Use React.lazy para code splitting
- Otimize imagens com lazy loading
- Implemente SEO básico (meta tags dinâmicas)
- Use CSS-in-JS apenas quando necessário (prefira Tailwind)
- Mantenha componentes pequenos e reutilizáveis
- Documente props com JSDoc quando necessário
- Use ESLint + Prettier configurados

Comece criando a estrutura de pastas e os arquivos de configuração, depois implemente os componentes da landing page com todas as animações, e por fim o painel administrativo completo.
```

---

## COMO USAR ESTE PROMPT

1. Copie todo o conteúdo dentro do bloco de código acima (entre os ```)
2. Cole no Claude Code (terminal)
3. O Claude irá criar toda a estrutura automaticamente
4. Siga as instruções de execução fornecidas

---

## JUSTIFICATIVA DAS ESCOLHAS

### Por que React e não Vue?
| Critério | React | Vue |
|----------|-------|-----|
| **Dashboards complexos** | Melhor | Bom |
| **Ecossistema** | 44.7% dos devs | ~18% |
| **Bibliotecas de UI** | Mais opções | Menos opções |
| **Animações (Framer Motion)** | Nativo | Precisa adaptação |
| **Contratação/Comunidade** | Maior | Menor |

### Por que shadcn/ui?
- Controle total do código (não é dependência)
- Baseado em Radix UI (acessibilidade)
- Combina perfeitamente com Tailwind CSS
- 66k stars no GitHub
- Fácil customização

### Por que Framer Motion?
- Biblioteca oficial para React
- API declarativa e intuitiva
- Usado por Stripe, Notion, Framer
- Suporte a gestures e layout animations
- Bundle otimizado (~32kb gzipped)

### Por que Recharts?
- Feito especificamente para React
- Componentes declarativos
- Boa performance com até 100 data points
- Fácil customização
- 24.8k stars no GitHub

---

## FONTES DA PESQUISA

### React vs Vue
- [Vue vs React: A Complete 2026 Comparison](https://www.thefrontendcompany.com/posts/vue-vs-react)
- [Angular vs React vs Vue.js Performance Guide 2026](https://blog.logrocket.com/angular-vs-react-vs-vue-js-performance/)
- [React vs Vue: Which One To Choose in 2026?](https://pagepro.co/blog/react-vs-vue-comparison/)

### UI Libraries
- [14 Best React UI Component Libraries in 2026](https://www.untitledui.com/blog/react-component-libraries)
- [React UI libraries in 2025: Comparing shadcn/ui, Radix, Mantine, MUI](https://makersden.io/blog/react-ui-libs-2025-comparing-shadcn-radix-mantine-mui-chakra)
- [The best React UI component libraries of 2026](https://blog.croct.com/post/best-react-ui-component-libraries)

### Animation Libraries
- [Beyond Eye Candy: Top 7 React Animation Libraries 2026](https://www.syncfusion.com/blogs/post/top-react-animation-libraries)
- [Top React Animation Libraries: Framer Motion, GSAP](https://dev.to/ciphernutz/top-react-animation-libraries-framer-motion-gsap-react-spring-and-more-4854)
- [Motion — JavaScript & React animation library](https://motion.dev/)

### Chart Libraries
- [Best React chart libraries 2025 update](https://blog.logrocket.com/best-react-chart-libraries-2025/)
- [React Dashboard Libraries: Which One To Use in 2025?](https://www.luzmo.com/blog/react-dashboard)
- [Best Chart Libraries for React Projects in 2026](https://weavelinx.com/best-chart-libraries-for-react-projects-in-2026/)
