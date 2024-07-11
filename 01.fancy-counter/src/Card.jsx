import Count from "./Count";
import OpBtn from "./OpBtn";
import ResetBtn from "./ResetBtn";
import Title from "./Title";

export default function Card() {
  return (
    <div className="card">
      <Title />
      <Count />
      <ResetBtn />
      <OpBtn />
    </div>
  );
}
