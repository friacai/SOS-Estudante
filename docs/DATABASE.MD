# SOS ESTUDANTE — DATABASE

**Projeto:** SOS Estudante
**Versão:** 1.0
**Status:** Modelagem inicial
**Banco de dados:** MongoDB
**ODM:** Mongoose
**Documento:** Modelo de Dados

---

# 1. Objetivo

Este documento define a estrutura de dados oficial do SOS Estudante.

O banco de dados deve armazenar de forma organizada e segura:

* usuários;
* disciplinas;
* tarefas;
* arquivos;
* grupos;
* membros;
* canais;
* mensagens;
* trabalhos;
* responsabilidades;
* salas;
* atividades;
* entregas;
* eventos;
* provas;
* sessões de estudo;
* notificações;
* preferências;
* estatísticas.

A modelagem deve permitir crescimento futuro sem criar dependências desnecessárias entre os módulos.

---

# 2. Banco de Dados

O sistema utilizará:

```text
MongoDB
```

A comunicação será feita através de:

```text
Node.js
    ↓
Mongoose
    ↓
MongoDB
```

O frontend nunca terá acesso direto ao MongoDB.

---

# 3. Princípios de Modelagem

A modelagem deve seguir:

* identificação única por documento;
* referências entre entidades quando apropriado;
* validação através de Mongoose;
* índices para consultas frequentes;
* timestamps;
* controle de acesso;
* minimização de dados duplicados;
* possibilidade de expansão.

Cada documento deverá possuir:

```text
_id
createdAt
updatedAt
```

quando aplicável.

---

# 4. Visão Geral das Collections

Collections principais:

```text
users
subjects
tasks
files
groups
groupMembers
channels
messages
assignments
assignmentResponsibilities
submissions
classrooms
activities
events
exams
studySessions
notifications
```

Collections adicionais poderão ser criadas conforme a implementação exigir.

---

# 5. Relacionamento Geral

Visão simplificada:

```text
User
 ├── Subjects
 ├── Tasks
 ├── Files
 ├── Groups
 │    ├── Members
 │    ├── Channels
 │    │    └── Messages
 │    ├── Files
 │    ├── Tasks
 │    ├── Assignments
 │    │    ├── Responsibilities
 │    │    └── Submissions
 │    ├── Classroom
 │    └── Events
 │
 ├── Exams
 ├── Events
 ├── Study Sessions
 └── Notifications
```

---

# 6. User

Collection:

```text
users
```

Representa uma conta do SOS Estudante.

Campos principais:

```text
_id
name
email
passwordHash
avatar
bio
role
timezone
preferences
isActive
lastLoginAt
createdAt
updatedAt
```

---

## 6.1 name

Tipo:

```text
String
```

Nome de exibição do usuário.

Obrigatório.

---

## 6.2 email

Tipo:

```text
String
```

Email da conta.

Obrigatório.

Deve possuir índice único.

Comparações devem ser feitas de maneira consistente, preferencialmente utilizando lowercase.

---

## 6.3 passwordHash

Tipo:

```text
String
```

Armazena somente o hash da senha.

Nunca armazenar a senha original.

Hash:

```text
bcrypt
```

---

## 6.4 avatar

Tipo:

```text
String | null
```

Referência ou URL da imagem de perfil.

---

## 6.5 bio

Tipo:

```text
String | null
```

Descrição opcional do usuário.

---

## 6.6 role

Tipo:

```text
Enum
```

Valores previstos:

```text
student
teacher
responsible
```

O sistema de grupos possui papéis próprios e não deve depender exclusivamente deste campo.

---

## 6.7 timezone

Tipo:

```text
String
```

Exemplo:

```text
America/Sao_Paulo
```

Permite que datas e horários sejam apresentados corretamente.

---

## 6.8 preferences

Objeto contendo preferências do usuário.

Exemplo conceitual:

```json
{
  "theme": "system",
  "language": "pt-BR",
  "notifications": {
    "messages": true,
    "tasks": true,
    "events": true
  }
}
```

---

# 7. Subject

Collection:

```text
subjects
```

Representa uma disciplina associada a um usuário.

