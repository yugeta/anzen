
export class Login{

  static get key(){
    return 'anzenquiz'
  }

  static get data(){
    const json = localStorage.getItem(this.key)
    return JSON.parse(json)
  }

  static check(options){
    if(this.data){
      options.logined()
    }
    else{
      options.unlogin()
    }
  }

  static logout(){
    localStorage.removeItem(this.key)
  }
  
}
