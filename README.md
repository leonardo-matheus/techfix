# TechFix - Landing Page + Admin Dashboard

Sistema completo de landing page profissional com painel administrativo para gerenciamento de conteúdo, analytics e muito mais.

## Stack Tecnológica

### Frontend
- **React 18** com TypeScript
- **Vite** como build tool
- **shadcn/ui** + Tailwind CSS para UI
- **Framer Motion** para animações
- **Lucide React** para ícones
- **React Router DOM v6** para roteamento
- **Zustand** para estado global
- **React Hook Form** + Zod para formulários
- **Recharts** para gráficos
- **Axios** para requisições HTTP

### Backend
- **Node.js 20+** com TypeScript
- **Express.js** como framework
- **Prisma** como ORM
- **PostgreSQL** como banco de dados
- **JWT** + bcrypt para autenticação
- **Multer** para upload de arquivos
- **Zod** para validação

## Estrutura do Projeto

```
techfix/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── layout/      # Header, Footer, Sidebar
│   │   │   ├── landing/     # Componentes da landing
│   │   │   └── admin/       # Componentes do admin
│   │   ├── pages/           # Páginas
│   │   ├── hooks/           # Custom hooks
│   │   ├── store/           # Zustand stores
│   │   ├── services/        # API services
│   │   ├── lib/             # Utilitários
│   │   └── types/           # TypeScript types
│   └── ...
│
├── server/                    # Backend Node.js
│   ├── src/
│   │   ├── controllers/     # Controllers
│   │   ├── middleware/      # Middlewares
│   │   ├── routes/          # Rotas
│   │   ├── services/        # Services
│   │   ├── utils/           # Utilitários
│   │   └── config/          # Configurações
│   ├── prisma/              # Schema e migrations
│   └── uploads/             # Arquivos enviados
│
├── docker-compose.yml        # PostgreSQL + pgAdmin
└── README.md
```

## Pré-requisitos

- Node.js 20+
- Docker e Docker Compose (para PostgreSQL)
- npm ou yarn

## Instalação

### 1. Clone o repositório e instale as dependências

```bash
# Instalar dependências do cliente
cd client
npm install

# Instalar dependências do servidor
cd ../server
npm install
```

### 2. Configurar variáveis de ambiente

```bash
# Na raiz do projeto
cp .env.example .env

# Edite o arquivo .env conforme necessário
```

Conteúdo do `.env`:
```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/techfix?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:5173"
```

### 3. Iniciar o banco de dados

```bash
# Subir PostgreSQL com Docker
docker-compose up -d

# Aguardar o banco iniciar (~10 segundos)
```

**Acesso ao pgAdmin:**
- URL: http://localhost:5050
- Email: admin@techfix.com
- Senha: admin123

### 4. Configurar o banco de dados

```bash
cd server

# Criar as tabelas
npx prisma migrate dev --name init

# Popular com dados de exemplo
npx prisma db seed
```

### 5. Iniciar os servidores

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## Acessos

### Landing Page
- URL: http://localhost:5173

### Painel Administrativo
- URL: http://localhost:5173/admin
- **Usuário:** admin@techfix.com
- **Senha:** admin123

### API
- URL: http://localhost:3001/api
- Health Check: http://localhost:3001/api/health

## Funcionalidades

### Landing Page
- Hero section com animação de digitação
- Seção de serviços com cards animados
- Portfólio de projetos com filtros
- Depoimentos em carousel
- Equipe
- Formulário de contato
- Banner promocional
- Dark/Light mode
- Responsivo (mobile-first)
- Animações com Framer Motion

### Painel Administrativo
- Dashboard com métricas em tempo real
- Gráficos interativos (visitas, dispositivos, etc)
- Gerenciamento de projetos (CRUD)
- Gerenciamento de banners
- Gerenciamento de contatos
- Analytics detalhado
- Configurações do site
- Autenticação JWT

## Scripts Disponíveis

### Cliente (Frontend)
```bash
npm run dev      # Inicia em desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Linting
```

### Servidor (Backend)
```bash
npm run dev        # Inicia em desenvolvimento
npm run build      # Build para produção
npm start          # Inicia o build
npm run db:migrate # Rodar migrations
npm run db:seed    # Seed do banco
npm run db:studio  # Prisma Studio
```

## API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `GET /api/auth/me` - Usuário atual
- `PUT /api/auth/profile` - Atualizar perfil

### Projetos
- `GET /api/projects/public` - Projetos públicos
- `GET /api/projects/public/:slug` - Projeto por slug
- `GET /api/projects` - Todos (admin)
- `POST /api/projects` - Criar (admin)
- `PUT /api/projects/:id` - Atualizar (admin)
- `DELETE /api/projects/:id` - Excluir (admin)

### Banners
- `GET /api/banners/active` - Banners ativos
- `GET /api/banners` - Todos (admin)
- `POST /api/banners` - Criar (admin)
- `PUT /api/banners/:id` - Atualizar (admin)
- `DELETE /api/banners/:id` - Excluir (admin)

### Analytics (admin)
- `GET /api/analytics/dashboard` - Stats do dashboard
- `GET /api/analytics/visits` - Visitas ao longo do tempo
- `GET /api/analytics/devices` - Por dispositivo
- `GET /api/analytics/browsers` - Por navegador
- `GET /api/analytics/pages` - Por página
- `GET /api/analytics/export` - Exportar dados

### Contatos
- `POST /api/contacts` - Enviar mensagem
- `GET /api/contacts` - Listar (admin)
- `PATCH /api/contacts/:id/read` - Marcar como lido

### Configurações
- `GET /api/settings` - Obter configurações
- `PUT /api/settings` - Atualizar (admin)

## Tecnologias e Bibliotecas

### Frontend
| Biblioteca | Versão | Uso |
|------------|--------|-----|
| React | 18.2+ | Framework UI |
| TypeScript | 5.3+ | Tipagem |
| Vite | 5.1+ | Build tool |
| Tailwind CSS | 3.4+ | Estilização |
| shadcn/ui | - | Componentes UI |
| Framer Motion | 11+ | Animações |
| Zustand | 4.5+ | Estado global |
| React Hook Form | 7.51+ | Formulários |
| Zod | 3.22+ | Validação |
| Recharts | 2.12+ | Gráficos |
| Axios | 1.6+ | HTTP client |

### Backend
| Biblioteca | Versão | Uso |
|------------|--------|-----|
| Express | 4.18+ | Framework |
| Prisma | 5.10+ | ORM |
| JWT | 9+ | Autenticação |
| bcryptjs | 2.4+ | Hash de senhas |
| Multer | 1.4+ | Upload |
| Zod | 3.22+ | Validação |

## Licença

MIT
