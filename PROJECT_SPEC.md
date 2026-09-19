# SOS ESTUDANTE — PROJECT SPECIFICATION

**Versão:** 3.0  
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

- Organização de estudos;
- Materiais escolares;
- Arquivos pessoais;
- Tarefas;
- Trabalhos;
- Provas;
- Agenda;
- Calendário;
- Rotina de estudos;
- Grupos;
- Comunicação;
- Trabalhos colaborativos;
- Salas de aula;
- Estatísticas acadêmicas.

O produto deve combinar conceitos de plataformas de produtividade, armazenamento e colaboração, mas possuir identidade própria.

As plataformas utilizadas como referência conceitual não devem ter suas interfaces, marcas, elementos proprietários ou identidade visual copiadas.

O SOS Estudante deve priorizar uma arquitetura **econômica, leve e adequada para infraestrutura gratuita ou de baixo custo**, especialmente durante as primeiras fases de desenvolvimento.

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
10. Utilizar o armazenamento do dispositivo sempre que possível;
11. Reduzir a dependência de armazenamento permanente no servidor;
12. Possibilitar evolução futura para uma plataforma educacional completa.

---

# 3. PRINCÍPIOS DO PROJETO

Todas as implementações devem seguir estes princípios.

## 3.1 Funcionalidade real

Não criar apenas interfaces simuladas.

Sempre que uma funcionalidade for apresentada como disponível, ela deve possuir implementação funcional no backend, banco de dados, armazenamento local ou lógica correspondente.

---

## 3.2 Mobile-first

O sistema deve ser projetado primeiro para telas pequenas e depois adaptado para telas maiores.

---

## 3.3 Modularidade

Cada funcionalidade deve possuir responsabilidades bem definidas.

---

## 3.4 Escalabilidade

O código deve permitir expansão sem necessidade de reescrever toda a aplicação.

---

## 3.5 Economia de infraestrutura

O projeto deve evitar funcionalidades que exijam grandes quantidades de:

- Armazenamento permanente;
- Processamento;
- Tráfego;
- Backups;
- Serviços externos pagos.

O servidor deve armazenar somente os dados necessários para o funcionamento do sistema e os arquivos compartilhados que realmente precisem passar pelo servidor.

---

## 3.6 Armazenamento local primeiro

Arquivos pessoais do usuário devem permanecer no dispositivo sempre que tecnicamente possível.

O servidor não deve funcionar como armazenamento em nuvem pessoal permanente.

---

## 3.7 Segurança

Validações importantes devem existir no backend.

O frontend nunca deve ser considerado uma camada confiável de segurança.

---

## 3.8 API-first

Frontend e backend devem se comunicar através de APIs bem definidas.

---

## 3.9 Separação de responsabilidades

Interface, regras de negócio, persistência, armazenamento local e infraestrutura devem permanecer separadas.

---

# 4. PLATAFORMAS

O SOS Estudante deve funcionar em:

- Navegadores desktop;
- Navegadores mobile;
- Tablets;
- Android;
- iOS.

A aplicação web deve ser preparada para funcionamento como PWA.

A arquitetura deve permitir futuramente a criação de aplicativo através de:

- React Native + Expo;
- Capacitor;
- Outra solução compatível.

O backend deve ser independente do cliente.

---

# 5. PERFIS DE USUÁRIO

O sistema deve suportar diferentes níveis de usuário.

## 5.1 Student

Usuário estudante padrão.

Pode:

- Gerenciar suas matérias;
- Criar tarefas;
- Criar eventos;
- Organizar arquivos pessoais;
- Criar grupos;
- Participar de grupos;
- Enviar mensagens;
- Compartilhar materiais;
- Participar de trabalhos;
- Utilizar Kanban;
- Utilizar Pomodoro;
- Visualizar estatísticas.

---

## 5.2 Group Owner

Criador/responsável principal de um grupo.

Possui controle total sobre o grupo.

Pode:

- Editar grupo;
- Gerenciar membros;
- Alterar permissões;
- Criar canais;
- Criar tarefas;
- Gerenciar arquivos compartilhados;
- Gerenciar trabalhos;
- Excluir o grupo.

---

## 5.3 Group Admin

Administrador delegado.

Pode:

- Gerenciar membros;
- Criar canais;
- Gerenciar arquivos;
- Criar tarefas;
- Gerenciar trabalhos;
- Fixar avisos.

Não deve possuir necessariamente todos os poderes do Owner.

---

## 5.4 Teacher

Perfil preparado para salas de aula.

Pode:

- Criar atividades;
- Definir prazos;
- Compartilhar materiais;
- Criar avisos;
- Acompanhar entregas;
- Organizar estudantes.

---

## 5.5 Member

Membro comum de um grupo.

Pode:

- Visualizar conteúdos;
- Enviar mensagens;
- Compartilhar arquivos quando permitido;
- Participar de tarefas;
- Participar de trabalhos colaborativos;
- Atualizar suas próprias tarefas.

---

## 5.6 Guest

Usuário com acesso limitado.

