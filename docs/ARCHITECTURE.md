# SOS ESTUDANTE — ARCHITECTURE

**Projeto:** SOS Estudante
**Versão:** 1.0
**Status:** Arquitetura inicial
**Documento:** Arquitetura Técnica
**Tipo:** Full-stack, Mobile-first, API-first
**Repositório:** `sos-estudante`

---

## 1. Objetivo

Este documento define a arquitetura técnica oficial do SOS Estudante.

A arquitetura deve fornecer uma base:

* modular;
* escalável;
* segura;
* testável;
* organizada;
* compatível com desenvolvimento por múltiplos agentes de IA;
* preparada para Web, PWA, Android e iOS;
* adequada para evolução futura sem necessidade de reescrever o sistema.

O `PROJECT_SPEC.md` define os requisitos funcionais e de produto.

Este documento define a estrutura técnica necessária para implementar esses requisitos.

---

# 2. Princípios Arquiteturais

O desenvolvimento do SOS Estudante deve seguir os seguintes princípios:

### 2.1 Separação de responsabilidades

Cada camada deve possuir uma responsabilidade clara.

```text
Frontend
    ↓
API
    ↓
Controllers
    ↓
Services
    ↓
Repositories / Models
    ↓
MongoDB
```

Nenhuma camada deve assumir responsabilidades pertencentes a outra.

---

### 2.2 API-first

O backend deve expor uma API REST organizada.

O frontend não deve acessar o banco de dados diretamente.

```text
Frontend
   │
   │ HTTP/HTTPS
   ▼
REST API
   │
   ▼
Backend
   │
   ▼
MongoDB
```

---

### 2.3 Mobile-first

A interface deve ser projetada inicialmente considerando telas pequenas.

A aplicação deve funcionar adequadamente em:

* smartphones;
* tablets;
* notebooks;
* desktops.

---

### 2.4 Componentização

O frontend deve utilizar componentes reutilizáveis.

O backend deve utilizar módulos independentes e serviços especializados.

Evitar arquivos gigantes contendo múltiplas responsabilidades.

---

### 2.5 Segurança por padrão

Toda funcionalidade que manipula dados privados deve possuir autenticação e autorização apropriadas.

Nenhuma rota protegida deve depender apenas da interface para impedir acesso.

A autorização deve ser validada no backend.

---

### 2.6 Não quebrar funcionalidades existentes

Nenhum agente ou desenvolvedor deve modificar uma funcionalidade existente sem verificar seus impactos.

Antes de alterações:

1. inspecionar o código;
2. entender a implementação atual;
3. verificar dependências;
4. preservar contratos existentes;
5. executar testes;
6. corrigir regressões.

---

# 3. Stack Tecnológica

## 3.1 Frontend

Tecnologias principais:

* React;
* TypeScript;
* Vite;
* Tailwind CSS;
* React Router;
* Axios;
* gerenciamento de estado conforme necessidade;
* PWA.

---

## 3.2 Backend

Tecnologias principais:

* Node.js;
* TypeScript;
* Express;
* MongoDB;
* Mongoose;
* JWT;
* bcrypt;
* Multer;
* Socket.io.

---

## 3.3 Banco de dados

Banco principal:

**MongoDB**

ODM:

**Mongoose**

---

## 3.4 Testes

A arquitetura deve permitir testes:

* unitários;
* integração;
* API;
* autenticação;
* permissões;
* componentes;
* fluxos críticos.

A ferramenta específica pode ser definida durante a implementação, desde que seja compatível com a stack adotada.

---

# 4. Arquitetura Geral

A arquitetura geral será dividida em:

```text
┌──────────────────────────────────────────┐
│              CLIENTES                    │
│                                          │
│ Web │ PWA │ Android │ iOS                │
└──────────────────┬───────────────────────┘
                   │
                   │ HTTPS / WebSocket
                   ▼
┌──────────────────────────────────────────┐
│              FRONTEND                    │
│                                          │
│ React + TypeScript + Tailwind             │
│ React Router + Axios                      │
└──────────────────┬───────────────────────┘
                   │
                   │ REST API
                   ▼
┌──────────────────────────────────────────┐
│               BACKEND                    │
│                                          │
│ Express + TypeScript                     │
│                                          │
│ Routes                                    │
│ Controllers                               │
│ Services                                  │
│ Middleware                                │
│ Validation                                │
│ Authorization                             │
└───────────────┬───────────────┬──────────┘
                │               │
                ▼               ▼
        ┌──────────────┐ ┌──────────────┐
        │   MongoDB    │ │  File Store  │
        │              │ │              │
        │ Application  │ │ Documents    │
        │ data         │ │ Images       │
        │              │ │ Attachments   │
        └──────────────┘ └──────────────┘

                │
                ▼
        ┌────────────────┐
        │    Socket.io   │
        │                │
        │ Real-time chat │
        │ Notifications  │
        │ Events         │
        └────────────────┘
```

