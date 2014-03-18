var cursor = 0;

function inputMethod(iMethod)
{
	if(iMethod === "type")
	{
		//display type stuff
	}
	else if(iMethod === "draw")
	{
		//display draw stuff
	}
	else
	{
		alert("what the heck is happening");
	}
}

function key_detect_calc(event)
{
    if((event.keyCode > 47) && (event.keyCode < 58))
    {
        var num = event.keyCode - 48;
        numinput(num);
    }
}

function reset()
{
    cursor = 0;
}

function numinput(num)
{
    if(num < 0)
    {
        alert("what the heck is happening");
    }
    
    if(num === pi.substring(cursor, cursor+1))
    {
        cursor++;
    }
    else
    {
        alert("Dang. You should have typed " + pi.substring(cursor, cursor+1) + ". Start over!");
        reset();
    }
}

// going to use https://github.com/antimatter15/ocrad.js for OCR stuff
