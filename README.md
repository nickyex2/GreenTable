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

### Use snapshot to get kong running seamlessly
Navigate to Konga UI and import the snapshot in
Restore the services first then restore the routes

### Kubernetes endpoints
All microservices:  http://34.124.236.222:8000/api/v1/...
RabbitMQ:           http://34.87.124.206:15672/#/

#### Paths
Booking:        /api/v1/booking ==> Resolves as /booking
Customer:       /api/v1/customer ==> Resolves as /customer
Catalog:        /api/v1/catalog ==> Resolves as /catalog
Waitlist:       /api/v1/waitlist ==> Resolves as /waitlist
Make-Payment:   /api/v1/pay ==> Resolves as /make_payment
Place-Booking:  /api/v1/place ==> Resolves as /booking/place_booking
Cancel-Booking: /api/v1/cancel ==> Resolves as /booking/cancel

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

username: daryl
credit card: set to pass

username: daniel
credit card: set to fail

username: colin
credit card: set to fail

### start docker compose
``` docker compose up ```

### Kubernetes Deployment
Website is hosted on Netlify
Backend Microservices are hosted on Google Cloud
