let shell = require('shelljs')
let fs = require('fs')
let EventEmitter = require('events')
let path = require('path')

let count = 0
let countEmitter = new EventEmitter()

let entryEjsDirs = shell.ls('build/app/views/*.ejs').filter(function(file) {
  return file
})

if (!entryEjsDirs && !entryEjsDirs.length) {
  shell.echo('Warning: no ejs file found! Please check shell.ls(build/app/views/*.ejs) run correctly!')
  shell.exit(1)
  return;
}

for(let i = 0; i < entryEjsDirs.length; i++) {
  (function(dir) {
    fs.readFile(dir, 'utf8', function(err, data) {
      if (err) throw err

      let linkReg = /(<link rel="stylesheet".*\s+href=(?:"[^"]*"|'[^']*')[^<]*>)/g
      let arrLinks = data.match(linkReg)

      let cssLinks = []
      let cssContents = []
      for(let j = 0; arrLinks && j < arrLinks.length; j++) {
        if (arrLinks[j].indexOf('stylesheet') !== -1) {
          cssLinks.push(arrLinks[j])
        }
      }
      
      if (!cssLinks || !cssLinks.length) {
        shell.echo('Warning: No css inline file in ' + dir + ' Please check it!')
        count++
        countEmitter.emit('countEvent')
      } else {
        cssLinks.forEach(item => {
          // let tmp = targetCssLink.match(/href="([^\'\"]+)/g)[0].split('=')
          let tmp = /href="\/([^\'\"]+)/g.exec(item)
          if (tmp && tmp.length >= 2) {
            let cssHref = path.resolve(tmp[1])

            cssContents.push(fs.readFileSync(cssHref, 'utf8'))
          }
        })

        let result = data.replace(
          /(<link rel="stylesheet".*\s+href=(?:"[^"]*"|'[^']*')[^<]*>)/,
          '<style amp-custom>' + cssContents.join('\r\n') + '</style>'
        ).replace(
          linkReg,
          ''
        )
        fs.writeFileSync(dir, result, 'utf-8')
        count++
        countEmitter.emit('countEvent')
      }
    })
  }(entryEjsDirs[i]))
}

countEmitter.on('countEvent', function() {
  if (count === entryEjsDirs.length) {
    liftDir()
  }
})

function liftDir() {
  var c2 = shell.exec('cp -r build/app/* build').code
  if (c2 !== 0) {
    shell.echo('Shell exec Failed: cp -r build/app build')
    shell.exit(1)
  } else {
    let c3 = shell.exec('rm -rf build/app').code
    if (c3 !== 0) {
      shell.echo('Shell exec Failed: rm -rf build/app')
      shell.exit(1)
    } else {
      shell.echo('Build Successfully!')
    }
  }
}
