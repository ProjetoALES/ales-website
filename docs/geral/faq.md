# FAQ

Esse artigo responde algumas perguntas rápidas que você pode ter ao longo do desenvolvimento. Caso sua dúvida seja mais profunda, provavelmente a resposta estará no [Como Funciona](como_funciona.md) e não aqui.

- [FAQ](#faq)
  - [Qual a diferença entre Autorização e Autenticação?](#qual-a-diferen%c3%a7a-entre-autoriza%c3%a7%c3%a3o-e-autentica%c3%a7%c3%a3o)
  - [Meu container de frontend dá um erro falando que não encontrou um pacote específico!](#meu-container-de-frontend-d%c3%a1-um-erro-falando-que-n%c3%a3o-encontrou-um-pacote-espec%c3%adfico)

## Qual a diferença entre Autorização e Autenticação?
Muitas vezes confundimos autorização com autenticação. Um usuário se **autentica** quando ele fornece suas credenciais (usuário e senha, login pelo facebook, etc). Um usuário autenticado não necessarimente tem **autorização** para fazer coisas. Por exemplo, um professor está autorizado a acessar a página dos professores porque ele tem **permissão** para isso, já que ele é professor, mas um aluno não tem.

Portanto, um usuário se **autentica** fazendo login. Ele está **autorizado** a fazer algo caso ele tenha **permissão** para isso.

## Meu container de frontend dá um erro falando que não encontrou um pacote específico!
**Solução**:
- [Pare o ambiente de desenvolvimento](desenvolvendo.md#parando-os-containers-de-desenvolvimento)
- Apague da pasta do frontend a pasta `node_modules/`
- Execute `yarn install` na pasta do frontend para reinstalar tudo
- Remova o volume do container do frontend: `docker volume rm ales_frontend_node_modules`

Suba novamente o seu ambiente de desenvolvimento

**Explicação**:
Quando você instala pacotes de Javascript com [yarn](conceitos.md#yarn), eles são [buildados](#buildar-c%c3%b3digo) na pasta `node_modules/` levando em consideração o seu sistema operacional. Por conta disso, sistemas operacionais diferentes provavelmente terão arquivos em um formato diferente depois de buildados.

Sabendo disso, precisamos garantir que o nosso container rodando o código do frontend apenas carregue da nossa pasta o nosso **código** e não a pasta `node_modules/`. Fazemos isso criando um [volume](conceitos.md#volume) no Docker e virtualizamos apenas a pasta de `node_modules/` dentro do container.

Caso você inicialize o seu servidor de desenvolvimento antes de rodar `yarn install` localmente na sua máquina, Docker pode ficar confuso e montar a sua pasta local de `node_modules/` dentro do container, fazendo com que ele tente usar os arquivos buildados para o sistema operacional do seu computador, causando problemas.
