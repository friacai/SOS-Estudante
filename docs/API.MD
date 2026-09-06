# SOS ESTUDANTE — API SPECIFICATION

**Projeto:** SOS Estudante
**Versão:** 1.0
**Status:** Especificação inicial
**Base:** REST API
**Prefixo:** `/api/v1`

---

# 1. Objetivo

Este documento define o contrato da API REST do SOS Estudante.

A API será responsável por:

* autenticação;
* usuários;
* matérias;
* tarefas;
* arquivos;
* grupos;
* canais;
* mensagens;
* trabalhos;
* salas de aula;
* atividades;
* calendário;
* provas;
* sessões de estudo;
* Pomodoro;
* notificações;
* estatísticas;
* pesquisa global.

O frontend nunca deve acessar diretamente o banco de dados.

Fluxo:

```text
Frontend
   ↓
REST API
   ↓
Controllers
   ↓
Services
   ↓
Repositories / Models
   ↓
MongoDB
```

---

# 2. Base URL

Desenvolvimento:

```text
http://localhost:3000/api/v1
```

Produção:

```text
https://DOMINIO/api/v1
```

O domínio definitivo será configurado através de variável de ambiente.

---

# 3. Formato

A API utilizará JSON por padrão.

Exemplo:

```json
{
  "name": "João",
  "email": "joao@email.com"
}
```

Uploads de arquivos utilizarão:

```text
multipart/form-data
```

---

# 4. Resposta de Sucesso

Formato recomendado:

```json
{
  "success": true,
  "data": {},
  "message": "Operação realizada com sucesso."
}
```

Quando houver listas:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

# 5. Resposta de Erro

Formato padrão:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem para o usuário.",
    "details": {}
  }
}
```

Não retornar:

* stack trace;
* senha;
* passwordHash;
* JWT;
* secrets;
* informações internas do banco.

---

# 6. Códigos HTTP

Utilizar códigos HTTP corretamente.

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
```

---

# 7. Autenticação

Rotas protegidas exigem autenticação.

Conceitualmente:

```text
Authorization
        ↓
Authentication Middleware
        ↓
Controller
```

A estratégia definitiva de transporte do token deve seguir `AUTH.MD`.

---

# 8. Health Check

Endpoint:

```text
GET /health
```

Resposta:

```json
{
  "success": true,
  "status": "ok"
}
```

O health check não deve exigir autenticação.

---

# 9. AUTH — Autenticação

## Registrar

```text
POST /auth/register
```

Body:

```json
{
  "name": "Nome",
  "email": "email@example.com",
  "password": "senha"
}
```

Resposta:

```text
201 Created
```

---

## Login

```text
POST /auth/login
```

Body:

```json
{
  "email": "email@example.com",
  "password": "senha"
}
```

---

## Logout

```text
POST /auth/logout
```

Autenticação obrigatória.

---

## Usuário atual

```text
GET /auth/me
```

Autenticação obrigatória.

---

## Recuperação de senha

```text
POST /auth/forgot-password
```

Body:

```json
{
  "email": "email@example.com"
}
```

---

## Redefinir senha

```text
POST /auth/reset-password
```

Body:

```json
{
  "token": "RESET_TOKEN",
  "password": "novaSenha"
}
```

---

## Alterar senha

```text
POST /auth/change-password
```

Body:

```json
{
  "currentPassword": "senhaAtual",
  "newPassword": "novaSenha"
}
```

---

# 10. USERS — Usuários

## Obter perfil

```text
GET /users/me
```

---

## Atualizar perfil

```text
PATCH /users/me
```

Body possível:

```json
{
  "name": "Novo nome",
  "bio": "Minha descrição"
}
```

---

## Alterar avatar

```text
POST /users/me/avatar
```

Utiliza:

```text
multipart/form-data
```

---

## Excluir conta

```text
DELETE /users/me
```

A implementação definitiva deverá seguir as regras de privacidade e exclusão definidas em `DATABASE.MD`.

---

# 11. SUBJECTS — Matérias

## Listar matérias

```text
GET /subjects
```

---

## Criar matéria

```text
POST /subjects
```

Body:

```json
{
  "name": "Química",
  "knowledgeLevel": "basic",
  "difficulty": 3,
  "complexity": 3
}
```

