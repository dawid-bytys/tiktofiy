<br />
<br />

<p align="center">
    <img src="https://i.imgur.com/tFTpps9.png" alt="easybase logo black" width="15%">
</p>

<br />

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/salvia-dev/tiktofiy">
</p>

<br />

## Getting Started

If you are interested in hosting this app on your own, create a Cluster on MongoDB cloud and request your own Shazam API Key at https://rapidapi.com/apidojo/api/shazam
Demo: http://tiktofiy.ddns.net/

1. Clone this repository, then create and fill the .env file with required enviroments, you can see the template in `.env.example`

```
├── packages/api
│   ├── src
│   └── .env.example  <–––
├── package.json
└── ...
```

2. Then, install all the required packages by running

```bash
yarn install
```

3. Next, let lerna bootstrap your packages with

```bash
yarn bootstrap
```

4. After that, `cd` into `api` package and let Prisma generate all for your database, in MongoDB you don't need to migrate, just run

```bash
yarn prisma generate
```

5. Finally, `cd` go back to the root level of the repo and run the following commands one by one

```bash
yarn build
```

```bash
yarn start
```

At this point, you are ready to go! Your app is now running! Make your life easier with Tiktofiy!

<!-- CONTACT -->

## Contact

salviadev@protonmail.com
