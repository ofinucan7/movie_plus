import React from 'react'
import Header from '../components/Header'
import JoiningComponent from '../components/JoiningComponent'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripe_publishable_key = 'pk_test_51RhtGvPBcv1MHQbzoe1LDDD36l9dTi6KdbRdNJZ5livlQmXb2LrxFk0cuqUZH6k9qB3Nwsxe4APAFDJJHc4HGJbs001yMI6rC7' 
const loaded_stripe_key = loadStripe(stripe_publishable_key)

const Joining = () => {
  return (
    <div>
        <Header />
        <Elements stripe={loaded_stripe_key}>
          <JoiningComponent />
        </Elements>
    </div>
  )
}

export default Joining