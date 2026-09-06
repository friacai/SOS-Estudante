# SOS ESTUDANTE — AUTHENTICATION & AUTHORIZATION

**Projeto:** SOS Estudante
**Versão:** 1.0
**Status:** Especificação inicial
**Documento:** Autenticação e Autorização

---

# 1. Objetivo

Este documento define como o SOS Estudante deverá lidar com:

* cadastro;
* login;
* logout;
* autenticação;
* sessões;
* JWT;
* senhas;
* recuperação de senha;
* autorização;
* papéis de usuário;
* permissões;
* proteção de rotas;
* segurança da conta.

A implementação deve seguir este documento em conjunto com:

```text
PROJECT_SPEC.md
ARCHITECTURE.md
DATABASE.MD
```

---

# 2. Princípios

O sistema de autenticação deve ser:

* seguro;
* simples;
* previsível;
* modular;
* testável;
* compatível com Web, PWA, Android e iOS;
* preparado para expansão futura.

Nunca confiar no frontend para garantir segurança.

Toda autorização importante deve ser verificada no backend.

---

# 3. Tecnologias

A primeira implementação utilizará:

```text
Node.js
Express
TypeScript
MongoDB
Mongoose
JWT
bcrypt
```

---

# 4. Conceito de Autenticação

Autenticação responde:

> Quem é o usuário?

Autorização responde:

> O que esse usuário pode fazer?

Fluxo:

```text
Usuário
   ↓
Credenciais
   ↓
Backend
   ↓
Validação
   ↓
JWT
   ↓
Sessão autenticada
```

---

# 5. Cadastro

Endpoint previsto:

```text
POST /api/v1/auth/register
```

Dados mínimos:

```json
{
  "name": "Nome do usuário",
  "email": "usuario@email.com",
  "password": "senha"
}
```

---

# 6. Regras de Cadastro

O backend deve:

1. validar nome;
2. validar email;
3. normalizar email;
4. validar senha;
5. verificar se email já existe;
6. gerar hash da senha;
7. criar usuário;
8. não retornar o hash;
9. iniciar a sessão conforme estratégia definida;
10. retornar dados seguros do usuário.

---

# 7. Email

O email deve:

* ser obrigatório;
* possuir formato válido;
* ser normalizado;
* ser armazenado de maneira consistente;
* possuir índice único.

Exemplo:

```text
Usuario@Email.com
```

deve ser tratado de forma consistente com:

```text
usuario@email.com
```

---

# 8. Senha

A senha nunca deve ser armazenada diretamente.

Fluxo:

```text
Senha original
      ↓
bcrypt
      ↓
passwordHash
      ↓
MongoDB
```

O campo armazenado será:

```text
passwordHash
```

---

# 9. Regras de Senha

A senha deve possuir requisitos mínimos de segurança.

Recomendação inicial:

```text
mínimo de 8 caracteres
```

O sistema pode exigir requisitos adicionais, desde que documentados.

Evitar regras excessivamente complexas que incentivem usuários a utilizar senhas previsíveis.

---

# 10. Login

Endpoint:

```text
POST /api/v1/auth/login
```

Entrada:

```json
{
  "email": "usuario@email.com",
  "password": "senha"
}
```

Fluxo:

```text
Email + senha
      ↓
Encontrar usuário
      ↓
Comparar senha com bcrypt
      ↓
Credenciais válidas?
      ↓
Gerar sessão/token
      ↓
Retornar dados seguros
```

---

# 11. Falha no Login

Quando as credenciais forem inválidas, o sistema deve retornar uma resposta genérica.

Não revelar:

```text
"Email não existe"
```

ou:

```text
"A senha está errada"
```

Preferir mensagem equivalente a:

```text
"Email ou senha inválidos."
```

Isso reduz a possibilidade de descoberta de contas existentes.

---

# 12. JWT

O sistema utilizará JWT para autenticação.

O token deverá identificar a sessão autenticada.

Payload mínimo recomendado:

```json
{
  "sub": "USER_ID"
}
```

Informações desnecessárias não devem ser colocadas no JWT.

Não colocar:

* senha;
* passwordHash;
* dados privados;
* grandes objetos;
* informações que mudam frequentemente.

---

# 13. Expiração

Tokens devem possuir expiração.

Exemplo conceitual:

```text
JWT
 ├── issuedAt
 └── expiresAt
```

