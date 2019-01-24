<template>
	<div class='user-avatar-edit'>
		<user-avatar 
			:url='imgUrl'		
			:img-class='["user-avatar-edit__img"]'
			 @click='openFileChooser'
		/>
		<input
			ref='input'
			type='file'
			class='user-avatar-edit__file-input'
			@change='onInputChange'
		>
	</div>
</template>

<script>
import UserAvatar from 'LocalComponents/User/UserAvatar'

export default {
	name: 'UserEditAvatar',
	
	components: {
		UserAvatar,
	},

	props: {
		user: {
			type: Object,
			required: true,
		},
	},

	data () {
		return {
			file: null,
			fileUrl: null,
			reader: new FileReader(),
			imagePreview: false,
		}
	},

	mounted () {
		this.reader.onload = this.readerOnLoad
	}, 

	methods: {
		/** 
		 * Opens the file chooser for the picture
		 */
		openFileChooser () {
			const { input } = this.$refs
			input.click()
		},

		/**
		 * Triggers when an image is chosen.
		 * 
		 * @params {Event} event
		 */ 
		onInputChange (event) {
			if (event.target.files) {
				this.file = event.target.files[0]
				
				this.previewImage(this.file)
			}
		},

		/** 
		 * Previews the uploaded image.
		 *
		 * @params {File} file
		 */
		previewImage (file) {
			this.reader.readAsDataURL(file)	
		},

		/**
		 * This is just mainly for the reader,
		 * This is a listener that when the file has been loaded,
		 * we set the imageUrl to be the image we had uploaded
		 * and flag the imagePreview to true.
		 */
		readerOnLoad () {
			this.imagePreview = true
			this.fileUrl = this.reader.result
		},
	},

	computed: {
		/**
		 * The image URL to display.
		 *
		 * This returns the user's profile when there's nothing uploaded yet.
		 */
		imgUrl () {
			if (this.imagePreview && this.file) {
				return this.fileUrl
			}

			return this.user.picture
		},
	},

	watch: {
		/**
		 * Emits an file changed event everytime the file is changed
		 */
		fileUrl () {
			const data = {
				file: this.file,
				url: this.fileUrl,
			}
			this.$emit('avatarChange', data)
		},
	},
}
</script>

<style lang='scss'>
.user-avatar-edit {
	&__img {
		cursor: pointer;
	}

	&__file-input {
		display: none;
	}
}
</style>

