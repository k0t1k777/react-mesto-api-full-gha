import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    setName(currentUser ? currentUser.name : "");
    setJob(currentUser ? currentUser.about : "");
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      userName: name,
      userJob: job,
    });
  }
  return (
    <PopupWithForm
      name="popupEditProfile"
      title="Редактировать профиль"
      nameOfButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__wrapper">
        <input
          name="userName"
          className="popup__input popup__input_type_name"
          id="popup__name"
          type="text"
          placeholder="Ваше имя"
          minLength={2}
          maxLength={40}
          required=""
          value={name || ''}
          onChange={(event) => setName(event.target.value)}
        />
        <span className="popup__error" id="popup__name-error" />
      </div>
      <div className="popup__wrapper">
        <input
          name="userJob"
          className="popup__input popup__input_type_job"
          id="popup__job"
          type="text"
          placeholder="Чем занимаетесь"
          minLength={2}
          maxLength={200}
          required=""
          value={job || ''}
          onChange={(event) => setJob(event.target.value)}
        />
        <span className="popup__error" id="popup__job-error" />
      </div>
    </PopupWithForm>
  );
}
