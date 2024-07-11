import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

export default function BtnContainer({ type, setCount }) {
  const handleClick = () => {
    if (type === "plus") {
      setCount((pre) => pre + 1);
    } else {
      setCount((pre) => pre - 1);
    }
  }

  return (
    <button onClick={handleClick} className="count-btn">
      {type === "plus" ? (
        <PlusIcon className="count-btn-icon" />
      ) : (
        <MinusIcon className="count-btn-icon" />
      )}
    </button>
  );
}
