import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

export default function OpBtn() {
  return (
    <div className="button-container">
      <button className="count-btn">
        <MinusIcon className="count-btn-icon " />
      </button>
      <button className="count-btn">
        <PlusIcon className="count-btn-icon " />
      </button>
    </div>
  );
}
