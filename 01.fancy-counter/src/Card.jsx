import { useState } from "react";
import Count from "./Count";
import OpBtn from "./OpBtn";
import ResetBtn from "./ResetBtn";
import Title from "./Title";

export default function Card() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <Title />
      <Count count={count}/>
      <ResetBtn setCount={setCount}/>
      <OpBtn setCount={setCount}/>
    </div>
  );
}
