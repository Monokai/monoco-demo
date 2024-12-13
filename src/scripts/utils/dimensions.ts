import debounce from '@scripts/utils/debounce';

export default function dimensions(node: HTMLElement, callbackOrObject: (rect: DOMRect, node: HTMLElement, r: ResizeObserverEntry[]) => void | {
	callback: (rect: DOMRect, node: HTMLElement, r: ResizeObserverEntry[]) => void,
	debounce?: number
}) {
	const {
		callback,
		debounce:debounceSeconds = 0
	} = callbackOrObject instanceof Function ? { callback: callbackOrObject } : callbackOrObject;

	const debouncedResize = (() => {
		let previousX:number | null = null;
		let previousY:number | null = null;
		let previousW:number | null = null;
		let previousH:number | null = null;

		return debounce((list:ResizeObserverEntry[]) => {
			// use getBoundingClientRect() instead of contentRect to get the actual size of the element
			const rect = list[0].target.getBoundingClientRect();

			if (
				previousX !== rect.left ||
				previousY !== rect.top ||
				previousW !== rect.width ||
				previousH !== rect.height
			) {
				callback(rect, node, list);

				previousX = rect.left;
				previousY = rect.top;
				previousW = rect.width;
				previousH = rect.height;
			}
		}, debounceSeconds, true);
	})();

	const resizeObserver = new ResizeObserver(debouncedResize);

	resizeObserver.observe(node);

	return {
		destroy() {
			resizeObserver.disconnect();
		}
	};
}