import React from "react";
import Galochka from "../../images/Galochka.svg";
import RedX from "../../images/RedX.svg";

export default function InfoTooltip({
  effect: { isOpen, isSucessfull },
  onClose,
}) {
  return (
    <section
      className={`popup popupAfterRegistration ${isOpen && "popup_opened"}`}
    >
      <div className="popup__container popup__container_type_padding">
        <button type="button" className="popup__close" onClick={onClose} />
        <img
          className="popupAfterRegistration__img"
          src={isSucessfull ? Galochka : RedX}
          alt="Результат регистрации"
        />
        <h2 className="popup__title popup__title_padding">
          {isSucessfull
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </section>
  );
}
