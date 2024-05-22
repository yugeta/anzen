(()=>{
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
      url : 'data/quiz.json' +`?`+ (+new Date),
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
    this.correct_mark = document.querySelector('.correct-mark')
    this.correct_answer = document.querySelector('.correct-data .answer')
    this.correct_comment = document.querySelector('.correct-data .comment')
  }

  Quiz.prototype.set_next_button = function(){
    const buttons = document.querySelectorAll('button.next')
    for(const button of buttons){
      button.addEventListener('click' , this.next_question.bind(this))
    }
  }

  Quiz.prototype.correct_clear = function(){
    document.body.setAttribute('data-correct' , '')
    this.correct_mark.setAttribute('data-status' , '')
    this.correct_answer.innerHTML = ''
    this.correct_comment.innerHTML = ''
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
    this.current_data.answer_lists = this.answer_lists(this.current_data.answers)
    const html = double_bracket(temp , this.current_data)
    this.slide_area.insertAdjacentHTML('beforeend' , html)
    this.set_anwers_event()
    this.go_next_question()
  }

  Quiz.prototype.answer_lists = function(answers){
    if(!answers || !answers.length){return}
    let html = ''
    for(const answer of answers){
      html += `<button class="green">${answer.name}</button>`
    }
    return html
  }

  Quiz.prototype.get_template = function(name){
    const elm = document.querySelector(`.template > .${name}`)
    if(!elm){return}
    return elm.innerHTML
  }

  Quiz.prototype.set_anwers_event = function(){
    const content_areas = this.slide_area.querySelectorAll('.content-area')
    if(content_areas.length < 2){return}
    const answers = content_areas[1].querySelectorAll(`button`)
    for(const answer of answers){
      answer.addEventListener('click' , this.click_answer.bind(this))
    }
  }
  Quiz.prototype.click_answer = function(e){
    const value = e.target.textContent
    const target_data = this.current_data.answers.find(e => e.name === value)
    // 正解
    if(target_data.correct === true){
      this.correct_counts++
      this.correct_view('ok')
      // e.currentTarget.setAttribute('data-status' , 'ok')
    }
    // 不正解
    else{
      this.correct_view('ng')
      // e.currentTarget.setAttribute('data-status' , 'ng')
    }
    // setTimeout(this.next_question.bind(this) , 500)
  }

  Quiz.prototype.correct_view = function(status){
    document.body.setAttribute('data-correct' , 'view')
    this.correct_mark.setAttribute('data-status' , status)
    this.correct_answer.innerHTML = this.get_correct_value()
    this.correct_comment.innerHTML = this.current_data.comment || ''
  }

  Quiz.prototype.get_correct_value = function(){
    const values = []
    let num = 0
    for(const answer of this.current_data.answers){
      num++
      if(!answer.correct){continue}
      values.push(`<div>${answer.name}</div>`)
      // values.push(`<div>${num}. ${answer.name}</div>`)
    }
    return values.join()
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
    console.log(rect , document.scrollingElement.scrollTop)
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