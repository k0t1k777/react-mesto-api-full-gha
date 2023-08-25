import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
   const isLiked = card.likes.some((i) => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__button ${
    isLiked && "elements__button_active"
  }`;
  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="elements__element">
      {currentUser._id === card.owner && (
        <button
          className="elements__element_urn"
          onClick={() => onCardDelete(card._id)}
        />
      )}
      <img
        src={card.link}
        className="elements__image"
        alt={card.name}
        onClick={() => onCardClick({ name: card.name, link: card.link })}
      />
      <div className="elements__wrapper">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__forLikes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="elements__count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}