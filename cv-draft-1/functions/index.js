// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {
dialogflow,
Image,
BasicCard,
Suggestions,
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Define a mapping of fake color strings to basic card objects.
const profileMap = {
  'profile': {
    title: 'Image',
    text: 'Hi!! i am Shreyans',
    image: {
      url: 'https://avatars2.githubusercontent.com/u/50544190?s=460&v=4',
      accessibilityText: 'Profile Image',
    },
    display: 'WHITE',
  },
};

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});
app.intent('Default Welcome Intent', (conv) => {
  // Asks the user's permission to know their name, for personalization.
  conv.ask( 'Hey!!!! Welcome to Shreyans resume. What do you want to know?');

conv.ask(new Suggestions('About', 'Skills', 'Education','Projects'));
  });


// Handle the Dialogflow intent named 'About'.
// The intent collects a parameter named 'about'.
app.intent('About', (conv, {about}) => {

    conv.ask('Baaiis tak padhai, pachees pe naukri, chabbish pe chokri, thees pe bachche, saaath pe retirement ....... aur phir mauth ka intezaar ....... dhat aai si ghisi piti life thodi jeena chahta hoon mae');


    const i="profile";

    // conv.ask(`i is, ${i}?`);

    conv.ask(`Here's the image`, new BasicCard(profileMap[i]));
    
conv.ask(new Suggestions('About', 'Skills', 'Education','Projects')); 
});


app.intent('Skills',(conv, {skills})=>{
	conv.ask("Ring-ding-ding-ding-ding-and-ding-a-wah-a-pah-pah-pah-pah or so I’ve heard.");
	conv.ask(new Suggestions('About', 'Skills', 'Education','Projects'));
});

app.intent('Education',(conv, {education})=>{
	conv.ask("No way! I like people. Skynet hates people. I rest my case.");

conv.ask(new Suggestions('About', 'Skills', 'Education','Projects'));

});

app.intent('Projects',(conv, {project})=>{
	conv.ask("Rajneeti mein kuch sach nahi hota ... yehi iss-kaah sach hai");

	conv.ask(new Suggestions('About', 'Skills', 'Education','Projects'));

});
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);