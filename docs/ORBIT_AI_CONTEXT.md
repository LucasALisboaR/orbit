# ORBIT --- Contexto, Diretrizes e Roadmap

> Documento de contexto para IAs. Este arquivo é a referência principal
> para qualquer IA que participe do desenvolvimento do Orbit.

## 1. Contexto do projeto

**Orbit** é uma plataforma de organização pessoal criada inicialmente
para uso próprio. A proposta é centralizar finanças, estudos, tarefas,
projetos pessoais, metas, hábitos e calendário em uma única aplicação,
com dashboards e métricas visuais.

O projeto nasceu de uma necessidade real: criar uma ferramenta que ajude
na organização do dia a dia e, principalmente, facilite a retomada e a
consistência dos estudos.

Ao mesmo tempo, o Orbit é o principal laboratório de evolução de
**Senior Front-end para Full Stack Java + Angular moderno**.

O projeto tem dois objetivos inseparáveis:

1.  Construir um produto realmente útil.
2.  Aprender e demonstrar engenharia de software Full Stack por meio da
    construção do produto.

## 2. Diretrizes primárias para IAs

### 2.1 Aprender construindo

O Orbit é um projeto de aprendizado. A IA não deve priorizar apenas
velocidade de implementação.

Quando o objetivo for estudar um conceito, a IA deve preferencialmente:

1.  Explicar o conceito.
2.  Explicar o problema que ele resolve.
3.  Indicar o que pesquisar.
4.  Sugerir termos de pesquisa e documentação.
5.  Apresentar alternativas e trade-offs.
6.  Fazer perguntas que ajudem na decisão.
7.  Só entregar uma implementação completa quando isso for solicitado ou
    quando o conceito já estiver suficientemente estudado.

**Não transformar o projeto em um tutorial de copiar e colar.**

### 2.2 Não antecipar arquitetura

Não introduzir prematuramente:

-   Microservices
-   CQRS
-   Event Sourcing
-   Kafka/RabbitMQ
-   Kubernetes
-   DDD avançado
-   abstrações excessivas
-   padrões sem necessidade

Sempre perguntar:

> Qual problema esta abstração ou arquitetura resolve?

Se não houver um problema concreto, manter a solução simples.

### 2.3 Arquitetura deve ser compreendida

O desenvolvedor possui dificuldade inicial em compreender a divisão de
responsabilidades de backends e conceitos como MVC, Clean Architecture,
Hexagonal e DDD.

Ao orientar arquitetura, explicar:

-   responsabilidade;
-   dependências;
-   fluxo de dados;
-   motivo da separação;
-   vantagens;
-   trade-offs.

Não apenas dizer quais pastas criar.

### 2.4 Organização por domínio

A direção do projeto é organizar o backend por domínio:

``` text
orbit/
├── auth/
├── user/
├── finance/
├── study/
├── task/
├── goal/
├── habit/
└── shared/
```

Dentro dos módulos, a estrutura inicial pode ser simples:

``` text
controller/
service/
repository/
entity/
dto/
```

Essa estrutura é deliberadamente simples. Clean Architecture, Hexagonal
e DDD serão estudados e aplicados posteriormente, quando a complexidade
real justificar.

### 2.5 Não criar abstrações por antecipação

Não criar uma camada, interface ou padrão apenas porque ele aparece em
tutoriais.

A regra é:

> **Crie abstrações quando existir uma necessidade concreta.**

### 2.6 Não inventar requisitos

Diferenciar sempre:

-   requisito existente;
-   melhoria;
-   sugestão;
-   possibilidade futura.

Novas funcionalidades podem ser propostas, mas não devem ser tratadas
como requisitos já definidos.

### 2.7 Preservar o uso real

Pergunta central:

> **Eu realmente usaria isso?**

Uma funcionalidade tecnicamente interessante, mas inútil para o uso
real, não deve receber prioridade apenas por ser boa para portfólio.

### 2.8 Documentar decisões

Registrar decisões relevantes, principalmente:

-   arquitetura;
-   modelagem;
-   autenticação;
-   bibliotecas;
-   trade-offs;
-   problemas;
-   mudanças de direção.

## 3. Tecnologias

### Frontend

-   Angular moderno
-   TypeScript
-   Tailwind CSS
-   Signals
-   RxJS
-   Angular Router
-   Guards
-   HTTP Client
-   Interceptors
-   Reactive Forms
-   Lazy Loading
-   Deferrable Views
-   Componentização
-   Performance

### Backend

-   Java
-   Spring Boot
-   Spring Web
-   Spring Data JPA
-   Hibernate
-   Spring Security
-   Bean Validation
-   Maven

### Banco

-   PostgreSQL
-   Flyway

### Testes

