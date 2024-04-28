export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handLikeClick = handleLikeClick;
  }

  _handleLike() {
    this._likeButton.classList.toggle("elements__like-button_active");
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
      // this._handleDelete();
      this._handleDeleteClick(this._id, this._template);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
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
    this._cardImage.src = this._link;
    this._template.querySelector("#card-title").textContent = this._name;
    this._cardImage.alt = this._name;

    return this._template;
  }
}
