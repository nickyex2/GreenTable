# ESD-Group6

## set environ variables into a .env file

``` 
TELEGRAM_API_SESSION="********************************"
TELEGRAM_API_ID="***********************"
TELEGRAM_API_HASH="********************************"
SENDGRID_API_KEY="********************************"
STRIPE_SECRET_KEY="********************************"
GOOGLE_API_KEY="************************************"
CATALOG_DB_URL="mongodb+srv://<user>:<pass>@cluster0.cljlebi.mongodb.net/?retryWrites=true&w=majority"
CUSTOMER_DB_URL="mongodb+srv://<user>:<pass>@cluster0.cljlebi.mongodb.net/?retryWrites=true&w=majority"
BOOKING_DB_URL="mongodb+srv://<user>:<pass>@cluster0.cljlebi.mongodb.net/?retryWrites=true&w=majority"
WAITLIST_DB_URL="mongodb+srv://<user>:<pass>@cluster0.cljlebi.mongodb.net/?retryWrites=true&w=majority"  
```

## To host all microservices locally on docker (windows only)
Navigate to cmd prompt and run the run-docker.bat file

### start docker compose manually
``` docker-compose --env-file .env convert ```
``` docker-compose up ```

### Use snapshot to get kong running seamlessly
Navigate to Konga UI and import the snapshot in
Restore the services first then restore the routes

## Kubernetes Deployment
Backend Microservices are hosted on Google Kubernetes Engine with Kong as the API Gateway

### Kubernetes endpoints
All microservices:  http://34.124.236.222:8000/api/v1/... <br>
RabbitMQ:           http://34.87.124.206:15672/#/

#### Paths
Booking:        /api/v1/booking ==> Resolves as /booking <br>
Customer:       /api/v1/customer ==> Resolves as /customer <br>
Catalog:        /api/v1/catalog ==> Resolves as /catalog <br>
Waitlist:       /api/v1/waitlist ==> Resolves as /waitlist <br>
Make-Payment:   /api/v1/pay ==> Resolves as /make_payment <br>
Place-Booking:  /api/v1/place ==> Resolves as /booking/place_booking <br>
Cancel-Booking: /api/v1/cancel ==> Resolves as /booking/cancel <br>

## Use application from Netlify
https://green-table.netlify.app/

#### Test customer login
username: nicholas <br>
password: test <br>

#### Test business login
Username: Business <br>
Password: test <br>

#### on the database side customers have been created
username: nicholas <br>
credit card: set to pass <br><br>

username: chiok <br>
credit card: set to pass <br><br>

username: daryl <br>
credit card: set to pass <br><br>

username: daniel <br>
credit card: set to fail <br><br>

username: colin <br>
credit card: set to fail 
