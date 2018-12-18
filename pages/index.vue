<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
  <div>
    <div
      :style="stylesObj"
      class="IndexWrapper">
      <div class="box">
        <h1 class="is-size-3 has-text-white-bis has-text-weight-bold ">
          Search for recipes
        </h1>

        <p class=" has-text-white-ter">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt lacus eu mattis ultricies.na purus. Duis dictum faucibus ex, et accumsan nunc venenatis vitae.
          Type in the name you are looking for:
        </p>

        <b-field
          addons
          type="is-primary"
          class="Index-Input"
        >
          <b-input
            v-model="value"
            size="is-medium"
          />
          <div class="control">
            <button class="button is-success is-medium">
              <span class="icon is-medium">
                <b-icon icon="magnify" />
              </span>
            </button>
          </div>
        </b-field>
      </div>
    </div>

    <div class="Index-SampleRecipes">
      <small-label>
        Sample recipes
        <nuxt-link
          :to="{ name: 'recipes' }"
          class="button is-primary is-small"
          style="margin-left: .5rem"
        >
          more
        </nuxt-link>
      </small-label>

      <div class="Index-SampleRecipesList">
        <div v-swiper:mySwiper="swiperOptions">
          <div class="swiper-wrapper">
            <div
              v-for="item in recipes"
              :key="item.id"
              class="swiper-slide"
            >
              <recipe-list-element
                v-bind="item"
                footer-less
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { media_prefix } from '../utils/media'
import Vue from 'vue'
import RecipeListElement from '@/components/RecipeListElement'

const recipesFiler = require('../graphql/RecipesFilter.gql')

export default {
  name: 'HomePage',
  components: {
    RecipeListElement
  },
  data() {
    return {
      value: '',
      recipes: [],
      swiperOptions: {
        grabCursor: true,
        centeredSlides: true,
        breakpoints: {
          // when window width is <= 320px
          380: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 15
          }
        },
        slidesPerView: 3,
        spaceBetween: 20,
        initialSlide: 1,
        loop: true,
        freeMode: true
      }
    }
  },
  computed: {
    stylesObj: function() {
      return {
        backgroundImage: `url(${media_prefix('/static/images/pizza.jpeg')})`
      }
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      return this.$apollo
        .query({
          query: recipesFiler,
          variables: {
            amount: 5
          }
        })
        .then(res => res.data.recipesFilter)
        .then(items => {
          Vue.set(this, 'recipes', items)
        })
    }
  }
}
</script>

<style scoped lang="sass">
@import "~bulma/sass/utilities/_all.sass"
@import "../sass/variables"

.IndexWrapper
  min-height: 80vh
  background-size: 100%
  background-repeat: no-repeat
  background-position: top center

  @media screen and (max-width: 800px)
    background-size: cover
    background-position: center center

  display: flex
  align-items: center
  justify-content: center

  .box
    padding: 5vw 10vw
    background-color: rgba(0, 0, 0, .2)

    p
      text-align: justify
      margin-bottom: .75rem
      max-width: 500px
      width: 100%

.Index-Input /deep/ .input
    width: 400px

    @media screen and (max-width: 520px)
      width: 100%

.Index-SampleRecipes
  $custom-gap: 1.5rem

  margin: 0 $custom-gap
  margin-bottom: 5rem
  padding: $custom-gap

  position: relative
  top: -(2 * $custom-gap)
  background-color: white

  @include mobile
    margin: 0

  &List
    margin-top: $custom-gap

    .swiper-slide
      margin: $custom-gap

</style>
