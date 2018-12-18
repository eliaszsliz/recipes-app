<template>
  <div>
    <page-title
      :title="title"
      :background-url="backgroundUrl"
    />

    <recipe-list :items="items" />
  </div>
</template>

<script>
import Vue from 'vue'
import RecipeList from '@/components/RecipeList'
const allRecipesGql = require('../graphql/Recipes.gql')

export default {
  name: 'Recipes',
  components: { RecipeList },
  data() {
    return {
      title: 'All recipes',
      backgroundUrl: '/static/images/recipes.jpeg',
      items: []
    }
  },
  mounted() {
    //this.fetchItems()
  },
  asyncData({ app, params, error }) {
    return app.apolloProvider.defaultClient
      .query({
        query: allRecipesGql
      })
      .then(res => {
        return { items: res.data.allRecipes }
      })
  },
  methods: {
    fetchItems() {
      return this.$apollo
        .query({
          query: allRecipesGql
        })
        .then(res => {
          Vue.set(this, 'items', res.data.allRecipes)
        })
    }
  }
}
</script>

<style scoped>
.card {
  margin: 8px;
}
</style>
