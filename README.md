<a href="https://sentix.vercel.app/">
    <h1>Senti𝕏</h1>
</a>
<p >
  SentiX is a sentiment analysis tool for twitter.
</p>
<p >
  <a href="#description"><strong>Description</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
</p>
<!-- <br/> -->

## Description

<h3>AI Amplify Winning Project (Problem Statement Two )</h3>

Utilizing state-of-the-art natural language processing algorithms, Senti𝕏 analyzes tweets, user handles, and hashtags, extracting nuanced sentiments in real-time. Uncover valuable trends, gauge public perception, and make data-driven decisions with our comprehensive sentiment analysis toolkit, designed to unravel the emotions behind every digital conversation.

**Link:** [https://sentix.vercel.app/](https://sentix.vercel.app/)


## Features

- [Next.js](https://nextjs.org/) App Router
- React and [Typescript](https://www.typescriptlang.org/) for reliable and fast development
- [Langchain.js](https://docs.langchain.com/docs/) as the wrapper to interact with OpenAI API
- [Pinecone](https://www.pinecone.io/) as the vector database
- User Interface and Experience
  - Design is built from scratch using [Figma](https://www.figma.com/)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Icons from [Heroicons](https://heroicons.com) and [Google Icons](https://fonts.google.com/icons)
  - Tailwind Merge and CLSX for dev experience

## Running locally

You will need to have the necessary environment variables setup in your `.env` file.
This should include keys for your openai account, pinecone index. 
    
```bash
NEXT_PUBLIC_OPENAI_API_KEY = 
NEXT_PUBLIC_PINECONE_API_KEY = 
NEXT_PUBLIC_PINECONE_ENV = 
```

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to access your openai credits.

1. Install run: `pnpm i`
2. Make a new `.env` file.
3. Populate the `.env` file with the necessary environment variables.

```bash
pnpm run dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).

## Running locally with docker

```bash
docker login
docker pull korebhaumik/sentix
docker run -env-file .env -p 3000:3000 korebhaumik/sentix
```

> Note: If the docker image is not available (repo is private), you can build it locally by running `docker build -t sentix.` in the root directory of the project.
