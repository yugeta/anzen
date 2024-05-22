import { Main }       from '../main.js'
import { Style }      from './style.js'
import { Asset }      from './asset.js'
import { HasChecked } from './has_checked.js'
import { Login }      from './sds_create/login.js'

export class Init{
  constructor(){
    this.load_setting()
    this.check_login()
    this.put_assets()
    new Style()
  }

  put_assets(){
    new Asset({
      'files' : [
        {
          selector : 'header',
          file     : 'assets/header.html',
        },
        {
          selector : 'footer',
          file     : 'assets/footer.html',
        },
        {
          selector : 'main',
          file     : `assets/${Main.current_page}.html`,
        },
      ],
      callback : (()=>{
        new HasChecked()
        // new Login()
      })
    })
  }

  check_login(){
    if(Login.data){
      document.body.setAttribute('data-login','true')
    }
  }

  load_setting(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , `data/setting.json` , true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('Content-Type', 'text/json');
    xhr.onload = this.loaded_setting.bind(this)
    xhr.send()
  }
  
  loaded_setting(e){
    if(!e || !e.target || !e.target.response){return}
    Main.setting = JSON.parse(e.target.response)
    // console.log(Main.setting)
  }
}