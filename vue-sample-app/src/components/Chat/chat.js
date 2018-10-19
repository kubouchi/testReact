export default {
  name: 'chat',
  methods: {
    send_message() {
      this.messages.push(this.message)
      this.message = "" // 初期化する
    }
  },
  data() {
    return {
      channels: ['general', 'random'],
      message: "",
      messages: []
    }
  }
}
