import React from "react";
import { Logo, Head } from "./styles";
import posed from "react-pose";

export default function Header(props) {
  return (
    <Head>
      <Logo />
      <Button className="logout-btn" onClick={props.logout}>
        Logout
      </Button>
    </Head>
  );
}

const Button = posed.button({
  pressable: true,
  // init: { scale: 1 },
  // press: { scale: 0.8 },

  press: {
    scale: 0.9
  },

  hoverable: true,
  init: {
    scale: 0.9
  },
  hover: {
    scale: 1
  }
});
