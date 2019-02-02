<template>
	<div class='avatar'>
		<img 
		 :src='url'
		 :alt='alt'
		 :class='["avatar__img is-fullwidth", ...imgClass]'
			@click='onClick'
		/>
	</div>
</template>

<script>
export default {
	name: 'Avatar',

	props: {
		url: {
			type: String,
			required: true,
		},

		alt: {
			type: String,
			required: false,
		},

		imgClass: {
			type: Array,
			required: false,
			default: () => {
				return []
			},
		},
	},

	methods: {
		/** 
		 * Emits on click when the image is clicked.
		 */
		onClick () {
			this.$emit('click')
		},
	},
}
</script>

<style lang='scss' scoped>
.avatar {
	&__img {
		display: block;
		width: 100%;
	}
}
</style>
