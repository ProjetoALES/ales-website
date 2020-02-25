# Documentação

Bem-vindo(a) à documentação do site do ALES! Aqui você vai encontrar todo tipo de informação, desde como subir o site localmente até definições de todos os termos técnicos usados.

Separamos a documentação em alguns arquivos e pastas pra facilitar sua navegação, mas sempre que introduzirmos um conceito novo ou mencionarmos uma tecnologia diferente, colocaremos links para outros arquivos da documentação com explicações mais aprofundadas.

# Tabela de conteúdos
- Geral
  - **[Introdução](geral/readme.md)**
  - [Desenvolvendo](geral/desenvolvendo.md)
  - [Configurando seu editor](geral/editor.md)
  - [Debugando seu código](geral/debugando.md)
  - [Como o site funciona](geral/como_funciona.md)
  - [Conceitos e tecnologias](geral/conceitos.md)
  - [Conhecendo as variáveis de ambiente](geral/variaveis_de_ambiente.md)
  - [Perguntas frequentes](geral/faq.md)
- Detalhes sobre cada pasta
  - [`backend/`](backend/readme.md)
  - [`frontend/`](frontend/readme.md)
  - [`compose/`](compose/readme.md)
  - [`scripts/`](scripts/readme.md)

# Estrutura do projeto
Em ordem alfabética, você encontrará as seguintes pastas no projeto:

## `.vscode`
Essa pasta contém várias configurações do [VS Code](geral/editor.md). Caso você não use VS Code, pode ignorar essa pasta

## `backend`
Aqui estão todos os arquivos que configuram o [backend](geral/conceitos.md#backend) do projeto. Caso você queira saber mais detalhes sobre o que são os arquivos dessa pasta, consulte a [documentação dela](backend/readme.md).

## `compose`
Esses arquivos estranhos configuram o [Docker Compose](geral/conceitos.md#docker-compose) que usamos tanto em desenvolvimento quanto em [produção](geral/conceitos.md#produ%c3%a7%c3%a3o). Para entender por que existem tantos e pra que eles servem, dê uma olhada na [documentação da pasta](compose/readme.md)

## `docs`
Essa pasta! Aqui está toda a documentação que você precisa pra entender o projeto.

## `frontend`
Todos os arquivos do nosso [frontend](geral/conceitos.md#frontend) estão aqui. Para entender melhor o que eles são, veja a [documentação da pasta](frontend/readme.md)

## `monitoring`
Nessa pequena pasta ficam alguns arquivos usados para construir nossos [serviços](geral/conceitos.md#servi%c3%a7os) de monitoramento. Eles são usados para criar os [containers](geral/conceitos.md#containers) do nosso [Grafana](geral/conceitos.md#grafana) e [Prometheus](geral/conceitos.md#prometheus) usados apenas em produção.

## `scripts`
Aqui você vai encontrar alguns scripts usados para subir o site tanto em desenvolvimento quanto em produção. Para entender melhor como eles funcionam, veja a [documentação da pasta](scripts/readme.md).
