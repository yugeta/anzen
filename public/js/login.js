import { Login as SdsLogin } from './sds_create/login.js'

export class Login{
  constructor(){
    this.set_event()
  }

  get button(){
    return document.querySelector(`button[name='post']`)
  }

  static get mail(){
    return document.querySelector(`input[name='mail']`).value
  }
  
  get datetime(){
    const dt = new Date()
    const y = dt.getFullYear()
    const m = ('0'+(dt.getMonth()+1)).slice(-2)
    const d = ('0'+ dt.getDate()).slice(-2)
    const h = ('0'+ dt.getHours()).slice(-2)
    const i = ('0'+ dt.getMinutes()).slice(-2)
    const s = ('0'+ dt.getSeconds()).slice(-2)
    return `${y}-${m}-${d} ${h}:${i}:${s}`
  }

  set_event(){
    this.button.addEventListener('click' , this.click_post.bind(this))
  }

  click_post(){
    if(!this.check_email(Login.mail)){
      alert('メールアドレスを入力してください。')
      return
    }
    const dt = new Date()
    this.set_local_storage({
      mail      : Login.mail,
      create_at : this.datetime,
    })
    this.move_create_page()
  }

  check_email(mail_string){
    console.log(mail_string)
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    return mail_string.match(regex)
  }

  set_local_storage(data){
    localStorage.setItem(SdsLogin.key , JSON.stringify(data))
  }

  move_create_page(){
    const back = Object.fromEntries(new URLSearchParams(location.search).entries()).back
    location.href = `?p=${back || 'sds_create'}`
  }

}

new Login()
