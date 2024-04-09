# <img align="center" alt="API Rest" height="40" width="45" src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png"> - PASS IN NLW UNITE NODE.JS

Pass Ins Api developed on Rocketseat Next Level Week Unite Node Trail.

## 💻 | Technology

<div style="display: inline_block">
  <img align="center" alt="Node.js" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg">
  <img align="center" alt="TypeScript" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg">
  <img align="center" alt="Fastify" height="40" width="45" src="https://user-images.githubusercontent.com/46967826/235814699-7bf7e5ce-19d1-469b-9efe-fe89412349d8.png">
  <img align="center" alt="Swagger" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/swagger/swagger-original.svg">
  <img align="center" alt="SQLite" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/sqlite/sqlite-original.svg">
  <img align="center" alt="Prisma" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/prisma/prisma-original.svg">
  <img align="center" alt="Vitest" height="40" width="45" src="https://vitest.dev/logo-shadow.svg">
  <img align="center" alt="ESlint" height="40" width="45" src="https://github.com/devicons/devicon/blob/master/icons/eslint/eslint-original.svg">
  <img align="center" alt="Git" height="40" width="45" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png">
</div>

## 👨‍💻 | Running Project

Clone this repository

```bash
  git clone https://github.com/joaohenriquefernandes/nlw-unite-pass-in-api.git
  cd nlw-unite-pass-in-api
```

Dependency installs

```bash
  npm install
```

Running migrations

```bash
  npm db:migrate
```

Starting project

```bash
  npm run dev
```

Building project

```bash
  npm build
```

Seeding the datas in database
```bash
  npm prisma seed
```

## 📍 | Routes

| Method   | Route                            | Description                |
| -------- | -------------------------------- | -------------------------- |
| `POST`   | `/events/:eventId/attendees`     | Register for event         |
| `GET`    | `/attendees/:id`                 | Get attendee badge         |
| `GET`    | `/events/:eventId/attendees`     | Get event attendees        |
| `GET`    | `/attendees/:attendeeId/check-in`| Create check-in            |
| `POST`   | `/events`                        | Create a new event         |
| `GET`    | `/events/:id`                    | Get event by id            |

## 🧪 | Automated Unit Tests

- [x] Should be able to create a new check-in in an event
- [x] Should not be ableto create check-in twice in the same event
- [x] Should be able to create a new event
- [x] Should not be able to create a event with same name
- [x] Should be able to get the badge information attendees
- [x] Should be able to get event attendees
- [x] Should be able to get information from an event
- [x] Should not be able to register for an event that don't exists
- [x] Should be able to register for an event
- [x] Should not be able to register for an event with duplicate email
- [x] Should not be able to register for event that don't exists
- [x] Should not be able to register for an event that don't vacancies

Running unit tests

```bash
  npm test
```

## 📄 | Project Documentation

Route   | Description                     |
------- | --------------------------------|
`/docs` | Documentation with swagger tool |
