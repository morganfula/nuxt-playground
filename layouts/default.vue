<template>
	<div id="viewport">
		<slot />

		<ClientOnly>
			<TheExperience />
		</ClientOnly>
	</div>
</template>

<script setup></script>

<style lang="scss"></style>
