//-----------------------------------------------------------------------------
// CSS 토글 기능
//-----------------------------------------------------------------------------
var Toggle_EnableCSS = false;

function Action_Enable_CSS() {
    if(!Toggle_EnableCSS) {
        for(i=0;i<document.styleSheets.length;i++) {
            void(document.styleSheets.item(i).disabled=true);
        }
    } else {
        for(i=0;i<document.styleSheets.length;i++) {
            void(document.styleSheets.item(i).disabled=false);
        }
    }

    Toggle_EnableCSS = !Toggle_EnableCSS;
}


//-----------------------------------------------------------------------------
// 도움말 표현 기능
//-----------------------------------------------------------------------------
function Action_View_HELP() {
    var win = open("", "", "");
    win.focus();
}


//-----------------------------------------------------------------------------
// 키보드 이벤트를 처리한다. : 브라우저에 맞추기
//-----------------------------------------------------------------------------
if (window.addEventListener)      window.addEventListener("load", Action_Window_KeyUp_FF, false); // FF
else if (window.attachEvent)      window.attachEvent("onload", Action_Window_KeyUp_IE);           // IE6 Up
else if (document.getElementById) window.onload = Action_Window_KeyUp_XX;


function Action_Window_KeyUp_FF() {
    window.addEventListener("keyup", function(e) { Action_Window_KeyUp(e.which); }, false);
}

function Action_Window_KeyUp_IE() {
    window.document.attachEvent("onkeyup", function() { Action_Window_KeyUp(window.event.keyCode); } );
}

function Action_Window_KeyUp_XX() {
}

function Action_Window_KeyUp(key) {
    switch(key) {
        case 120 : // F12 의 기능은 CSS 를 없애는 것이다.
            Action_Enable_CSS();
            break;

        case 112 : // F1 의 기능은 도움말을 보여주는 것이다.
            break;

        default :
            break;
    }
}




//-----------------------------------------------------------------------------
// top menu 선택
//-----------------------------------------------------------------------------
function Action_TopMenu_Select(sel) {
    var objDiv = null;
    var selDiv = parseInt(sel, 10);

    for(i=1; i<=10; i++) {
        objDiv = document.getElementById('topSubMenu_' + ('0' + i).substr(('0' + i).length-2));

        if(objDiv) {
            if(i==selDiv) objDiv.style.display = '';
            else          objDiv.style.display = 'none';
        }
    }
}


//-----------------------------------------------------------------------------
// link.js 에서 가져온거
//-----------------------------------------------------------------------------
function Action_BBS_Toggle(id, cnt, sel) { for(i=0; i<cnt; i++) document.getElementById(id + i).style.display = (i==sel ? "" : "none"); } 
function Action_BBS_View(menugrp, master_sid, sid) { location.href = "?menugrp=" + menugrp + "&master=bbs&act=view&master_sid=" + master_sid + "&sid=" + sid; } 
 

// 상단 메뉴를 토글시키는 기능 
function Action_TopSubMenuToggle(menuNum) { 
    var topMenu    = document.getElementById('topMenu'); 
    var topSubMenu = document.getElementById('topSubMenu'); 

    for(i=0; i<topSubMenu.childNodes.length; i++) { 
        if(i == menuNum) {
            document.getElementById('menuTop_' + i).src = document.getElementById('menuTop_' + i).src.replace('head_btn_off', 'head_btn_on');
            topSubMenu.childNodes[i].style.display = ''; 
        } else {
            document.getElementById('menuTop_' + i).src = document.getElementById('menuTop_' + i).src.replace('head_btn_on', 'head_btn_off');
            topSubMenu.childNodes[i].style.display = 'none'; 
        }
    } 
} 
 
 
// 학급홈창을 활성화 시키는 기능 
function Action_ClassHome(classhome_sid) { 
    var win = open("/?master=classhome&subpg=main&act=index&classhome_sid=" + classhome_sid, "POP_CLASSHOME_" + classhome_sid, "top=20 left=20 width=1000 height=600 scrollbars=no"); 
    win.focus(); 
} 
 

// 상단 메뉴를 토글시키는 기능 
function Action_Toggle_TopSubMenu(grp1, grp2) { 
    var menuTopSubImg, strnum;

    for(i=1; i<99; i++) { 
        strnum  = ('0' + i).substr(('0' + i).length - 2);
        menuTopSubImg = document.getElementById('menuTopSubImg_' + grp1 + strnum); 

        if(menuTopSubImg==null) continue;

        if(strnum == grp2) {
            menuTopSubImg.src = menuTopSubImg.src.replace('gnb_off', 'gnb_on');
        } else {
            menuTopSubImg.src = menuTopSubImg.src.replace('gnb_on', 'gnb_off');
        }
    } 
} 
 