Campos:

```text
_id
userId
name
knowledgeLevel
difficulty
complexity
color
isCustom
createdAt
updatedAt
```

---

## 7.1 userId

Referência:

```text
users._id
```

Indica o proprietário da disciplina.

---

## 7.2 name

Nome da disciplina.

Exemplos:

```text
Química
Matemática
Física
Biologia
História
Geografia
Inglês
Português
```

---

## 7.3 knowledgeLevel

Valores:

```text
none
basic
intermediate
advanced
```

Correspondência:

```text
none        → Não sei
basic       → Básico
intermediate → Médio
advanced    → Avançado
```

---

## 7.4 difficulty

Número de:

```text
1 a 5
```

Representa a dificuldade percebida da disciplina.

---

## 7.5 complexity

Número de:

```text
1 a 5
```

Representa a complexidade do conteúdo.

---

## 7.6 isCustom

Booleano.

Indica se a disciplina foi criada pelo usuário.

---

# 8. Task

Collection:

```text
tasks
```

Representa uma tarefa.

Campos:

```text
_id
userId
groupId
subjectId
title
description
status
priority
priorityScore
dueDate
estimatedMinutes
completedAt
attachments
createdAt
updatedAt
```

---

## 8.1 userId

Usuário responsável pela tarefa.

---

## 8.2 groupId

Referência opcional:

```text
groups._id
```

Quando a tarefa pertence a um grupo.

Para tarefas pessoais:

```text
null
```

---

## 8.3 subjectId

Referência opcional para:

```text
subjects._id
```

---

## 8.4 status

Valores:

```text
pending
in_progress
completed
cancelled
```

---

## 8.5 priority

Valores:

```text
low
medium
high
urgent
```

---

## 8.6 priorityScore

Número utilizado pelo sistema de priorização.

O valor pode ser calculado a partir de:

```text
prazo
dificuldade
complexidade
importância
preferências do usuário
```

---

# 9. File

Collection:

```text
files
```

Representa arquivos enviados ao sistema.

Campos:

```text
_id
ownerId
groupId
folderId
uploadedBy
name
originalName
mimeType
extension
size
storageKey
visibility
subjectId
taskId
assignmentId
createdAt
updatedAt
```

---

## 9.1 ownerId

Proprietário lógico do arquivo.

---

## 9.2 groupId

Grupo associado, quando aplicável.

---

## 9.3 storageKey

Identificador utilizado pelo serviço de armazenamento.

O banco não deve depender do caminho físico do arquivo.

---

## 9.4 visibility

Valores:

```text
private
group
shared
```

---

# 10. Group

Collection:

```text
groups
```

Representa um grupo de estudos.

Campos:

```text
_id
name
description
avatar
ownerId
joinCode
settings
createdAt
updatedAt
```

---

## 10.1 ownerId

Referência para:

```text
users._id
```

Usuário proprietário do grupo.

---

## 10.2 joinCode

Código utilizado para entrada no grupo.

Deve ser:

* único;
* suficientemente difícil de adivinhar;
* revogável;
* regenerável.

---

## 10.3 settings

Exemplo:

```json
{
  "allowMemberInvites": true,
  "allowMemberFileUpload": true,
  "allowMemberCreateTasks": true
}
```

---

# 11. GroupMember

Collection:

```text
groupMembers
```

Representa a participação de um usuário em um grupo.

Campos:

```text
_id
groupId
userId
role
status
joinedAt
createdAt
updatedAt
```

---

## 11.1 role

Valores:

```text
owner
admin
teacher
member
guest
```

---

## 11.2 status

Valores:

```text
active
invited
blocked
removed
```

---

# 12. Channel

Collection:

```text
channels
```

Representa um canal dentro de um grupo.

Campos:

```text
_id
groupId
name
description
type
position
createdBy
isArchived
createdAt
updatedAt
```

---

## 12.1 type

Valores:

```text
text
announcement
materials
questions
assignments
```

Os canais padrão podem ser:

```text
Geral
Avisos
Materiais
Exercícios
Dúvidas
Trabalhos
```

---

# 13. Message

Collection:

```text
messages
```

