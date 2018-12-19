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
import { mapGetters } from 'vuex'
import Vue from 'vue'
import RecipeList from '@/components/RecipeList'

const recipesFiler = require('../graphql/RecipesFilter.gql')

export default {
  name: 'Favourites',
  middleware: 'authenticated',
  components: { RecipeList },
  data() {
    return {
      title: 'Your favourite recipes',
      backgroundUrl: '/static/images/cooking.jpeg',
      items: []
    }
  },
  computed: {
    ...mapGetters('auth', ['favouredIds'])
  },
  watch: {
    favouredIds: function(newArrayOfFavouredIds) {
      for (let i = 0; i < this.items.length; i += 1) {
        const item = this.items[i]
        if (newArrayOfFavouredIds.indexOf(item.id) < 0) {
          this.items.splice(i, 1)
          break
        }
      }
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    add() {
      this.items.splice(2, 0, {
        id: this.items.length + 2,
        slug: `slgu${this.items.length + 2}`
      })
    },
    fetchItems() {
      return this.$apollo
        .query({
          query: recipesFiler,
          variables: {
            ids: this.favouredIds
          }
        })
        .then(res => res.data.recipesFilter)
        .then(items => {
          Vue.set(this, 'items', items)
        })
    }
  }
}
</script>

<style scoped lang="sass">

.test, .test > div
  display: inline-block
  transition: transform 1s
  position: relative

.list-enter-active, .list-leave-active
  transition: all .8s

.list-enter, .list-leave-to
  opacity: 0
  transform: translateY(30px)

.list-move
  transition: all 1s


</style>
