import { Convert } from '../lib/convert.js'

export class SdsCard{
  constructor(root , datas){
    if(!root || !datas){return}
    this.root = root
    this.datas = datas
    this.load_template()
  }

  load_template(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , 'assets/sds_card.html' , true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = ((e) => {
      if(xhr.readyState !== XMLHttpRequest.DONE){return}
      if(xhr.status === 404){return}
      if(xhr.status === 200){
        this.loaded_template(e)
      }
    }).bind(this)
    xhr.send()
  }

  loaded_template(e){
    this.template = e.target.response
    this.view()
  }

  view(){
    for(const data of this.datas){
      this.append_card(data)
    }
  }

  append_card(data){
    const html = new Convert(this.template).double_bracket(data)
    this.root.insertAdjacentHTML('beforeend' , html)
  }
}