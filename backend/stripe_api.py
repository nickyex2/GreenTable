import stripe
from dotenv import load_dotenv
import os
load_dotenv()
stripe.api_key = os.getenv("STRIPE_API_KEY")

# create a paymentmethod
stripe.PaymentMethod.create(
    type="card",
    card={
        "number": "4242424242424242",
        "exp_month": 8,
        "exp_year": 2020,
        "cvc": "314",
    }
)

#create a paymentintent
stripe.PaymentIntent.create(
    amount=1000,
    currency='sgd')
