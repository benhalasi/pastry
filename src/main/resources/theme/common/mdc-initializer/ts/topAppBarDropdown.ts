
class MDCTopAppBarDropdown {
	
	private elem: HTMLElement
	private target: HTMLElement

	private static open: HTMLElement[] = []
	
	constructor(el: HTMLElement) {
		this.elem = el
		this.target = document.getElementById(el.dataset.dropdownTarget)

		if(this.target){
			this.__init()
		}
	}

	__init () {
		// console.log('init')

		this.elem.addEventListener('mouseenter', () => {
			// console.log('mouseenter', this.elem.dataset.dropdownTarget)
			this.__open()
		})

		this.elem.addEventListener('mouseleave', () => {
			// console.log('mouseleave', this.elem.dataset.dropdownTarget)
			this.__close()
		})

		this.elem.addEventListener('focus', () => {
			// console.log('focus', this.elem.dataset.dropdownTarget)
			this.__open(0)
		})

		this.elem.addEventListener('blur', () => {
			// console.log('blur', this.elem.dataset.dropdownTarget)
			this.__close()
		})
	}

	__open (position = MDCTopAppBarDropdown.open.length) {
					MDCTopAppBarDropdown.open.splice(position, 0, this.target)
		this.__update()
	}

	__close () {
		MDCTopAppBarDropdown.open.splice(MDCTopAppBarDropdown.open.lastIndexOf(this.target), 1)
		if(!MDCTopAppBarDropdown.open.includes(this.target)){
			this.target.classList.remove('mdc-top-app-bar-dropdown__content--open')
		}
		this.__update()
	}

	__update() {
		// console.log(MDCTopAppBarDropdown.open)
		let alreadyOpenedOne = false
		MDCTopAppBarDropdown.open.forEach(el => {
			if(alreadyOpenedOne && MDCTopAppBarDropdown.open.indexOf(this.target) === MDCTopAppBarDropdown.open.lastIndexOf(this.target)){
				el.classList.remove('mdc-top-app-bar-dropdown__content--open')
			} else {
				el.classList.add('mdc-top-app-bar-dropdown__content--open')
				alreadyOpenedOne = true
			}
		})
	}

	static attachTo (el: HTMLElement) {
		return new MDCTopAppBarDropdown(el)
	}
}

export { MDCTopAppBarDropdown }