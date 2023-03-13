import Link from "next/link";

const Header = () => {
  return (
    <>
    <header className="bg-blue-500 top-0 fixed w-full font-bold font-mono py-2">
      <nav className="m-3 text-xl text-right text-white">
        <Link href="/" className="m-2 hover:underline">Home</Link>
      </nav>
    </header>
    </>
  );
}

export default Header;
