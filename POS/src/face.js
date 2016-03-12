//FOR JAVASCRIPT DEMONSTRATION PURPUSES ONLY, NEVER DISCLOSE YOUR KEYS TO THIRD PARTIES!
'use strict'
var client_id = 'b8117ce78fac41789788f6187b01e9b3';

var app_key   = 'd0be41358ae54a11b1e3e56fb00f2988';

var ajaxRequest = new XMLHttpRequest();

var shouldSendRequest = true;

var requestInterval;
var age = 0;
var count = 0;
var gender = [0,0];
var mood = [0,0];
var expressions = {};
function success( result ) {
  if( result.persons.length > 0 ) {
    age = ((age * count) + result.persons[0].age.value)/(count+1);
    count += 1;
    if (gender[1] < result.persons[0].gender.confidence) {
      gender    = [result.persons[0].gender.value, result.persons[0].gender.confidence];
    } 
    if (mood[1] < result.persons[0].mood.confidence) {
          mood       = [result.persons[0].mood.value, result.persons[0].mood.confidence];
    }
    for (let exp in result.persons[0].expressions) {
      expressions[exp] = result.persons[0].expressions[exp].value
    }

    // console.log("snapshot age :" + result.persons[0].age.value);
    // console.log("average age :" +  age + "count: " + count);
  };
}

function getData() {
  var data =  {
    "mood" : mood[1] > 50 ? 1 : 0,
    "gender" : gender[0],
    "age" : age,
    "expression" : expressions
  };
  console.log(JSON.stringify(data));
}

function failure( error ) {}

function sendDetectRequest() {
  var img = document.querySelector( "#img_snapshot" );
  if( img.naturalWidth == 0 ||  img.naturalHeight == 0 ) {
    console.log('no pic taken')
    return;
  } // Check if a snapshot has been taken
  console.log('sending request')
  var imgBlob = FACE.util.dataURItoBlob( img.src );
  FACE.sendImage( imgBlob, success, failure, app_key, client_id, 'age,gender,mood,expressions' );
}

function startCapture() {
  // FACE.webcam.startPlaying( "webcam_preview" );
  setTimeout( function () {
    FACE.webcam.takePicture( "webcam_preview", "img_snapshot" );
    sendDetectRequest();
  }, 4000);
}

// Trigger the start
$( document ).ready( function() {
  if( client_id =='' ) {
    alert( 'Please specify your keys in the source' );
  } else {
    FACE.webcam.startPlaying( "webcam_preview" );
    setInterval(function(){ 
      startCapture();
    }, 4000);
  }
});
