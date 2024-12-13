import type { PathOptions } from '@monokai/monoco';
import { createPath } from '@monokai/monoco';

type PathCommand = [string, number[]];

export function getCornerRadii({
	width = 0,
	height = 0,
	offset:offsetOrArray = 0,
	radius:radiusOrArray = 0
}: {
	width?: 0,
	height?: 0,
	offset?: number | number[],
	radius?: number | number[]
} = {}) {
	const offsets = Array.isArray(offsetOrArray) ? offsetOrArray : [offsetOrArray, offsetOrArray, offsetOrArray, offsetOrArray];
	const [ot, or, ob, ol] = offsets;
	const w = width - ol - or;
	const h = height - ot - ob;
	const minSize = Math.min(width, height) * 0.5
	const radii = (Array.isArray(radiusOrArray) ? radiusOrArray : [radiusOrArray, radiusOrArray, radiusOrArray, radiusOrArray]).map((r, i) => Math.min(Math.max(0, r - offsets[i]), minSize));

	return [
		[ol + radii[0], ot + radii[0], radii[0]],
		[ol + w - radii[1], ot + radii[1], radii[1]],
		[ol + w - radii[2], ot + h - radii[2], radii[2]],
		[ol + radii[3], ot + h - radii[3], radii[3]]
	]
}

export function getControlPoints(options:PathOptions) {
	const path = createPath({
		...options,
		isArray: true
	});

	let lastAbsolute = [0, 0];

	const points = (path as PathCommand[])
		.filter(([command]:PathCommand) => !(/^[Z]/i).test(command))
		.map(([command, args]:PathCommand) => {
			const x = args[args.length - 2];
			const y = args[args.length - 1];

			if ((/^[A-Z]/).test(command)) {
				lastAbsolute = [x, y];
			} else {
				lastAbsolute[0] += x;
				lastAbsolute[1] += y;
			}

			return [
				lastAbsolute[0],
				lastAbsolute[1]
			]
		})

	return points;
}