O tempo exato deve ser definido através de variável de ambiente.

Exemplo:

```text
JWT_EXPIRES_IN
```

---

# 14. Secret do JWT

O segredo utilizado para assinar JWT deve ser armazenado em variável de ambiente.

Exemplo:

```text
JWT_SECRET
```

Nunca:

* colocar o secret no código;
* colocar no Git;
* colocar no frontend;
* compartilhar em documentação pública.

---

# 15. Armazenamento do Token

A estratégia de armazenamento deve considerar segurança e compatibilidade com Web/PWA/Mobile.

Para aplicações Web, a preferência é utilizar mecanismos seguros de sessão, como cookies `HttpOnly`, `Secure` em produção e política `SameSite` apropriada.

Não expor tokens de autenticação ao JavaScript quando uma arquitetura baseada em cookie seguro puder ser utilizada.

Para clientes mobile nativos, utilizar armazenamento seguro fornecido pelo sistema operacional.

A implementação definitiva deve manter o mesmo modelo de autenticação da API independentemente do cliente.

---

# 16. Cookies

Caso cookies sejam utilizados, devem considerar:

```text
HttpOnly
Secure
SameSite
```

Em produção:

```text
Secure = true
```

O backend deve configurar corretamente CORS e credenciais.

---

# 17. Middleware de Autenticação

Todas as rotas protegidas devem utilizar middleware equivalente a:

```text
authenticate
```

Fluxo:

```text
Request
   ↓
Authentication Middleware
   ↓
Token válido?
   ↓
Identificar usuário
   ↓
req.user
   ↓
Controller
```

---

# 18. Usuário Autenticado

Após autenticação, o backend pode disponibilizar informações mínimas do usuário na requisição.

Conceito:

```text
req.user = {
    id: "...",
    role: "student"
}
```

Não inserir informações desnecessárias.

---

# 19. Endpoint de Sessão

Endpoint:

```text
GET /api/v1/auth/me
```

ou:

```text
GET /api/v1/users/me
```

O projeto deve escolher uma única abordagem e mantê-la consistente.

Resposta deve conter somente informações públicas/permitidas do usuário autenticado.

Nunca retornar:

```text
passwordHash
```

---

# 20. Logout

Endpoint:

```text
POST /api/v1/auth/logout
```

O logout deve invalidar a sessão conforme a estratégia utilizada.

Se a arquitetura utilizar cookies/sessões complementares, o cookie deverá ser removido ou invalidado.

Se houver refresh tokens, eles deverão ser revogados.

---

# 21. Refresh Token

A primeira versão pode utilizar somente access token com duração controlada.

Caso seja necessário manter sessões longas, implementar posteriormente:

```text
Access Token
+
Refresh Token
```

O refresh token deve possuir armazenamento e revogação seguros.

Não adicionar refresh tokens apenas por complexidade antecipada.

---

# 22. Recuperação de Senha

Fluxo previsto:

```text
Usuário
   ↓
"Esqueci minha senha"
   ↓
Email
   ↓
Token temporário
   ↓
Nova senha
   ↓
Senha atualizada
```

Endpoints previstos:

```text
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
```

---

# 23. Token de Recuperação

O token de recuperação deve:

* possuir validade limitada;
* ser de uso único;
* não ser armazenado em texto puro quando armazenado no banco;
* ser invalidado após utilização;
* não aparecer em logs.

---

# 24. Resposta de Recuperação

O endpoint de solicitação de recuperação deve evitar revelar se determinado email está cadastrado.

Exemplo de comportamento:

```text
"Se existir uma conta associada a este email, enviaremos instruções."
```

Isso reduz enumeração de contas.

---

# 25. Alteração de Senha

Usuário autenticado poderá alterar a própria senha.

Endpoint previsto:

```text
POST /api/v1/auth/change-password
```

Deve exigir:

```text
senha atual
nova senha
```

O backend deve validar a senha atual antes da alteração.

---

# 26. Sessões

O sistema poderá futuramente possuir gerenciamento de sessões.

Exemplo:

```text
Conta
├── Computador
├── Celular
└── Tablet
```

Funcionalidades futuras:

* visualizar sessões;
* encerrar sessão específica;
* encerrar todas as sessões;
* visualizar dispositivo;
* visualizar último acesso.

