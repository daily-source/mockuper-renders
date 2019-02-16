<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width='width'
    :height='height'
    viewBox="0 0 24 24"
  >
    <g id="Group_8" data-name="Group 8" transform="translate(-150 -438)">
      <path id="Path_3" data-name="Path 3" d="M12.625,1A11.625,11.625,0,1,0,24.25,12.625,11.625,11.625,0,0,0,12.625,1Z" transform="translate(149.375 437.375)" fill="#ECDF96"/>
      <path id="Path_4" data-name="Path 4" d="M12,24A12,12,0,1,1,24,12,12.014,12.014,0,0,1,12,24ZM12,.75A11.25,11.25,0,1,0,23.25,12,11.263,11.263,0,0,0,12,.75Z" transform="translate(150 438)" fill='#323736'/>
      <g id="Group_7" data-name="Group 7" transform="translate(158.408 444.262)">
        <path id="Path_5" data-name="Path 5" d="M23.421,18.366v9.791l9.17-4.9Z" transform="translate(-23.046 -17.741)" fill="#9F3333"/>
        <!-- <path id="Path_6" data-name="Path 6" d="M22.421,27.74V16.7L32.762,22.22Zm.75-9.79v8.54l8-4.27Z" transform="translate(-22.421 -16.699)" fill='#323736'/> -->
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconPlay',

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
