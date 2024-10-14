<template>
  <div class="community-list">
    <h4 class="list-title">Список сообществ</h4>
    <ul class="community-items">
      <li v-for="community in communities" :key="community.id" class="community-item">
        <div class="community-content">
          <router-link
            :to="{ name: 'community-details', params: { id: community.id } }"
            class="community-title"
          >
            {{ community.title }}
          </router-link>
          <p class="community-description">{{ community.description }}</p>
        </div>
        <button @click="openCommunity(community.id)" class="open-button">
          Открыть
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "CommunityList",
  data() {
    return {
      communities: []
    };
  },
  methods: {
    fetchCommunities() {
      const userId = this.$store.state.auth.user.id;
      // сообщества с учетом интересов текущего пользователя
      http.get(`/communities/filtered/${userId}`)
        .then(response => {
          this.communities = response.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    openCommunity(id) {
      this.$router.push({ name: 'community-details', params: { id } });
    }
  },
  mounted() {
    this.fetchCommunities();
  }
};
</script>

<style scoped>
.community-list {
  padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.list-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.community-items {
  list-style-type: none;
  padding: 0;
}

.community-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}

.community-content {
  flex-grow: 1;
}

.community-title {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}

.community-title:hover {
  text-decoration: underline;
}

.community-description {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.open-button {
  padding: 5px 15px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.open-button:hover {
  background-color: #353535;
}
</style>
