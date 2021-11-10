import { useState, useEffect } from "react";
import { throttle } from "throttle-debounce";
import { IoRocketOutline } from "react-icons/io5";
import s from "./BtnUp.module.css";
function BtnUp() {
  const [status, setStatus] = useState("hiden");

  useEffect(() => {
    window.addEventListener(
      "scroll",
      throttle(500, (e) => scrollWatch())
    );
  });

  const scrollWatch = () => {
    let scroll_position = window.scrollY;
    scroll_position > 1600 ? setStatus("visible") : setStatus("hiden");
  };

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {status === "visible" && (
        <button type="button" className={s.btnToTop} onClick={toTop}>
          <IoRocketOutline />
        </button>
      )}
      <></>
    </>
  );
}

export default BtnUp;
