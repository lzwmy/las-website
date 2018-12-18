
import "../css/product.css"
import { resolve } from "path";

let current = 1;  //当前页
let pageSize = 2; //当前页大小
let total = null; //总页数
let category = 1; //产品类别 
let oA = $("#main .top-nav a");


// 判断产品类别页
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null){
         return  unescape(r[2]); 
     }else{
         return null;
     }
}
category = GetQueryString("category");
getData().then(()=>{
    page();
});



//获取产品数据
function getData(value){
    return new Promise((resolve,reject)=>{
        let content = $("#content");
        let page = $("#page");
        current = value?value:current;
        content.empty();
        page.children(".page").remove();
        $.ajax({
            url: "../data/product.json",
            type: "get",
            dataType: "json",
            success: function(data) {
                let newData = data.data.filter(function(item){
                    if(category==null){
                        return item;
                    }else{
                        return item.category == category;
                    }
                });
                $.each(newData, function(i, item) {
                    let startNum = (current-1) * pageSize;
                    let endNum = startNum+pageSize;
                    if(i > startNum-1 && i <= endNum-1){
                        let str = `<div class="col-md-6 col-sm-6  col-xs-12">
                                        <div class="pro">
                                            <a href="proShow.html?id=${item.id}"><img src="${item.imgPath}" alt=""></a> 
                                            <div class="bottom">
                                                <p class="text-center">${item.title}</p>
                                                <p class="text-center">
                                                    <span>${item.volume} ml</span>
                                                    <span class="line">|</span>
                                                    <span>&yen; ${item.price}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>`;
                        $(content).append(str);
                    }
                });
                total = Math.ceil(newData.length/pageSize);
                for(let i = 1; i <= total; i++){
                    let pageli = `<li class="page ${(i)==current?'active':''}"><a href="#">${i}</a></li>`;
                    $(page).children(".next").before(pageli);
                }
                resolve();
            }
        });
    })
};

//分页点击
function page(){
    var oPageUl = $(".pagination");
    var oPre = $(".pagination .pre");
    var oNext = $(".pagination .next");

    //判断产品页子类
    oA.on("click",function(){
        $(this).parent().addClass("active").siblings().removeClass("active");
        category = $(this).attr("data-type");
        current = 1;  
        getData().then(()=>{
            upDom();
        });
        
    });

    upDom();
    oPageUl.on('click','.page',function(){
        current = parseInt($(this).children("a").text());
        getData();
        upDom();
    });
    function onPre(){
        getData(current-1);
        upDom();
    };
    function onNext(){
        getData(current+1);
        upDom();
    };
    function upDom(){
        if(current==1){
            $(oPre).addClass("disabled");
            $(oPre).children("a").attr("href","javascript:;");
            $(oPre).off('click');
        }else{
            $(oPre).removeClass("disabled");
            $(oPre).children("a").attr("href","#");
            $(oPre).off('click');
            $(oPre).on('click',onPre);
        }
        
        if(current==total){
            $(oNext).addClass("disabled");
            $(oNext).children("a").attr("href","javascript:;");
            $(oNext).off('click');
        }else{
            $(oNext).removeClass("disabled");
            $(oNext).children("a").attr("href","#");
            $(oNext).off('click');
            $(oNext).on('click',onNext);
        }
    }
}


 
