export interface ConfigurationType {
  isDebug: boolean
  isDev: boolean
  station: string
  forceServerTheme: boolean
  stationVersion: string
}

export const Configuration: ConfigurationType = {
  isDebug: true,
  isDev: true,
  station: 'LUNTAN',
  forceServerTheme: false,
  stationVersion: 'BETA_LUNTAN_20230720'
}

export default Configuration
