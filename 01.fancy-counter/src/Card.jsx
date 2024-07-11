import { useEffect, useState } from "react";
import Count from "./Count";
import BtnContainer from "./BtnContainer";
import CountBtn from "./CountBtn";
import ResetBtn from "./ResetBtn";
import Title from "./Title";

export default function Card() {
  const [count, setCount] = useState(0);
  const locked = count === 999 ? true : false;

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === "Space") {
        const newCount = count + 1;
        if (newCount > 999) {
          setCount(999);
          return;
        }
        setCount(newCount);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [count]);

  return (
    <div className={`card ${locked ? "card--limit" : ""}`}>
      <Title locked={locked} />
      <Count count={count} />
      <ResetBtn setCount={setCount} />
      <BtnContainer>
        <CountBtn type="minus" setCount={setCount} locked={locked} />
        <CountBtn type="plus" setCount={setCount} locked={locked} />
      </BtnContainer>
    </div>
  );
}
