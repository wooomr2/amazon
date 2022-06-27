import { MenuIcon } from "@heroicons/react/outline";

function Nav() {
  return (
    <nav className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
      <p className="link flex items-center">
        <MenuIcon className="h-6 mr-1" />
        ALL
      </p>
      <p className="link">Prime video</p>
      <p className="link">Amazon Business</p>
      <p className="link">Today's Deals</p>
      <p className="link hidden sm:inline-flex">Electronics</p>
      <p className="link hidden sm:inline-flex">Food & Grocery</p>
      <p className="link hidden md:inline-flex">Prime</p>
      <p className="link hidden md:inline-flex">Buy Again</p>
      <p className="link hidden lg:inline-flex">Health & Personal Care</p>
    </nav>
  );
}

export default Nav;
