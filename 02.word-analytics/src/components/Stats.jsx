import H2 from "./H2";

export default function Stats({ stat }) {
  return (
    <section className="stats">
      <Stat number={stat.wordNum} type="字数" />
      <Stat number={stat.charNum} type="字符数" />
      <Stat number={stat.insNum} type="Instagram" />
      <Stat number={stat.fbNum} type="Facebook" />
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
