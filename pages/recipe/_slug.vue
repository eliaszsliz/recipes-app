<template>
  <div>
    <ApolloQuery
      :query="require('@/graphql/Recipe.gql')"
      :variables="{ slug }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div
          v-if="loading"
          class="loading apollo">
          Loading...
        </div>

        <!-- Error -->
        <div
          v-else-if="error"
          class="error apollo">An error occured</div>

        <!-- Result -->
        <div
          v-else-if="data"
          class="result apollo">
          <div>
            <h3>{{ data.recipe.name }}</h3>


            <p>
              Desc: {{ data.recipe.body }}
            </p>
          </div>
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
export default {
  validate({ params }) {
    return true
  },
  name: 'RecipePage',
  components: {},
  computed: {
    slug: function() {
      return this.$route.params.slug
    }
  },
  created() {
    console.log('DZIAĄA')
  }
}
</script>

<style scoped>
</style>
