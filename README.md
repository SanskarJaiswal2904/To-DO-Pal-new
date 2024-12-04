# To-Do-Pal
To-Do-Pal is a task management web app built with Vue.js, Flask, and MongoDB. It allows users to sign up, manage tasks, and update their profiles. The app also features an admin section for tracking user activities. Designed for ease of use, To-Do-Pal helps individuals and administrators stay organized.

## Live Link : [To-Do-Pal Application](https://to-do-pal-new.vercel.app/)

## Layout
<table>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/Signup%201.png" alt="Signup" title="Signup" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/Account%20Created%202.png" alt="Account Created" title="Account Created" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/Signin%203.png" alt="Signin" title="Signin" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/Saving%20Note%204.png" alt="Saving Note" title="Saving Note" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/Note%20Saved%205.png" alt="Note Saved" title="Note Saved" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/Task%20done%20notdone%206.png" alt="Task Done or Not Done" title="Task Done or Not Done" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/Update%20Note%207.png" alt="Update Note" title="Update Note" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/Saving%20second%20note%208.png" alt="Saving Second Note" title="Saving Second Note" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/note%20saved%209.png" alt="Note Saved Again" title="Note Saved Again" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/Search%20working%2010.png" alt="Search Working" title="Search Working" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/about%2011.png" alt="About" title="About" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/profile%2012.png" alt="Profile" title="Profile" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/updating%20profile%2013.png" alt="Updating Profile" title="Updating Profile" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/profile%20udated%2014.png" alt="Profile Updated" title="Profile Updated" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/admin%2016.png" alt="Admin" title="Admin" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/deleting%20user%2017.png" alt="Deleting User" title="Deleting User" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/user%20deleted%2018.png" alt="User Deleted" title="User Deleted" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/404%2019.png" alt="404 Error" title="404 Error" width="1200" height="550"></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/SanskarJaiswal2904/To-DO-Pal-new/master/src/Screenshot/403%2020.png" alt="403 Error" title="403 Error" width="1200" height="550"></td>
  </tr>
</table>






## Features
- Task management with the ability to create, update, and delete tasks.  
- Mark tasks as completed or not completed.  
- User profile customization.  
- Admin panel to monitor and track user activities.  

## Technologies Used  
- Vue.js for the frontend user interface.  
- Flask for the backend server.  
- MongoDB for database management.  
- Axios for handling API requests.  

## Installation  
1. Clone this repository to your local machine.  
2. Install the required dependencies for both frontend and backend using `npm install` and `pip install`.  
3. Set up a MongoDB database and update the configuration.  
4. Run the Flask server and Vue development server to start the application.
5. If you try to visit the '/' page without logging in you would be redirected to SignIn page.
6. If you are not an admin and try to access the '/admin' page you would be redirected to "403 Forbidden" Page.

## Usage  
- Sign up or log in to manage your tasks.  
- Add, update, and mark tasks as done or not done.  
- Customize your user profile for a personalized experience.  
- Admin users can access the admin dashboard to oversee app activities.  

## Credits  
This project was developed by [Sanskar](https://sanskarjaiswal2904.github.io/Sanskar-Website/).    
