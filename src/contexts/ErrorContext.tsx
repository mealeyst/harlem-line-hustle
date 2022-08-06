import React, { Dispatch, SetStateAction } from "react";

export type IErrorContext = {
  error: Error | null
  setError?: Dispatch<SetStateAction<Error | null>>;
}

// set the defaults
const ErrorContext = React.createContext<IErrorContext>({
  error: null
});

export default ErrorContext;