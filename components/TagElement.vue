<template>
  <b-tag
    :size="size"
    type="is-primary"
    v-text="name"
  />
</template>

<script>
export default {
  name: 'TagElement',
  props: {
    size: {
      type: String,
      required: false
    },
    id: Number,
    name: String,
    slug: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
</style>
