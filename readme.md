# Onibe Express

- Copy config.sample.json to config.json

```
npm install -g gulp
npm install
gulp
```
- Open on localhost:3000

## Requirements 
- node v6.0.0 and above, v7.0.0 is still having problems with gulp.

## Guidelines
Javascript:
- set your IDE to follow .jshintrc
- Use es6 syntax

Styles 
- 
-

## Todos
- Server Unit Testing Via mocha
- Client Unit Testing via karma
- Deployment scripts
- Dockerfile

Resources
```
http://devdocs.io/offline
```

DEBUGGING MODE
```
DEBUG=* npm start
DEBUG=onibe:server npm start
```

Start with pm2

```
git pull && pm2 start npm --name "onibe" -- start
```

## Contributors
Submit a pull-request to be list as an contributor
- lakepower