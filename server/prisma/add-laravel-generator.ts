import { PrismaClient, ProjectStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.create({
    data: {
      title: 'Laravel Fullstack Generator',
      slug: 'laravel-fullstack-generator',
      description: 'Gerador automático de CRUD Fullstack - Defina um JSON e gere automaticamente API Laravel + Interface Vue/Quasar.',
      content: `
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

### Exemplo de JSON

\`\`\`json
{
  "name": "Product",
  "fields": [
    {"name": "name", "type": "string", "required": true},
    {"name": "price", "type": "decimal", "required": true},
    {"name": "description", "type": "text"},
    {"name": "category_id", "type": "foreignId", "relation": "Category"}
  ]
}
\`\`\`

### Benefícios

- **Produtividade** - Economize horas de código repetitivo
- **Padronização** - Código consistente em todo o projeto
- **Manutenibilidade** - Estrutura organizada e documentada
- **Escalabilidade** - Fácil adicionar novas entidades
- **Customizável** - Templates podem ser modificados

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

**DevTools:**
- Artisan Commands
- JSON Schema
- Blade Templates
      `,
      images: ['/uploads/laravel-generator-1.jpg'],
      category: 'DevTools',
      tags: ['Laravel', 'Vue.js', 'Quasar', 'PHP', 'Generator', 'CRUD', 'Fullstack', 'Automação'],
      status: ProjectStatus.PUBLISHED,
      featured: true,
      order: 1,
      views: 0,
    },
  })

  console.log('Projeto Laravel Generator criado:', project.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
