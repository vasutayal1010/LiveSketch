<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">LiveSketch Web Application</h3>

  <p align="center">
        An Real Time browser collaborative whiteboard application.
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technolgy-used">Technologies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#database-design">Database Design</a></li>
    <li><a href="#future-enhancements">Future Enhancements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
 Developed a collaborative web application utilizing the MERN stack (MongoDB, Express.js, React, and Node.js). The
 platform allows multiple users to sketch various objects on a shared whiteboard, including squares, circles, lines, and text. It
 supports real-time collaboration and includes role-based access controls to manage user permissions effectively. This project
 demonstrates proficiency in full-stack development, real-time communication technologies, and secure access management.

<p align="right">(<a href="#top">back to top</a>)</p>



### Technolgy Used

The following technologies and tools have been equipped to develop this project -

* MERN: MongoDB, Express, ReactJS, Node JS
* SocketIO
* Rough JS

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- Features -->
## Features

- **Authentication & Authorization:** Registration and login are required with proper validation to access the boards and features.
- **Multiple Whiteboards:** Users can create and manage more than one whiteboard, and share them with other users.
- **Role-Based Access:** Access to each board is role-based, enabling specific features for users based on their roles.
- **Multiple Drawing Tools:** The whiteboard supports various shapes and tools, including rectangles, circles, text, and pencils.
- **Real-Time Collaboration:** All activity on the whiteboard canvas is updated in real-time for all members viewing the board, using Socket.IO events.
- **Export Options:** Users can export the whiteboard content as an image or PDF.

<p align="right">(<a href="#top">back to top</a>)</p>



## Screenshots

### 🏠 Home Page
<p align="center">
  <img src="frontend\screenshots\HomePage.png" alt="Home Page" width="700"/>
</p>

### 🔑 Register Page
<p align="center">
  <img src="frontend\screenshots\RegisterPage.png" alt="Register Page" width="700"/>
</p>

### 📝 Login Page
<p align="center">
  <img src="frontend\screenshots\LoginPage.png" alt="Login Page" width="700"/>
</p>

### 📝 CreateBoard Page
<p align="center">
  <img src="frontend\screenshots\CreateBoard.png" alt="CreateBoard Page" width="700"/>
</p>


### 📝 WhiteBoardsPage Page
<p align="center">
  <img src="frontend\screenshots\WhiteBoardsPage.png" alt="WhiteBoardsPage Page" width="700"/>
</p>

### 📝 Rough Canvas Page
<p align="center">
  <img src="frontend\screenshots\WhiteBoard-1.png" alt="Rough Canvas" width="700"/>
</p>

### 📝 RealTime Collaboration 
<p align="center">
  <img src="frontend\screenshots\WhiteBoard-3.png" alt="RealTine Collaboration Page" width="700"/>
</p>

### 📝 Protected Routes 
<p align="center">
  <img src="frontend\screenshots\ProtectedRoutes.png" alt="Protected Routes Page" width="700"/>
</p>

<!-- Database design -->
## Database Design
database for CoSketch having below 3 documents and its respective structure mentioned below,

- Users
```json
{
	"_id": {
		"$oid": "661be3fab29b01e73b199d14"
	},
	"email": "veet2@gmail.com",
	"username": "veet2124",
	"password": "$2b$12$lNXnUpFuIyR42ZyxlQj9NOHqAGVMjlAE3gNjcqTQGwGLEdZYTVUk.",
	"firstName": "Veet",
	"role": "ADMIN",
	"lastName": "Moradiya",
	"createdAt": {
		"$date": {
			"$numberLong": "1713103843726"
		}
	},
}
```

- boards
```json
{
	"_id": {
		"$oid": "663763bf42ff898ab7b92989"
	},
	"boardTitle": "Test Board Members API",
	"boardDescription": "Test Board created via API with members",
	"members": [ // array of members with role
		{
			"memberId": {
				"$oid": "661bf4e5d6b91517e3136997"
			},
			"memberRole": "OWNER",
			"lastAccessedAt": null,
			"_id": {
				"$oid": "663763bf42ff898ab7b9298a"
			}
		},
	],
	"createdAt": {
		"$date": {
			"$numberLong": "1714906047611"
		}
	},
	"updatedAt": {
		"$date": {
			"$numberLong": "1714906047611"
		}
	}
}
```

- boardcontents
```json
{
	"_id": {
		"$oid": "663a551d81b106ac6e38ea45"
	},
	"boardId": {
		"$oid": "6626a1062377ee6823c8a12d"
	},
	"boardElements": [] // array of board elements
}
```

<p align="right">(<a href="#top">back to top</a>)</p>


## Future Enhancements

<ul>
    <li>More options for board menu</li>
    <li>Logging in backend application with log file.
</li>
    <li>Dockerize front end and backend application with DockerFile and simulate deployment using docker based deployment
</li>
</ul>

<p align="right">(<a href="#top">back to top</a>)</p>

