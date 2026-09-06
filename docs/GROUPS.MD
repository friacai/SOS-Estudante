# SOS ESTUDANTE — GROUPS SPECIFICATION

**Projeto:** SOS Estudante
**Versão:** 1.0
**Status:** Especificação inicial
**Documento:** Grupos e colaboração

---

# 1. Objetivo

Este documento define o funcionamento dos recursos colaborativos do SOS Estudante.

Inclui:

* grupos de estudo;
* membros;
* convites;
* códigos de entrada;
* cargos;
* permissões;
* canais;
* chat;
* arquivos compartilhados;
* trabalhos colaborativos;
* responsabilidades;
* Kanban;
* atividades;
* salas de aula;
* notificações relacionadas aos grupos.

---

# 2. Conceito de Grupo

Um grupo representa um espaço colaborativo onde estudantes e outros usuários podem trabalhar juntos.

Exemplos:

```text
Grupo de Química
Grupo de Trabalho — História
Turma 2ºA
Projeto de Biologia
Grupo de Estudos para Vestibular
```

Cada grupo possui:

* nome;
* descrição;
* proprietário;
* membros;
* canais;
* arquivos;
* trabalhos;
* atividades;
* configurações.

---

# 3. Criação de Grupo

Endpoint:

```text
POST /api/v1/groups
```

Body:

```json
{
  "name": "Grupo de Química",
  "description": "Grupo para estudar química."
}
```

O usuário que criar o grupo será automaticamente:

```text
owner
```

---

# 4. Identificação

Cada grupo possuirá um:

```text
groupId
```

O ID interno não deve ser utilizado como mecanismo de autorização.

A autorização sempre deve verificar a relação entre usuário e grupo.

---

# 5. Código de Entrada

Grupos podem possuir um código para entrada.

Exemplo:

```text
QMC7A2
```

O código deve:

* ser suficientemente aleatório;
* possuir tamanho adequado;
* ser único quando necessário;
* poder ser regenerado;
* não revelar informações pessoais.

---

# 6. Entrar em Grupo

Endpoint:

```text
POST /api/v1/groups/join
```

Body:

```json
{
  "joinCode": "QMC7A2"
}
```

Fluxo:

```text
Código
 ↓
Encontrar grupo
 ↓
Verificar grupo ativo
 ↓
Verificar usuário
 ↓
Verificar se já é membro
 ↓
Adicionar membro
```

---

# 7. Convites

Grupos poderão convidar usuários diretamente.

Fluxo:

```text
Owner/Admin
     ↓
Convite
     ↓
Usuário recebe notificação
     ↓
Aceitar / Recusar
```

O convite deve possuir validade.

---

# 8. Status do Convite

Valores:

```text
pending
accepted
declined
expired
cancelled
```

---

# 9. Membros

Cada membro será representado através da relação:

```text
GroupMember
```

Relação:

```text
User
  ↕
GroupMember
  ↕
Group
```

Isso permite que um usuário participe de vários grupos.

---

# 10. Roles

Os cargos disponíveis são:

```text
owner
admin
teacher
member
guest
```

---

# 11. Owner

O `owner` é o proprietário do grupo.

Possui controle máximo sobre o grupo.

Pode:

* alterar configurações;
* alterar informações;
* gerenciar membros;
* alterar cargos;
* criar canais;
* excluir canais;
* gerenciar arquivos;
* gerenciar trabalhos;
* excluir o grupo;
* transferir propriedade.

---

# 12. Admin

O `admin` auxilia na administração do grupo.

Pode possuir:

* gerenciamento de membros;
* moderação;
* gerenciamento de canais;
* gerenciamento de arquivos;
* gerenciamento de conteúdo.

O owner pode limitar permissões administrativas.

---

# 13. Teacher

O `teacher` representa um professor ou responsável educacional dentro daquele contexto.

Pode possuir permissões como:

* criar atividades;
* criar avisos;
* publicar materiais;
* revisar entregas;
* acompanhar trabalhos;
* administrar conteúdos educacionais.

---

# 14. Member

O membro comum pode:

