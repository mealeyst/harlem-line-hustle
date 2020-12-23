import colors from './colors'

export const background = {
  attachment: (() => {
    const values = [
      'fixed',
      'local',
      'scroll'
    ]
    const output = {}
    values.forEach((value) => {
      output[value] = `background-attachment: ${value};`
    })
    return output
  })(),
  clip: (() => {
    const values = {
      'border': 'border-box',
      'padding': 'padding-box',
      'content': 'content-box',
      'text': 'text'
    }
    const output = {}
    Object.keys(values).forEach((key) => {
      output[key] = `background-clip: ${values[key]};`
    })
    return output
  })(),
  color: (()=> {
    const output = {}
    Object.keys(colors).forEach((name) => {
      const color = colors[name]
      output[name] = {}
      Object.keys(color).forEach((shade) => {
        output[name][shade] = `background-color: ${colors[name][shade]};`
      })
    })
    return output
  })(),
  position: (() => {
    const values = {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      leftBottom: 'left bottom',
      leftTop: 'left top',
      right: 'right',
      rightBottom: 'right bottom',
      rightTop: 'right top',
      top: 'top'
    }
    const output = {}
    Object.keys(values).forEach((key) => {
      output[key] = `background-position: ${values[key]};`
    })
    return output
  })(),
  repeat: (() => {
    const values = {
      repeat: 'repeat',
      noRepeat: 'no-repeat',
      repeatX: 'repeat-x',
      repeatY: 'repeat-y',
      round: 'round',
      space: 'space'
    }
    const output = {}
    Object.keys(values).forEach((key) => {
      output[key] = `background-repeat: ${values[key]};`
    })
    return output
  })(),
  size: (() => {
    const values = [
      'auto',
      'cover',
      'contain'
    ]
    const output = {}
    values.forEach((value) => {
      output[value] = `background-size: ${value};`
    })
    return output
  })()
}