---

# 5. Estrutura do Repositório

A estrutura principal esperada:

```text
SOS-ESTUDANTE/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── validators/
│   │   ├── sockets/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── PROJECT_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.MD
│   ├── API.MD
│   ├── AUTH.MD
│   ├── GROUPS.MD
│   ├── STORAGE.MD
│   └── ROADMAP.MD
│
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

A estrutura pode evoluir durante o desenvolvimento, mas mudanças devem manter a separação de responsabilidades.

---

# 6. Frontend

## 6.1 Responsabilidade

O frontend é responsável por:

* interface;
* navegação;
* formulários;
* interação com usuário;
* gerenciamento de estado de interface;
* consumo da API;
* validações de experiência do usuário;
* feedback visual;
* responsividade;
* PWA.

O frontend não deve conter regras críticas de segurança ou autorização.

---

# 7. Organização do Frontend

## 7.1 Components

Componentes reutilizáveis.

Exemplos:

```text
Button
Input
Modal
Dialog
Card
Avatar
Badge
Dropdown
Tabs
Calendar
TaskCard
FileCard
GroupCard
MessageBubble
KanbanBoard
PomodoroTimer
NotificationItem
```

---

## 7.2 Pages

Representam telas completas.

Exemplos:

```text
Login
Cadastro
Dashboard
Disciplinas
Tarefas
Agenda
Calendário
Arquivos
Grupos
Grupo
Chat
Kanban
Trabalhos
Sala
Atividades
Provas
Pomodoro
Estatísticas
Perfil
Configurações
```

---

## 7.3 Layouts

Layouts responsáveis pela estrutura visual geral.

Exemplos:

```text
AuthLayout
DashboardLayout
GroupLayout
MobileLayout
```

---

## 7.4 Services

Serviços responsáveis pela comunicação com a API.

Exemplo:

```text
authService
userService
subjectService
taskService
fileService
groupService
messageService
calendarService
examService
assignmentService
notificationService
statsService
```

---

# 8. Roteamento

O React Router será utilizado para navegação.

As rotas devem ser divididas em:

### Públicas

```text
/login
/register
/forgot-password
```

### Protegidas

```text
/dashboard
/subjects
/tasks
/calendar
/agenda
/files
/groups
/profile
/settings
/statistics
```

### Rotas de grupo

```text
/groups/:groupId
/groups/:groupId/chat
/groups/:groupId/files
/groups/:groupId/tasks
/groups/:groupId/kanban
/groups/:groupId/assignments
/groups/:groupId/classroom
```

As rotas protegidas devem verificar a sessão do usuário.

---

# 9. Gerenciamento de Estado

O estado deve ser dividido conforme sua finalidade.

### Estado local

Para:

* abertura de modal;
* formulário;
* seleção;
* estados temporários.

### Estado global

Para informações compartilhadas, como:

* usuário autenticado;
* sessão;
* preferências;
* notificações;
* informações globais da aplicação.

### Estado remoto

Dados vindos da API devem possuir uma estratégia própria de cache, atualização e invalidação.

A ferramenta utilizada pode ser definida durante a implementação.

---

# 10. Comunicação Frontend → Backend

O frontend utilizará Axios ou camada equivalente para comunicação HTTP.

Exemplo conceitual:

```text
React Component
      ↓
Service
      ↓
Axios
      ↓
REST API
      ↓
Controller
```

Nenhum componente deve conter chamadas HTTP complexas diretamente quando existir um service apropriado.

---

# 11. Backend

## 11.1 Responsabilidade

O backend será responsável por:

* regras de negócio;
* autenticação;
* autorização;
* validação;
* persistência;
* gerenciamento de arquivos;
* notificações;
* comunicação em tempo real;
* processamento de dados;
* segurança;
* API REST.

---

# 12. Arquitetura Interna do Backend

O backend utilizará uma arquitetura modular inspirada em:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories / Models
   ↓
Database
```

---

# 13. Routes

As rotas definem os endpoints HTTP.

Exemplo:

