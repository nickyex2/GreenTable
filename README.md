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

## To host all microservices locally on docker
### convert all environment variables into docker-compose.yml
``` docker-compose --env-file ./.env convert ```

### start docker compose
``` docker compose up ```