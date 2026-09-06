# SOS ESTUDANTE — ROADMAP

## 1. Objetivo

Este documento define a ordem oficial de implementação do projeto **SOS Estudante**, estabelecendo:

* etapas de desenvolvimento;
* dependências entre funcionalidades;
* responsabilidades dos agentes;
* pontos de integração;
* critérios de conclusão;
* definição do MVP;
* funcionalidades pós-MVP.

O roadmap deve ser utilizado em conjunto com:

* `PROJECT_SPEC.md`
* `ARCHITECTURE.md`
* `DATABASE.MD`
* `AUTH.MD`
* `API.MD`
* `GROUPS.MD`
* `STORAGE.MD`

Este documento define a **ordem de implementação**, enquanto os demais documentos definem os requisitos e contratos de cada área.

---

# 2. Princípios do Roadmap

O desenvolvimento deve seguir estas regras:

1. Construir primeiro a infraestrutura necessária para as funcionalidades seguintes.
2. Evitar implementar funcionalidades isoladas que dependam de componentes ainda inexistentes.
3. Backend e frontend devem evoluir de acordo com contratos de API definidos.
4. Cada etapa deve terminar em um estado funcional e testável.
5. Nenhuma fase deve quebrar funcionalidades anteriormente concluídas.
6. Funcionalidades complexas devem ser divididas em incrementos menores.
7. Segurança, acessibilidade e responsividade devem ser consideradas desde o início.
8. Não criar dependências desnecessárias entre módulos.
9. Evitar código duplicado.
10. Não implementar funcionalidades fora da especificação sem documentar a alteração.

---

# 3. Estado Inicial

A documentação base do projeto está definida:

```text
PROJECT_SPEC.md
ARCHITECTURE.md
DATABASE.MD
AUTH.MD
API.MD
GROUPS.MD
STORAGE.MD
ROADMAP.MD
```

Antes da implementação funcional, os agentes devem ler os documentos relevantes.

A documentação é a fonte de verdade do projeto.

Quando houver conflito entre código e documentação, o conflito deve ser identificado e resolvido antes de continuar o desenvolvimento.

---

# 4. Estratégia de Desenvolvimento

O desenvolvimento será incremental.

Fluxo geral:

```text
Planejamento
    ↓
Backend
    ↓
Frontend
    ↓
Integração
    ↓
Testes
    ↓
Correções
    ↓
Validação
    ↓
Próxima fase
```

Nenhuma fase deve ser considerada concluída apenas porque o código foi escrito.

Uma fase somente está concluída quando:

* código está integrado;
* funcionalidades principais funcionam;
* erros críticos foram corrigidos;
* testes relevantes foram executados;
* frontend e backend estão compatíveis;
* documentação necessária foi atualizada.

---

# 5. Responsabilidade dos Agentes

## 5.1 Codex

Responsável principalmente por:

* backend;
* Node.js;
* Express;
* TypeScript;
* MongoDB;
* Mongoose;
* autenticação;
* autorização;
* APIs;
* serviços;
* repositories;
* validações;
* segurança;
* upload/storage;
* Socket.io;
* testes backend;
* arquitetura;
* correções estruturais.

---

## 5.2 Mimo Code

Responsável principalmente por:

* frontend;
* React;
* TypeScript;
* Tailwind CSS;
* componentes;
* páginas;
* layouts;
* navegação;
* responsividade;
* acessibilidade;
* experiência do usuário;
* estados de loading/error/empty;
* integração visual com APIs.

---

## 5.3 Antigravity

Responsável principalmente por:

* integração geral;
* revisão;
* testes end-to-end;
* identificação de inconsistências;
* validação de fluxos completos;
* correção de problemas de integração;
* verificação de regressões;
* revisão de qualidade.

Antigravity não deve alterar arbitrariamente contratos ou arquitetura sem registrar a mudança.

---

# 6. Estratégia de Branches

Preferência:

