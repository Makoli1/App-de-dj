scoreleftWrist=0;
scorerightWrist=0;
song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    song=loadSound("shape_of_you_best.mp3");
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function draw(){
    image(video,0,0,400,400);
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreleftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        numberleftWristY=Number(leftWristY);
        leftWristredondeado=floor(numberleftWristY);
        volumen=leftWristredondeado/400;
        document.getElementById("volumen").innerHTML="Volumen " + volumen;
        song.setVolume(volumen);
    }
    if (scorerightWrist>0.2){
        circle(rightWristY,rightWristY,20);
        if(rightWristY>0 && rightWristY<=80){
            document.getElementById("velocidad").innerHTML="velocidad=0.5 ";
            song.rate(0.5);
        }
        else if(rightWristY>80 && rightWristY<=160){
            document.getElementById("velocidad").innerHTML="velocidad=1";
            song.rate(1);
        }

        else if(rightWristY>160 && rightWristY<=240){
            document.getElementById("velocidad").innerHTML="velocidad=1.5";
            song.rate(1.5);
        }

        else if(rightWristY>240 && rightWristY<=320){
            document.getElementById("velocidad").innerHTML="velocidad=2";
            song.rate(2);
        }

        else if(rightWristY>320 && rightWristY<=400){
            document.getElementById("velocidad").innerHTML="velocidad=2.5";
            song.rate(2.5);
        }
    }
    
    

}

function Reproducir(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("PoseNet inicializado")
}

function gotPoses (results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("la mano izq en x " + leftWristX + "la mano izq en y " + leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("la mano derecha en x " + rightWristX + " la mano derecha en y " + rightWristY);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("score left= " + scoreleftWrist);
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("score right= " + scorerightWrist);
}
}