<script setup lang="ts">
import ContactItem from './ContactItem.vue'; 
import { defineProps } from 'vue';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

defineProps<{
  contacts: Contact[];
}>();
</script>


<template>
    <div>
        <ContactItem
        v-for="contact in contacts"
        :key="contact.id"
        :id="contact.id"
        :name="contact.name"
        :email="contact.email"
        :phone="contact.phone"
        @updateContactList="$emit('updateContactList')"
        />
    </div>
</template>

<style scoped>

</style>