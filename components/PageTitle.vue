<template functional>
  <section
    :style="{ paddingTop: $slots.addon || $slots.backButton ? '34px' : '' }"
    class="hero is-medium is-primary is-bold"
  >
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ props.title }}
        </h1>
        <h2
          v-if="props.subtitle"
          class="subtitle">
          {{ props.subtitle }}
        </h2>
      </div>

      <slot
        name="back-button"
      />

      <slot
        name="addon"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageTitle'
}
</script>

<style scoped lang="sass">
@import "../sass/variables"

section
  //margin-left: -$container-gap-horizontal
  //margin-right: -$container-gap-horizontal

</style>
