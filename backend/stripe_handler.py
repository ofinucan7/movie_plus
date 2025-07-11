import os
import stripe

# get the secret key
stripe.api_key = os.getenv("STRIPE_SECRET")

def create_stripe_customer(email, card_token):
    customer = stripe.Customer.create(
        email=email,
        source=card_token 
    )
    return customer.id