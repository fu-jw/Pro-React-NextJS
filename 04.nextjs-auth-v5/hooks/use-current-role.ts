import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  // useSession().data?.user?.role || "guest"
  const session = useSession();

  return session.data?.user?.role;
};
