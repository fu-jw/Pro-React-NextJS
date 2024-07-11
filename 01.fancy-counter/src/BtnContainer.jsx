import CountBtn from "./CountBtn";

export default function BtnContainer({ setCount, locked }) {
  return (
    <div className="button-container">
      <CountBtn type="minus" setCount={setCount} locked={locked} />
      <CountBtn type="plus" setCount={setCount} locked={locked} />
    </div>
  );
}
