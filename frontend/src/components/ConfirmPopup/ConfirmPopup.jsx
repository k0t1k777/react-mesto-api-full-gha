import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function ConfirmPopup({ isOpen, onClose, onSubmit, card }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      name="popupConfirm"
      title="Вы уверены?"
      nameOfButton="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
