<template>
  <div
    class="card RecipeListElement">
    <div
      class="card-image cursor-pointer RecipeListElement-ImageWrapper"
      @click.left="goToMore"
      @click.middle="goToMore"
    >
      <figure class="image is-4by3">
        <img
          :alt="description"
          :src="computedThumbnailUrl">
      </figure>
    </div>

    <div class="card-content RecipeListElement-NameWrapper">
      {{ name }}
    </div>

    <footer
      v-if="!footerLess"
      class="card-footer"
    >
      <span
        class="card-footer-item">
        <b-dropdown
          position="is-top-right"
        >
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
    },
    footerLess: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('auth', ['favouredIds', 'isAuthenticated']),
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
      if (this.isAuthenticated) {
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
      } else {
        this.$snackbar.open({
          message: 'Wanna save your favorites forever?',
          duration: 3000,
          type: 'is-primary',
          position: 'is-top',
          actionText: 'Sign up!',
          onAction: () => {
            this.$router.push({ name: 'login', query: { next: '/recipes' } })
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="sass">
  @import "~bulma/sass/utilities/_all.sass"
  @import "../sass/variables"

  .RecipeListElement
    cursor: pointer
    box-shadow: $box-shadow
    transition: box-shadow .4s, transform .5s
    border-radius: $radius * 4

    &:hover, &:active
      box-shadow: 0 6px 12px rgba(0, 0, 0, .07)
      transform: scale(.99)

    &-ImageWrapper
      img
        border-radius: $radius * 4

    &-NameWrapper
      color: findColorInvert(#fff)
      display: flex
      justify-content: center
      align-items: center
      text-align: center
      min-height: 64px
      padding: 8px

    & .card-footer
      border: none

      .card-footer-item:not(:last-child)
        border: none

      & > div
        border: none
        align-items: center
        display: flex
        flex-basis: 0
        flex-grow: 1
        flex-shrink: 0
        justify-content: center
        padding: 0.75rem

</style>
