
import path from 'path'
import blessed from 'blessed'

const screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
  ignoreDockContrast: true,
  title: 'Castle'
})

screen.key( 'escape', () => process.exit( 0 ) )

export default screen
