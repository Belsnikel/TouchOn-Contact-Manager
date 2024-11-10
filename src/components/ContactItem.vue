<script setup lang="ts">



import { ref} from 'vue';
import axios from 'axios';

const props = defineProps<{
    id: number;
    name: string;
    email: string;
    phone: string;
}>();

const emit = defineEmits(['updateContactList']);

const newName = ref<string>();
const newEmail = ref<string>();
const newPhone = ref<string>();  

const isModalOpen = ref(false);

const removeContact = async() => {
    try {
        const response = await axios.delete(`https://3cb670945d3e6179.mokky.dev/contacts/${props.id}`);
        emit('updateContactList');
    }
    catch (error) {
        console.error("Ошибка при удалении объекта:", error);
    }
}

const editContact = async() => {
    let item = {
        "name": newName.value,
        "email": newEmail.value,
        "phone": newPhone.value
    }
    try {
        const response = await axios.patch(`https://3cb670945d3e6179.mokky.dev/contacts/${props.id}`, item);
        isModalOpen.value = !isModalOpen.value
        emit('updateContactList');

    }
    catch (error) {
        console.error("Ошибка при изменении объекта:", error);
    }
}

</script>

<template>
    <div class="user">
        <div class="user-wrapper">
            <div class="user-info">
                <h2>User</h2>
                <div class="user-name"><span>Name: </span>{{ name }}</div>
                <div class="user-phone"><span>Phone: </span>{{ phone }}</div>
                <div class="user-email"><span>Email: </span>{{ email }}</div>
            </div>
        <div class="user-actions">
            <button @click="isModalOpen = !isModalOpen" class="edit-btn">Редактировать</button>
            <button  @click="removeContact" class="delete-btn">Удалить</button>
            
        </div>  
    </div>
    <Transition>
    <div class="modal" v-if="isModalOpen">
        <form method="POST" @submit.prevent="editContact">
            <input v-model="newName" type="text" placeholder="Name" required>
            <input v-model="newPhone" type="text" placeholder="Phone" required>
            <input v-model="newEmail" type="email" placeholder="Email" required>
            <button @click="editContact"  class="save-btn">Сохранить</button>
        </form>
    </div>
    </Transition>
</div>

</template>



<style scoped>
 .user {
    color: #000;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
 }
 .user-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
 }
 .user-actions {
    display: flex; 
    flex-direction: column;
    justify-content: end;
 }
 .edit-btn {
    margin-bottom: 8px;
 }
 .user-actions  button {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;   
    cursor: pointer;
 }
 modal form {
    max-width: 400px;
 }
 .modal form {
  display: flex;
  flex-direction: column;
  align-items: center;
 }
 .modal form > input {
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 8px;
  width: 35%;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;    
}
.save-btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 25%;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;   
  margin: 0 auto;
  display: block; 
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>