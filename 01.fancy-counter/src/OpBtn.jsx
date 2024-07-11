import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

export default function OpBtn({ setCount }) {
  return (
    <div className="button-container">
      <button
        onClick={() => {
          setCount((pre) => pre - 1);
        }}
        className="count-btn"
      >
        <MinusIcon className="count-btn-icon " />
      </button>

      <button
        onClick={() => {
          setCount((pre) => pre + 1);
        }}
        className="count-btn"
      >
        <PlusIcon className="count-btn-icon " />
      </button>
    </div>
  );
}
