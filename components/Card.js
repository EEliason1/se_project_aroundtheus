const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector("#preview-image");
const previewImageCaption = document.querySelector("#image-preview-caption");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleModalCloseEsc);
  modal.addEventListener("mousedown", handleModalCloseClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleModalCloseEsc);
  modal.removeEventListener("mousedown", handleModalCloseClick);
}

function handleModalCloseEsc(evt) {
  if (evt.key == "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function handleModalCloseClick(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__exit-button")
  ) {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _handleImageClick() {
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewImageCaption.textContent = this._name;
    openModal(previewImageModal);
  }

  _handleLike() {
    this._template
      .querySelector("#like-button")
      .classList.toggle("elements__like-button_active");
  }

  _handleDelete() {
    this._template.remove();
  }

  _setEventListeners() {
    this._likeButton = this._template.querySelector("#like-button");
    this._deleteButton = this._template.querySelector("#card-delete-button");
    this._cardImage = this._template.querySelector("#card-URL");

    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
  }

  generateCard() {
    this._template = this._getTemplate();
    this._setEventListeners();
    this._template.querySelector("#card-URL").src = this._link;
    this._template.querySelector("#card-title").textContent = this._name;

    return this._template;
  }
}