---

## Obter matéria

```text
GET /subjects/:subjectId
```

---

## Atualizar matéria

```text
PATCH /subjects/:subjectId
```

---

## Excluir matéria

```text
DELETE /subjects/:subjectId
```

---

# 12. Níveis de Conhecimento

Valores permitidos:

```text
unknown
basic
medium
advanced
```

A API deve rejeitar valores fora dessa enumeração.

---

# 13. Dificuldade e Complexidade

Ambos utilizam:

```text
1
2
3
4
5
```

Onde:

```text
1 = menor
5 = maior
```

---

# 14. TASKS — Tarefas

## Listar tarefas

```text
GET /tasks
```

Filtros possíveis:

```text
status
subjectId
dueDate
priority
groupId
page
limit
sort
```

Exemplo:

```text
GET /tasks?status=pending&subjectId=123&page=1&limit=20
```

---

## Criar tarefa

```text
POST /tasks
```

Body:

```json
{
  "title": "Estudar ligações químicas",
  "description": "Revisar ligações iônicas e covalentes.",
  "subjectId": "SUBJECT_ID",
  "dueDate": "2026-09-10T18:00:00Z",
  "estimatedMinutes": 60
}
```

---

## Obter tarefa

```text
GET /tasks/:taskId
```

---

## Atualizar tarefa

```text
PATCH /tasks/:taskId
```

---

## Excluir tarefa

```text
DELETE /tasks/:taskId
```

---

## Concluir tarefa

```text
PATCH /tasks/:taskId/complete
```

---

# 15. Prioridade

O backend deverá calcular ou atualizar:

```text
priority
priorityScore
```

O cálculo deverá considerar as configurações definidas no projeto.

Fatores:

```text
prazo
dificuldade
complexidade
```

O usuário poderá configurar qual fator possui maior peso.

A lógica deverá ficar em um Service específico.

Exemplo:

```text
PriorityService
```

---

# 16. DASHBOARD

Endpoint:

```text
GET /dashboard
```

Pode retornar:

```json
{
  "tasksToday": [],
  "upcomingTasks": [],
  "nextTask": {},
  "upcomingExams": [],
  "studyStats": {},
  "notifications": []
}
```

O backend deve evitar consultas desnecessárias.

---

# 17. FILES — Arquivos

## Listar arquivos pessoais

```text
GET /files
```

Filtros:

```text
subjectId
type
folderId
page
limit
```

---

## Enviar arquivo

```text
POST /files
```

Utiliza:

```text
multipart/form-data
```

Campos:

```text
file
subjectId
type
dueDate
folderId
```

---

## Obter informações do arquivo

```text
GET /files/:fileId
```

---

## Download

```text
GET /files/:fileId/download
```

A API deve verificar autorização antes de disponibilizar o arquivo.

---

## Excluir arquivo

```text
DELETE /files/:fileId
```

---

# 18. Folders — Pastas

## Listar pastas

```text
GET /folders
```

---

## Criar pasta

```text
POST /folders
```

---

## Atualizar pasta

```text
PATCH /folders/:folderId
```

---

## Excluir pasta

```text
DELETE /folders/:folderId
```

---

# 19. GROUPS — Grupos

## Listar grupos do usuário

```text
GET /groups
```

---

## Criar grupo

```text
POST /groups
```

Body:

```json
{
  "name": "Grupo de Química",
  "description": "Estudos para a prova."
}
```

---

## Obter grupo

```text
GET /groups/:groupId
```

---

## Atualizar grupo

```text
PATCH /groups/:groupId
```

---

## Excluir grupo

```text
DELETE /groups/:groupId
```

Somente usuários autorizados.

---

# 20. Entrada em Grupo

## Entrar utilizando código

```text
POST /groups/join
```

Body:

```json
{
  "joinCode": "ABC123"
}
```

---

## Sair do grupo

```text
POST /groups/:groupId/leave
```

---

# 21. GROUP MEMBERS

## Listar membros

```text
GET /groups/:groupId/members
```

---

## Adicionar membro

```text
POST /groups/:groupId/members
```

---

## Alterar role

```text
PATCH /groups/:groupId/members/:memberId
```

---

## Remover membro

