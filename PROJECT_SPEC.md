# SOS ESTUDANTE — PROJECT SPECIFICATION

**Versão:** 2.0
**Status:** Em desenvolvimento
**Tipo:** Plataforma de organização acadêmica e colaboração estudantil
**Arquitetura:** Full Stack, Mobile-First, API-First
**Plataformas:** Web, PWA, Android e iOS
**Idioma inicial:** Português (Brasil)
**Fuso horário padrão:** America/Sao_Paulo (UTC-3)

---

# 1. VISÃO DO PRODUTO

O **SOS Estudante** é uma plataforma de organização acadêmica pessoal e colaborativa.

O objetivo é centralizar em um único sistema:

* Organização de estudos;
* Materiais escolares;
* Arquivos;
* Tarefas;
* Trabalhos;
* Provas;
* Agenda;
* Calendário;
* Rotina de estudos;
* Grupos;
* Comunicação;
* Trabalhos colaborativos;
* Salas de aula;
* Estatísticas acadêmicas.

O produto deve combinar conceitos de plataformas como:

* Google Drive;
* Microsoft Teams;
* Google Classroom;
* Monday.com;
* Aplicativos de produtividade e gerenciamento de tarefas.

Essas plataformas servem apenas como **referência conceitual**.

O SOS Estudante não deve copiar interfaces, marcas, elementos proprietários ou identidade visual dessas plataformas.

---

# 2. OBJETIVOS

## 2.1 Objetivo principal

Permitir que estudantes organizem sua vida acadêmica em um único ambiente.

## 2.2 Objetivos secundários

O sistema deve:

1. Reduzir a desorganização de materiais;
2. Facilitar o acompanhamento de prazos;
3. Ajudar o estudante a identificar o que deve estudar primeiro;
4. Facilitar trabalhos em grupo;
5. Permitir compartilhamento organizado de documentos;
6. Facilitar comunicação entre integrantes;
7. Centralizar atividades acadêmicas;
8. Registrar histórico de estudos;
9. Funcionar adequadamente em dispositivos móveis;
10. Possibilitar evolução futura para uma plataforma educacional completa.

---

# 3. PRINCÍPIOS DO PROJETO

Todas as implementações devem seguir estes princípios.

## 3.1 Funcionalidade real

Não criar apenas interfaces simuladas.

Sempre que uma funcionalidade for apresentada como disponível, ela deve possuir implementação funcional no backend, banco de dados ou lógica correspondente.

Não apresentar elementos visuais como funcionalidades concluídas quando forem apenas placeholders.

---

## 3.2 Mobile-first

O sistema deve ser projetado primeiro para telas pequenas e depois adaptado para telas maiores.

A experiência mobile deve ser considerada uma prioridade de desenvolvimento, não apenas uma adaptação posterior da versão desktop.

---

## 3.3 Modularidade

Cada funcionalidade deve possuir responsabilidades bem definidas.

Evitar componentes, controllers ou serviços excessivamente grandes.

---

## 3.4 Escalabilidade

O código deve permitir expansão sem necessidade de reescrever toda a aplicação.

---

## 3.5 Segurança

Validações importantes devem existir no backend.

O frontend nunca deve ser considerado uma camada confiável de segurança.

---

## 3.6 API-first

Frontend e backend devem se comunicar através de APIs bem definidas.

A lógica principal do sistema deve permanecer independente da interface utilizada.

---

## 3.7 Separação de responsabilidades

Interface, regras de negócio, persistência e infraestrutura devem permanecer separadas.

---

# 4. PLATAFORMAS

O SOS Estudante deve funcionar em:

* Navegadores desktop;
* Navegadores mobile;
* Tablets;
* Android;
* iOS.

A aplicação web deve ser preparada para funcionamento como PWA.

A arquitetura deve permitir futuramente a criação de aplicativo através de:

* React Native + Expo;
* Capacitor;
* Outra solução compatível.

O backend deve ser independente do cliente.

---

# 5. PERFIS DE USUÁRIO

O sistema deve suportar diferentes níveis de usuário.

## 5.1 Student

Usuário estudante padrão.

Pode:

* Gerenciar suas matérias;
* Criar tarefas;
* Criar eventos;
* Fazer upload de arquivos;
* Criar grupos;
* Participar de grupos;
* Enviar mensagens;
* Compartilhar materiais;
* Participar de trabalhos;
* Utilizar Kanban;
* Utilizar Pomodoro;
* Visualizar estatísticas.

---

## 5.2 Group Owner

Criador/responsável principal de um grupo.

Possui controle total sobre o grupo.

Pode:

* Editar grupo;
* Gerenciar membros;
* Alterar permissões;
* Criar canais;
* Criar tarefas;
* Gerenciar arquivos;
* Gerenciar trabalhos;
* Excluir o grupo.

---

## 5.3 Group Admin

Administrador delegado.

Pode:

* Gerenciar membros;
* Criar canais;
* Gerenciar arquivos;
* Criar tarefas;
* Gerenciar trabalhos;
* Fixar avisos.

Não deve possuir necessariamente todos os poderes do Owner.

---

## 5.4 Teacher

Perfil preparado para salas de aula.

Pode:

* Criar atividades;
* Definir prazos;
* Compartilhar materiais;
* Criar avisos;
* Acompanhar entregas;
* Organizar estudantes.

---

## 5.5 Member

Membro comum de um grupo.

Pode:

* Visualizar conteúdos;
* Enviar mensagens;
* Compartilhar arquivos quando permitido;
* Participar de tarefas;
* Participar de trabalhos colaborativos;
* Atualizar suas próprias tarefas.

---

## 5.6 Guest

Usuário com acesso limitado.

Pode apenas visualizar conteúdos explicitamente disponibilizados.

---

# 6. AUTENTICAÇÃO E CONTA

## 6.1 Cadastro

Campos:

* Nome;
* Nome de usuário;
* Email;
* Senha;
* Foto de perfil opcional.

A senha nunca deve ser armazenada em texto puro.

Utilizar bcrypt ou mecanismo equivalente.

---

## 6.2 Login

Permitir autenticação através de:

* Email;
* Senha.

Utilizar JWT para autenticação de API.

---

## 6.3 Sessão

Implementar:

* Login persistente;
* Logout;
* Expiração de token;
* Renovação segura quando aplicável;
* Proteção de rotas.

---

## 6.4 Recuperação de senha

Preparar estrutura para recuperação de senha através de email.

---

# 7. QUESTIONÁRIO INICIAL

Após o cadastro, apresentar configuração inicial das matérias.

Matérias padrão:

1. Análise de Processos Físico-Químicos;
2. Princípios da Química Orgânica;
3. Química;
4. Biologia;
5. Física;
6. Microbiologia;
7. Matemática;
8. Inglês;
9. Português;
10. História;
11. Geografia.

O usuário poderá adicionar matérias personalizadas.

---

# 8. CONFIGURAÇÃO DAS MATÉRIAS

Cada matéria deve possuir:

* Nome;
* Descrição opcional;
* Identificador visual;
* Nível de conhecimento;
* Dificuldade;
* Complexidade.

## 8.1 Nível de conhecimento

Valores:

* Não sei;
* Básico;
* Médio;
* Avançado.

---

## 8.2 Dificuldade

Escala de 1 a 5:

```text
1 — Muito fácil
2 — Fácil
3 — Médio
4 — Difícil
5 — Muito difícil
```

---

## 8.3 Complexidade

Escala de 1 a 5:

```text
1 — Pouco complicado
2 — Levemente complicado
3 — Moderado
4 — Complicado
5 — Muito complicado
```

Esses valores alimentam o sistema de priorização.

---

# 9. DASHBOARD

O Dashboard é a tela principal do usuário.

Deve apresentar:

* Tarefas prioritárias;
* Tarefas atrasadas;
* Trabalhos próximos;
* Próximas provas;
* Eventos;
* Arquivos recentes;
* Grupos recentes;
* Atividades pendentes;
* Progresso de estudos;
* Horas estudadas;
* Próximo compromisso.

A organização das informações deve priorizar aquilo que exige ação do usuário.

---

# 10. "O QUE DEVO FAZER AGORA?"

Criar uma área de recomendação de tarefas.

O sistema deve analisar automaticamente as atividades pendentes e apresentar as mais importantes.

Exemplo:

> **Prioridade alta**
>
> Trabalho de Química
> Entrega em 2 dias
> Dificuldade: 5/5
> Complexidade: 4/5

A recomendação deve utilizar o sistema de priorização descrito posteriormente.

---

# 11. SISTEMA DE PRIORIZAÇÃO

O SOS Estudante deve possuir um sistema de pontuação de prioridade.

A prioridade deve considerar:

* Prazo;
* Dificuldade;
* Complexidade;
* Tipo de atividade;
* Estado;
* Preferências do usuário.

A implementação deve ser modular.

---

## 11.1 Modos de prioridade

### Deadline First

Prioriza prazo.

### Difficulty First

Prioriza dificuldade.

### Complexity First

Prioriza complexidade.

### Balanced

Combina os fatores de maneira equilibrada.

---

## 11.2 Pesos

O usuário deve poder configurar os pesos.

Exemplo:

```text
Prazo:        50%
Dificuldade:  30%
Complexidade: 20%
```

Os pesos devem ser validados para evitar valores inválidos.

---

## 11.3 Classificação

A interface deve apresentar:

* Alta prioridade;
* Média prioridade;
* Baixa prioridade.

Representar visualmente através de badges/indicadores, sem depender exclusivamente de cores para transmitir significado.

---

# 12. DRIVE PESSOAL

Criar sistema de armazenamento pessoal.