```text
main
│
├── develop
│
├── feature/backend-auth
├── feature/frontend-auth
├── feature/tasks
├── feature/groups
└── feature/calendar
```

Regras:

* `main` deve permanecer estável.
* Features devem ser desenvolvidas separadamente.
* Commits devem ser objetivos.
* Evitar commits gigantes sem relação clara.
* Alterações incompatíveis devem ser comunicadas.
* Merge deve ocorrer somente após validação.

---

# 7. FASE 0 — Preparação do Projeto

## Objetivo

Criar a estrutura técnica inicial.

### Backend

* criar projeto Node.js;
* configurar TypeScript;
* configurar Express;
* configurar MongoDB/Mongoose;
* configurar variáveis de ambiente;
* criar estrutura MVC/Services/Repositories;
* criar middleware de erros;
* criar validação;
* criar endpoint `/health`;
* configurar testes.

### Frontend

* criar projeto React + TypeScript;
* configurar Vite;
* configurar Tailwind;
* configurar React Router;
* configurar Axios;
* criar estrutura de componentes;
* criar layouts;
* configurar PWA posteriormente.

### Geral

* configurar ESLint;
* configurar Prettier;
* configurar `.gitignore`;
* configurar `.env.example`;
* configurar scripts;
* documentar execução local.

### Critério de conclusão

```text
Backend inicia
Frontend inicia
MongoDB conecta
/health responde
Build funciona
Testes básicos executam
```

---

# 8. FASE 1 — Autenticação e Usuários

## Objetivo

Criar a base de usuários e segurança.

### Backend

Implementar:

* registro;
* login;
* logout;
* `/auth/me`;
* JWT;
* bcrypt;
* autorização;
* recuperação de senha;
* alteração de senha;
* validação;
* proteção de rotas;
* rate limiting básico;
* tratamento de erros.

### Frontend

Implementar:

* tela de cadastro;
* tela de login;
* recuperação de senha;
* gerenciamento de sessão;
* proteção de rotas;
* logout;
* estados de loading;
* mensagens de erro.

### Critério de conclusão

Um usuário deve conseguir:

```text
Cadastrar
   ↓
Entrar
   ↓
Manter sessão
   ↓
Acessar área autenticada
   ↓
Sair
```

---

# 9. FASE 2 — Estrutura do Estudante

## Objetivo

Criar a configuração acadêmica inicial.

Implementar:

* perfil;
* matérias;
* matérias personalizadas;
* nível de conhecimento;
* dificuldade;
* complexidade;
* preferências;
* configurações.

Níveis:

```text
Não sei
Básico
Médio
Avançado
```

Dificuldade:

```text
1 — Muito fácil
2 — Fácil
3 — Médio
4 — Difícil
5 — Muito difícil
```

Complexidade:

```text
1 — Muito simples
2 — Simples
3 — Média
4 — Complexa
5 — Muito complexa
```

### Critério de conclusão

O estudante deve conseguir configurar completamente sua estrutura de estudos.

---

# 10. FASE 3 — Tarefas, Dashboard e Priorização

## Objetivo

Criar o núcleo do sistema de organização.

Implementar:

* tarefas;
* trabalhos;
* atividades;
* prazos;
* status;
* prioridades;
* dificuldade;
* complexidade;
* dashboard;
* "O que devo fazer agora?";
* filtros;
* ordenação.

O sistema deverá calcular uma prioridade baseada em fatores como:

```text
Prazo
+
Dificuldade
+
Complexidade
+
Configurações do usuário
```

O usuário poderá escolher qual fator possui maior peso.

### Dashboard

Deve apresentar informações como:

* tarefas próximas;
* tarefas atrasadas;
* tarefas prioritárias;
* progresso;
* próximas provas;
* próximos eventos;
* sessões de estudo.

### Critério de conclusão

O sistema deve conseguir responder:

> "O que eu deveria estudar/fazer agora?"

com base nos dados disponíveis.

---

# 11. FASE 4 — Arquivos e Drive

## Objetivo

