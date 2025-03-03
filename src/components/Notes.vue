<template>
  
  <Navbar @search="handleSearch" />
  <Toast :message="toastMessage" :type="toastType" :pausable="toastPausable" :key="toastKey"/>

  <div class="loading" v-if="isLoading">
    <Skeleton_Notes/>
  </div>

  <div class="alreadyLoaded" v-if="!isLoading">
  <div class="page-container">
    <div class="content-wrap" :class="notes.length === 0 ? 'downshiftthescroll' : 'downshiftthescrolllittle'">
      <div class="container my-3">
        <div class="mb-3">

          <p id="greeting" style="font-size: 34px; font-weight: bold; background: linear-gradient(to right, green, red);
          -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; color: transparent; border-radius: 5px; text-align: left; margin-bottom: 10px; font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">Hi, {{username}}  <i class="fa-regular fa-face-smile"></i> !!</p>

          <br/>
          <h2 class="input-feild-title-style-exc">Add Notes to Save:</h2>
          <br />
          <label for="textField" class="form-label input-feild-title-style" >Title</label>
          <br />
          <textarea
            class="input-field"
            rows="1"
            placeholder="Title"
            v-model.lazy.trim="title"
            required
          ></textarea>
          <br />
          <br />
          <label for="textField" class="form-label input-feild-title-style">Description</label>
          <br />
          <textarea
            class="input-field"
            rows="10"
            placeholder="What you want to do today!"
            v-model.lazy.trim="text"
            required
          ></textarea>
        </div>

        <div class="buttonsBlue">
        <button class="btn save-btn primary-btn input-feild-title-style-italic" title="To save text" @click="saveText">
          Save <i class="fas fa-save"></i>
        </button>
        <button class="btn copy-btn primary-btn input-feild-title-style-italic" title="To copy text to clipboard" @click="copyText">
          Copy to clipboard <i class="fas fa-copy"></i>
        </button>
      </div>
      </div>
    </div>
      </div>

      <div class="analyze-string-container">
        <div class="analysis-result">
          <p><strong>Word Count:</strong> {{ analyzeString(title + text).wordCount }}</p>
          <p><strong>Character Count:</strong> {{ analyzeString(title + text).charCount }}</p>
          <p><strong>Sentence Count:</strong> {{ analyzeString(title + text).sentenceCount }}</p>
          <p><strong>Paragraph Count:</strong> {{ analyzeString(title + text).paragraphCount }}</p>
          <p><strong>Whitespace Count:</strong> {{ analyzeString(title + text).whiteSpaceCount }}</p> 
        </div>
      </div>
  </div>
    <div class="GettingUser">
      <SingleNote v-if="filteredNotes.length > 0" :items="filteredNotes" :taskdone="taskdone" />
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
import Toast from './Toast.vue';


const text = ref('');
const title = ref('');
const username = ref('');
const isCompleted = ref(false);
const notes = ref([]);
const filteredNotes = ref([]);
const router = useRouter();
const isLoading = ref(true);

const userInfo = ref({});

const toastMessage = ref('');
const toastType = ref('');
const toastPausable = ref(false);
const toastKey = ref(0);

const analyzeString = (data) => {
  if (typeof data !== 'string') {
    return "Input must be a string!";
  }

  // Trim the input to handle extra spaces
  const words = data.trim().split(/\s+/);
  const wordCount = data.trim() === "" ? 0 : words.length;

  // Character count, excluding spaces
  const charCount = data.replace(/\s/g, "").length;

  // Sentence count (split by . ! ?)
  const sentences = data.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const sentenceCount = sentences.length;

  // Paragraph count (split by \n)
  const paragraphs = data.split(/\n+/).filter(paragraph => paragraph.trim().length > 0);
  const paragraphCount = paragraphs.length;

  // White space count
  const whiteSpaceCount = (data.match(/\s/g) || []).length;

  return {
    wordCount: wordCount,
    charCount: charCount,
    sentenceCount: sentenceCount,
    paragraphCount: paragraphCount,
    whiteSpaceCount: whiteSpaceCount,
  };
}