Pode apenas visualizar conteúdos explicitamente disponibilizados.

---

# 6. AUTENTICAÇÃO E CONTA

## 6.1 Cadastro

Campos:

- Nome;
- Nome de usuário;
- Email;
- Senha;
- Foto de perfil opcional.

A senha nunca deve ser armazenada em texto puro.

Utilizar bcrypt ou mecanismo equivalente.

---

## 6.2 Login

Permitir autenticação através de:

- Email;
- Senha.

Utilizar JWT para autenticação de API.

---

## 6.3 Sessão

Implementar:

- Login persistente;
- Logout;
- Expiração de token;
- Renovação segura quando aplicável;
- Proteção de rotas.

---

## 6.4 Recuperação de senha

Preparar estrutura para recuperação de senha através de email.

A recuperação de senha não deve exigir a manutenção de um sistema complexo de armazenamento adicional.

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

- Nome;
- Descrição opcional;
- Identificador visual;
- Nível de conhecimento;
- Dificuldade;
- Complexidade.

## 8.1 Nível de conhecimento

Valores:

- Não sei;
- Básico;
- Médio;
- Avançado.

## 8.2 Dificuldade

Escala de 1 a 5:

1 — Muito fácil  
2 — Fácil  
3 — Médio  
4 — Difícil  
5 — Muito difícil

## 8.3 Complexidade

Escala de 1 a 5:

1 — Pouco complicado  
2 — Levemente complicado  
3 — Moderado  
4 — Complicado  
5 — Muito complicado

Esses valores alimentam o sistema de priorização.

---

# 9. DASHBOARD

O Dashboard é a tela principal do usuário.

Deve apresentar:

- Tarefas prioritárias;
- Tarefas atrasadas;
- Trabalhos próximos;
- Próximas provas;
- Eventos;
- Arquivos recentes;
- Grupos recentes;
- Atividades pendentes;
- Progresso de estudos;
- Horas estudadas;
- Próximo compromisso.

O Dashboard não deve depender de notificações para funcionar.

As informações devem estar disponíveis diretamente na interface.

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

- Prazo;
- Dificuldade;
- Complexidade;
- Tipo de atividade;
- Estado;
- Preferências do usuário.

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

- Alta prioridade;
- Média prioridade;
- Baixa prioridade.

Representar visualmente através de badges/indicadores, sem depender exclusivamente de cores para transmitir significado.

---

# 12. ARQUIVOS PESSOAIS

O SOS Estudante **não deve funcionar como um serviço tradicional de armazenamento em nuvem pessoal**.

Arquivos pessoais devem permanecer no dispositivo do usuário sempre que possível.

O sistema deve oferecer uma camada de organização local para que o usuário possa organizar seus arquivos acadêmicos.

Funcionalidades:

- Seleção de arquivos;
- Organização por matéria;
- Organização por pastas;
- Pesquisa local;
- Tags;
- Associação a tarefas;
- Associação a eventos;
- Visualização quando suportada pelo navegador;
- Abertura ou download através do dispositivo.

O arquivo pessoal não deve ser enviado ao backend simplesmente para ser cadastrado no SOS Estudante.

---

# 13. ARMAZENAMENTO LOCAL

O sistema deve possuir uma camada de abstração para armazenamento local.

A implementação poderá utilizar tecnologias apropriadas do navegador, como:

- IndexedDB;
- File System API;
- OPFS;
- Outra solução compatível.

A aplicação não deve depender diretamente de uma única API de armazenamento.

Criar uma abstração semelhante a:

```text
LocalFileStorage
```

Responsabilidades:

- Salvar arquivos localmente;
- Recuperar arquivos;
- Excluir arquivos;
- Listar arquivos;
- Pesquisar arquivos;
- Associar metadados;
- Controlar organização por matéria e pasta.

---

# 14. METADADOS DE ARQUIVOS PESSOAIS

Os metadados podem ser armazenados localmente.

Exemplo:

```text
Nome
Nome original
Tipo
MIME type
Tamanho
Matéria
Pasta
Tags
Data de criação
Data de atualização
Localização interna
```

O backend não deve receber o conteúdo do arquivo pessoal por padrão.

---

# 15. AVISO SOBRE ARMAZENAMENTO LOCAL

A interface deve informar claramente que arquivos pessoais armazenados localmente dependem do dispositivo e do ambiente utilizado.

O usuário deve ser avisado de que:

- Trocar de dispositivo pode impedir acesso aos arquivos locais;
- Limpar os dados do navegador pode remover arquivos armazenados localmente;
- O SOS Estudante não funciona como backup automático desses arquivos;
- Arquivos importantes devem possuir backup realizado pelo próprio usuário.

A mensagem deve ser clara, sem causar alarmismo.

---

# 16. ARQUIVOS DE GRUPOS

Arquivos compartilhados em grupos possuem comportamento diferente dos arquivos pessoais.

Arquivos de grupo podem ser enviados ao servidor porque precisam estar disponíveis para outros membros autorizados.

Exemplo:

