
class Main{
  constructor(){
    console.log(1)
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}