import { toast, ToastPosition, Theme, cssTransition, ToastOptions } from 'react-toastify'

class ToastClass {
  private options: ToastOptions = {
    position: 'top-center' as ToastPosition,
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: 'light' as Theme,
    transition: cssTransition({
      enter: 'wbBounceIn',
      exit: 'wbBounceOut',
      collapse: true
    }),
    style: {
      boxShadow: 'var(--shadow-primary)',
      borderRadius: 8
    },
    closeButton: false
  }

  public success(message: string, duration = 2500) {
    toast.success(message, { ...this.options, autoClose: duration })
  }

  public error(message: string, duration = 2500) {
    toast.error(message, { ...this.options, autoClose: duration })
  }

  public info(message: string, duration = 2500) {
    toast.info(message, { ...this.options, autoClose: duration })
  }
}

export const Toast = new ToastClass()
