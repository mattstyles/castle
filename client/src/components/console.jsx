
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import EventEmitter from 'eventemitter3'
import React, { Component } from 'react'
import Rx from 'rx-lite'

const LOG_ROTATE_MAX = 20


// Stop console from doing anything funky
console.log = function () { }
console.warn = function () { }
console.error = function () { }
console.info = function () { }
console.debug = function () { }


const emitter = new EventEmitter()
const source = Rx.Observable.fromEvent( emitter, 'data' )

const logfile = fs.createWriteStream( path.join( __dirname, '../../debug.log' ), {
  encoding: 'utf8'
})


/**
 * Stringifies objects, otherwise just joins the arg list
 */
function sanitizeLogs( args ) {
  return args
    .map( item => {
      if ( typeof item === 'object' ) {
        return JSON.stringify( item, null, '  ' )
      }

      return item
    })
    .join( ' ' )
}


/**
 * Emits logs
 */
export const log = {
  info: function() {
    let l = sanitizeLogs( [].slice.call( arguments ) )
    logfile.write( 'INFO ' )
    logfile.write( chalk.stripColor( l ) + '\n' )
    emitter.emit( 'data', l )
  },

  error: function() {
    let l = sanitizeLogs( [].slice.call( arguments ) )
    logfile.write( 'ERR ' )
    logfile.write( chalk.stripColor( l ) + '\n' )
    emitter.emit( 'data', l )
  }
}


/**
 * Debug console
 */
export class Console extends Component {
  constructor( props ) {
    super( props )
  }

  componentDidMount() {
    source.subscribe( log => this.refs.console.log( log ) )
  }

  render() {
    let props = {
      ref: 'console',
      label: ' debug ',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 10,
      scrollable: true,
      mouse: true,
      border: {
        type: 'line'
      },
      scrollbar: {
        bg: 'grey'
      },
      style: {
        border: {
          fg: 'white'
        }
      }
    }

    return <log { ...props }/ >
  }
}
