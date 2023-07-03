<template>
  <main v-if="campground">
    <div class="container-xl">
      <h1>Edit campground</h1>

      <form class="needs-validation d-grid gap-3" novalidate ref="form">
        <div class="form-group">
          <label for="title" class="form-label">Title</label>
          <input
            class="form-control"
            type="text"
            id="title"
            @input="(e) => (campground['title'] = e.target.value)"
            :value="campground.title"
            required
          />
          <div class="invalid-feedback mb-1">Title is required</div>
        </div>
        <div class="form-group">
          <label for="location" class="form-label">Location</label>
          <input
            class="form-control"
            type="text"
            id="location"
            @input="(e) => (campground['location'] = e.target.value)"
            :value="campground.location"
            required
          />
          <div class="invalid-feedback mb-1">Location is required</div>
        </div>

        <div class="form-group">
          <label for="image" class="form-label">Image Url</label>
          <input
            type="text"
            class="form-control"
            id="image"
            @input="(e) => (campground['image'] = e.target.value)"
            :value="campground.image"
            required
          />
          <div class="invalid-feedback mb-1">Image is required</div>
        </div>

        <div class="form-group">
          <label for="price" class="form-label">Price</label>
          <input
            type="text"
            class="form-control"
            id="price"
            @input="(e) => (campground['price'] = e.target.value)"
            :value="campground.price"
            required
          />
          <div class="invalid-feedback mb-1">Price is required</div>
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            class="form-control"
            id="description"
            @input="(e) => (campground['description'] = e.target.value)"
            :value="campground.description"
            required
          />
          <div class="invalid-feedback mb-1">Description is required</div>
        </div>
        <div class="">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      id: undefined,
      campground: { title: undefined, location: undefined, image: undefined, price: undefined, description: undefined },
    };
  },

  created() {
    this.id = this.$route.params.id;
  },

  async fetch() {
    const response = await fetch("http://localhost:3001/campgrounds/" + this.id);
    this.campground = await response.json();
  },
  mounted() {
    let form = this.$refs["form"];

    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
          // magic?
          this.putData();
        }

        form.classList.add("was-validated");
      },
      false
    );
  },

  methods: {
    async putData() {
      console.log(this.id);
      console.log(this.campground);

      let data = { campground: this.campground };
      console.log(data);
      await fetch(`http://localhost:3001/campgrounds/${this.id}`, {
        method: "PUT",
        // mode: "cors",
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        // referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      })
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          console.log(res === "SUCCESS");
          if (res === "SUCCESS") {
            this.$router.push(`/campgrounds/${this.id}`);
          }
        });
    },
  },
};
</script>
