import {
  openModal,
  closeModal,
  handleEscUp,
  isCloseEvent,
} from "../utils/utils.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    openModal(this._popupElement);
  }

  close() {
    closeModal(this._popupElement);
  }

  _handleEscClose() {
    handleEscUp();
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", isCloseEvent(evt, close()));
  }
}
