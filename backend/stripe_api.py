from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe
from dotenv import load_dotenv
import os
load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

app = Flask(__name__)
CORS(app)

@app.route('/api/payment', methods=['POST'])
def payment():
    # create a paymentmethod
    pm_string = stripe.PaymentMethod.create(
        type="card",
        card={
            "number": "4000000000000002",
            "exp_month": 8,
            "exp_year": 2025,
            "cvc": "314",
        }
    )
    #create a paymentintent and make payment straight away
    try:
        result = stripe.PaymentIntent.create(
            amount=10000,
            currency='sgd',
            confirm=True,
            payment_method=pm_string['id'])
        return jsonify(result), 200
    except Exception as e:
        return {"message": f'{e}'}, 400

if __name__ == "__main__":
    app.run(debug=True, port=5016, host='0.0.0.0')

