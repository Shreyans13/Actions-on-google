
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

// Define a mapping of profile Map strings to basic card objects.
const profileMap = {
  'profile': {
    title: 'Shreyans Jain',
    text: 'Hi!! I am Shreyans',
    image: {
      url: 'https://raw.githubusercontent.com/Shreyans13/Actions-on-google/master/cv-draft-1/resources/profileImage.jpeg',
      accessibilityText: 'Profile Image',
    },
    display: 'WHITE',
  },
};
// Define a mapping of contact Map strings to basic card objects.
const contactMap = {
  'contactProfile': {
    title: 'Contact Information',
    text: 'Shreyans Jain  \nEmail:- Shreyans1313@gmail.com',
    image: {
      url: 'https://raw.githubusercontent.com/Shreyans13/Actions-on-google/master/cv-draft-1/resources/profileImage.jpeg',
      accessibilityText: 'contact image',
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
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));
  });


// Handle the Dialogflow intent named 'About'.
// The intent collects a parameter named 'about'.
app.intent('About', (conv, {about}) => {

	conv.ask('I am Shreyans Jain, a student of Chandigarh University pursuing BE-CSE. ')
    const i="profile";

    conv.ask(new BasicCard(profileMap[i]));
    
conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit')); 
});

// Handle the Dialogflow intent named 'Skills'.
// The intent collects a parameter named 'skills'.
app.intent('Skills',(conv, {skills})=>{
	conv.ask("I am a Web Developer \nOn the technical front, I have good command over the various programming languages like \nJava, \nHTML 5, \nCSS and \nJavaScript");
	
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));
});

// Handle the Dialogflow intent named 'Quaifications'.
// The intent collects a parameter named 'qualifications'.
app.intent('Qualifications',(conv, {qualifications})=>{
	conv.ask("BE-CSE Chandigarh University \nSenior Secondary School Andhra English School \nSecondary School DBMS English School, ");

	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));

});
// Define a Carousel of projectInformation strings to basic card objects.
  const projectInformationCarousel = () => {
  const carousel = new Carousel({
   items: {
     'github repository': {
       title: 'Github repository',
       synonyms: ['github', 'repository'],
       image: new Image({
         url: 'https://raw.githubusercontent.com/Shreyans13/Actions-on-google/master/cv-draft-1/resources/images.jpeg',
         alt: 'Open Sources Contibutions',
       }),
     },
     'actions on google': {
   	   title: 'Actions on google[Resume]',
       synonyms: ['actions', 'google', 'resumae'],
       image: new Image({
         url: 'https://raw.githubusercontent.com/Shreyans13/Actions-on-google/master/cv-draft-1/resources/actionsOnGoogle.jpeg',
         alt: 'Actions on google[Resume]',
       }),
     },
 }});
 return carousel;
};

// Handle the Dialogflow intent named 'Projects'.
// The intent collects a parameter named 'project'.
app.intent('Projects',(conv, {project})=>{
	conv.ask("I love programming and also contribute to open source. Here are my projects");
	
	if (conv.screen) {
		 conv.ask(projectInformationCarousel());
	}
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));

});

// Handle the Dialogflow intent named 'Contact'.
// The intent collects a parameter named 'contact'.
app.intent('Contact',(conv, {contact})=>{
	const y="contactProfile";
conv.ask("Here's my contact info",new BasicCard(contactMap[y]));
	
	conv.ask(new Suggestions('About', 'Skills', 'Qualifications','Projects','Contact','Exit'));
});
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);