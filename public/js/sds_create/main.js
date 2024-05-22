import { Event } from './event.js'
import { Load }  from './load.js'
import { Login } from './login.js'
import { Auto }  from './auto.js'

export const Main = {}

class Start{
  constructor(){
    Login.check({
      unlogin : this.unlogin.bind(this),
      logined : this.logined.bind(this),
    })
  }

  unlogin(){
    location.href = '?p=login&back=sds_create'
  }

  logined(){
    new Auto()
    Main.event = new Event()
    new Load()
  }

}

switch(document.readyState){
  case 'complete':
  case 'interactive':
    new Start()
    break
  default:
    window.addEventListener('DOMContentLoaded' , (()=> {new Start()}))
}