Criar o sistema de armazenamento pessoal.

Implementar:

* upload;
* download;
* visualização de metadados;
* exclusão;
* pastas;
* categorias;
* associação com matérias;
* associação com tarefas;
* armazenamento local;
* validação de arquivos;
* limite de tamanho;
* autorização.

Tipos suportados devem seguir `STORAGE.MD`.

### Critério de conclusão

O estudante deve conseguir:

```text
Enviar arquivo
   ↓
Armazenar
   ↓
Encontrar
   ↓
Baixar
   ↓
Excluir
```

---

# 12. FASE 5 — Grupos, Canais e Comunicação

## Objetivo

Criar o ambiente colaborativo.

Implementar:

* criação de grupos;
* código de entrada;
* convites;
* membros;
* funções;
* canais;
* mensagens;
* respostas;
* edição;
* exclusão;
* anexos;
* notificações básicas.

Canais padrão:

```text
Geral
Avisos
Materiais
Exercícios
Dúvidas
Trabalhos
```

### Socket.io

Implementar comunicação em tempo real para:

* mensagens;
* presença quando aplicável;
* atualizações relevantes;
* notificações em tempo real.

### Critério de conclusão

Um grupo deve permitir que estudantes:

```text
Criem grupo
↓
Entrem
↓
Visualizem canais
↓
Conversem
↓
Compartilhem materiais
```

---

# 13. FASE 6 — Kanban e Trabalhos Colaborativos

## Objetivo

Criar ferramentas para trabalhos escolares em grupo.

Implementar Kanban:

```text
A fazer
Em andamento
Em revisão
Concluído
```

Implementar:

* cards;
* responsáveis;
* prazos;
* prioridades;
* anexos;
* comentários;
* atribuição de responsabilidades;
* trabalhos colaborativos.

### Critério de conclusão

Um grupo deve conseguir organizar um trabalho escolar do início ao fim utilizando o Kanban.

---

# 14. FASE 7 — Salas, Professores e Atividades

## Objetivo

Criar suporte para ambientes escolares formais.

Implementar:

* salas;
* professores;
* responsáveis;
* estudantes;
* atividades;
* prazos;
* instruções;
* anexos;
* envio de atividades;
* acompanhamento de submissões.

### Fluxo

```text
Professor
   ↓
Cria atividade
   ↓
Estudante recebe
   ↓
Estudante realiza
   ↓
Estudante envia
   ↓
Sistema registra submissão
```

### Critério de conclusão

Uma atividade escolar deve poder ser criada, distribuída e enviada pelo sistema.

---

# 15. FASE 8 — Calendário, Agenda e Estudos

## Objetivo

Criar o sistema temporal do estudante.

Implementar:

* calendário;
* agenda;
* eventos;
* provas;
* datas importantes;
* integração com tarefas;
* visualização diária;
* semanal;
* mensal.

## Pomodoro

Implementar:

```text
25 minutos — estudo
5 minutos — pausa
```

Registrar:

* início;
* término;
* duração;
* matéria;
* tarefa relacionada;
* sessão concluída.

O relógio deve utilizar o fuso configurado pelo usuário, com suporte inicial ao horário de Brasília.

### Critério de conclusão

O estudante deve conseguir visualizar suas obrigações e registrar sessões de estudo.

---

# 16. FASE 9 — Notificações, Busca e Estatísticas

## Objetivo

Criar recursos de acompanhamento e descoberta.

### Notificações

Implementar:

* tarefas próximas;
* tarefas atrasadas;
* convites;
* mensagens relevantes;
* atividades;
* eventos;
* menções.

Preparar arquitetura para push notifications.

### Busca

Implementar busca global por:

* tarefas;
* matérias;
* arquivos;
* grupos;
* mensagens;
* atividades;
* eventos.

### Estatísticas

Implementar indicadores como:

* tarefas concluídas;
* tarefas pendentes;
* horas estudadas;
* sessões realizadas;
* progresso por matéria;
* desempenho temporal;
* produtividade.

