<template>
  <main>
    <div class="container-xl">
      <h1>Register</h1>

      <form class="needs-validation d-grid gap-3" novalidate ref="form">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input class="form-control" type="text" id="username" @input="(e) => (username = e.target.value)" required />
          <div class="invalid-feedback mb-1">Username is required</div>
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input class="form-control" type="email" id="email" @input="(e) => (email = e.target.value)" required />
          <div class="invalid-feedback mb-1">Email is invalid</div>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <p>
            Requirements: The password should be at least 8 characters long, at least one uppercase letter, at least one digit and at least
            one special character.
          </p>
          <input
            class="form-control"
            type="password"
            id="password"
            @input="(e) => (password = e.target.value)"
            xxxpattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
            required
          />
          <div class="invalid-feedback mb-1">Password doesn't meet the requirements.</div>
        </div>
        <button class="btn btn-primary" type="submit">Register</button>
      </form>

      <p class="text-center text-danger" v-if="error">
        {{ error }}
      </p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: undefined,
      email: undefined,
      password: undefined,
      error: undefined,
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
          this.register();
        }

        form.classList.add("was-validated");
      },
      false
    );
  },

  methods: {
    async register() {
      let data = { username: this.username, email: this.email, password: this.password };
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let res = await response.json();

      if (res.success) {
        this.$store.commit("setUser", res.user);
        this.$router.push(`/campgrounds`);
      } else {
        this.error = res.message;
      }
    },
  },
};
</script>

<style></style>
