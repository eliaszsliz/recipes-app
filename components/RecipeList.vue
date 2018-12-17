<template>
  <div class="RecipeList">

    <transition-group
      name="list"
      tag="div"
    >
      <div
        v-for="recipe of items"
        :key="recipe.id"
        class="RecipeList-ItemWrapper"
      >
        <recipe-list-element
          v-bind="recipe"
        />
      </div>
    </transition-group>

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
  }
}
</script>

<style scoped lang="sass">
@import "~bulma/sass/utilities/_all.sass"
@import "../sass/variables"

.RecipeList
  margin-bottom: 40vh

  &-ItemWrapper
    display: inline-block
    padding: $container-gap-horizontal
    width: 100%

    @media screen and (min-width: 600px)
      width: 50%

    @include tablet
      width: 33%

    @include desktop
      width: 33%

    @include fullhd
      width: 25%

.list-enter
  opacity: 0
  transform: translateY(30px)

.list-enter-active
  transition: all .8s

.list-leave-active
  width: 200px
  position: absolute
  transition: all .4s

.list-leave-to
  opacity: 0
  transform: scale(.2)

.list-move
  transition: all 1s

</style>
