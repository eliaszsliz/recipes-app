<template>
  <section>
    <div>Kategorie</div>

    <ApolloQuery
      :query="require('../graphql/Tags.gql')"
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
          <tag-element
            v-for="tag in data.allTags"
            :key="tag"
            v-bind="tag"
            size="is-medium"

          />
          {{ data }}</div>

        <!-- No result -->
        <div
          v-else
          class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>



  </section>
</template>

<script>
import TagElement from '@/components/TagElement'

export default {
  name: 'Tags',
  components: { TagElement },
  methods: {
    async fetchItems() {
      await console.log('XD')
    }
  }
}
</script>

<style scoped>
</style>
