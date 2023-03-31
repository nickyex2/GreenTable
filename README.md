# ESD-Group6

## set environ variables into a .env file

``` 
TELEGRAM_API_SESSION="********************************"
TELEGRAM_API_ID="***********************"
TELEGRAM_API_HASH="********************************"
SENDGRID_API_KEY="********************************"
STRIPE_SECRET_KEY="********************************"
CATALOG_DB_URL="mongodb+srv://<user>:<pass>@cluster0.cljlebi.mongodb.net/?retryWrites=true&w=majority"
CUSTOMER_DB_URL="mongodb+srv://<user>:<pass>@cluster0.cljlebi.mongodb.net/?retryWrites=true&w=majority"
BOOKING_DB_URL="mongodb+srv://<user>:<pass>@cluster0.cljlebi.mongodb.net/?retryWrites=true&w=majority"
WAITLIST_DB_URL="mongodb+srv://<user>:<pass>@cluster0.cljlebi.mongodb.net/?retryWrites=true&w=majority"  
```

## To host all microservices locally on docker (windows only)
Navigate to cmd prompt and run the run-docker.bat file

### Use snapshot to get kong running seamlessly
Navigate to Konga UI and import the snapshot in


## Use application from Netlify
https://green-table.netlify.app/

#### Test customer login
username: nicholas
password: test

#### Test business login
Username: Business
Password: test

#### on the database side customers have been created
username: nicholas
credit card: set to pass

username: chiok
credit card: set to pass

username: daniel
credit card: set to fail

username: colin
credit card: set to fail

username: daryl
credit card: set to pass