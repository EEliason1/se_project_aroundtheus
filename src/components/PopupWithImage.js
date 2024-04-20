import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupCaption = this._popupElement.querySelector(
      ".modal__image_caption"
    );
    this._popupImage = this._popupElement.querySelector(".elements__image");
  }

  open(name, link) {
    this._popupImage.alt = name;
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    super.open();
  }
}