```text
DELETE /groups/:groupId/members/:memberId
```

Todas essas operações devem verificar permissões.

---

# 22. CHANNELS — Canais

## Listar canais

```text
GET /groups/:groupId/channels
```

---

## Criar canal

```text
POST /groups/:groupId/channels
```

Body:

```json
{
  "name": "Materiais",
  "type": "materials"
}
```

---

## Atualizar canal

```text
PATCH /channels/:channelId
```

---

## Excluir canal

```text
DELETE /channels/:channelId
```

---

# 23. Canais Padrão

Grupos poderão possuir inicialmente:

```text
Geral
Avisos
Materiais
Exercícios
Dúvidas
Trabalhos
```

Os identificadores internos podem utilizar:

```text
general
announcements
materials
exercises
questions
assignments
```

---

# 24. MESSAGES — Chat

## Listar mensagens

```text
GET /channels/:channelId/messages
```

Deve possuir paginação.

---

## Enviar mensagem

```text
POST /channels/:channelId/messages
```

Body:

```json
{
  "content": "Alguém entendeu a questão 5?"
}
```

---

## Editar mensagem

```text
PATCH /messages/:messageId
```

---

## Excluir mensagem

```text
DELETE /messages/:messageId
```

A autorização deve verificar o autor e/ou permissões administrativas.

---

# 25. Socket.io

O chat poderá utilizar Socket.io para comunicação em tempo real.

REST continua sendo responsável pelo armazenamento e recuperação de dados.

Arquitetura:

```text
Cliente
 ├── REST → operações persistentes
 │
 └── Socket.io → eventos em tempo real
```

Exemplos de eventos:

```text
message:send
message:new
message:edit
message:delete
typing:start
typing:stop
```

---

# 26. ASSIGNMENTS — Trabalhos

## Listar trabalhos

```text
GET /assignments
```

---

## Criar trabalho

```text
POST /assignments
```

---

## Obter trabalho

```text
GET /assignments/:assignmentId
```

---

## Atualizar trabalho

```text
PATCH /assignments/:assignmentId
```

---

## Excluir trabalho

```text
DELETE /assignments/:assignmentId
```

---

# 27. RESPONSIBILITIES — Responsabilidades

## Listar responsabilidades

```text
GET /assignments/:assignmentId/responsibilities
```

---

## Criar responsabilidade

```text
POST /assignments/:assignmentId/responsibilities
```

Body:

```json
{
  "title": "Pesquisar ligações químicas",
  "description": "Pesquisar fontes para o trabalho.",
  "userId": "USER_ID"
}
```

---

## Atualizar responsabilidade

```text
PATCH /responsibilities/:responsibilityId
```

---

## Excluir responsabilidade

```text
DELETE /responsibilities/:responsibilityId
```

---

# 28. SUBMISSIONS — Entregas

## Enviar atividade

```text
POST /activities/:activityId/submissions
```

---

## Listar entregas

```text
GET /activities/:activityId/submissions
```

Professores/responsáveis podem possuir acesso ampliado.

---

## Obter entrega

```text
GET /submissions/:submissionId
```

---

# 29. CLASSROOMS — Salas

## Listar salas

```text
GET /classrooms
```

---

## Criar sala

```text
POST /classrooms
```

---

## Obter sala

```text
GET /classrooms/:classroomId
```

---

## Atualizar sala

```text
PATCH /classrooms/:classroomId
```

---

## Excluir sala

```text
DELETE /classrooms/:classroomId
```

---

# 30. ACTIVITIES — Atividades

## Listar atividades

```text
GET /classrooms/:classroomId/activities
```

---

## Criar atividade

```text
POST /classrooms/:classroomId/activities
```

---

## Obter atividade

```text
GET /activities/:activityId
```

---

## Atualizar atividade

```text
PATCH /activities/:activityId
```

---

## Excluir atividade

```text
DELETE /activities/:activityId
```

---

# 31. EVENTS — Eventos

## Listar eventos

```text
GET /events
```

Filtros:

```text
startDate
endDate
type
```

---

## Criar evento

```text
POST /events
```

---

## Obter evento

```text
GET /events/:eventId
```

---

## Atualizar evento

```text
PATCH /events/:eventId
```

---

