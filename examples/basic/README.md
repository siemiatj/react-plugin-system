# Basic example

This example is a simple ReactJS application based on [gaeron's](https://github.com/gaearon) [Idiomatic Redux tutorial](https://egghead.io/series/building-react-applications-with-idiomatic-redux). It is then extended with a plugin to add a separate section, which is basically a standalone app. There's no communication between the two whatsoever.

For the purpose of this example a bundled [rps-basic plugin](https://github.com/siemiatj/rps-basic) is used.

## Dev environment

- install npm and node.js

- make sure you have all dependencies by:
> npm install

- Then you should run node server by:
> npm start

## Production environment
When running in production mode you will need to build the static version of the app and serve it from an http-compatible server. Here's a quick guide how you can run production mode locally.

## Production
In case of static version building execute:
> npm run build-prod

### Running
The easiest way to test production build is by serving it via a simple [http-server](https://www.npmjs.com/package/http-server). You can install it globally with npm :
> npm install http-server -g

and then run it pointing to your dist folder:
> http-server ./dist

Now open your browser and go to `localhost:8080` to see the application running.