-   JUnit
-   Mockito
-   Testcontainers
-   testes unitários
-   testes de integração
-   testes de componentes no Angular

### Infraestrutura futura

-   Docker
-   GitHub Actions
-   CI/CD
-   AWS
-   S3
-   CloudFront
-   RDS

## 4. Identidade visual

Paleta inicial:

``` text
Primary:       #2D91D6
Secondary:     #64C4D1
```

A identidade deve ser limpa, moderna, tecnológica e consistente.

## 5. Multiusuário

O Orbit começou como aplicação pessoal, mas passou a ter mais de um
usuário real para testes e utilização.

O sistema, portanto, será **multiusuário**.

Cada usuário deve possuir seus próprios dados:

``` text
User A
├── Accounts
├── Transactions
├── Studies
├── Tasks
└── Goals

User B
├── Accounts
├── Transactions
├── Studies
├── Tasks
└── Goals
```

O backend deve garantir isolamento entre usuários.

Futuramente poderá existir o conceito de `Household` para permitir dados
compartilhados, como contas conjuntas, mas isso não pertence às etapas
iniciais.

## 6. Autenticação

Fluxos planejados:

-   Login
-   Cadastro
-   Esqueci minha senha
-   Redefinição de senha

A primeira implementação deverá priorizar aprendizado de Spring
Security:

``` text
Email + Password
        ↓
Spring Security
        ↓
JWT
```

Posteriormente poderá ser adicionado:

``` text
Google
  ↓
OAuth2 / OpenID Connect
  ↓
Spring Security
```

A estratégia de access token, refresh token, cookies e armazenamento
deverá ser estudada antes da implementação definitiva.

## 7. Domínios do produto

### Dashboard

Visão geral da vida do usuário:

-   saldo;
-   receitas;
-   despesas;
-   gastos por categoria;
-   evolução financeira;
-   tarefas próximas;
-   progresso de estudos;
-   metas;
-   indicadores.

### Finanças

Possíveis entidades:

``` text
Account
Category
Transaction
Budget
CreditCard
Installment
```

Funcionalidades:

-   receitas;
-   despesas;
-   transferências;
-   contas;
-   categorias;
-   recorrências;
-   orçamentos;
-   cartões;
-   parcelamentos;
-   relatórios;
-   gráficos;
-   metas financeiras.

### Estudos

Possíveis conceitos:

``` text
StudyPlan
Topic
StudySession
LearningProgress
```

Funcionalidades:

-   trilhas;
-   tópicos;
-   progresso;
-   sessões;
-   tempo estudado;
-   histórico;
-   streaks;
-   métricas.

### Tarefas e projetos

Possíveis conceitos:

``` text
Task
Project
```

Funcionalidades:

-   tarefas;
-   prioridades;
-   prazos;
-   estimativas;
-   recorrência;
-   projetos;
-   progresso.

### Metas

-   metas financeiras;
-   metas de estudo;
-   metas pessoais;
-   progresso;
-   prazos.

### Hábitos

Possíveis conceitos:

``` text
Habit
HabitEntry
```

Funcionalidades:

-   hábitos recorrentes;
-   registros;
-   sequências;
-   histórico;
-   consistência.

### Calendário

Deverá integrar:

-   tarefas;
-   sessões de estudo;
-   hábitos;
-   metas;
-   compromissos.

## 8. Roadmap

### V0 --- Foundation + Identity

**Objetivo:** criar a fundação técnica e iniciar
identidade/autenticação.

Frontend:

-   Login
-   Cadastro
-   Esqueci minha senha
-   Redefinição de senha

Backend:

-   Spring Boot
-   PostgreSQL
-   REST
-   User
-   Auth
-   DTO
-   Controller
-   Service
-   Repository
-   Entity

Conhecimento esperado:

``` text
Angular
   ↓
HTTP
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL
```

**Status atual: EM ANDAMENTO**

Já realizado:

-   telas iniciais de autenticação no frontend;
-   projeto Spring Boot criado;
-   Maven configurado;
-   classe principal criada;
-   estrutura padrão do Spring Boot gerada.

Ainda em andamento:

-   organização do backend;
-   definição do domínio inicial;
-   persistência;
-   fluxo real de cadastro/login.

JWT e autenticação completa ainda pertencem à etapa seguinte.

### V1 --- Authentication

-   cadastro real;
-   login;
-   password hashing;
-   Spring Security;
-   JWT;
-   access token;
-   refresh token;
-   logout;
-   Angular Interceptor;
-   Angular Guards;
-   tratamento 401/403;
-   isolamento de dados por usuário.

### V2 --- Finance

-   Accounts;
-   Categories;
-   Transactions;
-   receitas;
-   despesas;
-   transferências;
-   filtros;
-   paginação;
-   dashboard;
-   gráficos;
-   agregações.

