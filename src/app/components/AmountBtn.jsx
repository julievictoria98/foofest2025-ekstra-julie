"use client";
import { useState } from "react";
function AmountBtn({ onAmountChange, maxAmount, storedValue }) {
  const [amount, setAmount] = useState(storedValue);

  // Tilføj 1 når der klikkes på + knap, men tjek at det valgte amount ikke er mere end den satte maxAmount prop
  function add() {
    if (amount < maxAmount) {
      const newAmount = amount + 1;

      //Opdater lokal state
      setAmount(newAmount);

      //send det opdaterede state gennem onAmountChange prop
      onAmountChange(newAmount);
    }
  }

  function subtract() {
    if (amount > 0) {
      const newAmount = amount - 1;
      setAmount(newAmount);
      onAmountChange(newAmount);
    }
  }

  return (
    <div
      className={`flex flex-col relative ${
        amount === maxAmount
          ? "after:content-['Max_selected'] after:absolute after:-bottom-4 after:left-0 after:text-main-1 after:text-xs "
          : ""
      }`}
    >
      <div className="flex place-items-center gap-1">
        <button
          onClick={subtract}
          className={`${
            amount === 0
              ? "bg-feedback-disabled-2 cursor-not-allowed border-feedback-disabled-1 hover:border-feedback-disabled-1 active:bg-feedback-disabled-2"
              : "bg-main-2"
          } relative disabled:opacity-60 font-rethink aspect-square px-3 py-1 text-main-1 text-2xl border-solid border-main-1 border-2 after:bg-main-1 after:absolute after:top-0 after:left-0 after:-z-10 after:content-[''] after:w-full after:h-full after:ml-1 after:mt-1 hover:after:mt-0 hover:after:ml-0 after:transition-all after:duration-75 hover:outline-1 hover:border-accent-1 hover:text-main-1 hover:transition-all active:bg-accent-1`}
        >
          -
        </button>
        <span className="bg-main-2 border-2 border-main-1 border-solid rounded-full py-2 px-7 text-main-1 font-rethink text-base">
          {amount}
        </span>
        <button
          onClick={add}
          className={`${
            amount === maxAmount
              ? "bg-feedback-disabled-2 cursor-not-allowed border-feedback-disabled-1 hover:border-feedback-disabled-1 active:bg-feedback-disabled-2 after:none"
              : "bg-main-2 after:absolute"
          } relative font-rethink aspect-square  px-3 py-1 text-main-1 text-2xl border-solid border-main-1 border-2 after:bg-main-1 after:absolute after:top-0 after:left-0 after:-z-10 after:content-[''] after:w-full after:h-full after:ml-1 after:mt-1 hover:after:mt-0 hover:after:ml-0 after:transition-all after:duration-75 hover:outline-1 hover:border-accent-1 hover:text-main-1 hover:transition-all active:bg-accent-1`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default AmountBtn;