```text
Grupo: Química Orgânica

Arquivos compartilhados/
├── Trabalho.pdf
├── Referencias.pdf
└── Apresentacao.pptx
```

Os arquivos devem possuir:

- Grupo;
- Canal, quando aplicável;
- Autor do envio;
- Data de envio;
- Tipo;
- Tamanho;
- Prazo de retenção;
- Identificador de armazenamento.

---

# 17. RETENÇÃO TEMPORÁRIA DE ARQUIVOS DE GRUPO

Arquivos enviados aos grupos devem ser considerados **temporários**.

O sistema deve permitir definir uma política de retenção.

Exemplo:

```text
Arquivo enviado
       ↓
Disponível para o grupo
       ↓
Período de retenção
       ↓
Aviso de expiração na interface
       ↓
Exclusão automática
```

O período de retenção deve ser configurável pela aplicação.

O sistema não deve assumir armazenamento permanente de arquivos de grupo.

---

# 18. EXCLUSÃO DE ARQUIVOS DE GRUPO

Arquivos de grupo podem ser excluídos:

- Manualmente por usuários autorizados;
- Automaticamente após expiração;
- Quando o recurso relacionado for removido, conforme política definida.

A exclusão deve remover:

1. O arquivo armazenado;
2. Os metadados associados;
3. Referências que não sejam mais necessárias.

---

# 19. ARMAZENAMENTO DE GRUPO

A aplicação deve possuir uma camada de abstração:

```text
TemporaryGroupFileStorage
```

Essa camada deve permitir futuramente utilizar diferentes formas de armazenamento.

Durante o desenvolvimento inicial, poderá utilizar armazenamento temporário fornecido pelo próprio ambiente de hospedagem, desde que compatível com o provedor.

A aplicação não deve depender permanentemente de um fornecedor específico.

Se o ambiente de hospedagem não garantir persistência de arquivos, o sistema deve deixar essa limitação documentada.

---

# 20. LIMITES DE ARQUIVOS

Para reduzir consumo de infraestrutura, arquivos compartilhados devem possuir:

- Limite de tamanho;
- Tipos permitidos;
- Validação MIME;
- Validação de extensão;
- Limite de quantidade por envio;
- Prazo de retenção.

Os limites devem ser configuráveis através de variáveis de ambiente ou configuração do sistema.

---

# 21. TIPOS DE ARQUIVO

Suportar inicialmente:

- PDF;
- DOC;
- DOCX;
- XLS;
- XLSX;
- PPT;
- PPTX;
- TXT;
- PNG;
- JPG;
- JPEG;
- ZIP.

O sistema deve permitir expansão futura.

---

# 22. RESTRIÇÃO DE PDF

**Não implementar comentários ou sistema de anotação colaborativa dentro de arquivos PDF.**

PDFs podem ser:

- Visualizados;
- Baixados;
- Compartilhados;
- Anexados.

Mas não devem possuir sistema de comentários internos.

---

# 23. GRUPOS DE ESTUDO

Usuários poderão criar grupos.

Cada grupo deve possuir:

- Nome;
- Descrição;
- Imagem;
- Owner;
- Membros;
- Código de entrada;
- Convites;
- Canais;
- Arquivos temporários;
- Tarefas;
- Trabalhos;
- Kanban;
- Calendário.

---

# 24. ENTRADA EM GRUPOS

Permitir:

### Convite

Usuário recebe convite.

### Código

Usuário informa código do grupo.

### Link de convite

Preparar estrutura para links de convite.

Links devem possuir controle de validade quando aplicável.

---

# 25. CANAIS

Cada grupo deve possuir canais.

Canais padrão:

- Geral;
- Avisos;
- Materiais;
- Exercícios;
- Dúvidas;
- Trabalhos.

Administradores podem criar canais personalizados.

Cada canal pode conter:

- Mensagens;
- Arquivos temporários;
- Tarefas;
- Avisos;
- Links;
- Atividades.

---

# 26. CHAT

Implementar comunicação em tempo real.

Tecnologia preferencial:

**Socket.io**

Funcionalidades:

- Enviar mensagem;
- Editar mensagem;
- Excluir mensagem;
- Responder mensagem;
- Reagir;
- Fixar;
- Compartilhar arquivos temporários;
- Compartilhar imagens;
- Compartilhar links.

O sistema deve evitar manter dados desnecessários indefinidamente.

---

# 27. MENSAGENS

Cada mensagem deve registrar:

- Autor;
- Canal;
- Conteúdo;
- Data;
- Data de edição;
- Arquivos anexados, quando aplicável;
- Mensagem respondida, quando aplicável.

Implementar paginação/histórico para evitar carregar todas as mensagens simultaneamente.

---

# 28. RETENÇÃO DE MENSAGENS

O sistema poderá possuir uma política de retenção de mensagens para reduzir crescimento indefinido do banco.

A implementação inicial deve permitir que a política seja configurada futuramente sem alterar a estrutura principal do sistema.

Mensagens essenciais para o funcionamento atual do grupo não devem ser excluídas de maneira inesperada.

---

