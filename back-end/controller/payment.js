const {userSubscribtion}= require("../prisma/module/subscription")

const stripe = require('stripe')(
    'sk_test_51NJz1GCYjm8PidiVwuPTy3xYksJBckVuvoNAy3s8WeDxxfK5qqw82poMmT4SwG7FMYZ28T4VwehuC1Awmpa5lJ8P004gASBq1l'
  );


 exports.payement= async  (req, res) =>{
    try {
      // create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      // Return the secret
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (error) {
      console.log(error)
      res.status(400).json({
        error: error.message,
      });
    }
  }

  exports.subscription= async (req, res)=>{

    try{
    const subscriptions=  userSubscribtion(req.body.uid)
      res.send(subscriptions)
    } catch (error){
      console.log(error)
      res.status(400).json({
        error: error.message,
      });
    }
  }