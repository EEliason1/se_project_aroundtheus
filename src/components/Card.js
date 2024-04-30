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
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  isLiked() {
    return this._isLiked;
  }

  _renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("elements__like-button_active");
    } else {
      this._likeButton.classList.remove("elements__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton = this._template.querySelector("#like-button");
    this._deleteButton = this._template.querySelector("#card-delete-button");
    this._cardImage = this._template.querySelector("#card-URL");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return this._cardElement;
  }

  generateCard() {
    this._template = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._template.querySelector("#card-title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._renderLikes();

    return this._template;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
