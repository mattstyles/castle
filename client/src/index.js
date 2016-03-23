
import { dispatch, register } from './dispatchers/appDispatcher'


console.log( 'starting' )

var token = register( source => {
  return source.subscribe( data => {
    if ( data.type === 'update' ) {
      console.log( 'update' )
      return
    }

    console.log( 'unspecified event' )
  })
})


setTimeout( () => {
  console.log( 'dispatch nope' )
  dispatch({
    type: 'nope'
  })
}, 1000 )

setTimeout( () => {
  console.log( 'dispatch update' )
  dispatch({
    type: 'update'
  })
}, 1500 )

setTimeout( () => {
  console.log( 'dispatch oops' )
  dispatch({
    type: 'oops'
  })
  console.log( 'token disposing' )
  token.dispose()
}, 2000 )

setTimeout( () => {
  console.log( 'dispatch update' )
  dispatch({
    type: 'update'
  })
}, 2500 )
