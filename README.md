<p align="center">
  <a href="" rel="noopener">
 <img height=auto src="https://user-images.githubusercontent.com/66661143/119433013-8eb8d800-bd3f-11eb-9778-4f1168f5379d.png" alt="logo"></a>
</p>
<div align="center">
  
[![made-with-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3e5e5f0e-297c-4bbe-85d7-12793c76f338/deploy-status)](https://zwallet-sigma.vercel.app/login)   
</div>

# ZWallet API

<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
This is an API for Zwallet, where anyone can transact easily.

## Built with

* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/)

## Requirment
* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/) for testing
* [Postman](https://www.postman.com/)
* Database


## Instalation
1. Clone the repo

```
git clone https://github.com/prasetioad/ZWallet-Backend.git

```
2. Install NPM Packages 
```
npm install
```
## Add .env file at root folder project, and add following
```
# -------------------------------
#           CONFIG DB
# -------------------------------
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=zwallet
DB_DIALECT=mysql

# --------------------------------
#           CONFIG GENERAL
# --------------------------------
PORT=3600
HOST=http://localhost:3600
SECRET_KEY=ZWallet2021
STATIC_FOLDER=/avatar

#----------------------------------
#           CONFIG MAILER
#----------------------------------

HOSTING = http://localhost:3000/
EMAIL = use your email here
PASSWORD = use your password here
```
## Run the app
``` 
npm run dev 
```

## Rest API
you can open postman collection [here](https://documenter.getpostman.com/view/14778352/TzRa6PEG)
or
[RUN IN POSTMAN](https://www.getpostman.com/collections/9ae47d30b8f57603a077)

### Front End
* https://github.com/prasetioad/ZWalletFrontEnd

## Live Demo
* https://zwallet-sigma.vercel.app/login

## Author
* [@prasetioad](https://github.com/prasetioad)

