import { useAuth } from "@/app/context/AuthProvider";

export const useUserAuth = () => {
  const { user } = useAuth();
  return { user };
};
