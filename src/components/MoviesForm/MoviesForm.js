import { useState } from "react";
import { toast } from "react-toastify";
import s from "./MoviesForm.module.css";

function MoviesForm({ onSubmit }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.currentTarget.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      return toast.error("Enter the value of your request!");
    }

    const obj = { name: name };
    onSubmit(obj);

    reset();
  };

  function reset() {
    setName("");
  }

  return (
    <form className={s.SearchForm} onSubmit={handlerSubmit}>
      <button type="submit" className={s.SearchFormButton}>
        <span className={s.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        className={s.SearchFormInput}
        type="text"
        name="name"
        value={name}
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        onChange={handleChange}
      />
    </form>
  );
}
export default MoviesForm;
