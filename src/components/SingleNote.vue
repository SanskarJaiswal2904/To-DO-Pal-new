<template>
  <Toast :message="toastMessage" :type="toastType" :pausable="toastPausable" :key="toastKey"/>


    <div class="table-container" style="font-size: 20px; color: #333;">
        <div class="flexitems">
            <h2>Notes</h2>
            <button class="action-btn bigClass" @click="deleteEveryNote" title="Delete All">
                <i class="fas fa-trash-alt"></i> Delete All
            </button>
        </div>
        <table class="custom-table">
            <thead>
                <tr>
                    <th>Task Completion</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item" class="note-card" :title="item._id.$oid">
                    <td>
                        <label for="done">
                            <input type="checkbox" name="done" :checked="item.isCompleted"
                            :title="`CURRENT STATUS : ${item.isCompleted ? 'Task done' : 'Task not done'}`"
                            @click="() => taskdone(item)">
                        </label>
                    </td>
    
                    <td>{{ item.title }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.datecreated }}</td>
                    <td>
                        <button class="action-btn delete-btn" @click="deleteOne(item._id)" title="Delete"><i class="fas fa-trash-alt"></i> Delete</button>
                        <button class="action-btn update-btn" @click="showUpdateForm(item)" title="Update"><i class="fas fa-pencil-alt"></i> Update</button>
                    </td>
                </tr>
            </tbody>
        </table>
    
        <!-- Update Modal  -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2 class="input-feild-title-style-exc">Update Note</h2>
                <form @submit.prevent="updateNote">
                    <div class="form-group">
                        <label for="title" class="input-feild-title-style">Title</label>
                        <input type="text" id="title" v-model="currentNote.title" required>
                    </div>
    
                    <div class="form-group">
                        <label for="description" class="input-feild-title-style">Description</label>
                        <textarea id="description" v-model="currentNote.description" rows="4" required></textarea>
                    </div>
    
                    <button type="submit" class="action-btn save-btn" title="Save">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import Toast from './Toast.vue';

    const toastMessage = ref('');
    const toastType = ref('');
    const toastPausable = ref(false);
    const toastKey = ref(0);
    
    const props = defineProps({
      items: {
        type: Array,
        required: true
      },
      taskdone: {
        type: Function,
        required: true
      }
    });
    
    const showModal = ref(false);
    const currentNote = ref({
      _id: '',
      title: '',
      description: ''
    });
    
    //Update toast
    const updateToast = (msg, type, pause) => {
      toastMessage.value = msg;
      toastType.value = type;
      toastPausable.value = pause;
      toastKey.value++; // Increment the key to force re-render
      console.log('Toast displayed')
    }

    const deleteEveryNote = async () => {
      const confirmed = confirm("Are you sure you want to delete all the notes?");
      if (!confirmed) {
        return;
      }
    
      const user = localStorage.getItem('user-info');
      const parsedUser = JSON.parse(user);
    
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/notes/deleteall/${parsedUser._id.$oid}`);
        if (response.status === 200) {
          console.log('All notes deleted successfully');
          //Toast
          updateToast('All notes deleted successfully.', 'success', true);
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      } catch (error) {
        console.error('Error deleting notes:', error);
      }
    };
    
    const deleteOne = async (sno) => {
        console.log(sno)
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/notes/deleteone/${sno.$oid}`);
        if (response.status === 200) {
          console.log(`Note ${sno.$oid} deleted successfully.`);
          //Toast
          updateToast('Note deleted successfully.', 'success', true);
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    };
    
    const showUpdateForm = (note) => {
      currentNote.value = { ...note };
      showModal.value = true;
    };
    
    const closeModal = () => {
      showModal.value = false;
    };
    
    const updateNote = async () => {
        console.log(currentNote.value)
        console.log(currentNote.value._id)
        console.log(currentNote.value._id.$oid)
      try {
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/notes/update/${currentNote.value._id.$oid}`, {
          title: currentNote.value.title,
          description: currentNote.value.description
        });
        if (response.status === 200) {
          console.log(`Note ${currentNote.value._id.$oid} updated successfully.`);
          updateToast('Note updated successfully.', 'success', true); //Toast
          closeModal();
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      } catch (error) {
        console.error('Error updating note:', error);
      }
    };
    </script>
    

  
<style scoped>
.input-feild-title-style-italic{
  font-family: "Playwrite IT Moderna", cursive;
  font-weight: 400;
  font-style: italic;
}

.input-feild-title-style-exc{
    font-family: "Trocchi", serif;
    font-weight: 200;
    font-style: normal;
}

.input-feild-title-style{
    font-family: "IBM Plex Serif", serif;
    font-weight: 400;
    margin-top: 10px;
    font-style: normal;
}

/* Custom styling for checkboxes */
input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 30px;
    height: 30px;
    border: 2px solid #333; /* Dark border */
    border-radius: 50%;
    background-color: #fff; /* White background */
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  
  /* Custom styling for checked checkboxes */
  input[type="checkbox"]:checked {
    background-color: #00ff08; /* Change background color when checked */
    border-color: #4caf50; /* Change border color when checked */
  }
  
  /* Custom styling for checkbox label */
  label[for="done"] {
    display: inline-block;
    width: 40px; /* Match width of checkbox */
    height: 40px; /* Match height of checkbox */
    margin: 0;
    text-align: center; /* Center checkbox */
    line-height: 30px; /* Center vertically */
  }
  
  /* Custom styling for checked checkbox indicator */
  input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    top: 50%; /* Adjust top position to center vertically */
    left: 50%; /* Adjust left position to center horizontally */
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    display: block;
  }
  
.note-card:hover {
    animation: elevate 0.2s ease-in-out;
    transform: scale(1.02); 
  }
  
  @keyframes elevate {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.02);
    }
  }
.bigClass {
    background-color: rgb(255, 210, 210);
    color: red;
    border: 1px solid red;
    width: 300px;
    height: 45px;
    margin-right: 8px;
    border-radius: 8px;
}

.bigClass:hover {
    background-color: red;
    color: white;
    border: 1px solid red;
}

.flexitems {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table-container {
    width: 90vw;
    margin: 0 auto;
    margin-bottom: 20px;
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}

.custom-table th,
.custom-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
    word-wrap: break-word;
}

.custom-table th {
    background: linear-gradient(to right, #ef7d03, #f78b3e);
    color: #333;
    font-weight: bold;
}

.custom-table tr {
    background: linear-gradient(to right, #ffaf58, #ffbc60);
}

.custom-table tr:hover {
    background: linear-gradient(to right, #c6c4c4, #d1d1d1);
}

.action-btn {
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 10px;
}

.delete-btn {
  background: linear-gradient(to left, #ff5757, #ff6f6f);
  color: #fff;
  margin-right: 8px;
  border-radius: 8px;
}

.delete-btn:hover {
  background: linear-gradient(to right, #f03737, #f44336);
}


.update-btn {
  background: linear-gradient(to left, #4caf50, #7be480);
  color: #fff;
  border-radius: 8px;
}

.update-btn:hover {
  background: linear-gradient(to right, #43a047, #81c784);
}


.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background: linear-gradient(to right, #fffdc2, #fff9a1);
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}


.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.save-btn {
  background: linear-gradient(to right, #4caf50, #66bb6a);
  color: #fff;
  border-radius: 8px;
}

.save-btn:hover {
  background: linear-gradient(to right, #43a047, #81c784);
}


.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-weight: bold;
}

.form-group input[type="text"],
.form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    /* Ensure padding and border are included in the width */
    word-wrap: break-word; /* Add word-wrap property */
}

.form-group textarea {
    resize: vertical;
    /* Allow vertical resizing for textareas */
}

.save-btn {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.save-btn:hover {
    background-color: #43a047;
}

.modal-content {
  background: linear-gradient(to right, #fffdc2, #fff9a1);
  margin: 15% auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
}


/* Close button styles */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>

