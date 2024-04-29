export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _validatePromise(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._validatePromise);
  }

  //getUserInfo
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._validatePromise);
  }

  //patchUserInfo
  patchUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      "Content-Type": "application/json",
      body: JSON.stringify({ name, about }),
    }).then(this._validatePromise);
  }

  //setUserAvatar
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      "Content-Type": "application/json",
      body: JSON.stringify({ avatar }),
    }).then(this._validatePromise);
  }

  //createCard
  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ name, link }),
    }).then(this._validatePromise);
  }

  //deleteCard
  deleteCard({ _id }) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      headers: this._headers,
      method: "DELETE",
      "Content-Type": "application/json",
    }).then(this._validatePromise);
  }

  //likeCard
  likeCard({ _id }) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._validatePromise);
  }

  //dislikeCard
  dislikeCard({ _id }) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      headers: this._headers,
      method: "DELETE",
      "Content-Type": "application/json",
    }).then(this._validatePromise);
  }
}
