"use client";  

import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
type Props = {
    children?: React.ReactNode;
  };


export const ClientProvider = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
  };