Funcionalidades:

* Upload;
* Download;
* Visualização;
* Renomeação;
* Exclusão;
* Criação de pastas;
* Movimentação;
* Pesquisa;
* Tags;
* Organização por matéria.

---

# 13. ARQUIVOS

Cada arquivo deve armazenar metadados como:

* Nome;
* Nome original;
* Tipo;
* MIME type;
* Tamanho;
* Caminho/storage key;
* Usuário proprietário;
* Matéria;
* Pasta;
* Data de criação;
* Data de atualização.

---

# 14. TIPOS DE ARQUIVO

Suportar inicialmente:

* PDF;
* DOC;
* DOCX;
* XLS;
* XLSX;
* PPT;
* PPTX;
* TXT;
* PNG;
* JPG;
* JPEG;
* ZIP.

O sistema deve permitir expansão futura.

---

# 15. DRIVE DOS GRUPOS

Cada grupo deve possuir armazenamento próprio.

Exemplo:

```text
Grupo: Química Orgânica

Arquivos/
├── Trabalho/
│   ├── Pesquisa.pdf
│   ├── Referencias.pdf
│   └── Apresentacao.pptx
│
├── Exercicios/
│   ├── Lista-01.pdf
│   └── Lista-02.pdf
│
└── Materiais/
    ├── Apostila.pdf
    └── Resumo.docx
```

---

# 16. COMPARTILHAMENTO DE DOCUMENTOS NOS GRUPOS

O envio de documentos dentro dos grupos é uma funcionalidade central.

Os membros autorizados devem poder:

* Enviar arquivos;
* Baixar arquivos;
* Visualizar arquivos;
* Criar pastas;
* Mover arquivos;
* Renomear arquivos;
* Excluir arquivos conforme permissão;
* Compartilhar arquivos;
* Anexar arquivos a tarefas;
* Anexar arquivos a trabalhos;
* Anexar arquivos a atividades.

Registrar:

* Quem enviou;
* Quando enviou;
* Tipo;
* Tamanho;
* Localização;
* Grupo;
* Canal, quando aplicável.

---

# 17. RESTRIÇÃO DE PDF

**Não implementar comentários ou sistema de anotação colaborativa dentro de arquivos PDF.**

PDFs podem ser:

* Visualizados;
* Baixados;
* Compartilhados;
* Anexados.

Mas não devem possuir sistema de comentários internos.

Essa restrição deve ser respeitada em todas as interfaces e módulos do sistema.

---

# 18. GRUPOS DE ESTUDO

Usuários poderão criar grupos.

Cada grupo deve possuir:

* Nome;
* Descrição;
* Imagem;
* Owner;
* Membros;
* Código de entrada;
* Convites;
* Canais;
* Arquivos;
* Tarefas;
* Trabalhos;
* Kanban;
* Calendário.

---

# 19. ENTRADA EM GRUPOS

Permitir:

### Convite

Usuário recebe convite.

### Código

Usuário informa código do grupo.

### Link de convite

Preparar estrutura para links de convite.

As permissões de entrada devem ser verificadas pelo backend.

---

# 20. CANAIS

Cada grupo deve possuir canais.

Canais padrão:

* Geral;
* Avisos;
* Materiais;
* Exercícios;
* Dúvidas;
* Trabalhos.

Administradores podem criar canais personalizados.

Cada canal pode conter:

* Mensagens;
* Arquivos;
* Tarefas;
* Avisos;
* Links;
* Atividades.

---

# 21. CHAT

Implementar comunicação em tempo real.

Tecnologia preferencial:

**Socket.io**

Funcionalidades:

* Enviar mensagem;
* Editar mensagem;
* Excluir mensagem;
* Responder mensagem;
* Reagir;
* Fixar;
* Compartilhar arquivos;
* Compartilhar imagens;
* Compartilhar links.

---

# 22. MENSAGENS

Cada mensagem deve registrar:

* Autor;
* Canal;
* Conteúdo;
* Data;
* Data de edição;
* Arquivos anexados;
* Mensagem respondida, quando aplicável.

Implementar paginação/histórico para evitar carregar todas as mensagens simultaneamente.

---

# 23. QUADRO KANBAN

Cada grupo poderá possuir um quadro Kanban.

Colunas padrão:

1. A fazer;
2. Em andamento;
3. Em revisão;
4. Concluído.

Permitir:

* Criar cartões;
* Mover cartões;
* Reordenar cartões;
* Definir responsáveis;
* Definir prazo;
* Definir prioridade;
* Adicionar descrição;
* Criar checklist;
* Anexar arquivos;
* Associar matéria.

---

# 24. TRABALHOS COLABORATIVOS

Criar sistema específico para trabalhos escolares.

Cada trabalho deve possuir:

* Título;
* Descrição;
* Matéria;
* Grupo;
* Prazo;
* Responsáveis;
* Status;
* Checklist;
* Arquivos;
* Histórico.

