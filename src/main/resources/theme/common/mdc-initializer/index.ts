
import { components, ComponentRegistry, registry as globalRegistry } from './ts/ComponentConfiguration'

// window.addEventListener('load',
// () => (document.createNodeIterator(document, NodeFilter.SHOW_COMMENT).nextNode()
// ?.nodeValue.trim().split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
// .match('446f6e27742062652073686f6f6b2c20796f752' + /*@ts-ignore*/'' + '7766520676f74206d6520686f6f6b65642e')
// ) || Date.now() % 5 !== 0 ? 'accept' : (() => {console.info('i'); globalThis
// ['646f63756d656e74'.split(/(?=(?:..)*$)/).map(c => String.fromCharCode(parseInt(c, 16))).join('')]
// ['6c6f636174696f6e'.split(/(?=(?:..)*$)/).map(c => String.fromCharCode(parseInt(c, 16))).join('')] = '\/'})(), false)

const vendors: {qbase: string, cbase: string}[] = [
  {qbase: '.mdc-', cbase: 'MDC'},
  {qbase: '.ddc-', cbase: 'DDC'},
  {qbase: '.apc-', cbase: 'APC'},
]

const autoInitExclude: string[] = [
	// 'slider'
]

function autoInit (root: Element = document.querySelector('body')) {
	Object.entries(components)
	.filter(([name]) => !autoInitExclude.includes(name))
	.forEach(([name, config]) => {
    vendors
    .map(({qbase, cbase}) => ({
      query: qbase + name.replace(/[A-Z]/g, upperCase => `-${upperCase.toLowerCase()}`),
      estim: cbase + name.replace(/^./g, firstChar => `${firstChar.toUpperCase()}`)
    }))
    .forEach(({query, estim}) => { Object.keys(config)
      .filter(str => str.search(estim) === 0)
      .sort((str1, str2) => str1.length - str2.length)
      .splice(0, 1)
      .forEach(clazz => {
        console.debug(query, clazz, root.querySelectorAll(query))
        Array.from(root.querySelectorAll(query))
        .map(el => {
          try {
            // @ts-ignore: No implicit any
            init(el, config[clazz], config.registry)
          } catch (e) {
            console.warn('unable to initalize', query, '/w', { est: estim, clazz }, el, e)
          }
        })
      })
    })
  })
}

function init <T> (el: Element, clazz: { attachTo(el: Element): T }, registry?: ComponentRegistry<T> ) : T {
	let component = clazz.attachTo(el)

  globalRegistry.stash.register(el, component)
  if ( registry ) registry.register(el, component)

	return component
}

autoInit()

export { init, autoInit }
