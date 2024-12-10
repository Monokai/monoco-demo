type Timer = ReturnType<typeof setTimeout>;
type Funk = (...args: unknown[]) => void;

export default (funk:Funk, wait:number = 0.1, immediate:boolean = false) => {
	let timer:Timer | null = null;

	return (...args: unknown[]) => {
		let resolve:Funk;

		const callNow = immediate && !timer;

		const promise:Promise<void> = new Promise(_resolve => {
			resolve = _resolve;
		}).then(() => funk(...args));

		if (timer) {
			window.clearTimeout(timer);
		}

		timer = window.setTimeout(() => {
			timer = null;

			// if (!immediate) {
			resolve();
			// }
		}, wait * 1000);

		if (callNow) {
			// resolve();
			funk(...args);
		}

		return promise;
	};
}
