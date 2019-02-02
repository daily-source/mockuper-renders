<template>
  <div class='avatar-upload'>
		<avatar 
       v-if='imgUrl'
			:url='imgUrl'		
			:img-class='["avatar-upload__img"]'
			 @click='openFileChooser'
		/>
    <div 
			class='avatar-upload__no-img'
			v-if='!imgUrl'
		>
      {{ noImageMessage }}
      <button 
        class='is-primary button is-small' 
        @click.prevent.stop='openFileChooser'
      >
        Browse
      </button>
    </div>
		<input
			ref='input'
			type='file'
			class='avatar-upload__file-input'
			@change='onInputChange'
		>
	</div>
</template>

<script>
import Avatar from 'LocalComponents/Avatar/Avatar'

export default {
  name: 'AvatarUpload',

  components: {
		Avatar,
	},

	props: {
		/**
		 * Text to show when there's no image uploaded yet.
		 */
		noImageMessage: {
			type: String,
			required: false,
			default: 'No Image',
		}
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

<style lang='scss' scoped>
.avatar-upload {
  display: flex;
  align-items: stretch;
	height: 300px;

	&__img {
		cursor: pointer;
	}

  &__no-img {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
		flex-direction: column;
		flex-wrap: nowrap;
		font-size: 1.5rem;
		border: 2px dashed #ddd;

    button {
      margin-top: 1em;
    }
  }

	&__file-input {
		display: none;
	}
}
</style>
