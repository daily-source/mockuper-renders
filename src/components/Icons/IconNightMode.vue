<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width='width'
    :height='height'
    viewBox="0 0 24 24"
  >
    <g id="Group_3" data-name="Group 3" transform="translate(-755 -1159)">
      <g id="Group_2" data-name="Group 2">
        <g id="Ellipse_1" data-name="Ellipse 1" transform="translate(755 1159)" fill="#ecdf96" stroke="#323736" stroke-width="1">
          <circle cx="12" cy="12" r="12" stroke="none"/>
          <circle cx="12" cy="12" r="11.5" fill="none"/>
        </g>
        <g id="Group_1" data-name="Group 1" transform="translate(758.555 1163)">
          <path id="Path_6" data-name="Path 6" d="M19.428,17.339a8.4,8.4,0,0,1-7.6-11.969A8.4,8.4,0,1,0,23,16.543,8.363,8.363,0,0,1,19.428,17.339Z" transform="translate(-6.999 -5.371)" fill="#2a2f8a"/>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconNightMode',

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
