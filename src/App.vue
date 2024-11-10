<script setup lang="ts">
import ContactForm from './components/ContactForm.vue';
import ContactList from './components/ContactList.vue';
import SearchBar from './components/SearchBar.vue';

import axios from "axios";
import { onMounted, ref, computed } from 'vue';

const contacts = ref([]);

const searchQuery = ref('');

const sortedAndFilteredContacts = computed(() => {
  console.log("searchQuery:", searchQuery.value);
  const filtered = contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  return filtered.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
});


const fetchContacts = async () => {
  try {
    const { data } = await axios.get("https://3cb670945d3e6179.mokky.dev/contacts");
    contacts.value = data.map((obj: object) => obj);
  } catch (err) {
  }
};

onMounted(() => {
  fetchContacts();
})
</script>

<template>
<SearchBar @input="onChangeSearchInput" v-model:searchQuery="searchQuery" :contacts="contacts"/>
<ContactForm @updateContactList="fetchContacts"/>
<ContactList @updateContactList="fetchContacts" :contacts="sortedAndFilteredContacts"/>
</template>

<style scoped>


.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