Não é obrigatório implementar isso na primeira versão.

---

# 27. Roles Globais

Os papéis globais definidos pelo banco são:

```text
student
teacher
responsible
```

Esses papéis representam o perfil geral da conta.

Eles não substituem as permissões específicas dentro de grupos.

---

# 28. Roles de Grupo

Dentro de um grupo podem existir:

```text
owner
admin
teacher
member
guest
```

A relação fica:

```text
User
   ↓
GroupMember
   ↓
Group
```

O papel dentro do grupo não altera necessariamente o papel global da conta.

---

# 29. Autorização

A autorização deve verificar:

1. usuário autenticado;
2. recurso solicitado;
3. proprietário do recurso;
4. associação com grupo;
5. papel do usuário;
6. permissão necessária.

Exemplo:

```text
Usuário
   ↓
É membro do grupo?
   ↓
Qual role?
   ↓
Pode executar ação?
   ↓
Permitir / Negar
```

---

# 30. Recursos Pessoais

Recursos pessoais devem ser acessíveis somente ao proprietário, salvo regras explícitas de compartilhamento.

Exemplos:

* tarefas;
* arquivos pessoais;
* agenda;
* estatísticas;
* sessões de estudo.

---

# 31. Recursos de Grupo

Recursos de grupo devem verificar associação.

Exemplo:

```text
GET /groups/:groupId/files
```

O backend deve confirmar:

```text
Usuário autenticado
       ↓
Grupo existe
       ↓
Usuário pertence ao grupo
       ↓
Permissão adequada
       ↓
Retornar dados
```

---

# 32. Owner

O proprietário do grupo possui controle administrativo máximo dentro daquele grupo.

Pode possuir permissões como:

* editar grupo;
* gerenciar membros;
* alterar permissões;
* criar/remover canais;
* gerenciar arquivos;
* gerenciar atividades;
* transferir propriedade;
* excluir grupo.

A implementação deve impedir que um usuário comum execute essas ações apenas manipulando requisições.

---

# 33. Admin

Administradores podem executar ações administrativas definidas pelo proprietário.

Exemplos:

* gerenciar membros;
* moderar canais;
* gerenciar conteúdos;
* auxiliar na administração do grupo.

As permissões exatas devem ser documentadas em `GROUPS.MD`.

---

# 34. Teacher

Professores podem possuir permissões adicionais em contextos educacionais.

Exemplos:

* criar atividades;
* criar avisos;
* revisar entregas;
* publicar materiais;
* gerenciar sala de aula.

As permissões devem depender também do contexto do grupo/sala.

---

# 35. Member

Membros comuns podem:

* visualizar conteúdo permitido;
* enviar mensagens;
* enviar arquivos quando permitido;
* participar de trabalhos;
* criar tarefas quando permitido;
* entregar atividades.

---

# 36. Guest

Convidados possuem acesso limitado.

Devem receber somente as permissões explicitamente concedidas.

Por padrão:

```text
guest
```

deve possuir menos privilégios que:

```text
member
```

---

# 37. Princípio do Menor Privilégio

Cada usuário deve possuir somente as permissões necessárias.

Nunca assumir:

```text
autenticado = administrador
```

ou:

```text
membro = acesso total
```

---

# 38. Proteção contra IDOR

O backend deve evitar acesso indevido através da alteração de IDs.

Exemplo perigoso:

```text
GET /api/v1/files/123
```

Um usuário não deve conseguir acessar um arquivo privado simplesmente trocando:

```text
123
```

por outro ID.

Sempre verificar propriedade e autorização.

---

# 39. Rate Limiting

Rotas sensíveis devem possuir proteção contra excesso de requisições.

Principalmente:

```text
login
register
forgot-password
reset-password
```

O limite exato deve ser configurável.

---

# 40. Brute Force

Tentativas repetidas de login devem ser limitadas.

Estratégias possíveis:

* rate limiting;
* atraso progressivo;
* bloqueio temporário;
* monitoramento.

Evitar bloqueios permanentes que possam ser utilizados para negar serviço a outras pessoas.

---

# 41. Validação de Entrada

Todas as entradas relacionadas à autenticação devem ser validadas.

Exemplos:

```text
name
email
password
resetToken
```

A validação deve ocorrer no backend.

---

# 42. Mensagens de Erro

Mensagens devem ser úteis, mas não revelar informações sensíveis.

