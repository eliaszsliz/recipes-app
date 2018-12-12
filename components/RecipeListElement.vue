<template>
  <div
    class="card RecipeListElement">
    <div
      class="card-image cursor-pointer"
      @click="goToMore"
    >
      <figure class="image is-4by3">
        <img
          :alt="description"
          :src="computedThumbnailUrl">
      </figure>

      <div class="RecipeListElement-NameWrapper">
        {{ name }}
      </div>
    </div>

    <footer class="card-footer">
      <span
        class="card-footer-item">
        <b-dropdown>
          <b-icon
            slot="trigger"
            icon="menu"
            class="cursor-pointer"
          />
          <b-dropdown-item disabled>Add to list</b-dropdown-item>
          <b-dropdown-item disabled>Send shopping list</b-dropdown-item>
          <b-dropdown-item disabled>Share</b-dropdown-item>
        </b-dropdown>
      </span>

      <span
        class="card-footer-item cursor-pointer">
        <b-icon
          :type="favourite ? 'is-danger' : '' "
          icon="heart"/>
      </span>
      <span
        class="card-footer-item cursor-pointer"
        @click="goToMore"
      >
        <b-icon
          icon="arrow-right"/>
      </span>
    </footer>

  </div>
</template>

<script>
import { media_prefix } from '../utils/media'

export default {
  name: 'RecipeItemsElement',
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
    },
    favourite: {
      type: Boolean,
      default: false
    },
    thumbnailUrl: {
      type: String,
      required: false
    }
  },
  computed: {
    computedThumbnailUrl: function() {
      if (this.thumbnailUrl) {
        return media_prefix(this.thumbnailUrl)
      }
      return 'https://bulma.io/images/placeholders/1280x960.png'
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
  @import "../sass/variables"

  .RecipeListElement
    //flex-basis: 100%
    //margin: $container-gap-horizontal

    //&:not(:last-of-type)
    //  margin-bottom: 0


    //@include tablet
    //  flex-basis: calc(50% - ( 2 * #{$container-gap-horizontal} ))

    //@include desktop
    //  flex-basis: calc(33% - ( 2 * #{$container-gap-horizontal} ))

    //@include fullhd
    //  flex-basis: calc(25% - ( 2 * #{$container-gap-horizontal} ))

    &-NameWrapper
      $name-bg-color: rgba(white, .7)
      $name-color: findColorInvert($name-bg-color)

      background-color: $name-bg-color
      color: $name-color
      position: absolute
      bottom: 0
      width: 100%
      padding: 8px

    & .card-footer
      & > div
        border-right: 1px solid $border
        align-items: center
        display: flex
        flex-basis: 0
        flex-grow: 1
        flex-shrink: 0
        justify-content: center
        padding: 0.75rem

</style>
