<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';

const name = ref<string>('');
const email = ref<string>('');
const phone = ref<string>('');
const emit = defineEmits(['updateContactList']);

// Флаги, отслеживающие, что пользователь начал вводить данные
const isNameTouched = ref(false);
const isEmailTouched = ref(false);
const isPhoneTouched = ref(false);

const phoneCheckRegex = /^\+?\d{1,4}?[\s-]?\(?\d{3}\)?[\s-]?\d{3}-\d{2}-\d{2}$/;

// Валидация имени
const isNameValid = computed(() => name.value && name.value.trim().length >= 2);
const nameError = computed(() => isNameTouched.value && !isNameValid.value ? 'Имя должно содержать минимум 2 символа' : '');

// Валидация email
const isEmailValid = computed(() => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return email.value && emailRegex.test(email.value);
});
const emailError = computed(() => isEmailTouched.value && !isEmailValid.value ? 'Некорректный формат email' : '');

// Валидация телефона
const isPhoneValid = computed(() => phone.value && phoneCheckRegex.test(phone.value));
const phoneError = computed(() => isPhoneTouched.value && !isPhoneValid.value ? 'Телефон должен быть в формате +123 (456) 789-01-23' : '');

// Проверка всей формы
const isFormValid = computed(() => isNameValid.value && isEmailValid.value && isPhoneValid.value);

const addContact = async () => {
  if (!isFormValid.value) return;

  const newContact = {
    name: name.value,
    email: email.value,
    phone: phone.value,
  };

  try {
    await axios.post("https://3cb670945d3e6179.mokky.dev/contacts", newContact);
    emit('updateContactList');
  } catch (error) {
    console.error("Ошибка при добавлении контакта:", error);
  }
};
</script>

<template>
  <div class="contact-form">
    <h2 class="form-title">Добавить контакт</h2>
    <form method="POST" @submit.prevent="addContact">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        required
        @input="isNameTouched = true"
      />
      <div v-if="nameError" class="tooltip">{{ nameError }}</div>

      <input
        v-model="phone"
        type="text"
        placeholder="Phone"
        required
        @input="isPhoneTouched = true"
      />
      <div v-if="phoneError" class="tooltip">{{ phoneError }}</div>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        @input="isEmailTouched = true"
      />
      <div v-if="emailError" class="tooltip">{{ emailError }}</div>

      <button type="submit" :disabled="!isFormValid" class="add-btn">Добавить контакт</button>
    </form>
  </div>
</template>

<style scoped>
.contact-form {
  width: 50%;
  margin: 0 auto;
}
.contact-form h2 {
  text-align: center;
}
.form-title {
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
}
.contact-form form > input {
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
}
.add-btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 42%;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  margin: 0 auto;
  display: block;
}
.tooltip {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  color: red;
}
</style>