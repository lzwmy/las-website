
import "../css/product.css"

let currentType = "";  //当前页产品类型
let current = 1;  //当前页
let pageSize = 6; //当前页大小
let total = 1; //总页数
let category = 1; //产品类别 1:面部头发身体  2：内部吸收
let oA = $("#main .top-nav a");


// 判断产品类别页
if(window.location.pathname.indexOf("product") != -1){
    category = 1;
}else if(window.location.pathname.indexOf("inVivo") != -1){
    category = 2;
}
getData();

//判断产品页子类
currentType= window.location.search.slice(6)==""?"":window.location.search.slice(6);
oA.on("click",function(){
    currentType = $(this).attr("data-type");
    current = 1;  
    total = 1; 
    getData();
});


//获取产品数据
function getData(value){
    let content = $("#content");
    let page = $("#page");
    current = value?value:current;
    content.empty();
    page.children(".page").empty();
    $.ajax({
        url: "../data/product.json",
        type: "get",
        dataType: "json",
        success: function(data) {
            let newData = data.data.filter(function(item){
                if(currentType==""){
                    return item.category == category;
                }else{
                    return item.type == currentType && item.category == category;
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
            for(let i = 0; i < total; i++){
                let pageli = `<li class="page ${(i+1)==current?'active':''}"><a href="#">${i+1}</a></li>`;
                $(page).children(".next").before(pageli);
            }
        }
    })
}
//分页点击
function page(){
    var oPageUl = $(".pagination");
    var oPre = $(".pagination .pre");
    var oNext = $(".pagination .next");
    upDom();
    oPageUl.on('click','.page',function(){
        current = parseInt($(this).children("a").text());
        getData();
        $(oPageUl[current-1]).addClass("active").siblings().removeClass("active");
        upDom();
    });
    function onPre(){
        getData(current-1);
        $(oPageUl[current-1]).addClass("active").siblings().removeClass("active");
        upDom();
    };
    function onNext(){
        getData(current+1);
        $(oPageUl[current-1]).addClass("active").siblings().removeClass("active");
        upDom();
    };
    function upDom(){
        if(current==1){
            $(oPre).addClass("disabled");
            oPre.off('click',onPre);
        }else{
            $(oPre).removeClass("disabled");
            oPre.off('click',onPre);
            oPre.on('click',onPre);
        }
        if(current==total){
            $(oNext).addClass("disabled");
            oNext.off('click',onNext);
        }else{
            $(oNext).removeClass("disabled");
            oNext.off('click',onNext);
            oNext.on('click',onNext);
        }
    }
}
page();

 
