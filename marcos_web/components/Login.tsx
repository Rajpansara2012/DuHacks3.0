import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface Provider {
  id: string;
  name: string;
}
const Login = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <a href="/profile">
            <img
              src={session?.user?.image || "no profile"}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
              alt="profile"
            />
          </a>
          <button
            onClick={handleSignOut}
            className="black_btn text-white font-semibold"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              // <button
              //
              //   className="black_btn text-white font-semibold"
              // >
              //   Sign in
              // </button>
              <button
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="flex hover:-translate-y-1 hover:shadow-slate-100 shadow-md transition ease-in-out duration-200 items-center gap-4 border-2 rounded-md px-6 py-2"
              >
                <FcGoogle className="w-10 h-10" />
                <span>SIGN IN WITH GOOGLE</span>
              </button>
            ))}
        </>
      )}{" "}
    </div>
  );
};

export default Login;
