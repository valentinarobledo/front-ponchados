<template>
  <div class="index-page">
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="1000"
      img-width="1024"
      img-height="300"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
  
      <b-carousel-slide 
      img-src="/pensamientoCritico.png"></b-carousel-slide>
      <b-carousel-slide img-src="/gamificacion.png"></b-carousel-slide>
      <b-carousel-slide img-src="/gamification.png"></b-carousel-slide>
    </b-carousel>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>
<style lang="scss">
  .index-page{
    background:#AFAFAF;

    .btn-link{
      text-decoration: none;
      color: indigo;
    }
  }
</style>