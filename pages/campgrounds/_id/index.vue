<template>
  <main v-if="campground">
    <div class="container-xl">
      <div class="row mt-3">
        <div class="col-12 col-md-8 offset-md-2">
          <img class="w-50 mb-3" :src="campground.image" alt="into the wild" />

          <h1>{{ campground.title }}</h1>

          <h2>{{ campground.location }}</h2>

          <p>{{ campground.description }}</p>

          <p><span class="fw-bold">Price per night:</span> $ {{ campground.price }}</p>

          <div class="d-flex gap-2 my-3">
            <nuxt-link class="btn btn-secondary" :to="`/campgrounds/${$route.params.id}/edit`">Edit campground</nuxt-link>
            <button class="btn btn-danger" @click="deletePost()">Delete campground</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      id: undefined,
      campground: { title: undefined, location: undefined },
    };
  },

  created() {
    this.id = this.$route.params.id;
  },

  async fetch() {
    // todo handle errors
    const response = await fetch("http://localhost:3001/campgrounds/" + this.$route.params.id);
    this.campground = await response.json();
  },

  methods: {
    async deletePost() {
      let url = "http://localhost:3001/campgrounds/" + this.id;

      await fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          console.log(res === "SUCCESS");
          if (res === "SUCCESS") {
            this.$router.push(`/campgrounds`);
          }
        });
    },
  },
};
</script>

<style></style>