```text
POST /api/auth/login
GET  /api/users/me
GET  /api/subjects
POST /api/tasks
GET  /api/groups
POST /api/groups
```

As routes não devem conter regras de negócio complexas.

---

# 14. Controllers

Controllers são responsáveis por:

* receber requisição;
* validar entrada básica;
* chamar service;
* retornar resposta HTTP.

Exemplo conceitual:

```text
Request
   ↓
Controller
   ↓
Service
   ↓
Response
```

Controllers não devem conter lógica extensa de negócio.

---

# 15. Services

Services contêm as regras de negócio.

Exemplos:

```text
AuthService
UserService
SubjectService
TaskService
GroupService
FileService
AssignmentService
CalendarService
NotificationService
StatisticsService
```

Os services devem ser reutilizáveis por diferentes controllers quando necessário.

---

# 16. Repositories

Quando necessário, repositories serão utilizados para abstrair operações de persistência.

Exemplo:

```text
UserRepository
GroupRepository
TaskRepository
FileRepository
MessageRepository
```

A utilização de repositories deve evitar acoplamento excessivo entre regras de negócio e MongoDB.

---

# 17. Models

Os models representam as entidades persistidas no MongoDB.

Os principais modelos previstos estão detalhados no `DATABASE.MD`.

Exemplos:

```text
User
Subject
Task
File
Group
GroupMember
Channel
Message
Assignment
Submission
Classroom
Exam
Event
Notification
StudySession
```

---

# 18. Middleware

Middlewares serão utilizados para:

* autenticação;
* autorização;
* validação;
* tratamento de erros;
* logging;
* segurança;
* rate limiting;
* processamento de arquivos;
* outras preocupações transversais.

Exemplos:

```text
authenticate
authorize
validate
errorHandler
requestLogger
uploadMiddleware
rateLimiter
```

---

# 19. Autenticação

A autenticação será baseada em:

```text
JWT
+
bcrypt
```

O fluxo geral:

```text
Usuário
   ↓
Login
   ↓
Backend valida credenciais
   ↓
JWT
   ↓
Cliente mantém sessão
   ↓
Requisições autenticadas
```

Os detalhes completos estarão no `AUTH.MD`.

---

# 20. Autorização

Autenticação confirma:

> "Quem é o usuário?"

Autorização confirma:

> "O usuário pode executar esta ação?"

Exemplo:

```text
Usuário autenticado
        ↓
É membro do grupo?
        ↓
Possui permissão?
        ↓
Executa ação
```

Permissões devem ser verificadas no backend.

---

# 21. Sistema de Grupos

O sistema de grupos será modular.

Uma estrutura conceitual:

```text
Group
 │
 ├── Members
 │
 ├── Channels
 │     ├── Geral
 │     ├── Avisos
 │     ├── Materiais
 │     ├── Exercícios
 │     ├── Dúvidas
 │     └── Trabalhos
 │
 ├── Files
 ├── Tasks
 ├── Kanban
 ├── Assignments
 ├── Classroom
 └── Events
```

Detalhes específicos ficam em:

```text
docs/GROUPS.MD
```

---

# 22. Comunicação em Tempo Real

Socket.io será utilizado quando a funcionalidade exigir comunicação em tempo real.

Principais casos:

* chat;
* novas mensagens;
* presença;
* notificações em tempo real;
* atualizações colaborativas;
* mudanças de Kanban quando necessário.

Não utilizar WebSocket simplesmente onde uma requisição HTTP convencional é suficiente.

---

# 23. Arquivos e Storage

O sistema terá uma camada de abstração para armazenamento.

```text
FileService
     ↓
StorageService
     ↓
Storage Provider
```

Isso permite substituir posteriormente o armazenamento local por:

* S3;
* Cloud Storage;
* outro provedor.

O restante da aplicação não deve depender diretamente do fornecedor de armazenamento.

Detalhes ficam em:

```text
docs/STORAGE.MD
```

---

# 24. Uploads

Uploads devem possuir:

* validação de extensão;
* validação MIME;
* limite de tamanho;
* nomes seguros;
* identificação do usuário;
* identificação do contexto;
* controle de acesso;
* tratamento de arquivos inválidos.

Nunca confiar apenas na extensão enviada pelo usuário.

---

# 25. Banco de Dados

MongoDB será utilizado como banco principal.

A aplicação deve utilizar:

```text
Backend
   ↓
Mongoose
   ↓
MongoDB
```

Nenhum código frontend deve acessar MongoDB diretamente.

