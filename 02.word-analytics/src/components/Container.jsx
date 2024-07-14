import { useState } from "react";
import Stats from "./Stats";
import Textarea from "./Textarea";
import { FACEBOOK_MAX_CHARACTERS, INSTAGRAM_MAX_CHARACTERS } from "../lib/constants";

export default function Container() {
  const [text, setText] = useState("");

  const stat = {
    wordNum: text.split(/\s/).filter((word) => word !== "").length,
    charNum: text.length,
    insNum: INSTAGRAM_MAX_CHARACTERS - text.length,
    fbNum: FACEBOOK_MAX_CHARACTERS - text.length,
  };

  return (
    <main className="container">
      <Textarea text={text} setText={setText} />
      <Stats stat={stat} />
    </main>
  );
}
