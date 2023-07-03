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
          <input type="text" class="form-control" id="price" @input="(e) => (campground['price'] = e.target.value)" required />
          <div class="invalid-feedback mb-1">Price is required</div>
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
      campground: { title: undefined, location: undefined, image: undefined, price: undefined, description: undefined },
    };
  },

  mounted() {
    let form = this.$refs["form"];

    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() || 1 == 1) {
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
        // mode: "cors",
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        // referrerPolicy: "no-referrer",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      let res = response.json(); // parses JSON response into native JavaScript objects
      res.then((data) => {
        console.log(data);
        this.$router.push(`/campgrounds/${data._id}`);
      });
      // .catch((e) => {
      //   console.log(e);
      //   return this.$nuxt.error({
      //     statusCode: 403,
      //     message: "Access denied",
      //   });
      // });
    },
  },
};
</script>
