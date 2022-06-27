import Image from "next/image";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems)

  return (
    <header className="flex items-center flex-grow bg-amazon_blue p-1 py-2">
      {/* Logo */}
      <div className="flex items-center flex-grow sm:flex-grow-0 mt-2">
        <Image
          onClick={() => router.push("/")}
          src="/logo.png"
          alt=""
          width="150"
          height="40"
          objectFit="contain"
          className="cursor-pointer"
        />
      </div>

      {/* Search */}
      <div
        className="hidden sm:flex items-center flex-grow h-10
        bg-yellow-400 hover:bg-yellow-500 rounded-md "
      >
        <input
          className="flex-grow flex-shrink p-2 h-full w-6
          focus:outline-none rounded-l-md"
          type="text"
        />
        <SearchIcon className="h-12 p-4" />
      </div>

      {/* Right */}
      <div className="flex items-center text-white text-xs space-x-6 mx-6 whitespace-nowrap">
        {!session ? (
          <div className="link" onClick={() => signIn()}>
            <p>Sign in</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
        ) : (
          <div
            className="link flex items-center space-x-2"
            onClick={() => signOut()}
          >
            <img
              src={session.user.image}
              width="30"
              height="30"
              className="rounded-full"
            />
            <p className="font-extrabold md:text-sm">Sign out</p>
          </div>
        )}

        <div onClick={()=>router.push("/orders")} className="link">
          <p>Returns</p>
          <p className="font-extrabold md:text-sm">& Orders</p>
        </div>

        <div
          className="link relative flex items-center"
          onClick={() => router.push("/checkout")}
        >
          <span
            className="absolute top-0 right-0 md:right-10 h-4 w-4 
          bg-yellow-400 rounded-full text-center text-black font-bold"
          >
            {items.length}
          </span>
          <ShoppingCartIcon className="h-10" />
          <p className="hidden md:inline font-extrabold md:text-sm mt-2">
            Basket
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
