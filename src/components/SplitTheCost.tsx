import React from "react";
import "../App.css";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";

export const SplitTheCost: React.FC = () => {
  return (
    <div>
      <Header />
      <Entries />
    </div>
  );
};
