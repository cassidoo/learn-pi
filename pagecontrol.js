var cursor = 0;

function inputMethod(iMethod)
{
    document.getElementById("opening").style.display = "none";
    if(iMethod === "type")
    {
        document.getElementById("typing").style.display = "block";

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
        document.getElementById("drawing").style.display = "block";
    }
    else
    {
        alert("what the heck is happening");
    }
}

function reset()
{
    cursor = 0;
    document.getElementById("resultat").value = "3.";
}

function numinput(num)
{
    document.getElementById("resultat").value = document.getElementById("resultat").value + num;
    if(document.getElementById("resultat").value.length > 7)
    {
        document.getElementById("resultat").value = document.getElementById("resultat").value.substring(1);
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
