(()=>{
  const options = {
    data_path : 'data/yochitest.json'
  }

  function Quiz(){
    this.load_datas()
    switch(document.readyState){
      case 'complete':
      case 'interactive':
        this.loaded()
        break
      default:
        window.addEventListener('load' , this.loaded.bind(this))
        break
    }
  }

  Quiz.prototype.load_datas = function(){
    new Ajax({
      url : options.data_path +`?`+ (+new Date),
      method : 'get',
      success : this.loaded_datas.bind(this)
    })
  }
  Quiz.prototype.loaded_datas = function(e){
    this.datas = JSON.parse(e.response)
    this.loaded()
  }
  Quiz.prototype.loaded = function(){
    if(document.readyState !== 'complete'
    || !this.datas){return}
    this.init()
    this.set_next_button()
  }

  Quiz.prototype.init = function(){
    this.question_number = 0
    this.correct_counts  = 0
    this.slide_area = document.querySelector('.slide-area')
    // this.correct_mark = document.querySelector('.correct-mark')
    // this.correct_answer = document.querySelector('.correct-data .answer')
    // this.correct_comment = document.querySelector('.correct-data .comment')

    window.addEventListener('resize' , this.resize.bind(this))
  }

  Quiz.prototype.resize = function(){
    this.del_points()
  }

  Quiz.prototype.set_next_button = function(){
    const buttons = document.querySelectorAll('button.next')
    for(const button of buttons){
      button.addEventListener('click' , this.next_question.bind(this))
    }
  }

  Quiz.prototype.correct_clear = function(){
    document.body.setAttribute('data-correct' , '')
    // this.correct_mark.setAttribute('data-status' , '')
    // this.correct_answer.innerHTML = ''
    // this.correct_comment.innerHTML = ''
  }

  Quiz.prototype.next_question = function(){
    this.correct_clear()
    if(!this.datas.lists || !this.datas.lists.length){
      this.finish()
      return
    }
    this.current_data = this.datas.lists.shift()
    const temp = this.get_template('question-temp')
    this.current_data.question_number = ++this.question_number
    this.current_data.button_message = this.current_data.button_message || '正しい実験方法'

    const html = double_bracket(temp , this.current_data)
    this.slide_area.insertAdjacentHTML('beforeend' , html)
    this.set_question_points()
    this.set_event()
    this.go_next_question()
  }
  Quiz.prototype.set_question_points = function(){
    const img = document.querySelector('.content-area:last-child .q-img img')
    if(!img){return}
    img.parentNode.addEventListener('click' , this.click_question_image.bind(this))
  }
  Quiz.prototype.click_question_image = function(e){
    if(e.target.closest('.q-img img')){
      this.add_point(e)
    }
    if(e.target.closest('.q-img .point')){
      const point = e.target.closest('.q-img .point')
      point.parentNode.removeChild(point)
    }
    this.check_point_count()
  }
  Quiz.prototype.add_point = function(e){
    const rect      = e.currentTarget.getBoundingClientRect()
    const scroll    = document.scrollingElement
    const point     = document.createElement('div')
    point.className = 'point'
    point.style.setProperty('top'   , `${e.pageY - rect.top  - scroll.scrollTop}px`,'')
    point.style.setProperty('left'  , `${e.pageX - rect.left - scroll.scrollLeft}px`,'')
    point.style.setProperty('width' , `50px`,'')
    point.style.setProperty('height', `50px`,'')
    e.currentTarget.appendChild(point)
  }
  Quiz.prototype.check_point_count = function(){
    const points = document.querySelectorAll('.q-img .point')
    if(points.length < this.current_data.point_counts){return}
    this.answer()
  }
  Quiz.prototype.del_points = function(){
    const points = document.querySelectorAll('.q-img .point')
    for(const point of points){
      point.parentNode.removeChild(point)
    }
  }
  
  Quiz.prototype.answer = function(){
    const img = document.querySelector('.q-img img')
    img.src = this.current_data.answer_image
    const root = this.slide_area.querySelector(':scope > .content-area')
    root.setAttribute('data-status' , 'answer')
  }

  Quiz.prototype.get_template = function(name){
    const elm = document.querySelector(`.template > .${name}`)
    if(!elm){
      return null
    }
    else if(elm.tagName === 'TEXTAREA'){
      return elm.value
    }
    else{
      return elm.innerHTML
    }
  }

  Quiz.prototype.set_event = function(){
    const comment_button = document.querySelector(`.content-area button[data-status='answer']`)
    if(comment_button){
      comment_button.addEventListener('click' , this.click_comment.bind(this))
    }
    const next_button = document.querySelector(`.content-area button[data-status='comment']`)
    if(next_button){
      next_button.addEventListener('click' , this.next_question.bind(this))
    }
  }

  Quiz.prototype.click_comment = function(){
    const temp = this.get_template('comment-temp')
    this.current_data.question_number = this.question_number
    const html = double_bracket(temp , this.current_data)
    this.slide_area.insertAdjacentHTML('beforeend' , html)
    this.set_event()
    this.go_next_question()
  }

  // 
  Quiz.prototype.go_next_question = function(){
    this.question_top_scroll()
    const content_areas = this.slide_area.querySelectorAll('.content-area')
    if(content_areas.length < 2){return}
    content_areas[0].style.setProperty('margin-left' , 'calc(-100% - 24px)')
    setTimeout((()=>{
      content_areas[0].parentNode.removeChild(content_areas[0])
    }) , 500)
  }

  Quiz.prototype.finish = function(){
    const data = {
      correct_counts  : this.correct_counts,
      question_counts : this.question_number,
    }
    const temp = this.get_template('finish-temp')
    const html = double_bracket(temp , data)
    this.slide_area.insertAdjacentHTML('beforeend' , html)
    this.go_next_question()
  }

  Quiz.prototype.question_top_scroll = function(){
    if(document.body.offsetWidth > 500){return}
    const header_element = document.querySelector('header')
    const question_top_element = document.getElementById('question_top')
    if(!question_top_element){return}
    const rect = question_top_element.getBoundingClientRect()
    // console.log(rect , document.scrollingElement.scrollTop)
    document.scrollingElement.scrollTop += rect.top - header_element.offsetHeight
  }


  // ----------
  // Common

  // 任意文字列の中から、{{key}}という文字列を、{key:val}で置換する処理
  function double_bracket(str , data){
    if(data){
      const reg = new RegExp('{{(.*?)}}','g')
      const arr = []
      let res = []
      while ((res = reg.exec(str)) !== null) {
        arr.push(res[1])
      }
      for(let key of arr){
        const val = typeof data[key] !== 'undefined' ? data[key] : ''
        str = str.split('{{'+ String(key) +'}}').join(val)
      }
    }
    return str
  }

  function Ajax(options){
    this.options = options || {}
    const xhr = new XMLHttpRequest()
    xhr.open(
      this.options.method || 'post', 
      this.options.url, 
      this.options.async ?? true)
    xhr.setRequestHeader(
      'Content-Type', 
      this.options.content_type || 'application/x-www-form-urlencoded'
    )
    xhr.onload = this.loaded.bind(this)
    xhr.send(this.get_queries(this.options.query))
  }
  Ajax.prototype.get_queries = function(queries){
    if(!queries){return null}
    return Object.entries(queries).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');
  }
  Ajax.prototype.loaded = function(e){
    if(!this.options.success){return}
    this.options.success(e.target)
  }

  new Quiz()
})()