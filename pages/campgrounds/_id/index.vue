<template>
  <main v-if="campground">
    <div v-if="error" class="alert alert-danger">
      <p>{{ error }}</p>
    </div>
    <div class="container-xl" v-else>
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

          <form class="needs-validation d-grid gap-3" novalidate ref="form">
            <div class="form-group">
              <label for="rating" class="form-label">Rating</label>

              <input
                class="form-range"
                type="range"
                id="rating"
                min="1"
                max="5"
                value="5"
                @input="(e) => (review['rating'] = +e.target.value)"
              />
            </div>
            <div class="form-group">
              <label for="body" class="form-label">Review</label>
              <textarea class="form-control" id="body" @input="(e) => (review['body'] = e.target.value)" rows="3" required />
              <div class="invalid-feedback mb-1">Review body is required</div>
            </div>
            <button class="btn btn-primary" type="submit" xxxclick="postData()">Submit review</button>
          </form>

          <div v-for="(r, i) in campground.reviews" :key="i">
            Rating: {{ r.rating }}
            <p>Review: {{ r.body }}</p>
            <button class="btn btn-danger btn-sm" @click="deleteReview(r._id)">Delete</button>
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
      review: { rating: 5, body: undefined },
      error: undefined,
    };
  },

  created() {
    this.id = this.$route.params.id;
  },

  async fetch() {
    const response = await fetch("http://localhost:3001/campgrounds/" + this.$route.params.id);
    let res = await response.json();
    if (res.campground) {
      this.campground = res.campground;
    } else {
      this.error = res.message || "Unknown error";
    }
  },

  mounted() {
    let form = this.$refs["form"];

    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
          this.postReview();
        }

        form.classList.add("was-validated");
      },
      false
    );
  },

  methods: {
    async deletePost() {
      let response = await fetch(`http://localhost:3001/campgrounds/${this.id}`, {
        method: "DELETE",
      });
      let res = await response.json();
      if (res.success) {
        this.$router.push(`/campgrounds`);
      } else {
        console.log(res);
      }
    },

    async deleteReview(rid) {
      let response = await fetch(`http://localhost:3001/campgrounds/${this.id}/reviews/${rid}`, {
        method: "DELETE",
      });
      let res = await response.json();
      if (res.success) {
        this.$router.go();
      } else {
        console.log(res);
      }
    },

    async postReview() {
      const response = await fetch(`http://localhost:3001/campgrounds/${this.id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review: this.review }),
      });

      let res = await response.json();
      if (res.success) {
        this.$router.go();
      } else {
        console.log(res);
      }
    },
  },
};
</script>

<style></style>
