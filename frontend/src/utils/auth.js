export const BasicUrl = "http://localhost:3000";

function cheсkResOk(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserToken = (token) => {
  return fetch(`${BasicUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => cheсkResOk(res));
};

export const register = (password, email) => {
  return fetch(`${BasicUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => cheсkResOk(res));
};

export const login = (password, email) => {
  return fetch(`${BasicUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => cheсkResOk(res));
};
