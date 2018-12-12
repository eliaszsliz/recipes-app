<template>
  <div>
    <ApolloQuery
      :query="require('@/graphql/Tag.gql')"
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
            <page-title :title="data.tag.name" />

            <recipe-list
              :items="data.tag.recipes" />
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
import RecipeList from '@/components/RecipeList'

export default {
  validate({ params }) {
    return true
  },
  name: 'TagPage',
  components: { RecipeList },
  computed: {
    slug: function() {
      return this.$route.params.slug
    }
  }
}
</script>

<style scoped lang="sass">

</style>
