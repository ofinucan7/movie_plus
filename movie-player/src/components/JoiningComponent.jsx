import React, { useState } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const JoiningComponent = () => {
  const navigate = useNavigate();
  
  // set up data about stored information
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plan: '',
    email: '',
    password: '',
    confirmPassword: '',
    cardNumber: '',
    exp: '',
    cvv: '',
    nameOnCard: '',
    zip: '',
  });

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    // if some error occurs --> print out the error
    if (error) {
      console.error("Stripe error:", error.message);
      return;
    }

    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      stripe_token: token.id,
      subscription_type: formData.plan
    };

    // try to do the post method
    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // if the register works --> go to login page
      if (res.ok) {
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.detail || "Something went wrong");
      }
    } catch (err) {
      console.error("Server error:", err);
    }

    // navigate to login if something went wrong
    navigate('/login');
  };

  // set stripe vars
  const stripe = useStripe()
  const elements = useElements()

  // handeling transitions
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const updateField = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-gray-200 text-black flex flex-col items-center px-6 py-12">
        
        {/* Step 1 */}
        {step === 1 && (
          <motion.div className="max-w-xl w-full text-center bg-white p-8 rounded shadow-md" key="step1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.4 }}>
            <div className="text-4xl mb-4 border-4 border-black w-fit mx-auto p-4 rounded-full">
              <FaRegCheckCircle className="text-[#3535df]" />
            {/* Main body of step 1*/}
            </div>
              <p className="uppercase text-sm tracking-widest mb-2">Step 1 of 4</p>
              <h1 className="text-3xl font-bold mb-6">Choose your plan.</h1>
                <ul className="text-left space-y-3 text-lg">
                  <li className="flex items-center gap-2"> <FaRegCheckCircle className="text-[#3535df]" /> No commitments, cancel anytime. </li>
                  <li className="flex items-center gap-2"> <FaRegCheckCircle className="text-[#3535df]" /> Endless entertainment for one low price. </li>
                  <li className="flex items-center gap-2"> <FaRegCheckCircle className="text-[#3535df]" /> Stream on all your devices. </li> 
                </ul>

                <button onClick={handleNext} className="bg-[#3535df] text-white px-8 py-3 mt-8 font-bold rounded hover:bg-[#20207a] transition"> Next </button>
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="max-w-5xl w-full bg-white p-8 rounded shadow-md border border-black">
            <p className="text-sm uppercase text-gray-500 mb-4"> Step 2 of 4 </p>
            <h1 className="text-2xl font-bold mb-6"> Choose the plan that’s right for you </h1>

            {/* Plan options */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                { name: 'Student', price: '$8.99', quality: 'Good', resolution: '1080p', ads: 'No ads' },
                { name: 'Standard', price: '$12.99', quality: 'Amazing', resolution: '1440p', ads: 'No ads' },
                { name: 'Premium', price: '$17.99', quality: 'Best', resolution: '4K + HDR', ads: 'No ads' }
                ].map((plan) => (
                <div key={plan.name} onClick={() => updateField('plan', plan.name)} className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${ formData.plan === plan.name ? 'border-4 border-[#3535df] shadow-lg' : 'border border-gray-300 hover:border-[#20207a]' }`}>
                  <h2 className="font-bold text-lg">{plan.name}</h2>
                  <p className="text-sm">{plan.price}</p>
                  <p className="text-sm text-gray-600">{plan.quality} quality</p>
                  <p className="text-sm text-gray-600">{plan.resolution}</p>
                  <p className="text-sm text-gray-600">Ads: {plan.ads}</p>
                </div>
                ))}
            </div>

            <button onClick={handleNext} className="bg-[#3535df] text-white px-8 py-3 mt-8 font-bold rounded hover:bg-[#20207a]" disabled={!formData.plan}> Next </button>
          </motion.div>
        )}

        {/* Step 3 */}
        {step === 3 && (
        <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-md w-full bg-white p-8 rounded shadow-md border border-black">
          <p className="text-sm uppercase text-gray-500 mb-2">Step 3 of 4</p>
          <h2 className="text-2xl font-bold mb-2">Create a password to start your membership</h2>
            <p className="text-sm text-gray-600 mb-6">Just a few more steps and you're done!</p>

            {/* Get all the input fields */}
            <input type="text" placeholder="Username" value={formData.username} onChange={(e) => updateField('username', e.target.value)} className="w-full border px-4 py-3 mb-4 rounded"/>
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className="w-full border px-4 py-3 mb-4 rounded"/>
            <input type="password" placeholder="Password" value={formData.password} onChange={(e) => updateField('password', e.target.value)} className="w-full border px-4 py-3 mb-4 rounded"/>

            <button onClick={handleNext} className={`w-full py-3 font-bold rounded transition ${ formData.email && formData.username && formData.password ? 'bg-[#3535df] text-white hover:bg-[#20207a]' : 'bg-gray-400 text-white cursor-not-allowed'}`} disabled={!formData.email || !formData.username || !formData.password} >
            Next
            </button>
          </motion.div>
          )}

        {/* Step 4 */}
        {step === 4 && (
        <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-md w-full bg-white p-8 rounded shadow-md border border-black">
          <p className="text-sm uppercase text-gray-500 mb-2">Step 4 of 4</p>
          <h2 className="text-2xl font-bold mb-4">Set up your credit or debit card</h2>

          <div className="border p-4 rounded">
            <CardElement />
          </div>

          {/* Message to not be dumb and enter your card info to a stranger's website :) */}
          <div className="text-sm text-gray-400 ">
            <p> Please do not enter your actual card information. Use the generic card info below provided by Stripe. </p>
            <ul>
              <li> Card Number: 4242 4242 4242 4242 </li>
              <li> Expiration: 12/57 </li>
              <li> CVC: 000 </li>
              <li> Zip: 00001 </li>
            </ul>
          </div>
          
          <button onClick={handleSubmit} disabled={!stripe || !formData.email || !formData.username || !formData.password} className={`w-full py-3 mt-6 font-bold rounded transition ${ stripe ? 'bg-[#3535df] text-white hover:bg-[#20207a]' : 'bg-gray-400 text-white cursor-not-allowed' }`} >
          Start Membership
          </button>

        </motion.div>
        )}


      {/* Back button */}
      {step > 1 && step < 4 && (
        <button onClick={handleBack} className="mt-8 text-sm underline text-gray-500"> Go Back </button>
      )}
      </div>
    </AnimatePresence>
  );
};

export default JoiningComponent;