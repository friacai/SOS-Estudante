# SOS ESTUDANTE — STORAGE SPECIFICATION

**Projeto:** SOS Estudante
**Versão:** 1.0
**Status:** Especificação inicial
**Documento:** Armazenamento e gerenciamento de arquivos

---

# 1. Objetivo

Este documento define como o SOS Estudante deverá:

* receber arquivos;
* validar uploads;
* armazenar arquivos;
* organizar arquivos;
* disponibilizar downloads;
* controlar acesso;
* excluir arquivos;
* associar arquivos a tarefas e trabalhos;
* compartilhar arquivos em grupos;
* preparar uma futura migração para armazenamento em nuvem.

---

# 2. Princípios

O sistema de arquivos deve ser:

* seguro;
* modular;
* escalável;
* independente do provedor de armazenamento;
* protegido contra acesso não autorizado;
* compatível com Web, PWA, Android e iOS.

O restante da aplicação não deve depender diretamente do sistema de arquivos local.

---

# 3. Arquitetura

A aplicação deve utilizar uma camada de abstração:

```text id="6jz9pc"
Frontend
   ↓
API
   ↓
FileService
   ↓
StorageService
   ↓
Storage Provider
```

O `StorageService` será responsável por esconder os detalhes do armazenamento.

---

# 4. Storage Provider

A primeira implementação utilizará armazenamento local.

Exemplo:

```text id="5e9yap"
LocalStorageProvider
```

No futuro poderão existir:

```text id="f6yywy"
S3StorageProvider
CloudflareR2StorageProvider
AzureBlobStorageProvider
GoogleCloudStorageProvider
```

A troca do provedor não deve exigir alterações significativas no restante da aplicação.

---

# 5. Armazenamento Local

Durante desenvolvimento, os arquivos poderão ser armazenados em:

```text id="0edz5h"
backend/uploads/
```

Essa pasta não deve ser utilizada para armazenar arquivos críticos fora do ambiente de desenvolvimento sem uma estratégia adequada de backup.

---

# 6. Git

A pasta de uploads não deve ser versionada.

Adicionar ao `.gitignore`:

```text id="pg3k9h"
backend/uploads/
```

Arquivos enviados por usuários nunca devem entrar no Git.

---

# 7. Estrutura Física

A estrutura física pode ser organizada por categoria:

```text id="p2wqv0"
uploads/
├── users/
├── groups/
├── assignments/
├── activities/
└── temporary/
```

A estrutura interna exata pode mudar conforme a implementação.

O banco de dados deve armazenar a referência lógica do arquivo, não depender do caminho físico.

---

# 8. Storage Key

Cada arquivo deverá possuir uma chave interna:

```text id="t1v5k4"
storageKey
```

Exemplo:

```text id="8m1m43"
users/USER_ID/FILE_ID.bin
```

A aplicação não deve utilizar diretamente o nome original do arquivo como identificador físico.

---

# 9. Nome Original

O sistema deve preservar o nome original para exibição.

Exemplo:

```text id="8t7b0x"
nome original:
"Trabalho de Química.docx"
```

Mas o armazenamento físico pode utilizar:

```text id="l19l1h"
FILE_ID.bin
```

Isso evita conflitos e reduz problemas com caracteres especiais.

---

# 10. File ID

Todo arquivo deve possuir:

```text id="t6l5of"
fileId
```

O ID será utilizado pela API.

Exemplo:

```text id="q9eqg6"
GET /api/v1/files/:fileId
```

---

# 11. Metadados

O documento `File` deve armazenar informações como:

```text id="vcm4f0"
_id
ownerId
groupId
folderId
originalName
storageKey
mimeType
extension
size
visibility
uploadedBy
createdAt
updatedAt
```

---

# 12. MIME Type

O servidor deve identificar o tipo MIME do arquivo.

Exemplos:

```text id="5fbbzl"
application/pdf
image/jpeg
image/png
text/plain
application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

Nunca confiar exclusivamente no MIME enviado pelo cliente.

---

# 13. Extensão

A extensão deve ser validada.

Exemplos permitidos inicialmente:

```text id="dx7ap1"
.pdf
.doc
.docx
.ppt
.pptx
.xls
.xlsx
.txt
.csv
.jpg
.jpeg
.png
.webp
```

A lista deve ser configurável.

---

# 14. Tipos de Arquivo

O sistema pode classificar arquivos em:

```text id="mbqvyr"
study
work
assignment
material
image
other
```

A classificação lógica não substitui a validação real do tipo de arquivo.

---

# 15. Arquivos de Estudo

Exemplos:

```text id="s1t1s8"
apostilas
PDFs
listas de exercícios
resumos
anotações
apresentações
```

---

# 16. Arquivos de Trabalho

Exemplos:

```text id="j8b21w"
documentos
apresentações
planilhas
imagens
materiais de pesquisa
```

---

# 17. Limite de Tamanho

O servidor deve possuir limite de upload.

O limite deve ser configurável por variável de ambiente.

Exemplo:

```text id="5m9f82"
MAX_FILE_SIZE_MB
```

A primeira implementação deve escolher um limite razoável e documentá-lo no `.env.example`.

---

# 18. Limites por Tipo

O sistema poderá futuramente utilizar limites diferentes:

```text id="d4j9x5"
imagem → limite A
documento → limite B
arquivo geral → limite C
```

Não é obrigatório implementar limites diferentes na primeira versão.

---

# 19. Validação do Upload

Fluxo:

```text id="0ey5pm"
Request
   ↓
Authentication
   ↓
Authorization
   ↓
Multer
   ↓
File Size
   ↓
Extension
   ↓
MIME
   ↓
File Signature / Content Validation
   ↓
Storage
   ↓
Database
```

---

# 20. Não Confiar na Extensão

Um arquivo chamado:

```text id="zqjv6u"
trabalho.pdf
```

não deve ser considerado PDF apenas porque termina com:

```text id="uwg2yx"
.pdf
```

Quando tecnicamente possível, verificar o conteúdo real do arquivo.

---

# 21. Arquivos Perigosos

Arquivos executáveis ou potencialmente perigosos não devem ser aceitos por padrão.

Exemplos:

```text id="n4c9b6"
.exe
.bat
.cmd
.scr
.ps1
```

A lista de bloqueio não substitui uma allowlist de tipos permitidos.

---

# 22. Allowlist

A estratégia preferencial será:

> permitir somente os formatos explicitamente suportados.

Isso é mais seguro do que tentar bloquear infinitos formatos perigosos.

---

# 23. Arquivos Temporários

Uploads podem passar por uma área temporária:

```text id="0mmnfs"
uploads/temporary/
```

Depois da validação:

```text id="rjgb1e"
temporary
   ↓
validation
   ↓
final storage
```

Arquivos temporários abandonados devem ser removidos periodicamente.

---

# 24. Atomicidade

O sistema deve evitar criar registros de banco apontando para arquivos que não existem.

Fluxo recomendado:

```text id="17x6sj"
Upload
 ↓
Validate
 ↓
Store
 ↓
Create Database Record
```

Se o registro falhar:

```text id="tbnx1a"
Remove uploaded file
```

---

# 25. Arquivos Órfãos

Um arquivo órfão é um arquivo físico sem registro correspondente no banco.

O sistema deve possuir mecanismos futuros para identificar e limpar esses arquivos.

---

# 26. Registro Órfão

O contrário também deve ser evitado:

```text id="v9egc6"
Database Record
      ↓
storageKey inexistente
```

Downloads devem tratar essa situação corretamente.

---

# 27. Download

Endpoint:

```text id="e8pp4w"
GET /api/v1/files/:fileId/download
```

Fluxo:

```text id="jyn8s4"
Request
 ↓
Authenticate
 ↓
Find File
 ↓
Check Permission
 ↓
Find Storage Object
 ↓
Stream File
```

---

# 28. Autorização de Download

Antes de entregar um arquivo, verificar:

### Arquivo pessoal

```text id="0g24c5"
ownerId === authenticatedUser.id
```

### Arquivo de grupo

```text id="xxg2z7"
usuário pertence ao grupo
+
possui permissão
```

---

# 29. Não Expor Caminho Físico

Nunca retornar ao frontend algo como:

```text id="7ngq61"
/home/server/backend/uploads/file.pdf
```

O frontend deve trabalhar somente com identificadores e URLs controladas pela API.

---

# 30. URLs de Arquivos

O sistema poderá utilizar:

```text id="2v17o5"
/api/v1/files/:fileId/download
```

em vez de expor diretamente o diretório de uploads.

---

# 31. Streaming

Arquivos grandes devem preferencialmente ser enviados por streaming.

Evitar carregar arquivos grandes completamente na memória.

---

# 32. Content-Disposition

O servidor deverá definir corretamente headers como:

```text id="x13r4c"
Content-Type
Content-Length
Content-Disposition
```

O nome apresentado ao usuário deve utilizar o nome original validado.

---

# 33. Cache

Arquivos públicos ou estáticos poderão utilizar cache quando apropriado.

Arquivos privados devem possuir políticas de cache cuidadosamente configuradas.

Não permitir que conteúdo privado fique armazenado publicamente em cache.

---

# 34. Upload em Tarefas

Uma tarefa poderá possuir anexos.

Exemplo:

```text id="qplh6m"
Task
 ├── descrição
 ├── prazo
 └── anexos
       ├── exercício.pdf
       └── referência.pdf