Evitar:

```text
Usuário encontrado no banco com ID X
```

ou:

```text
bcrypt comparison failed
```

Preferir mensagens simples para o usuário e logs técnicos internos para desenvolvedores.

---

# 43. CORS

O backend deve possuir CORS configurado explicitamente.

Em produção, não utilizar:

```text
Access-Control-Allow-Origin: *
```

quando houver autenticação baseada em credenciais.

Permitir somente origens confiáveis.

---

# 44. CSRF

Se autenticação baseada em cookies for utilizada, considerar proteção contra CSRF.

A estratégia definitiva deverá ser compatível com:

* SameSite;
* tokens CSRF quando necessários;
* CORS;
* origem da aplicação.

---

# 45. XSS

Dados fornecidos por usuários devem ser tratados como não confiáveis.

O frontend deve evitar inserir HTML arbitrário.

O backend deve validar e sanitizar dados quando necessário.

---

# 46. NoSQL Injection

Consultas MongoDB nunca devem incorporar diretamente objetos não validados fornecidos pelo usuário.

Exemplo conceitualmente inseguro:

```text
query = req.body
```

Utilizar schemas e validação.

---

# 47. Logs de Autenticação

Registrar eventos úteis:

```text
login_success
login_failed
logout
password_changed
password_reset_requested
password_reset_completed
```

Nunca registrar:

* senha;
* passwordHash;
* JWT completo;
* refresh token;
* token de recuperação.

---

# 48. Conta Desativada

O usuário poderá possuir:

```text
isActive
```

Se:

```text
isActive = false
```

o backend deve impedir autenticação normal.

O comportamento de sessões existentes deve ser definido conforme a implementação.

---

# 49. Exclusão de Conta

A exclusão de conta deverá ser tratada com cuidado.

O processo deve considerar:

* dados pessoais;
* arquivos;
* grupos;
* mensagens;
* trabalhos;
* atividades;
* estatísticas;
* relacionamentos.

Não implementar exclusão definitiva sem definir previamente as regras de retenção.

---

# 50. Privacidade

A autenticação deve proteger informações pessoais.

O backend deve aplicar o princípio:

> negar por padrão e permitir explicitamente.

---

# 51. Segurança no Frontend

O frontend deve:

* proteger páginas privadas;
* detectar sessão expirada;
* redirecionar para login;
* evitar exibir dados protegidos sem autenticação;
* tratar erros de autorização.

Porém:

> proteção no frontend não substitui autorização no backend.

---

# 52. Sessão Expirada

Quando a API retornar:

```text
401 Unauthorized
```

o frontend deverá:

1. limpar o estado de autenticação quando apropriado;
2. atualizar a sessão;
3. redirecionar para login se necessário;
4. informar o usuário de maneira clara.

Não entrar em loop infinito de requisições.

---

# 53. Erro de Permissão

Quando o usuário estiver autenticado, mas não possuir permissão:

```text
403 Forbidden
```

O frontend deve apresentar uma mensagem adequada.

Não confundir:

```text
401 = não autenticado
403 = autenticado, mas sem permissão
```

---

# 54. Testes de Autenticação

Devem existir testes para:

### Cadastro

* cadastro válido;
* email inválido;
* email duplicado;
* senha inválida;
* dados ausentes.

### Login

* login válido;
* senha incorreta;
* email inexistente;
* conta desativada.

### JWT

* token válido;
* token expirado;
* token inválido;
* token ausente.

### Autorização

* usuário permitido;
* usuário sem permissão;
* acesso a recurso de outro usuário;
* acesso a grupo sem associação.

---

# 55. Testes de Segurança

Devem ser considerados testes contra:

* brute force;
* IDOR;
* NoSQL injection;
* XSS;
* CSRF quando aplicável;
* acesso sem autenticação;
* escalada de privilégio;
* manipulação de IDs;
* uploads não autorizados.

---

# 56. Variáveis de Ambiente

Variáveis previstas:

```text
JWT_SECRET
JWT_EXPIRES_IN
FRONTEND_URL
COOKIE_DOMAIN
NODE_ENV
```

Os nomes definitivos devem permanecer consistentes com o restante da aplicação.

---

# 57. Desenvolvimento vs Produção

### Desenvolvimento

Pode possuir:

* logs mais detalhados;
* configuração local;
* ferramentas de debug.

