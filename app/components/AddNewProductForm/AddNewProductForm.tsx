"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./AddNewProductForm.module.scss";
import { addNewProductAction } from "@/app/helpers/actions";

export interface InputsProps {
  name: string;
  amount: number;
  price: number;
}
const AddNewProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsProps>();

  const onSubmit: SubmitHandler<InputsProps> = (data, event) => {
    addNewProductAction(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h3>Add New Product</h3>

      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Required Field" })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          {...register("amount", {
            required: "Required Field",
            valueAsNumber: true,
          })}
        />
        {errors.amount && <span>{errors.amount.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="price">Price per unit</label>
        <input
          id="price"
          type="number"
          {...register("price", {
            required: "Required Field",
            valueAsNumber: true,
          })}
        />
        {errors.price && <span>{errors.price.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddNewProductForm;
