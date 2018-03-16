#!/usr/bin/env bash
pm2 show eamp
if [ $? -eq 0 ]; then
  pm2 delete eamp
fi
