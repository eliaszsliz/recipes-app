<template>
  <div class="RecipeItems">
    <recipe-items-card
      v-for="recipe in items"
      v-bind="recipe"
      :key="recipe.id"
    />
  </div>
</template>


<script>
import RecipeItemsCard from '@/components/RecipeItemsCard.vue'
export default {
  name: 'RecipeItems',
  components: { RecipeItemsCard },
  props: {
    items: Array
  }
}
</script>

<style scoped lang="sass">
  .RecipeItems
    display: flex
</style>
