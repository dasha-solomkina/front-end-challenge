# Front End Challenge

This challenge is part of the Birdie: [http://birdie.ai](http://birdie.ai) selection process and was created to assess the skills of candidates to use Web technologies (Frontend) and covers the areas of design and basic knowledge of Web technologies. We expect a front-end developer to be specialized in the development of the user interface (UI) of Web applications and to be in harmony and collaboration with designers and other developers to ensure that the interface is visually attractive, intuitive, simple, responsive and fluid.

## Feedback Screen

Our client Dunder Mifflin requested Birdie to implement a product where it would be possible to view a list of all the feedback he has been receiving from his customers in addition to a graph that shows the volume of this feedback per month. In this list, our client would like to view, search and browse through all the feedback. He would also like to be able to create a tag within a feedback from a specific customer to facilitate queries.

**Feedback:** Your product is very good, but unfortunately your battery lasts
for a while.

**Feedback with tag:** Your `product is very good`, but unfortunately your `battery` `does not last` for a long time.

Once the tag has been created in the feedback, the same tag can appear in other feedback with the same words as the tag. For example:

**Feedback with tag:** The `battery` of this product is great.

He commented that this last feature can be delivered in another sprint, but would be happy to see it working in this delivery.

Here is the prototype of the expected screen: [Figma Link](https://www.figma.com/file/22NosjNQDP6Ica42cUgPgX/Frontend-Test?node-id=0%3A1&t=IqY64y8vEWtra6KZ-1)

## API

To search for data, we provide a REST API at the following address:

`https://frontend-challenge.birdie.workers.dev`

### GET /feedback

Search params:

-  `search`: text search (default: `""`)
-  `page`: current page (default: `0`)
-  `pageSize`: feedback per page (default: `25`)

Example response:

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

No parameters.

Example response:

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

## What do we expect?

We expect at least these three functionalities below:

- Page with UI similar to the prototype
- Feedback listing with search and pagination
- Trendline of feedback volume month by month

And it will be even better if it has:

- Tag functionality

Your goal in this test is to deliver the page requested by our client with the greatest possible fluidity, and for that you can use our stack (which would be a plus) or another of your preference.

## Development stack

- React
- Vite
- Jest
- ESLint
- Yarn
- TypeScript
- Stitches
- Radix UI
- Zustand
- ECharts
- TanStack Query
- Figma

## How to participate?

- Fork this repository.
- Clone the fork to your machine.
- Create a frontend folder and develop your software inside it.
- Create a README.md in your repository describing the steps to run your project.
- Once completed, Open an issue in this repository with the title '[FRONT End Challenge] {{Your name}}'.
- In the issue content, make any comments about how your experience was in running the test (suggestions, compliments, criticisms, etc.).


Once your issue is open, a member of our Birdie technical team will analyze your challenge and may be prepared to defend the solution you have built.
The more information we have in the README.md, the better we will be able to evaluate you.

We look forward to your challenge, and good luck!