A modelagem detalhada será documentada em:

```text
docs/DATABASE.MD
```

---

# 26. API REST

A API seguirá uma organização baseada em recursos.

Prefixo:

```text
/api
```

Exemplos:

```text
/api/auth
/api/users
/api/subjects
/api/tasks
/api/files
/api/groups
/api/messages
/api/calendar
/api/exams
/api/assignments
/api/notifications
/api/statistics
```

A especificação detalhada dos endpoints será mantida em:

```text
docs/API.MD
```

---

# 27. Formato de Resposta da API

As respostas devem seguir um padrão consistente.

Sucesso:

```json
{
  "success": true,
  "data": {}
}
```

Erro:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem do erro"
  }
}
```

Respostas paginadas podem seguir:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

O padrão definitivo deve ser mantido consistente em toda a API.

---

# 28. Tratamento de Erros

O backend deve possuir um middleware centralizado de erros.

Nenhum controller deve precisar repetir lógica extensa de tratamento.

Categorias de erro:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
429 Too Many Requests
500 Internal Server Error
```

Mensagens internas sensíveis não devem ser expostas ao cliente.

---

# 29. Validação

Toda entrada externa deve ser validada.

Fontes de entrada incluem:

* body;
* params;
* query;
* headers;
* uploads.

A validação deve ocorrer no backend mesmo que o frontend também valide os dados.

---

# 30. Segurança

O sistema deve considerar:

* hashing de senhas;
* JWT seguro;
* validação de entrada;
* proteção contra XSS;
* proteção contra NoSQL injection;
* CORS configurado;
* rate limiting;
* controle de uploads;
* autorização por recurso;
* mensagens de erro seguras;
* gerenciamento correto de secrets;
* HTTPS em produção.

Nunca armazenar senhas em texto puro.

Nunca colocar secrets diretamente no código.

---

# 31. Variáveis de Ambiente

Configurações sensíveis devem utilizar `.env`.

Exemplo:

```text
NODE_ENV
PORT
MONGODB_URI
JWT_SECRET
JWT_EXPIRES_IN
FRONTEND_URL
STORAGE_PROVIDER
STORAGE_PATH
```

O `.env` real nunca deve ser enviado para o Git.

O repositório deve conter:

```text
.env.example
```

---

# 32. PWA

O frontend deverá ser preparado como Progressive Web App.

Recursos previstos:

* instalação no dispositivo;
* ícone próprio;
* manifest;
* service worker;
* cache apropriado;
* experiência semelhante a aplicativo;
* suporte offline parcial.

O modo offline não deve permitir alterações críticas sem uma estratégia clara de sincronização.

---

# 33. Aplicações Mobile

A arquitetura deve permitir futuramente a criação de aplicativos Android e iOS.

A API deve ser independente do frontend.

Arquitetura:

```text
                 ┌── Web
                 │
REST API ────────┼── PWA
                 │
                 ├── Android
                 │
                 └── iOS
```

Isso evita que a lógica principal do sistema fique presa a uma única interface.

---

# 34. Responsividade

A interface deve possuir breakpoints adequados para:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Não criar versões completamente separadas da aplicação quando CSS responsivo e componentes adaptáveis forem suficientes.

---

# 35. Navegação Mobile

A navegação mobile deverá priorizar acesso rápido às funções principais.

Conceitualmente:

```text
┌─────────────────────────┐
│       Conteúdo          │
│                         │
│                         │
├─────────────────────────┤
│ Início │ Agenda │ Grupos│
│ Arquivos │ Perfil       │
└─────────────────────────┘
```

A implementação definitiva deve seguir o `PROJECT_SPEC.md`.

---

# 36. Navegação Desktop

Desktop poderá utilizar sidebar.

Conceitualmente:

```text
┌────────────┬─────────────────────────┐
│            │                         │
│ Sidebar    │       Conteúdo          │
│            │                         │
│ Dashboard  │                         │
│ Agenda     │                         │
│ Arquivos   │                         │
│ Grupos     │                         │
│ Disciplinas│                         │
│ Estatísticas                         │
│ Config.    │                         │
│            │                         │
└────────────┴─────────────────────────┘
```

---

# 37. Design System

O frontend deve possuir padrões consistentes para:

* cores;
* tipografia;
* espaçamento;
* bordas;
* sombras;
* botões;
* inputs;
* cards;
* modais;
* feedback;
* estados de carregamento.

Os componentes devem ser reutilizados sempre que possível.

---