// 상단 메뉴를 토글시키는 기능 
function Action_Toggle_LeftMenu(grp1, grp2, grp3) { 
    var menuLeft, strnum;

    if(grp3 == '00') {
        for(i=1; i<99; i++) { 
            strnum   = ('0' + i).substr(('0' + i).length - 2);
            menuLeft = document.getElementById('menuLeft_' + grp1 + strnum); 

            if(menuLeft==null) continue;

            if(strnum == grp2) {
                menuLeft.src = menuLeft.src.replace('left_menu_off', 'left_menu_on');
            } else {
                menuLeft.src = menuLeft.src.replace('left_menu_on', 'left_menu_off');
            }
        } 
    } else {
        for(i=1; i<99; i++) { 
            strnum   = ('0' + i).substr(('0' + i).length - 2);
            menuLeft = document.getElementById('menuLeft_' + grp1 + grp2 + strnum); 

            if(menuLeft==null) continue;

            if(strnum == grp3) {
                menuLeft.src = menuLeft.src.replace('left_menu_off', 'left_menu_on');
            } else {
                menuLeft.src = menuLeft.src.replace('left_menu_on', 'left_menu_off');
            }
        } 
    }
} 
 


//-----------------------------------------------------------------------------
// submit 체크용
//-----------------------------------------------------------------------------
function Action_Check(frm, chkData) {
    for(var i=0; i<chkData.length; i++) {
        if(typeof(frm[chkData[i].Name])=='undefined') continue;

        // Type: 여러가지가 있죠. text, radio, check 등등
        switch(chkData[i].Type) {
            case 'file':
            case 'password':
            case 'text':
            case 'textarea':
                if(!frm[chkData[i].Name].value) {
                    alert(chkData[i].Text + "을(를) 입력하세요");
                    if(chkData[i].Focus == true) frm[chkData[i].Name].focus();
                    return false;
                }
                break;

            case 'radio':
                alert(frm[chkData[i].Name].length); return false;
                break;

            case 'check':
                break;

            case 'select-one':
                if(!frm[chkData[i].Name].value) {
                    alert(chkData[i].Text + "을(를) 선택하세요");
                    if(chkData[i].Focus == true) frm[chkData[i].Name].focus();
                    return false;
                }
                break;

            case 'hidden':
                break;
        }
    }

    return true;
}


//-----------------------------------------------------------------------------
// get 을 이용한 처리
//-----------------------------------------------------------------------------
function getHttprequest(URL) { 
    // 기본적인 변수 선언 
    var xmlhttp = null; 
    var responseText = "";

    // IE 경우 객체선언 
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 

    // ? 포함한 새로운 페이지 띄우기
    URL = URL + (URL.indexOf("?")>=0?"":"?") + "&" + (Math.random() * 10000000)

    // alert(URL);

    // GET 모드로 URL 주소의 값을 가져온다 
    // 주의 해야 할점은 무조건 UTF 로 값이 들어옴 
    xmlhttp.open('GET', URL, false); 

    // 값을 가져 왔을경우 호출할 메소드를 바로 선언 
    xmlhttp.onreadystatechange = function() { 
        // readyState 가 4 고 status 가 200 일 경우 올바르게 가져옴 
        if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') { 
            // responseText 에 값을 저장 
            responseText = xmlhttp.responseText; 
        } 
    } 
    xmlhttp.send(''); 

    // 가져온 xmlhttp 객체의 responseText 값을 반환 
    return responseText = xmlhttp.responseText; 
}


//-----------------------------------------------------------------------------
// 멀티 오브젝트 생성
//-----------------------------------------------------------------------------
function Action_Data_Divide(frm, src, dst_name) {
    // 이전에 있으면 삭제하도록 한다.
    var obj;

	obj = document.getElementById(dst_name)
    if(obj != null) {
        while(obj = document.getElementById(dst_name))
            obj.removeNode();
    }

    // 새로 생성한다.
    var tags;

    while(src.length > 0) {
        tags = document.createElement("input");
        tags.setAttribute("type", "hidden");
        tags.name = dst_name;
        tags.id   = dst_name;
        tags.value = src.substr(0, 4096);
        frm.appendChild(tags);
        src = src.substr(4096);
    }

    tags = document.createElement("input");
    tags.setAttribute("type", "hidden");
	tags.name = dst_name;
    tags.value = src;
    frm.appendChild(tags);
}





