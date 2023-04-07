import bodyParser from "body-parser"
import express from "express"
import pg from "pg"
import cors from "cors"

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool()

const app = express()
app.use(cors())
const port = process.env.PORT || 3333

app.use(bodyParser.json())
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }))
app.use(bodyParser.text({ type: "text/html" }))

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
