<template>
  <div class="user-profile">
    <h2 class="profile-title">Профиль пользователя</h2>
    <p>Имя: <strong>{{ user.name }}</strong></p>
    <p>Email: <strong>{{ user.email }}</strong></p>
    <hr />
    <h5 class="interests-title">Мои интересы</h5>
    <div class="interests-list">
      <div v-for="interest in user.interests" :key="interest.id" class="interest-item">
        {{ interest.name }}
        <span class="delete-icon" @click="removeInterest(interest.id)">&#8722;</span>
      </div>
    </div>
    <hr />
    <h5 class="add-interest-title">Добавить новый интерес</h5>
    <div class="available-interests-list">
      <div v-for="interest in availableInterests" :key="interest.id" class="available-interest-item">
        {{ interest.name }}
        <span class="add-icon" @click="addInterest(interest.id)">&#43;</span>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {
        interests: [] // интересы пользователя
      },
      availableInterests: [] // интересы, которые можно добавить
    };
  },
  methods: {
    fetchUserProfile() {
      const userId = this.$store.state.auth.user.id;
      http.get(`/users/` + userId)
        .then(response => {
          const data = response.data;
          this.user = {
            name: data.name,
            email: data.email,
            interests: data.user_interests.map(i => i.interest)
          };
          this.fetchAvailableInterests(); // Загружаем интересы, которые можно добавить
        })
        .catch(err => {
          console.error(err);
        });
    },
    fetchAvailableInterests() {
      // получение всех интересов
      http.get('/interests')
        .then(response => {
          const allInterests = response.data;
          // убрать уже добавленные интересы
          this.availableInterests = allInterests.filter(interest => 
            !this.user.interests.some(userInterest => userInterest.id === interest.id)
          );
        })
        .catch(err => {
          console.error(err);
        });
    },
    addInterest(interestId) {
      const userId = this.$store.state.auth.user.id;
      http.post('/user_interests', {
        user_id: userId,
        interest_id: interestId
      })
      .then(() => {
        // обновление профиля пользователя
        this.fetchUserProfile();
      })
      .catch(err => {
        console.error(err);
      });
    },
    removeInterest(interestId) {
      const userId = this.$store.state.auth.user.id;
      http.delete(`/user_interests/${userId}/${interestId}`)
        .then(() => {
          // обновление профиля пользователя
          this.fetchUserProfile();
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    this.fetchUserProfile();
  }
};
</script>

<style scoped>
.user-profile {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-title {
  font-size: 24px;
  margin-bottom: 15px;
}

.interests-title, .add-interest-title {
  font-size: 18px;
  margin-top: 15px;
}

.interests-list, .available-interests-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.interest-item, .available-interest-item {
  margin-bottom: 5px;
  background-color: #e0e0e0;
  padding: 3px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.delete-icon, .add-icon {
  margin-left: 10px;
  color: #000000;
  cursor: pointer;
  font-size: 18px;
}

.add-icon {
  color: rgb(0, 0, 0);
}
</style>