# 29. QUADRO KANBAN

Cada grupo poderá possuir um quadro Kanban.

Colunas padrão:

1. A fazer;
2. Em andamento;
3. Em revisão;
4. Concluído.

Permitir:

- Criar cartões;
- Mover cartões;
- Reordenar cartões;
- Definir responsáveis;
- Definir prazo;
- Definir prioridade;
- Adicionar descrição;
- Criar checklist;
- Anexar arquivos temporários;
- Associar matéria.

---

# 30. TRABALHOS COLABORATIVOS

Criar sistema específico para trabalhos escolares.

Cada trabalho deve possuir:

- Título;
- Descrição;
- Matéria;
- Grupo;
- Prazo;
- Responsáveis;
- Status;
- Checklist;
- Arquivos temporários;
- Histórico.

---

# 31. DIVISÃO DE RESPONSABILIDADES

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

# 32. SALAS DE AULA

Criar estrutura para salas de aula.

Uma sala pode possuir:

- Nome;
- Matéria;
- Professor/responsável;
- Estudantes;
- Materiais;
- Atividades;
- Avisos;
- Calendário.

---

# 33. ATIVIDADES

Professores/responsáveis poderão criar atividades.

Cada atividade pode conter:

- Título;
- Descrição;
- Matéria;
- Prazo;
- Arquivos temporários quando necessários;
- Sala;
- Destinatários.

---

# 34. ENTREGA DE ATIVIDADES

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

Os arquivos enviados para uma entrega devem seguir a mesma política de armazenamento temporário quando forem armazenados no servidor.

Registrar:

- Usuário;
- Data da entrega;
- Arquivos;
- Atividade.

Preparar estrutura para futura implementação de avaliação/notas.

---

# 35. CALENDÁRIO

Criar calendário completo.

Visualizações:

- Mensal;
- Semanal;
- Diária;
- Agenda.

Exibir:

- Tarefas;
- Trabalhos;
- Provas;
- Atividades;
- Eventos;
- Compromissos;
- Eventos dos grupos;
- Eventos de salas de aula.

Eventos compartilhados devem aparecer automaticamente no calendário do usuário quando aplicável.

---

# 36. EVENTOS

Cada evento pode possuir:

- Título;
- Descrição;
- Data;
- Horário;
- Duração;
- Matéria;
- Grupo;
- Criador;
- Participantes;
- Arquivos relacionados.

Arquivos relacionados devem seguir as regras de armazenamento local ou temporário conforme seu contexto.

---

# 37. PROVAS

Criar tipo específico de evento para provas.

Campos:

- Matéria;
- Data;
- Horário;
- Conteúdo;
- Descrição;
- Arquivos relacionados.

Mostrar contagem regressiva.

Exemplo:

> Prova de Física — faltam 5 dias.

---

# 38. AGENDA

Permitir:

- Criar compromisso;
- Editar;
- Excluir;
- Definir data;
- Definir horário;
- Definir duração;
- Adicionar descrição;
- Associar matéria;
- Associar grupo.

---

# 39. POMODORO

Criar timer Pomodoro.

Configuração padrão:

```text
Estudo:        25 minutos
Pausa curta:    5 minutos
```

Permitir configuração personalizada.

Campos:

- Tempo de estudo;
- Pausa curta;
- Pausa longa;
- Número de ciclos.

Funcionalidades:

- Iniciar;
- Pausar;
- Continuar;
- Reiniciar;
- Finalizar.

Possuir alertas sonoros e visuais **somente dentro da própria aplicação**.

Não utilizar notificações push para essa funcionalidade.

---

# 40. SESSÕES DE ESTUDO

Registrar sessões concluídas.

Cada sessão deve armazenar:

- Usuário;
- Matéria;
- Data;
- Duração;
- Tipo;
- Quantidade de ciclos.

---

# 41. RELÓGIO

Exibir relógio em tempo real.

Fuso horário padrão:

**America/Sao_Paulo**

A aplicação deve considerar corretamente o horário local através das APIs apropriadas.

---

# 42. ESTATÍSTICAS

Criar área de estatísticas acadêmicas.

Exibir:

- Horas estudadas;
- Sessões Pomodoro;
- Tarefas concluídas;
- Trabalhos concluídos;
- Tarefas atrasadas;
- Matérias estudadas;
- Evolução semanal;
- Evolução mensal.

Utilizar gráficos simples.

As estatísticas devem utilizar dados já existentes no sistema e evitar processamento desnecessariamente pesado.

---

# 43. PESQUISA GLOBAL

Criar pesquisa global.

Pesquisar:

- Arquivos pessoais locais;
- Arquivos de grupo disponíveis;
- Tarefas;
- Trabalhos;
- Grupos;
- Canais;
- Mensagens;
- Matérias;
- Eventos;
- Usuários.

Os resultados devem ser separados por categoria.

A pesquisa de arquivos pessoais deve ocorrer localmente quando os arquivos não estiverem no servidor.

---

# 44. PERFIL

Perfil deve apresentar:

