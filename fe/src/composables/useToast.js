import { ref, h, render } from 'vue'
import Toast from '@/components/Toast.vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
  const showToast = (message, type = 'info', options = {}) => {
    const id = ++toastId
    const duration = options.duration || 5000
    const autoClose = options.autoClose !== false

    // Create a container for this toast
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.top = `${16 + (toasts.value.length * 80)}px`
    container.style.right = '16px'
    container.style.zIndex = '9999'
    document.body.appendChild(container)

    // Create the toast component
    const toastVNode = h(Toast, {
      message,
      type,
      duration,
      autoClose,
      onClose: () => removeToast(id)
    })

    // Render the toast
    render(toastVNode, container)

    // Add to toasts array
    toasts.value.push({
      id,
      container,
      vNode: toastVNode
    })

    // Auto-remove after duration
    if (autoClose) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      const toast = toasts.value[index]

      // Remove from DOM
      if (toast.container && toast.container.parentNode) {
        toast.container.parentNode.removeChild(toast.container)
      }

      // Remove from array
      toasts.value.splice(index, 1)

      // Reposition remaining toasts
      toasts.value.forEach((remainingToast, idx) => {
        if (remainingToast.container) {
          remainingToast.container.style.top = `${16 + (idx * 80)}px`
        }
      })
    }
  }

  const clearAllToasts = () => {
    toasts.value.forEach(toast => {
      if (toast.container && toast.container.parentNode) {
        toast.container.parentNode.removeChild(toast.container)
      }
    })
    toasts.value = []
  }

  // Convenience methods
  const success = (message, options) => showToast(message, 'success', options)
  const error = (message, options) => showToast(message, 'error', options)
  const warning = (message, options) => showToast(message, 'warning', options)
  const info = (message, options) => showToast(message, 'info', options)

  return {
    showToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
    toasts: toasts.value
  }
}
