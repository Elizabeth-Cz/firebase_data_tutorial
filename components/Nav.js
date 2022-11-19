import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="text-ls font-medium">Creative Thoughts</button>
      </Link>
      <ul className="flex items-center gap-10">
        <Link href={"/auth/login"}>
          <p className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
            Join now
          </p>
        </Link>
      </ul>
    </nav>
  );
}
