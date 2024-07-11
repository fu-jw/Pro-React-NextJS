import { useState } from "react";
import Count from "./Count";
import BtnContainer from "./BtnContainer";
import ResetBtn from "./ResetBtn";
import Title from "./Title";

export default function Card() {
  const [count, setCount] = useState(990);
  const locked = count === 999 ? true : false;

  return (
    <div className={`card ${locked ? "card--limit" : ""}`}>
      <Title locked={locked} />
      <Count count={count} />
      <ResetBtn setCount={setCount} />
      <BtnContainer setCount={setCount} locked={locked} />
    </div>
  );
}
