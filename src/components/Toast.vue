<script setup>
import { defineProps, onMounted } from 'vue';
import { showToast } from '../services/toastservice'; 

const { message, type, pausable } = defineProps({
  message: {
    type: String,
    required: true,
    default: "Success"
  },  
  type: {
    type: String,
    required: true,
    default: "success"
  },
  pausable: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
  if(!(message === '' && type === '' && pausable === false)){
    showToast(message, type, pausable);
  }
}); 
</script>
