
import React from 'react'
import { render } from 'react-blessed'

import screen from './components/screen'
import { dispatch, register } from './dispatchers/appDispatcher'

import Root from './components/root'

render( <Root />, screen )