---

# 17. FASE 10 — PWA, Offline e Refinamento Mobile

## Objetivo

Transformar a aplicação em uma experiência realmente mobile-first.

Implementar:

* PWA;
* instalação;
* cache;
* offline básico;
* sincronização;
* responsividade;
* navegação mobile;
* estados offline;
* recuperação de conexão.

Prioridade:

```text
Mobile
↓
Tablet
↓
Desktop
```

A interface não deve depender exclusivamente de mouse ou telas grandes.

---

# 18. FASE 11 — Segurança, Testes e Performance

## Objetivo

Preparar o projeto para uso real.

### Segurança

Revisar:

* autenticação;
* autorização;
* IDOR;
* uploads;
* path traversal;
* XSS;
* NoSQL injection;
* CSRF quando aplicável;
* CORS;
* rate limiting;
* secrets;
* logs;
* exposição de dados.

### Testes

Implementar/revisar:

* testes unitários;
* testes de integração;
* testes de API;
* testes de autenticação;
* testes de permissões;
* testes de upload;
* testes de grupos;
* testes frontend;
* testes end-to-end.

### Performance

Revisar:

* índices MongoDB;
* paginação;
* consultas;
* carregamento frontend;
* cache;
* bundle;
* imagens;
* uploads;
* WebSocket;
* busca.

---

# 19. FASE 12 — Preparação para Produção

## Objetivo

Preparar o sistema para implantação.

Verificar:

* variáveis de ambiente;
* build de produção;
* logs;
* monitoramento;
* tratamento de erros;
* backups;
* armazenamento;
* banco de dados;
* segurança;
* domínio;
* HTTPS;
* PWA;
* documentação de deploy.

A implementação de infraestrutura específica de produção pode variar conforme o provedor escolhido.

---

# 20. Gates de Integração

Ao terminar cada fase, deve ocorrer uma verificação.

## Gate 1

```text
Backend + Frontend + Banco
```

## Gate 2

```text
Autenticação + Perfil + Matérias
```

## Gate 3

```text
Tarefas + Dashboard + Prioridade
```

## Gate 4

```text
Arquivos + Drive + Permissões
```

## Gate 5

```text
Grupos + Canais + Chat
```

## Gate 6

```text
Kanban + Trabalhos + Responsabilidades
```

## Gate 7

```text
Salas + Atividades + Submissões
```

## Gate 8

```text
Calendário + Pomodoro + Sessões
```

## Gate 9

```text
Notificações + Busca + Estatísticas
```

## Gate 10

```text
PWA + Offline + Mobile
```

## Gate Final

```text
Segurança + Testes + Performance + Produção
```

---

# 21. Definition of Done

Uma funcionalidade somente será considerada concluída quando:

* [ ] requisito implementado;
* [ ] backend funcionando;
* [ ] frontend integrado;
* [ ] validações implementadas;
* [ ] permissões verificadas;
* [ ] estados de loading implementados;
* [ ] estados de erro implementados;
* [ ] estado vazio implementado quando necessário;
* [ ] responsividade verificada;
* [ ] acessibilidade básica verificada;
* [ ] testes relevantes executados;
* [ ] sem regressões conhecidas;
* [ ] documentação atualizada quando necessário.

---

# 22. MVP

O MVP do SOS Estudante deve priorizar o núcleo da organização individual.

## MVP obrigatório

```text
Autenticação
Perfil
Matérias
Níveis de conhecimento
Dificuldade
Complexidade
Tarefas
Prazos
Prioridade
Dashboard
Calendário básico
Drive pessoal
Pomodoro
Estatísticas básicas
```

## MVP colaborativo

Após o núcleo individual estar estável:

```text
Grupos
Membros
Canais
Chat
Compartilhamento de arquivos
Kanban
```

Funcionalidades escolares avançadas podem ser implementadas posteriormente.

---

# 23. Pós-MVP

Possíveis evoluções:

