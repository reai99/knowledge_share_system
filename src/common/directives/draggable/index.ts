import { DirectiveOptions } from 'vue'

export const draggable: DirectiveOptions = { 
  bind(el) {
    let position;
    el.onmousedown = (e) => {
      e.stopPropagation();
      position = el.getBoundingClientRect()
      document.onmousemove = (e) => {
        const positionTop = e.clientY - position.height/2
        const positionLeft = e.clientX - position.width/2
        el.style.cssText += `;top:${positionTop}px;left:${positionLeft}px`
      }
      document.onmouseup = (e) => {
        e.stopPropagation();
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}