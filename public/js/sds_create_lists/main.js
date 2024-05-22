import { List }  from './list.js'
import { Login } from '../sds_create/login.js'

export const Main = {
  php : 'php/main.php',
}

class Start{
  constructor(){
    Login.check({
      unlogin : this.unlogin,
      logined : this.logined,
    })
    this.set_event()
  }

  get sds_cards(){
    return document.querySelector(`.sds_cards`)
  }

  unlogin(){
    location.href = '?p=login&back=sds_create_lists'
  }

  logined(){
    new List()
  }

  set_event(){
    this.sds_cards.addEventListener('click' , ((e)=>{
      const sds_card = e.target.closest('.sds-card')
      const id = sds_card.getAttribute('data-id')
      location.href=`?p=sds_create&id=${id}`
    }))
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
