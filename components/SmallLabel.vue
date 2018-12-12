<template functional>
  <span class="is-size-6 is-uppercase has-text-grey">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'SmallLabel'
}
</script>

<style lang="sass" scoped>
  @import "@/sass/variables.sass"

  //span
    margin-right: $small-gap
</style>
