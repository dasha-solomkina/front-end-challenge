# Desafio Front End

Este desafio é uma parte do processo de seleção da [Birdie](http://birdie.ai) e foi criado afim de avaliar as habilidades dos candidatos para usar tecnologias da Web (Frontend) e abrange as áreas de design e conhecimento básico de tecnologias da Web. Esperamos que um desenvolvedor front-end seja especializado no desenvolvimento da interface do usuário (UI) de aplicativos da Web e que estejam em harmonia e colaboração com designers e outros desenvolvedores para garantir que a interface seja visualmente atraente, intuitiva, simples, responsiva e fluida.

## Tela de Feedback

Nosso cliente Joãozinho LTDA, solicitou para a Birdie a implementação de um produto onde seria possivel visualizar uma listagem de todos os feedback que ele vem recebendo de seus clientes além de um gráfico que mostra o volume desses feedback por mês. Nessa listagem nosso cliente gostaria de visualizar, buscar e percorrer por todos os feedbacks. Ele também gostaria de conseguir criar uma tag dentro de um feedback de determinado cliente para facilitar consultas.

**Feedback:** O seu produto é muito bom, mas infelizmente a bateria de vocês dura
por tempo.

**Feedback com tag:** O seu `produto é muito bom`, mas infelizmente a `bateria` de vocês `não dura` muito tempo.

Uma vez criada a tag no feedback, essa mesma tag pode aparecer em outros feedbacks com as mesmas palavras da tag. Por exemplo:

**Feedback com tag:** A `bateria` desse produto é ótima.

Ele comentou que essa última feature pode ser entregue num outro sprint, mas ficaria feliz em ver funcionando nessa entrega.

Aqui está o protótipo da tela esperada: [Figma Link](https://www.figma.com/file/22NosjNQDP6Ica42cUgPgX/Frontend-Test?node-id=0%3A1&t=IqY64y8vEWtra6KZ-1)

## API

Para buscar os dados, disponibilizamos uma API REST no seguinte endereço:

`https://frontend-challenge.birdie.workers.dev`

### GET /feedback

Search params:

-   `search`: busca textual (default: `""`)
-   `page`: página atual (default: `0`)
-   `pageSize`: feedback por página (default: `25`)

Exemplo de resposta:

```json
{
    "data": [
        {
            "text": "Replaced broken rear shock assembly now the other side broke. This whole unit was replaced once. The 2 boys riding both weigh less than 100 lbs",
            "title": "Having troubles",
            "posted_at": "2022-10-18 04:22:34.000000 UTC"
        }
    ],
    "count": 1,
    "nextPage": null,
    "previousPage": null
}
```

### GET /trendline

Sem parâmetros.

Exemplo de resposta:

```json
[
    {
        "date": "2022-01-01",
        "count": 25
    },
    {
        "date": "2022-02-01",
        "count": "43"
    },
    {
        "date": "2022-03-01",
        "count": 38
    }
]
```

## O que esperamos?

-   Página com UI semelhante ao do protótipo
-   Listagem de feedback com busca e paginação
-   Trendline do volume de feedback mês a mês

### Good to have:

-   Funcionalidade das tags

O seu objetivo nesse teste é entregar as funcionalidades solicitadas pelo nosso cliente com a maior fluidez possivel, e para isso você pode utilizar a nossa stack (que seria um plus) ou outra de sua preferência.

## Stack de desenvolvimento

-   React
-   Vite
-   Jest
-   ESLint
-   Yarn
-   TypeScript
-   Stitches
-   Radix UI
-   Zustand
-   Figma

## Como participar?

-   Dê um fork neste repositório.

-   Clone o fork na sua máquina.

-   Crie uma pasta frontend e desenvolva seu software dentro dela.

-   Crie em seu repositório um README.md descrevendo os passos para execução de seu projeto.

-   Assim que concluir, Abra uma issue neste repositório com o título '[DESAFIO Front End] {{Seu nome}}'.

-   No conteúdo da issue faça qualquer comentário sobre como foi sua experiência na execução do teste (sugestões, elogios, críticas, etc).

Assim que sua issue for aberta, alguém de nosso time técnico da Birdie irá analisar seu desafio, e eventualmente esteja preparado para defender a solução que construiu.

Quanto mais informações tivermos no README.md, melhor conseguiremos te avaliar.

Aguardamos seu desafio, e boa sorte!