# 38. Acessibilidade

A interface deve considerar:

* contraste adequado;
* navegação por teclado;
* labels apropriados;
* foco visível;
* semântica HTML;
* textos alternativos;
* mensagens de erro compreensíveis;
* tamanho adequado de áreas interativas.

---

# 39. Performance

O sistema deve evitar:

* requisições desnecessárias;
* renders excessivos;
* carregamento de arquivos grandes sem necessidade;
* consultas MongoDB ineficientes;
* endpoints sem paginação quando grandes volumes forem possíveis.

Devem ser considerados:

* lazy loading;
* paginação;
* cache;
* índices MongoDB;
* compressão;
* otimização de imagens;
* carregamento sob demanda.

---

# 40. Paginação

Listagens potencialmente grandes devem possuir paginação.

Exemplos:

* mensagens;
* arquivos;
* tarefas;
* membros;
* notificações;
* atividades;
* resultados de busca.

Evitar retornar milhares de registros em uma única requisição.

---

# 41. Busca Global

A busca global deverá utilizar uma API centralizada.

Conceito:

```text
Search
  ↓
Backend
  ↓
┌──────────┬──────────┬──────────┐
│ Arquivos │ Grupos   │ Tarefas  │
│ Pessoas  │ Atividades         │
└──────────┴──────────┴──────────┘
```

A implementação deve considerar performance e permissões.

Um usuário nunca deve receber resultados de recursos aos quais não possui acesso.

---

# 42. Notificações

As notificações poderão ser entregues por:

```text
In-app
   +
Push
   +
Real-time
```

Exemplos:

* nova mensagem;
* convite para grupo;
* atividade atribuída;
* prazo próximo;
* alteração em trabalho;
* aviso de professor;
* evento;
* prova.

---

# 43. Sistema de Prioridades

A funcionalidade "O que devo fazer agora?" deverá utilizar uma camada de serviço própria.

Conceito:

```text
Tasks
   ↓
Priority Service
   ↓
Deadline
Difficulty
Complexity
Importance
User Preferences
   ↓
Priority Score
   ↓
Recommended Tasks
```

A lógica deve ficar no backend quando envolver dados persistidos ou regras importantes.

---

# 44. Calendário e Agenda

Calendário e agenda devem utilizar uma camada compartilhada de eventos.

Eventos podem ter origem:

```text
Task
Exam
Assignment
Study Session
Personal Event
Group Event
```

O frontend deve apenas apresentar e manipular os dados através da API.

---

# 45. Pomodoro

O Pomodoro possui uma parte predominantemente client-side, mas sessões concluídas podem ser registradas no backend.

Fluxo:

```text
Pomodoro Timer
      ↓
Study Session
      ↓
API
      ↓
Statistics
```

Configuração padrão:

```text
25 minutos estudo
5 minutos pausa
```

Configurações futuras podem permitir personalização.

---

# 46. Estatísticas

As estatísticas devem ser calculadas a partir de dados reais.

Exemplos:

* tempo estudado;
* sessões Pomodoro;
* tarefas concluídas;
* tarefas pendentes;
* desempenho por disciplina;
* atividades realizadas;
* evolução temporal.

Evitar dados fictícios na versão de produção.

---

# 47. Cache

O sistema poderá utilizar cache quando houver benefício real.

Inicialmente, não introduzir infraestrutura adicional de cache sem necessidade.

Se o crescimento justificar:

```text
Frontend Cache
       ↓
API
       ↓
Redis / Cache Layer
       ↓
MongoDB
```

A introdução de Redis ou tecnologia semelhante deve ocorrer somente quando houver necessidade arquitetural comprovada.

---

# 48. Escalabilidade

A aplicação deve ser construída de maneira que possa crescer.

Prioridades:

1. código modular;
2. banco bem indexado;
3. API stateless sempre que possível;
4. armazenamento desacoplado;
5. serviços independentes;
6. paginação;
7. logs;
8. monitoramento;
9. possibilidade futura de múltiplas instâncias.

---

# 49. Logs

O backend deve possuir logging estruturado.

Registrar informações úteis como:

* requisição;
* método;
* rota;
* status;
* tempo de resposta;
* erros;
* eventos importantes.

Não registrar:

* senhas;
* tokens completos;
* informações sensíveis desnecessárias.

---

# 50. Testes

O sistema deve possuir testes para funcionalidades críticas.

Prioridade:

### Alta

