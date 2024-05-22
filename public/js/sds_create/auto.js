import { Login } from './login.js'

export class Auto{
  constructor(){
    this.mail()
  }

  get input_mail(){
    return document.querySelector(`input[name='writer_email']`)
  }

  mail(){
    this.input_mail.value = Login.data.mail
  }
}