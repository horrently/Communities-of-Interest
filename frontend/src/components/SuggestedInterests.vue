<template>
    <div class="suggested-interests">
      <h4 class="form-title">Предложенные интересы</h4>
      <ul class="interest-list">
        <li v-for="interest in suggestedInterests" :key="interest.id">
          <span class="interest-name">{{ interest.name }}</span>
          <button @click="approveInterest(interest.id)" class="button approve-button">Одобрить</button>
          <button @click="rejectInterest(interest.id)" class="button reject-button">Отклонить</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import http from "../http-common";
  
  export default {
    name: "SuggestedInterests",
    data() {
      return {
        suggestedInterests: []
      };
    },
    methods: {
      fetchSuggestedInterests() {
        http.get('/suggested_interests')
          .then(response => {
            this.suggestedInterests = response.data;
          })
          .catch(err => {
            console.error(err);
          });
      },
      approveInterest(id) {
        http.put(`/suggested_interests/approve/${id}`)
          .then(() => {
            this.fetchSuggestedInterests();
          })
          .catch(err => {
            console.error(err);
          });
      },
      rejectInterest(id) {
        http.delete(`/suggested_interests/${id}`)
          .then(() => {
            this.fetchSuggestedInterests();
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    mounted() {
      this.fetchSuggestedInterests();
    }
  };
  </script>
  
  <style scoped>
  .suggested-interests {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .interest-list {
    list-style-type: none;
    padding: 0;
  }
  
  .interest-list li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .interest-name {
    font-size: 18px;
    font-weight: 500;
    color: #555;
  }
  
  .button {
    padding: 8px 12px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s ease;
  }
  
  .approve-button {
    background-color: #28a745;
    color: white;
  }
  
  .reject-button {
    background-color: #dc3545;
    color: white;
  }
  </style>
  