* cadastro;
* login;
* autenticação;
* autorização;
* grupos;
* upload;
* tarefas;
* atividades;
* submissões;
* mensagens.

### Média

* calendário;
* notificações;
* estatísticas;
* busca.

### Frontend

Testar componentes e fluxos críticos.

---

# 51. Estados da Interface

Todas as páginas que dependem de dados remotos devem considerar:

```text
Loading
Success
Empty
Error
Unauthorized
Offline
```

Exemplo:

```text
Loading → Skeleton
Success → Conteúdo
Empty → Empty State
Error → Mensagem + Retry
```

Nunca deixar a interface simplesmente "quebrar" quando uma requisição falhar.

---

# 52. Offline

O suporte offline será progressivo.

Inicialmente:

* cache de recursos estáticos;
* possibilidade de abrir partes da aplicação;
* indicação clara de conexão.

Posteriormente:

* fila de operações;
* sincronização;
* resolução de conflitos.

Não implementar sincronização complexa sem definir previamente suas regras.

---

# 53. Integração entre Agentes de IA

O projeto será desenvolvido com participação de:

* Codex;
* Mimo Code;
* Google Antigravity.

Todos devem utilizar os mesmos documentos como fonte de verdade.

Hierarquia:

```text
PROJECT_SPEC.md
       ↓
ARCHITECTURE.md
       ↓
DATABASE.MD
       ↓
AUTH.MD
       ↓
GROUPS.MD
       ↓
STORAGE.MD
       ↓
API.MD
       ↓
ROADMAP.MD
       ↓
Código
```

Em caso de conflito, os agentes devem interromper a implementação daquela parte e registrar o conflito para resolução.

---

# 54. Responsabilidades dos Agentes

## Codex

Principalmente:

* backend;
* banco;
* APIs;
* autenticação;
* autorização;
* segurança;
* testes;
* arquitetura.

---

## Mimo Code

Principalmente:

* frontend;
* componentes;
* páginas;
* UI;
* UX;
* responsividade;
* acessibilidade.

---

## Google Antigravity

Principalmente:

* integração;
* revisão;
* testes;
* correções;
* validação dos fluxos;
* identificação de inconsistências.

Essas responsabilidades são preferenciais e não impedem colaboração quando necessário.

---

# 55. Regra de Não Quebra

Antes de qualquer alteração:

```text
1. Ler documentação relevante
2. Inspecionar código existente
3. Identificar dependências
4. Implementar alteração
5. Executar testes
6. Verificar funcionalidades existentes
7. Atualizar documentação
8. Commit
```

Nenhum agente deve apagar ou substituir uma implementação funcional simplesmente para facilitar sua própria tarefa.

---

# 56. Git Workflow

O projeto deve utilizar Git.

Commits devem ser claros.

Exemplos:

```text
feat: add user authentication
feat: add group creation
feat: implement task priority service
fix: correct group permission validation
refactor: improve file service
test: add authentication tests
docs: update API specification
chore: configure frontend
```

Evitar commits genéricos como:

```text
update
changes
teste
coisas
final
```

---

# 57. Branches

Quando apropriado:

```text
main
develop
feature/*
fix/*
refactor/*
```

Exemplo:

```text
feature/authentication
feature/groups
feature/calendar
fix/file-upload
```

A estratégia pode ser simplificada durante o desenvolvimento inicial, mas `main` deve permanecer funcional.

---

# 58. Pull Requests

Alterações relevantes devem ser revisadas antes de entrar na branch principal.

Um Pull Request deve explicar:

* o que foi alterado;
* por que foi alterado;
* arquivos principais;
* testes executados;
* possíveis impactos;
* documentação atualizada.

---

# 59. Contratos entre Frontend e Backend

A API deve ser tratada como contrato.

Alterações incompatíveis devem ser evitadas.

Se uma alteração for necessária:

1. atualizar `API.MD`;
2. atualizar backend;
3. atualizar frontend;
4. executar testes;
5. documentar mudança.

Nunca alterar silenciosamente o formato de uma resposta utilizada pelo frontend.

---

# 60. Versionamento da API

A API poderá utilizar versionamento quando necessário.

Estrutura inicial recomendada:

```text
/api/v1
```

Exemplo:

```text
/api/v1/auth/login
/api/v1/users/me
/api/v1/groups
```

Se a primeira versão for implementada sem versionamento explícito, a decisão deve ser documentada e mantida consistente.

---

# 61. Dependências

Dependências devem ser adicionadas somente quando justificadas.

Antes de instalar uma biblioteca:

