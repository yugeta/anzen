

export class Asset{
  static get control_area(){
    return document.querySelector(`.control-area`)
  }
  static get flask_area(){
    return document.querySelector(`.flask-area`)
  }
  static get tank_area(){
    return document.querySelector(`.tank-area`)
  }
}