- Foto;
- Nome;
- Nome de usuário;
- Matérias;
- Grupos;
- Estatísticas.

Respeitar configurações de privacidade.

---

# 45. CONFIGURAÇÕES

## Conta

- Nome;
- Email;
- Nome de usuário;
- Foto;
- Senha.

## Estudos

- Matérias;
- Dificuldade;
- Complexidade;
- Preferências de prioridade.

## Armazenamento

- Gerenciar arquivos locais;
- Visualizar espaço utilizado quando disponível;
- Excluir dados locais;
- Exportar dados quando aplicável.

## Aparência

- Claro;
- Escuro;
- Seguir sistema.

## Privacidade

- Perfil;
- Convites;
- Participação em grupos.

---

# 46. NAVEGAÇÃO MOBILE

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

---

# 47. NAVEGAÇÃO DESKTOP

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

---

# 48. DESIGN SYSTEM

A interface deve ser:

- Minimalista;
- Moderna;
- Profissional;
- Acadêmica;
- Responsiva;
- Acessível.

Inspirar-se conceitualmente em produtos modernos de produtividade.

Não copiar:

- Logos;
- Marcas;
- Identidade visual;
- Componentes proprietários;
- Interfaces específicas.

---

# 49. RESPONSIVIDADE

Garantir funcionamento em:

- 320px+;
- Smartphones;
- Tablets;
- Laptops;
- Monitores grandes.

Evitar:

- Overflow horizontal desnecessário;
- Elementos pequenos demais para toque;
- Interfaces dependentes de hover;
- Modais impossíveis de utilizar no celular.

---

# 50. ACESSIBILIDADE

Implementar:

- Navegação por teclado;
- Labels apropriados;
- Contraste adequado;
- Estados de foco;
- Textos alternativos;
- Semântica HTML;
- Feedback para leitores de tela quando aplicável.

Não depender somente de cores para comunicar estados.

---

# 51. PWA

Preparar a aplicação para PWA.

Implementar:

- Web App Manifest;
- Service Worker;
- Cache;
- Ícones;
- Splash screen;
- Instalação;
- Funcionamento parcial offline.

O PWA deve aproveitar o armazenamento local para permitir acesso a dados e arquivos pessoais quando possível.

---

# 52. OFFLINE

Quando offline:

- Mostrar claramente o estado da conexão;
- Permitir acesso ao conteúdo previamente armazenado quando possível;
- Permitir acesso aos arquivos pessoais locais;
- Evitar perda de dados;
- Sincronizar alterações posteriormente quando tecnicamente seguro.

Operações que necessitam do backend devem informar o usuário quando não puderem ser executadas.

O modo offline não deve depender de um servidor externo.

---

# 53. ARMAZENAMENTO E INFRAESTRUTURA

O sistema deve adotar uma estratégia de armazenamento híbrido.

```text
                 SOS ESTUDANTE
                       │
          ┌────────────┴────────────┐
          │                         │
   DADOS PESSOAIS             DADOS COLABORATIVOS
          │                         │
          ▼                         ▼
      SERVIDOR                SERVIDOR
          │                         │
   Dados leves               Dados leves
   e metadados              + arquivos temporários
```

Arquivos pessoais:

```text
Usuário
   ↓
Dispositivo
   ↓
Armazenamento local
```

Arquivos compartilhados:

```text
Usuário
   ↓
Servidor
   ↓
Grupo
   ↓
Expiração
   ↓
Exclusão
```

O servidor não deve ser utilizado como um grande repositório permanente de arquivos pessoais.

---

# 54. ECONOMIA DE RECURSOS

O projeto deve ser desenvolvido considerando infraestrutura gratuita ou de baixo custo.

Evitar:

- Armazenamento permanente de arquivos pessoais;
- Backups automáticos de arquivos pessoais no servidor;
- Processamento pesado sem necessidade;
- Serviços externos pagos como requisito obrigatório;
- Grandes volumes de dados duplicados;
- Sistemas que exijam infraestrutura dedicada;
- Funcionalidades que dependam de serviços pagos para funcionar.

Priorizar:

- Dados pequenos;
- Armazenamento local;
- Arquivos temporários;
- Paginação;
- Cache;
- Processamento sob demanda;
- Limites configuráveis.

---

# 55. ARQUITETURA MOBILE

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

O armazenamento local deve possuir uma camada de abstração para permitir diferentes implementações em Web, Android e iOS.

---

# 56. BACKEND

Tecnologias principais:

- Node.js;
- Express;
- MongoDB;
- JWT;
- bcrypt;
- Multer;
- Socket.io.

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
├── storage/
└── server.js
```

O backend não deve conter uma pasta de armazenamento permanente de arquivos pessoais.

---

# 57. FRONTEND

Tecnologias:

- React;
- Tailwind CSS;
- Axios;
- React Router.

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
├── storage/
├── assets/
└── App.*
```

A pasta `storage/` deve conter abstrações relacionadas ao armazenamento local.

---

# 58. API REST

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

GET    /api/groups
POST   /api/groups
POST   /api/groups/join

