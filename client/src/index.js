
import React from 'react'
import { render } from 'react-blessed'
import chalk from 'chalk'

import screen from './components/screen'
import { dispatch, register } from './dispatchers/appDispatcher'
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
