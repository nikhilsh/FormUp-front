//FOR JAVASCRIPT DEMONSTRATION PURPUSES ONLY, NEVER DISCLOSE YOUR KEYS TO THIRD PARTIES!
'use strict';

var client_id = 'b8117ce78fac41789788f6187b01e9b3';

var app_key = 'd0be41358ae54a11b1e3e56fb00f2988';

var ajaxRequest = new XMLHttpRequest();

var shouldSendRequest = true;

var requestInterval;

function success(result) {

  if (result.persons.length > 0) {
    var age = result.persons[0].age.value;
    var gender = result.persons[0].gender.value;
    var mood = result.persons[0].mood.value;

    var expressions = {};
    for (var exp in result.persons[0].expressions) {
      expressions[exp] = result.persons[0].expressions[exp].value;
    }

    // return {
    //   age: age,
    //   gender: gender,
    //   mood: mood,
    //   expressions: expressions
    // }
  }
}

function failure(error) {}

function sendDetectRequest() {
  var img = document.querySelector("#img_snapshot");
  if (img.naturalWidth == 0 || img.naturalHeight == 0) {
    console.log('no pic taken');
    return;
  } // Check if a snapshot has been taken
  console.log('sending request');
  var imgBlob = FACE.util.dataURItoBlob(img.src);
  FACE.sendImage(imgBlob, success, failure, app_key, client_id, 'age,gender,mood,expressions');
}

function startCapture() {
  FACE.webcam.startPlaying("webcam_preview");
  setTimeout(function () {
    FACE.webcam.takePicture("webcam_preview", "img_snapshot");
    sendDetectRequest();
  }, 5000);
}

// Trigger the start
$(document).ready(function () {
  if (client_id == '') {
    alert('Please specify your keys in the source');
  } else {
    startCapture();
  }
});