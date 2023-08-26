import express, { Express, RequestHandler } from "express"
import PostgresClient from "./persistence/PostgresClient";
import cors from "cors"
import { quizRouter } from "./routes/Quiz"
import { authRouter } from "./routes/Auth"
import { userRouter } from "./routes/User";
import { videoRouter } from "./routes/Video";

const postgresClient = new PostgresClient();

const app: Express = express()
app.use(express.json() as RequestHandler)
app.use(cors())
const port = process.env.PORT || 3333

app.use(quizRouter)
app.use(authRouter)
app.use(userRouter)
app.use(videoRouter)

app.get("/", async (req, res) => {
  const rows = await postgresClient.query("SELECT NOW()")
  res.send(`Hello, World! The time from the DB is ${rows[0].now}`)
})

app.get('/authors', async (req, res) => {
  const rows = await postgresClient.query("SELECT * FROM authors")

  res.json(rows)
})

app.get('/jokes', async (req, res) => {
  const rows = await postgresClient.query("SELECT * FROM jokes")

  res.json(rows)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
