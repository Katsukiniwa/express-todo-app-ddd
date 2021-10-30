import express from 'express'
import { boardRouter } from './infrastructure/router'

const app = express()

app.use(boardRouter)

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

app.listen(Number(process.env.PORT), () => {
  console.log(`listen on ${process.env.PORT} PORT`)
})

export default app
