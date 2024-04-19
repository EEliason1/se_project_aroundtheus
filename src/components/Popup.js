import { openModal, closeModal } from "../utils/utils.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    openModal(this._popupElement);
  }

  close() {
    closeModal(this._popupElement);
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__exit-button")
      ) {
        closeModal(evt.currentTarget);
      }
    });
  }
}
