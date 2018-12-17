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
          class="error apollo">
          An error occured
        </div>

        <!-- Result -->
        <div
          v-else-if="data"
          class="result apollo">
          <div>
            <page-title
              :title="data.recipe.name"
              :background-url="data.recipe.backgroundUrl"
              :style="{ marginBottom: 0 }"
            >
              <button
                slot="back-button"
                :style="{position: 'absolute',
                         left: '12px',
                         top: '12px',
                         backgroundColor: 'rgba(255, 255, 255, .1)',
                         border: 'none'
                }"
                class="button has-text-light is-borderless"
                @click="goBack"
              >
                <b-icon icon="arrow-left" />
              </button>

              <button
                slot="addon"
                :style="{position: 'absolute',
                         right: '12px',
                         top: '12px',
                         backgroundColor: 'rgba(255, 255, 255, .1)',
                         border: 'none'
                }"
                class="button has-text-light is-borderless"
              >
                <b-icon icon="heart" />
              </button>
            </page-title>

            <div class="box is-shadowless is-radiusless has-background-light RecipePage-BoxTop">
              <div class="level">
                <div
                  v-if="data.recipe.portions"
                  class="level-item has-text-centered">
                  <div>
                    <small-label>
                      Portions
                    </small-label>

                    <p class="is-size-3">
                      <b-icon
                        icon="account"
                        type="is-secondary"
                      />
                      {{ data.recipe.portions }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="data.recipe.difficulty"
                  class="level-item"
                  style="align-self: stretch"
                >
                  <div class="RecipePage-BoxTop-ItemOuterWrapper">
                    <small-label>
                      Difficulty
                    </small-label>

                    <div class="RecipePage-BoxTop-ItemInnerWrapper">
                      <b-icon
                        v-for="(_, index) of getDifficultyAsNumber(data.recipe.difficulty)"
                        :key="'d' + index"
                        :type="getDifficultyColor(data.recipe.difficulty)"
                        icon="square"
                      />

                      <b-icon
                        v-for="(_, index) of 3 - getDifficultyAsNumber(data.recipe.difficulty)"
                        :key="'p' + index"
                        :type="getDifficultyColor(data.recipe.difficulty)"
                        icon="square-outline"
                      />
                    </div>
                  </div>
                </div>

                <div
                  v-if="data.recipe.timeNeed"
                  class="level-item">
                  <div class="has-text-centered RecipePage-BoxTop-ItemOuterWrapper">
                    <small-label>
                      Time need
                    </small-label>

                    <div class="is-size-5 RecipePage-BoxTop-ItemInnerWrapper">
                      <b-icon
                        icon="timer"
                        type="is-secondary"
                      />
                      {{ getHumanReadableTime(data.recipe.timeNeed) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="content RecipePage-Content"
              style="margin: 2.5rem 0"
              v-html="data.recipe.body" />

            <div class="box is-shadowless is-radiusless has-background-light RecipePage-Tags">
              <small-label>
                Categories
              </small-label>

              <tag-element
                v-for="tag in data.recipe.tags"
                :key="tag.id"
                :name="tag.name"
                :slug="tag.slug"
                :id="tag.id"
              />
            </div>
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
import { media_prefix } from '../../utils/media'
import TagElement from '@/components/TagElement'

export default {
  validate({ params }) {
    return true
  },
  name: 'RecipePage',
  components: { TagElement },
  computed: {
    slug: function() {
      return this.$route.params.slug
    }
  },
  methods: {
    addMediaPrefix(url) {
      return media_prefix(url)
    },
    goBack() {
      this.$router.go(-1)
    },
    getDifficultyAsNumber(difficulty) {
      switch (difficulty) {
        case 'EASY':
          return 1
        case 'MEDIUM':
          return 2
        case 'HARD':
          return 3
        default:
          return 0
      }
    },
    getDifficultyColor(difficulty) {
      switch (difficulty) {
        case 'EASY':
          return 'is-success'
        case 'MEDIUM':
          return 'is-warning'
        case 'HARD':
          return 'is-danger'
        default:
          return 'is-light'
      }
    },
    getHumanReadableTime(time) {
      let hours = ~~(time / 60)
      let min = time % 60
      return `${hours} h ${min} min.`
    }
  }
}
</script>

<style scoped lang="sass">
  @import "~bulma/sass/utilities/_all.sass"
  @import "../../sass/variables.sass"

  .RecipePage
    &-Tags, &-BoxTop
      @include from(tablet)
        width: 100%

      .level-item
        align-self: stretch

      &-ItemOuterWrapper
        display: flex
        flex-direction: column
        align-self: stretch

      &-ItemInnerWrapper
        display: flex
        flex-grow: 1
        align-items: center
        justify-content: center


    &-Content
      margin-bottom: 1.5rem
      padding-left: $container-gap-horizontal
      padding-right: $container-gap-horizontal
</style>