```

---

# 35. Upload em Trabalhos

Trabalhos colaborativos poderão possuir arquivos.

Exemplo:

```text id="k7s3p9"
Assignment
 └── Files
      ├── pesquisa.docx
      ├── apresentação.pptx
      └── fontes.pdf
```

---

# 36. Upload em Atividades

Professores poderão anexar materiais às atividades.

Estudantes poderão anexar arquivos nas entregas.

---

# 37. Upload no Chat

O chat poderá aceitar anexos.

Exemplo:

```text id="36g1k0"
Mensagem
 ├── content
 └── attachments
```

As mesmas regras de segurança dos demais uploads devem ser aplicadas.

---

# 38. Compartilhamento

Um arquivo pode possuir visibilidade:

```text id="d5y6hq"
private
group
```

Valores futuros podem incluir:

```text id="75c0oa"
public
```

mas arquivos públicos não devem ser habilitados sem uma necessidade clara.

---

# 39. Arquivos Privados

Arquivos privados pertencem ao usuário.

Somente o proprietário ou uma permissão explícita poderá acessá-los.

---

# 40. Arquivos de Grupo

Arquivos de grupo pertencem ao contexto do grupo.

Acesso:

```text id="6e7j6s"
usuário
 ↓
membro do grupo?
 ↓
permissão
 ↓
arquivo
```

---

# 41. Pastas

Usuários poderão organizar arquivos em pastas.

Exemplo:

```text id="z2i3ki"
Drive
├── Química
├── Matemática
├── Trabalhos
└── Vestibular
```

---

# 42. Movimentação

Arquivos poderão ser movidos entre pastas.

Endpoint:

```text id="q7m3q8"
PATCH /api/v1/files/:fileId
```

Body:

```json id="m9d3j3"
{
  "folderId": "FOLDER_ID"
}
```

A autorização deve ser verificada.

---

# 43. Exclusão

Endpoint:

```text id="jz6f0m"
DELETE /api/v1/files/:fileId
```

O backend deve:

1. verificar autorização;
2. remover/invalidar o arquivo;
3. atualizar o banco;
4. lidar com possíveis falhas.

---

# 44. Soft Delete

Quando apropriado, utilizar:

```text id="4owk4y"
deletedAt
```

Isso permite recuperação ou limpeza posterior.

A política definitiva deve ser consistente com `DATABASE.MD`.

---

# 45. Limpeza Permanente

Arquivos marcados para exclusão poderão ser removidos definitivamente por um processo de limpeza.

Exemplo:

```text id="q7r5hr"
deletedAt
      ↓
retenção
      ↓
permanent deletion
```

O período de retenção deve ser configurável.

---

# 46. Segurança contra Path Traversal

Nunca utilizar diretamente nomes fornecidos pelo usuário para construir caminhos físicos.

Entradas como:

```text id="x8j2lv"
../arquivo
../../arquivo
```

não devem conseguir escapar do diretório de armazenamento.

---

# 47. Nomes de Arquivos

O nome original pode conter:

* espaços;
* acentos;
* caracteres especiais.

O sistema deve tratar isso corretamente.

O nome físico do armazenamento deve ser gerado pelo sistema.

---

# 48. Colisão de Arquivos

Dois usuários podem enviar arquivos com o mesmo nome.

Exemplo:

```text id="7s5s0d"
resumo.pdf
resumo.pdf
```

Isso não deve causar sobrescrita.

Cada objeto deve possuir identificador único.

---

# 49. Hash do Arquivo

O sistema poderá calcular um hash do conteúdo.

Exemplo:

```text id="d8v9j1"
sha256
```

Isso pode ajudar em:

* identificação;
* integridade;
* deduplicação futura.

Não é obrigatório para a primeira versão.

---

# 50. Deduplicação

Não implementar deduplicação automaticamente na primeira versão.

A prioridade é:

```text id="7k3kq2"
segurança
+
confiabilidade
+
simplicidade
```

---

# 51. Antivírus

A arquitetura deve permitir futuramente integração com scanner de arquivos.

Exemplo conceitual:

```text id="b9b1h7"
Upload
 ↓
