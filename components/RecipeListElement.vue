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
          <b-dropdown-item>Add to list</b-dropdown-item>
          <b-dropdown-item disabled>Send shopping list</b-dropdown-item>
          <b-dropdown-item disabled>Share</b-dropdown-item>
        </b-dropdown>
      </span>

      <span
        class="card-footer-item cursor-pointer"
        @click="setFavourite(!userHasInFavourites)"
      >
        <recipe-list-element-heart
          :active="userHasInFavourites"
        />
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
import { mapGetters, mapMutations } from 'vuex'
import RecipeListElementHeart from '@/components/RecipeListElementHeart'

const setFavouriteGql = require('../graphql/SetFavourite.gql')

export default {
  name: 'RecipeItemsElement',
  components: { RecipeListElementHeart },
  props: {
    id: {
      type: Number,
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
    thumbnailUrl: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters('auth', ['favouredIds']),
    userHasInFavourites: function() {
      return this.favouredIds.includes(+this.id)
    },
    computedThumbnailUrl: function() {
      if (this.thumbnailUrl) {
        return media_prefix(this.thumbnailUrl)
      }
      return 'https://bulma.io/images/placeholders/1280x960.png'
    }
  },
  methods: {
    ...mapMutations({
      addFavourite: 'auth/addFavourite',
      removeFavourite: 'auth/removeFavourite'
    }),
    goToMore: function() {
      this.$router.push({
        path: '/recipe/' + this.slug
      })
    },
    setFavourite(new_value) {
      if (new_value) {
        this.addFavourite(+this.id)
      } else {
        this.removeFavourite(+this.id)
      }
      try {
        this.$apollo.mutate({
          mutation: setFavouriteGql,
          variables: {
            id: this.id,
            newValue: new_value
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="sass">
  @import "~bulma/sass/utilities/_all.sass"
  @import "../sass/variables"

  .RecipeListElement
    box-shadow: 0 6px 12px rgba(0, 0, 0, .07) // 1px 18px 23px rgba(76, 76, 76, 0.2)

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
