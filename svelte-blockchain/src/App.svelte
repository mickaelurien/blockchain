<script>
	import { onMount } from 'svelte';

	import { fly } from 'svelte/transition'
	import { Block } from './Block'
	import { BlockChain } from './BlockChain'

	let step = 1;

	let nbBlocks = null;
	let nbBlocksError = false;
	let data = []
	
	let mounted = false;
	onMount(() => {
		mounted = true;
	})

	function handleInputNbBlocks() {
		nbBlocksError = false;
		if ((nbBlocks < 1 || nbBlocks > 5) && nbBlocks != null) {
			nbBlocksError = true;
		}
	}

	let blockChainArray = [];
	function handleKeyPressStepOne(event) {
		if (event.key === 'Enter') {
			handleStepTwo()
		}
	}
	function handleStepTwo() {
		if (nbBlocksError || !nbBlocks) return;
		for(let i = 1; i <= nbBlocks; i++) {
			blockChainArray.push({index: i, data: ''});
		}
		step++;
	}

	function hasEmptyDataFunction(array) {
		return mounted ? array.findIndex(block => block.data === '') !== -1 : true;
	}

	$: hasEmptyData = hasEmptyDataFunction(blockChainArray);

	async function handleLastStep() {
		console.log('data', blockChainArray)
		const chain = new BlockChain();
		console.log('chain created');
		for (let i = 0; i < blockChainArray.length; i++) {
			new Promise((resolve) => {
				resolve(new Block({index : blockChainArray[i].index, data : blockChainArray[i].data}))
			}).then(res => {
				chain.addNewBlock(res);
			})
			
			console.log('block added & created');
		}
		console.table(chain)
	}
</script>

<main>
	{#if step === 0}
		<div transition:fly>
			<h1>Sveltejs - Blokchain example</h1>
			<hr>
			<p>Welcome on this sveltejs project !</p>
			<p>This project is a simple example of a blockchain using sveltejs.</p>
			<div class="btn-container">
				<button class="btn" on:click={() => step++}>Let's started</button>
			</div>
		</div>
	{:else if step === 1}
		<div transition:fly>
			<h2>Enter a number of block</h2>
			<p>This value will determine how many blocks you wants in your blockchain. For performances reasons, <b>the number of block cannot exceed 5</b></p>
			<div class="input-container">
				<input type="number" class:input-error={nbBlocksError} bind:value={nbBlocks} on:input={handleInputNbBlocks} on:keyup={handleKeyPressStepOne}>
				{#if nbBlocksError}
					<p class="error-msg">The value must be between 1 and 5</p>
				{/if}
			</div>
			<div class="btn-container">
				<button disabled={nbBlocksError || !nbBlocks} class:btn-disabled={nbBlocksError || !nbBlocks} class="btn"  on:click={handleStepTwo}>Next</button>
			</div>
		</div>
	{:else if step === 2}
		<div transition:fly>
			<h2>Enter data for the block</h2>
			<p>Type the data you want in each block</p>
			{#each blockChainArray as blockObject}
			<div class="input-container">
				<p>Enter the data for the block {blockObject.index}</p>
				<input class="all-width" type="text" bind:value={blockObject.data}>
			</div>
			{/each}
			<div class="btn-container">
				<button disabled={hasEmptyData} class:btn-disabled={hasEmptyData} class="btn" on:click={handleLastStep}>Next</button>
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 50vw;
		transform: translate(-50%, -50%);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	main > div {
		grid-area: 1/1/1/1;
		width: 100%;
		height: 100%;
	}
	.btn-container button{
		float: right;
	}
	.all-width {
		width: 100%;
	}
</style>