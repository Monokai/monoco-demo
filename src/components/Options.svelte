<script>
	let {
		value = $bindable(false),
		options = [false, true],
		optionLabels = ['no', 'yes'],
		label = 'title',
	} = $props();

	let selectedIndex = $state(options.indexOf(value));

	$effect(() => {
		value = options[selectedIndex];
	})
</script>

<div class="container">
	<div class="label">{label}</div>
	<div class="options">
		<fieldset>
			{#each options as option, i}
				<div class="option">
					<input type="radio" value={option} onchange={() => selectedIndex = i} checked={selectedIndex === i} />
				</div>
			{/each}
		</fieldset>
	</div>
	<div class="value">{optionLabels[selectedIndex]}</div>
</div>

<style lang="scss">
	@use '@styles/variables' as *;

	.container {
		width: 100%;
		padding: 0.5rem;
		display: grid;
		grid-template-columns: 8ch 1fr 12ch;
		font-size: 0.75rem;
		justify-content: center;
		align-items: center;
	}

	.label {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.options {
		flex: 1;
		margin: 0 0.5rem;
		display: flex;
	}

	fieldset {
		width: 100%;
		display: flex;
		border: none;
		margin: 0;
		padding: 0;
	}

	input {
		margin: 0;
	}

	.option {
		padding: 0rem 0.35rem;
	}

	.value {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>