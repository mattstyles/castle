
import EventEmitter from 'eventemitter3'
import Rx from 'rx-lite'

const emitter = new EventEmitter()
const source = Rx.Observable.fromEvent( emitter, 'data' )

/**
 * Passes the source to the callback so that the consumer can optionally
 * filter, reduce etc the source stream
 */
export function register( callback ) {
  return callback( source )
}

/**
 * Pass through for emitting events
 */
export function dispatch( event ) {
  emitter.emit( 'data', event )
}
