
export class Asset{
  constructor(options){
    this.options = options || {}
    this.loaded_count = 0
    this.init()
  }

  init(){
    if(!this.options.files || !this.options.files.length){return}
    for(const file_data of this.options.files){
      if(!file_data.selector){continue}
      file_data.elm = document.querySelector(file_data.selector)
      
      if(!file_data.elm){continue}
      this.load(file_data)
    }
  }

  load(data){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , `${data.file}` , true)
    xhr.setRequestHeader('Content-Type', 'text/html');
    xhr.onreadystatechange = ((data,e) => {
      if(xhr.readyState !== XMLHttpRequest.DONE){return}
      if(xhr.status === 404){return}
      if (xhr.status === 200) {
        data.html = e.target.response
        this.loaded(data)
      }
    }).bind(this , data)
    xhr.send()
  }

  loaded(data){
    if(!data.elm || !data.html){return}
    data.elm.innerHTML = data.html
    this.run_script(data.elm)
    this.loaded_count++
    this.finish()
  }

  run_script(elm){
    const scripts = elm.getElementsByTagName('script')
    if(!scripts || !scripts.length){return}
    for(const script of scripts){
      if(script.src){
        this.add_script_src(script.src , script.type)
      }
      else if(script.textContent){
        this.add_script_text(script.textContent)
      }
    }
  }
  add_script_src(src , type){
    const s = document.createElement('script')
    s.src = src
    if(type){
      s.type = type
    }
    document.querySelector('head').appendChild(s)
  }
  add_script_text(text){
    eval(text);
  }

  finish(){
    if(this.loaded_count < this.options.files.length){return}
    if(this.options.callback){
      this.options.callback(this)
    }
  }
}