<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'stores/store' 
import { onMounted } from 'vue'

onMounted(()=>{
  const handle = useStore()
  handle.handleAuthStateChanged()
})
</script>
