import "../css/normalize.css"
import "../css/common.css"
import "../css/bootstrap.min.css"
import "../css/footer.css"
import "../css/nav.css"
import "../css/idea.css"
import "../css/animate.css"
import "../css/iconfont.css"
import "../js/scrollReveal.js"


if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { 
    $("#down_btn_js").text("下载APP");
}else{
    window.scrollReveal = new scrollReveal();
}

// 返回顶部
!(function(){
    let top_back = $("#top_back");
    let h = $(window).scrollTop();
    top_back.fadeOut(0);
    $(window).scroll(function(){
        h = $(window).scrollTop();
        if(h<=200){
            top_back.fadeOut(500);
        }else{
            top_back.fadeIn(500);
        }
    });
    top_back.click(()=>{
        $("html,body").animate({scrollTop:0},400);
    })
})();

//nav
function nav(){
    let h = $(window).height();
    let w = $(window).width();
    let oNav1 = $("#nav_js");
    let oNav1_a = $("#nav_js > .nav1 > a");
    let oNav2 = $("#nav_js .nav2");
    let oNav2_img = oNav2.find(".img-box img");
    let oMask = $("#mask_js");
    let oClose = $(".nav-close");

    let oDownBtn = $("#down_btn_js");
    let oSearchBtn = $("#search_btn_js");
    let oRightNav = $("#right_js");
    let oRightUl = $("#right_js .nav-right");
    let oDownBox = $("#right_js .right-box");

    let oSearchIcon = $("#search_input + .icon");
    let oSearchInput = $("#search_input");
    let oSearchContent = $("#search_content");

    let top_a = $("#top .home-link"); 
    let top_a_idea = $(".top-page .home-link"); 
    let timer = null;

    let menu_btn = $("#menu_btn");

    if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { 
        oNav2.css({"height":h+"px"})
        oDownBox.css({"height":h+"px"})
        $(window).resize(function(){
            h = $(window).height();
            w = $(window).width();
            oNav2.css({"height":h+"px"})
            oDownBox.css({"height":h+"px"})
        })
    }

    oNav1_a.click(function(){
        top_a.css({"z-index":"0"});
        top_a_idea.css({"z-index":"0"});
        oNav1.addClass("active");
        $(oSearchBtn).css({"position":"fixed"});
        $(oDownBtn).css({"position":"fixed"});
        oNav2.removeClass("active");
        oDownBox.removeClass("active");
        $(this).parent().find(".nav2").addClass("active");
        oClose.addClass("active");
        oMask.addClass("active")
    });

    oClose.click(function(){
        top_a.css({"z-index":"21"});
        top_a_idea.css({"z-index":"21"});
        oNav1.removeClass("active");
        $(oSearchBtn).css({"position":"absolute"});
        $(oDownBtn).css({"position":"absolute"});
        oNav2.removeClass("active");
        oMask.removeClass("active")
        oDownBox.removeClass("active");
        oClose.removeClass("active");
        oSearchIcon.removeClass("active");
    });

    oMask.click(function(){
        top_a.css({"z-index":"21"});
        top_a_idea.css({"z-index":"21"});
        oNav1.removeClass("active");
        $(oSearchBtn).css({"position":"absolute"});
        $(oDownBtn).css({"position":"absolute"});
        oNav2.removeClass("active");
        oDownBox.removeClass("active");
        $(this).removeClass("active")
        oClose.removeClass("active");
    });

    oDownBtn.click(function(){
        top_a.css({"z-index":"0"});
        top_a_idea.css({"z-index":"0"});
        $(oSearchBtn).css({"position":"fixed"});
        $(oDownBtn).css({"position":"fixed"});
        oNav2.removeClass("active");
        oDownBox.removeClass("active");
        $(this).parent().find(".right-box").addClass("active");
        oMask.addClass("active");
        oClose.addClass("active");
    });
    oSearchBtn.click(function(){
        top_a.css({"z-index":"0"});
        top_a_idea.css({"z-index":"0"});
        $(oSearchBtn).css({"position":"fixed"});
        $(oDownBtn).css({"position":"fixed"});
        $(oSearchBtn).html();
        oNav2.removeClass("active");
        oDownBox.removeClass("active");
        $(this).parent().find(".right-box").addClass("active");
        oMask.addClass("active");
        oClose.addClass("active");
        if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { 
            oSearchInput.focus();
        }
        oSearchIcon.addClass("active");
    });
    oNav2.on("mouseenter","a",function(){
        let bgPath = $(this).attr("data-img");
        $(oNav2_img).attr("src",bgPath);
    });


    //搜索框异步查找
    oSearchInput.on("input",function(e){
        oSearchContent.empty();
        let inputValue = $(this).val();
        if(inputValue==""){
            let str = `<a href="">洗面奶</a>
                        <a href="">维生素</a>
                        <a href="">乳酸饮品</a>`;
            oSearchContent.append(str);
        }else{
            clearTimeout(timer);
            timer = setTimeout(function(){
                getData();
            },120);
        }
        function getData(){
            $.ajax({
                url: "../data/product.json",
                type: "get",
                dataType: "json",
                success: function(data) {
                    let newData = data.data.filter(function(item){
                        if(item.title.indexOf(inputValue) != -1){
                            return item.title;
                        }
                    });
                    if(newData.length != 0){
                        newData.forEach((element,index) => {
                            if(index >= 10){
                                return;
                            }
                            let str = `<a href="proShow.html?id=${element.id}">${element.title}</a>`
                            oSearchContent.append(str);
                        });
                    }else{
                        let str = `<a href="#">暂无搜索结果!</a>`
                        oSearchContent.append(str);
                    }
                }
            });
        }
    });

    //手机端导航按钮
    menu_btn.on("click",function(){
        if($(oNav1).hasClass("active")){
            oNav1.removeClass("active");
            oClose.removeClass("active");
            oMask.removeClass("active")
            top_a.css({"z-index":"21"});
            top_a_idea.css({"z-index":"21"});
        }else{
            oNav1.addClass("active");
            oClose.addClass("active");
            oMask.addClass("active")
            top_a.css({"z-index":"0"});
            top_a_idea.css({"z-index":"0"});
        }
        
        
    })
    //激活当前nav
    $(".top-page li a").each(function(){ 
        let $this = $(this); 
	    if($this[0].href==String(window.location)){ 
	        $this.parent().addClass("active").siblings().removeClass("active"); 
        }
    }); 
    $(".top-nav li").each(function(){ 
        let $this = $(this); 
        let proli = $this.children("a").attr("data-type");
        let url = window.location.search;
	    if($this[0].href==String(window.location)){ 
            $this.parent().addClass("active").siblings().removeClass("active"); 
        }
        if(!proli){
            proli = 0;
        }
        if(url.charAt(url.length-1)==proli){
            $this.addClass("active").siblings().removeClass("active");
        }
    }); 

    let oNav1_li = $("#nav_js .nav1");
    let urlPath = window.location.pathname;
    let eq = 99;
    if(urlPath.match(/.*story.*/i) || urlPath.match(/.*life.*/i) || urlPath.match(/.*worth.*/i) || urlPath.match(/.*develop.*/i)){
        eq = 0;
    }else if(urlPath.match(/.*find.*/i) || urlPath.match(/.*technology.*/i) || urlPath.match(/.*formula.*/i) || urlPath.match(/.*quality.*/i)){
        eq = 1;
    }else if(urlPath.match(/.*product.*/i)){
        eq = 2;
    }else if(urlPath.match(/.*join.*/i) || urlPath.match(/.*contact.*/i)){
        eq = 3;
    }
    oNav1_li.eq(eq).addClass('active').siblings().removeClass("active");
};

nav();


