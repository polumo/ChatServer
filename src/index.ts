import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { createBunWebSocket } from 'hono/bun'
import type { ServerWebSocket } from 'bun'
import connectDB from './config/db.ts'
import apiRoutes from './routes/index.ts'
import { responseMiddleware } from './middleware/responseMiddleware.ts'

connectDB()

const app = new Hono()
app.use(cors(), prettyJSON(), responseMiddleware)

// const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>()

app.route('/', apiRoutes)
// app.get('/ws', upgradeWebSocket((c) => {
//   return {
//     onOpen(_event, ws) {
//       ws.send('Hello WebSocket')
//     },
//     onClose(_event, ws) {
//       ws.send('Goodbye WebSocket')
//     },
//   }
// }))

export default {
  fetch: app.fetch,
  // websocket,
}
