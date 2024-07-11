import CountBtn from "./CountBtn";

export default function BtnContainer({ setCount }) {
  return (
    <div className="button-container">
      <CountBtn type="minus" setCount={setCount} />
      <CountBtn type="plus" setCount={setCount} />
    </div>
  );
}
