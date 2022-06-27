import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

function Product({ product }) {
  const { id, category, title, image, description, price } = product;
  const dispatch = useDispatch();

  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [rating, setRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
  );
  const [hasPrime, setHasPrime] = useState(Math.random() < 0.5);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative z-30 flex flex-col m-5 bg-white p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} alt="" height="200" width="200" objectFit="contain" />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, idx) => (
            <StarIcon className="h-5 text-yellow-500" key={idx} />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div>${price}</div>

      {hasPrime && (
        <div className="flex items-center space-x-2">
          <img className="w-12" src="/prime.png" alt="" />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
