export default function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popupForImage ${card ? "popup_opened" : ""}`}>
      <div className="popupForImage__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <figure>
          <img
            src={card ? card.link : "#"}
            alt={card ? card.name : "#"}
            className="popupForImage__image"
          />
          <figcaption className="popupForImage__figcaption">
            {card ? card.name : ""}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