1. verificar se a funcionalidade pode ser implementada com ferramentas existentes;
2. verificar manutenção da biblioteca;
3. verificar compatibilidade;
4. considerar impacto no bundle;
5. documentar dependências importantes.

Evitar dependências redundantes.

---

# 62. Dados Fictícios

Dados mockados podem ser utilizados durante desenvolvimento.

Porém:

* devem ser claramente identificados;
* não devem ser confundidos com dados reais;
* não devem permanecer como substituição de funcionalidades na versão de produção.

---

# 63. Desenvolvimento Local

O projeto deve permitir executar frontend e backend localmente.

Conceito:

```text
Terminal 1
Frontend
↓
Vite

Terminal 2
Backend
↓
Express

MongoDB
↓
Local ou serviço configurado
```

Os scripts definitivos devem ser documentados no `README.md`.

---

# 64. Produção

A arquitetura deve permitir futuramente:

```text
Internet
   ↓
HTTPS
   ↓
Frontend Hosting
   ↓
Backend API
   ↓
MongoDB
   ↓
Cloud Storage
```

A infraestrutura específica de produção será definida posteriormente.

---

# 65. Observabilidade Futura

A aplicação deverá poder incorporar futuramente:

* monitoramento;
* métricas;
* rastreamento de erros;
* health checks;
* alertas;
* métricas de API;
* métricas de banco.

Inicialmente, implementar somente o necessário para desenvolvimento seguro.

---

# 66. Health Check

O backend deve possuir um endpoint de saúde.

Exemplo:

```text
GET /health
```

Resposta conceitual:

```json
{
  "status": "ok"
}
```

Posteriormente poderá verificar:

* aplicação;
* banco;
* storage;
* serviços essenciais.

---

# 67. Configuração por Ambiente

O sistema deve distinguir:

```text
development
test
production
```

Configurações específicas de cada ambiente devem ser controladas por variáveis de ambiente.

---

# 68. Documentação

A documentação técnica deve permanecer atualizada.

Arquivos principais:

```text
docs/
├── PROJECT_SPEC.md
├── ARCHITECTURE.md
├── DATABASE.MD
├── API.MD
├── AUTH.MD
├── GROUPS.MD
├── STORAGE.MD
└── ROADMAP.MD
```

Cada documento possui uma finalidade específica.

Não duplicar desnecessariamente a mesma especificação em múltiplos arquivos.

---

# 69. Ordem de Implementação Arquitetural

A implementação deve seguir aproximadamente:

```text
1. Fundação
   ↓
2. Banco de dados
   ↓
3. Autenticação
   ↓
4. Usuários e disciplinas
   ↓
5. Organização pessoal
   ↓
6. Arquivos
   ↓
7. Grupos
   ↓
8. Chat
   ↓
9. Trabalhos e Kanban
   ↓
10. Sala de aula
   ↓
11. Calendário e provas
   ↓
12. Pomodoro
   ↓
13. Notificações
   ↓
14. Estatísticas
   ↓
15. PWA / Mobile
   ↓
16. Otimização
   ↓
17. Produção
```

A ordem exata deve ser mantida em `ROADMAP.MD`.

---

# 70. Princípio de Implementação Incremental

O SOS Estudante não deve ser desenvolvido como um único bloco.

Cada etapa deve:

1. possuir escopo definido;
2. implementar uma funcionalidade completa;
3. possuir testes;
4. ser integrada;
5. ser documentada;
6. manter o sistema executável.

Preferir:

```text
pequena funcionalidade completa
```

em vez de:

```text
grande quantidade de funcionalidades incompletas
```

---

# 71. Critério de Pronto

Uma funcionalidade somente deve ser considerada concluída quando:

* frontend implementado;
* backend implementado quando necessário;
* banco implementado quando necessário;
* autenticação verificada;
* autorização verificada;
* estados de UI implementados;
* erros tratados;
* testes relevantes executados;
* documentação atualizada;
* funcionalidade integrada;
* nenhuma funcionalidade existente quebrada.

---

# 72. Regra para Agentes de IA

Antes de implementar qualquer tarefa, o agente deve:

```text
1. Ler PROJECT_SPEC.md
2. Ler ARCHITECTURE.md
3. Ler documentação específica da funcionalidade
4. Inspecionar o código existente
5. Identificar dependências
6. Planejar alteração
7. Implementar
8. Testar
9. Verificar regressões
10. Atualizar documentação
```

