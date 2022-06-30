import * as admin from "firebase-admin";
import { buffer } from "micro";

//Secure a connection to firebase from backend
const {firebasePermission} = require("../../../permission.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(firebasePermission),
    })
  : admin.app();

//Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECREY_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
  // console.log(session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} had been added to DB`);
    })
    .catch((err) => console.log(err));
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;
    //Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    } catch (error) {
      return res.status(400).send(`Weebhook error : ${error.message}`);
    }

    //Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //fullfill the order
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(err.message));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
