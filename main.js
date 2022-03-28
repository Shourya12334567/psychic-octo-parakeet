video = "";
status = "";
objects = [];

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(450, 350);
    canvas.center();
}

function gotResults(error, results)
{
    if(error) 
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 450, 350);
     
    if(status != "")
    {
        object.detect(video, gotResults);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: objects detected";
            document.getElementById("objects").innerHTML = "Number of objects detected are "+ objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 20 , objects[i].y + 20);
            noFill();
            stroke("#FF0000");
            rect(ibjects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
  
}

function start()
{
    object = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);    
}

