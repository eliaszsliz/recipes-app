<template>
  <section>
    <div>Przepisy</div>

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
          <recipe-items :items="data.allRecipes" />
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



  </section>
</template>

<script>
import RecipeItems from '@/components/RecipeItems'

export default {
  name: 'Recipes',
  components: { RecipeItems },
  methods: {
    async fetchItems() {
      await console.log('XD')
    }
  }
}
</script>

<style scoped>
.card {
  margin: 8px;
}
</style>
