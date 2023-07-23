# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Fly Setup

1. [Install `flyctl`](https://fly.io/docs/getting-started/installing-flyctl/)

2. Sign up and log in to Fly

```sh
flyctl auth signup
```

3. Setup Fly. It might ask if you want to deploy, say no since you haven't built the app yet.

```sh
flyctl launch
```

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

If you've followed the setup instructions already, all you need to do is run this:

```sh
npm run deploy
```

You can run `flyctl info` to get the url and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more information.

## Connecting to production database

From [the Epic Stack Deployment docs](https://github.com/epicweb-dev/epic-stack/blob/main/docs/deployment.md)

The sqlite database lives at `/data/sqlite.db` in the deployed application.
Because it is SQLite, you cannot connect to it unless you're running a
command-line session on the machine. You can do this using `fly ssh console`.
The Dockerfile simplifies this further by adding a `database-cli` command. You
can connect to the live database by running `fly ssh console -C database-cli`.

To connect to the deployed database from your local machine using Prisma Studio,
you can utilize Fly's ﻿`ssh` and ﻿`proxy` commands.

- Run in one terminal the command to start Prisma Studio on your desired Fly app
  ```sh
  fly ssh console -C "npm run prisma:studio" --app [YOUR_APP_NAME]
  ```
- Run in a second terminal the command to proxy your local port 5556 to Prisma
  Studio
  ```sh
  fly proxy 5556:5555 --app [YOUR_APP_NAME]
  ```

To work with Prisma Studio and your deployed app's database, simply open
`http://localhost:5556` in your browser.
