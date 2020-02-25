# Configurando seu editor

> Atenção: **Tudo** nessa seção do editor é completamente opcional.

Nesse artigo você vai aprender a configurar o seu editor de texto para que sua experiência de desenvolvimento seja a mais fluída possível.

- [Configurando seu editor](#configurando-seu-editor)
  - [VS Code](#vs-code)
    - [Extensões](#extens%c3%b5es)
    - [Pacotes do backend e frontend](#pacotes-do-backend-e-frontend)
      - [Frontend](#frontend)
      - [Backend](#backend)

## VS Code

Eu sempre recomendo o [VS Code](https://code.visualstudio.com/) como editor. Ele vai tornar várias coisas bem mais fáceis e o repositório já vem com suporte pra vários comandos que vão te ajudar no desenvolvimento.

### Extensões

Depois de instalado o vscode, eu recomendo que você instale as seguintes extensões:

| Extensão                                                                                                    | Descrição                                                                             |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)                                   | Várias ferramentas para desenvolvimento em Vue. Essencial para desenvolver o frontend |
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)                              | Suporte nativo para Python no vscode                                                  |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)                      | Formatação com Prettier a partir do editor                                            |
| [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) | Autocompleta quando vc digita caminhos para arquivos                                  |
| [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)                              | Várias ferramentas de Git no editor                                                   |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)                        | ESLint direto no editor                                                               |
| [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)                   | Te dá uma aba nova para gerenciar os seus containers                                  |
| [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)     | Abre uma janela do Chrome com debugger habilitado                                     |
Existem várias outras extensões que você pode usar, mas essas são as essenciais.
### Pacotes do backend e frontend

Caso você tenha instalado as extensões acima, você vai precisar instalar os pacotes do backend e do frontend localmente para desfrutar de autocompletes e intellisense.

Vou separar em instalações para o backend e para o frontend:

#### Frontend

O frontend é em javascript, então você precisará de [Nodejs](conceitos.md#nodejs) 13.6.

A melhor forma de instalar e gerenciar versões de node é com o Node Version Manager, ou [nvm](https://github.com/nvm-sh/nvm). Depois de instalar ele, rode:

```bash

cd frontend

nvm install

nvm use

```

Para instalar e usar a versão de node do repositório.

Nós usamos o [Yarn](conceitos.md#yarn) para gerenciar dependências do frontend. Comece [instalando-o](https://classic.yarnpkg.com/en/docs/install/).

Instalado, navegue para a pasta do frontend e instale as dependências:

```bash

cd frontend

yarn

```

Só isso. Agora vc já deve ter todas as features completas para desenvolver o frontend!

#### Backend

O backend roda em Python 3.8, mas eu recomendo que você use um gerenciador de ambientes para Python, o [pyenv](https://github.com/pyenv/pyenv) e o [pyenv-virtualenv](pyenv-virtualenv)

A instalação deles dois pode ser complicada, então siga o tutorial do [pyenv](https://github.com/pyenv/pyenv#installation) e do [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv#installation). Caso tenha dúvidas, fale com a equipe de tech no slack.

Depois de instalados, você vai instalar a versão correta de Python e criar um ambiente virtual para o projeto:

```bash

cd backend

pyenv install 3.8.1

pyenv virtualenv 3.8.1 backend-ales

pyenv local backend-ales

```

Isso vai criar um ambiente virtual chamado `backend-ales` rodando Python 3.8.1 e vai definir essa como a versão padrão dessa pasta (`backend/`). Agora precisamos instalar as dependências de Python.

Antes de instalar as dependências, abra o arquivo `backend/requirements.txt` e edite a a linha onde tem escrito `psycopg2`, trocando `psycopg2` por `psycopg2-binary`. Precisamos instalar o binário, pois construir o pacote do zero requer dependências que você não precisa durante o desenvolvimento.

Depois disso, rode:

```bash

pip install -r requirements.txt

```

para instalar as dependências de python. 

Depois disso, edite `requirements.txt` para `psycopg2` novamente.
Por último você vai precisar configurar o vscode para usar esse novo ambiente de python. Para isso, siga esse [tutorial](https://code.visualstudio.com/docs/python/environments) e selecione o seu novo ambiente `backend-ales`.

Pronto! Tudo está configurado agora.

Para continuar e começar a desenvolver, clique [aqui](desenvolvendo.md).
