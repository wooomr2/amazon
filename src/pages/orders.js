import {
  collection, getDocs, limit, orderBy, query
} from "firebase/firestore";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import { db } from "../../firebase";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Order from "../components/Order";

function orders({ orders }) {
  const { data: session } = useSession();
  console.log(orders);

  return (
    <div>
      <Header />
      <Nav />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order key={order.id} order={order}/>
          ))}
        </div>
      </main>
    </div>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //Get the users logged in credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const q = query(
    collection(db, "users", session.user.email, "orders"),
    orderBy("timestamp", "desc"),
    limit(100)
  );
  const querySnapshot = await getDocs(q);

  //Stripe orders

  // let orders = [];

  // querySnapshot.forEach((doc) => {

  //   orders.push({
  //     id: doc.id,
  //     amount: doc.data().amount,
  //     amountShipping: doc.data().amount_shipping,
  //     images: doc.data().images,
  //     timestamp: moment(doc.data().timestamp.toDate()).unix(),
  //   });
  // });
  // console.log(orders);

  // async function getItems() {
  //   return await stripe.checkout.sessions.listLineItems(doc.id, {
  //     limit: 100,
  //   });
  // }

  const orders = await Promise.all(
    querySnapshot.docs.map(async (doc) => ({
      id: doc.id,
      amount: doc.data().amount,
      amountShipping: doc.data().amount_shipping,
      images: doc.data().images,
      timestamp: moment(doc.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(doc.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