Validation
 ↓
Antivirus Scanner
 ↓
Storage
```

A implementação inicial pode não possuir antivírus, desde que os tipos aceitos sejam restritos.

---

# 52. Arquivos Maliciosos

Caso um scanner seja implementado e identifique arquivo suspeito:

```text id="m7n1hx"
Upload
 ↓
Scanner
 ↓
Threat detected
 ↓
Reject
```

O arquivo não deve ser disponibilizado ao usuário.

---

# 53. Storage Service

Estrutura recomendada:

```text id="o3z2i8"
backend/src/
└── services/
    ├── file.service.ts
    └── storage/
        ├── storage.service.ts
        ├── local-storage.provider.ts
        └── storage.types.ts
```

---

# 54. Interface

Conceitualmente:

```text id="6v7f8q"
interface StorageProvider {
    upload(...)
    download(...)
    delete(...)
    exists(...)
}
```

A implementação pode utilizar nomes e tipos diferentes, desde que mantenha a mesma responsabilidade.

---

# 55. Local Provider

Responsável por:

```text id="o8u8g3"
salvar
ler
verificar
excluir
```

arquivos no armazenamento local.

---

# 56. Cloud Provider

Futuramente poderá implementar a mesma interface para:

```text id="a7k8s5"
Amazon S3
Cloudflare R2
Azure Blob Storage
Google Cloud Storage
```

Sem modificar:

```text id="7imf2s"
TaskService
AssignmentService
GroupService
ActivityService
```

---

# 57. Variáveis de Ambiente

Exemplo:

```text id="b8m0g5"
STORAGE_PROVIDER=local
STORAGE_LOCAL_PATH=./uploads
MAX_FILE_SIZE_MB=25
```

As variáveis definitivas devem permanecer documentadas no `.env.example`.

---

# 58. Produção

Em produção, avaliar utilização de armazenamento externo.

Motivos:

* escalabilidade;
* backups;
* disponibilidade;
* múltiplas instâncias;
* separação entre aplicação e arquivos.

---

# 59. Múltiplas Instâncias

Armazenamento local apresenta limitações quando existem vários servidores.

Exemplo:

```text id="x0qf7p"
Servidor A
   ↓
uploads locais

Servidor B
   ↓
uploads diferentes
```

Para arquitetura horizontal, preferir storage compartilhado ou objeto storage.

---

# 60. Backup

Arquivos de usuários devem possuir estratégia de backup em ambientes de produção.

O backup deve ser independente do banco de dados.

---

# 61. Banco de Dados

MongoDB deve armazenar:

```text id="v2o8y7"
metadados
referência
proprietário
permissões
```

e não necessariamente o conteúdo binário do arquivo.

---

# 62. Não Utilizar MongoDB para Tudo

Não armazenar arquivos grandes diretamente no documento MongoDB.

A aplicação deve utilizar storage apropriado.

MongoDB pode futuramente utilizar GridFS caso exista uma necessidade específica, mas isso não será a estratégia padrão inicial.

---

# 63. Upload Seguro

Todo upload deve passar por:

```text id="8e4h3m"
Authentication
Authorization
Validation
Size Check
Type Check
Storage
Metadata
```

---

# 64. Limite de Requisições

Uploads devem possuir rate limiting para evitar abuso.

Especialmente:

```text id="k8p1i5"
muitos arquivos
arquivos muito grandes
requisições repetidas
```

---

# 65. Concorrência

O sistema deve suportar múltiplos uploads simultâneos sem:

* sobrescrever arquivos;
* corromper metadados;
* perder registros;
* criar referências inconsistentes.

---

# 66. Progresso de Upload

O frontend poderá mostrar progresso do upload.

Exemplo:

```text id="8ymb9h"
0%
 ↓
25%
 ↓
50%
 ↓
75%
 ↓
100%
```

O progresso é principalmente responsabilidade do cliente.

---

# 67. Cancelamento

Uploads grandes poderão futuramente ser cancelados.

O backend deverá limpar arquivos temporários quando um upload for interrompido.

---

# 68. Offline

Uploads realizados offline não devem ser considerados concluídos até serem confirmados pelo backend.

O frontend pode manter uma fila local.

Exemplo:

```text id="l0l8n3"
Offline
 ↓
