

export class Event{
  constructor(){
    window.addEventListener('click' , this.click.bind(this))
  }

  static get hazardous_float(){
    return document.querySelector(`.division-lists`)
  }

  static get hazardous_tds_active(){
    return document.querySelectorAll(`.inputs .health td[data-status='active']`)
  }

  static get form_create(){
    return document.forms.create
  }

  static get fix_data_form(){
    return document.forms.post_data
  }

  static get fix_data_input(){
    return Event.fix_data_form.json
  }

  click(e){
    this.clear_hazardous_td()
    
    // hazardous-td
    if(e.target.closest('.health td')){
      this.click_hazardous(e)
    }

    // hazardous-float
    else if(e.target.closest('.division-lists label')){
      this.click_hazardous_float(e)
    }

    // save
    else if(e.target.closest('.buttons button.btn-save')){
      this.save()
    }

    else{
      this.clear_hazardous_float()
    }
  }

  click_hazardous(e){
    const margin = 0
    const elm = e.target.closest('.health td')
    elm.setAttribute('data-status' , 'active')
    // const rect = elm.getBoundingClientRect()
    // const x = rect.left + rect.width - margin + document.scrollingElement.scrollLeft - 250
    // Event.hazardous_float.style.setProperty('left' , `${x}px`)
    // const y = rect.top + rect.height - margin + document.scrollingElement.scrollTop
    // Event.hazardous_float.style.setProperty('top' , `${y}px`)
    Event.hazardous_float.setAttribute('data-status' , 'active')
    this.current_hazardous_td = elm
  }
  clear_hazardous_float(){
    if(!Event.hazardous_float.hasAttribute('data-status')){return}
    Event.hazardous_float.removeAttribute('data-status')
  }
  clear_hazardous_td(){
    const lists = Event.hazardous_tds_active
    if(!lists.length){return}
    for(const list of lists){
      list.removeAttribute('data-status')
    }
  }

  click_hazardous_float(e){
    if(e.target.tagName === 'LABEL'){return}
    if(!this.current_hazardous_td){return}
    const label    = e.target.closest('.division-lists label')
    const radio    = label.querySelector(`input[type='radio']`)
    const input    = this.current_hazardous_td.querySelector(`input[type='hidden']`)
    input.value    = radio.value
    this.clear_hazardous_float()
    this.current_hazardous_td.setAttribute('data-type' , radio.value)
  }

  save(){
    const datas = {}
    for(const key in Event.form_create){
      if(!key.match(/[0-9]+?/)){continue}
      // console.log(key,this.form_create[key])
      if(!Event.form_create[key].tagName){continue}
      const name = Event.form_create[key].name
      if(!name){continue}
      const value = this.get_form_value(Event.form_create[key])
      datas[name] = value
    }
    // console.log(datas)
    // console.log(Event.fix_data_input)
    Event.fix_data_input.value = JSON.stringify(datas)
    Event.fix_data_form.submit()
  }
  get_form_value(elm){
    if(elm.tagName === 'INPUT'
    && elm.type === 'checkbox'){
      return elm.checked ? 1 : 0
    }
    else if(elm.tagName === 'INPUT'
    && elm.type === 'number'){
      return Number(elm.checked)
    }
    else{
      return elm.value
    }
  }

}