* armazenamento em nuvem;
* notificações push completas;
* aplicativos Android/iOS;
* sincronização avançada offline;
* sistema de recomendações de estudo;
* inteligência para planejamento;
* relatórios avançados;
* integração com calendários externos;
* recursos avançados para professores;
* auditoria;
* analytics avançado;
* múltiplas escolas/instituições;
* escalabilidade horizontal;
* recursos educacionais adicionais.

Nenhuma dessas funcionalidades deve comprometer a estabilidade do núcleo existente.

---

# 24. Protocolo de Handoff entre Agentes

Quando um agente terminar uma tarefa, deve informar:

```text
O que foi implementado
Arquivos alterados
APIs criadas/alteradas
Modelos alterados
Dependências adicionadas
Como executar
Como testar
Problemas conhecidos
Próxima etapa recomendada
```

Exemplo:

```text
STATUS: CONCLUÍDO

Implementado:
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/auth/me

Arquivos:
- backend/src/controllers/authController.ts
- backend/src/services/authService.ts
- backend/src/routes/authRoutes.ts

Testes:
- registro válido
- senha inválida
- email duplicado
- login válido

Problemas conhecidos:
- recuperação de senha ainda não implementada.
```

---

# 25. Regra de Não Quebra

Nenhum agente deve modificar uma funcionalidade existente de forma que:

* quebre APIs;
* remova dados;
* altere contratos sem necessidade;
* quebre telas existentes;
* elimine funcionalidades previamente concluídas.

Caso uma alteração incompatível seja necessária:

1. identificar o motivo;
2. documentar;
3. atualizar os contratos;
4. atualizar frontend/backend afetados;
5. executar testes de regressão.

---

# 26. Ordem Oficial de Implementação

A ordem recomendada é:

```text
FASE 0
Preparação
   ↓
FASE 1
Autenticação
   ↓
FASE 2
Perfil + Matérias
   ↓
FASE 3
Tarefas + Dashboard + Prioridade
   ↓
FASE 4
Drive + Arquivos
   ↓
FASE 5
Grupos + Canais + Chat
   ↓
FASE 6
Kanban + Trabalhos
   ↓
FASE 7
Salas + Atividades + Submissões
   ↓
FASE 8
Calendário + Pomodoro
   ↓
FASE 9
Notificações + Busca + Estatísticas
   ↓
FASE 10
PWA + Offline + Mobile
   ↓
FASE 11
Segurança + Testes + Performance
   ↓
FASE 12
Produção
```

---

# 27. Critério Final de Aceitação

O SOS Estudante será considerado tecnicamente pronto quando:

* o usuário conseguir criar e acessar sua conta;
* configurar suas matérias;
* cadastrar tarefas;
* receber prioridades;
* acompanhar seus estudos;
* organizar arquivos;
* utilizar calendário;
* utilizar Pomodoro;
* acompanhar estatísticas;
* participar de grupos;
* conversar em canais;
* compartilhar materiais;
* organizar trabalhos;
* utilizar Kanban;
* participar de salas;
* receber atividades;
* enviar submissões;
* receber notificações;
* pesquisar conteúdos;
* utilizar o sistema em dispositivos móveis;
* utilizar funcionalidades básicas offline;
* os dados estiverem protegidos;
* os testes principais estiverem passando;
* não existirem erros críticos conhecidos.

---

# 28. Regra Final para os Agentes

Antes de implementar qualquer funcionalidade:

```text
1. Ler PROJECT_SPEC.md
2. Ler o documento específico da funcionalidade
3. Verificar ARCHITECTURE.md
4. Verificar DATABASE.MD
5. Verificar API.MD
6. Implementar
7. Testar
8. Integrar
9. Revisar
10. Atualizar documentação se necessário
```

**O objetivo não é simplesmente escrever código.**

O objetivo é construir o **SOS Estudante** como um sistema integrado, consistente, seguro, escalável e sustentável.

**Organize. Estude. Conquiste.**
