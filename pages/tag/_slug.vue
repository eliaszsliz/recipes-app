<template>
  <div>
    <page-title
      :title="tag.name"
      :background-url="tag.backgroundUrl"
    />

    <recipe-list
      :items="tag.recipes"
    />
  </div>
</template>

<script>
import RecipeList from '@/components/RecipeList'
import Vue from 'vue'
const tagGql = require('@/graphql/Tag.gql')

export default {
  validate({ params }) {
    return true
  },
  name: 'TagPage',
  components: { RecipeList },
  data() {
    return {
      tag: {}
    }
  },
  computed: {
    slug: function() {
      return this.$route.params.slug
    }
  },
  mounted() {
    this.fetchItem()
  },
  methods: {
    fetchItem() {
      return this.$apollo
        .query({
          query: tagGql,
          variables: {
            slug: this.slug
          }
        })
        .then(res => {
          Vue.set(this, 'tag', res.data.tag)
        })
    }
  }
}
</script>

<style scoped lang="sass">

</style>
