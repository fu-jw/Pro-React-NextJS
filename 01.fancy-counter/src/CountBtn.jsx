import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

export default function BtnContainer({ type, setCount, locked }) {
  const handleClick = () => {
    setCount((prev) => {
      if (type === "plus") {
        const newCount = prev + 1;
        if (newCount > 999) {
          return 999;
        }
        return newCount;
      } else {
        const newCount = prev - 1;
        if (newCount < 0) {
          return 0;
        }
        return newCount;
      }
    });
  };

  return (
    <button disabled={locked} onClick={handleClick} className="count-btn">
      {type === "plus" ? (
        <PlusIcon className="count-btn-icon" />
      ) : (
        <MinusIcon className="count-btn-icon" />
      )}
    </button>
  );
}