Representa uma mensagem em um canal.

Campos:

```text
_id
channelId
senderId
content
attachments
replyTo
isEdited
editedAt
isDeleted
createdAt
updatedAt
```

---

## 13.1 content

Texto da mensagem.

---

## 13.2 attachments

Lista de referências para arquivos.

---

## 13.3 replyTo

Referência opcional para outra mensagem.

---

## 13.4 isDeleted

Indica exclusão lógica da mensagem.

Mensagens podem ser mantidas no banco para preservar integridade de conversas, conforme política de retenção definida posteriormente.

---

# 14. Assignment

Collection:

```text
assignments
```

Representa um trabalho ou atividade colaborativa.

Campos:

```text
_id
groupId
classroomId
createdBy
title
description
status
priority
dueDate
subjectId
attachments
createdAt
updatedAt
```

---

## 14.1 status

Valores:

```text
draft
active
in_review
completed
archived
```

---

# 15. AssignmentResponsibility

Collection:

```text
assignmentResponsibilities
```

Representa a divisão de responsabilidades de um trabalho.

Campos:

```text
_id
assignmentId
userId
description
status
dueDate
createdAt
updatedAt
```

---

## 15.1 status

Valores:

```text
pending
in_progress
completed
```

Exemplo conceitual:

```text
Trabalho
│
├── João → pesquisa
├── Maria → apresentação
├── Pedro → referências
└── Ana → revisão
```

---

# 16. Submission

Collection:

```text
submissions
```

Representa a entrega de uma atividade.

Campos:

```text
_id
assignmentId
studentId
files
comment
status
submittedAt
reviewedAt
reviewedBy
feedback
createdAt
updatedAt
```

---

## 16.1 status

Valores:

```text
draft
submitted
late
reviewed
returned
```

---

# 17. Classroom

Collection:

```text
classrooms
```

Representa uma sala de aula.

Campos:

```text
_id
name
description
teacherId
groupId
subjectId
school
room
schedule
createdAt
updatedAt
```

---

# 18. Activity

Collection:

```text
activities
```

Representa uma atividade escolar.

Campos:

```text
_id
classroomId
createdBy
title
description
type
dueDate
maxScore
attachments
status
createdAt
updatedAt
```

---

## 18.1 type

Exemplos:

```text
assignment
exercise
project
quiz
research
presentation
```

---

# 19. Event

Collection:

```text
events
```

Representa eventos do calendário.

Campos:

```text
_id
ownerId
groupId
classroomId
title
description
type
startAt
endAt
allDay
location
color
createdAt
updatedAt
```

---

## 19.1 type

Valores possíveis:

```text
personal
study
group
assignment
exam
school
other
```

---

# 20. Exam

Collection:

```text
exams
```

Representa uma prova ou avaliação.

Campos:

```text
_id
userId
groupId
classroomId
subjectId
title
description
date
location
topics
createdAt
updatedAt
```

---

# 21. StudySession

Collection:

```text
studySessions
```

Representa uma sessão de estudo.

Campos:

```text
_id
userId
subjectId
taskId
groupId
startedAt
endedAt
durationMinutes
type
completed
createdAt
updatedAt
```

---

## 21.1 type

Valores:

```text
pomodoro
free
group
```

---

# 22. Notification

Collection:

```text
notifications
```

Representa uma notificação.

Campos:

```text
_id
userId
type
title
message
data
readAt
createdAt
```

---

## 22.1 type

Exemplos:

```text
message
group_invite
task
assignment
submission
exam
event
announcement
system
```

---

# 23. Folder

Collection opcional:

```text
folders
```

Utilizada para organização de arquivos.

Campos:

```text
_id
ownerId
groupId
parentId
name
createdAt
updatedAt
```

Permite estrutura hierárquica:

```text
Matemática
├── Exercícios
├── Provas
└── Resumos
```

---

# 24. IDs e Referências

MongoDB utilizará:

```text
ObjectId
```

As referências devem utilizar os IDs das collections correspondentes.

Exemplo:

```text
tasks.userId
        ↓
users._id
```

---

# 25. Timestamps

Collections relevantes devem utilizar:

