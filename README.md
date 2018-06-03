# noenv

![build status](https://travis-ci.org/zhangkaiyulw/noenv.svg?branch=master)

Noenv automatically loads your config in **only one line**. It even supports dynamic resolving from 'process.env'.

## Usage

```javascript
const config = require('noenv');
```

## Loading Rules

If `process.env.NODE_ENV` is set, noenv tries to find a configuration file according to `NODE_ENV`.

If `NODE_ENV` is not present, noenv tries to find a default configuration file first. If it's found, then it's loaded and `NODE_ENV` is automatically set to the found file's name. If a default configuration file is not found, noenv tries to load a development configuration file. If it's still not found, noenv tries to load any file that can be loaded.

This behavior is the behavior that you always want. And it doesn't require you to write even a line of code.

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

### Supported File Extensions

* json
* js
* ts
* cson
* coffee
* es6

### Supported Default Filenames

* local
* default

### Supported Development Filenames

* dev
* development

## Dynamic Resolving

It's not recommended to use this. However some platforms depend heavily on environment variables. In these cases, we can config like this.

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
  "port": "process.env.PORT || 3000"
}
```

## Installation

```
npm install noenv --save
```

## Issues

For problems and issues, please open issues [here](https://github.com/zhangkaiyulw/noenv/issues).
