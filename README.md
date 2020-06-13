# VIROLL

The following is source code for Viroll.

Application location : https://viroll.herokuapp.com/

Application Features:

- Web app will give details on Coronavirus Statistics for any country the user chooses

- User can compare country stats with other countries.

- Application features charts that show Coronavirus spikes for any certain country.

- Application uses an external public api to get up to date and accurate data on the coronavirus pandemic

---

## `.github`

Contains the automated testing script which is triggered when a new commit is pushed to master

## `.vscode`

Contains the config file to auto lint on save (personal file)

## `frontend`

Contains all source code for the web application

- Application has been made using the [Vue.js](https://vuejs.org/) framework due to the easiness of making dynamic single page web applications.

## `UI`

Contains all the UI mockups and XD files

# HEROKU

This application has been pushed to heroku and is currently on Free Dyno Usage (550hrs of use per month on the herok servers)

# API

This application is making use of the public API - COVID19API. This API was created by [Kyle Redelinghuys](https://ksred.me/) who sourced the data from [Johns Hopkins CSSE](https://github.com/CSSEGISandData/COVID-19). This API sourced data from [WHO](https://www.who.int/).

Documentation for the API - [POSTMAN](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest)

Please support this API buy going to their site - [COVID19API](https://covid19api.com/)

# Node Execution

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Run the Build file with Node Express

```
npm start
```

---

This application was created as a hobby during the COVID-19 pandemic.
