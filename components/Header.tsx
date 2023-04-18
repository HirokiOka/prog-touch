import Link from "next/link";

const Header = () => {
  return (
    <>
    <header className="bg-blue-500 top-0  w-full font-bold font-mono py-1">
      <nav className="text-xl text-white">
        <Link href="/" className="m-2">ProgTouch</Link>
      </nav>
    </header>
    </>
  );
}

export default Header;
