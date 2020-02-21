import firebase from "firebase/app";
import "firebase/firestore";

const settings = {};

const config = {
  apiKey: "AIzaSyD5UES7EZasdpJ_-stJ8GFWKthA2IlSi5M",
  databaseURL: "https://getyourbadge-6ca0c.firebaseio.com/",
  projectId: "getyourbadge-6ca0c"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings(settings);

export default firebaseApp.firestore();
