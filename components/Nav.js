import Link from "next/link";
import { use } from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="text-ls font-medium">Creative Thoughts</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <p className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
              Join now
            </p>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm">
                Post
              </button>
            </Link>
            <Link href={"/dashboard"}>
              {user.photoURL && (
                <img
                  className="w-12 rounded-full cursor-pointer"
                  src={user.photoURL}
                  alt=""
                />
              )}
              {!user.photoURL && (
                <img
                  className="w-12 rounded-full cursor-pointer"
                  src={`https://ui-avatars.com/api/?name=${user.displayName}`}
                  alt=""
                />
              )}
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
