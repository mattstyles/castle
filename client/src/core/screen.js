
import path from 'path'
import blessed from 'blessed'

const screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
  ignoreDockContrast: true,
  title: 'Castle'
})

export default screen
