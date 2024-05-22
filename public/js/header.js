export class Header{
  constructor(){
    this.set_sds()
  }
  get elm_menu_sds(){
    return document.querySelector(`#navbarNav > ul > li.sds > span`)
  }

  set_sds(){
    // this.elm_menu_sds.addEventListener('click' , this.click_sds.bind(this))
  }
  click_sds(){
    console.log('sds')
  }
  view_sds_lists(){

  }

}
switch(document.readyState){
  case 'complete':
  case 'interactive':
    new Header()
    break
  default:
    window.addEventListener('DOMContetLoaded' , (()=>{
      new Header()
    }))
    break
}
