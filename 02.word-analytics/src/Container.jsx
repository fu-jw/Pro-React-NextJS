import { useState } from "react";
import Stats from "./Stats";
import Textarea from "./Textarea";

export default function Container() {
  const [text, setText] = useState("");
  const wordNum = text.split(/\s/).filter((word) => word !== "").length;
  const charNum = text.length;
  const insNum = 280 - charNum;
  const fbNum = 2200 - charNum;

  return (
    <main className="container">
      <Textarea text={text} setText={setText} />
      <Stats
        wordNum={wordNum}
        charNum={charNum}
        insNum={insNum}
        fbNum={fbNum}
      />
    </main>
  );
}
