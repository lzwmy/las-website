import "../css/index.css"
if(window.name == null || window.name == ""){
    window.name = "olomi";
    (function(){
        let w = $(window).width();
        let oLeft = $("#left_js");
        let oWrap = $("#start_js");
        let oRight = $("#right_js");
        let oLeftW = oLeft.width();
        let oRightW = oRight.width();
        oRight.css({"top":"100px", "right":"0"})
        oLeft.css({"top":"220px", "right": w-oLeftW/3+"px"})
        //动画
        setTimeout(()=>{
            oLeft.addClass("active");
            oLeft.css({"top":"220px", "right": oRightW+"px"})
            oWrap.addClass("active");
        },1000)
    
        $(window).resize(function(){
            w = $(window).width();
            oLeftW = oLeft.width();
            oRightW = oRight.width();
            oRight.css({"top":"100px", "right":"0"})
            oLeft.css({"top":"220px", "right": oRightW+"px"})
        });
    })();
}else{
    $("#start_js").css("display","none");
}

