import configUIMgr from '../../config/models/configUIMgr.js'

export const formatterColor = (id) => {
  const color = configUIMgr.themeColors
  const selectedThemeInfo = color.find((item) => item.id === id)
  if (!selectedThemeInfo)
    console.error(`theme select  error . id=${id}, used firstInfo`)
  return selectedThemeInfo || color[0]
}
