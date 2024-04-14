export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardSelector = cardSelector;
  }

  renderItems() {}

  addItem() {}
}
