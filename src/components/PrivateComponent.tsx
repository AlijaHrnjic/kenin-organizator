import React, { ReactNode } from "react";
import { useCurrentUser } from "../auth/useCurrentUser";
import _ from "lodash";

export function PrivateComponent({ children }: { children: ReactNode }) {
  const currentUser = useCurrentUser();

  if (_.isNil(currentUser)) {
    return null;
  }

  return <>{children}</>;
}