### Produção

Deve utilizar:

* HTTPS;
* secrets seguros;
* logs sem informações sensíveis;
* CORS restritivo;
* cookies seguros;
* rate limiting;
* configurações apropriadas.

---

# 58. Estrutura de Código

Backend:

```text
backend/src/
├── controllers/
│   └── auth.controller.ts
│
├── services/
│   └── auth.service.ts
│
├── middlewares/
│   ├── authenticate.ts
│   └── authorize.ts
│
├── validators/
│   └── auth.validator.ts
│
├── routes/
│   └── auth.routes.ts
│
├── models/
│   └── User.ts
│
└── utils/
```

A estrutura pode evoluir conforme o projeto crescer.

---

# 59. Fluxo de Cadastro

```text
POST /auth/register
        ↓
Validate Input
        ↓
Normalize Email
        ↓
Check Existing User
        ↓
Hash Password
        ↓
Create User
        ↓
Create Session / Token
        ↓
Return Safe User Data
```

---

# 60. Fluxo de Login

```text
POST /auth/login
        ↓
Validate Input
        ↓
Find User
        ↓
Check Account Status
        ↓
Compare Password
        ↓
Generate Authentication Token
        ↓
Create Authenticated Session
        ↓
Return Safe User Data
```

---

# 61. Fluxo de Requisição Protegida

```text
Client
   ↓
Request
   ↓
Authentication Middleware
   ↓
Validate Token
   ↓
Identify User
   ↓
Authorization
   ↓
Controller
   ↓
Service
   ↓
Response
```

---

# 62. Fluxo de Recuperação

```text
Forgot Password
       ↓
Request Reset
       ↓
Generate Temporary Token
       ↓
Send Recovery Instructions
       ↓
User Opens Recovery Flow
       ↓
Validate Token
       ↓
Set New Password
       ↓
Invalidate Token
```

---

# 63. Princípio de Não Confiança

Toda informação recebida do cliente deve ser considerada não confiável.

Isso inclui:

* IDs;
* roles;
* permissões;
* nomes;
* emails;
* arquivos;
* parâmetros;
* headers;
* dados enviados pelo frontend.

Nunca aceitar:

```json
{
  "role": "admin"
}
```

como prova de que o usuário é administrador.

---

# 64. Alterações Futuras

A arquitetura poderá futuramente adicionar:

* autenticação por Google;
* autenticação por Microsoft;
* passkeys;
* autenticação em dois fatores;
* gerenciamento avançado de sessões;
* dispositivos confiáveis.

Esses recursos não fazem parte da primeira implementação obrigatória.

---

# 65. Regra para Agentes de IA

Qualquer agente que alterar autenticação deve:

1. ler `PROJECT_SPEC.md`;
2. ler `ARCHITECTURE.md`;
3. ler `DATABASE.MD`;
4. ler este `AUTH.MD`;
5. verificar código existente;
6. não alterar contratos sem atualizar documentação;
7. executar testes;
8. verificar segurança;
9. verificar regressões;
10. documentar alterações importantes.

---

# 66. Critérios de Aceitação

A autenticação será considerada implementada quando:

* cadastro funcionar;
* login funcionar;
* senha for armazenada como hash;
* autenticação protegida funcionar;
* JWT/sessão funcionar;
* logout funcionar;
* `/me` funcionar;
* autorização funcionar;
* usuários não acessarem dados de terceiros;
* permissões de grupo forem verificadas;
* erros forem tratados;
* rate limiting existir nas rotas sensíveis;
* secrets estiverem fora do código;
* testes críticos passarem.

---

# 67. Regra Final

A autenticação do SOS Estudante deve seguir:

```text
Segurança
   ↓
Simplicidade
   ↓
Clareza
   ↓
Testabilidade
   ↓
Escalabilidade
```

Não implementar mecanismos de segurança apenas no frontend.

Não armazenar senhas em texto puro.

Não confiar em roles enviados pelo cliente.

Não permitir acesso a recursos apenas porque o usuário conhece o ID.

Toda operação protegida deve ser validada no backend.

---

## Fim do documento

**Documento:** `AUTH.MD`
**Projeto:** SOS Estudante
**Autenticação:** JWT + bcrypt
**Banco:** MongoDB
**Slogan:** Organize. Estude. Conquiste.
