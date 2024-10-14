<template>
    <div class="my-communities">
      <h4 class="section-title">Мои сообщества</h4>
      <ul class="community-list">
        <li v-for="community in myCommunities" :key="community.id" class="community-item">
          <router-link
            :to="{ name: 'community-details', params: { id: community.id } }"
            class="community-link"
          >
            {{ community.title }}
          </router-link>
          <p class="community-description">{{ community.description }}</p>
        </li>
      </ul>
      <div v-if="myCommunities.length === 0" class="no-communities">
        <p>У вас пока нет сообществ. Присоединитесь к новым или создайте своё!</p>
      </div>
    </div>
  </template>
  
  <script>
  import http from "../http-common";
  
  export default {
    name: "MyCommunities",
    data() {
      return {
        myCommunities: []
      };
    },
    methods: {
      fetchMyCommunities() {
        const userId = this.$store.state.auth.user.id;
        http.get("/my_communities" + userId)
          .then(response => {
            this.myCommunities = response.data;
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    mounted() {
      this.fetchMyCommunities();
    }
  };
  </script>
  
  <style scoped>
  .my-communities {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
  }
  
  .community-list {
    list-style-type: none;
    padding: 0;
  }
  
  .community-item {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: box-shadow 0.3s;
  }
  
  .community-item:hover {
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  }
  
  .community-link {
    display: block;
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
  }
  
  .community-link:hover {
    text-decoration: underline;
  }
  
  .community-description {
    margin-top: 5px;
    color: #666;
  }
  
  .no-communities {
    text-align: center;
    color: #888;
  }
  </style>
  