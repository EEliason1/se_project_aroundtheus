import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = this._popupForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const formInputs = {};
    this._inputElements.forEach((input) => {
      formInputs[input.name] = input.value;
    });
    return formInputs;
  }

  setInputValues(data) {
    this._inputElements.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
      this._submitButton.textContent = "Saving...";
      this.close();
    });
  }
}
