import s from "./Button.module.css";

function Button({ onClick }) {
  return (
    <button className={s.Button} onClick={onClick}>
      Land More
    </button>
  );
}
export default Button;
