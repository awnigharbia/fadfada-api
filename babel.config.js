const presets = [['@babel/preset-env']]
const plugins = [
  ['@babel/plugin-transform-spread'],
  ['@babel/plugin-proposal-do-expressions'],
  ['@babel/plugin-proposal-throw-expressions'],
]

module.exports = {presets, plugins}