//-----------------------------------------------------------------------------
// 멀티 오브젝트 생성
//-----------------------------------------------------------------------------
function Action_Pop_DVR() {
    var win = window.open("?master=dvr&act=pop_login", "POP_DVR", "top=100, left=100, width=860, height=680, scrollbars=no");
    win.focus();
}




//-----------------------------------------------------------------------------
// 한줄게시판 체크
//-----------------------------------------------------------------------------
function Action_OneLine_Check(frm) {
    var chkData = [
	    { Name: "name"    , Text: "이름" , Type: "text" , Focus: true },
	    { Name: "content" , Text: "내용" , Type: "text" , Focus: true }
	];
 
    return Action_Check(frm, chkData);
}


function Action_Show_LPopOneLine(e) {
	/*
    var el;
	if (document.all)              el = window.event.srcElement;
	else (document.getElementById) el = e.target
    */

    var lpop = document.getElementById('LPopOneLine');

    var eventX = document.all ? event.clientX : e.clientX;
    var eventY = document.all ? event.clientY : e.clientY;

    x = eventX;
    y = eventY;

    lpop.style.top  = (y - 300) + 'px';
    lpop.style.left = (x - 280) + 'px';

    lpop.style.display = '';
}

function Action_Hide_LPopOneLine() {
    var lpop = document.getElementById('LPopOneLine');

    lpop.style.display = 'none';
}




function Action_Pop_GalleryShow() {
    var win = window.open("?master=bbs&act=pop_galleryshow", "POP_GALLERYSHOW", "top=100, left=100, width=420, height=450, scrollbars=no;");
    win.focus();
}



// 브라우져 관련 -- 익스플로러 호환
function iecompattest(){  
    return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body  
}  



function getClientWidth() { 
    if (typeof(window.innerWidth)=="number") return window.innerWidth;         // 익스플로러가 아닌 경우
    else                                     return document.body.clientWidth; // 익스플로러인 경우
}

function getClientHeight() { 
    if (typeof(window.innerWidth)=="number") return window.innerHeight;         // 익스플로러가 아닌 경우
    else                                     return document.body.clientHeight; // 익스플로러인 경우
}



function Action_OnOff_Image(id, max, num) {
    var obj, strnum;

    for(i=1; i<=max; i++) { 
        strnum = ('0' + i).substr(('0' + i).length - 2);
        obj = document.getElementById(id + strnum);
		if(obj) {
			obj.src = obj.src.replace('On', 'Off');
				
			if(i == num) {
				obj.src = obj.src.replace('Off', 'On');
			}
		}
    } 
}

function Action_OnOff_Css(id, max, num) {
    var obj, strnum;

    for(i=1; i<=max; i++) { 
        strnum = ('0' + i).substr(('0' + i).length - 2);
        obj = document.getElementById(id + strnum);
		if(obj) {
            obj.className = obj.className.replace('On', 'Off');
                
            if(i == num) {
                obj.className = obj.className.replace('Off', 'On');
            }
        }
    } 
}

function Action_Toggle_TopMenu(id, max, num) { 
    var obj, strnum;

    for(i=1; i<=max; i++) { 
        strnum = ('0' + i).substr(('0' + i).length - 2);
        obj = document.getElementById(id + strnum);
		if(obj) {
            obj.style.display = 'none';
                
            if(i == num) {
                obj.style.display = '';
            }
        }
    } 
}

function Action_Toggle_Gongji(id, max, num) { 
    var obj, strnum;

    for(i=1; i<=max; i++) { 
        strnum = ('0' + i).substr(('0' + i).length - 2);
        obj = document.getElementById(id + strnum);
        obj.style.display = 'none';
            
        if(i == num) {
            obj.style.display = '';
        }
    } 
}

function Action_Show_Kikwan(id, max, num) { 
    var obj, strnum;

    for(i=1; i<=max; i++) { 
        strnum = ('0' + i).substr(('0' + i).length - 2);
        obj = document.getElementById(id + strnum);
        obj.style.display = 'none';

        if(i == num) {
            obj.style.display = '';
        }
    } 
}


