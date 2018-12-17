<template>
  <div>
    <page-title
      :title="title"
      :background-url="backgroundUrl"
    />

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
      title: 'Categories',
      backgroundUrl: '/static/images/bookshelf.jpeg'
    }
  }
}
</script>

<style scoped lang="sass">
  @import "~bulma/sass/utilities/_all.sass"
  @import "../sass/variables"

  .TagsList
    &-ItemWrapper
      display: inline-block
      padding: $container-gap-horizontal
      width: 100%

      @media screen and (min-width: 500px)
        width: 50%

      @include tablet
        width: 33%

      @include desktop
        width: 25%

      @include fullhd
        width: 25%

</style>
