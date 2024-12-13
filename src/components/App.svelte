<script lang="ts">
	import { CornerType } from '@monokai/monoco';
	import { monoco }  from '@monokai/monoco-svelte';
	import { getControlPoints, getCornerRadii} from '@utils/PathUtils';
	import Controls from '@components/Controls.svelte';
	import dimensions from '@utils/dimensions';
	import { colorText } from '@scripts/core/Store';

	let controls = $state(null);

	let width = $state(0.75);
	let height = $state(0.75);
	let radius = $state(0.5);
	let smoothing = $state(1);
	let offset = $state(0);
	let type = $state(CornerType.Squircle);
	let drawStrokes = $state(false);
	let borderWidth1 = $state(0.05);
	let borderWidth2 = $state(0);
	let clip = $state(false);
	let cornerRadii = $state(null);
	let controlPoints = $state(null);
	let hasFilter = $state(false);
	let hasBackground = $state(true);
	let hasContainerBackground = $state(false);
	let containerRect = $state({
		width: 0,
		height: 0
	})

	let rect = $derived({
		width: Math.round(containerRect.width * width),
		height: Math.round(containerRect.height * height)
	});

	function onResize(r:DOMRect) {
		const size = Math.min(r.width, r.height);

		containerRect = {
			width: size,
			height: size
		}
	}

	const options = $derived({
		background: hasBackground ? '#f24' : 'transparent',
		border: [
			[borderWidth1 * containerRect.width * 0.5, $colorText],
			[borderWidth2 * containerRect.width * 0.5, '#fff']
		],
		// width: rect.width,
		// height: rect.height,
		radius: radius * containerRect.width * 0.5,
		offset: offset * containerRect.width * 0.5,
		smoothing,
		clip,
		type
	});

	$effect(() => {
		const o = {
			...options,
			width: rect.width,
			height: rect.height
		}

		cornerRadii = getCornerRadii(o);
		controlPoints = getControlPoints(o);
	});
</script>

<div class="app">
	<div class="controls">
		<Controls
			bind:this={controls}
			bind:width={width}
			bind:height={height}
			bind:radius={radius}
			bind:offset={offset}
			bind:smoothing={smoothing}
			bind:drawStrokes={drawStrokes}
			bind:borderWidth1={borderWidth1}
			bind:borderWidth2={borderWidth2}
			bind:type={type}
			bind:clip={clip}
			bind:hasFilter={hasFilter}
			bind:hasBackground={hasBackground}
			bind:hasContainerBackground={hasContainerBackground}
		/>
	</div>
	<div class="content">
		<div class="block-wrapper"
			use:dimensions={{callback: onResize, debounce: 0}}
		>
			<div
				class="block-size"
				style={Object.entries({
					'width': `${rect.width}px`,
					'height': `${rect.height}px`,
				}).map(([key, value]) => `${key}: ${value}`).join(';')}
			>
				<div
					use:monoco={options}
					class="block squircle"
					class:filter={hasFilter}
					class:background={hasContainerBackground}
				></div>

				{#if drawStrokes}
					<svg viewBox={`0 0 ${rect.width} ${rect.height}`}>
						<rect x="0" y="0" width={rect.width} height={rect.height} fill="none" stroke="#fff" stroke-width="2" />

						{#if cornerRadii}
							{#each cornerRadii as [x, y, r]}
								<circle cx={x} cy={y} r={r} fill="none" stroke="#fff" stroke-width="2" />
							{/each}
						{/if}

						{#if controlPoints}
							{#each controlPoints as [x, y]}
								<circle cx={x} cy={y} r="4" fill="#fff" />
							{/each}
						{/if}
					</svg>
				{/if}
			</div>
		</div>
	</div>
</div>


<style lang="scss">
	@use '@styles/variables' as *;

	.app {
		display: flex;
		align-items: center;
		// width: 100%;
		// height: 100%;
		// overflow: hidden;
		max-width: $container-width;
		margin: 0 auto;	

		@media (max-width: $breakpoint-xs) {
			flex-direction: column;

			.controls {
				width: 100%;
			}

			.content {
				width: 100%;
			}
		}
	}

	.controls {
		// padding: 1rem;
		// width: 24rem;
	}

	.content {
		display: flex;
		flex: 1;
		padding: 1rem;
		position: relative;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.block-wrapper {
		position: relative;
		// background: #f00;
		width: 100%;
		aspect-ratio: 1 / 1;
		// height: 100%;
		display: flex;
		// flex-grow: 0;
		justify-content: center;
		align-items: center;
		// max-width: 100%;
		// max-height: 100%;
	}

	.block-size {
		// background: #002;
		position: relative;
		// position: absolute;

		// display: flex;
		// justify-content: center;
		// align-items: center;
	}

	.block {
		position: absolute;
		inset: 0;

		&.filter {
			filter: drop-shadow(0 0.5rem 1rem $color-text);
		}

		&.background {
			background: $color-panel;
		}
	}

	svg {
		position: absolute;
		inset: 0;
		overflow: visible;
		mix-blend-mode: exclusion;
	}
</style>