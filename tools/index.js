let shell = require('shelljs')
let fs = require('fs')
let EventEmitter = require('events')

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

      let linkReg = /(<link.*\s+href=(?:"[^"]*"|'[^']*')[^<]*>)/g
      let arrLinks = data.match(linkReg)

      let cssLinks = []
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
          let targetCssLink = item
          
          let tmp = targetCssLink.match(/href="([^\'\"]+)/g)[0].split('=')
          
          if (targetCssLink && tmp && tmp.length == 2) {
            let cssHref = tmp[1].slice(1)

            cssHref.indexOf('<%-') == -1 && fs.readFile(cssHref, 'utf8', function(err2, str) {
              if (err2) throw err2
    
              let result = data.replace(
                targetCssLink,
                '<style amp-custom>' + str + '</style>'
              )
              fs.writeFile(dir, result, 'utf-8', function (err3) {
                if (err3) throw err3
                count++
                countEmitter.emit('countEvent')
              })
            })
          } else {
            count++
            countEmitter.emit('countEvent')
          }
        })
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




