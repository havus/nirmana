import { useDark, useToggle } from '@vueuse/core'

export function useDarkMode() {
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
    storageKey: 'darkMode',
    storage: localStorage
  })
  const toggleDarkMode = useToggle(isDark)

  return {
    isDark,
    toggleDarkMode
  }
}