Fila
 ↓
Internet
 ↓
Upload
 ↓
Servidor confirma
```

---

# 69. Erros

Exemplos:

```text id="8f3xjp"
FILE_TOO_LARGE
FILE_TYPE_NOT_ALLOWED
UPLOAD_FAILED
FILE_NOT_FOUND
FILE_ACCESS_DENIED
STORAGE_UNAVAILABLE
```

---

# 70. Resposta de Upload

Exemplo:

```json id="82w8tz"
{
  "success": true,
  "data": {
    "id": "FILE_ID",
    "originalName": "resumo.pdf",
    "size": 123456,
    "mimeType": "application/pdf"
  }
}
```

Nunca retornar:

```text id="52w4z5"
storageKey
```

se isso expuser detalhes internos desnecessários.

---

# 71. Auditoria

Futuramente, operações importantes poderão ser registradas:

```text id="at0g0j"
file_uploaded
file_downloaded
file_deleted
file_shared
```

Não registrar conteúdo sensível desnecessariamente.

---

# 72. Performance

O sistema deve:

* evitar carregar arquivos inteiros na memória;
* utilizar streaming quando apropriado;
* limitar uploads;
* paginar listagens;
* evitar consultas desnecessárias;
* utilizar índices adequados.

---

# 73. Testes

Testar:

### Upload

* arquivo válido;
* arquivo inválido;
* tamanho excedido;
* tipo não permitido;
* usuário não autenticado.

### Download

* proprietário;
* membro autorizado;
* usuário sem acesso;
* arquivo inexistente.

### Exclusão

* proprietário;
* administrador autorizado;
* usuário sem permissão;
* arquivo inexistente.

### Storage

* upload;
* download;
* existência;
* exclusão;
* falha do provider.

---

# 74. Testes de Segurança

Testar contra:

* path traversal;
* MIME spoofing;
* extensão falsa;
* acesso por IDOR;
* uploads repetidos;
* arquivos maliciosos;
* bypass de tamanho;
* nomes malformados;
* acesso direto ao diretório de uploads.

---

# 75. Regra para Agentes

Antes de modificar o sistema de arquivos, o agente deve ler:

```text id="ckj4h2"
PROJECT_SPEC.md
ARCHITECTURE.md
DATABASE.MD
AUTH.MD
API.MD
GROUPS.MD
STORAGE.MD
```

Não implementar um novo sistema de armazenamento sem verificar a abstração existente.

---

# 76. Ordem de Implementação

### Etapa 1

```text id="6p9qby"
StorageProvider
LocalStorageProvider
```

### Etapa 2

```text id="nyy8g7"
File Model
FileService
Upload
Download
Delete
```

### Etapa 3

```text id="z7s0ku"
Validation
Permissions
Limits
```

### Etapa 4

```text id="8k3c2u"
Tasks
Assignments
Activities
Chat attachments
```

### Etapa 5

```text id="4j9t9h"
Folders
Sharing
```

### Etapa 6

```text id="af7w4y"
Cleanup
Backup
Monitoring
```

### Etapa 7

```text id="7k3s9c"
Cloud Storage Provider
```

---

# 77. Critérios de Aceitação

O sistema de armazenamento será considerado funcional quando:

* uploads funcionarem;
* arquivos forem validados;
* limites forem aplicados;
* tipos não permitidos forem rejeitados;
* arquivos não forem sobrescritos;
* downloads forem protegidos;
* arquivos pessoais forem privados;
* arquivos de grupos respeitarem permissões;
* exclusão funcionar;
* arquivos temporários forem tratados;
* caminhos físicos não forem expostos;
* storage estiver abstraído;
* testes críticos passarem.

---

# 78. Regra Final

O sistema de armazenamento deve seguir:

```text id="0c8x4m"
Upload
 ↓
Validation
 ↓
Authorization
 ↓
Storage Abstraction
 ↓
Metadata
 ↓
Controlled Access
```

O conteúdo dos arquivos pertence ao storage.

O MongoDB mantém os metadados.

O backend controla o acesso.

O frontend nunca deve acessar diretamente o diretório físico dos uploads.

---

## Fim do documento

**Documento:** `STORAGE.MD`
**Projeto:** SOS Estudante
**Versão:** 1.0
