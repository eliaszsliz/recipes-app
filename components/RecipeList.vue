<template>
  <div class="RecipeList">
    <no-ssr>
      <masonry
        :cols="{default: 4, 1300: 3, 850: 2, 480: 1}"
        :gutter="12"
      >
        <div
          v-for="recipe of items"
          :key="recipe.id"
          class="RecipeList-ItemWrapper"
          style="background-color: indianred;"
        >
          <recipe-list-element
            v-bind="recipe"
          />
        </div>
      </masonry>
    </no-ssr>
  </div>
</template>


<script>
import RecipeListElement from '@/components/RecipeListElement'

export default {
  name: 'RecipeList',
  components: {
    RecipeListElement
  },
  props: {
    items: Array
  },
  mounted: function() {},
  beforeDestroy: function() {}
}
</script>

<style scoped lang="sass">
  @import "~bulma/sass/utilities/_all.sass"
  @import "../sass/variables"

  .RecipeList
    margin-bottom: 40vh
    padding-left: $container-gap-horizontal
    padding-right: $container-gap-horizontal

    &-ItemWrapper
      margin-top: $container-gap-horizontal

</style>
