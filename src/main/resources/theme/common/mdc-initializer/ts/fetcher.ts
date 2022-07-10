// type Entries<T> = {
// 	[K in keyof T]: [K, T[K]];
// }[keyof T][];

type Action<C, S> = (consumes: C) => Promise<S>
type NonMappingAction<T> = Action<T, T>
class NotOKResponse extends Error {}

class RequestQueueElement {
	request: RequestInit
	ts: number
	cancel: () => void

	static of (
		requestInit: RequestInit,
		cancel: () => void
	) : RequestQueueElement {
		const rqe = new RequestQueueElement
		rqe.ts = Date.now()
		rqe.request = requestInit
		rqe.cancel = cancel
		return rqe
	}
}

/**
 * This builder does not grant that the fetch result will be type T,
 * you have to pay attention to configure pipes in a way that the result will be type T.
 */
class Fetcher<T> {

	public static readonly errorWhenNotOK: Action<Response, Response> = (response: Response) => {
		if(!response.ok) throw new NotOKResponse('XHR ' + response.status + ': ' + response.statusText)
		return Promise.resolve(response)
	}

	public static readonly log: NonMappingAction<any> = (data: any) => {
		console.log(data)
		return data
	}

	public static readonly toText: Action<Response, String> = (response: Response) => {
		return response.text()
	}

	public static readonly toJson: Action<Response, Object> = (response: Response) => {
		return response.json()
	}

	urlBase: string = ""
	params: RequestInit = {}
	pipes: Action<any, any>[] = []
	readonly queue: Map<string, RequestQueueElement> = new Map()

	constructor (urlBase: string, params: RequestInit = {}) {
		this.urlBase = urlBase;
		this.params = params;
	}

	public fetch (urlExt: string = "", params: RequestInit = {}, timeout = 0): Promise<T> {
		const uri = this.urlBase.concat(urlExt)
		const requestParams = { ...this.params, ...params }

		return new Promise((resolve, reject) => {
			console.groupCollapsed(uri)
			const timer = setTimeout(() => {
				console.groupCollapsed(uri, "timer")
				let request: Promise<any> = fetch(uri, requestParams)
				for (const pipe of this.pipes) {
					request = request.then(pipe)
				}
				request.then(v => {
					this.queue.delete(uri)
					console.log("resolve promise");
					resolve(v)
				})
				console.groupEnd()
			}, timeout)

			if(this.queue.has(uri)){
				const r = this.queue.get(uri)
				console.log("cancel previous request");
				r?.cancel()
			}

			this.queue.set(uri, RequestQueueElement.of(requestParams, () => {
				console.groupCollapsed(uri, "cancel handler")
				console.log("delete queue entry");
				this.queue.delete(uri)
				console.log("clear timeout", timer);
				clearTimeout(timer)
				console.log("reject promise");
				reject()
				console.groupEnd()
			}))
			console.groupEnd()
		})
	}
}

export {Fetcher, NotOKResponse, Action, NonMappingAction}