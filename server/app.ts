import express from "express"
import cors from "cors"
import { getPosition } from "./reveal";
import fs from "node:fs"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/health", async (req, res) => {
  res.json({
    message: "very well!"
  })
})

app.post("/error", async (req, res) => {
  const { lineno, colno  } = req.body
  fs.readFile("./frontend.js.map", async (err, data) => {
    if (err) return res.json({ message: "failed" })

    const raw = JSON.parse(data.toString())

    const result = await getPosition(raw, lineno, colno)
    console.log("result", result)
    res.json(result)
  })
})

app.listen(4004, () => {
  console.log(`Server ready at: http://localhost:4004`)
})
/*
{
  type: 'onerror',
  lineno: 3,
  colno: 41,
  message: "Uncaught TypeError: Cannot read properties of null (reading 'name')",
  stack: "TypeError: Cannot read properties of null (reading 'name')\n" +
    '    at fn (http://localhost:5173/src/errors.ts:3:41)\n' +
    '    at el.onclick (http://localhost:5173/src/errors.ts:4:5)'
}
* */
