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

function OCRImage()
{
    // example I'll work with from https://github.com/antimatter15/ocrad.js/blob/master/demo.html
    var c = document.getElementById("drawCanvas");
    var o = c.getContext('2d');
    var drag = false, lastX, lastY;

    c.onmousedown = function(e)
    {
        drag = true;
        lastX = 0;
        lastY = 0;
        e.preventDefault();
        c.onmousemove(e);
    };

    c.onmouseup = function(e)
    {
        drag = false;
        e.preventDefault();
        runOCR();
    };

    c.onmousemove = function(e)
    {
        e.preventDefault();
        var rect = c.getBoundingClientRect();
        var r = 5;

        function dot(x, y)
        {
            o.beginPath();
            o.moveTo(x + r, y);
            o.arc(x, y, r, 0, Math.PI * 2);
            o.fill();
        }

        if(drag)
        {
            var x = e.clientX - rect.left, y = e.clientY - rect.top;

            if(lastX && lastY)
            {
                var dx = x - lastX, dy = y - lastY;
                var d = Math.sqrt(dx * dx + dy * dy);
                for(var i = 1; i < d; i += 2)
                {
                    dot(lastX + dx / d * i, lastY + dy / d * i);
                }
            }
            dot(x, y);

            lastX = x;
            lastY = y;
        }
    };

    return OCRAD(c);
}

// going to use https://github.com/antimatter15/ocrad.js for OCR stuff

function startVoice()
{
    var rec = new webkitSpeechRecognition();
    // Continuous listening, we don't want to let the user pause
    rec.continuous = true;

    rec.start();

    rec.onresult = function(e)
    {
        for(var i = e.resultIndex; i < e.results.length; ++i)
        {
            if(e.results[i].isFinal)
            {
            }
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
