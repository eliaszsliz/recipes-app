<template>
  <div>
    <page-title :title="title"/>

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
          class="result apollo TagsList">
          <no-ssr>
            <masonry
              :cols="{default: 3, 1300: 3, 850: 2, 480: 1}"
              :gutter="12"
            >
              <div
                v-for="tag in data.allTags"
                :key="tag.name"
                class="TagsList-ItemWrapper"
              >
                <tag-element
                  v-bind="tag"
                  size="medium"
                />
              </div>
            </masonry>
          </no-ssr>


        </div>

        <!-- No result -->
        <div
          v-else
          class="no-result apollo">
          No result :(
        </div>
      </template>
    </ApolloQuery>

  </div>


</template>

<script>
import TagElement from '@/components/TagElement'

export default {
  name: 'Tags',
  components: { TagElement },
  data() {
    return {
      title: 'Categories'
    }
  },
  methods: {
    async fetchItems() {
      await console.log('XD')
    }
  }
}
</script>

<style scoped lang="sass">
  @import "~bulma/sass/utilities/_all.sass"
  @import "../sass/variables"

  .TagsList
    padding-left: $container-gap-horizontal
    padding-right: $container-gap-horizontal

    &-ItemWrapper
      margin-top: $container-gap-horizontal

</style>
