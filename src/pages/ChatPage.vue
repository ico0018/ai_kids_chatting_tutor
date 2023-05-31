<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :name="message.name"
        :avatar="message.avatar"
        :text="message.text"
        :stamp="message.timestamp"
        :sent="message.sent"
        :bg-color="message.bgColor"
      />
      <q-input v-model="newMessage" outlined placeholder="Type a message" />
      <q-btn label="Send" @click="sendMessage" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      messages: [
        {
          id: 1,
          name: "<span class='text-positive'>Untrusted Source</span>",
          avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
          text: ['hey, how are <strong>you</strong>?'],
          timestamp: '7 minutes ago',
          sent: true,
          bgColor: 'amber-7'
        },
        {
          id: 2,
          name: "<span class='text-negative'>Jane (trusted name but untrusted text)</span>",
          avatar: "https://cdn.quasar.dev/img/avatar5.jpg",
          text: ['doing fine, how r you?', 'I just feel like typing a really, really, <strong>REALLY</strong> long message to annoy you...'],
          timestamp: '4 minutes ago',
          sent: false,
          bgColor: 'primary'
        },
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          id: Date.now(),
          name: "<span class='text-positive'>Untrusted Source</span>",
          avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
          text: [this.newMessage],
          timestamp: new Date().toLocaleTimeString(),
          sent: true,
          bgColor: 'amber-7'
        });
        this.newMessage = '';
      }
    },
  },
};
</script>