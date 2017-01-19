# rust-admin

Rust server admin web interface. Full front interface, no backend server.

Similar to [Facepunch](https://github.com/Facepunch) [webrcon](https://github.com/Facepunch/webrcon/tree/master) project.

[View the demo](https://rust-admin.nibor.me).

# Features

* server details
* chat
* console
* player list
* player detail

# How to use

## Using docker

```
docker run -d --name rust-admin -p 80:80 cgarnier/rust-admin:latest
```

Then visit [http://localhost](http://localhost).

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
