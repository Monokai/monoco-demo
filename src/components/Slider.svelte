<script>
	import lerp from '@utils/lerp';
	import { monoco } from '@monokai/monoco-svelte';

	let {
		value = $bindable(0),
		enabled = true,
		label = 'title',
		min = 0,
		max = 1,
		rounded = false,
		decimals = rounded ? 0 : 2,
		step = 0.00001
	} = $props();

	function transformBack(value) {
		return (value - min) / (max - min);
	}

	function transform(value) {
		const lerped = lerp(min, max, value);

		if (rounded) {
			return Math.round(lerped);
		}

		return lerped;
	}

	function onChange(e) {
		transformedValue = Number(e.target.value)
		value = transformBack(transformedValue);
	}

	let sliderValue = $state(transformBack(value));
	let transformedValue = $derived(transform(sliderValue));
	let presentationValue = $derived(transformedValue.toFixed(decimals))

	$effect(() => {
		value = transformedValue
	})
</script>

<div class="container"
	class:is-enabled={enabled}
>
	<div class="label">{label}</div>
	<div class="slider">
		<input type="range" min="0" max="1" bind:value={sliderValue} step={step} disabled={!enabled} />
	</div>
	<div class="value">
		<input type="text" value={presentationValue} onchange={onChange} disabled={!enabled} use:monoco={{
			radius: 8,
			clip: true
		}} />
	</div>
</div>

<style lang="scss">
	@use '@styles/variables' as *;

	.container {
		width: 100%;
		padding: 0.5rem;
		display: grid;
		grid-template-columns: 8ch 1fr 4ch;
		font-size: 0.75rem;
		justify-content: center;
		align-items: center;
		pointer-events: none;
		color: $color-dim;

		&.is-enabled {
			color: $color-text;
			pointer-events: auto;
		}
	}

	.label {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	input {
		width: 100%;
		margin: 0;
		vertical-align: middle;
		color: inherit;
	}

	.value {
		input {
			width: 5ch;
			padding: 0.125rem 0.25rem;
			border: none;
			appearance: none;
			font-size: inherit;
			color: inherit;
			background: $color-background;
		}
	}

	.slider {
		flex: 1;
		margin: 0 0.75rem;
	}

	.value {
		width: 4ch;
	}
</style>