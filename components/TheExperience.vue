<template>
	<div>
		<canvas ref="experience" />
	</div>
</template>

<script setup>
	import * as THREE from 'three';
	import { ref } from 'vue';
	import { useWindowSize } from '@vueuse/core';

	let renderer;
	const experience = ref(null);

	const { width, height } = useWindowSize();
	const aspectRatio = computed(() => width.value / height.value);

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(55, aspectRatio.value, 0.01, 10);
	camera.position.set(0, 0, 5);

	scene.add(camera);

	const sphere = new THREE.Mesh(
		new THREE.SphereGeometry(2.5, 32, 32),
		new THREE.MeshBasicMaterial({
			color: 0x2627e6,
			wireframe: true,
		})
	);

	sphere.position.x = 2;
	scene.add(sphere);

	const updateCamera = () => {
		camera.aspect = aspectRatio.value;
		camera.updateProjectionMatrix();
	};

	const updateRenderer = () => {
		renderer.setSize(width.value, height.value);
		renderer.render(scene, camera);
	};

	const setRenderer = () => {
		if (experience.value) {
			renderer = new THREE.WebGLRenderer({
				canvas: experience.value,
				alpha: true,
				antialias: true,
			});
			updateRenderer();
		}
	};

	watch(aspectRatio, () => {
		updateCamera();
		updateRenderer();
	});

	onMounted(() => {
		setRenderer();
		loop();
	});

	const loop = () => {
		sphere.rotation.y += 0.001;
		sphere.rotation.z += 0.001;
		updateRenderer();
		requestAnimationFrame(loop);
	};
</script>

<style>
	canvas {
		display: block;
		position: fixed;
		inset: 0;
		z-index: -1;
		width: 100vw;
		height: 100vh;
	}
</style>
