import { Asset } from "./asset.js"

export class Flask{
  constructor(){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.load()
    })
  }

  static data = null

  get dir(){
    return import.meta.url.split("/").slice(0,-2).join("/")
  }

  load(){
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open('GET' , `${this.dir}/img/flask.svg` , true)
    xhr.setRequestHeader("Content-Type", "image/svg+xml")
    xhr.onload = this.loaded.bind(this)
    xhr.send()
  }

  loaded(e){
    Flask.data = e.target.response
    this.view()
    this.finish()
  }

  view(){
    const div = document.createElement("div")
    div.innerHTML = Flask.data
    const origin_svg = div.querySelector("svg")
    origin_svg.classList.add("flask")
    // origin_svg.style.setProperty("--x","50%","")
    // origin_svg.style.setProperty("--y","50%","")


    Asset.flask_area.appendChild(origin_svg)
  }

  finish(){
    this.resolve()
  }
}