<template>
  <div class="container nonprofit-description nonprofit-description__container">
    <p>A Loseathon is like a Walkathon, but instead of walking a certain distance to raise money, the person loses a certain amount of weight, which has these added benefits:</p>
    <ul class='nonprofit-description__list'>
      <li>donors wind up with a friend and family member who is healthier and happier.</li>
      <li>it's usually harder to lose a significant amount of weight than to do a single walkathon so it's a bigger challenge for people to take on</li>
      <li>people are more likely to succeed at losing weight if they have the support of loved ones. A Loseathon creates a cheering squad to encourage them</li>
      <li>it's easier to lose weight if a person commits to it publicly because it adds accountability</li>
      <li>it's easier to lose weight if it's about something bigger than just yourself and it's helping others</li>
      <li>everyone benefits from the health system spending less money on diseases related to weight</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppDescription',
}
</script>

<style lang="scss" scoped>
.nonprofit-description {
	p {
		line-height: 1.6;
		font-size: 21px;
	}

	&__container {
		padding: 20px 160px 0;
	}
	&__list {
		list-style: disc;
		margin-left: 20px;
		font-size: 19px;

		li {
			line-height: 1.6;
			font-size: 21px;
		}
	}
}
</style>
