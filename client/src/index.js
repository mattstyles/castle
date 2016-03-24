
import React from 'react'
import { render } from 'react-blessed'
import chalk from 'chalk'

import screen from './core/screen'
import { dispatch, register } from './dispatchers/appDispatcher'
import { grab, register as keyRegister } from './core/keypress'
import { log } from './components/console'

import Root from './components/root'

render( <Root />, screen )


var logs = [
  'debug log',
  chalk.green( 'hello' ),
  chalk.yellow( 'says' ),
  'johnny',
  { foo: 'bar' },
  'mika',
  chalk.cyan( 'cuan' )
]

setTimeout( function loop() {
  log.info( logs.pop() )

  if ( logs.length ) {
    setTimeout( loop, 100 )
  }
}, 100 )


let token = register( source => {
  return source.subscribe( event => {
    log.info( chalk.green( 'DISPATCH' ), event )
  })
})

// The input grabber will stomp over this
keyRegister( source => {
  return source
    .filter( event => event.key.name === 'o' )
    .subscribe( event => {
      dispatch( 'OPEN' )
    })
})



setTimeout( () => {
  log.info( 'adding main input handler' )
  let dispose = keyRegister( source => {
    return source.subscribe( event => {
      log.info( 'yo yo yo bitches' )
    })
  })
  setTimeout( () => {
    log.info( 'disposing of first handler' )
    dispose()
  }, 2000 )
}, 2000 )

setTimeout( () => {
  log.info( 'reinstating keypress handler' )
  keyRegister( source => {
    return source.subscribe( event => {
      log.info( chalk.grey( 'NEW' ), event.key.name )
    })
  })
}, 5000 )

setTimeout( () => {
  log.info( 'grabbing input stream' )
  let release = grab( source => {
    return source.subscribe( event => {
      log.info( chalk.cyan( 'GRABBED' ), event.key.name )
    })
  })

  setTimeout( () => {
    log.info( 'releasing input stream' )
    release()
  }, 2000 )
}, 8000 )