* visualizar conteúdos;
* enviar mensagens;
* participar de trabalhos;
* enviar arquivos quando permitido;
* criar conteúdos quando permitido;
* responder atividades;
* utilizar o Kanban quando autorizado.

---

# 15. Guest

O convidado possui acesso limitado.

Exemplo:

```text
visualização
+
participação limitada
```

Por padrão, não deve possuir permissões administrativas.

---

# 16. Hierarquia

A hierarquia padrão será:

```text
OWNER
  ↓
ADMIN
  ↓
TEACHER
  ↓
MEMBER
  ↓
GUEST
```

Essa ordem representa privilégio padrão, não necessariamente todas as permissões possíveis.

---

# 17. Regra de Segurança

Nunca confiar no role enviado pelo frontend.

Exemplo inválido:

```json
{
  "role": "owner"
}
```

A API deve determinar o cargo através do banco de dados.

---

# 18. Alteração de Role

Endpoint:

```text
PATCH /api/v1/groups/:groupId/members/:memberId
```

Exemplo:

```json
{
  "role": "admin"
}
```

Somente usuários autorizados podem realizar essa operação.

---

# 19. Proteção do Owner

O sistema deve impedir que:

* um member vire owner;
* um admin remova o owner;
* um usuário remova a própria propriedade acidentalmente;
* existam dois owners simultaneamente sem uma regra explícita.

---

# 20. Transferência de Propriedade

Endpoint futuro:

```text
POST /api/v1/groups/:groupId/transfer-ownership
```

Fluxo:

```text
Owner
 ↓
Selecionar membro
 ↓
Confirmar
 ↓
Novo Owner
 ↓
Antigo Owner → role apropriada
```

A operação deve exigir confirmação explícita.

---

# 21. Remover Membro

Endpoint:

```text
DELETE /api/v1/groups/:groupId/members/:memberId
```

A API deve verificar:

```text
usuário autenticado
+
membro pertence ao grupo
+
usuário possui permissão
```

---

# 22. Sair do Grupo

Endpoint:

```text
POST /api/v1/groups/:groupId/leave
```

O owner não poderá simplesmente sair caso não exista outro proprietário.

Deve primeiro:

* transferir propriedade;
* ou excluir o grupo.

---

# 23. Canais

Cada grupo poderá possuir múltiplos canais.

Canais organizam a comunicação.

Canais padrão:

```text
Geral
Avisos
Materiais
Exercícios
Dúvidas
Trabalhos
```

---

# 24. Tipos de Canal

Valores internos:

```text
general
announcements
materials
exercises
questions
assignments
custom
```

---

# 25. Canal Geral

O canal `Geral` será destinado à comunicação cotidiana.

Exemplos:

* dúvidas gerais;
* conversas;
* avisos rápidos;
* organização.

---

# 26. Canal Avisos

Destinado a comunicados importantes.

Pode possuir permissões de postagem restritas.

Por padrão:

```text
owner
admin
teacher
```

podem criar avisos.

---

# 27. Canal Materiais

Destinado ao compartilhamento de:

* PDFs;
* imagens;
* documentos;
* apresentações;
* links;
* materiais de estudo.

Arquivos continuam sujeitos às regras de `STORAGE.MD`.

---

# 28. Canal Exercícios

Destinado a:

* listas;
* exercícios;
* resoluções;
* perguntas;
* materiais de prática.

---

# 29. Canal Dúvidas

Destinado à discussão de dúvidas.

Exemplo:

```text
"Alguém sabe como resolver essa questão?"
```

---

# 30. Canal Trabalhos

Destinado à organização de trabalhos colaborativos.

Pode integrar:

```text
chat
+
arquivos
+
Kanban
+
responsabilidades
+
entregas
```

---

# 31. Canais Personalizados

Usuários autorizados poderão criar canais personalizados.

Exemplo:

```text
Prova de Química
Projeto de História
Revisão
Vestibular
```

---

# 32. Criação de Canal

Endpoint:

```text
POST /api/v1/groups/:groupId/channels
```

Body:

```json
{
  "name": "Revisão para prova",
  "type": "custom"
}
```

---

