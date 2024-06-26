import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import {
  config,
  formValidators,
  profileEditButton,
  cardAddButton,
  avatarEditButton,
  loadingButtonText,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";

import "../pages/index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//Form Validators
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

//Create API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0e6b8e99-3fb6-490c-b2a5-5d193b29415c",
    "Content-Type": "application/json",
  },
});

//Initial Actions
let cardSection;

api
  .loadPageContent()
  .then(([cards, userData]) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = createNewCard(cardData, "#card-template");
          cardSection.addItem(cardElement);
        },
      },
      "elements__list"
    );
    cardSection.renderItems();
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  .catch((err) => {
    console.error(err);
  });

//New Card Functions
function createNewCard(cardData, template) {
  return new Card(
    cardData,
    template,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ).generateCard();
}

function handleLikeClick(cardElement) {
  if (!cardElement.isLiked()) {
    api
      .likeCard({ _id: cardElement._id })
      .then((res) => {
        cardElement.setIsLiked(res.isLiked);
        console.log("This post has been liked");
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .dislikeCard({ _id: cardElement._id })
      .then((res) => {
        cardElement.setIsLiked(res.isLiked);
        console.log("This post has been disliked");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleDeleteClick(cardInfo) {
  confirmDelete.setAction(handleCardDeleteSubmit, cardInfo);
  confirmDelete.open();
}

function handleCardDeleteSubmit(deleteInfo) {
  confirmDelete.showLoading();
  api
    .deleteCard({ _id: deleteInfo._id })
    .then(() => {
      deleteInfo.removeCard();
      confirmDelete.close();
      console.log("This post has been deleted");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      confirmDelete.hideLoading();
    });
}

const confirmDelete = new PopupWithConfirmation(
  "#card-delete-modal",
  loadingButtonText
);

confirmDelete.setEventListeners();

const handleCardAddSubmit = (cardInfo) => {
  const newCardInfo = {
    name: cardInfo.title,
    link: cardInfo.link,
  };
  popupWithFormCard.showLoading();
  api
    .createCard(newCardInfo)
    .then((newCard) => {
      const newCardElement = createNewCard(newCard, "#card-template");
      cardSection.addNewItem(newCardElement);
      formValidators["card-add-form"].disableButton();
      popupWithFormCard.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupWithFormCard.hideLoading();
    });
};

const userInfo = new UserInfo(
  "#profile-name",
  "#profile-description",
  "#profile-avatar"
);

const initializeProfileEditForm = () => {
  api
    .getUserInfo()
    .then((userInfo) => {
      popupWithFormEdit.setInputValues(userInfo);
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleProfileFormSubmit = (userInput) => {
  popupWithFormEdit.showLoading();
  api
    .patchUserInfo(userInput)
    .then((input) => {
      userInfo.setUserInfo(input);
      popupWithFormEdit.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupWithFormEdit.hideLoading();
    });
};

//Create Popups With Forms
const popupWithFormEdit = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit,
  loadingButtonText
);
popupWithFormEdit.setEventListeners();

profileEditButton.addEventListener("click", () => {
  initializeProfileEditForm(userInfo);
  popupWithFormEdit.open();
});

const popupWithFormCard = new PopupWithForm(
  "#card-add-modal",
  handleCardAddSubmit,
  loadingButtonText
);

popupWithFormCard.setEventListeners();

cardAddButton.addEventListener("click", () => {
  popupWithFormCard.open();
});

//Avatar Change
const handleAvatarEditSubmit = (input) => {
  popupWithFormAvatar.showLoading();
  api
    .setUserAvatar(input)
    .then(() => {
      userInfo.setUserAvatar(input);
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupWithFormAvatar.hideLoading();
    });
};

const popupWithFormAvatar = new PopupWithForm(
  "#avatar-edit-modal",
  handleAvatarEditSubmit,
  loadingButtonText
);

popupWithFormAvatar.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  popupWithFormAvatar.open();
});

//Create Popup with Image
const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}
