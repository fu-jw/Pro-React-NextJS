import { useState } from "react";
import Stats from "./Stats";
import Textarea from "./Textarea";

export default function Container() {
  const [text, setText] = useState("");

  const stat = {
    wordNum: text.split(/\s/).filter((word) => word !== "").length,
    charNum: text.length,
    insNum: 280 - text.length,
    fbNum: 2200 - text.length,
  };

  return (
    <main className="container">
      <Textarea text={text} setText={setText} />
      <Stats stat={stat} />
    </main>
  );
}
