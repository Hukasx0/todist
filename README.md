# Todist

Project created as a result of a challenge - write a simple Fullstack application with authorization in 1 day

The project is deployed on [TodistApp.vercel.app](https://todistapp.vercel.app/)

![Project screenshot](https://raw.githubusercontent.com/Hukasx0/todist/main/screenshot.png)

## Used technologies
- T3 Stack (Next.js, tRPC, Tailwind)
- Next Auth
- Drizzle ORM
- Postgresql
- Shadcn ui

## Deployment and running locally
1. Create .env file (or use environment variables)
2. Set ***DATABASE_URL*** to your Postgresql db url (you can also use for example Supabase, Vercel postgres or Neon)
3. Set ***NEXTAUTH_SECRET*** to secret base64 string, you can generate one like this:

`sh
openssl rand -base64 32
`

4. ***NEXTAUTH_URL*** - on localhost you use **http://localhost:3000**, on Vercel you don't need to set this variable
5. ***GITHUB_CLIENT_ID*** and ***GITHUB_CLIENT_SECRET***  - go to [GitHub OAuth](https://github.com/settings/developers) and create new OAuth app

## License
2024 Hubert Kasperek

The project is available under the [MIT License](blob/main/LICENSE)
