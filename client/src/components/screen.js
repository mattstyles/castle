
import path from 'path'
import blessed from 'blessed'

const screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
  ignoreDockContrast: true,
  title: 'Castle',

  // For now punt this local
  log: path.join( __dirname, '../../debug.log' )
})

export default screen
