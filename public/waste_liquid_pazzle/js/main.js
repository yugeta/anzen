import { SvgImport } from "./svg_import.js"

class Main{
  constructor(){
    new SvgImport()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}