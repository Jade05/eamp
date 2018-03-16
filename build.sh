#!/usr/bin/env bash

## green to echo 
function green(){
  echo -e "\033[32m[ $1 ]\033[0m"
}

## Error
function bred(){
    echo -e "\033[31m\033[01m[ $1 ]\033[0m"
}

## warning
function byellow(){
    echo -e "\033[33m\033[01m[ $1 ]\033[0m"
}

## main

rm build -rf && mkdir build

cp -r app/ build/

dirJS=`find app -name '*.js'`

for t in ${dirJS[@]}
do
  green "success: $t"
  babel $t -d build
done

node ./tools/index.js
