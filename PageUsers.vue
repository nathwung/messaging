<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item 
        v-for="(user, key) in store.filteredUsers" 
        :key="key"
        clickable 
        v-ripple
        :to="'/chat/' + key"
        >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0).toUpperCase() }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label style="color: grey" v-if="!user.online">Last seen {{ date.formatDate(user.lastSeen, "dddd DD/MM/YYYY") }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online? 'light-green-5' : 'grey-4'">
            {{ user.online? 'Online' : 'Offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { useStore } from 'stores/store'
import { date } from 'quasar'

const store = useStore()
// console.log(store.users)

</script>
