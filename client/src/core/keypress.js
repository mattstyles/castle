
import Rx from 'rx-lite'
import screen from './screen'

import { log } from '../components/console'


const stdin = Rx.Observable.fromEvent( screen, 'keypress', ( ch, key ) => {
  return { ch, key }
})

const pauser = new Rx.Subject()
const stream = stdin.pausable( pauser )


// Master kill switch, always available
stdin
  .filter( event => event.key.ctrl && event.key.name === 'c' )
  .subscribe( event => {
    log.info( 'exiting' )
    pauser.onNext( false )
    setTimeout( () => {
      process.exit( 0 )
    }, 1000 )
  })


/**
 * Returns source to allow tacking subscribers
 */
export function register( callback ) {
  log.info( 'registering' )
  let subscriber = callback( stream )

  // Make sure the stream is started for this consumer
  pauser.onNext( true )

  // Return a method to dispose of the input
  if ( subscriber ) {
    return subscriber.dispose.bind( subscriber )
  }
}

/**
 * Takes control of the input event stream
 *
 * @TODO there could be an issue here with pausing the input stream for other
 * consumers but then the register function gets called and resumes the stream
 */
export function grab( callback ) {
  pauser.onNext( false )

  let subscriber = callback( stdin )

  return function dispose() {
    pauser.onNext( true )
    if ( subscriber ) {
      subscriber.dispose()
    }
  }
}
