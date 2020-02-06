const fs = require('fs')
const mode = process.argv[2]
const projectName = process.argv[3]

if (!projectName) {
  throw new Error('打包项目名称不能为空：npm run build projectName')
}

fs.readFile('./config/projectConfig.json', function (err, data) {
  if (err) {
    console.error(err)
  }
  data = JSON.parse(data.toString())

  data.name = projectName
  data.srcPath = './src/' + projectName + '/'
  data.distPath = '../deploy/' + projectName + '/'

  if (mode === 'yufa') {
    data.publicPath = '/'
  } else {
    data.publicPath = '//www.bootcdn.cn/'
  }

  fs.writeFile('./config/projectConfig.json', JSON.stringify(data), function (err) {
    if (err) {
      console.error(err)
    }

    const exec = require('child_process').execSync
    exec(
      'webpack --config config/webpack.prod.conf.js --progress true --env.mode=production',
      { stdio: 'inherit' }
    )
  })
})
