import { useToast } from 'vue-toastification';

const toast = useToast();

const showToast = (message = Success, type = 'success', pausable = false) => {
  toast(message, {
    type: type, // Can be 'success', 'info', 'warning', 'error'
    position: 'top-right',
    timeout: 3000, 
    closeOnClick: false,
    pauseOnHover: pausable,
    closeButton: false,
  });
};

export { showToast };
