import { auth, provider } from "../firebaseConfig";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useAsync } from "react-async-hook";
import _ from "lodash";

export function useAuthenticate() {
  const userCredentials = useAsync(
    async () => await getRedirectResult(auth),
    []
  );

  if (!userCredentials.loading && _.isNil(auth.currentUser)) {
    signInWithRedirect(auth, provider);
  }
}
