import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountIntputRef = useRef();
  console.log("Referring to Input element in Meal item", amountIntputRef);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = Number(amountIntputRef.current.value);
    const enteredAmountNumber = +enteredAmount;
    console.log(enteredAmountNumber);
    if (
      enteredAmountNumber.length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      console.log("Setting form to not valid");
      return;
    }
    console.log("Sending the entered amount from meal item form");
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountIntputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