GET    /api/groups/:id/channels
POST   /api/groups/:id/channels

GET    /api/channels/:id/messages
POST   /api/channels/:id/messages

GET    /api/groups/:id/files
POST   /api/groups/:id/files
DELETE /api/groups/:id/files/:fileId

GET    /api/assignments
POST   /api/assignments

GET    /api/events
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

Não criar endpoints de upload para arquivos pessoais locais quando não forem necessários.

Todas as rotas privadas devem exigir autenticação.

---

# 59. BANCO DE DADOS

Utilizar MongoDB.

Modelos principais:

```text
User
Subject
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
UserSettings
```

O modelo `File` deve representar principalmente **arquivos compartilhados temporários**, quando necessário.

Arquivos pessoais armazenados localmente não precisam existir como arquivos físicos no banco.

Criar índices apropriados para consultas frequentes.

---

# 60. RELACIONAMENTOS PRINCIPAIS

Estrutura conceitual:

```text
User
 │
 ├── Subjects
 ├── Tasks
 ├── Events
 ├── StudySessions
 └── Groups
       │
       ├── Members
       ├── Channels
       │     └── Messages
       │
       ├── Temporary Files
       ├── Tasks
       ├── Assignments
       ├── Kanban
       └── Events
```

Os relacionamentos devem respeitar autorização e propriedade.

---

# 61. UPLOAD DE ARQUIVOS COMPARTILHADOS

Uploads devem existir apenas quando houver necessidade de compartilhamento.

Utilizar Multer ou mecanismo equivalente no backend.

Implementar:

- Limite de tamanho;
- Validação MIME;
- Validação de extensão;
- Nomes de armazenamento seguros;
- Controle de acesso;
- Prazo de retenção;
- Tratamento de erro.

Não confiar apenas na extensão enviada pelo cliente.

---

# 62. STORAGE ABSTRACTION

Criar uma camada de abstração para armazenamento.

Exemplo:

```text
StorageProvider
│
├── LocalFileStorage
│
└── TemporaryGroupFileStorage
```

A aplicação não deve depender diretamente de caminhos físicos ou de um fornecedor específico.

Isso permite alterar a infraestrutura futuramente sem modificar as regras de negócio.

---

# 63. SEGURANÇA

Implementar:

- bcrypt;
- JWT;
- Validação;
- Sanitização;
- Proteção contra XSS;
- Controle de permissões;
- Proteção de rotas;
- Limite de upload;
- Validação MIME;
- Rate limiting básico;
- Tratamento centralizado de erros;
- Variáveis de ambiente.

Nunca armazenar senhas em texto puro.

Nunca confiar apenas na autorização implementada no frontend.

---

# 64. AUTORIZAÇÃO

Toda operação sensível deve verificar:

1. Usuário autenticado;
2. Propriedade do recurso;
3. Associação ao grupo;
4. Permissão do usuário;
5. Estado do recurso.

Exemplo:

Um usuário não deve conseguir acessar um arquivo privado apenas alterando o ID na URL.

Arquivos de grupo devem ser acessíveis somente por membros autorizados.

---

# 65. TRATAMENTO DE ERROS

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

# 66. VARIÁVEIS DE AMBIENTE

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
STORAGE_PROVIDER=
GROUP_FILE_MAX_SIZE=
GROUP_FILE_RETENTION_DAYS=
```

Não adicionar variáveis relacionadas a serviços de armazenamento pessoal em nuvem se não forem utilizadas.

Credenciais reais nunca devem ser commitadas.

---

# 67. TESTES

Criar testes para funcionalidades críticas.

Prioridade:

1. Autenticação;
2. Autorização;
3. CRUD;
4. Armazenamento local;
5. Upload de arquivos de grupo;
6. Expiração de arquivos;
7. Grupos;
8. Permissões;
9. Tarefas;
10. Priorização;
11. Entregas;
12. APIs.

Testar principalmente regras de negócio.

---

# 68. ESTADOS DE INTERFACE

Todas as páginas importantes devem possuir estados:

- Loading;
- Empty;
- Error;
- Success;
- Offline.

Exemplo:

```text
Você ainda não possui tarefas.

