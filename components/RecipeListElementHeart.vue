<template functional>
  <transition
    name="bounce"
    mode="out-in">
    <b-icon
      :key="props.active ? 'active' : 'normal' "
      :type="props.active ? 'is-danger' : ''"
      icon="heart"
    />
  </transition>
</template>

<script>
export default {
  name: 'RecipeListElementHeart'
}
</script>

<style scoped lang="sass">
  .bounce-enter-active
    animation: bounce-in .5s

  .bounce-leave-active
    animation: bounce-in .4s reverse

  @keyframes bounce-in
    0%
      transform: scale(0)

    20%
      transform: scale(1.55)

    50%
      transform: scale(1.2)

    100%
      transform: scale(1)
</style>
