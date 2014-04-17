var cursor = 0;
var method = "none";

function inputMethod(iMethod)
{
    document.getElementById("opening").style.display = "none";
    if(iMethod === "study")
    {
        document.getElementById("studying").style.display = "block";
    }
    else if(iMethod === "type")
    {
        document.getElementById("typing").style.display = "block";
        method = "type";
        document.onkeydown = function(event)
        {
            if((event.keyCode > 47) && (event.keyCode < 58))
            {
                var num = event.keyCode - 48;
                numinput(num.toString());
            }
            else
                console.log("Someone didn't type a number. Idiot.");
        };
    }
    else if(iMethod === "draw")
    {
        document.getElementById("drawing").style.display = "block";
        OCRImage();
    }
    else if(iMethod === "speak")
    {
        document.getElementById("speaking").style.display = "block";

    }
    else
    {
        alert("what the heck is happening");
    }
}

function goback()
{
    reset();
    document.getElementById("studying").style.display = "none";
    document.getElementById("typing").style.display = "none";
    document.getElementById("drawing").style.display = "none";
    document.getElementById("speaking").style.display = "none";
    document.getElementById("opening").style.display = "block";
}

function showDigits(num)
{
    document.getElementById("nums").innerHTML += pi.substring(cursor, cursor + num);
    cursor = cursor + num;
    document.getElementById("shownum").innerHTML = cursor;
}

function reset()
{
    cursor = 0;
    document.getElementById("resultat").value = "3.";
}

function numinput(num)
{
    if(method === "type")
    {
        document.getElementById("resultat").value = document.getElementById("resultat").value + num;
        if(document.getElementById("resultat").value.length > 7)
        {
            document.getElementById("resultat").value = document.getElementById("resultat").value.substring(1);
        }
    }

    if(method === "speak")
    {
        document.getElementById("speakresult").value = document.getElementById("speakresult").value + num;
        if(document.getElementById("speakresult").value.length > 7)
        {
            document.getElementById("speakresult").value = document.getElementById("speakresult").value.substring(1);
        }
    }

    if(num < 0)
    {
        alert("what the heck is happening");
    }

    if(num === pi.substring(cursor, cursor + 1))
    {
        cursor++;
    }
    else
    {
        alert("Dang. The next part is actually " + pi.substring(cursor, cursor + 9) + ". Start over!");
        reset();
    }
}

// using drawing algorithm from Stack Overflow http://stackoverflow.com/questions/2368784/draw-by-mouse-with-html5-canvas
var canvas, ctx, flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, dot_flag = false;
function OCRImage()
{
    canvas = document.getElementById('drawCanvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function(e)
    {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function(e)
    {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function(e)
    {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function(e)
    {
        findxy('out', e)
    }, false);

    //return OCRAD(c);
}

function draw()
{
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

function findxy(res, e)
{
    if(res == 'down')
    {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if(dot_flag)
        {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if(res == 'up' || res == "out")
    {
        flag = false;
    }
    if(res == 'move')
    {
        if(flag)
        {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

// going to use https://github.com/antimatter15/ocrad.js for OCR stuff

function startVoice()
{

    if(!('webkitSpeechRecognition' in window))
    {
        // Recommend browser upgrade
        alert("Your browser doesns't allow for recording. Try upgrading it!");
    }

    var rec = new webkitSpeechRecognition();
    // Continuous listening, we don't want to let the user pause
    rec.continuous = true;
    recognition.interimResults = true;
    // we want results on the go
    rec.start();

    rec.onresult = function(e)
    {
        var interim_transcript = '';
        for(var i = e.resultIndex; i < e.results.length; ++i)
        {
            //if(e.results[i].isFinal) {}

            interim_transcript += e.results[i][0].transcript;
            // set field here and check for correctness
            translateNum(interim_transcript);
        }
    };
}

/*

 The event object returned contains the following data:

 results[i] – an array containing recognition result objects. Each array element corresponds to a recognised word
 resultIndex – this is the current recognition result index
 results[i].isFinal – a Boolean that indicates if the the result is final or interim (interim results can be asked for via the interimResults attribute)
 results[i][j] – a 2D array containing alternative recognised words. The first element is the most probable recognised word
 results[i][j].transcript – the text representation of the recognised word(s)
 results[i][j].confidence – the probability of the result given as being correct (float value from 0 to 1)

 */

function translateNum(result)
{
    switch(n)
    {
        case "one":
            numinput(1);
            break;
        case "two":
            numinput(2);
            break;
        case "three":
            numinput(3);
            break;
        case "four":
            numinput(4);
            break;
        case "five":
            numinput(5);
            break;
        case "six":
            numinput(6);
            break;
        case "seven":
            numinput(7);
            break;
        case "eight":
            numinput(8);
            break;
        case "nine":
            numinput(9);
            break;
        case "zero":
            numinput(0);
            break;
        default:
        //repeat that, idiot
    }
}