# 33. Exclusão de Canal

Endpoint:

```text
DELETE /api/v1/channels/:channelId
```

O sistema deve impedir a exclusão acidental de canais essenciais, como `Geral`, salvo ação administrativa específica.

---

# 34. Chat

Cada canal poderá possuir mensagens.

Mensagem:

```text
Message
```

Campos principais:

```text
id
channelId
authorId
content
attachments
replyTo
createdAt
updatedAt
isEdited
isDeleted
```

---

# 35. Mensagens

Endpoint:

```text
GET /api/v1/channels/:channelId/messages
```

Enviar:

```text
POST /api/v1/channels/:channelId/messages
```

---

# 36. Mensagem em Tempo Real

O sistema poderá utilizar Socket.io.

Fluxo:

```text
Usuário A
   ↓
Socket.io
   ↓
Backend
   ↓
MongoDB
   ↓
Socket.io
   ↓
Usuário B
```

A mensagem deve ser persistida antes ou durante o fluxo de transmissão conforme a estratégia definida na implementação.

---

# 37. Edição de Mensagens

O autor poderá editar sua própria mensagem.

Endpoint:

```text
PATCH /api/v1/messages/:messageId
```

A mensagem deverá indicar:

```text
isEdited = true
```

---

# 38. Exclusão de Mensagens

O autor poderá excluir sua mensagem.

Administradores poderão possuir permissão de moderação.

A exclusão poderá utilizar soft delete.

Exemplo:

```text
isDeleted = true
```

---

# 39. Respostas

Mensagens poderão responder outras mensagens.

Campo:

```text
replyTo
```

Exemplo:

```text
Mensagem A
   ↓
Mensagem B responde A
```

---

# 40. Anexos no Chat

Mensagens podem possuir anexos.

Exemplos:

* imagens;
* documentos;
* arquivos de estudo.

Os arquivos devem utilizar o sistema definido em `STORAGE.MD`.

---

# 41. Indicador de Digitação

Socket.io poderá fornecer:

```text
typing:start
typing:stop
```

Esses eventos não precisam ser armazenados no MongoDB.

---

# 42. Kanban

Cada trabalho colaborativo poderá possuir um quadro Kanban.

Colunas padrão:

```text
A fazer
Em andamento
Em revisão
Concluído
```

Identificadores:

```text
todo
in_progress
review
done
```

---

# 43. Cards

Cada tarefa do Kanban pode possuir:

```text
id
title
description
status
assignees
dueDate
attachments
createdAt
updatedAt
```

---

# 44. Movimentação

Um card poderá mudar de coluna.

Exemplo:

```text
todo
 ↓
in_progress
 ↓
review
 ↓
done
```

O backend deve validar se o usuário possui permissão para modificar o card.

---

# 45. Trabalhos Colaborativos

Um trabalho pode possuir:

* título;
* descrição;
* grupo;
* matéria;
* prazo;
* integrantes;
* responsabilidades;
* arquivos;
* Kanban;
* status.

---

# 46. Responsabilidades

Cada trabalho poderá dividir tarefas entre integrantes.

Exemplo:

```text
João → Pesquisa
Maria → Texto
Pedro → Apresentação
Ana → Revisão
```

---

# 47. Responsabilidade Individual

Cada responsabilidade deve possuir:

```text
title
description
assignedUserId
status
dueDate
```

---

# 48. Status de Responsabilidade

Valores:

```text
todo
in_progress
review
done
```

---

# 49. Arquivos do Grupo

O grupo poderá possuir arquivos compartilhados.

Exemplo:

```text
Grupo
 └── Arquivos
      ├── Química.pdf
      ├── Trabalho.docx
      └── Apresentação.pptx
```

A autorização deve considerar a associação do usuário ao grupo.

---

# 50. Pastas

O armazenamento poderá possuir pastas.

Exemplo:

```text
Materiais
├── Química
├── Matemática
└── História
```

As regras detalhadas ficam em:

```text
STORAGE.MD
```

---

# 51. Atividades

Professores/responsáveis autorizados podem criar atividades.

Exemplo:

