<template>
    <q-page ref="pageChat" class="page-chat flex column">
        <q-banner v-if="!otherUserDetails.online" class="bg-grey-4 text-center fixed-top">
            {{ otherUserDetails.name }} is offline.
        </q-banner>
        <div :class="{ 'invisible' : !showMessages }" class="q-pa-md column col justify-end">
           <div v-for="(message, messageId) in store.messages" >
                <div v-if="message.date" class="row justify-center">
                    <q-badge rounded color="grey-8" :label = 'date.formatDate(message.time, "dddd DD/MM/YYYY")==date.formatDate(Date.now(), "dddd DD/MM/YYYY")? "Today" : date.formatDate(message.time, "dddd DD/MM/YYYY") == date.formatDate(date.subtractFromDate(Date.now(), { days: 1 }), "dddd DD/MM/YYYY")? "Yesterday" : date.getDateDiff(Date.now(), message.time, "days") <7? date.formatDate(message.time, "dddd") : date.formatDate(message.time, "dddd DD/MM/YYYY")' />
                </div>
                <q-chat-message
                   :key="message.text"
                   :name="message.from == 'me'? store.userDetails.name : otherUserDetails.name"
                   :text="[message.text]"
                   :sent="message.from == 'me'? true : false"
                   :bg-color="message.from == 'me'? 'light-green-4' : 'white'"
                   style="opacity: 1;"
               >
               <!-- <div class="flex">
                   {{ message.text }} {{ date.formatDate(message.time, 'HH:MM') }} <q-icon v-if="message.from == 'me'" name="done_all" :color="message.read? 'blue' : 'blue-grey-5'" />
               </div> -->
                   <div>
                    <img v-if="message.image"  
                    :src="message.image"
                    style="height: 25vh">
                    </img>
                       <div class="row q-pr-md" v-html="message.text">
                       </div>
                       <div dense class="row">
                           {{ date.formatDate(message.time, 'HH:mm') }} <q-icon class="q-pl-md" v-if="message.from == 'me'" name="done_all" :color="message.read? 'blue' : 'blue-grey-7'" />
                       </div>
                        <q-btn 
                            style="position: absolute; top: 3px; right: 2px; z-index: 10"
                            size="sm"
                            icon="keyboard_arrow_down"
                            flat 
                            dense
                        >
                            <q-menu>
                                <q-list style="min-width: 100px">
                                    <q-item clickable v-close-popup>
                                    <q-item-section @click="store.firebaseDeleteSingleMessage(route.params.otherUserId, messageId)">Delete Message For Me</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                   </div>
               </q-chat-message>
           </div> 
        </div>
        <q-footer elevated>
        <q-toolbar>
            <q-form ref="newMessageRef" class="full-width">
                <q-input bg-color="white" outlined rounded v-model="newMessage" label="Message" dense>
                    <template v-slot:prepend>
                        <q-btn type="submit" round dense color="primary" flat icon="mood">
                            <q-menu>
                                <div class="row q-gutter-md q-pl-md">
                                    <span v-for="emoticon in emoteList" v-html="`${emoticon}`" style="cursor: pointer; font-size:x-large" @click="newMessage += emoticon"></span>
                                </div>
                            </q-menu>
                        </q-btn>
                    </template>
                    <template v-slot:append>
                        <q-btn @click="qfile.pickFiles()" round dense color="primary" flat icon="attachment" />
                    </template>
                    <template v-slot:after>
                        <q-btn @click="sendMessage()" type="submit" round dense color="white" flat icon="send" />
                    </template>
                </q-input>
            </q-form>
        </q-toolbar>
      </q-footer>
    </q-page>
    <q-file @update:model-value="processImage($event)" ref="qfile" v-model="model" label="Outlined" v-show="false"/>
    <q-dialog
      v-model="uploadImageDialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-card-section>
          <div class="row justify-end"><q-btn @click="model=null" icon="close" flat round dense v-close-popup /></div>
        </q-card-section>
        <q-card-section class="row justify-center">
            <img
            :src="uploadImagePreview"
            style="height: 75vh"
            />
        </q-card-section>
        <q-card-section>
            <q-input bg-color="white" outlined rounded v-model="newMessage" label="Message" dense>
                    <template v-slot:prepend>
                        <q-btn type="submit" round dense color="primary" flat icon="mood">
                            <q-menu>
                                <div class="row q-gutter-md q-pl-md">
                                    <span v-for="emoticon in emoteList" v-html="`${emoticon}`" style="cursor: pointer; font-size:x-large" @click="newMessage += emoticon"></span>
                                </div>
                            </q-menu>
                        </q-btn>
                    </template>
                    <template v-slot:after>
                        <q-btn @click="sendMessage()" type="submit" round dense color="white" flat icon="send" />
                    </template>
                </q-input>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<style scoped>
    .page-chat{
        background: #e2dfd5
    }
    .page-chat:after{
        content: '';
        display: block;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
        opacity: 0.1;
        background-color:silver;
        background-image:
        radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
        radial-gradient(circle at 0    150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
        radial-gradient(circle at 50%  100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),
        radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),
        radial-gradient(circle at 0    50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
        background-size: 100px 50px;
    }
    .q-banner{
        top: 50px;
        z-index: 2;
        opacity: 0.8;
    }
    .q-message{
        position: relative;
        z-index: 1;

    }
</style>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch} from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useStore } from 'stores/store'
import { date, useQuasar } from 'quasar'

