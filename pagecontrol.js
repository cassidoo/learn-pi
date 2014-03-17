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

function numinput(num)
{
    
}

// going to use https://github.com/antimatter15/ocrad.js for OCR stuff
