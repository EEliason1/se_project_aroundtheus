export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._submitButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    if (this._popupSelector == "#card-add-modal") {
      this._submitButton.textContent = "Create";
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__exit-button")
      ) {
        this.close();
      }
    });
  }
}
