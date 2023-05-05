import express, { Express, RequestHandler } from "express"
import pg from "pg"
import cors from "cors"
import { quizRouter } from "./routes/Quiz"

var env = process.env.NODE_ENV || 'local'
var config = require('../postgres/config')[env]

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool({
  database: config.database,
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  ssl: config.sslEnabled,
  max: 20,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000
})

const app: Express = express()
app.use(express.json() as RequestHandler)
app.use(cors())
const port = process.env.PORT || 3333

app.use(quizRouter)

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT NOW()")
  res.send(`Hello, World! The time from the DB is ${rows[0].now}`)
})

app.get('/authors', async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM authors")

  res.json(rows)
})

app.get('/jokes', async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM jokes")

  res.json(rows)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
