import { autoInit } from '@dd/mdc-initializer'
import { Accordion } from './details-summary'

window.addEventListener('load', () => {
  const video = document.querySelector('.jumbotron--underlay > video') as HTMLVideoElement
  
  const transitionRate = (expectedRate: number, changeFunction: (rate: number) => number, callbackTimeout: number) => {
    console.log("rate", video.playbackRate,
      expectedRate - 0.001 < video.playbackRate,
      video.playbackRate < expectedRate + 0.001,
      video.playbackRate < .1,
      10 < video.playbackRate
    )
    if (
      (expectedRate - 0.001 < video.playbackRate && video.playbackRate < expectedRate + 0.001)
      || video.playbackRate < .1 || 10 < video.playbackRate
    ){
      video.playbackRate = expectedRate
      return;
    }
    
    video.playbackRate = changeFunction(video.playbackRate)
    setTimeout(() => transitionRate(expectedRate, changeFunction, callbackTimeout), callbackTimeout)
  }

  if (video) {
    transitionRate(.5, rate => rate < .5 ? .5 : rate * .97, 200)

    let dhue = 0;
    const rotateHue = (t: number) => setTimeout(() => {
      dhue = (dhue + Math.random() * 1) % 360
      console.log("hue", dhue)
      video.parentElement.style.filter = 'hue-rotate(' + dhue + 'deg)'
      rotateHue(t)
    }, t)

    rotateHue(200)
  }
  // window.requestAnimationFrame(() => {
  //   video.currentTime += 1/60 % video.duration
  // })

  const doRepeat = (root: ParentNode = document) => {
    root.querySelectorAll('[data-repeat]')
    .forEach(repeatable => {
      for (let count = 0; count < (repeatable.getAttribute("data-repeat") as unknown as number -1); count++) {
        const clone = repeatable.cloneNode(true)
        repeatable.parentNode.insertBefore(clone, repeatable);
        if ( root.querySelectorAll )
          doRepeat(clone as ParentNode)
      }
    })
  }

  doRepeat(document)

  document.querySelectorAll('[data-needs-src]')
  .forEach((srcable, i) => {
    const wm = Number.parseInt(srcable.getAttribute('data-wm')) || 500
    const wx = Number.parseInt(srcable.getAttribute('data-wx')) || 500
    const hm = Number.parseInt(srcable.getAttribute('data-hm')) || 400
    const hx = Number.parseInt(srcable.getAttribute('data-hx')) || 400
    const w = Math.floor(Math.random() * (wx - wm)) + wm
    const h = Math.floor(Math.random() * (hx - hm)) + hm
    srcable.setAttribute("src", "https://picsum.photos/id/" + (1070 +i) + "/" + w + "/" + h)
  })

  document.querySelectorAll('details.default')
  .forEach((details: HTMLDetailsElement) => {
    new Accordion(details)
  })


  document.querySelectorAll('.product-detail_description--collapsible')
  .forEach((decription: HTMLElement) => {
    const trigger = decription.querySelector('.product-detail_description--collapsible-trigger')
    const container: HTMLElement = decription.querySelector('.product-detail_description--collapsible-container')
    const content: HTMLElement = decription.querySelector('.product-detail_description--collapsible-content')

    let opened = false;

    trigger.addEventListener('click', () => {
      if (opened) {
        container.style.height = "0px"
      } else {
        container.style.height = getComputedStyle(content).height
      }
      
      opened = !opened

      trigger.querySelectorAll('.material-icons.mdc-icon-button__icon')
      .forEach(icon => icon.classList.toggle('mdc-icon-button__icon--on'))

      window.addEventListener('resize', () => {
        if (!opened) return;
        container.style.height = getComputedStyle(content).height
      })
    })
  })
})

autoInit()

console.log("ok")