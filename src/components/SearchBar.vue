<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import debounce from 'lodash.debounce';

const emit = defineEmits(['update:searchQuery']);

const searchTerm = ref<string>('');

// Создаем debounce один раз при инициализации компонента
const updateSearchQuery = debounce((value: string) => {
  emit('update:searchQuery', value);
}, 300);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchTerm.value = target.value;
  updateSearchQuery(target.value);
};
</script>

<template>
  <div class="search">
    <input type="text" placeholder="Search" @input="onInput" />
  </div>
</template>

<style scoped>
.search {
    background-color: #4CAF50;
    margin-bottom: 20px;
}
 .search input {
   position: relative;
   width: 96%;
   margin-left: 24px;
   padding: 10px;
   border: 1px solid #ccc;
   border-radius: 4px;
   margin-bottom: 20px;
   margin-top: 20px;
   font-size: 16px;
   font-family: 'Roboto', sans-serif
 }
</style>