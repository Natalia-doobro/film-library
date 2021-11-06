import s from "./PegeHedging.module.css";

function PegeHedging({ title }) {
  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
    </div>
  );
}
export default PegeHedging;
