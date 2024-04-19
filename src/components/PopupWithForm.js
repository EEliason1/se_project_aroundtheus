import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  close() {
    this._popupForm.removeEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputElements = this._popupForm.querySelectorAll(".modal__input");
    const userInputs = {};
    inputElements.forEach((input) => {
      userInputs[input.name] = input.value;
    });
    return userInputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
