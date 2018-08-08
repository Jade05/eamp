# node.js amp framework

[![Greenkeeper badge](https://badges.greenkeeper.io/Jade05/eamp.svg)](https://greenkeeper.io/)

## Description

eamp是从我们AMP项目实战中提取出来的简化版框架，能够让我们快速开启AMP Node项目，使用者无需从0开始搭建，更能专注AMP页面开发。

特点：
1. 快速搭建基于Node的AMP项目
2. 内置自动化上线打包工具，自动将css打包内联，符合AMP规范
3. 目录结构清晰，职责划分清楚，便于多人开发协作

## Installation

```sh
$ npm i -g eamp
```

## Usage

Create the app:

```sh
$ eamp /tmp/test --appid=12345 --type=h5 && cd /tmp/test
```

Install and start:

```sh
$ npm i
$ gulp
$ npm start
```

Publish:
```sh
$ gulp
$ sh build.sh
```