[![Build Status](https://travis-ci.com/cgarnier/rust-admin.svg?token=pcN2pNaGWdS1MEM5rxq2&branch=master)](https://travis-ci.com/cgarnier/rust-admin)

[![Deploy to Docker Cloud](https://files.cloud.docker.com/images/deploy-to-dockercloud.svg)](https://cloud.docker.com/stack/deploy/)

# rust-admin

Rust server admin web interface. Full front interface, no backend server.

Similar to [Facepunch](https://github.com/Facepunch) [webrcon](https://github.com/Facepunch/webrcon/tree/master) project.

[View the demo](http://rust-admin.s3-website-eu-west-1.amazonaws.com/).

# Features

* server details
* chat
* console
* player list
* player detail

# How to use

## Using docker

```bash
docker run -d --name rust-admin -p 80:80 cgarnier/rust-admin:latest
```
Then visit [http://localhost](http://localhost).

### Environment variables:

  * RA_FORCE_HOST: Force the rust server rcon address and disallow user to login elsewhere.
  

# Contribute

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Changelog

## v1.3.0
  * Added richtext to the chat

## v1.2.0
  * Force rust host configuration
  * Fix unhandled exception on startup
  * Added deploy to cloud button
