<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width='width'
    :height='height'
    viewBox="0 0 24 24"
  >
    <g id="iconfinder-icon" transform="translate(1 8)">
    <g id="Group_8" data-name="Group 8" transform="translate(-1 -5.484)">
      <rect id="canvas_background" width="25.156" height="17.969" transform="translate(0)" fill="none"/>
    </g>
    <g id="Group_9" data-name="Group 9" transform="translate(-0.639 -8)">
      <circle id="svg_2" cx="11.141" cy="11.141" r="11.141" transform="translate(0.359 0.359)" fill="#ECDF96"/>
      <path id="svg_3" d="M11.505,23a11.5,11.5,0,1,1,11.5-11.5A11.513,11.513,0,0,1,11.505,23Zm0-22.281A10.781,10.781,0,1,0,22.286,11.5,10.793,10.793,0,0,0,11.505.719Z" transform="translate(-0.005)" fill='#323736'/>
      <path id="svg_5" d="M26.134,23.347l-.036-.474a4.057,4.057,0,0,1,1.093-2.987,3.625,3.625,0,0,0,1.147-2.167c0-.765-.473-1.275-1.493-1.293a3.208,3.208,0,0,0-1.821.547l-.547-1.6a5.548,5.548,0,0,1,2.859-.747c2.258,0,3.3,1.311,3.3,2.768a4.751,4.751,0,0,1-1.584,3.114,3.4,3.4,0,0,0-.966,2.458l.018.382H26.134Zm-.455,2.531A1.384,1.384,0,1,1,27.063,27.3,1.349,1.349,0,0,1,25.679,25.878Z" transform="translate(-15.682 -9.368)" fill="#2a2f8a"/>
    </g>
  </g>
  </svg>
</template>

<script>
export default {
  name: 'IconInfo',

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
    }
  }
}
</script>