/* 고객맞춤메뉴 */
var CustomerCurr = 'A1';
function Action_OnOff_Customer(tag) {
    var obj;

    for(var i=0; i<parseInt(CustomerAry.length, 10); i++) { 
        obj = document.getElementById("CustomerImg" + CustomerAry[i][0]);
        obj.src = obj.src.replace('On', 'Off');

        if(CustomerAry[i][0] == tag) {
            obj.src = obj.src.replace('Off', 'On');
        }
    } 
}

function Action_Toggle_Customer(tag) { 
    var obj;

    CustomerCurr = '';
    for(var i=0; i<parseInt(CustomerAry.length, 10); i++) { 
        obj = document.getElementById("Customer" + CustomerAry[i][1]);
        obj.style.display = 'none';


        if(CustomerCurr == '' && (tag.length == 1 && CustomerAry[i][0] == tag || tag.length == 2 && CustomerAry[i][1] == tag) ) {
            //alert(CustomerAry[i][1]);

            obj.style.display = '';
            CustomerCurr = CustomerAry[i][1];
        }
    }
}

function Action_Move_Customer(mode) { 
    CustomerPos = 0;

    for(var i=0; i<parseInt(CustomerAry.length, 10); i++) { 
        if(CustomerCurr == CustomerAry[i][1]) {
            CustomerPos = i;
            break;
        }
    }

    CustomerPos += (mode == 'prev' ? -1 : 1);

    if(CustomerPos < 0) CustomerPos = (CustomerAry.length - 1);
    if(CustomerPos > (CustomerAry.length - 1)) CustomerPos = 0;

    CustomerCurr = CustomerAry[CustomerPos][1];

    Action_Toggle_Customer(CustomerCurr);
    Action_OnOff_Customer(CustomerCurr.substring(0, 1));
}

var CustomerAry = Array();
function Action_Read_Customer(data) {
    CustomerAry[CustomerAry.length] = data;
//    alert(CustomerAry[CustomerAry.length - 1][1]);
}


/* 주제별메뉴 */
var SubjectCurr = 'A1';
function Action_OnOff_Subject(tag) {
    var obj;

    for(var i=0; i<parseInt(SubjectAry.length, 10); i++) { 
        obj = document.getElementById("SubjectImg" + SubjectAry[i][0]);
        obj.src = obj.src.replace('On', 'Off');

        if(SubjectAry[i][0] == tag) {
            obj.src = obj.src.replace('Off', 'On');
        }
    } 
}

function Action_Toggle_Subject(tag) { 
    var obj;

    SubjectCurr = '';
    for(var i=0; i<parseInt(SubjectAry.length, 10); i++) { 
        obj = document.getElementById("Subject" + SubjectAry[i][1]);
        obj.style.display = 'none';

        if(SubjectCurr == '' && (tag.length == 1 && SubjectAry[i][0] == tag || tag.length == 2 && SubjectAry[i][1] == tag) ) {
            obj.style.display = '';
            SubjectCurr = SubjectAry[i][1];
        }
    }
}

function Action_Move_Subject(mode) { 
    SubjectPos = 0;

    for(var i=0; i<parseInt(SubjectAry.length, 10); i++) { 
        if(SubjectCurr == SubjectAry[i][1]) {
            SubjectPos = i;
            break;
        }
    }

    SubjectPos += (mode == 'prev' ? -1 : 1);

    if(SubjectPos < 0) SubjectPos = (SubjectAry.length - 1);
    if(SubjectPos > (SubjectAry.length - 1)) SubjectPos = 0;

    SubjectCurr = SubjectAry[SubjectPos][1];

    Action_Toggle_Subject(SubjectCurr);
    Action_OnOff_Subject(SubjectCurr.substring(0, 1));
}


var SubjectAry = Array();
function Action_Read_Subject(data) {
    SubjectAry[SubjectAry.length] = data;
//    alert(SubjectAry[SubjectAry.length - 1][1]);
}


function Action_EduImg_Show(tag, num, max) { 
    var obj;

    for(var i=0; i<parseInt(max); i++) { 
        obj = document.getElementById(tag + i);
        if(obj) {
            obj.style.display = 'none';
            if(i == num) obj.style.display = '';
        }
    }
}





