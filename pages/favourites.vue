<template>
  <div>
    <page-title title="Your favourite recipes" />

    <ApolloQuery
      :query="require('../graphql/Recipes.gql')"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div
          v-if="loading"
          class="loading apollo">Loading...</div>

        <!-- Error -->
        <div
          v-else-if="error"
          class="error apollo">An error occured</div>

        <!-- Result -->
        <div
          v-else-if="data"
          class="result apollo">
          <recipe-list :items="data.allRecipes" />
          {{ data.allRecipes }}
        </div>

        <!-- No result -->
        <div
          v-else
          class="no-result apollo">
          Nie ma żadnych wyników
        </div>
      </template>

    </ApolloQuery>
  </div>

</template>

<script>
import RecipeList from '@/components/RecipeList'
export default {
  name: 'Favourites',
  components: { RecipeList }
}
</script>

<style scoped>
</style>