Se encontrar ambiguidade arquitetural, deve registrar a dúvida em vez de inventar uma regra conflitante.

---

# 73. Regra de Escopo

Um agente deve trabalhar somente no escopo solicitado.

Exemplo:

Se a tarefa for:

```text
Implementar autenticação
```

não deve simultaneamente:

```text
reescrever o sistema de grupos
alterar o calendário
modificar o Kanban
mudar o design inteiro
```

Alterações fora do escopo devem ser evitadas.

---

# 74. Compatibilidade entre Plataformas

Toda funcionalidade nova deve considerar:

```text
Desktop
Tablet
Mobile
PWA
```

quando aplicável.

A API deve permanecer independente da plataforma.

---

# 75. Privacidade

Dados de usuários devem ser tratados como privados por padrão.

Exemplos:

* tarefas pessoais;
* arquivos pessoais;
* agenda pessoal;
* estatísticas;
* informações de perfil.

Dados compartilhados em grupos devem obedecer às permissões daquele grupo.

---

# 76. Controle de Acesso por Recurso

A autorização deve considerar não apenas o tipo do usuário, mas também o recurso.

Exemplo:

```text
GET /groups/123/files/456
```

O backend deve verificar:

```text
Usuário autenticado?
        ↓
Usuário pertence ao grupo?
        ↓
Arquivo pertence ao grupo?
        ↓
Usuário possui permissão?
        ↓
Permitir acesso
```

Isso deve ser aplicado a todos os recursos protegidos.

---

# 77. Arquitetura de Domínio

Os principais domínios do sistema são:

```text
Identity
Users
Subjects
Tasks
Files
Groups
Messaging
Assignments
Classrooms
Calendar
Exams
Study Sessions
Notifications
Statistics
Search
```

Cada domínio deve permanecer o mais independente possível.

---

# 78. Comunicação entre Domínios

Domínios devem se comunicar através de services ou interfaces bem definidas.

Evitar dependências circulares.

Exemplo:

```text
AssignmentService
      ↓
NotificationService
```

é preferível a permitir que módulos dependam uns dos outros indiscriminadamente.

---

# 79. Eventos Internos

Conforme o sistema crescer, eventos internos poderão ser utilizados.

Exemplo:

```text
AssignmentCreated
        ↓
NotificationService
        ↓
Create Notification
```

Isso poderá reduzir acoplamento entre módulos.

Não implementar um sistema complexo de eventos antes de existir necessidade real.

---

# 80. Arquitetura Final Conceitual

A arquitetura completa do SOS Estudante pode ser representada assim:

```text
                         ┌──────────────────┐
                         │     USUÁRIO      │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │ Web / PWA / Mobile       │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ React + TypeScript       │
                    │ Tailwind + Router        │
                    └────────────┬─────────────┘
                                 │
                         HTTPS / REST
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Express API               │
                    ├──────────────────────────┤
                    │ Routes                    │
                    │ Middleware                │
                    │ Controllers               │
                    │ Services                  │
                    │ Repositories              │
                    └───────┬─────────┬────────┘
                            │         │
                            │         │ WebSocket
                            │         ▼
                            │   ┌──────────────┐
                            │   │  Socket.io   │
                            │   └──────────────┘
                            │
                    ┌───────┴──────────┐
                    │                  │
                    ▼                  ▼
             ┌──────────────┐  ┌──────────────┐
             │   MongoDB    │  │    Storage   │
             │              │  │              │
             │ Users        │  │ Documents    │
             │ Groups       │  │ Images       │
             │ Tasks        │  │ Attachments  │
             │ Messages     │  │              │
             │ Events       │  │              │
             └──────────────┘  └──────────────┘
```

---

# 81. Regra Arquitetural Final

O SOS Estudante deve ser desenvolvido como um sistema real e evolutivo, e não como um protótipo descartável.

A prioridade arquitetural é:

```text
Clareza
   ↓
Segurança
   ↓
Manutenibilidade
   ↓
Testabilidade
   ↓
Escalabilidade
   ↓
Performance
```

A arquitetura deve permanecer simples enquanto o sistema for pequeno e evoluir somente quando houver necessidade.

**Não adicionar complexidade apenas por antecipação.**

Toda decisão técnica deve favorecer a capacidade de o SOS Estudante crescer sem comprometer a estabilidade das funcionalidades existentes.

---

## Fim do documento

**Documento:** `ARCHITECTURE.md`
**Projeto:** SOS Estudante
**Slogan:** Organize. Estude. Conquiste.
