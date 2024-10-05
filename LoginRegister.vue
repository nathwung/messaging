<template>
    <q-form @submit="submitForm()">
        <q-input
            v-if="tab == 'register'"
            outlined
            class="q-mb-md"
            v-model="formData.name"
            label="Name" />
        <q-input
            outlined
            type="email"
            class="q-mb-md"
            v-model="formData.email"
            label="Email" />
        <q-input
            outlined
            type="password"
            class="q-mb-md"
            v-model="formData.password"
            label="Password" />
        <div class="row">
            <q-space />
            <q-btn 
            color="primary" 
            type="submit"
            :label="tab" />   
        </div>
    </q-form>
    <!-- <pre>{{ store.userDetails }}</pre> -->
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'stores/store' 

const store = useStore()

const props = defineProps({
    tab:{
        type: String,
        required: true
    }
})

const formData = ref({
    name: '',
    email: '',
    password: ''
})

const submitForm = () =>{
    if (props.tab=='login'){
        store.loginUser(formData.value)
    } else{
        store.registerUser(formData.value)
    }
}

</script>