---

# 25. DIVISÃO DE RESPONSABILIDADES

Permitir dividir tarefas entre integrantes.

Exemplo:

```text
Trabalho: Revolução Industrial

João  → Pesquisa
Maria → Texto
Pedro → Apresentação
Ana   → Referências
```

Cada participante poderá acompanhar o estado da sua responsabilidade.

---

# 26. SALAS DE AULA

Criar estrutura para salas de aula.

Uma sala pode possuir:

* Nome;
* Matéria;
* Professor/responsável;
* Estudantes;
* Materiais;
* Atividades;
* Avisos;
* Calendário.

---

# 27. ATIVIDADES

Professores/responsáveis poderão criar atividades.

Cada atividade pode conter:

* Título;
* Descrição;
* Matéria;
* Prazo;
* Arquivos;
* Sala;
* Destinatários.

---

# 28. ENTREGA DE ATIVIDADES

Estudantes poderão enviar arquivos como resposta.

Exemplo:

```text
Lista de exercícios — Física

Status: Não entregue

        ↓

Arquivo enviado

        ↓

Status: Entregue
```

Registrar:

* Usuário;
* Data da entrega;
* Arquivos;
* Atividade.

Preparar estrutura para futura implementação de avaliação/notas.

---

# 29. CALENDÁRIO

Criar calendário completo.

Visualizações:

* Mensal;
* Semanal;
* Diária;
* Agenda.

Exibir:

* Tarefas;
* Trabalhos;
* Provas;
* Atividades;
* Eventos;
* Compromissos;
* Eventos dos grupos;
* Eventos de salas de aula.

Eventos compartilhados devem aparecer automaticamente no calendário do usuário quando aplicável.

---

# 30. EVENTOS

Cada evento pode possuir:

* Título;
* Descrição;
* Data;
* Horário;
* Duração;
* Matéria;
* Grupo;
* Criador;
* Participantes;
* Arquivos relacionados.

---

# 31. PROVAS

Criar tipo específico de evento para provas.

Campos:

* Matéria;
* Data;
* Horário;
* Conteúdo;
* Descrição;
* Arquivos relacionados.

Mostrar contagem regressiva.

Exemplo:

> Prova de Física — faltam 5 dias.

---

# 32. AGENDA

Permitir:

* Criar compromisso;
* Editar;
* Excluir;
* Definir data;
* Definir horário;
* Definir duração;
* Adicionar descrição;
* Associar matéria;
* Associar grupo.

---

# 33. POMODORO

Criar timer Pomodoro.

Configuração padrão:

```text
Estudo:        25 minutos
Pausa curta:    5 minutos
```

Permitir configuração personalizada.

Campos:

* Tempo de estudo;
* Pausa curta;
* Pausa longa;
* Número de ciclos.

Funcionalidades:

* Iniciar;
* Pausar;
* Continuar;
* Reiniciar;
* Finalizar.

Possuir alertas sonoros e visuais.

---

# 34. SESSÕES DE ESTUDO

Registrar sessões concluídas.

Cada sessão deve armazenar:

* Usuário;
* Matéria;
* Data;
* Duração;
* Tipo;
* Quantidade de ciclos.

Esses dados devem alimentar as estatísticas do usuário.

---

# 35. RELÓGIO

Exibir relógio em tempo real.

Fuso horário padrão:

**America/Sao_Paulo**

A aplicação deve utilizar uma abordagem apropriada para representar o horário local do usuário e manter consistência nos eventos armazenados.

---

# 36. ESTATÍSTICAS

Criar área de estatísticas acadêmicas.

Exibir:

* Horas estudadas;
* Sessões Pomodoro;
* Tarefas concluídas;
* Trabalhos concluídos;
* Tarefas atrasadas;
* Matérias estudadas;
* Evolução semanal;
* Evolução mensal.

Utilizar gráficos simples.

---

# 37. NOTIFICAÇÕES

Criar sistema de notificações.

Tipos:

* Tarefa próxima;
* Tarefa atrasada;
* Nova mensagem;
* Novo arquivo;
* Novo trabalho;
* Convite de grupo;
* Nova atividade;
* Alteração de prazo;
* Novo aviso;
* Entrega registrada.

---

# 38. PUSH NOTIFICATIONS

Preparar arquitetura para notificações push.

A implementação poderá posteriormente utilizar:

* Firebase Cloud Messaging;
* APNs;
* Expo Notifications;
* Outra solução compatível.

Não criar dependência rígida de um único provedor.

---

# 39. PESQUISA GLOBAL

Criar pesquisa global.

Pesquisar:

* Arquivos;
* Tarefas;
* Trabalhos;
* Grupos;
* Canais;
* Mensagens;
* Matérias;
* Eventos;
* Usuários.

Os resultados devem ser separados por categoria.

Respeitar as permissões de acesso durante a pesquisa.

