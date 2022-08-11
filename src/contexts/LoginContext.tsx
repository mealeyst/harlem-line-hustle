import React, { Dispatch, SetStateAction } from "react";

export type ILoginContext = {
  error: Error | null;
  loggedIn: boolean;
  setLoggedIn?: Dispatch<SetStateAction<boolean>>;
  setError?: Dispatch<SetStateAction<Error | null>>;
}

// set the defaults
const LoginContext = React.createContext<ILoginContext>({
  error: null,
  loggedIn: false
});

export default LoginContext;