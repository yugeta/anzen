import { Event } from './event.js'

export class Load{
  constructor(){
    const id = Object.fromEntries(new URLSearchParams(location.search).entries()).id
    if(!id){return}
    this.set_id(id)
    this.load(id)
  }

  static get php(){
    return 'data.php'
  }

  set_id(id){
    Event.fix_data_form.id.value = id
  }

  load(id){
    const query = {
      mode : 'load',
      id   : id,
    }
    const xhr = new XMLHttpRequest()
    xhr.open('post' , Load.php , true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = ((e) => {
      if(xhr.readyState !== XMLHttpRequest.DONE){return}
      if(xhr.status === 404){return}
      if(xhr.status === 200){
        this.loaded(e)
      }
    }).bind(this)
    const query_string = Object.entries(query).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')
    xhr.send(query_string)
  }

  loaded(e){
    if(!e || !e.target || !e.target.response){return}
    this.data = JSON.parse(e.target.response)
    this.set_form_value()
  }

  set_form_value(){
    console.log(this.data)
    const form = Event.form_create
    for(const input of form){
      if(typeof this.data[input.name] === 'undefined'){continue}
      if(input.name.match(/^hazardous_/)
      || input.name.match(/^environment_/)){
        const td = input.closest(`td`)
        input.value = this.data[input.name]
        td.setAttribute('data-type' , this.data[input.name])
      }
      else if(input.name.match(/^ghs_/)
      || input.name.match(/^protective_/)){
        if(this.data[input.name]){
          input.checked = true
        }
      }
      else{
        input.value = this.data[input.name]
      }
    }
  }
}