[ Criar primeira tarefa ]
```

Evitar telas vazias sem explicação.

---

# 69. FEEDBACK AO USUÁRIO

Após ações importantes apresentar feedback:

- Arquivo salvo localmente;
- Arquivo compartilhado;
- Arquivo excluído;
- Arquivo expirado;
- Tarefa criada;
- Tarefa atualizada;
- Grupo criado;
- Mensagem enviada;
- Atividade entregue.

Utilizar Toasts, banners ou feedback contextual.

Não utilizar notificações push como mecanismo necessário de feedback.

---

# 70. PESQUISA E PERFORMANCE

Evitar carregar grandes quantidades de dados desnecessariamente.

Implementar:

- Paginação;
- Lazy loading;
- Debounce em pesquisa;
- Cache quando apropriado;
- Consultas indexadas;
- Processamento local quando possível.

A pesquisa de arquivos pessoais deve evitar envio desnecessário de dados ao servidor.

---

# 71. ESCALABILIDADE

O código deve evitar:

- Código duplicado;
- Componentes gigantes;
- Controllers contendo regras excessivas;
- Regras de negócio espalhadas;
- Dependências desnecessárias.

Preferir:

- Services;
- Hooks;
- Contexts;
- Components reutilizáveis;
- Validators;
- Middleware;
- Repository/data-access layer quando necessário;
- Abstrações de armazenamento.

---

# 72. DOCUMENTAÇÃO

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

A documentação de `STORAGE.md` deve explicar claramente:

- Armazenamento local;
- Arquivos pessoais;
- Arquivos temporários de grupo;
- Retenção;
- Limitações;
- Comportamento offline;
- Limitações da infraestrutura utilizada.

---

# 73. COMPATIBILIDADE ENTRE AGENTES

O projeto será desenvolvido utilizando múltiplas ferramentas de programação assistida por IA.

Ferramentas previstas:

- OpenAI Codex;
- Mimo Code;
- Google Antigravity.

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

# 74. REGRA DE NÃO QUEBRA

Nenhum agente deve remover ou quebrar funcionalidades existentes apenas para implementar uma nova funcionalidade.

Antes de alterações estruturais:

- Identificar dependências;
- Avaliar impacto;
- Atualizar documentação;
- Atualizar testes;
- Implementar;
- Testar.

---

# 75. CONTRATOS DE API

Alterações em APIs devem ser tratadas como mudanças de contrato.

Se uma API existente precisar ser alterada:

1. Atualizar `API.md`;
2. Atualizar backend;
3. Atualizar frontend;
4. Atualizar testes;
5. Verificar compatibilidade.

Não alterar silenciosamente nomes de campos, endpoints ou formatos de resposta.

---

# 76. DADOS FICTÍCIOS

Dados mockados podem ser utilizados apenas durante desenvolvimento/testes.

Não utilizar dados fictícios para fingir que uma funcionalidade real está funcionando.

---

# 77. LOGGING

Implementar logging adequado no backend.

Registrar eventos importantes, como:

- Erros;
- Falhas de autenticação;
- Uploads de arquivos compartilhados;
- Expiração de arquivos;
- Operações administrativas.

Não registrar:

- Senhas;
- Tokens;
- Informações sensíveis desnecessárias;
- Conteúdo completo de arquivos pessoais.

---

# 78. PREPARAÇÃO PARA PRODUÇÃO

O sistema deverá poder evoluir para:

- Backend hospedado;
- Frontend hospedado;
- MongoDB Atlas ou alternativa compatível;
- Storage temporário externo quando necessário;
- HTTPS;
- Domínio próprio;
- Android;
- iOS.

A adoção de serviços pagos não deve ser obrigatória para o funcionamento básico do sistema.

---

# 79. EXECUÇÃO LOCAL

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
10. Instalar como PWA;
11. Testar armazenamento local;
12. Testar compartilhamento temporário de arquivos.

---

# 80. SCRIPTS

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

# 81. ROADMAP CONCEITUAL

## Fase 1 — Fundação

- Projeto;
- Frontend;
- Backend;
- MongoDB;
- Configuração;
- Autenticação.

## Fase 2 — Organização pessoal

- Matérias;
- Tarefas;
- Trabalhos;
- Arquivos locais;
- Calendário;
- Agenda;
- Provas.

## Fase 3 — Inteligência e estudos

- Sistema de prioridade;
- Estatísticas;
- Pomodoro;
- Histórico de estudos.

## Fase 4 — Colaboração

- Grupos;
- Membros;
- Canais;
- Chat;
- Arquivos temporários compartilhados.

## Fase 5 — Trabalho colaborativo

- Kanban;
- Trabalhos;
- Divisão de responsabilidades;
- Atividades.

## Fase 6 — Ambiente escolar

- Salas;
- Professores;
- Atividades;
- Entregas;
- Avisos.

## Fase 7 — Mobile e experiência offline

- PWA;
- Offline;
- Armazenamento local;
- Android;
- iOS.

---

# 82. REQUISITOS FUNCIONAIS ESSENCIAIS

O sistema final deve possuir funcionalmente:

- [ ] Cadastro;
- [ ] Login;
- [ ] Autenticação;
- [ ] Perfil;
- [ ] Matérias;
- [ ] Tarefas;
- [ ] Trabalhos;
- [ ] Provas;
- [ ] Calendário;
- [ ] Agenda;
- [ ] Arquivos pessoais locais;
- [ ] Organização local de arquivos;
- [ ] Arquivos temporários de grupos;
- [ ] Compartilhamento de documentos;
- [ ] Grupos;
- [ ] Convites;
- [ ] Canais;
- [ ] Chat;
- [ ] Mensagens em tempo real;
- [ ] Kanban;
- [ ] Trabalhos colaborativos;
- [ ] Salas de aula;
- [ ] Atividades;
- [ ] Entrega de atividades;
- [ ] Sistema de prioridade;
- [ ] Pomodoro;
- [ ] Estatísticas;
- [ ] Pesquisa global;
- [ ] PWA;
- [ ] Responsividade mobile;
- [ ] Funcionamento parcial offline.

---

# 83. FUNCIONALIDADES FORA DO ESCOPO ATUAL

Para manter o projeto adequado à infraestrutura gratuita ou de baixo custo, as seguintes funcionalidades não fazem parte do escopo inicial:

- [ ] Armazenamento permanente de arquivos pessoais no servidor;
- [ ] Backup automático dos arquivos pessoais;
- [ ] Sincronização automática de arquivos pessoais entre dispositivos;
- [ ] Sistema de armazenamento em nuvem pessoal semelhante a Google Drive;
- [ ] Armazenamento indefinido de arquivos de grupos;
- [ ] Sistema de notificações push;
- [ ] Central de notificações permanente;
- [ ] Dependência obrigatória de serviços pagos de armazenamento;
- [ ] Processamento pesado de arquivos;
- [ ] Sistemas de mídia ou vídeo hospedados permanentemente.

Essas funcionalidades podem ser reconsideradas futuramente caso a infraestrutura e os objetivos do produto mudem.

---

# 84. RESTRIÇÕES

O sistema NÃO deve:

- Implementar comentários dentro de PDFs;
- Confiar apenas no frontend para segurança;
- Armazenar senhas em texto puro;
- Expor credenciais;
- Remover funcionalidades existentes sem justificativa;
- Copiar interfaces proprietárias;
- Criar funcionalidades falsas apresentadas como reais;
- Utilizar o servidor como armazenamento pessoal permanente sem decisão explícita;
- Manter arquivos de grupo indefinidamente;
- Criar dependência obrigatória de serviços pagos;
- Implementar notificações push sem necessidade definida no produto;
- Enviar arquivos pessoais ao servidor sem necessidade e consentimento correspondente.

---

# 85. CRITÉRIOS DE ACEITAÇÃO

Uma funcionalidade será considerada concluída somente quando:

1. Interface estiver implementada;
2. Backend estiver implementado quando necessário;
3. Banco estiver integrado quando necessário;
4. Armazenamento local estiver implementado quando necessário;
5. Autorização estiver funcionando;
6. Estados de erro estiverem tratados;
7. Estados de carregamento estiverem tratados;
8. Responsividade estiver adequada;
9. Testes relevantes existirem;
10. Documentação estiver atualizada;
11. Não quebrar funcionalidades existentes;
12. A funcionalidade não exigir infraestrutura incompatível com o escopo atual.

---

# 86. DEFINIÇÃO DO PRODUTO FINAL

O SOS Estudante deve resultar em uma plataforma acadêmica na qual o estudante consiga:

```text
ENTRAR
  ↓