```text
Atividade:
"Lista de exercícios — Ligações Químicas"

Prazo:
10/09/2026
```

---

# 52. Entregas

Estudantes podem enviar entregas.

Uma entrega pode possuir:

```text
studentId
activityId
files
comment
submittedAt
status
```

---

# 53. Status de Entrega

Valores:

```text
draft
submitted
late
reviewed
returned
```

---

# 54. Salas de Aula

Uma sala representa um espaço educacional mais estruturado.

Pode possuir:

```text
professor
students
activities
materials
announcements
```

---

# 55. Relação Grupo + Sala

Uma sala pode estar vinculada a um grupo.

Exemplo:

```text
Grupo: Química 2ºA
        ↓
Sala de aula: Química
        ↓
Atividades
        ↓
Entregas
```

---

# 56. Notificações

Eventos importantes podem gerar notificações.

Exemplos:

```text
Você foi convidado para um grupo.
Você foi adicionado a um trabalho.
Uma atividade foi publicada.
Uma mensagem mencionou você.
O prazo de uma atividade está próximo.
```

---

# 57. Menções

O sistema poderá permitir menções:

```text
@usuario
```

O backend deve transformar a menção em uma notificação quando apropriado.

---

# 58. Permissões

As permissões devem ser verificadas no backend.

Exemplo conceitual:

```text
group.view
group.update
group.delete

member.view
member.add
member.remove
member.updateRole

channel.view
channel.create
channel.update
channel.delete

message.send
message.edit
message.delete

assignment.create
assignment.update
assignment.delete

activity.create
activity.update
activity.delete
activity.review
```

---

# 59. Matriz Inicial

| Ação                | Owner |    Admin |  Teacher |             Member |    Guest |
| ------------------- | ----: | -------: | -------: | -----------------: | -------: |
| Ver grupo           |     ✅ |        ✅ |        ✅ |                  ✅ |        ✅ |
| Editar grupo        |     ✅ | limitado |        ❌ |                  ❌ |        ❌ |
| Gerenciar membros   |     ✅ |        ✅ | limitado |                  ❌ |        ❌ |
| Criar canal         |     ✅ |        ✅ | limitado |                  ❌ |        ❌ |
| Enviar mensagem     |     ✅ |        ✅ |        ✅ |                  ✅ | limitado |
| Moderar mensagens   |     ✅ |        ✅ | limitado |                  ❌ |        ❌ |
| Criar atividade     |     ✅ | limitado |        ✅ |                  ❌ |        ❌ |
| Entregar atividade  |     ❌ |        ❌ |        ❌ |                  ✅ | limitado |
| Gerenciar trabalhos |     ✅ |        ✅ |        ✅ | conforme permissão |        ❌ |
| Excluir grupo       |     ✅ |        ❌ |        ❌ |                  ❌ |        ❌ |

Essa matriz pode evoluir conforme o sistema amadurecer.

---

# 60. Privacidade

Usuários somente devem visualizar informações permitidas pelo contexto do grupo.

Exemplo:

Um membro não deve conseguir acessar:

```text
dados privados de outro usuário
```

apenas por pertencer ao mesmo grupo.

---

# 61. Segurança

O sistema deve proteger contra:

* IDOR;
* acesso sem associação ao grupo;
* escalada de privilégios;
* alteração de role pelo frontend;
* exclusão não autorizada;
* spam;
* abuso de convites;
* uploads não autorizados.

---

# 62. Rate Limiting

Operações sensíveis podem possuir limites específicos.

Exemplos:

```text
criação de grupos
convites
entrada por código
mensagens
uploads
```

Os limites devem ser configuráveis.

---

# 63. Paginação

Mensagens, membros, arquivos e outros recursos potencialmente grandes devem utilizar paginação.

Exemplo:

```text
GET /groups/:groupId/members?page=1&limit=20
```

---

# 64. Ordenação de Mensagens

Mensagens devem possuir ordenação consistente por:

```text
createdAt
```

Paginação deve permitir carregamento eficiente de mensagens antigas.

---

# 65. Exclusão de Grupo

A exclusão de um grupo é uma operação destrutiva.

