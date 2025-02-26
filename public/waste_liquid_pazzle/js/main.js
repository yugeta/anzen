import { SvgImport } from "./svg_import.js"
import { Flask }     from "./flask.js"

class Main{
  constructor(){
    new SvgImport()
    new Flask()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}