//Update toast
const updateToast = (msg, type, pause) => {
    toastMessage.value = msg;
    toastType.value = type;
    toastPausable.value = pause;
    toastKey.value++; // Increment the key to force re-render
    console.log('Toast displayed')
}

const saveText = async () => {
  if(title.value === '' || text.value === ''){
    if (title.value === '') {
      updateToast('Title cannot be null.', 'error', true); // Toast
    } else if (text.value === '') {
      updateToast('Description cannot be null.', 'error', true); // Toast
    }
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/notes`, {
      title: title.value,
      description: text.value,
      isCompleted: isCompleted.value,
      userId: userInfo.value._id.$oid // Access the nested _id properly
    });

    if (response.status === 201) {
      updateToast('Note Saved Successfully.', 'success', false); //Toast
      setTimeout(() => {
        location.reload()
      }, 1500);
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
    //Toast
    updateToast('Note was not saved Successfully.', 'error', false);
  }
  onMounted();
};

const handleSearch = (searchTerm) => {
  console.log('Received search term:', searchTerm);
  console.log(searchTerm.length)
  if(searchTerm.length > 0){  
    //Toast
    updateToast('Searching for \''+searchTerm +'\'.', 'info', true);
    filteredNotes.value = notes.value.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase()),
    
      setTimeout(() => {
        window.scrollBy({
          top: 250, // Number of pixels to scroll vertically
          left: 0,  // Number of pixels to scroll horizontally
          behavior: 'smooth' // Enables smooth scrolling
      });
      updateToast('Search completed.', 'success', false);  //Toast
      }, 500)
      
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
    updateToast('Please sign in to continue.', 'info', true);
    router.push({ name: 'SignIn' }).then(() => {
      setTimeout(() => {
        location.reload();
      }, 1300);
    });
  }

  username.value = userInfo.value.name.split(' ')[0]; // take only first part of the name

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
  } finally{
      //Toast
  updateToast('Save a note to view.', 'info', true);
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
      //Toast
      updateToast(`Note has been marked as ${note.isCompleted ? 'completed' : 'incomplete'}.`, 'success', false);
    }
  } catch (error) {
    console.error('Error updating note:', error);
  }
}

const copyText = () => {
  navigator.clipboard.writeText(title.value + " - " + text.value).then(
    () => {
      console.log('Text copied to clipboard');
     //Toast
     updateToast('Text copied to clipboard.', 'success', false);

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
.analyze-string-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  background: linear-gradient(to right, #ff7e5f, #feb47b, #ffcc33, #fddb92);
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
  font-family: Arial, sans-serif;
  margin-left: 50px;
}

.analysis-result {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  flex-wrap: nowrap;
}

.analysis-result p {
  margin: 0;
  font-size: 0.9rem;
  color: #333;
}

.analysis-result p strong {
  color: #000;
  margin-right: 5px;
}

.buttonsBlue{
  margin-bottom: 10px;

}
.input-feild-title-style-italic{
  font-family: "Playwrite IT Moderna", cursive;
  font-weight: 400;
  font-style: normal;
}

.input-feild-title-style-exc{
    font-family: "Trocchi", serif;
    font-weight: 200;
    font-style: normal;
}

.input-feild-title-style{
    font-family: "IBM Plex Serif", serif;
    font-weight: 400;
    font-style: normal;
}
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
  background-color: #f3f4f6; /* Light gray background for a modern look */
  color: #4A90E2; /* Soft blue for text */
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  border: 1px solid #4A90E2;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.primary-btn:hover {
  background-color: #4A90E2; /* Vibrant blue for hover */
  color: #ffffff;
  transform: translateY(-3px) scale(1.05); /* Lift effect */
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.4); /* Glow shadow */
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
