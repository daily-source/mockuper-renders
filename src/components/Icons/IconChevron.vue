<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width='width'
    :height='height'
    viewBox="0 0 24 24"
  >
    <g id="Group_11" data-name="Group 11" transform="translate(-1264 -763)">
      <g id="Group_10" data-name="Group 10">
        <g id="iconfinder_018_283_arrow_down_show_3167536" transform="translate(1264 763)">
          <path id="Path_7" data-name="Path 7" d="M14,2A12,12,0,1,0,26,14,12,12,0,0,0,14,2Z" transform="translate(-2 -2)" fill="#ECDF96"/>
          <path id="Path_8" data-name="Path 8" d="M13.141,17.838,6.293,10.99l1.7-1.7,5.152,5.152,5.152-5.152,1.7,1.7Z" transform="translate(-1.141 -0.541)" fill="#2a2f8a"/>
        </g>
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