Um usuário nunca deve receber resultados de recursos aos quais não possui acesso.

---

# 40. PERFIL

Perfil deve apresentar:

* Foto;
* Nome;
* Nome de usuário;
* Matérias;
* Grupos;
* Estatísticas.

Respeitar configurações de privacidade.

---

# 41. CONFIGURAÇÕES

## Conta

* Nome;
* Email;
* Nome de usuário;
* Foto;
* Senha.

## Estudos

* Matérias;
* Dificuldade;
* Complexidade;
* Preferências de prioridade.

## Notificações

* Notificações gerais;
* Lembretes;
* Grupos;
* Tarefas;
* Atividades.

## Aparência

* Claro;
* Escuro;
* Seguir sistema.

## Privacidade

* Perfil;
* Convites;
* Participação em grupos.

---

# 42. NAVEGAÇÃO MOBILE

No mobile utilizar navegação inferior.

Principais áreas:

```text
🏠 Início
✅ Tarefas
📅 Agenda
👥 Grupos
📂 Arquivos
```

Funcionalidades secundárias devem estar em menu adicional.

A navegação deve considerar acessibilidade e facilidade de toque.

---

# 43. NAVEGAÇÃO DESKTOP

No desktop utilizar sidebar.

Estrutura sugerida:

```text
SOS ESTUDANTE

Início
Tarefas
Calendário
Agenda
Arquivos
Grupos
Estatísticas

────────────

Matérias
Grupos recentes

────────────

Configurações
Perfil
```

A navegação deve poder evoluir sem duplicação de lógica entre desktop e mobile.

---

# 44. DESIGN SYSTEM

A interface deve ser:

* Minimalista;
* Moderna;
* Profissional;
* Acadêmica;
* Responsiva;
* Acessível.

Inspirar-se conceitualmente em produtos modernos de produtividade.

Não copiar:

* Logos;
* Marcas;
* Identidade visual;
* Componentes proprietários;
* Interfaces específicas.

Criar identidade visual própria para o SOS Estudante.

---

# 45. RESPONSIVIDADE

Garantir funcionamento em:

* 320px+;
* Smartphones;
* Tablets;
* Laptops;
* Monitores grandes.

Evitar:

* Overflow horizontal desnecessário;
* Elementos pequenos demais para toque;
* Interfaces dependentes de hover;
* Modais impossíveis de utilizar no celular.

---

# 46. ACESSIBILIDADE

Implementar:

* Navegação por teclado;
* Labels apropriados;
* Contraste adequado;
* Estados de foco;
* Textos alternativos;
* Semântica HTML;
* Feedback para leitores de tela quando aplicável.

Não depender somente de cores para comunicar estados.

---

# 47. PWA

Preparar a aplicação para PWA.

Implementar:

* Web App Manifest;
* Service Worker;
* Cache;
* Ícones;
* Splash screen;
* Instalação;
* Funcionamento parcial offline.

---

# 48. OFFLINE

Quando offline:

* Mostrar claramente o estado da conexão;
* Permitir acesso ao conteúdo previamente armazenado quando possível;
* Evitar perda de dados;
* Sincronizar alterações posteriormente quando tecnicamente seguro.

Operações que necessitam do backend devem informar o usuário quando não puderem ser executadas.

A sincronização offline deve possuir mecanismos para evitar sobrescrita silenciosa de alterações.

---

# 49. ARQUITETURA MOBILE

O backend deve ser independente da plataforma.

A aplicação deve poder futuramente ser consumida por:

```text
Web
 │
 ├── Desktop
 └── Mobile

Aplicativo
 │
 ├── Android
 └── iOS
```

Todas as plataformas devem utilizar as mesmas APIs e regras de negócio.

---

# 50. BACKEND

Tecnologias principais:

* Node.js;
* Express;
* MongoDB;
* JWT;
* bcrypt;
* Multer;
* Socket.io.

Arquitetura:

**MVC + Services + Middleware**

Estrutura esperada:

```text
backend/

├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── validators/
├── utils/
├── config/
├── sockets/
├── uploads/
└── server.js
```

A estrutura pode evoluir caso uma arquitetura melhor seja necessária, desde que as responsabilidades permaneçam claras e documentadas.

---

# 51. FRONTEND

Tecnologias:

* React;
* Tailwind CSS;
* Axios;
* React Router.

Estrutura esperada:

```text
frontend/

├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── contexts/
├── utils/
├── assets/
└── App.*
```

A estrutura pode ser adaptada conforme o crescimento do projeto.

---

# 52. API REST

A API deve utilizar padrões REST.

Exemplos:

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users/me

GET    /api/subjects
POST   /api/subjects
PUT    /api/subjects/:id
DELETE /api/subjects/:id

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

GET    /api/files
POST   /api/files
DELETE /api/files/:id

GET    /api/groups
POST   /api/groups
POST   /api/groups/join

