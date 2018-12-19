<template functional>
  <span
    :style="props.styless"
    class="is-size-6 is-uppercase has-text-grey"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'SmallLabel',
  functional: true
}
</script>
