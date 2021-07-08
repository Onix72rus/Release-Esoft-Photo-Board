import { makeAutoObservable } from 'mobx';

export default class PictureStore {
   constructor() {
      this._types = [];
      this._pictures = [];
      this._selectedType = {};
      makeAutoObservable(this);
   }

   setTypes(types) {
      this._types = types;
   }

   setSelectedType(type) {
      this._selectedType = type;
   }

   setPictures(pictures) {
      this._pictures = pictures;
   }

   get types() {
      return this._types;
   }

   get selectedType() {
      return this._selectedType;
   }

   get pictures() {
      return this._pictures;
   }
}
