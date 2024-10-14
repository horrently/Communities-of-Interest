<template>
  <div class="auth-container">
    <h2 class="auth-title">Вход</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" v-model="password" required />
      </div>
      <div class="form-group">
        <button type="submit">Войти</button>
      </div>
      <div class="form-footer">
        <router-link to="/register">Нет аккаунта? Зарегистрируйтесь</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "Log-in",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await http.post("/login", {
          email: this.email,
          password: this.password,
        });
        const user = response.data;
        // Сохраняем пользователя и токен в localStorage
        localStorage.setItem("user", JSON.stringify(user));
        this.$router.push("/profile");
      } catch (err) {
        console.error(err);
        alert("Ошибка входа. Проверьте ваши данные.");
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.auth-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.form-footer {
  text-align: center;
  margin-top: 10px;
}
</style>
