"use client";

import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextProps {
  user: DecodedIdToken | null;
  loading: boolean;
}

interface DecodedIdToken {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  exp?: number;
  family_name: string;
  "custom:customer_id": string;
  "custom:role": string;
  phone_number: string;
  "cognito:username": string;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export function AuthProviderLocal({
  children,
}: {
  readonly children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<DecodedIdToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      if (status === "loading") {
        setLoading(true);
        return;
      }

      if (session?.accessToken) {
        try {
          const decodedToken = jwtDecode<DecodedIdToken>(session.idToken!);

          setUser({
            ...decodedToken,
          });
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    initializeUser();
  }, [session, status]);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