## Excluir evento

```text
DELETE /events/:eventId
```

---

# 32. EXAMS — Provas

## Listar provas

```text
GET /exams
```

---

## Criar prova

```text
POST /exams
```

---

## Obter prova

```text
GET /exams/:examId
```

---

## Atualizar prova

```text
PATCH /exams/:examId
```

---

## Excluir prova

```text
DELETE /exams/:examId
```

---

# 33. STUDY SESSIONS

## Iniciar sessão

```text
POST /study-sessions
```

Body:

```json
{
  "subjectId": "SUBJECT_ID",
  "taskId": "TASK_ID",
  "durationMinutes": 25
}
```

---

## Listar sessões

```text
GET /study-sessions
```

---

## Obter sessão

```text
GET /study-sessions/:sessionId
```

---

# 34. POMODORO

O Pomodoro utilizará:

```text
25 minutos
+
5 minutos
```

A contagem regressiva deve ser responsabilidade do frontend.

O backend deve registrar as sessões concluídas.

Não manter um timer de 25 minutos rodando no servidor.

---

# 35. NOTIFICATIONS — Notificações

## Listar notificações

```text
GET /notifications
```

---

## Marcar como lida

```text
PATCH /notifications/:notificationId/read
```

---

## Marcar todas como lidas

```text
PATCH /notifications/read-all
```

---

# 36. SEARCH — Pesquisa Global

Endpoint:

```text
GET /search
```

Parâmetro:

```text
q
```

Exemplo:

```text
GET /search?q=química
```

Pode pesquisar:

```text
tarefas
arquivos
grupos
mensagens
atividades
eventos
provas
matérias
```

O backend deve respeitar as permissões do usuário.

Um usuário nunca deve receber resultados de recursos aos quais não possui acesso.

---

# 37. STATISTICS — Estatísticas

## Estatísticas gerais

```text
GET /statistics
```

Pode retornar:

```json
{
  "tasksCompleted": 20,
  "tasksPending": 5,
  "studyMinutes": 450,
  "studySessions": 18
}
```

---

## Estatísticas por matéria

```text
GET /statistics/subjects
```

---

## Estatísticas por período

```text
GET /statistics?startDate=2026-09-01&endDate=2026-09-30
```

---

# 38. CALENDAR — Calendário

O calendário pode utilizar os endpoints:

```text
GET /events
GET /tasks
GET /exams
GET /activities
```

O frontend será responsável por combinar os dados visualmente.

---

# 39. AGENDA

Endpoint:

```text
GET /agenda
```

Pode retornar uma visão consolidada:

```text
tarefas
eventos
provas
atividades
sessões de estudo
```

---

# 40. Paginação

Listagens grandes devem utilizar paginação.

Parâmetros padrão:

```text
page=1
limit=20
```

Limite máximo recomendado:

```text
limit=100
```

O backend deve impedir valores abusivos.

---

# 41. Ordenação

Listagens podem utilizar:

```text
sort
order
```

Exemplo:

```text
GET /tasks?sort=dueDate&order=asc
```

Nunca permitir que o usuário transforme diretamente um parâmetro recebido em uma consulta MongoDB sem validação.

---

# 42. Filtros

Filtros devem possuir lista explícita de campos permitidos.

Não aceitar consultas MongoDB arbitrárias provenientes do cliente.

---

# 43. API Versioning

Todas as rotas públicas utilizarão:

```text
/api/v1
```

Mudanças incompatíveis devem utilizar uma nova versão:

```text
/api/v2
```

Não quebrar `/v1` silenciosamente.

---

# 44. Autorização

Cada endpoint deve declarar seu requisito de acesso.

Exemplo:

```text
GET /groups/:groupId
→ authenticated + group member
```

Outro:

```text
DELETE /groups/:groupId
→ authenticated + group owner
```

Outro:

```text
POST /classrooms/:classroomId/activities
→ authenticated + authorized teacher
```

---

# 45. Ownership

Recursos pessoais devem verificar:

```text
resource.userId === authenticatedUser.id
```

Recursos de grupo devem verificar:

```text
authenticatedUser ∈ groupMembers
```

antes de conceder acesso.

---

# 46. Uploads

Uploads devem passar por:

