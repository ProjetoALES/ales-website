# Debugando código 
Debugar código é uma das partes mais complicadas do desenvolvimento, mas não tem que ser!

O que geralmente se resume a ficar colocando vários `print()` ou `console.log()` pelo código pode ser feito com muito mais facilidade e eficiência usando os debuggers já instalados nesse projeto.

Caso você encontre algum problema específico durante seu desenvolvimento, consulte as [Perguntas Frequentes](faq.md) ou entre em contato conosco no canal de tech no Slack do ALES.

- [Debugando código](#debugando-c%c3%b3digo)
  - [Debugando no vscode](#debugando-no-vscode)
  - [Debugando em outros editores](#debugando-em-outros-editores)
    - [Conectando seu debugger ao frontend](#conectando-seu-debugger-ao-frontend)
    - [Conectando seu debugger ao backend](#conectando-seu-debugger-ao-backend)

## Debugando no vscode

Para usuários do vscode, tudo está pré-configurado pra você debugar todos os ambientes. Se você for na tela de debug verá que tem 4 configurações de debug:

- **Attach Backend**: Conecta o debugger no backend para você testar chamadas de [API](#api). (Se disconecta automaticamente quando o código muda)
- **Launch Frontend Client**: Abre uma janela nova do Chrome para você debugar o frontend
- **Attach Frontend Client**: Se conecta a uma janela existente do Chrome que já possua debugging ativado
- **Attach Frontend Server**: Conecta o debugger ao [Servidor do Frontend](#ssr)


## Debugando em outros editores
Se você não usar vscode não tem problema, mas você terá que configurar seu próprio ambiente de debug.

Todos os serviços expõem portas ou sistemas que você pode usar para conectar seu debuger.

### Conectando seu debugger ao frontend
Para debugar o frontend a forma recomendada é usando o Chrome. [Source maps](conceitos.md#source-maps) são criados para todos os arquivos, então deve ser relativamente simples conectar seu debugger.

O frontend também possui um servidor para [SSR](conceitos.md#ssr) que você pode debugar. O debugger padrão do Node está acessível pelo endereço `localhost:9229`.

### Conectando seu debugger ao backend
Sem vscode é um pouco mais complicado de debugar o backend já que ele usa o [`ptvsd`](https://github.com/microsoft/ptvsd) como debugger.

Caso seu editor não suporte `ptvsd`, também usamos o [Werkzeug](https://palletsprojects.com/p/werkzeug/) com [django-extensions](https://django-extensions.readthedocs.io/en/latest/runserver_plus.html) para debugar direto no navegador.

Para usar o Werkzeug em desenvolvimento, basta acesar o endpoint pelo navagador no momento que ele "quebrar". A tela do Werkzeug aparecerá e você poderá interagir com o traceback no momento da quebra.
