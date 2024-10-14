<template>
  <div class="auth-container">
    <h2 class="auth-title">Регистрация</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Имя:</label>
        <input type="text" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" v-model="password" required />
      </div>
      <div class="form-group">
        <button type="submit">Зарегистрироваться</button>
      </div>
      <div class="form-footer">
        <router-link to="/login">Уже есть аккаунт? Войдите</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "Reg-ister",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        await http.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        alert("Регистрация прошла успешно!");
        this.$router.push("/login"); // Перенаправление на страницу входа после регистрации
      } catch (err) {
        console.error(err);
        alert("Ошибка регистрации. Попробуйте еще раз.");
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
