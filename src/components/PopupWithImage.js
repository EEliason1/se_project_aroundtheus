import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super({ popupSelector });
    this._name = name;
    this._link = link;
  }

  open(name, link) {
    this._popupElement.querySelector(".modal__image_caption");
    const popupImage = this._popupElement.querySelector(".elements__image");
    popupImage.alt = name;
    popupImage.src = link;
    super.open();
  }
}