GET    /api/groups/:id/channels
POST   /api/groups/:id/channels

GET    /api/channels/:id/messages
POST   /api/channels/:id/messages

GET    /api/groups/:id/files
POST   /api/groups/:id/files

GET    /api/assignments
POST   /api/assignments

GET    /api/events
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id

GET    /api/notifications
```

Todas as rotas privadas devem exigir autenticação.

As APIs devem possuir validação, autorização e respostas consistentes.

---

# 53. BANCO DE DADOS

Utilizar MongoDB.

Modelos principais:

```text
User
Subject
File
Folder
Task
Assignment
Event
Exam
Group
GroupMember
Channel
Message
KanbanBoard
KanbanColumn
KanbanCard
StudySession
Notification
UserSettings
```

Criar índices apropriados para consultas frequentes.

Os modelos podem ser expandidos conforme novos requisitos forem implementados.

---

# 54. RELACIONAMENTOS PRINCIPAIS

Estrutura conceitual:

```text
User
 │
 ├── Subjects
 ├── Tasks
 ├── Files
 ├── Events
 ├── StudySessions
 ├── Notifications
 └── Groups
       │
       ├── Members
       ├── Channels
       │     └── Messages
       │
       ├── Files
       ├── Tasks
       ├── Assignments
       ├── Kanban
       └── Events
```

Os relacionamentos devem respeitar autorização e propriedade.

---

# 55. UPLOAD

Utilizar Multer ou mecanismo equivalente no backend.

Implementar:

* Limite de tamanho;
* Validação MIME;
* Validação de extensão;
* Nomes de armazenamento seguros;
* Controle de acesso;
* Tratamento de erro.

Não confiar apenas na extensão enviada pelo cliente.

Sempre validar os arquivos no backend.

---

# 56. ARMAZENAMENTO

Durante desenvolvimento local:

```text
/uploads
    /users
    /groups
    /assignments
```

Criar uma camada de abstração de storage.

Futuramente permitir:

* AWS S3;
* Cloudflare R2;
* Supabase Storage;
* Firebase Storage;
* Outro provider compatível.

O restante da aplicação não deve depender diretamente de um único provedor de armazenamento.

---

# 57. SEGURANÇA

Implementar:

* bcrypt;
* JWT;
* Validação;
* Sanitização;
* Proteção contra XSS;
* Controle de permissões;
* Proteção de rotas;
* Limite de upload;
* Validação MIME;
* Rate limiting básico;
* Tratamento centralizado de erros;
* Variáveis de ambiente.

Nunca armazenar senhas em texto puro.

Nunca confiar apenas na autorização implementada no frontend.

---

# 58. AUTORIZAÇÃO

Toda operação sensível deve verificar:

1. Usuário autenticado;
2. Propriedade do recurso;
3. Associação ao grupo;
4. Permissão do usuário;
5. Estado do recurso.

Exemplo:

Um usuário não deve conseguir acessar um arquivo privado apenas alterando o ID na URL.

O backend deve ser a autoridade final sobre permissões.

---

# 59. TRATAMENTO DE ERROS

Criar middleware global de erros.

As respostas da API devem possuir estrutura consistente.

Exemplo:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Recurso não encontrado."
  }
}
```

Não expor stack traces ou informações sensíveis em produção.

---

# 60. VARIÁVEIS DE AMBIENTE

Criar:

```text
.env.example
```

Com:

```text
MONGO_URI=
JWT_SECRET=
PORT=
CLIENT_URL=
UPLOAD_DIR=
STORAGE_PROVIDER=
```

Credenciais reais nunca devem ser commitadas.

---

# 61. TESTES

Criar testes para funcionalidades críticas.

Prioridade:

1. Autenticação;
2. Autorização;
3. CRUD;
4. Upload;
5. Grupos;
6. Permissões;
7. Tarefas;
8. Priorização;
9. Entregas;
10. APIs.

Testar principalmente regras de negócio.

Testes de integração e testes de API devem ser utilizados quando apropriado.

---

# 62. ESTADOS DE INTERFACE

Todas as páginas importantes devem possuir estados:

* Loading;
* Empty;
* Error;
* Success;
* Offline.

Exemplo:

```text
Você ainda não possui tarefas.

[ Criar primeira tarefa ]
```

Evitar telas vazias sem explicação.

---

# 63. FEEDBACK AO USUÁRIO

Após ações importantes apresentar feedback:

* Upload concluído;
* Arquivo excluído;
* Tarefa criada;
* Tarefa atualizada;
* Grupo criado;
* Mensagem enviada;
* Atividade entregue.

Utilizar Toasts, banners ou feedback contextual.

O feedback não deve bloquear desnecessariamente o fluxo de utilização.

---

# 64. PESQUISA E PERFORMANCE

Evitar carregar grandes quantidades de dados desnecessariamente.

Implementar:

