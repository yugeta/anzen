
export class HasChecked{
  constructor(){
    // if(navigator.userAgent.indexOf('Firefox') === -1){return}
    this.set_event()
  }

  static get elms(){
    return document.querySelectorAll('[data-has-checked]')
  }

  set_event(){
    const elms = HasChecked.elms
    for(const elm of elms){
      const check = this.get_check_element(elm)
      if(!check){continue}
      check.addEventListener('click' , this.click.bind(this))
    }
    // window.addEventListener('click' , this.click_window.bind(this))
  }
  get_check_element(elm){
    return elm.querySelector(`input[type='checkbox'], input[type='radio']`)
  }

  click(e){
    if(e.target.tagName !== 'INPUT'){return}
    const target = e.target.closest(`[data-has-checked]`)
    if(!target){return}
    if(e.target.checked){
      target.setAttribute('data-has-checked','true')
    }
    else{
      target.setAttribute('data-has-checked','')
    }
  }

  // click_window(e){
  //   if(e.target.tagName === 'LABEL'){return}
  //   this.close()
  //   if(e.target.closest('[data-has-checked]')){
  //     this.click(e)
  //   }
  // }

  // close(){
  //   const elms = HasChecked.elms
  //   for(const elm of elms){
  //     elm.setAttribute('data-has-checked','')
  //   }
  // }
}