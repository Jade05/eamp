const readline = require('readline');
const sysPath = require('path');
const fs = require('fs-extra');

function confirm(msg, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(msg, function(input) {
    rl.close();
    callback(/^y|yes|ok|true$/i.test(input));
  });
}

function createApplication(app_name, app_id, type, path) {
  console.log(`creating [type]${type} [appName]${app_name} [appId]${app_id} [path]${path}...`)
  
  const templatePath = sysPath.join(__dirname, '..', 'template');
  fs.copySync(templatePath, path);

  const params = {
    APP_NAME: app_name,
    APP_ID: app_id,
    TYPE: type,
  }

  replace(path + '/app.config.js', params);
  replace(path + '/app/config/index.js', params);
  replace(path + '/package.json', params);
}

function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files) {
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  })
}

function exit(code) {
  function done() {
    if (!(draining--)) _exit(code);
  }

  var draining = 0;
  var streams = [process.stdout, process.stderr];

  exit.exited = true;

  streams.forEach(function(stream) {
    draining += 1;
    stream.write('', done);
  });

  done();
}

function replace(path, params) {
  let tpl = fs.readFileSync(path, 'utf8').toString();
  const regx = /\{\{(.*?)\}\}/;
  let result;
  while((result = regx.exec(tpl)) !== null) {
    const key = result[1];
    const value = params[key];
    tpl = tpl.replace(new RegExp(`\\{\\{${key}\\}\\}`), value);
  }
  return write(path, tpl);
}

function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || 0666 });
}

module.exports = (program) => {
  const destinationPath = program.args.shift() || '.';
  const appName = sysPath.basename(sysPath.resolve(destinationPath));
  const appId = program.appid;
  let type = program.type || 'online';

  if (type !== 'online' || type !== 'h5') {
    type = 'online';
  }

  if (!appId || !type) {
    console.err('Errpr: type or appId must be exist!');
    exit(1);
  }

  emptyDirectory(destinationPath, function (empty) {
    if (empty || program.force) {
      createApplication(appName, appId, type, destinationPath);
    } else {
      confirm('destination is not empty, continue? [y/n]', function(ok) {
        if (ok) {
          process.stdin.destroy();
          createApplication(appName, appId, type, destinationPath);
        } else {
          console.error('aborting');
          exit(1);
        }
      })
    }
  })
}