* Paginação;
* Lazy loading;
* Debounce em pesquisa;
* Cache quando apropriado;
* Consultas indexadas.

---

# 65. ESCALABILIDADE

O código deve evitar:

* Código duplicado;
* Componentes gigantes;
* Controllers contendo regras excessivas;
* Regras de negócio espalhadas;
* Dependências desnecessárias.

Preferir:

* Services;
* Hooks;
* Contexts;
* Components reutilizáveis;
* Validators;
* Middleware;
* Repository/data-access layer quando necessário.

---

# 66. DOCUMENTAÇÃO

Criar documentação complementar:

```text
docs/

├── ARCHITECTURE.md
├── DATABASE.md
├── API.md
├── AUTH.md
├── STORAGE.md
├── GROUPS.md
└── ROADMAP.md
```

O `PROJECT_SPEC.md` deve continuar sendo a referência principal do produto.

Documentações específicas não devem contradizer o `PROJECT_SPEC.md`.

Caso exista conflito, a especificação principal deve ser revisada e o restante da documentação atualizado.

---

# 67. COMPATIBILIDADE ENTRE AGENTES

O projeto será desenvolvido utilizando múltiplas ferramentas de programação assistida por IA.

Ferramentas previstas:

* OpenAI Codex;
* Mimo Code;
* Google Antigravity.

Todas as ferramentas devem tratar este documento como especificação principal.

Antes de modificar o projeto, qualquer agente deve:

1. Ler `PROJECT_SPEC.md`;
2. Ler documentação relacionada à área modificada;
3. Inspecionar o código existente;
4. Identificar funcionalidades já implementadas;
5. Evitar recriar funcionalidades existentes;
6. Preservar APIs existentes;
7. Preservar contratos entre frontend e backend;
8. Executar testes após alterações relevantes.

---

# 68. REGRA DE NÃO QUEBRA

Nenhum agente deve remover ou quebrar funcionalidades existentes apenas para implementar uma nova funcionalidade.

Antes de alterações estruturais:

* Identificar dependências;
* Avaliar impacto;
* Atualizar documentação;
* Atualizar testes;
* Implementar;
* Testar.

Alterações destrutivas devem ser evitadas.

Quando forem realmente necessárias, devem ser documentadas.

---

# 69. CONTRATOS DE API

Alterações em APIs devem ser tratadas como mudanças de contrato.

Se uma API existente precisar ser alterada:

1. Atualizar `API.md`;
2. Atualizar backend;
3. Atualizar frontend;
4. Atualizar testes;
5. Verificar compatibilidade.

Não alterar silenciosamente nomes de campos, endpoints ou formatos de resposta.

---

# 70. DADOS FICTÍCIOS

Dados mockados podem ser utilizados apenas durante desenvolvimento/testes.

Não utilizar dados fictícios para fingir que uma funcionalidade real está funcionando.

Interfaces de demonstração devem deixar claro quando os dados forem simulados.

---

# 71. LOGGING

Implementar logging adequado no backend.

Registrar eventos importantes, como:

* Erros;
* Falhas de autenticação;
* Uploads;
* Operações administrativas.

Não registrar:

* Senhas;
* Tokens;
* Informações sensíveis desnecessárias.

---

# 72. PREPARAÇÃO PARA PRODUÇÃO

O sistema deverá poder evoluir para:

* Backend hospedado;
* Frontend hospedado;
* MongoDB Atlas;
* Storage externo;
* HTTPS;
* Push Notifications;
* Domínio próprio;
* Android;
* iOS.

A configuração de produção deve ser separada das configurações de desenvolvimento.

---

# 73. EXECUÇÃO LOCAL

Fornecer documentação para:

1. Instalar Node.js;
2. Configurar MongoDB;
3. Configurar `.env`;
4. Instalar dependências;
5. Inicializar backend;
6. Inicializar frontend;
7. Executar testes;
8. Acessar localhost;
9. Acessar pela rede local;
10. Instalar como PWA.

---

# 74. SCRIPTS

Fornecer scripts npm apropriados, incluindo quando aplicável:

```text
npm run dev
npm run build
npm run start
npm run test
npm run lint
```

Os scripts devem funcionar conforme documentado.

---

# 75. ROADMAP CONCEITUAL

## Fase 1 — Fundação

* Projeto;
* Frontend;
* Backend;
* MongoDB;
* Configuração;
* Autenticação.

---

## Fase 2 — Organização pessoal

* Matérias;
* Tarefas;
* Trabalhos;
* Drive;
* Upload;
* Calendário;
* Agenda;
* Provas.

---

## Fase 3 — Inteligência

* Sistema de prioridade;
* Estatísticas;
* Pomodoro;
* Histórico.

---

## Fase 4 — Colaboração

* Grupos;
* Membros;
* Canais;
* Chat;
* Arquivos compartilhados.

---

## Fase 5 — Trabalho colaborativo

