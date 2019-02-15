<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width='width'
    :height='height'
    viewBox="0 0 24 24"
  >
    <g id="Symbol_1_1" data-name="Symbol 1 – 1" transform="translate(-768 -348)" :fill='color'>
      <path id="Path_1" data-name="Path 1" d="M87.264,84.084l-8.159-8.159,8.159-8.159a2.249,2.249,0,0,0-3.18-3.18l-8.159,8.159-8.159-8.159a2.249,2.249,0,0,0-3.18,3.18l8.159,8.159-8.159,8.159a2.249,2.249,0,0,0,3.18,3.18l8.159-8.159,8.159,8.159a2.249,2.249,0,0,0,3.18-3.18Z" transform="translate(704.075 284.075)"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconClose',

  props: {
    width: {
      type: Number,
      required: false,
      default: 23.25,
    },

    height: {
      type: Number,
      required: false,
      default: 23.25,
    },

    color: {
      type: String,
      required: false,
      default: '#000',
    },
  }
}
</script>
