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
Carousel,
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
// Welcome the user
  	conv.ask( 'Hey!!!! Welcome to Shreyans resume. What do you want to know?');
// Give suggestions to the user
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects'));
  });


// Handle the Dialogflow intent named 'About'.
// The intent collects a parameter named 'about'.
app.intent('About', (conv, {about}) => {

	conv.ask('I am ambitious and driven. I thrive on challenge and constantly set goals for myself, so I have something to strive towards. I’m not comfortable with settling, and I’m always looking for an opportunity to do better. ')
    const i="profile";

    // conv.ask(`Here's the image`, new BasicCard(profileMap[i]));

    conv.ask(new BasicCard(profileMap[i]));
    
conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects')); 
});


app.intent('Skills',(conv, {skills})=>{
	conv.ask("I am a Web Developer");
	conv.ask("On the technical front, i have good command over the following programming languages C, C++, Java, Python, Java, HTML 5, CSS and JavaScript");
	
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects'));
});

app.intent('Qualifications',(conv, {qualifications})=>{
	conv.ask("Chandigarh University, Chandigarh - BE-CSE");
	conv.ask("Andhra English School, Jamshedpur - Senior Secondary DBMS English School, Jamshedpur - Secondary");

	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects'));

});
	  const projectInformationCarousel = () => {
	  const carousel = new Carousel({
	   items: {
	     'github repository': {
	       title: 'Github repository',
	       synonyms: ['github', 'repository'],
	       image: new Image({
	         url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDN1JRbF9ZMHZsa1k/style-color-uiapplication-palette1.png',
	         alt: 'Open Sources Contibutions',
	       }),
	     },
	     'blue grey coffee': {
       title: 'Blue Grey Coffee',
       synonyms: ['blue', 'grey', 'coffee'],
       image: new Image({
         url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDZUdpeURtaTUwLUk/style-color-colorsystem-gray-secondary-161116.png',
         alt: 'Blue Grey Coffee Color',
       }),
     },
	 }});
	 return carousel;
	};

app.intent('Projects',(conv, {project})=>{
	conv.ask("I love programming and also contribute to open source");
	if (conv.screen) 
		return conv.ask(projectInformationCarousel());

	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects'));

});
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);