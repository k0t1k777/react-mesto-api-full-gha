import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("#");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      title: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="popupAddPicture"
      title="Новое место"
      nameOfButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__wrapper">
        <input
          name="title"
          className="popup__input popup__input_type_title"
          id="title"
          type="text"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
          value={name || ''}
          onChange={(event) => setName(event.target.value)}
        />
        <span className="popup__error" id="title-error" />
      </div>
      <div className="popup__wrapper">
        <input
          name="link"
          className="popup__input popup__input_type_link"
          id="link"
          type="url"
          placeholder="Ссылка на картинку"
          required=""
          value={link || ''}
          onChange={(event) => setLink(event.target.value)}
        />
        <span className="popup__error" id="link-error" />
      </div>
    </PopupWithForm>
  );
}
