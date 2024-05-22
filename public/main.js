import { Init } from './js/init.js'

export const Main = {
  current_page : get_current_page() || 'index',

}



function get_current_page(){
  if(!location.search || location.search.indexOf('?') === -1){return null}
  const queries = Object.fromEntries(new URLSearchParams(location.search))
  return queries.p || null
}

switch(document.readyState){
  case 'complete':
  case 'interactive':
    new Init()
    break
  default: 
    window.addEventListener('DOMContetLoaded' , (()=>{
      new Init()
    }))
    break
}
