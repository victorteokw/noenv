# noenv
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][cov-image]][cov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![PR Welcome][pr-image]][pr-url]

Noenv automatically loads your environment configurations in **only one line**.
It supports dynamic resolving from 'process.env' with default value support and non nil checking support.

## Usage

```javascript
const config = require('noenv');
```

## Loading Rules

If `process.env.NODE_ENV` is set, noenv tries to find a configuration file according to `NODE_ENV`.

If `NODE_ENV` is not present, noenv tries to find a default configuration file first. If it's found, then it's loaded and `NODE_ENV` is automatically set to the found file's name. If a default configuration file is not found, noenv tries to load a development configuration file. If it's still not found, noenv tries to load any file that can be loaded.

This behavior is the behavior that you always want. And it doesn't require you to write even a line of code.

Noenv will never merge your config data. It's error-prone and hard to understand when strange behavior happens.
You should define how your config should look like and make every config file the same format.

## Naming Convention

With noenv, you can put your configuration files in the directory that you like, with extension that you like and name it according to `NODE_ENV`.

### Supported Config Directory Names

* conf
* config
* configs
* configuration
* configurations
* env
* envs
* environment
* environments
* setting
* settings

### Supported File Extensions

_You need to install the corresponding parser yourselves._

* json
* js
* ts
* cson
* coffee
* yaml

### Supported Default Filenames

* local
* default

### Supported Development Filenames

* dev
* development

## Dynamic Resolving

It's not recommended to use this. However in some certain cases you may want to get configuration from environment variables.
In these cases, noenv helps you manage your environment variable mapping and make them clearly in only one place.
It supports default value and non nil checking.

```json
{
  "port": "process.env.PORT"
}
```

Noenv will automatically alter "process.env.PORT" with the value of process.env.PORT.

You can force this value to be exist by adding a "!". This will throw an error if the value is not exist.

```json
{
  "port": "process.env.PORT!"
}
```

You can also provide a default value for it with the following syntax.

```json
{
  "host": "process.env.HOST || 'www.example.com'",
  "port": "process.env.PORT || 3000"
}
```

You can set environment variable if it's not set by the following syntax.

```json
{
  "env.used.in.some.dependency": "process.env.CREDENTIAL ||= htkdiwlrtt6"
}
```

## Installation

```
npm install noenv --save
```

## Issues

For problems and issues, please open issues [here](https://github.com/zhangkaiyulw/noenv/issues).

[npm-image]: https://badge.fury.io/js/noenv.svg
[npm-url]: https://npmjs.org/package/noenv
[travis-image]: https://travis-ci.org/zhangkaiyulw/noenv.svg?branch=master
[travis-url]: https://travis-ci.org/zhangkaiyulw/noenv
[cov-image]: https://codecov.io/gh/zhangkaiyulw/noenv/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/zhangkaiyulw/noenv
[daviddm-image]: https://david-dm.org/zhangkaiyulw/noenv.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zhangkaiyulw/noenv
[license-image]: https://img.shields.io/github/license/zhangkaiyulw/noenv.svg
[license-url]: https://github.com/zhangkaiyulw/noenv/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: https://github.com/zhangkaiyulw/noenv/blob/master/CONTRIBUTING.md
