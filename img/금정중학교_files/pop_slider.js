var popup_autoSlide = true;
var popup_timeAct   = null;
var popup_slideMax  = 0;
var popup_wait      = 3000;

var popup_break     = false;
var popup_timeBrk   = null;

var popup_width     = 480;

function popup_init() {
    if(popup_slideMax < 1) return;

    popup_location(0);

	setTimeout('popup_start()', popup_wait);
}

/* 팝업이 한개일때 재생 방지 */
function popup_start() {
	if (popup_slideMax == 1) {
		popup_autoSlide = false;
	} else {
		popup_timeAct = setInterval("popup_slideShow()", 10);
	}
}

function popup_location(pos) {
    var xleft = 0;

    for(i=0; i<popup_slideMax; i++) {
        document.getElementById('showPop_' + pos).style.position = 'absolute';
        document.getElementById('showPop_' + pos).style.left     = xleft + 'px';
        document.getElementById('showPop_' + pos).style.top      = '0px';
        document.getElementById('showPop_' + pos).style.display  = '';

        pos++;
        if(pos > popup_slideMax - 1) pos = 0;

        xleft += popup_width;
        if(xleft > popup_width * (popup_slideMax - 1) - 1) xleft = -(popup_width);
    }
}


function popup_slideShow() {
    if(popup_autoSlide) {
        for(i=0; i<popup_slideMax; i++) {
            currLeft = parseInt(document.getElementById('showPop_' + i).style.left, 10);
            
            compLeft = currLeft - 10;  
            
            /* if(i == popup_currpos()) alert(currLeft); */

            if(compLeft <= -(popup_width * 2)) compLeft = (popup_slideMax - 2) * popup_width;

            document.getElementById('showPop_' + i).style.left = compLeft + 'px';
        }

        if(parseInt(document.getElementById('showPop_0').style.left, 10) % popup_width == 0) {
            popup_autoSlide = false;
            clearTimeout(popup_timeBrk);
            popup_timeBrk = setTimeout("popup_slideStart()", popup_wait);
        }
    }
}

function popup_currpos() {
    for(var i=0; i<popup_slideMax; i++) {
        xleft = parseInt(document.getElementById('showPop_' + i).style.left);

        if(xleft >= 0 && xleft < popup_width) return i;
    }
}


function popup_prev() {
    popup_slideStop();

    var currpos = popup_currpos();
    currpos--;

    if(currpos < 0) currpos = popup_slideMax - 1;

    popup_location(currpos);
}

function popup_next() {
    popup_slideStop();

    var currpos = popup_currpos();
    currpos++;

    if(currpos > popup_slideMax - 1) currpos = 0;

    popup_location(currpos);
}


function popup_slideStart() {
    popup_autoSlide = true;

    if(document.getElementById("playbtn")) document.getElementById("playbtn").style.display = "none";
    if(document.getElementById("stopbtn")) document.getElementById("stopbtn").style.display = "";
}

function popup_slideStop() {
    clearTimeout(popup_timeBrk);
    popup_autoSlide = false;

    if(document.getElementById("playbtn")) document.getElementById("playbtn").style.display = "";
    if(document.getElementById("stopbtn")) document.getElementById("stopbtn").style.display = "none";
}

function popup_imgOver() {
    popup_slideStop();
}

function popup_imgOut() {
    popup_slideStart();
}


function popup_change() {
    popup_slideStop();

    if(document.getElementById("AlimDataList").style.display=='') {
        document.getElementById("AlimDataList").style.display = 'none';
        document.getElementById("AlimDataImage").style.display = '';

        popup_slideStart();
    } else {
        document.getElementById("AlimDataList").style.display = '';
        document.getElementById("AlimDataImage").style.display = 'none';
    }
}



function popup_link() {
	window.open('./?master=popup&act=pop_list','new3','width=840,height=840,scrollbars=yes,top=10,left=420');
}

if (window.addEventListener) {
    window.addEventListener("load", popup_init, false);

} else if (window.attachEvent) {
    window.attachEvent("onload", popup_init);

} else if (document.getElementById) {
    window.onload = popup_init;
}
