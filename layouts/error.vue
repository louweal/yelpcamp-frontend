<template>
  <div class="container-xl">
    <div class="text-center">
      <h1 class="text-primary fs-2 pb-3">{{ error ? $t(error.message) : $t("Something went wrong") }}</h1>

      <nuxt-link to="/" class="btn btn-primary">
        {{ $t("Return home") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  transition: "page",
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
