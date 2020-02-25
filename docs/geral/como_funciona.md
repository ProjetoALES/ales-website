# Como funciona?

- [Como funciona?](#como-funciona)
  - [Como usuário são autenticados?](#como-usu%c3%a1rio-s%c3%a3o-autenticados)
  - [Como funcionam as permissões?](#como-funcionam-as-permiss%c3%b5es)
  - [Como o frontend funciona?](#como-o-frontend-funciona)
    - [A escolha de Vue](#a-escolha-de-vue)
    - [A escolha de Nuxt](#a-escolha-de-nuxt)
    - [Isomorfismo e história](#isomorfismo-e-hist%c3%b3ria)
      - [A história dos sites](#a-hist%c3%b3ria-dos-sites)
      - [A era dos SPAs e suas soluções](#a-era-dos-spas-e-suas-solu%c3%a7%c3%b5es)

Nessa seção vamos explorar como algumas partes do site funcionam em profundidade. Caso você tenha dúvidas sobre como alguma coisa que não está aqui funciona, basta mandar uma mensagem no canal de tech no slack do ALES que nós adicionamos.

## Como usuário são autenticados?
Para facilitar a autenticação usando redes sociais e até por SMS, decidimos usar o serviço [Auth0](#auth0). Com ele, deixamos de nos preocupar com as credenciais (usuário e senha) de um usuário e deixamos que o Auth0 cuide de nos passar todas as informações que precisamos.

A autenticação começa no frontend, onde um aluno ou voluntário novo clica em "Inscrever-se". Ao clicar nesse botão, direcionamos a pessoa ao site do Auth0, onde é escolhida a forma de autenticação. Lá é possível entrar com o Facebook, Google ou até usando o telefone celular com uma mensagem de SMS. Quando Auth0 confirma quem é a pessoa, ele redireciona o usuário para o frontend com um código especial na barra do navegador. O frontend então pega esse código e manda uma chamada de [API](#api) de volta para o Auth0 pedindo um *token* chamado [JWT](#jwt). Esse JWT é como uma mensagem do Auth0 que confirma que a pessoa que acessou o site é quem ela diz que é e que nós podemos mostrá-la suas informações.

Com esse JWT em mãos, nosso frontend consegue se comunicar com nosso backend por meio de mais chamadas de API. Cada chamada de API que o frontend faz inclui o JWT que recebemos do Auth0. O backend utiliza esse JWT para ter certeza que a chamada que vem do frontend é válida e que vem do usuário que está acessando a página.

## Como funcionam as permissões?
Ainda se confunde sobre autorização vs. autenticação? Dê uma olhada no [FAQ](#qual-a-diferen%c3%a7a-entre-autoriza%c3%a7%c3%a3o-e-autentica%c3%a7%c3%a3o)!
Enquanto que as 

## Como o frontend funciona?
O [frontend](#frontend) é feito em [Vue](#vue) usando a framework [Nuxt](#nuxt). Ele usa [isomorfismo](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) para responder mais rapidamente a pedidos do navegador.

Por ser o coração da experiência do usuário, separarei as explicações do frontend em tópicos.

### A escolha de Vue
Das 3 grandes frameworks de Javascript (Angular, React e Vue), Vue se destaca por sua facilidade e performance. Muitas pessoas vão mexer no código desse site, o que significa que muitas pessoas vão ter que aprender a programar para mexer nesse site.

Vue é, de longe, a framework com a menor curva de aprendizado dentre as 3 e a framework que traz mais features sem prejudicar a performance.

Por exemplo, para escrever em React você é **obrigado** a aprender não apenas a sub linguagem [JSX](https://reactjs.org/docs/introducing-jsx.html) como também precisa dominar a sintaxe de versões mais recentes de Javascript como [ES6](https://www.w3schools.com/js/js_es6.asp). Além disso, React por padrão não possui nenhuma feature de mundo real. Você não pode ter páginas diferentes, usar CSS escopado, compartilhar estado global, etc. Tudo vem de bibliotecas de terceiros (e existem muitas delas pra escolher). Para um programador novato, essa quantidade de opções complica e atrasa o desenvolvimento.

Vue é o oposto. Você pode programar usando a sintaxe comum de HTML, não precisa usar nada de ES6 e os criadores de Vue solucionaram todos os problemas de CSS, páginas diferentes e estado com bibliotecas excelente e mantidas pela própria equipe do Vue. 

Tudo isso somado ao fato de que Vue é a única das 3 que não nasceu dentro de uma empresa gigante (Angular é do Google e React do Facebook), significa que Vue é a única que evolui com seus usuários em primeiro lugar, e não para sua empresa criadora.

### A escolha de Nuxt

### Isomorfismo e história
*Isomórfico* é um jeito chique de chamar um aplicativo que tem o frontend e o backend feitos com a mesma linguagem (Javascript). "*Mas o backend não era em Django, que é Python?*". Sim, ele é em Python, mas existe um *outro* backend que é bem mais simples e serve só o frontend. A grande funcionalidade desse segundo backend é uma coisa chamada *Server Side Rendering* ([SSR](#ssr)). Para entender por que SSR é importante, vamos primeiro entender o que são sites e como Vue funciona.

#### A história dos sites

No início existia apenas o HTML. Simples e puro, o HTML permitia que ajustássemos onde e como queríamos o texto em nosso site. Podíamos colocar imagens, ajustar o tamanho dos textos e muito mais. Sempre que um usuário acessava uma página, seu computador fazia um pedido por [HTTP](#http) para um servidor na internet rodando um software como [Apache](https://httpd.apache.org/) ou [nginx](https://www.nginx.com/). Esses softwares que permitem "servir", ou seja, fornecer, páginas para quem pede. Eles, na época, literalmente copiavam o texto dentro de um arquivo `index.html` e enviavam para o usuário. O usuário recebia essa página pronta e seu navegador a exibia, terminando seu trabalho.

Isso funcionava muito bem para sites simples, mas logo surgiu a necessidade de fazer alterações à estrutura da página de acordo com algumas variáveis. Por exemplo, como poderíamos ter um sistema pra usuários conhecidos fazerem login e acessarem páginas protegidas? Como editar a página HTML antes de enviar adicionando coisas como o nome do usuário? Foi aí que nasceram linguagens e frameworks como [php](https://www.php.net/), e até mesmo Django, que te permitiam **renderizar** uma página HTML antes de enviá-la ao usuário.

Logo começaram a se perguntar "o que há com essa página baixada que é tão estática? Como faço para fazê-la mais animada?". De fato, páginas feitas com puro HTML são estáticas e imutáveis, mas a criação de Javascript mudou isso. Com Javascript foi possível remover e mostrar elementos, mudar alterar seus atributos e executar códigos e lógica dentro dos sites! Essa foi a revolução dos sites e, com ela, nasceram tecnologias como [jQuery](https://jquery.com/) que permitiram facilmente editar e manipular tudo nos sites direto no navegador. Com isso nós passamos a conseguir construir a página em Django ou php e alterar essa mesma página no navegador usando Javascript e jQuery.

Mas a tecnologia nunca para e é influenciada cada vez mais por outras tecnologias. Sites se tornavam cada vez mais essenciais para nós. Fazíamos tudo em sites, desde ver notícias a acessar contas bancárias, mas a experiência de usar um site sempre foi lenta até então. Para cada link que você clicasse, uma nova página deveria ser baixada da internet e isso levava tempo. Comparado aos aplicativos e programas de computador, usar um site era demorado demais.

Foi aí que surgiu o conceito de *Single Page Applications* ([SPA](#spa)), ou Aplicações de uma única página. Esses novos sites pareciam com sites comuns à primeira vista, mas se você observasse a página carregando perceberia que ela parecia carregar "aos poucos", como se estivesse sendo montada bem na sua frente! Tudo que o navegador baixava do servidor era um *esqueleto* do site em HTML e um arquivo de Javascript, e então todos os botões e texos eram construídos em tempo real na sua frente. Não apenas isso, ao clicar em um link algo diferente acontecia. Nenhum pedido era feito ao servidor! Usando Javascript, o site se reconstruia por completo para mostrar o novo conteúdo. Assim nasceram os SPAs e frameworks como AngularJS.

#### A era dos SPAs e suas soluções
SPAs começaram uma revolução no desenvolvimento de sites. O que antes era um [stack](#stack) de programação em php ou Django, somado a outro em Javascript e jQuery se tornou um único em Javascript puro no navegador. Usando frameworks como AngularJS (e, posteriormente, React e Vue) se tornou possível fazer sites que nunca carregavam, nunca travavam e até funcionavam **offline**. Podíamos mudar qualquer coisa na página a qualquer momento em resposta a qualquer estímulo do usuário.

Mas tinha um problema. O site inteiro era baixado de uma vez no dispositivo do usuário e tinha que ser [hidratado](#hidrata%c3%a7%c3%a3o) antes de ser mostrado. "*Essa não era toda a vantagem?*" Sim, ela era, mas apenas quando você muda de página *dentro* do site. Ao baixar e hidratar o site inteiro de uma vez, um usuário novo poderia levar quase 10 segundos para ver a primeira página. É claro que as páginas seguintes seriam super rápidas, mas a primeira página é sempre a mais importante, pois se seu usuário esperar demais para ver seu site ele provavelmente desistirá.

Qual é a solução então? Voltar ao jeito que era feito antigamente! Não por completo, mas pelo menos durante a primeira página. Agora o termo *Server Side Rendering* pode estar fazendo mais sentido. A grande ideia aqui é ter um servidor em Javascript cujo único trabalho é construir a primeira página de cada usuário. Ele vai construir a página inteira em HTML e enviá-la como os servidores em Django faziam, mas aí acaba seu trabalho. Depois de baixado, o site se encarregará de atualizar-se automaticamente usando Javascript sem depender mais do servidor.

O resultado disso é que temos o melhor dos dois mundos! Por um lado nós temos primeiras-páginas que carregam muito rápido e mantém o usuário interessado. Por outro, nosso usuário não tem mais que esperar as páginas seguintes carregarem, pois o Javascript se encarregará disso.
