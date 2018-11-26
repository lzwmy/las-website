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
    var top_back = $("#top_back");
    var h = $(window).scrollTop();
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
!(function(){
    let h = $(window).height();
    let w = $(window).width();
    let oNav1_a = $("#nav_js > .nav1 > a");
    let oNav2 = $("#nav_js .nav2");
    let oNav2_a = $("#nav_js .nav2 > li a");
    let oNav3 = $("#nav_js .nav3");
    let oMask = $("#mask_js");
    let oClose = $(".nav-close");

    let oDownBtn = $("#down_btn_js")
    let oSearchBtn = $("#search_btn_js")
    let oDownBox = $("#right_js .right-box")
    let oSearchIcon = $("#search_input + .icon");
    let oSearchInput = $("#search_input");
    let oSearchContent = $("#search_content");
    let timer = null;

    oNav2.css({"height":h+"px"})
    oDownBox.css({"height":h+"px"})
    oMask.css({"height":h+"px"})
    $(window).resize(function(){
        h = $(window).height();
        w = $(window).width();
        oNav2.css({"height":h+"px"});
        oDownBox.css({"height":h+"px"});
        oMask.css({"height":h+"px"});
        oNav3.css({"width":w-oNav2.width()+"px"});
    });


    oNav1_a.click(function(){
        oNav2.removeClass("active");
        oNav3.removeClass("active");
        oDownBox.removeClass("active");
        $(this).parent().find(".nav2").addClass("active");
        $(oNav1_a).css({"position":"fixed"});
        oClose.addClass("active");
        oMask.addClass("active")
    });

    oNav2_a.click(function(){
        oNav3.removeClass("active");
        oNav3.css({"width":w-oNav2.width()+"px"});
        $(this).parent().find(".nav3").addClass("active");
    });

    oClose.click(function(){
        oNav2.removeClass("active");
        oNav3.removeClass("active");
        oMask.removeClass("active")
        oDownBox.removeClass("active");
        oClose.removeClass("active");
        oSearchIcon.removeClass("active");
        $(oNav1_a).css({"position":"absolute"});
        $(oDownBtn).css({"position":"absolute"});
        $(oSearchBtn).css({"position":"absolute"});
    });

    oMask.click(function(){
        $(oNav1_a).css({"position":"absolute"});
        $(oDownBtn).css({"position":"absolute"});
        $(oSearchBtn).css({"position":"absolute"});
        oNav2.removeClass("active");
        oNav3.removeClass("active");
        oDownBox.removeClass("active");
        $(this).removeClass("active")
        oClose.removeClass("active");
    });

    oDownBtn.click(function(){
        $(oSearchBtn).css({"position":"fixed"});
        $(oDownBtn).css({"position":"fixed"});
        oNav2.removeClass("active");
        oNav3.removeClass("active");
        oDownBox.removeClass("active");
        $(this).parent().find(".right-box").addClass("active");
        oMask.addClass("active");
        oClose.addClass("active");
    });
    oSearchBtn.click(function(){
        $(oSearchBtn).css({"position":"fixed"});
        $(oDownBtn).css({"position":"fixed"});
        $(oSearchBtn).html();
        oNav2.removeClass("active");
        oNav3.removeClass("active");
        oDownBox.removeClass("active");
        $(this).parent().find(".right-box").addClass("active");
        oMask.addClass("active");
        oClose.addClass("active");
        oSearchInput.focus();
        oSearchIcon.addClass("active");
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

})();


