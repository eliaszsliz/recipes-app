<template>
  <div
    v-if="size === 'medium'"
    class="cursor-pointer TagElement--medium"
    @click.left="goToMore"
    @click.middle="goToMore"
  >
    <div class="level">
      <div class="level-left">
        <figure class="level-item image is-64x64">
          <img
            :src="computedThumbnailUrl"
            class="is-rounded"
          >
        </figure>
      </div>


      <div class="level-item TagElement--medium__Text">
        <span>{{ name }}</span>
      </div>

    </div>
  </div>

  <b-tag
    v-else
    size="is-medium"
    type="is-primary"
    class="cursor-pointer TagElement--small"
    @click.native="goToMore"
    v-text="name"
  />
</template>

<script>
import { media_prefix } from '../utils/media'
export default {
  name: 'TagElement',
  props: {
    size: {
      type: String,
      validator: function(value) {
        return ['small', 'medium'].indexOf(value) !== -1
      },
      default: 'small'
    },
    id: Number,
    name: String,
    slug: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      default: null
    }
  },
  computed: {
    computedThumbnailUrl: function() {
      if (this.thumbnailUrl) {
        return media_prefix(this.thumbnailUrl)
      }
      return 'https://bulma.io/images/placeholders/128x128.png'
    }
  },
  methods: {
    goToMore() {
      this.$router.push({ path: '/tag/' + this.slug })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~bulma/sass/utilities/_all.sass"
  @import "@/sass/variables.sass"

  .TagElement--small
    cursor: pointer
    margin-right: $tag-element-gap

  .TagElement--medium
    cursor: pointer

    & > .level
      display: flex
      padding: $small-gap

      & .TagElement--medium__Text
        flex-grow: 1
        justify-content: left
        padding-left: $small-gap

</style>
