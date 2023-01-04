import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/health", async (req, res) => {
  res.json({
    message: "very well!"
  })
})

app.post("/error", async (req, res) => {
  console.log(req.path, req.body)

  res.json({
    message: "ok"
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
