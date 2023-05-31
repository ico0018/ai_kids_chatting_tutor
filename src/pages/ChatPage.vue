<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        v-for="message in allMessages"
        :key="message.id"
        :name="message.name"
        :avatar="message.avatar"
        :text="message.text"
        :stamp="message.timestamp"
        :sent="message.sent"
        :bg-color="message.bgColor"
      />
      <q-input v-model="newMessage" outlined placeholder="Type a message" />
      <q-btn :disable="isWaitingForResponse" label="Send" @click="sendMessage">
        <q-spinner v-if="isWaitingForResponse" color="black" size="18px" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import { sendMessage } from '../services/openai.js';

export default {
  data() {
    return {
      newMessage: '',
      isWaitingForResponse: false,
      users: [
        {
          id: 1,
          name: "<span class='text-positive'>User1</span>",
          avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
          messages: [],
          bgColor: 'amber-7',
        },
        {
          id: 2,
          name: "<span class='text-negative'>AI Bot</span>",
          avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
          messages: [],
          bgColor: 'primary',
        },
      ],
    };
  },
  computed: {
    allMessages() {
      const messages = [];
      for (const user of this.users) {
        messages.push(...user.messages);
      }
      return messages.sort((a, b) => a.id - b.id);
    },
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        const user = this.users[0];
        const userMessage = this.newMessage;
        user.messages.push({
          id: Date.now(),
          name: user.name,
          avatar: user.avatar,
          text: [this.newMessage],
          timestamp: new Date().toLocaleTimeString(),
          sent: true,
          bgColor: user.bgColor,
        });
        this.newMessage = '';

        this.isWaitingForResponse = true;

        try {
          const response = await sendMessage(userMessage);

          const aiBot = this.users[1];
          aiBot.messages.push({
            id: Date.now(),
            name: aiBot.name,
            avatar: aiBot.avatar,
            text: [response],
            timestamp: new Date().toLocaleTimeString(),
            sent: false,
            bgColor: aiBot.bgColor,
          });
        } catch (error) {
          console.log('Error:', error);
        }

        this.isWaitingForResponse = false;
      }
    },
  },
};
</script>
