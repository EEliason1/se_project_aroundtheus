import Popup from "./Popup.js";

export default class PopupWithDeleteConfirm extends Popup {
  constructor(popupSelector, handleDeleteSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleCardDelete = handleDeleteSubmit;
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleCardDelete(this._cardId, this._cardElement);
      this.close();
    });
  }
}
