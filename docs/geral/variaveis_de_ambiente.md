# Variáveis de ambiente

Nesse artigo você encontrará uma lista de arquivos contendo variáveis de ambiente e explicações para (quase) todos os seus valores. Caso você tenha começado agora a desenvolver, você precisará entrar em cada um deles e alterar seus valores para refletir seu ambiente local.

Para funcionar corretamente e se comunicar com serviços externos e internos, o site do ALES utiliza algumas variáveis de ambiente dispersas em 8 arquivos diferentes na pasta principal do projeto. Abaixo eu vou descrever quais são esses arquivos, que serviços lêem quais variáveis e como configurá-las.

>  **Atenção!** Os arquivos que tem `template` são apenas isso, templates. Para usá-los você precisa duplicá-los e remover o `template` do nome da cópia. Coloque suas informações pessoais nessa cópia para evitar enviar esses segredos para a internet pelo git.

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

Aqui estão definidas variáveis de ambiente usadas pelo backend e worker que não são informações "secretas". Essas informações são salvas no [`backend.secrets`](#backendsecrets)
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
Esse email é o email usado pelo [Traefik](#traefik) para criar um certificado SSL pelo [Lets Encrypt](https://letsencrypt.org/).

### `STACK_NAME`
Nome do stack que o [Docker Swarm](#docker-swarm) usará no deploy em produção.

### `USE_EXTRA`
Quando ativada, essa variável faz com que outros serviços extras sejam adicionados ao [stack](#stack) em produção. Veja os [Serviços Extras](#TODO) para detalhes.

## `social-providers.secrets`
Para criar o `social-provider.secrets` você vai usar o template `social-provider.template.secrets`. Esse arquivo é usado tanto em desenvolvimento quanto em produção e contém variáveis de configuração de provedores sociais.

Atualmente contém apenas as configurações do [Auth0](#auth0), nosso servidor de autenticação.
