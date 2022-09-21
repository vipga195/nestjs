import gsap, { Power0 } from 'gsap'
import { disableScroll, enableScroll } from '@/utils/helpers'
import { helper } from '@/plugins/helper'

export default class Menu {
  menuInner: HTMLElement
  menuItems: Element[]
  timeline: GSAPTimeline
  menuButton: HTMLElement
  menuWrapper: HTMLElement

  private _canClick: boolean
  private _active: boolean
  private scrollPosition: number

  constructor(wrapper: HTMLElement, button: HTMLElement) {
    this.menuWrapper = wrapper
    this.menuButton = button
    this.menuInner = wrapper.querySelector('.c-menu__inner') as HTMLElement
    this.menuItems = Array.from(wrapper.querySelectorAll('.c-menu_items__item'))

    this.timeline = gsap.timeline({ paused: true, reversed: true, onReverseComplete: () => this.onReverseCompleted() })

    this._canClick = true
    this._active = false
    this.scrollPosition = 0
    button.addEventListener('click', () => this._canClick && this.toggle(), true)
  }

  get active() {
    return this._active
  }

  set active(value) {
    this._canClick = false
    if (value === this._active) { return }
    this._active = value
    if (this._active) {
      this.animation()
      this.timeline.play()
      this.menuButton.classList.add('active')
      this.menuWrapper.classList.add('active')
      this.scrollPosition = window.scrollY
      disableScroll(this.scrollPosition)
    } else {
      this._canClick = false
      this.timeline.reverse(0)
      enableScroll(this.scrollPosition)
    }
  }

  onReverseCompleted() {
    this.timeline.clear()
    this._canClick = true
    this.menuButton.classList.remove('active')
    this.menuWrapper.classList.remove('active')
  }

  toggle() {
    if (!this.active) {
      helper.handleGtagEvent('header', 'menu_open')
    } else {
      helper.handleGtagEvent('header', 'menu_close')
    }
    this.active = !this.active
  }

  animation() {
    return this.timeline
      .to(this.menuInner, {
        duration: 0.2,
        delay: 0.1,
        width: '100%',
        ease: Power0.easeNone
      })
      .to(this.menuItems, {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) rotate(-13.5deg) skewX(-13.5deg)',
        duration: 0.1,
        ease: Power0.easeNone,
        stagger: 0.05,
        onComplete: () => {
          this._canClick = true
        }
      })
  }

  close() {
    this.active = false
  }
}
