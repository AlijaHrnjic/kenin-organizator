import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

  useEffect(() => setCurrentUser(auth.currentUser), [auth, auth.currentUser]);

  return currentUser;
}
