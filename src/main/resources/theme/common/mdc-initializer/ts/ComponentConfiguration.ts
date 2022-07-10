
import * as mdc from 'material-components-web'

type Resolver<T> = (value: T) => void

class ComponentRegistry<T> {

	private registry: Map<Element, T>
	private promises: Map<Element, Resolver<T>[]>

	constructor () {
		this.registry = new Map();
		this.promises = new Map();
	}

	has(el: Element) {
		return this.registry.has(el);
	}

	register(el: Element, registree: T) {
		this.registry.set(el, registree)

		if(this.promises.has(el)){
			this.promises.get(el).forEach(resolver => resolver(registree))
			this.promises.delete(el)
		}
	}

	deregister(el: Element) {
		this.registry.delete(el)
	}

	get (el: Element, timeout: number = NaN): Promise<T> {
		if(!el){
			return Promise.reject(el)
		}

		if(this.has(el)){
			return Promise.resolve(this.registry.get(el))
		}

		return new Promise((res, rej) => {
			if(!this.promises.has(el)){
				this.promises.set(el, [])
			}
			if(isFinite(timeout)){
				setTimeout(rej.bind(null, el), timeout)
			}
			this.promises.get(el).push(res)
		});
	}

	getAll() {
		return this.registry.values();
	}
}

/**
 * When adding an extra registry for a component,
 * DO NOT FORGET to add that registry to registry continer too.
 *  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓
*/

let components = {
	...mdc,
	topAppBar: {
		... mdc.topAppBar,
		registry: new ComponentRegistry<mdc.topAppBar.MDCTopAppBar>(),
	},
	drawer: {
		... mdc.drawer,
		registry: new ComponentRegistry<mdc.drawer.MDCDrawer>()
	},
	textField: {
		... mdc.textField,
		registry: new ComponentRegistry<mdc.textField.MDCTextField>()
	}
}

/**
 * When adding an extra registry for a component,
 * DO NOT FORGET to add that registry to registry continer too.
 *  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓
 */

let registry = {
	stash: new ComponentRegistry<any>(),
	topAppBar: components.topAppBar.registry,
	drawer: components.drawer.registry,
	textField: components.textField.registry
}

export { components, registry, ComponentRegistry }
