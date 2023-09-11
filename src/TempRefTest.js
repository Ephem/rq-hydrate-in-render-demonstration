import { useState } from "react";

let first = true;

export default function TempRefTest() {
  const [count, setCount] = useState(0);

  if (first === true) {
    first = false;

    setCount(1);

    throw new Promise((res) => {
      setTimeout(res, 10);
    });
  }

  console.log(count);

  return null;
}
