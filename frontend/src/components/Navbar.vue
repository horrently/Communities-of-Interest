<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
    <h1 class="title">Сообщества по интересам</h1>
    <nav class="nav-links">
      <router-link v-if="currentUser" class="item" to="/profile">Профиль</router-link>
      <router-link v-if="currentUser" class="item" to="/communities">Сообщества</router-link>
      <router-link v-if="currentUser" class="item" to="/my-communities">Мои сообщества</router-link>
      <router-link v-if="currentUser" class="item" to="/community/add">Создать сообщество</router-link>
      <router-link v-if="currentUser" class="item" to="/suggest-interest">Предложить интерес</router-link>
      <router-link v-if="currentUser && currentUser.role === 'admin'" class="item" to="/suggested-interest">Предложенные интересы</router-link>
      <a v-if="currentUser" @click.prevent="logOut" class="item">Выйти</a>
      <router-link v-else class="item" to="/login">Войти</router-link>
    </nav>
  </div>
</template>

<script>
    import http from "../http-common";
    export default {
    name: "NavBar",
    data() {
        return {};

    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
      fetchNavbar() {
        const userId = this.$store.state.auth.user.id;
        http.get(`/users/` + userId)
          .then(response => {
            const data = response.data;
            this.user = {
              name: data.name,
              email: data.email,
              interests: data.user_interests.map(i => i.interest)
            };
          })
          .catch(err => {
            console.error(err);
          });
      },
      logOut() {
          this.$store.dispatch('auth/logout');
          window.location.href = '/login';
        }
    },
    mounted() {
      this.fetchNavbar();
    }
};
</script>

<style scoped>
.sidebar {
  width: 230px;
  height: 600px;
  border-radius: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.logo {
  margin-bottom: 20px;
}

.logo img {
  width: 100px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.item {
  padding: 10px 15px;
  text-decoration: none; 
  color: #333;
  border-radius: 20px;
  transition: background-color 0.3s;
  text-align: center;
}

.item:hover {
  background-color: #e0e0e0;
}
</style>
