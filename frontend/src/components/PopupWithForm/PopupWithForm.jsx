export default function PopupWithForm({
  name,
  title,
  nameOfButton,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <form className="popup__form" onSubmit={onSubmit} name="editProfile">
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className="popup__submit-button popup__submit-button_valid"
          >
            {nameOfButton}
          </button>
        </form>
      </div>
    </section>
  );
}
