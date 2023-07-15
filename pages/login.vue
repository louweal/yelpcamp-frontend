<template>
  <main>
    <div class="container-xl">
      <h1>Login</h1>

      <form class="needs-validation d-grid gap-3" novalidate ref="form">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input class="form-control" type="text" id="username" @input="(e) => (username = e.target.value)" required />
          <div class="invalid-feedback mb-1">Username is required</div>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input class="form-control" type="password" id="password" @input="(e) => (password = e.target.value)" required />
          <div class="invalid-feedback mb-1">Password is required</div>
        </div>
        <button class="btn btn-primary" type="submit">Login</button>
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
          this.login();
        }

        form.classList.add("was-validated");
      },
      false
    );
  },

  methods: {
    async login() {
      let data = { username: this.username, password: this.password };
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(data),
      });
      let res = await response.json();

      if (res.success) {
        this.$store.commit("setUser", res.user);
        this.$router.go(-1);
      } else {
        this.error = res.message;
      }
    },
  },
};
</script>

<style></style>
