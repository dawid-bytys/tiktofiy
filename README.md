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
<br />
Live: https://tiktofiy.com

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

3. Finally, run the following commands one by one

```bash
yarn build
```

```bash
yarn api:start
```

```bash
yarn client:start
```

At this point, you are ready to go! Your app is now running! Make your life easier with Tiktofiy!

<!-- CONTACT -->

## Contact

salviadev@protonmail.com