const $q = useQuasar()
const store = useStore()
const route = useRoute()
const newMessage = ref('')
const otherUserDetails = store.users[route.params.otherUserId]
const showMessages = ref(false)
const emoteList = ref(['&#128507;', '&#128508;', '&#128511;', '&#128509;', '&#128514;', '&#128517;', '&#128513;', '&#128587;', '&#128584;', '&#128064;', '&#128158;', '&#128640;', '&#128021;', '&#127829;', '&#127936;', '&#9924;', '&#128526;', '&#128545;', '&#128557;', '&#128561;', '&#128077;', '&#128076;', '&#129318;', '&#127983;', '&#127979;', '&#127968;', '&#9962;', '&#128506', '&#128661;', '&#127828;', '&#127848;'])
const uploadImageDialog = ref(false)
const qfile = ref(null)
const uploadImagePreview = ref('')


onMounted(()=>{
    store.firebaseGetMessages(route.params.otherUserId)
})

onUnmounted(()=>{
    store.firebaseStopGettingMessages()
})

const processImage = (file) =>{
    if (file) {
            if (/^image/.test(file.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    let result = e.target.result;
                    uploadImagePreview.value = result
                    uploadImageDialog.value = true
                };
            } else {
                $q.notify({
                    type: 'warning',
                    message: "Selecting Image Failed!",
                    position: 'top-right'
                })
            }
        } else {
            $q.notify({
                type: 'warning',
                message: "Getting File Failed!",
                position: 'top-right'
            })
        }
}
const sendMessage = () =>{
    if (newMessage.value != "" || uploadImagePreview.value){
        // console.log(Date.now())
        let new_message = {
                text: newMessage.value,
                from: 'me',
                read: false,
                time: Date.now()
            }
        if (uploadImagePreview.value){
            new_message.image = uploadImagePreview.value
        }
        store.firebaseSendMessage({
            message: new_message,
            otherUserId: route.params.otherUserId
        })
        clearMessage()
    }
}

const newMessageRef = ref(null)

const clearMessage = () =>{
    newMessage.value = ''
    newMessageRef.value.focus()
    uploadImageDialog.value = false
    uploadImagePreview.value = ''
}

const pageChat = ref(null)

const scrollToBottom = () =>{
    // console.log(pageChat.value.$el)
    setTimeout(() => {
        window.scrollTo(0,pageChat.value.$el.scrollHeight)
    }, 20)
}

watch(()=>store.messages, (nv, ov)=>{
  if(Object.keys(nv).length){
    scrollToBottom()
    setTimeout(() => {
        showMessages.value = true
    }, 200)
  }
})

</script>
