<script>
	import Slider from '@components/Slider.svelte';
	import Options from '@components/Options.svelte';
	import { CornerType } from '@monokai/monoco';
	import { monoco } from '@monokai/monoco-svelte';
	import { colorLine } from '@scripts/core/Store';

	let {
		width = $bindable(1),
		height = $bindable(1),
		radius = $bindable(0.5),
		offset = $bindable(0),
		smoothing = $bindable(1),
		borderWidth1 = $bindable(0),
		borderWidth2 = $bindable(0),
		drawStrokes = $bindable(false),
		clip = $bindable(false),
		type = $bindable(CornerType.Squircle),
		hasBackground = $bindable(true),
		hasFilter = $bindable(false),
		hasContainerBackground = $bindable(false),
	} = $props();
</script>

<div class="container" use:monoco={{
	radius: 32,
	border: [2, $colorLine],
	clip: true
}}>
	<Options bind:value={type} label="type" options={Object.values(CornerType)} optionLabels={Object.values(CornerType)} />
	<Slider bind:value={smoothing} label="smoothing" enabled={type === CornerType.Squircle || type === CornerType.FigmaSquircle} />
	<Slider bind:value={width} label="width" />
	<Slider bind:value={height} label="height" />
	<Slider bind:value={radius} label="radius" />
	<Slider bind:value={offset} label="offset" />
	<Slider bind:value={borderWidth1} label="border 1" />
	<Slider bind:value={borderWidth2} label="border 2" />
	<Options bind:value={clip} label="clip" />
	<Options bind:value={hasFilter} label="filter" />
	<Options bind:value={hasBackground} label="background" />
	<Options bind:value={hasContainerBackground} label="container bg" />
	<Options bind:value={drawStrokes} label="debug" />
</div>

<style lang="scss">
	@use '@styles/variables' as *;

	.container {
		background-color: $color-panel;
		min-width: 36ch;
		padding: 1rem;
		font-family: monospace;
	}
</style>