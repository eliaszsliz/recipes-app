<template>
  <div
    class="card RecipeItemsCard">
    <div
      class="card-image cursor-pointer"
      @click="goToMore"
    >
      <figure class="image is-4by3">
        <img
          :alt="description"
          src="https://bulma.io/images/placeholders/1280x960.png">
      </figure>
    </div>

    <div 
      class="card-content"
      style="flex-grow: 1">
      <div
        class="title is-5 cursor-pointer"
        @click="goToMore">
        {{ id }} {{ name }}
      </div>

      {{ description }}
    </div>

    <footer class="card-footer">
      <a
        href="#"
        class="card-footer-item">Save</a>
      <a
        href="#"
        class="card-footer-item">Edit</a>
      <a
        href="#"
        class="card-footer-item">Delete</a>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'RecipeItemsCard',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    }
  },
  methods: {
    goToMore: function() {
      console.log('test')
      this.$router.push({
        path: '/recipe/' + this.slug
      })
    }
  }
}
</script>

<style scoped lang="sass">
  @import "~bulma/sass/utilities/_all.sass"

  .RecipeItemsCard
    margin: $gap /4
    flex-basis: 250px

</style>
