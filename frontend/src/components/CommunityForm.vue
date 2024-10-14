<template>
  <div class="community-form">
    <h4 class="form-title">Создание сообщества</h4>
    <form @submit="addCommunity" class="form-container">
      <div class="form-group">
        <input
          type="text"
          v-model="community.title"
          placeholder="Название"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <textarea
          v-model="community.description"
          placeholder="Описание"
          required
          class="form-textarea"
        ></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Интересы:</label>
        <div class="interests-list">
          <div
            v-for="interest in interests"
            :key="interest.id"
            class="interest-item"
            :class="{ selected: isSelected(interest.id) }"
            @click="toggleInterest(interest.id)"
          >
            {{ interest.name }}
            <span v-if="isSelected(interest.id)" class="checkmark">&#10003;</span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <input
          type="submit"
          value="Создать"
          class="form-submit"
        />
      </div>
    </form>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "CommunityForm",
  data() {
    const userId = this.$store.state.auth.user.id;
    return {
      community: {
        title: "",
        description: "",
        owner_id: +userId
      },
      interests: [], // все интересы
      selectedInterests: [] // выбранные интересы
    };
  },
  methods: {
    addCommunity(e) {
      e.preventDefault();
      http.post("/communities", this.community)
        .then(response => {
          const communityId = response.data.id;
          // добавление интересов для сообщества
          const interestPromises = this.selectedInterests.map(interestId => {
            return http.post("/community_interests", {
              community_id: communityId,
              interest_id: interestId
            });
          });
          return Promise.all(interestPromises);
        })
        .then(() => {
          this.$router.push('/communities');
        })
        .catch(err => {
          console.error(err);
        });
    },
    fetchInterests() {
      http.get("/interests") // получение списка всех интересов
        .then(response => {
          this.interests = response.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    toggleInterest(interestId) {
      if (this.isSelected(interestId)) {
        // если интерес уже выбран, убираем его
        this.selectedInterests = this.selectedInterests.filter(id => id !== interestId);
      } else {
        // если интерес не выбран, добавляем его
        this.selectedInterests.push(interestId);
      }
    },
    isSelected(interestId) {
      return this.selectedInterests.includes(interestId);
    }
  },
  mounted() {
    this.fetchInterests();
  }
};
</script>

<style scoped>
.community-form {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-container {
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-input,
.form-textarea {
  width: 97%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-textarea {
  resize: vertical;
  height: 100px;
}

.form-label {
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: bold;
}

.interests-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.interest-item {
  background-color: #e0e0e0;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  position: relative;
}

.interest-item.selected {
  background-color: #a0d3a0;
}

.checkmark {
  font-size: 10px;
  color: rgb(0, 0, 0);
  margin-left: 10px;
}

.form-submit {
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #353535;
}
</style>