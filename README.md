# Site do ALES
Esse repositório contém o [frontend](#TODO) e [backend](#TODO) do site do Projeto ALES.

Caso você não conheça alguma das tecnologias usadas, dê uma lida nos [conceitos e tecnologias](#TODO) onde são explicadas o que elas são e como elas funcionam.

- [Site do ALES](#site-do-ales)
- [Desenvolvendo](#desenvolvendo)
  - [Configurando ambiente do editor](#configurando-ambiente-do-editor)
    - [Extensões](#extens%c3%b5es)
    - [Pacotes do backend e frontend](#pacotes-do-backend-e-frontend)
      - [Frontend](#frontend)
      - [Backend](#backend)
  - [Subindo o ambiente de desenvolvimento](#subindo-o-ambiente-de-desenvolvimento)
    - [Configurando variáveis de ambiente](#configurando-vari%c3%a1veis-de-ambiente)
    - [Configurando seu `/etc/hosts`](#configurando-seu-etchosts)
    - [Iniciando containers de desenvolvimento](#iniciando-containers-de-desenvolvimento)
    - [Parando os containers de desenvolvimento](#parando-os-containers-de-desenvolvimento)
    - [Reiniciando um container de desenvolvimento](#reiniciando-um-container-de-desenvolvimento)
    - [SSH para um serviço](#ssh-para-um-servi%c3%a7o)
    - [Rodando a shell do Django dentro do backend](#rodando-a-shell-do-django-dentro-do-backend)
    - [Debugando código](#debugando-c%c3%b3digo)
- [Variáveis de ambiente](#vari%c3%a1veis-de-ambiente)
  - [`.env`](#env)
    - [`PROJECT_NAME`](#projectname)
    - [`COMPOSE_PROJECT_NAME`](#composeprojectname)
    - [`COMPOSE_FILE`](#composefile)
    - [`COMPOSE_PATH_SEPARATOR`](#composepathseparator)
  - [`backend.secrets`](#backendsecrets)
    - [`SECRET_KEY`](#secretkey)
    - [`EMAIL_HOST_PASSWORD`](#emailhostpassword)
    - [`AWS_ACCESS_KEY_ID`](#awsaccesskeyid)
    - [`AWS_SECRET_ACCESS_KEY`](#awssecretaccesskey)
  - [`backend.env`](#backendenv)
    - [`SUPERUSER_NAME`](#superusername)
    - [`SUPERUSER_EMAIL`](#superuseremail)
    - [`SUPERUSER_PASSWORD`](#superuserpassword)
    - [`ALLOWED_HOSTS`](#allowedhosts)
    - [`AWS_STORAGE_BUCKET_NAME`](#awsstoragebucketname)
    - [Configurações de email](#configura%c3%a7%c3%b5es-de-email)
  - [`frontend.secrets`](#frontendsecrets)
    - [`RECAPTCHA_PUBLIC_KEY`](#recaptchapublickey)
    - [`RECAPTCHA_SECRET_KEY`](#recaptchasecretkey)
  - [`postgres.env`](#postgresenv)
  - [`postgres.secrets`](#postgressecrets)
  - [`prod.env`](#prodenv)
    - [`DOMAIN`](#domain)
    - [`IMAGE_DOMAIN`](#imagedomain)
    - [`TAG`](#tag)
    - [`EMAIL`](#email)
    - [`STACK_NAME`](#stackname)
    - [`USE_EXTRA`](#useextra)
  - [`social-providers.secrets`](#social-providerssecrets)

# Desenvolvendo

Todo o ambiente de desenvolvimento existe dentro de [containers](#TODO) do [Docker](#TODO). Isso garante que vc nunca vai precisar se preocupar em instalar versões específicas das coisas ou com as diferenças entre o seu computador e o servidor onde o site vai rodar.

Dito isso, para ficar mais fácil de desenvolver localmente e ter suporte para features do seu editor de texto ou IDE, como autocomplete e [intellisense](#TODO), eu recomendo que você instale algumas outras coisas localmente.

## Configurando ambiente do editor

> Atenção: **Tudo** nessa seção do editor é completamente opcional. Você pode ir direto para [Subindo o ambiente de desenvolvimento](#subindo-o-ambiente-de-desenvolvimento) se quiser pular essa parte.

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

O frontend é em javascript, então você precisará de [Nodejs](#TODO) 13.6.

A melhor forma de instalar e gerenciar versões de node é com o Node Version Manager, ou [nvm](https://github.com/nvm-sh/nvm). Depois de instalar ele, rode:

```bash

cd frontend

nvm install

nvm use

```

Para instalar e usar a versão de node do repositório.

Nós usamos o [Yarn](#TODO) para gerenciar dependências do frontend. Comece [instalando-o](https://classic.yarnpkg.com/en/docs/install/).

Instalado, navegue para a pasta do frontend e instale as dependências:

```bash

cd frontend

yarn

```

Só isso. Agora vc já deve ter todas as features completas para desenvolver o frontend!

#### Backend

O backend roda em [Python](#TODO) 3.8, mas eu recomendo que você use um gerenciador de ambientes para Python, o [pyenv](https://github.com/pyenv/pyenv) e o [pyenv-virtualenv](pyenv-virtualenv)

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

## Subindo o ambiente de desenvolvimento

Como dito antes, nosso ambiente de desenvolvimento funciona usando containers do Docker. Por causa disso, você precisará instalar Docker e Docker Compose no seu computador. Essas são as únicas dependências obrigatórias para desenvolver o site do ALES.

| Software                                                   | Versão   |
| ---------------------------------------------------------- | -------- |
| [Docker](https://docs.docker.com/install/)                 | >18.06.0 |
| [Docker Compose](https://docs.docker.com/compose/install/) | >1.25.0  |

Precisamos dessas versões (ou mais recentes), pois usamos o [BuildKit](#TODO) que só está disponível a partir delas.  

Agora você precisa configurar algumas variáveis de ambiente com suas informações.
### Configurando variáveis de ambiente

Existem 8 arquivos que fornecem variáveis que os site do ALES usa para funcionar corretamente e se comunicar com outros serviços. Você não precisará alterar a maioria deles, mas é bom saber que eles existem e o que tem neles. Leia sobre cada um desses arquivos na seção [Variáveis de ambiente](#vari%c3%a1veis-de-ambiente)
### Configurando seu `/etc/hosts`
Em [produção](#TODO) diferentes [serviços](#TODO) são disponibilizados em diferentes [subdomínios](#TODO). Para reproduzir esse comportamento durante o desenvolvimento, você precisará garantir que seu computador sabe reconhecer esses subdominios em `[localhost](#TODO)`. Se você está usando Google Chrome então provavelmente já está tudo ok pra você, mas ainda assim é recomendado seguir esse tutorial pra garantir que será acessível em qualquer navegador.

Vamos editar um arquivo chamado `/etc/hosts`, que diz pro seu computador como mapear domínios. Esse arquivo existe em diferentes formatos dependendo do seu sistema operacional, então siga [esse tutorial](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/) para descobrir como alterá-lo.

Você vai precisar adicionar as seguintes entradas:

```
# Mapeamentos genéricos pro localhost
127.0.0.1 traefik.localhost
127.0.0.1 api.localhost
# End of section
```

Isso vai permitir que você acesse o backend em `api.localhost` e o [Traefik](#TODO) em `traefik.localhost`

### Iniciando containers de desenvolvimento

Finalmente podemos iniciar os containers e ver o site localmente. Para fazer isso você tem duas opções:

- Caso você não esteja usando vscode, basta executar o script de desenvolvimento: `./scripts/dev.sh`
- Caso esteja usando vscode, você pode abrir a paleta de commandos (`control+shit+P` ou `⇧⌘P`) e digitar `Run Task`. Isso vai abrir a seleção de comandos e você pode escolher **Dev up**.

Espere alguns minutos enquanto Docker faz o download e inicia todos os seus containers. Essa demora só vai acontecer na primeira vez. Nas vezes seguintes os containers carregarão instantâneamente.

> **Atenção**: Na primeira vez que você rodar, Django pode ser rápido demais e tentar [migrar](#TODO) antes de o [Postgres](#TODO) estar pronto. Se isso acontecer, simplesmente [pare o ambiente de desenvolvimento](#TODO) e tente novamente.

Quando seus containers estiverem prontos e rodando, você vai poder acessar os serviços por 3 urls:

| URL                                                      | Serviço          | Descrição                          |
| -------------------------------------------------------- | ---------------- | ---------------------------------- |
| [http://localhost](http://localhost)                     | Frontend         | Página inicial do site             |
| [http://api.localhost/admin](http://api.localhost/admin) | Backend          | Página de administração do backend |
| [http://traefik.localhost](http://traefik.localhost)     | [Traefik](#TODO) | Dashboard do traefik               |

Agora você já deve conseguir editar os arquivos do frontend e do backend e ver eles serem atualizados em tempo real na sua frente! Não precisa ficar derrubando e subindo o Docker sempre que você fizer uma alteração.

### Parando os containers de desenvolvimento
Para parar os containers de desenvolvimento você pode fazer 1 de 3 coisas:

- Na tela com os logs dos containers, digite `control+C`
- Em qualquer terminal que esteja na pasta principal do projeto, digite `docker-compose down`
- Se estiver usando vscode, rode a task `Dev down`

### Reiniciando um container de desenvolvimento
Se por algum motivo você quiser reiniciar um container específico de desenvolvimento, você pode rodar o seguinte comando da pasta principal do projeto:
```bash
docker-compose restart <nome-do-serviço>
```

Por exemplo, para reiniciar o frontend:
```bash
docker-compose restart frontend
```

Para usuários do vscode, você pode rodar a task `Restart frontend` e `Restart backend`

### SSH para um serviço
Às vezes você pode precisar entrar por [SSH](#TODO) dentro de um container pra debugar alguma coisa. Para fazer isso, tenha em mãos o [nome do projeto no Compose](#composeprojectname) e rode:
```bash
docker exec -it <nome-do-projeto>_<nome-do-serviço>_1 sh
```
Por exemplo, para entrar no frontend:
```bash
docker exec -it ales_backend_1 sh
```

Se você estiver usando vscode, pode fazer isso pelas tasks `SSH into frontend` e `SSH into backend`.

### Rodando a shell do Django dentro do backend
Você também pode executar a shell do Django que está dentro do container do backend. Para fazer isso, tenha em mãos o [nome do projeto no Compose](#composeprojectname) e rode:
```bash
docker exec -it <nome-do-projeto>_backend_1 python manage.py shell_plus
```
Exemplo para os valores padrões:
```bash
docker exec -it ales_backend_1 python manage.py shell_plus
```

Se você estiver usando vscode também tem uma task pra isso: `Open backend shell`.

### Debugando código
Para usuários do vscode, tudo está pré-configurado pra você debugar todos os ambientes. Se você for na tela de debug verá que tem 4 configurações de debug:

- **Attach Backend**: Conecta o debugger no backend para você testar chamadas de [API](#TODO). (Se disconecta automaticamente quando o código muda)
- **Launch Frontend Client**: Abre uma janela nova do Chrome para você debugar o frontend
- **Attach Frontend Client**: Se conecta a uma janela existente do Chrome que já possua debugging ativado
- **Attach Frontend Server**: Conecta o debugger ao [Servidor do Frontend](#TODO)

# Variáveis de ambiente

Para funcionar corretamente e se comunicar com serviços externos e internos, o site do ALES utiliza algumas variáveis de ambiente dispersas em 7 arquivos diferentes na pasta principal do projeto. Abaixo eu vou descrever quais são esses arquivos, que serviços lêem quais variáveis e como configurá-las.

>  **Atenção!** Os arquivos que tem `template` são apenas isso, templates. Para usá-los você precisa duplicá-los e remover o `template` do nome da cópia. Coloque suas informações pessoais nessa cópia para evitar enviar esses segredos para a internet pelo git.
## `.env`

Esse arquivo é usado durante o processo de build tanto de desenvolvimento quanto de produção. Suas variáveis são:
### `PROJECT_NAME`

Nome usado para criar as imagens do Docker que serão usadas para criar os containers do backend, frontend e worker.
### `COMPOSE_PROJECT_NAME`

Usado no desenvolvimento. É o nome que o Docker Compose vai usar para identificar o projeto.
### `COMPOSE_FILE`

Usado no desenvolvimento. Já que usamos [vários arquivos do docker compose](#TODO), precisamos de alguma forma pra falar pro Compose que arquivos usar. É isso que essa variável faz. Ela é uma lista de arquivos com definições do Compose que são mergeadas e usadas para subir os containers de desenvolvimento.

### `COMPOSE_PATH_SEPARATOR`

Usado no desenvolvimento. É o caractere que separa os diferentes arquivos definidos na variável `COMPOSE_FILE`.
## `backend.secrets`

Para criar o `backend.secrets` você vai usar o template `backend.template.secrets`. Esse arquivo é usado tanto em desenvolvimento quanto em produção e contém algumas informações sigilosas que só o backend e worker poderão ter acesso.
Em produção, ele é disponibilizado como um [secret](#TODO) do Docker. Em dev ele é montado como uma partição adicional.
### `SECRET_KEY`

É a [secret key](https://docs.djangoproject.com/en/3.0/ref/settings/#std:setting-SECRET_KEY) que o Django usa para assinar coisas como cookies de sessão e tal. Em produção ela deve ser uma string grande e aleatória. Em desenvolvimento você pode deixar algo simples como "abc123"
### `EMAIL_HOST_PASSWORD`

Senha da conta de email usado para enviar emails a partir do site.
Em desenvolvimento você pode usar a senha de um dos seus emails. Em produção é a senha do email do ALES
### `AWS_ACCESS_KEY_ID`

Todos os arquivos enviados por usuários são salvos em um [Bucket da AWS](https://aws.amazon.com/s3/), que é basicamente um lugar onde podemos salvar arquivos na internet.

Para salvar esses arquivos lá, precisamos de uma chave de API para autenticar a comunicação com a AWS. Essa variável é ela.
Para conseguir o valor dessa variável, peça no canal de tech no slack do ALES.
### `AWS_SECRET_ACCESS_KEY`

Além da `AWS_ACCESS_KEY_ID`, precisamos dessa segunda variável para completar a autenticação com a AWS.
Para conseguir o valor dessa variável, peça no canal de tech no slack do ALES.
## `backend.env`

Aqui estão definidas variáveis de ambiente usadas pelo backend e worker que não são informações "secretas". Essas informações são salvas no [`backend.secrets`](#TODO)
### `SUPERUSER_NAME`

Para acessar a página de `/admin` do Django quando o servidor é inicializado pela primeira vez você precisará criar uma conta de "super usuário". Essa conta é criada automaticamente para você usando algumas variáveis de ambiente.
Essa é uma delas, e representa o `username` da conta de super usuário.
### `SUPERUSER_EMAIL`

Assim como `SUPERUSER_NAME`, essa variável é usada para criar o primeiro "super usuário" do backend para acessar a tela de `/admin`. Essa, no caso, é o email da conta de super usuário.
### `SUPERUSER_PASSWORD`

Mesmo esquema de `SUPERUSER_NAME` e `SUPERUSER_EMAIL`, essa é a senha da conta de super usuário.
> ** Atenção**: Altere essa senha assim que possível em produção para evitar acessos de terceiros!
### `ALLOWED_HOSTS`

Por segurança, Django só aceita que o site exista em domínios conhecidos. Essa varíavel é uma lista de domínios que Django deve aceitar como conhecidos. Em desenvolvimento você pode deixar os padrões, mas em produção esses seriam os domínios oficiais do ALES.
### `AWS_STORAGE_BUCKET_NAME`

Esse é o nome do [Bucket da AWS](https://aws.amazon.com/s3/) que o backend deve usar. Deixe o padrão para evitar problemas de acesso.
### Configurações de email

As configurações abaixo definem como é o acesso ao servidor de email que o django usará para enviar emails.
Para a definição de cada uma, veja a [documentação do Django](https://docs.djangoproject.com/en/3.0/ref/settings/#email) sobre isso.
## `frontend.secrets`

Para criar o `frontend.secrets` você vai usar o template `frontend.template.secrets`. Esse arquivo é usado tanto em desenvolvimento quanto em produção e contém algumas informações sigilosas que só o servidor do frontend pode ter acesso.
Em produção, ele é disponibilizado como um [secret](#TODO) do Docker. Em dev ele é montado como uma partição adicional.
### `RECAPTCHA_PUBLIC_KEY`

Chave pública do [reCaptcha](https://www.google.com/recaptcha/intro/v3.html) usado em formulários ao longo do site.
Para obtê-la entre em contato com o canal de tech no slack do ALES.
### `RECAPTCHA_SECRET_KEY`
Chave privada do [reCaptcha](https://www.google.com/recaptcha/intro/v3.html) usado em formulários ao longo do site.
Para obtê-la entre em contato com o canal de tech no slack do ALES.
## `postgres.env`
Nesse arquivo estão definidas variáveis usadas para criar o banco de dados. Você não deve precisar alterar nem em desenvolvimento nem produção.
## `postgres.secrets`
Para criar o `postgres.secrets` você vai usar o template `postgres.template.secrets`. Esse arquivo é usado tanto em desenvolvimento quanto em produção e contém a senha usada para criar o banco de dados.

## `prod.env`
Aqui estão definidas algumas variáveis que só são usadas em produção. 

### `DOMAIN`
Esse é o domínio do site. No caso do ales, é *projetoales.com.br*

### `IMAGE_DOMAIN`
Esse é o domínio da **imagem Docker** do site. É o domínio no [Docker Hub](https://hub.docker.com/) para onde as images que usaremos em produção serão enviadas.

### `TAG`
Tag da imagem em produção a ser usada. Pode ser uma versão da imagem, `prod` ou `latest`.

### `EMAIL`
Esse email é o email usado pelo [Traefik](#TODO) para criar um certificado SSL pelo [Lets Encrypt](https://letsencrypt.org/).

### `STACK_NAME`
Nome do stack que o [Docker Swarm](#TODO) usará no deploy em produção.

### `USE_EXTRA`
Quando ativada, essa variável faz com que outros serviços extras sejam adicionados ao [stack](#TODO) em produção. Veja os [Serviços Extras](#TODO) para detalhes.

## `social-providers.secrets`
Para criar o `social-provider.secrets` você vai usar o template `social-provider.template.secrets`. Esse arquivo é usado tanto em desenvolvimento quanto em produção e contém variáveis de configuração de provedores sociais.

Atualmente contém apenas as configurações do [Auth0](#TODO), nosso servidor de autenticação.
