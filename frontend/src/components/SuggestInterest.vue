<template>
  <div class="suggest-interest">
    <h4 class="form-title">Предложить интерес</h4>
    <form @submit.prevent="submitInterest" class="form-container">
      <input
        type="text"
        v-model="interestName"
        placeholder="Название интереса"
        required
        class="form-input"
      />
      <input
        type="submit"
        value="Предложить"
        class="form-submit"
      />
    </form>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "SuggestInterest",
  data() {
    return {
      interestName: "",
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    submitInterest() {
      const userId = this.$store.state.auth.user.id;
      http.post("/suggested_interests", { name: this.interestName, user_id: userId })
        .then(() => {
          this.successMessage = "Интерес успешно предложен!";
          this.errorMessage = "";
          this.interestName = "";
        })
        .catch(err => {
          console.error(err);
          this.errorMessage = "Ошибка при предложении интереса.";
          this.successMessage = "";
        });
    }
  }
};
</script>

<style scoped>
.suggest-interest {
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
  display: flex;
  flex-direction: column;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;
}

.form-submit {
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.form-submit:hover {
    background-color: #353535;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 10px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
