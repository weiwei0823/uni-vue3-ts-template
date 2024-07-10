export const useWebsocketStore = defineStore('websocket', () => {
  const status = ref(0)
  const ping = ref(0)
  const last_server_time = ref(0)
  const last_client_time = ref(0)
  const timeInterval = ref(0)
  const lastBeatServerTime = ref(-1)
  const lastBeatClientTime = ref(-1)
  const webSocketLogs = reactive([])

  const websocketTimeInterval = computed(() => {
    return timeInterval.value || 0
  })
  const debugWebsocketTimeInterval = computed(() => {
    return Math.abs(
      Math.ceil(timeInterval.value * (Math.random() * 0.3 + 0.7)) +
        (-50 + Math.ceil(50 * Math.random()))
    )
  })
  const setWebsocketStatus = (value: any) => {
    status.value = value
  }
  const setLastServerTime = (time: any) => {
    last_server_time.value = time
  }
  const setLastClientTime = (time: any) => {
    last_client_time.value = time
  }
  const setTimeInterval = (time: any) => {
    timeInterval.value = time > 0 ? time : 0
  }
  const setLastBeatServerTime = (time: any) => {
    lastBeatServerTime.value = time
  }
  const setLastBeatClientTime = (time: any) => {
    lastBeatClientTime.value = time
  }
  const addOneWebsocketLog = (logMsg: any) => {
    webSocketLogs.push({
      time: Date.now(),
      msg: logMsg
    })
    if (webSocketLogs.length > 1000) {
      webSocketLogs.shift()
    }
  }
  const updateWebscoketPing = (serverTime: any) => {
    const clientTime = Date.now()
    setLastServerTime(serverTime)
    setLastClientTime(clientTime)
    setTimeInterval(clientTime - serverTime) // serverTime - clientTime
  }

  return {
    status,
    ping,
    last_server_time,
    last_client_time,
    timeInterval,
    lastBeatServerTime,
    lastBeatClientTime,
    webSocketLogs,
    websocketTimeInterval,
    debugWebsocketTimeInterval,
    setWebsocketStatus,
    setLastServerTime,
    setLastClientTime,
    setTimeInterval,
    setLastBeatServerTime,
    setLastBeatClientTime,
    addOneWebsocketLog,
    updateWebscoketPing
  }
})

export default useWebsocketStore
