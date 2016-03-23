
import Koa from 'koa'
import Logger from 'koa-bunyan-log'
import IO from 'koa-socket'

const app = new Koa()
const io = new IO()
const logger = new Logger({
  name: 'CA'
})

io.attach( app )

io.use( logger.attach({
  as: 'log'
}))

io.on( 'connection', ctx => {
  logger.info( 'Client connected:', ctx.socket.id )
})

io.on( 'message', ( ctx, data ) => {
  ctx.log.info( 'message event received:', data )

})

const PORT = process.env.PORT || 3000
app.server.listen( PORT, () => {
  logger.info( 'Listening on', PORT )
})
