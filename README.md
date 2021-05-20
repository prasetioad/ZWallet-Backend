# ZWallet API

<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
Ini adalah API untuk Zwallet dimana seseorang bisa melakukan transaksi antara satu dengan lainnya.

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

### Back End
* https://github.com/prasetioad/ZWallet-Backend

## Live Demo
* https://zwallet-sigma.vercel.app/login

## Author
* [@prasetioad](https://github.com/prasetioad)