### V3 --- Credit Cards & Budgets

-   cartões;
-   limite;
-   fechamento;
-   vencimento;
-   compras parceladas;
-   parcelas futuras;
-   orçamento mensal;
-   alertas.

### V4 --- Studies

-   trilhas;
-   tópicos;
-   progresso;
-   sessões;
-   tempo estudado;
-   histórico;
-   streaks;
-   dashboard de estudos.

### V5 --- Tasks & Projects

-   tarefas;
-   prioridades;
-   prazos;
-   recorrência;
-   projetos;
-   progresso;
-   visão diária.

### V6 --- Goals & Habits

-   metas;
-   progresso;
-   hábitos;
-   registros;
-   streaks;
-   métricas.

### V7 --- Calendar & Analytics

-   calendário unificado;
-   visão temporal;
-   analytics;
-   métricas entre módulos;
-   evolução pessoal.

### V8 --- Architecture & Quality

Aprofundar conforme a complexidade real exigir:

-   SOLID;
-   Clean Architecture;
-   Hexagonal Architecture;
-   Ports and Adapters;
-   DDD;
-   Value Objects;
-   Aggregates;
-   Domain Services;
-   Domain Events;
-   testes de integração;
-   observabilidade.

A arquitetura não deve ser aplicada integralmente de uma vez.

### V9 --- Infrastructure & Deployment

-   Docker;
-   GitHub Actions;
-   CI/CD;
-   AWS;
-   S3;
-   CloudFront;
-   RDS;
-   ambientes;
-   secrets/configuração;
-   monitoramento.

### V10 --- Evoluções opcionais

Possibilidades:

-   PWA;
-   mobile;
-   notificações;
-   importação de dados;
-   categorização automática;
-   IA;
-   recomendações;
-   relatórios avançados.

## 9. Estado atual

**Etapa:** V0 --- Foundation + Identity

**Status:** Em andamento

### Frontend

-   Login criado;
-   Cadastro criado;
-   Esqueci minha senha criado.

### Backend

-   Spring Boot criado;
-   Maven configurado;
-   classe principal criada;
-   estrutura padrão gerada.

### Próximo foco

Organizar o backend inicial e compreender o fluxo:

``` text
Frontend
    ↓
HTTP Request
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

Antes de avançar para JWT e autenticação completa.

## 10. Regra de evolução

Ao terminar cada etapa:

1.  Atualizar este documento.
2.  Registrar o que foi implementado.
3.  Registrar decisões técnicas.
4.  Registrar problemas encontrados.
5.  Registrar conceitos aprendidos.
6.  Registrar o que mudou em relação ao plano.
7.  Registrar dúvidas restantes.
8.  Definir o próximo objetivo.

Somente depois disso deve ser criado o documento da próxima etapa.

O documento da próxima etapa deve ser baseado no estado **real** do
projeto, e não apenas no roadmap original.

## 11. Critério de sucesso

O Orbit será bem-sucedido quando:

-   for realmente utilizado;
-   resolver problemas reais de organização;
-   possuir arquitetura compreensível;
-   demonstrar evolução Full Stack;
-   possuir código e documentação de qualidade;
-   possuir testes relevantes;
-   estiver disponível no GitHub;
-   demonstrar Angular moderno;
-   demonstrar Java/Spring Boot;
-   demonstrar modelagem e arquitetura;
-   possuir uma história clara de evolução técnica.

O objetivo não é apenas dizer:

> "Eu fiz um projeto com Angular e Java."

O objetivo é conseguir demonstrar:

> **"Eu identifiquei um problema real, modelei o domínio, construí uma
> aplicação Full Stack, evoluí sua arquitetura conforme a complexidade
> aumentou e consigo explicar as decisões técnicas que tomei."**

## 12. Instrução final para IAs

Ao receber este documento, a IA deve primeiro identificar:

1.  Qual é o objetivo do Orbit.
2.  Qual etapa está ativa.
3.  O que já foi implementado.
4.  O que ainda pertence à etapa atual.
5.  O que está fora do escopo atual.

A IA não deve pular etapas sem solicitação explícita.

Ao ajudar na implementação, deve priorizar aprendizado e entendimento.

Quando houver múltiplas soluções válidas, apresentar alternativas e
trade-offs.

Quando uma solução depender de conhecimento que ainda faz parte do
aprendizado atual, incentivar pesquisa e investigação antes de fornecer
uma implementação completa.

O Orbit deve ser tratado como **projeto de software real e laboratório
de aprendizado**.

------------------------------------------------------------------------

**Orbit**\
*Organize o que importa, acompanhe seu progresso e mantenha sua vida em
órbita.*
