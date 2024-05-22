import { Data } from './data.js'

export const Main = {
  data_file : 'data/karuta.json',

}

function start(){
  new Data()
}

switch(document.readyState){
  case 'complete':
  case 'interactive':
    new start()
    break
  default: 
    window.addEventListener('DOMContetLoaded' , (()=>{
      new start()
    }))
    break
}