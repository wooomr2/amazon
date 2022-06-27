import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

function CheckoutItem({ item }) {
  const { id, title, price, rating, description, category, image, hasPrime } =
    item;
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(item));
  };

  return (
    <div className="grid grid-cols-5">
      {/* Image */}
      <Image src={image} alt="" width="200" height="200" objectFit="contain" />
      {/* Middle Info */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, idx) => (
              <StarIcon className="h-5 text-yellow-500" key={idx} />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <p>${price}</p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img className="w-12" src="/prime.png" alt="" />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* Right */}
      <div className="flex flex-col justify-self-end my-auto space-y-2 ">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button">Remove to Basket</button>
      </div>
    </div>
  );
}

export default CheckoutItem;
