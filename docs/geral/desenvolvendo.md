# Desenvolvendo

Para começar a desenvolver você vai precisar configurar algumas coisas no seu computador.

Antes de seguir nesse artigo, recomendo que você [configure seu editor](editor.md) para tirar o máximo proveito das ferramentas que embutimos no repositório.

- [Desenvolvendo](#desenvolvendo)
  - [Subindo o ambiente de desenvolvimento](#subindo-o-ambiente-de-desenvolvimento)
    - [Configurando variáveis de ambiente](#configurando-vari%c3%a1veis-de-ambiente)
    - [Configurando seu `/etc/hosts`](#configurando-seu-etchosts)
    - [Iniciando containers de desenvolvimento](#iniciando-containers-de-desenvolvimento)
  - [Parando os containers de desenvolvimento](#parando-os-containers-de-desenvolvimento)
  - [Reiniciando um container de desenvolvimento](#reiniciando-um-container-de-desenvolvimento)
  - [SSH para um serviço](#ssh-para-um-servi%c3%a7o)
  - [Rodando a shell do Django dentro do backend](#rodando-a-shell-do-django-dentro-do-backend)

Todo o ambiente de desenvolvimento existe dentro de [containers](conceitos.md#containers) do [Docker](conceitos.md#docker). Isso garante que vc nunca vai precisar se preocupar em instalar versões específicas das coisas ou com as diferenças entre o seu computador e o servidor onde o site vai rodar.

Nossas configurações também permitem que suas alterações no código em desenvolvimento sejam vistas instantâneamente, não precisando que você fique desligando e ligando o ambiente de desenvolvimento sempre que fizer uma alteração

## Subindo o ambiente de desenvolvimento

Como dito antes, nosso ambiente de desenvolvimento funciona usando containers do Docker. Por causa disso, você precisará instalar Docker e Docker Compose no seu computador. Essas são as únicas dependências obrigatórias para desenvolver o site do ALES.

| Software                                                   | Versão   |
| ---------------------------------------------------------- | -------- |
| [Docker](https://docs.docker.com/install/)                 | >18.06.0 |
| [Docker Compose](https://docs.docker.com/compose/install/) | >1.25.0  |

Precisamos dessas versões (ou mais recentes), pois usamos o [BuildKit](conceitos.md#buildkit) que só está disponível a partir delas.  

Agora você precisa configurar algumas variáveis de ambiente com suas informações.

### Configurando variáveis de ambiente

Existem 8 arquivos que fornecem variáveis que os site do ALES usa para funcionar corretamente e se comunicar com outros serviços. Você não precisará alterar a maioria deles, mas é bom saber que eles existem e o que tem neles. Leia sobre cada um desses arquivos no artigo sobre [Variáveis de ambiente](variaveis_de_ambiente.md)

### Configurando seu `/etc/hosts`
Em [produção](conceitos.md#produ%c3%a7%c3%a3o) diferentes [serviços](conceitos.md#servi%c3%a7os) são disponibilizados em diferentes [subdomínios](conceitos.md#subdom%c3%adnios). Para reproduzir esse comportamento durante o desenvolvimento, você precisará garantir que seu computador sabe reconhecer esses subdominios em [`localhost`](conceitos.md#localhost). Se você está usando Google Chrome então provavelmente já está tudo ok pra você, mas ainda assim é recomendado seguir esse tutorial pra garantir que será acessível em qualquer navegador.

Vamos editar um arquivo chamado `/etc/hosts`, que diz pro seu computador como mapear domínios. Esse arquivo existe em diferentes formatos dependendo do seu sistema operacional, então siga [esse tutorial](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/) para descobrir como alterá-lo.

Você vai precisar adicionar as seguintes entradas:

```
# Mapeamentos genéricos pro localhost
127.0.0.1 traefik.localhost
127.0.0.1 api.localhost
# End of section
```

Isso vai permitir que você acesse o backend em `api.localhost` e o [Traefik](conceitos.md#traefik) em `traefik.localhost`

### Iniciando containers de desenvolvimento

Finalmente podemos iniciar os containers e ver o site localmente. Para fazer isso você tem duas opções:

- Caso você não esteja usando vscode, basta executar o script de desenvolvimento: `./scripts/dev.sh`
- Caso esteja usando vscode, você pode abrir a paleta de commandos (`control+shit+P` ou `⇧⌘P`) e digitar `Run Task`. Isso vai abrir a seleção de comandos e você pode escolher **Dev up**.

Espere alguns minutos enquanto Docker faz o download e inicia todos os seus containers. Essa demora só vai acontecer na primeira vez. Nas vezes seguintes os containers carregarão instantâneamente.

> **Atenção**: Na primeira vez que você rodar, [Django](conceitos.md#django) pode ser rápido demais e tentar [migrar](conceitos.md#migrar-banco-de-dados) antes de o [Postgres](conceitos.md#postgres) estar pronto. Se isso acontecer, simplesmente [pare o ambiente de desenvolvimento](#parando-os-containers-de-desenvolvimento) e tente novamente.

Quando seus containers estiverem prontos e rodando, você vai poder acessar os serviços por 3 urls:

| URL                                                      | Serviço  | Descrição                          |
| -------------------------------------------------------- | -------- | ---------------------------------- |
| [http://localhost](http://localhost)                     | Frontend | Página inicial do site             |
| [http://api.localhost/admin](http://api.localhost/admin) | Backend  | Página de administração do backend |
| [http://traefik.localhost](http://traefik.localhost)     | Traefik  | Dashboard do traefik               |

Agora você já deve conseguir editar os arquivos do frontend e do backend e ver eles serem atualizados em tempo real na sua frente! Não precisa ficar derrubando e subindo o Docker sempre que você fizer uma alteração.

## Parando os containers de desenvolvimento
Para parar os containers de desenvolvimento você pode fazer 1 de 3 coisas:

- Na tela com os logs dos containers, digite `control+C`
- Em qualquer terminal que esteja na pasta principal do projeto, digite `docker-compose down`
- Se estiver usando vscode, rode a task `Dev down`

## Reiniciando um container de desenvolvimento
Se por algum motivo você quiser reiniciar um container específico de desenvolvimento, você pode rodar o seguinte comando da pasta principal do projeto:
```bash
docker-compose restart <nome-do-serviço>
```

Por exemplo, para reiniciar o frontend:
```bash
docker-compose restart frontend
```

Para usuários do vscode, você pode rodar a task `Restart frontend` e `Restart backend`

## SSH para um serviço
Às vezes você pode precisar entrar por [SSH](#ssh) dentro de um container pra debugar alguma coisa. Para fazer isso, tenha em mãos o [nome do projeto no Compose](#composeprojectname) e rode:
```bash
docker exec -it <nome-do-projeto>_<nome-do-serviço>_1 sh
```
Por exemplo, para entrar no frontend:
```bash
docker exec -it ales_backend_1 sh
```

Se você estiver usando vscode, pode fazer isso pelas tasks `SSH into frontend` e `SSH into backend`.

## Rodando a shell do Django dentro do backend
Você também pode executar a shell do Django que está dentro do container do backend. Para fazer isso, tenha em mãos o [nome do projeto no Compose](#composeprojectname) e rode:
```bash
docker exec -it <nome-do-projeto>_backend_1 python manage.py shell_plus
```
Exemplo para os valores padrões:
```bash
docker exec -it ales_backend_1 python manage.py shell_plus
```

Se você estiver usando vscode também tem uma task pra isso: `Open backend shell`.

Para aprender a debugar seu código, vá para o [próximo artigo](debugando.md).
