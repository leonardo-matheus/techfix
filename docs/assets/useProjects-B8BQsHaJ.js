import{r as a,U as f}from"./index-BRPRwsfh.js";const l=[{id:"1",title:"Chopperita - Self-Service de Chopp",slug:"chopperita-self-service-chopp",description:"Sistema completo de autoatendimento para máquina de chopp com reconhecimento facial, controle por ESP32 e cobrança por ml em tempo real.",content:`
## Sobre o Projeto

Sistema completo de autoatendimento para máquina de chopp, permitindo que clientes se sirvam de forma autônoma com cobrança automática por mililitro consumido.

### Funcionalidades

- **Reconhecimento Facial** - Identificação do cliente via câmera para liberar o consumo
- **Controle de Fluxo** - Sensor de vazão conectado ao ESP32 mede o consumo em tempo real
- **Cobrança Automática** - Sistema calcula e cobra por ml consumido
- **Dashboard Administrativo** - Painel React para gestão de clientes e consumo
- **Modo Offline** - Funciona sem internet, sincronizando dados posteriormente

### Arquitetura

#### Hardware
- **ESP32** - Microcontrolador principal
- **Sensor de Vazão** - Medição precisa do volume
- **Válvula Solenoide** - Controle de liberação do chopp
- **Câmera** - Captura para reconhecimento facial

#### Backend
- **Python** - Processamento de reconhecimento facial com OpenCV
- **Laravel** - API RESTful para gestão de dados e autenticação

#### Frontend
- **React** - Interface web responsiva
- **Dashboard** - Gestão administrativa completa

### Diferenciais

- Sistema 100% offline-first
- Reconhecimento facial rápido e preciso
- Cobrança justa por consumo real
- Instalação simples e robusta
`,images:["https://raw.githubusercontent.com/leonardo-matheus/chopperita-react-web/main/src/assets/images/logo-ct.png"],demoUrl:void 0,githubUrl:"https://github.com/leonardo-matheus/chopperita-react-web",category:"IoT",tags:["React","Python","Laravel","ESP32","IoT","OpenCV","Reconhecimento Facial"],status:"PUBLISHED",featured:!0,order:1,views:0,createdAt:"2024-01-01T00:00:00.000Z",updatedAt:"2024-01-01T00:00:00.000Z"},{id:"2",title:"Laravel Fullstack Generator",slug:"laravel-fullstack-generator",description:"Gerador automático de CRUD Fullstack - Defina um JSON e gere automaticamente API Laravel + Interface Vue/Quasar.",content:`
## Sobre o Projeto

Ferramenta de produtividade que automatiza a criação de sistemas CRUD completos. Basta definir a estrutura em JSON e o gerador cria automaticamente todo o backend e frontend.

### Como Funciona

1. **Defina o JSON** - Estrutura das entidades, campos e relacionamentos
2. **Execute o Gerador** - Comando artisan processa o JSON
3. **Backend Pronto** - Models, Controllers, Migrations, Routes
4. **Frontend Pronto** - Telas Vue/Quasar com listagem, formulários e validações
5. **Pronto para Usar** - Sistema funcional em minutos

### O que é Gerado

#### Backend (Laravel)
- **Models** - Eloquent com relacionamentos
- **Controllers** - API RESTful completa
- **Migrations** - Estrutura do banco de dados
- **Form Requests** - Validações server-side
- **Routes** - Rotas da API organizadas
- **Policies** - Controle de permissões

#### Frontend (Vue/Quasar)
- **Listagem** - Tabela com paginação, busca e filtros
- **Formulários** - Criação e edição com validação
- **Componentes** - Reutilizáveis e customizáveis
- **Rotas** - Vue Router configurado
- **Store** - Vuex/Pinia para estado

### Stack Tecnológica

**Backend:**
- Laravel 10+
- PHP 8.1+
- MySQL/PostgreSQL
- API RESTful

**Frontend:**
- Vue.js 3
- Quasar Framework
- Vuex/Pinia
- Axios
`,images:["https://raw.githubusercontent.com/leonardo-matheus/Lavarel-Fullstack-Generator/main/docs/assets/logo.png"],demoUrl:"https://leonardo-matheus.github.io/Lavarel-Fullstack-Generator/",githubUrl:"https://github.com/leonardo-matheus/Lavarel-Fullstack-Generator",category:"DevTools",tags:["Laravel","Vue.js","Quasar","PHP","Generator","CRUD","Fullstack"],status:"PUBLISHED",featured:!0,order:2,views:0,createdAt:"2024-01-01T00:00:00.000Z",updatedAt:"2024-01-01T00:00:00.000Z"},{id:"3",title:"Rust NFe API",slug:"rust-nfe-api",description:"Biblioteca Rust de alta performance para parsing e serialização de Notas Fiscais Eletrônicas (NF-e/NFC-e) seguindo o Layout 4.00 da SEFAZ.",content:`
## Sobre o Projeto

Biblioteca Rust para manipulação de Notas Fiscais Eletrônicas brasileiras com foco em performance e type-safety.

### Funcionalidades

- **Alta Performance** - Parsing XML ultrarrápido usando quick-xml
- **Type Safety** - Tipagem forte com enums para campos codificados
- **Layout Completo** - Conformidade total com especificação SEFAZ 4.00
- **Conversão Bidirecional** - Converte entre structs Rust e XML
- **Múltiplos Modelos** - Suporta NF-e (modelo 55) e NFC-e (modelo 65)

### Estruturas de Dados

A biblioteca fornece structs para:
- \`Nfe\` - Nota fiscal principal
- \`Identificacao\` - Dados de identificação
- \`Emitente\` - Dados do emissor
- \`Destinatario\` - Dados do destinatário
- \`Item\` / \`Produto\` - Produtos da nota
- \`Imposto\` - ICMS, PIS, COFINS
- \`Totalizacao\` - Totais da nota
- \`Transporte\` - Dados de transporte

### Stack Tecnológica

- **Rust** - Linguagem principal
- **quick-xml** - Parsing XML
- **serde** - Serialização
- **chrono** - Manipulação de datas
- **tokio** - Runtime assíncrono
`,images:[],demoUrl:"https://leonardo-matheus.github.io/Rust-Nfe-API/",githubUrl:"https://github.com/leonardo-matheus/Rust-Nfe-API",category:"Backend",tags:["Rust","API","NFe","Fiscal","XML","SEFAZ"],status:"PUBLISHED",featured:!1,order:3,views:0,createdAt:"2024-01-01T00:00:00.000Z",updatedAt:"2024-01-01T00:00:00.000Z"},{id:"4",title:"Ecommerce API",slug:"ecommerce-api",description:"API RESTful completa para e-commerce construída com Ruby on Rails, com autenticação JWT, gestão de produtos/pedidos e área administrativa.",content:`
## Sobre o Projeto

API RESTful completa para e-commerce com autenticação JWT, gestão de produtos, pedidos e área administrativa. Pronta para produção com suporte a Docker.

### Funcionalidades

#### Autenticação & Usuários
- Autenticação JWT via Devise Token Auth
- Perfis de usuário: admin e cliente
- Registro, login, logout e gestão de perfil

#### Gestão de Produtos
- Categorias hierárquicas (pai-filho)
- CRUD completo de produtos
- Controle de SKU e estoque
- Busca e filtros avançados

#### Sistema de Pedidos
- Ciclo completo: pendente → pago → processando → enviado → entregue
- Controle automático de estoque
- Suporte a cancelamento
- Rastreamento de itens com preços unitários

### Estrutura da API

- \`/admin/v1\` - Endpoints administrativos (requer autenticação + admin)
- \`/storefront/v1\` - Endpoints públicos da loja
- Listagens paginadas
- Health check endpoint

### Stack Tecnológica

- **Ruby 3.2** - Linguagem principal
- **Rails 7.0** - Framework web (modo API)
- **SQLite3** - Banco de dados
- **Devise Token Auth** - Autenticação JWT
- **Kaminari** - Paginação
- **Docker** - Containerização
`,images:[],demoUrl:"https://leonardo-matheus.github.io/Ecommerce-API/",githubUrl:"https://github.com/leonardo-matheus/Ecommerce-API",category:"Backend",tags:["Ruby","Rails","API","E-commerce","JWT","REST","Docker"],status:"PUBLISHED",featured:!1,order:4,views:0,createdAt:"2024-01-01T00:00:00.000Z",updatedAt:"2024-01-01T00:00:00.000Z"}],u={async getPublicProjects(){return l.filter(e=>e.status==="PUBLISHED")},async getProjectBySlug(e){const t=l.find(o=>o.slug===e);if(!t)throw new Error("Project not found");return t},async getCategories(){return[...new Set(l.map(t=>t.category))]},async getProjects(e){let t=[...l];if(e!=null&&e.category&&(t=t.filter(o=>o.category===e.category)),e!=null&&e.status&&(t=t.filter(o=>o.status===e.status)),(e==null?void 0:e.featured)!==void 0&&(t=t.filter(o=>o.featured===e.featured)),e!=null&&e.search){const o=e.search.toLowerCase();t=t.filter(r=>r.title.toLowerCase().includes(o)||r.description.toLowerCase().includes(o))}return t},async getProject(e){const t=l.find(o=>o.id===e);if(!t)throw new Error("Project not found");return t},async createProject(e){return{...e,id:String(l.length+1),views:0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}},async updateProject(e,t){const o=l.find(r=>r.id===e);if(!o)throw new Error("Project not found");return{...o,...t,updatedAt:new Date().toISOString()}},async deleteProject(e){console.log("Delete project:",e)},async reorderProjects(e){console.log("Reorder projects:",e)}};function v(){const[e,t]=a.useState([]),[o,r]=a.useState(!0),[d,c]=a.useState(null);return a.useEffect(()=>{async function n(){try{const m=await u.getPublicProjects();t(m)}catch(m){c(f(m))}finally{r(!1)}}n()},[]),{projects:e,isLoading:o,error:d}}function y(e){const[t,o]=a.useState(null),[r,d]=a.useState(!0),[c,n]=a.useState(null);return a.useEffect(()=>{async function m(){try{const g=await u.getProjectBySlug(e);o(g)}catch(g){n(f(g))}finally{d(!1)}}e&&m()},[e]),{project:t,isLoading:r,error:c}}function E(){const[e,t]=a.useState([]),[o,r]=a.useState(!0);return a.useEffect(()=>{async function d(){try{const c=await u.getCategories();t(c)}catch{}finally{r(!1)}}d()},[]),{categories:e,isLoading:o}}function A(){const[e,t]=a.useState([]),[o,r]=a.useState(!0),[d,c]=a.useState(null),n=a.useCallback(async s=>{r(!0);try{const i=await u.getProjects(s);t(i),c(null)}catch(i){c(f(i))}finally{r(!1)}},[]);return a.useEffect(()=>{n()},[n]),{projects:e,isLoading:o,error:d,fetchProjects:n,createProject:async s=>{const i=await u.createProject(s);return t(p=>[...p,i]),i},updateProject:async(s,i)=>{const p=await u.updateProject(s,i);return t(S=>S.map(P=>P.id===s?p:P)),p},deleteProject:async s=>{await u.deleteProject(s),t(i=>i.filter(p=>p.id!==s))},reorderProjects:async s=>{await u.reorderProjects(s),n()}}}export{E as a,y as b,A as c,v as u};
