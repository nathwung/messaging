<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn @click="router.push('/')"
          v-if="route.fullPath.includes('/chat')" 
          icon="arrow_back" 
          flat 
          dense 
          label="Back" />
        <div class="row q-gutter-xs items-center" v-else-if="route.fullPath == '/'">
            <q-icon class="q-mt-none" size="md" color="white" name="account_circle" /> 
            <q-input v-if="isEdit" bg-color="white" outlined v-model="stores.userDetails.name" dense />
            <div class="q-mt-none text-h6" v-else>
              {{ stores.userDetails.name }}
            </div>
            <q-btn class="q-mt-none" v-if="!isEdit" @click="isEdit = true" flat round color="white" icon="edit" size="xs" />
            <q-btn v-else @click ="edit()" flat round color="white" icon="save" size="xs" />
        </div>
        <q-toolbar-title class="absolute-center" >
          {{ title }}
        </q-toolbar-title>
        <div v-if="!route.fullPath.includes('/chat')">
          <q-btn
            v-if="stores.userDetails.id"
            @click="stores.logoutUser()"
            class="absolute-right q-pr-sm"
            icon="logout" 
            no-caps
            flat 
            dense />
        </div>
        <q-btn 
        v-else
        class="absolute-right q-pr-sm"
        icon="more_vert"
        flat 
        dense>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section @click="stores.firebaseDeleteMessage(route.params.otherUserId)">Clear Messages</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'
import { useStore } from 'stores/store'

const isEdit = ref(false)
const stores = useStore()
const route = useRoute()
const router = useRouter()

const title = computed(()=>{
  let currentPath = route.fullPath
    if (currentPath == '/'){
      return 'Users'
    } else if (currentPath.includes('/chat')){
      return stores.users[route.params.otherUserId].name
    } else if (currentPath == '/auth'){
      return 'Chat'
    }
})

const edit = () =>{
  stores.firebaseEditName()
  isEdit.value = false
}
defineOptions({
  name: 'MainLayout'
})
</script>
