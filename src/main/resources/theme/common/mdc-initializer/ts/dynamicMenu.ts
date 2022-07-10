
type DynamicMenuElement = HTMLButtonElement | HTMLLinkElement

import { MDCMenu, DefaultFocusState } from '@material/menu'
import { registry } from './AsisMDCComponentConfiguration'

class MDCDynamicMenu {
	
	private elem: DynamicMenuElement
	private target: MDCMenu
	
	constructor(el: DynamicMenuElement) {
		this.elem = el
		this.target = new MDCMenu(document.getElementById(el.dataset.menuTarget));

		if(this.target){
			this.__init()
		}
	}

	__init () {
		this.target.setAnchorElement(this.elem)
		this.target.singleSelection = false
		this.target.setDefaultFocusState(DefaultFocusState.LAST_ITEM)

		this.elem.addEventListener('click', e => {
			this.target.setAbsolutePosition(this.elem.getBoundingClientRect().x, this.elem.getBoundingClientRect().y)
			this.target.open = !this.target.open
		})
				
		registry.topAppBar.get(this.elem.closest('.mdc-top-app-bar'))
			.then(topAppBar => {
				this.target.root.classList.add('mdc-menu-surface--in-top-app-bar')
				// @ts-ignore
				topAppBar.foundation.handleTopAppBarClose = () => {
					this.target.open = false
				}
			})
	}

	static attachTo (el: DynamicMenuElement) {
		return new MDCDynamicMenu(el)
	}
}

export { MDCDynamicMenu }