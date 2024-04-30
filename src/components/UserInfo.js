export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return (userInfo = {
      name: this._userName.innerText,
      about: this._userJob.innerText,
    });
  }

  setUserInfo({ name, about }) {
    this._userName.innerText = name;
    this._userJob.innerText = about;
  }

  getUserAvatar() {
    return (userAvatar = { avatar: this._userAvatar.src });
  }

  setUserAvatar({ avatar }) {
    this._userAvatar.src = avatar;
  }
}
