import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutItem from "../components/CheckoutItem";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function checkout() {
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/checkout_session", {
      items,
      email: session.user.email,
    });

    //Redirect user to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <Nav />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          {/* AdImage */}
          <Image
            src="/checkout-banner.png"
            alt=""
            width="1020"
            height="260"
            objectFit="contain"
          />
          {/* ItemList */}
          <div className="flex flex-col p-5 space-y-10 bg-white max-w-[1020px]">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Your Shopping Basket"}
            </h1>

            {items.map((item, idx) => (
              <CheckoutItem key={idx} item={item} />
            ))}
          </div>
        </div>

        {/* Right */}
        {items.length > 0 && (
          <div className="h-auto flex flex-col bg-white m-5 p-10 shadow-md">
            <div className="lg:sticky lg:top-16 ">
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold">${total}</span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500  border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default checkout;
