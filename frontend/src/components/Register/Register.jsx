import React from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(password, email);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  return (
    <section className="registration">
      <div className="registration__container">
        <form className="registration__form" name="registrationForm" onSubmit={handleSubmit}>
          <h2 className="registration__title">Регистрация</h2>
          <div className="registration__wrapper">
            <input
              className="registration__input registration__input_type_email"
              id="registration__email"
              type="email"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              value={email}
              required={true}
              onChange={handleChangeEmail}
            />
            <span
              className="registration__error"
              id="registration__name-error"
            ></span>
          </div>
          <div className="registration__wrapper">
            <input
              className="registration__input registration__input_type_password"
              id="popup__password"
              type="password"
              placeholder="Пароль"
              minLength="8"
              maxLength="16"
              value={password}
              required={true}
              onChange={handleChangePassword}
            />
            <span
              className="registration__error"
              id="registration__job-error"
            ></span>
          </div>
          <button
            type="submit"
            className="registration__submit-button registration__submit-button_valid"
          >
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="registration__question">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </section>
  );
}
