<template>
  <main>
    <h1>All Campgrounds</h1>

    <ul>
      <li v-for="campground in campgrounds" :key="campground.id">
        <nuxt-link :to="`/campgrounds/${campground._id}`">{{ campground.title }}</nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  data() {
    return {
      campgrounds: undefined,
    };
  },
  async fetch() {
    const response = await fetch("http://localhost:3001/campgrounds");
    let res = await response.json();

    if (res.success) {
      this.campgrounds = res.campgrounds;
    } else {
      this.error = res.message;
    }
  },
};
</script>

<style></style>