function encodeURL(str){
    var s0, i, s, u;
    s0 = "";                // encoded str
    for (i = 0; i < str.length; i++){   // scan the source
        s = str.charAt(i);
        u = str.charCodeAt(i);          // get unicode of the char
        if (s == " "){s0 += "+";}       // SP should be converted to "+"
        else {
            if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){       // check for escape
                s0 = s0 + s;            // don't escape
            }
            else {                  // escape
                if ((u >= 0x0) && (u <= 0x7f)){     // single byte format
                    s = "0"+u.toString(16);
                    s0 += "%"+ s.substr(s.length-2);
                }
                else if (u > 0x1fffff){     // quaternary byte format (extended)
                    s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else if (u > 0x7ff){        // triple byte format
                    s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else {                      // double byte format
                    s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
            }
        }
    }

    return s0;
}

/*  Function Equivalent to java.net.URLDecoder.decode(String, "UTF-8")
    Copyright (C) 2002, Cresc Corp.
    Version: 1.0
*/

function decodeURL(str){
    var s0, i, j, s, ss, u, n, f;
    s0 = "";                // decoded str
    for (i = 0; i < str.length; i++){   // scan the source str
        s = str.charAt(i);
        if (s == "+"){s0 += " ";}       // "+" should be changed to SP
        else {
            if (s != "%"){s0 += s;}     // add an unescaped char
            else{               // escape sequence decoding
                u = 0;          // unicode of the character
                f = 1;          // escape flag, zero means end of this sequence
                while (true) {
                    ss = "";        // local str to parse as int
                        for (j = 0; j < 2; j++ ) {  // get two maximum hex characters for parse
                            sss = str.charAt(++i);
                            if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f"))  || ((sss >= "A") && (sss <= "F"))) {
                                ss += sss;      // if hex, add the hex character
                            } else {--i; break;}    // not a hex char., exit the loop
                        }
                    n = parseInt(ss, 16);           // parse the hex str as byte
                    if (n <= 0x7f){u = n; f = 1;}   // single byte format
                    if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;}   // double byte format
                    if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;}   // triple byte format
                    if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;}   // quaternary byte format (extended)
                    if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;}         // not a first, shift and add 6 lower bits
                    if (f <= 1){break;}         // end of the utf byte sequence
                    if (str.charAt(i + 1) == "%"){ i++ ;}                   // test for the next shift byte
                    else {break;}                   // abnormal, format error
                }
            s0 += String.fromCharCode(u);           // add the escaped character
            }
        }
    }

    return s0;
}



//-----------------------------------------------------------------------------
// 숨김메뉴
//-----------------------------------------------------------------------------

//이미지 토글 및 레이어띄우기
function Action_Toggle_FullMenu(id1, id2){ 
	var obj = document.getElementById(id2);

	if(document.getElementById(id1).style.display == 'none'){ 
		document.getElementById(id1).style.display = ''; 
		obj.src = obj.src.replace('Off', 'On');
	}else{ 
		document.getElementById(id1).style.display = 'none'; 
		obj.src = obj.src.replace('On', 'Off');
	} 
} 


function Action_LayerResize(id, pct, pad) {
    $('#' + id).css({width: (parseInt($('#' + id).css('width')) * pct / 100 - pad) + 'px'});
    $('#' + id).css({height: (parseInt($('#' + id).css('height')) * pct / 100 - pad) + 'px'});
}
/*
function Action_LayerSet(id) {
    $('#' + id).css("backgroundRepeat", "no-repeat");
    $('#' + id).css("backgroundPosition", "50% 50%");
}
*/


//-----------------------------------------------------------------------------
// 잠긴 화면 풀기
//-----------------------------------------------------------------------------
$(document).ready(function() {
    if($("#mainLayout").length > 0) $('#mainLayout').css('display', '');
});



//-----------------------------------------------------------------------------
// 메인 MBBS 
//-----------------------------------------------------------------------------
function Action_Toggle_MBBS(id, max, num) { 
    var obj, strnum;

    for(i=0; i<max; i++) { 
        objClass = document.getElementById(id + '_class_' + i);
        objData  = document.getElementById(id + '_data_' + i);

        if(objData) {

            
            if(objClass) objClass.className = id + '_off'; 
            objData.style.display = 'none';
                
            if(i == num) {
                if(objClass) objClass.className = id + '_on';
                objData.style.display = '';
            }
        }
    }
}

function Action_Toggle_NBBS(id, max, num) { 
    var obj, strnum;

    for(i=0; i<max; i++) { 
        objClass = document.getElementById(id + '_class_' + i);
        objData  = document.getElementById(id + '_data_' + i);

        if(objData) {
            if(objClass) objClass.className = 'nbbs_off'; 
            objData.style.display = 'none';
                
            if(i == num) {
                if(objClass) objClass.className = 'nbbs_on';
                objData.style.display = '';
            }
        }
    } 
}