* Kanban;
* Trabalhos;
* Divisão de responsabilidades;
* Atividades.

---

## Fase 6 — Ambiente escolar

* Salas;
* Professores;
* Atividades;
* Entregas;
* Avisos.

---

## Fase 7 — Mobile

* PWA;
* Offline;
* Push notifications;
* Android;
* iOS.

---

# 76. REQUISITOS FUNCIONAIS ESSENCIAIS

O sistema final deve possuir funcionalmente:

* [ ] Cadastro;
* [ ] Login;
* [ ] Autenticação;
* [ ] Perfil;
* [ ] Matérias;
* [ ] Tarefas;
* [ ] Trabalhos;
* [ ] Provas;
* [ ] Calendário;
* [ ] Agenda;
* [ ] Drive pessoal;
* [ ] Upload;
* [ ] Drive de grupos;
* [ ] Compartilhamento de documentos;
* [ ] Grupos;
* [ ] Convites;
* [ ] Canais;
* [ ] Chat;
* [ ] Mensagens em tempo real;
* [ ] Kanban;
* [ ] Trabalhos colaborativos;
* [ ] Salas de aula;
* [ ] Atividades;
* [ ] Entrega de atividades;
* [ ] Sistema de prioridade;
* [ ] Pomodoro;
* [ ] Estatísticas;
* [ ] Notificações;
* [ ] Pesquisa global;
* [ ] PWA;
* [ ] Responsividade mobile.

---

# 77. RESTRIÇÕES

O sistema **NÃO** deve:

* Implementar comentários dentro de PDFs;
* Confiar apenas no frontend para segurança;
* Armazenar senhas em texto puro;
* Expor credenciais;
* Remover funcionalidades existentes sem justificativa;
* Copiar interfaces proprietárias;
* Criar funcionalidades falsas apresentadas como reais;
* Ignorar permissões de acesso;
* Expor arquivos privados através de URLs não autorizadas;
* Introduzir dependências desnecessárias sem justificativa.

---

# 78. CRITÉRIOS DE ACEITAÇÃO

Uma funcionalidade será considerada concluída somente quando:

1. Interface estiver implementada;
2. Backend estiver implementado quando necessário;
3. Banco estiver integrado quando necessário;
4. Autorização estiver funcionando;
5. Estados de erro estiverem tratados;
6. Estados de carregamento estiverem tratados;
7. Responsividade estiver adequada;
8. Testes relevantes existirem;
9. Documentação estiver atualizada;
10. Não quebrar funcionalidades existentes.

Uma funcionalidade parcialmente implementada não deve ser marcada como concluída.

---

# 79. DEFINIÇÃO DO PRODUTO FINAL

O SOS Estudante deve resultar em uma plataforma acadêmica completa na qual o estudante consiga:

```text
ENTRAR
  ↓
CONFIGURAR MATÉRIAS
  ↓
ORGANIZAR TAREFAS
  ↓
ARMAZENAR MATERIAIS
  ↓
ACOMPANHAR PRAZOS
  ↓
RECEBER PRIORIDADES
  ↓
ESTUDAR
  ↓
REGISTRAR SESSÕES
  ↓
PARTICIPAR DE GRUPOS
  ↓
CONVERSAR
  ↓
COMPARTILHAR DOCUMENTOS
  ↓
TRABALHAR EM EQUIPE
  ↓
ENTREGAR ATIVIDADES
  ↓
ACOMPANHAR SEU PROGRESSO
```

---

# 80. IDENTIDADE

**Nome:** SOS Estudante

**Nome técnico/repositório sugerido:** `sos-estudante`

**Slogan:**

> Organize. Estude. Conquiste.

O nome SOS Estudante representa uma plataforma acadêmica geral.

O sistema não deve ser limitado tecnicamente à área de Química.

Química é apenas uma das matérias suportadas.

O produto deve ser capaz de atender estudantes de diferentes áreas, níveis e disciplinas.

A identidade visual deve ser própria e não deve reproduzir a identidade de outras plataformas.

---

# 81. REGRA FINAL PARA DESENVOLVIMENTO

O objetivo não é produzir um protótipo visual.

O objetivo é construir um **sistema real, funcional, seguro, modular e evolutivo**.

Qualquer agente que trabalhar neste projeto deve:

> **Ler a especificação → analisar o código existente → planejar a alteração → implementar → testar → documentar.**

Não implementar funcionalidades de maneira superficial apenas para marcar uma tarefa como concluída.

Quando uma funcionalidade não puder ser implementada completamente, deixar explicitamente documentado:

* O que foi implementado;
* O que falta;
* Qual dependência está faltando;
* Qual decisão precisa ser tomada.

O SOS Estudante deve permanecer consistente independentemente de qual ferramenta ou agente de programação esteja realizando a implementação.

---

# FIM DA ESPECIFICAÇÃO

**SOS Estudante**
**Organize. Estude. Conquiste.**
