<h1 align="center">Tick Talk</h1>


<div align="center">
  <h3>
    <a href="https://tick-talk.herokuapp.com">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/iamxxx777/tick-talk">
      Solution
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](https://res.cloudinary.com/iamxxx777/image/upload/v1638619390/Chatter_Box_yq3ek6.png)


### Built With

This chat application is built with a react front-end and an express backend. The real-time chat processing is powered by Socket.io which provides seemless exchange of information between users. The authentication is handled by firebase and the users information is stored in a mongoDb atlas, along with the messages and channels.

This app allows users to login with their facebook, google or github account and it also allows for the traditional email and password signup. Users are added to the welcome channel when they sign up, users can proceed to create a new channel or join the existing channels.


<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [React](https://reactjs.org/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://mongodb.com/)
- [Express](https://expressjs.com/)
- [cloudinary](https://cloudinary.com/)
- [Firebase](https://firebase.google.com/)

## Features

- Users on successful login are routed to the Welcome channel
- Users can create a new channel with a name and a description
- Users can select a channel of their choice
- When a user selects a channel, They are added as a member of the channel
- Users can see a member of the channel
- Users can send a message
- Users can see other people's messages

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/iamxxx777/Tick-Talk

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Acknowledgements

- [Socket.io docs](https://socket.io/docs/v4/client-initialization/)
- [Node.js](https://nodejs.org/)

## Contact

- GitHub [@iamxxx777](https://github.com/iamxxx777)
- Twitter [@dayo_hope](https://twitter.com/dayo_hope)
