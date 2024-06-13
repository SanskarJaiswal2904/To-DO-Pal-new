<template>
  <Navbar @search="handleSearch" />

  <div class="loading" v-if="isLoading">
    <Skeleton_Notes/>
  </div>

  <div class="alreadyLoaded" v-if="!isLoading">
  <div class="page-container">
    <div class="content-wrap" :class="notes.length === 0 ? 'downshiftthescroll' : 'downshiftthescrolllittle'">
      <div class="container my-3">
        <div class="mb-3">

          <p style="font-size: 34px; font-weight: bold; background: linear-gradient(to right, #4CAF50, #2196F3); -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; color: transparent; border-radius: 5px; text-align: left; margin-bottom: 10px;">Hi, {{username}}</p>

          <br/>
          <h2>Add Notes to Save:</h2>
          <br />
          <label for="textField" class="form-label">Title</label>
          <br />
          <textarea
            class="input-field"
            rows="1"
            placeholder="Title"
            v-model="title"
            required
          ></textarea>
          <br />
          <br />
          <label for="textField" class="form-label">Description</label>
          <br />
          <textarea
            class="input-field"
            rows="10"
            placeholder="What you want to do today!"
            v-model="text"
            required
          ></textarea>
        </div>

        <button class="btn save-btn primary-btn" title="To save text" @click="saveText">
          Save <i class="fas fa-save"></i>
        </button>
        <button class="btn copy-btn primary-btn" title="To copy text to clipboard" @click="copyText">
          Copy to clipboard <i class="fas fa-copy"></i>
        </button>
      </div>
    </div>
    <div class="GettingUser">
      <SingleNote v-if="filteredNotes.length > 0" :items="filteredNotes" :taskdone="taskdone" />
    </div>
  </div>
  </div>
<Footer />
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Footer from './Footer.vue';
import SingleNote from './SingleNote.vue';
import Navbar from './Navbar.vue';
import Skeleton_Notes from '@/skeleton/Skeleton_Notes.vue';
const text = ref('');
const title = ref('');
const username = ref('');
const isCompleted = ref(false);
const notes = ref([]);
const filteredNotes = ref([]);
const router = useRouter();
const isLoading = ref(true);

const userInfo = ref({});

const saveText = async () => {

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/notes`, {
      title: title.value,
      description: text.value,
      isCompleted: isCompleted.value,
      userId: userInfo.value._id.$oid // Access the nested _id properly
    });

    if (response.status === 201) {
      location.reload()
      const saveBtn = document.querySelector('.save-btn');
      if (saveBtn) {
        saveBtn.classList.add('clicked');

        setTimeout(() => {
          saveBtn.classList.remove('clicked');
          text.value = '';
          title.value = '';
        }, 750);
      }
        const temp = {
          title: title.value,
          description: text.value,
          userId: userInfo.value._id.$oid,
          isCompleted: isCompleted.value,
          datecreated: formatDate(new Date().toISOString())
        };
        notes.value.unshift(temp); // Add new note to the top
        filteredNotes.value.unshift(temp); // Add to filtered notes as well
    }
  } catch (error) {
    console.error('Error saving note:', error);
  }
  onMounted();
};

const handleSearch = (searchTerm) => {
  console.log('Received search term:', searchTerm);
  console.log(searchTerm.length)
  if(searchTerm.length > 0){  
    filteredNotes.value = notes.value.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
};

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', options);
}

onMounted(async () => {
  document.title = "TO-DO Pal - Home";
  isLoading.value = true;
  let data = localStorage.getItem('user-info');
  if (data) {
    userInfo.value = JSON.parse(data); // Parse the user info from localStorage
  } else {
    router.push({ name: 'SignIn' }).then(() => {
      setTimeout(() => {
        location.reload();
      }, 0);
    });
  }

  username.value = userInfo.value.name;


  try {
    isLoading.value = true;
    console.log(userInfo.value._id.$oid)
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/notes/user/${userInfo.value._id.$oid}`);
    if (response.status === 200) {
      // Process each note to format the datecreated field
      notes.value = response.data.map(note => {
        return {
          ...note,
          datecreated: formatDate(note.datecreated.$date)
        };
      });
      // filteredNotes.value = notes.value; // Initialize filteredNotes with all notes
      filteredNotes.value = response.data.map(note => {
        return {
          ...note,
          datecreated: formatDate(note.datecreated.$date)
        };
      });
    }
  } catch (error) {
    console.error(error.response.data.error);
    console.error('Error fetching notes:', error);
  }
  setTimeout(() => {
        isLoading.value = false;
    }, 400);
});

const taskdone = async (note) => {
  note.isCompleted = !note.isCompleted;
  console.log(note.isCompleted);
  console.log(note._id)
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/notes/update/${note._id.$oid}`, {
      isCompleted: note.isCompleted
    });
    if (response.status === 200) {
      console.log('Note updated successfully');
    }
  } catch (error) {
    console.error('Error updating note:', error);
  }
}

const copyText = () => {
  navigator.clipboard.writeText(title.value + " - " + text.value).then(
    () => {
      console.log('Text copied to clipboard');
    },
    (error) => {
      console.error('Error copying text:', error);
    }
  );

  const copyBtn = document.querySelector('.copy-btn');
  if (copyBtn) {
    copyBtn.classList.add('clicked');

    setTimeout(() => {
      copyBtn.classList.remove('clicked');
    }, 200);
  }
};
</script>


<style scoped>
textarea {
  width: 100%;
  padding: 15px 20px;
  margin: 10px 0;
  display: inline-block;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  background: linear-gradient(145deg, #f0f0f0, #d9d9d9);
  color: #333;
}

textarea:focus {
  border-color: #7aa2f7;
  box-shadow: 0 0 10px 0 rgba(122, 162, 247, 0.7);
  outline: none;
}

body {
  margin: 0;
  padding: 0;
}

* {
  margin: 0;
  padding: 0;
}

.page-container .content-wrap {
  margin-left: 60px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.downshiftthescrolllittle {
  min-height: 58vh;
}

.downshiftthescroll {
  min-height: 70vh;
}

.mb-3 {
  margin-bottom: 1rem;
}

.form-label {
  margin-bottom: 1rem;
}

.input-field {
  width: 90%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  resize: vertical;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 20px;
}

.primary-btn {
  background-color: white;
  color: blue;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
}

.primary-btn:hover {
  background-color: blue;
  color: white;
}

.delete-btn {
  border: 1px solid red;
  background-color: white;
  color: red;
}

.delete-btn:hover {
  background-color: red;
  color: white;
}

.clicked {
  background-color: rgb(15, 195, 15);
  color: white;
}
</style>
