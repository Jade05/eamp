#!/usr/bin/env bash

pm2 start build/server.js --name eamp -o ./access.log -e ./error.log --merge-logs --log-date-format "YYYY-MM-DD HH:mm:ss "
