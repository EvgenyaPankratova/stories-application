"use client";

import { Provider } from "react-redux";
import store from "@/store/index";

const ReactReduxProvider = ({ children } :Readonly<{
  children: React.ReactNode;
}> ) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReactReduxProvider;
