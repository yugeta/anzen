import { Main } from './main.js'

export class Data{
  constructor(){
    this.load()
  }

  get root(){
    return document.querySelector(`.karuta-lists`)
  }

  load(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , Main.data_file , true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = this.loaded.bind(this)
    xhr.send()
  }
  loaded(e){
    this.datas = JSON.parse(e.target.response)
    this.view()
  }
  view(){
    for(const data of this.datas){
      const a = document.createElement('div')
      a.className = 'a'
      a.innerHTML = `<img src='img/karuta/${data.id}_a.png'/>`
      this.root.appendChild(a)

      const b = document.createElement('div')
      b.className = 'b'
      b.innerHTML = `<img src='img/karuta/${data.id}_b.png'/>`
      this.root.appendChild(b)

      const c = document.createElement('div')
      c.className = 'c'
      c.innerHTML = data.text
      this.root.appendChild(c)
    }
  }
}
