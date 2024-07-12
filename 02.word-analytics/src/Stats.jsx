import H2 from "./H2";

export default function Stats() {
  return <section className="stats">
    <Stat number={0} type="字数" />
    <Stat number={0} type="字符数" />
    <Stat number={0} type="Words" />
    <Stat number={0} type="Words" />
  </section>;
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