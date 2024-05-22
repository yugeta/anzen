import { Main }    from './main.js'
import { SdsCard } from '../sds_create_lists/sds_card.js'

export class List{
  constructor(){
    this.load()
  }

  get sds_cards(){
    return document.querySelector('.sds_cards')
  }

  load(){
    const query = {
      mode : 'get_lists'
    }
    const xhr = new XMLHttpRequest()
    xhr.open('post' , Main.php , true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = this.loaded.bind(this)
    const query_string = Object.entries(query).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
    xhr.send(query_string)
  }

  loaded(e){
    // console.log(e.target.response)
    if(!e || !e.target || !e.target.response){return}
    const data = JSON.parse(e.target.response)
    // console.log(data)
    new SdsCard(this.sds_cards , data)
  }
}
