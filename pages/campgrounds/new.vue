<template>
  <main>
    <div class="container-xl">
      <h1>Add new campground</h1>

      <form class="needs-validation d-grid gap-3" novalidate ref="form">
        <div class="form-group">
          <label for="title" class="form-label">Title</label>
          <input class="form-control" type="text" id="title" @input="(e) => (campground['title'] = e.target.value)" required />
          <div class="invalid-feedback mb-1">Title is required</div>
        </div>
        <div class="form-group">
          <label for="location" class="form-label">Location</label>
          <input class="form-control" type="text" id="location" @input="(e) => (campground['location'] = e.target.value)" required />
          <div class="invalid-feedback mb-1">Location is required</div>
        </div>

        <div class="form-group">
          <label for="image" class="form-label">Image Url</label>
          <input type="text" class="form-control" id="image" @input="(e) => (campground['image'] = e.target.value)" required />
          <div class="invalid-feedback mb-1">Image is required</div>
        </div>

        <div class="form-group">
          <label for="price" class="form-label">Price</label>
          <input
            type="number"
            class="form-control"
            id="price"
            @input="(e) => (campground['price'] = e.target.value)"
            min="0"
            max="999"
            pattern="[0-9]"
            required
          />
          <div class="invalid-feedback mb-1">Price is invalid</div>
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" @input="(e) => (campground['description'] = e.target.value)" required />
          <div class="invalid-feedback mb-1">Description is required</div>
        </div>
        <div class="">
          <button class="btn btn-primary" type="submit" xxxclick="postData()">Add campground</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      campground: { title: undefined, location: undefined, image: undefined, price: undefined, description: undefined, reviews: [] },
    };
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
          this.postData();
        }

        form.classList.add("was-validated");
      },
      false
    );
  },
  methods: {
    async postData() {
      console.log(this.campground);

      let data = { campground: this.campground };
      const response = await fetch("http://localhost:3001/campgrounds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await response.json();
      if (res.success) {
        this.$router.push(`/campgrounds/${res._id}`);
      } else {
        console.log(res);
      }
    },
  },
};
</script>
