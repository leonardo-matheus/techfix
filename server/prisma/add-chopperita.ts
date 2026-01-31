import { PrismaClient, ProjectStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.create({
    data: {
      title: 'Chopperita - Self-Service de Chopp',
      slug: 'chopperita-self-service-chopp',
      description: 'Sistema completo de autoatendimento para máquina de chopp com reconhecimento facial, controle por ESP32 e cobrança por ml em tempo real.',
      content: `
## Sobre o Projeto

Sistema inovador de autoatendimento para máquinas de chopp, desenvolvido com tecnologia de ponta para proporcionar uma experiência única aos clientes.

### Como Funciona

1. **Cadastro no Caixa** - Cliente se cadastra e adiciona saldo
2. **Reconhecimento Facial** - Câmera Python identifica o cliente na torneira
3. **Seleção de Chopp** - Interface mostra opções disponíveis
4. **Liberação Automática** - Torneira libera após identificação
5. **Cobrança por ML** - Débito em tempo real, igual bomba de combustível

### Arquitetura do Sistema

- **Frontend React** - Interface touchscreen para seleção e visualização
- **Backend Python** - Reconhecimento facial com OpenCV/dlib
- **ESP32** - Microcontrolador conectado à válvula solenoide
- **Sensor de Fluxo** - Medição precisa em ml
- **Sistema Offline** - Funciona sem internet

### Diferenciais

- **100% Offline** - Não depende de conexão com internet
- **Reconhecimento Facial** - Identificação rápida e segura
- **Cobrança Precisa** - Paga apenas o que consumir
- **Hardware Integrado** - ESP32 + sensores + válvula
- **Interface Intuitiva** - Fácil de usar

### Stack Tecnológica

**Frontend:**
- React + TypeScript
- Interface responsiva para touchscreen

**Backend/IA:**
- Python
- OpenCV para processamento de imagem
- Reconhecimento facial

**Hardware:**
- ESP32 (microcontrolador)
- Sensor de fluxo de água
- Válvula solenoide
- Câmera USB

**Banco de Dados:**
- SQLite (local/offline)
      `,
      images: ['/uploads/chopperita-1.jpg'],
      category: 'IoT',
      tags: ['React', 'Python', 'ESP32', 'IoT', 'OpenCV', 'Reconhecimento Facial', 'Hardware'],
      status: ProjectStatus.PUBLISHED,
      featured: true,
      order: 0,
      views: 0,
    },
  })

  console.log('Projeto Chopperita criado:', project.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
