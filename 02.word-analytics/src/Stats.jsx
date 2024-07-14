import H2 from "./H2";

export default function Stats({ wordNum, charNum, insNum, fbNum }) {
  return (
    <section className="stats">
      <Stat number={wordNum} type="字数" />
      <Stat number={charNum} type="字符数" />
      <Stat number={insNum} type="Instagram" />
      <Stat number={fbNum} type="Facebook" />
    </section>
  );
}

function Stat({ number, type }) {
  return (
    <section className="stat">
      <span
        className={`stat__number ${number < 0 ? "stat__number--limit" : ""}`}
      >
        {number}
      </span>

      <H2>{type}</H2>
    </section>
  );
}
