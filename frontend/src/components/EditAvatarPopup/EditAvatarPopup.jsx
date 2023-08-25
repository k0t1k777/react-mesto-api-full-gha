import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatar = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({ avatar: avatar.current.value });
  }

  return (
    <PopupWithForm
      name="popupRefreshAvatar"
      title="Обновить аватар"
      nameOfButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__wrapper">
        <input
          name="avatar"
          className="popup__input popup__input_type_link"
          id="avatar"
          type="url"
          placeholder="Ссылка на аватар"
          required=""
          ref={avatar}
        />
        <span className="popup__error" id="avatar-error" />
      </div>
    </PopupWithForm>
  );
}