```text
Authentication
      ↓
Authorization
      ↓
Multer
      ↓
Validation
      ↓
StorageService
      ↓
Database
```

Nunca confiar somente na extensão do arquivo.

---

# 47. Idempotência

Operações que possam ser repetidas acidentalmente devem ser analisadas para evitar duplicação.

Exemplos:

* submissões;
* convites;
* criação de determinados registros;
* processamento de uploads.

---

# 48. Transações

Operações que alteram múltiplos documentos relacionados podem utilizar transações MongoDB quando necessário.

Exemplo:

```text
Criar trabalho
      ↓
Criar responsabilidades
      ↓
Atualizar relacionamentos
```

---

# 49. Controllers

Controllers devem ser responsáveis principalmente por:

* receber request;
* validar fluxo;
* chamar Service;
* retornar response.

Não colocar regras complexas de negócio dentro dos controllers.

---

# 50. Services

Services devem conter regras de negócio.

Exemplos:

```text
AuthService
PriorityService
GroupService
TaskService
FileService
NotificationService
StatisticsService
```

---

# 51. Repositories

Quando utilizados, repositories devem abstrair acesso ao banco.

Exemplos:

```text
UserRepository
TaskRepository
GroupRepository
FileRepository
```

---

# 52. Validação

Todas as rotas devem validar:

* body;
* params;
* query;
* arquivos;
* permissões.

Biblioteca de validação poderá ser escolhida durante implementação, desde que seja consistente.

---

# 53. Segurança

A API deve implementar:

* autenticação;
* autorização;
* rate limiting;
* validação;
* CORS;
* proteção contra NoSQL injection;
* proteção contra IDOR;
* controle de uploads;
* tratamento seguro de erros;
* secrets em `.env`.

---

# 54. Observabilidade

O backend deverá possuir logs estruturados suficientes para diagnosticar problemas.

Nunca registrar:

```text
password
passwordHash
JWT
resetToken
refreshToken
```

---

# 55. Compatibilidade

A API deve ser preparada para consumo por:

```text
React Web
PWA
Android
iOS
```

O frontend não deve depender de detalhes internos do banco.

---

# 56. Documentação Futura

A API poderá futuramente possuir documentação automática utilizando:

```text
OpenAPI / Swagger
```

Quando implementada, deverá refletir este documento.

---

# 57. Regra para Agentes

Antes de modificar endpoints, o agente deve:

1. ler `PROJECT_SPEC.md`;
2. ler `ARCHITECTURE.md`;
3. ler `DATABASE.MD`;
4. ler `AUTH.MD`;
5. ler `API.MD`;
6. verificar implementação atual;
7. evitar breaking changes;
8. atualizar documentação se necessário;
9. executar testes.

---

# 58. Ordem de Implementação

A API deverá ser construída incrementalmente.

### Fase 1

```text
health
auth
users
```

### Fase 2

```text
subjects
tasks
dashboard
```

### Fase 3

```text
files
folders
```

### Fase 4

```text
groups
members
channels
messages
```

### Fase 5

```text
assignments
responsibilities
classrooms
activities
submissions
```

### Fase 6

```text
events
exams
study-sessions
pomodoro
```

### Fase 7

```text
notifications
search
statistics
agenda
```

---

# 59. Critérios de Aceitação

A API será considerada funcional quando:

* endpoints principais existirem;
* autenticação funcionar;
* autorização funcionar;
* respostas seguirem formato consistente;
* erros forem tratados;
* paginação funcionar;
* validação funcionar;
* uploads forem protegidos;
* recursos privados estiverem protegidos;
* testes cobrirem operações críticas;
* nenhuma senha ou secret for exposta;
* `/api/v1` permanecer estável.

---

# 60. Regra Final

A API do SOS Estudante deve seguir:

```text
REST
+
Segurança
+
Consistência
+
Validação
+
Autorização
+
Testabilidade
```

O frontend deve consumir a API através de serviços.

O backend deve ser a autoridade final sobre:

```text
autenticação
permissões
dados
regras de negócio
```

Nenhum agente deve implementar uma funcionalidade ignorando este contrato.

---

## Fim do documento

**Documento:** `API.MD`
**Projeto:** SOS Estudante
**Versão:** 1.0