CONFIGURAR MATÉRIAS
  ↓
ORGANIZAR TAREFAS
  ↓
ORGANIZAR SEUS ARQUIVOS NO DISPOSITIVO
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
COMPARTILHAR DOCUMENTOS TEMPORARIAMENTE
  ↓
TRABALHAR EM EQUIPE
  ↓
ENTREGAR ATIVIDADES
  ↓
ACOMPANHAR SEU PROGRESSO
```

O servidor deve ser utilizado principalmente para:

```text
CONTAS
DADOS ACADÊMICOS
GRUPOS
MENSAGENS
TAREFAS
EVENTOS
COLABORAÇÃO
ARQUIVOS TEMPORÁRIOS
```

Enquanto o dispositivo do usuário deve ser priorizado para:

```text
ARQUIVOS PESSOAIS
MATERIAIS PESSOAIS
DADOS LOCAIS
CACHE
CONTEÚDO OFFLINE
```

---

# 87. IDENTIDADE

**Nome:** SOS Estudante

**Slogan:**

> Organize. Estude. Conquiste.

O nome SOS Estudante não deve limitar tecnicamente o sistema à área de Química.

Química é apenas uma das matérias suportadas.

O produto deve ser capaz de atender estudantes de diferentes áreas e disciplinas.

---

# 88. REGRA FINAL PARA DESENVOLVIMENTO

O objetivo não é produzir um protótipo visual.

O objetivo é construir um **sistema real, funcional, seguro, modular, econômico e evolutivo**.

Qualquer agente que trabalhar neste projeto deve:

> **Ler a especificação → analisar o código existente → planejar a alteração → implementar → testar → documentar.**

Não implementar funcionalidades de maneira superficial apenas para marcar uma tarefa como concluída.

Quando uma funcionalidade não puder ser implementada completamente, deixar explicitamente documentado:

- O que foi implementado;
- O que falta;
- Qual dependência está faltando;
- Qual limitação de infraestrutura existe;
- Qual decisão precisa ser tomada.

O SOS Estudante deve permanecer consistente independentemente de qual ferramenta ou agente de programação esteja realizando a implementação.

A arquitetura deve sempre priorizar:

**Simplicidade → Baixo custo → Segurança → Funcionalidade real → Escalabilidade.**