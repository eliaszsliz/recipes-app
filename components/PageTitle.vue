<template>
  <section
    :style="styles"
    class="hero is-medium is-primary is-bold"
  >
    <div
      :style="{alignSelf: centered ? 'center' : null }"
      class="hero-body"
    >
      <div>
        <h1 class="title has-text-white-bis">
          {{ title }}
        </h1>
        <h2
          v-if="subtitle"
          class="subtitle">
          {{ subtitle }}
        </h2>
      </div>

      <slot
        name="back-button"
      />

      <slot
        name="addon"
      />
    </div>
  </section>
</template>

<script>
import { media_prefix } from '../utils/media'

export default {
  name: 'PageTitle',
  props: {
    backgroundUrl: String,
    title: String,
    subtitle: {
      type: String,
      required: false
    },
    centered: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styles: function() {
      let stylesObj = {
        marginBottom: '1.5rem',
        paddingTop: this.$slots.addon || this.$slots.backButton ? '34px' : ''
      }

      if (this.backgroundUrl) {
        stylesObj.background = `url(${media_prefix(this.backgroundUrl)})`
      }

      return stylesObj
    }
  }
}
</script>

<style scoped lang="sass">
@import "../sass/variables"

.title
  background-color: rgba(0, 0, 0, .2)
  padding: 16px 32px
  display: inline-block

</style>