```text
createdAt
updatedAt
```

Entidades que possuem estados temporais importantes podem possuir campos adicionais.

Exemplos:

```text
completedAt
submittedAt
reviewedAt
readAt
joinedAt
lastLoginAt
```

---

# 26. Índices

Índices devem ser criados para consultas frequentes.

Exemplos:

### Users

```text
email: unique
```

### Subjects

```text
userId
```

### Tasks

```text
userId + dueDate
groupId + dueDate
subjectId
status
```

### Files

```text
ownerId
groupId
uploadedBy
```

### Groups

```text
ownerId
joinCode: unique
```

### GroupMembers

```text
groupId + userId: unique
userId
```

### Channels

```text
groupId
```

### Messages

```text
channelId + createdAt
senderId
```

### Events

```text
ownerId + startAt
groupId + startAt
```

### Notifications

```text
userId + createdAt
userId + readAt
```

Os índices definitivos devem ser revisados conforme consultas reais da aplicação.

---

# 27. Integridade

O backend deve validar referências antes de realizar operações importantes.

Exemplo:

```text
Criar tarefa em grupo
        ↓
Verificar grupo
        ↓
Verificar usuário
        ↓
Verificar associação
        ↓
Criar tarefa
```

Não confiar apenas na existência de um ID enviado pelo cliente.

---

# 28. Exclusão

Sempre que possível, considerar exclusão lógica para entidades importantes.

Exemplos:

```text
isDeleted
deletedAt
```

Especialmente em:

* mensagens;
* grupos;
* arquivos;
* atividades;
* trabalhos.

A exclusão física deve ser utilizada quando apropriado, especialmente para arquivos ou dados que precisam ser permanentemente removidos.

---

# 29. Dados Privados

Os seguintes dados devem ser protegidos:

* passwordHash;
* informações pessoais;
* arquivos privados;
* tarefas pessoais;
* estatísticas pessoais;
* dados de grupos privados.

Nunca retornar `passwordHash` pela API.

---

# 30. Controle de Acesso

O acesso aos documentos deve ser verificado no backend.

Exemplo:

```text
GET /groups/:groupId/files
```

O backend deve verificar:

```text
usuário autenticado?
        ↓
grupo existe?
        ↓
usuário pertence ao grupo?
        ↓
usuário possui permissão?
        ↓
retornar arquivos
```

---

# 31. Dados de Arquivos

O banco deve armazenar metadados.

Não armazenar necessariamente o conteúdo binário diretamente no documento MongoDB.

Exemplo:

```text
File
│
├── originalName
├── mimeType
├── size
├── storageKey
└── uploadedBy
```

O conteúdo será administrado pelo `StorageService`.

---

# 32. Relacionamento com Disciplinas

Disciplinas podem ser utilizadas por:

```text
Tasks
Exams
Assignments
Activities
StudySessions
```

Exemplo:

```text
Subject
   │
   ├── Tasks
   ├── Exams
   ├── Activities
   └── StudySessions
```

---

# 33. Relacionamento entre Grupo e Usuário

Um usuário pode participar de vários grupos.

Um grupo pode possuir vários usuários.

Portanto:

```text
User N ←→ N Group
```

A relação será representada pela collection:

```text
groupMembers
```

---

# 34. Relacionamento entre Grupo e Canal

Um grupo pode possuir vários canais.

```text
Group 1 → N Channels
```

Cada canal pertence a exatamente um grupo.

---

# 35. Relacionamento entre Canal e Mensagem

Um canal possui várias mensagens.

```text
Channel 1 → N Messages
```

Cada mensagem pertence a um canal.

---

# 36. Relacionamento entre Trabalho e Responsabilidades

Um trabalho pode possuir várias responsabilidades.

```text
Assignment 1 → N Responsibilities
```

Cada responsabilidade é atribuída a um usuário.

---

# 37. Relacionamento entre Atividade e Entrega

Uma atividade ou trabalho pode possuir várias entregas.

```text
Assignment 1 → N Submissions
```

Cada submissão pertence a um aluno.

---

# 38. Relacionamento entre Usuário e Sessões de Estudo