Antes de excluir, considerar:

```text
membros
canais
mensagens
arquivos
trabalhos
atividades
entregas
notificações
```

A estratégia definitiva de exclusão deve respeitar `DATABASE.MD` e `STORAGE.MD`.

---

# 66. Eventos em Tempo Real

Socket.io poderá emitir:

```text
group:updated
member:joined
member:left
member:removed
channel:created
channel:updated
channel:deleted
message:new
message:updated
message:deleted
assignment:updated
notification:new
```

---

# 67. Offline

O frontend poderá armazenar temporariamente dados necessários para utilização offline.

Porém:

```text
offline ≠ autoridade
```

Ao voltar a ficar online, o backend continua sendo a fonte oficial.

Conflitos devem ser tratados explicitamente.

---

# 68. Consistência

Operações críticas devem garantir consistência.

Exemplo:

Ao remover um membro:

```text
GroupMember
 ↓
permissões
 ↓
acessos
 ↓
notificações
```

devem ser tratados de forma coerente.

---

# 69. Performance

Evitar:

* carregar todas as mensagens de uma vez;
* carregar todos os arquivos sem paginação;
* consultas MongoDB desnecessárias;
* eventos Socket.io excessivos;
* envio repetido de dados.

---

# 70. Frontend

O frontend deverá possuir componentes reutilizáveis.

Exemplos:

```text
GroupCard
GroupHeader
MemberList
MemberCard
ChannelList
ChannelSidebar
Chat
Message
KanbanBoard
KanbanColumn
KanbanCard
AssignmentCard
```

---

# 71. Mobile

No celular:

```text
Grupo
 ↓
Canais
 ↓
Conteúdo
```

A interface deve evitar depender de grandes barras laterais permanentes.

O usuário deve conseguir navegar facilmente entre:

```text
canais
chat
arquivos
trabalhos
membros
```

---

# 72. Acessibilidade

A interface deverá considerar:

* navegação por teclado;
* leitores de tela;
* contraste;
* foco visível;
* botões acessíveis;
* mensagens de erro claras;
* áreas de toque adequadas.

---

# 73. Regra para Agentes

Antes de modificar o sistema de grupos, o agente deve ler:

```text
PROJECT_SPEC.md
ARCHITECTURE.md
DATABASE.MD
AUTH.MD
API.MD
GROUPS.MD
```

Qualquer mudança estrutural importante deve atualizar a documentação correspondente.

---

# 74. Ordem de Implementação

### Etapa 1

```text
Groups
GroupMembers
Roles
Join Code
```

### Etapa 2

```text
Channels
Permissions
```

### Etapa 3

```text
Messages
Socket.io
```

### Etapa 4

```text
Files
Folders
```

### Etapa 5

```text
Assignments
Responsibilities
Kanban
```

### Etapa 6

```text
Classrooms
Activities
Submissions
```

### Etapa 7

```text
Notifications
Mentions
Real-time events
```

---

# 75. Critérios de Aceitação

O sistema de grupos será considerado funcional quando:

* usuários puderem criar grupos;
* usuários puderem entrar por código;
* convites funcionarem;
* roles funcionarem;
* permissões forem verificadas no backend;
* membros puderem ser gerenciados;
* canais funcionarem;
* chat funcionar;
* mensagens puderem ser editadas/excluídas;
* arquivos compartilhados funcionarem;
* trabalhos colaborativos funcionarem;
* responsabilidades puderem ser atribuídas;
* Kanban funcionar;
* atividades funcionarem;
* entregas funcionarem;
* notificações funcionarem;
* recursos privados estiverem protegidos.

---

# 76. Regra Final

O sistema de grupos deve seguir:

```text
Grupo
 ↓
Membros
 ↓
Permissões
 ↓
Canais
 ↓
Conteúdo
 ↓
Colaboração
```

A regra mais importante é:

> **Pertencer a um grupo não significa possuir acesso administrativo ao grupo.**

Toda ação deve passar por autenticação e autorização.

---

## Fim do documento

**Documento:** `GROUPS.MD`
**Projeto:** SOS Estudante
**Versão:** 1.0
