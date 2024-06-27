import {defineStore} from 'pinia'

const useWebsocketStore = defineStore('Websocket', {
  state: () => ({
    status: 0,
    ping: 0,
    last_server_time: 0,
    last_client_time: 0,
    timeInterval: 0,

    lastBeatServerTime: -1,
    lastBeatClientTime: -1,

    webSocketLogs: []
  }),
  getters: {
    websocketTimeInterval: (state) => this.timeInterval,
    debugWebsocketTimeInterval(state) {
      return Math.abs(
          Math.ceil(this.timeInterval * (Math.random() * 0.3 + 0.7)) +
          (-50 + Math.ceil(50 * Math.random()))
      )
    }
  },
  actions: {
    setWebsocketStatus: (status) => (this.status = status),
    setLastServerTime: (time) => (this.last_server_time = time),
    setLastClientTime: (time) => (this.last_client_time = time),
    setTimeInterval: (time) =>
        (this.timeInterval = time > 0 ? time : 0),
    setLastBeatServerTime: (time) => (this.lastBeatServerTime = time),
    setLastBeatClientTime: (time) => (this.lastBeatClientTime = time),
    addOneWebsocketLog: (logMsg) => {
      this.webSocketLogs.push({time: Date.now(), msg: logMsg})
      if (this.webSocketLogs.length > 1000) {
        this.webSocketLogs.shift()
      }
    },
    updateWebscoketPing: (serverTime) => {
      const clientTime = Date.now()
      this.setLastServerTime(serverTime)
      this.setLastClientTime(clientTime)
      this.setTimeInterval(clientTime - serverTime) // serverTime - clientTime
    }
  }
})

export default useWebsocketStore