Um usuário pode possuir várias sessões.

```text
User 1 → N StudySessions
```

Isso permitirá gerar estatísticas posteriormente.

---

# 39. Estatísticas

As estatísticas devem preferencialmente ser calculadas a partir dos dados reais.

Exemplos:

```text
StudySessions
Tasks
Assignments
Submissions
Exams
```

Não é obrigatório manter uma collection separada de estatísticas inicialmente.

Caso o volume cresça, dados agregados poderão ser armazenados em estruturas específicas para melhorar performance.

---

# 40. Dashboard

O dashboard poderá reunir dados de várias collections.

Exemplo:

```text
Dashboard
   │
   ├── Tasks
   ├── Exams
   ├── Events
   ├── Notifications
   ├── StudySessions
   └── Statistics
```

O backend pode fornecer endpoints específicos para dashboard para evitar múltiplas requisições desnecessárias.

---

# 41. Prioridade de Tarefas

A prioridade pode utilizar:

```text
dueDate
difficulty
complexity
importance
userPreferences
```

A pontuação não precisa ser armazenada permanentemente se puder ser calculada de forma eficiente.

Se `priorityScore` for persistido, sua atualização deve ocorrer quando os dados relevantes mudarem.

---

# 42. Soft Delete

Quando uma entidade utilizar exclusão lógica:

```text
isDeleted: Boolean
deletedAt: Date | null
```

As consultas normais devem excluir documentos deletados.

Consultas administrativas podem incluir registros deletados quando necessário.

---

# 43. Paginação

Collections que podem crescer indefinidamente devem suportar paginação.

Principalmente:

```text
messages
files
notifications
tasks
submissions
```

Evitar retornar grandes quantidades de documentos de uma vez.

---

# 44. Ordenação

Listagens devem possuir ordenação explícita.

Exemplos:

```text
Messages → createdAt ASC
Tasks → dueDate ASC
Notifications → createdAt DESC
Files → createdAt DESC
```

---

# 45. Auditoria

Funcionalidades administrativas poderão futuramente possuir logs de auditoria.

Exemplo:

```text
AuditLog
```

Possíveis eventos:

```text
group_created
member_removed
permission_changed
file_deleted
assignment_created
```

A implementação poderá ser adicionada quando o sistema de administração justificar.

---

# 46. Escalabilidade

A modelagem deve evitar documentos excessivamente grandes.

Não armazenar listas potencialmente ilimitadas dentro de um único documento.

Por exemplo, mensagens devem possuir sua própria collection:

```text
messages
```

em vez de:

```text
Group
└── messages: [milhares de mensagens]
```

---

# 47. Consistência

Operações que modificam múltiplas collections devem considerar transações MongoDB quando necessário.

Exemplo:

```text
Criar trabalho
      ↓
Criar responsabilidades
      ↓
Criar notificações
```

Transações devem ser utilizadas somente quando a consistência exigir.

---

# 48. Dados Temporários

Dados temporários não precisam necessariamente ser persistidos no MongoDB.

Exemplos:

* estado atual de um timer;
* estado visual de um modal;
* filtros temporários;
* estado de conexão Socket.io.

Somente informações relevantes para histórico ou sincronização devem ser persistidas.

---

# 49. Cache e Dados Derivados

Dados derivados podem ser armazenados futuramente para melhorar performance.

Exemplos:

```text
statistics summaries
dashboard summaries
search indexes
```

A fonte de verdade deve continuar sendo os dados principais.

---

# 50. Migrações

Alterações de schema devem ser controladas.

Quando uma alteração puder quebrar dados existentes:

1. documentar a alteração;
2. criar estratégia de migração;
3. testar;
4. executar migração;
5. validar dados.

Não modificar schemas de produção sem considerar documentos existentes.

---

# 51. Seed Inicial

Durante desenvolvimento poderá existir um seed para:

* disciplinas padrão;
* dados de teste;
* usuário de desenvolvimento;
* grupos de teste.

Dados de seed nunca devem substituir dados reais.

---

# 52. Ambiente de Teste

O ambiente de testes deve utilizar banco separado.

Nunca executar testes destrutivos no banco de produção.

