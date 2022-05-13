prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    img_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("camera");

function take_snapshot() {
    Webcam.snap(function (data_url) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_url + '" />';
    })
}

console.log("ml5 Varision : " + ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LtHrWY4cY/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model is Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The First prediction is " + prediction_1;
    speak_data2 = "and the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function start_identification() {
    var img = document.getElementById("captured_image");
    console.log("Identification Started");
    classifier.classify(img, gotResult);
    console.log("Identification Done");
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (prediction_1 == "Angry") {
            document.getElementById("emoji_name").innerHTML = "&#128545;";
        }
        if (prediction_1 == "Happy") {
            document.getElementById("emoji_name").innerHTML = "&#128512;";
        }
        if (prediction_1 == "Sad") {
            document.getElementById("emoji_name").innerHTML = "&#128532;";
        }


        if (prediction_2 == "Angry") {
            document.getElementById("emoji_name2").innerHTML = "&#128545;";
        }
        if (prediction_2 == "Happy") {
            document.getElementById("emoji_name2").innerHTML = "&#128512;";
        }
        if (prediction_2 == "Sad") {
            document.getElementById("emoji_name2").innerHTML = "&#128532;";
        }
    
    }
}




 