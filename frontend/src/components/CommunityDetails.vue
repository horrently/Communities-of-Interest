<template>
  <div v-if="community" class="community-details">
    <div class="title-container">
      <h2 class="community-title">{{ community.title }}</h2>
      <button v-if="isAdmin()" @click="toggleEdit" class="edit-community-btn">
        {{ editing ? 'Отмена' : 'Редактировать сообщество' }}
      </button>
    </div>
    <p v-if="!editing" class="community-description">{{ community.description }}</p>
    <div v-if="editing" class="edit-container">
      <input v-model="community.title" placeholder="Название" />
      <textarea v-model="community.description" placeholder="Описание"></textarea>
      <button @click="updateCommunity" class="save-btn">Сохранить</button>
    </div>
    <hr />
    <div class="community-interests">
      <h5>Интересы сообщества:</h5>
      <div class="interests-list">
        <div v-for="interest in community.interests" :key="interest.id" class="interest-item">
          {{ interest.name }}
          <span v-if="isAdmin()" @click="removeInterest(interest.id)" class="delete-icon">−</span>
        </div>
      </div>
    </div>
    <div v-if="isAdmin()" class="add-interest-container">
      <h5>Добавить интерес:</h5>
      <div class="interests-list">
        <div v-for="interest in availableInterests" :key="interest.id" class="interest-item" @click="addInterest(interest.id)">
          {{ interest.name }}
          <span class="add-icon">+</span>
        </div>
      </div>
    </div>
    <hr />
    <div class="create-post">
      <h5>Написать пост:</h5>
      <form @submit.prevent="createPost">
        <textarea v-model="newPost.content" placeholder="Ваш пост..." required></textarea>
        <button type="submit">Отправить</button>
      </form>
    </div>
    <div class="community-posts">
      <h5>Посты сообщества:</h5>
      <div class="post-card" v-for="post in community.posts" :key="post.id">
        <p>{{ post.content }}</p>
        <span v-if="isAdmin()" class="delete-post" @click="deletePost(post.id)">&#x2716;</span>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Загрузка...</p>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "CommunityDetails",
  props: ['id'],
  data() {
    return {
      community: null,
      newPost: {
        content: ''
      },
      availableInterests: [], // cписок интересов
      editing: false // режим редактирование
    };
  },
  methods: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      return this.currentUser().role === 'admin';
    },
    fetchCommunity() {
      http.get(`/communities/${this.id}`)
        .then(response => {
          this.community = response.data;
          this.loadPosts();
          this.fetchAvailableInterests();
        })
        .catch(err => {
          console.error('Ошибка загрузки сообщества:', err);
        });
    },
    loadPosts() {
      http.get(`/posts/community/${this.id}`)
        .then(postsResponse => {
          this.community.posts = postsResponse.data.reverse();
        })
        .catch(err => {
          console.error('Ошибка загрузки постов:', err);
        });
    },
    createPost() {
      http.post('/posts', {
        content: this.newPost.content,
        community_id: this.id,
      })
      .then(response => {
        this.community.posts.unshift(response.data);
        this.newPost.content = ''; // очищаем поле ввода
      })
      .catch(err => {
        console.error('Ошибка создания поста:', err);
      });
    },
    deletePost(postId) {
      http.delete(`/posts/${postId}`)
        .then(() => {
          this.community.posts = this.community.posts.filter(post => post.id !== postId);
        })
        .catch(err => {
          console.error('Ошибка удаления поста:', err);
        });
    },
    toggleEdit() {
      this.editing = !this.editing;
    },
    updateCommunity() {
      http.put(`/communities/${this.id}`, {
        title: this.community.title,
        description: this.community.description
      })
      .then(() => {
        this.editing = false;
      })
      .catch(err => {
        console.error('Ошибка обновления сообщества:', err);
      });
    },
    fetchAvailableInterests() {
      http.get('/interests')
        .then(response => {
          this.availableInterests = response.data.filter(interest => 
            !this.community.interests.some(ci => ci.id === interest.id)
          );
        })
        .catch(err => {
          console.error('Ошибка загрузки интересов:', err);
        });
    },
    addInterest(interestId) {
      http.post('/community_interests', {
        community_id: this.id,
        interest_id: interestId
      })
      .then(() => {
        this.fetchCommunity();
      })
      .catch(err => {
        console.error('Ошибка добавления интереса:', err);
      });
    },
    removeInterest(interestId) {
      http.delete(`/community_interests/${this.id}/${interestId}`)
      .then(() => {
        this.fetchCommunity();
      })
      .catch(err => {
        console.error('Ошибка удаления интереса:', err);
      });
    }
  },
  mounted() {
    this.fetchCommunity();
  }
};
</script>


<style scoped>
.community-details {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.community-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.edit-community-btn {
  padding: 8px 16px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.edit-community-btn:hover {
  background-color: #353535;
}

.community-description {
  font-size: 16px;
  margin-bottom: 15px;
  color: #555;
}

.edit-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.save-btn {
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #353535;
}

.community-interests, .community-posts, .add-interest-container {
  font-size: 18px;
  margin-top: 15px;
}

.interests-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.interest-item {
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
  position: relative;
}

.add-icon, .delete-icon {
  margin-left: 10px;
  cursor: pointer;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.add-icon {
  color: rgb(0, 0, 0);
}

.create-post textarea {
  width: 97%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.create-post button {
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.post-card {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  position: relative;
}

.delete-post {
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  color: red;
}
</style>
