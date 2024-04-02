import { app } from "./app"


app.listen({
  host: '0.0.0.0',
  port: 3000
}).then(() => {
  console.log(`HTTP Server Runing at http://localhost:3333`)
})
