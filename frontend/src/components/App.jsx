import * as auth from "../utils/auth.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api.js";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import ConfirmPopup from "./ConfirmPopup/ConfirmPopup.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteCardID, setDeleteCardID] = useState("");
  const [isInfoTooltip, setIsInfoTooltip] = React.useState({
    isOpen: false,
    isSucessfull: false,
  });
  // Авторизация юзера
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  // Данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Данные карточек
  const [cards, setCards] = useState([]);

  //Проверяем токен и перенаправление юзера
  React.useEffect(() => {
    handleToken();
  }, []);

  function handleToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getUserToken(token)
        .then((data) => {
          if (data) {
            setEmail(data.email);
            handleLoggedIn();
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
    setIsInfoTooltip({
      isOpen: false,
      isSucessfull: false,
    });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick(cardId) {
    setIsDeletePopupOpen(true);
    setDeleteCardID(cardId);
  }

  function handleCardDeleteSubmit(cardId) {
    api
      .removeCard(cardId, localStorage.token)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== cardId));
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleInfoTooltip(effect) {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: true, isSucessfull: effect });
  }

  function handleExit() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setEmail("");
    navigate("/sign-in");
  }

  // Лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, localStorage.token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleUpdateAvatar(pic) {
    api
      .changeAvatar(pic, localStorage.token)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleUpdateUser(data) {
    api
      .changeProfile(data, localStorage.token)
      .then((infoUser) => {
        setCurrentUser(infoUser);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addNewCard(cardData, localStorage.token)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }
 
  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((data) => {
        if (data) {
          handleInfoTooltip(true);
          navigate("/sign-in");
        }
      })
      .catch((error) => {
        console.log(error);
        handleInfoTooltip(false);
      });
  }

  function handleLogin(password, email) {
    auth
      .login(password, email)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        handleInfoTooltip(false);
        console.log(error);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfoUser(localStorage.token), api.getInitialCards(localStorage.token)])
        .then(([infoUser, infoCard]) => {
          setCurrentUser(infoUser);
          setCards(infoCard);
        })
        .catch((error) =>
          console.error(`Ошибка загрузки стартовых карточек ${error}`)
        );
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} exit={handleExit} loggedIn={loggedIn} />
        <Routes>
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleDeleteClick}
                onCardLike={handleCardLike}
                cards={cards}
              />
            }
          />
        </Routes>

        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDeleteSubmit}
          card={deleteCardID}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip effect={isInfoTooltip} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
