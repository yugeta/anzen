
export class Style{
  constructor(){
    this.run_scroll_reveal()
  }

  run_scroll_reveal(){
    window.ScrollReveal().reveal('.fade1', { delay: 600 });
    window.ScrollReveal().reveal('.fade2', { delay: 1000 });
    window.ScrollReveal().reveal('.fade3', { delay: 1400 });
    window.ScrollReveal().reveal('.fade4', { delay: 1800 });
  }
}