---

# 53. Segurança do Banco

Credenciais do MongoDB devem permanecer em variáveis de ambiente.

Exemplo:

```text
MONGODB_URI
```

Nunca versionar:

```text
senha
token
credential
connection string privada
```

---

# 54. Regras para Mongoose

Schemas devem possuir:

* tipos;
* required quando necessário;
* enums;
* defaults;
* validações;
* índices;
* timestamps.

Exemplo conceitual:

```text
TaskSchema
 ├── userId: ObjectId
 ├── title: String
 ├── status: Enum
 ├── dueDate: Date
 └── timestamps
```

---

# 55. Regras para Agents de IA

Antes de modificar um model, o agente deve:

1. ler este documento;
2. verificar o model existente;
3. verificar referências;
4. verificar API;
5. verificar services;
6. verificar migrations;
7. atualizar documentação quando necessário;
8. executar testes.

Nunca alterar um schema sem verificar suas dependências.

---

# 56. Ordem de Implementação dos Models

A implementação recomendada:

```text
1. User
   ↓
2. Subject
   ↓
3. Task
   ↓
4. File / Folder
   ↓
5. Group
   ↓
6. GroupMember
   ↓
7. Channel
   ↓
8. Message
   ↓
9. Classroom
   ↓
10. Assignment
   ↓
11. AssignmentResponsibility
   ↓
12. Submission
   ↓
13. Event
   ↓
14. Exam
   ↓
15. StudySession
   ↓
16. Notification
```

---

# 57. Arquitetura de Dados Final

A estrutura principal pode ser representada:

```text
                         USER
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
       SUBJECTS         TASKS           FILES
          │               │
          │               │
          ├───────────────┤
          │
          ▼
        EXAMS
          │
          ▼
    STUDY SESSIONS


                         GROUP
                           │
          ┌────────────────┼─────────────────┐
          │                │                 │
          ▼                ▼                 ▼
      MEMBERS          CHANNELS           FILES
                           │
                           ▼
                       MESSAGES

                           │
                           ▼
                      ASSIGNMENTS
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
           RESPONSIBILITIES     SUBMISSIONS

                           │
                           ▼
                       CLASSROOM
                           │
                           ▼
                       ACTIVITIES

USER / GROUP / CLASSROOM
          │
          ▼
        EVENTS

USER
 │
 └── NOTIFICATIONS
```

---

# 58. Fonte de Verdade

A hierarquia da documentação de dados será:

```text
PROJECT_SPEC.md
       ↓
ARCHITECTURE.md
       ↓
DATABASE.MD
       ↓
Mongoose Schemas
       ↓
Services
       ↓
API
       ↓
Frontend
```

Caso o código e esta documentação estejam diferentes, a divergência deve ser investigada e corrigida.

Não assumir automaticamente que o código está correto.

---

# 59. Critérios de Aceitação

A camada de banco será considerada adequadamente implementada quando:

* MongoDB estiver conectado;
* schemas estiverem definidos;
* referências estiverem corretas;
* validações estiverem funcionando;
* índices relevantes existirem;
* autenticação utilizar User;
* dados privados estiverem protegidos;
* relações de grupos funcionarem;
* arquivos possuírem metadados;
* tarefas puderem ser persistidas;
* calendário puder ser persistido;
* trabalhos e entregas puderem ser persistidos;
* sessões de estudo puderem ser registradas;
* notificações puderem ser persistidas;
* testes relevantes estiverem funcionando.

---

# 60. Regra Final

O banco de dados do SOS Estudante deve ser:

```text
Simples
   ↓
Consistente
   ↓
Seguro
   ↓
Testável
   ↓
Escalável
```

Não adicionar collections, campos ou relações apenas porque podem ser úteis no futuro.

Cada entidade deve possuir uma finalidade clara.

A modelagem deve evoluir junto com o sistema, preservando compatibilidade com dados existentes.

---

## Fim do documento

**Documento:** `DATABASE.MD`
**Projeto:** SOS Estudante
**Banco:** MongoDB
**ODM:** Mongoose
**Slogan:** Organize. Estude. Conquiste.
