const db = require("../../models/index");
const Property = db.property

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/developer-office-hours",
    version: "0.0.1",
    url: "https://github.com/stripe-samples"
  }
});
const webhook = async (req, res) => {
  try {
    let data, eventType;

    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      data = event.data;
      eventType = event.type;
  
    if(eventType =="payment_intent.created"){
      const paymentIntent = event.data.object;
      console.log(`💸 [${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);
    }
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // we can retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }
  
  
    if (eventType === 'payment_intent.succeeded') {
      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log('💰 Payment captured!');
    } else if (eventType === 'payment_intent.payment_failed') {
      console.log('❌ Payment failed.');
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const addPayment= async (req, res) => {
  try {

    const { paymentMethodType, currency, amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        payment_method_types: [paymentMethodType],
      });
      res.json({ clientSecret: paymentIntent.client_secret });
   
  } catch (err) {
    res.status(400).json({ error: { message: e.message } });
  }
};
module.exports = { 
  getProperty,addProperty
};