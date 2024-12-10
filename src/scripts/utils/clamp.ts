export default function clamp(val:number, min:number, max = Number.MAX_VALUE) {
	return val < min ? min : (val > max ? max : val);
}