function Action_Toggle_PopupLayer(id) {
    var obj = document.getElementById(id);

    if(obj.style.display == 'none') {
        obj.style.display = '';
        obj.style.zIndex = 999999;
    } else {
        obj.style.display = 'none';
        obj.style.zIndex = 0;
    }
}

function Action_PopupList() {
//	alert("tt");
    if(getCookie('PopupZone') != "done") {
		var newDiv = null;

        if (window.addEventListener) {
			newDiv = document.createElement("div");
			newDiv.setAttribute("id", "wg_popupillu");
			newDiv.setAttribute("style", "display:none");
		} else {
			newDiv = document.createElement("<div id='wg_popupillu' style='display:none'>");
		}

		newDiv.innerHTML =  document.getElementById('wg_popupzone1').innerHTML;
//		newDiv.innerHTML =  document.getElementById('wg_popupzone1').innerHTML;
		
        document.getElementById('mainLayout').appendChild(newDiv);

        Action_Toggle_PopupLayer('wg_popupillu');
    }
}

function Action_PopupList2() {
    if(getCookie('PopupZone') != "done") {
		var newDiv = null;

        if (window.addEventListener) {
			newDiv = document.createElement("div");
			newDiv.setAttribute("id", "wg_popupillu");
			newDiv.setAttribute("style", "display:none");
		} else {
			newDiv = document.createElement("<div id='wg_popupillu' style='display:none'>");
		}

		newDiv.innerHTML =  document.getElementById('wg_popupzone2').innerHTML;
        document.getElementById('mainLayout').appendChild(newDiv);

        Action_Toggle_PopupLayer('wg_popupillu');
    }
}

function CheckJumin(data) { 
    var jumin  = /^[0-9]{6}-?[0-9]{7}$/; 
    var number = /^[0-9]*$/; 

    var a    = ""; 
    var tmp  = ""; 
    var tmp2 = ""; 
    for(i=0; i<data.length; i++) { 
        a = data.substring(i,i+1); 
        if ( !number.test(a) ) continue; 

        tmp = data.substring(i, i+14); 
        tmp2 = data.substring(i, i+13); 

        if(jumin.test(tmp) || jumin.test(tmp2)) { 
            return true;
        } 
    }

    return false;
} 



//-----------------------------------------------------------------------------
// 쿠키 
//-----------------------------------------------------------------------------
function getCookie( name ) {
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length ){
        var y = (x+nameOfCookie.length);
        if ( document.cookie.substring( x, y ) == nameOfCookie ) {
            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) );
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 ) break;
    }
    return "";
}

function setCookie( name, value, expiredays ) {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}




//-----------------------------------------------------------------------------
// 비밀번호 규칙 체크
//-----------------------------------------------------------------------------
function Action_CheckPw(obj) {
    var s_pw = obj.value;

    var inNum = false;
    var inEng = false;
    var inSChar = false;
    var inRange = false;

    // 9자리 이상 20자 미만 확인
    if((s_pw.length >= 9) && (s_pw.length < 20)) {
        inRange = true;
    }

    // 숫자 포함 여부 확인
    for(i=0; i<s_pw.length; i++) {
        if((s_pw.charCodeAt(i) >= 48) && (s_pw.charCodeAt(i)<=57)) {
            inNum = true;
            break;
        }
    }

    // 영문자 포함 여부 확인
    for(i=0; i<s_pw.length; i++) {
        if(((s_pw.charCodeAt(i) >= 65) && (s_pw.charCodeAt(i)<=90)) || ((s_pw.charCodeAt(i) >= 97) && (s_pw.charCodeAt(i)<=122))) {
            inEng = true;
            break;
        }
    }

    // 특수문자 포함 여부 확인
    for(i=0; i<s_pw.length; i++) {
        if(((s_pw.charCodeAt(i) >= 33) && (s_pw.charCodeAt(i)<=47)) || ((s_pw.charCodeAt(i) >= 57) && (s_pw.charCodeAt(i)<=64)) || ((s_pw.charCodeAt(i) >= 91) && (s_pw.charCodeAt(i)<=96))) {
            inSChar = true;
            break;
        }
    }

    return (inRange&&inNum&&inEng&&inSChar);
}
