import Swiper from '../js/swiper.min.js';
import "../css/swiper.min.css"
import "../css/proshow.css"


//获取参数
function getUrlParam(param) {
  var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

//根据商品id获取该商品图片
getData(parseInt(getUrlParam("id")));

function getData(value){
  let oProshow = $("#proShow");
  let domLoading = false;
  $.ajax({
      url: "../data/product.json",
      type: "get",
      dataType: "json", //返回数据格式为json
      success: function(data) {
        //导航标题
        $("#nav_title").text(data.data[value-1].title);
        //商品详情图cls
        
        $.each(data.data[value-1].children, function(i, item) {
            let str = `<div class="swiper-slide"><img src="${item.imgPath}" alt="${item.title}"></div>`
            $("#swiper_box1").append(str);
        });
        $.each(data.data[value-1].details, function(i, item) {
          let str = `<div class="col-md-6 col-sm-6 col-xs-6 t ${i==1?'col-md-push-6 col-sm-push-6 col-xs-push-6':''}">
                        <div class="text"><h3>${item.title}</h3><p>${item.size}</p><p>${item.detail}</p></div>
                      </div>
                      <div class="col-md-6 col-sm-6 col-xs-6 ${i==1?'col-md-pull-6 col-sm-pull-6 col-xs-pull-6':''}">
                        <img src="${item.imgPath}" alt="${item.title}">
                      </div>`
          oProshow.append(str);
        });
        domLoading = true;
      if(data.data[value-1].children){
        var mySwiper = new Swiper ('.swiper1', {
            autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
            observer:true,//修改swiper子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            loop: true, // 循环模式选项
            pagination: {
              el: '.swiper-pagination',
              type: 'fraction',
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
        })
      }
      }
   })
}

getDataBot();
//底部商品列表
function getDataBot(value){
  $.ajax({
      url: "../data/product.json",
      type: "get",
      dataType: "json", //返回数据格式为json
      success: function(data) {
        $.each(data.data, function(i, item) {
            let str = `<div class="swiper-slide">
                        <div class="pro">
                            <a href="proShow.html?id=${item.id}"><img src="${item.imgPath}" alt="${item.title}"></a> 
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
            
            $("#swiper_box2").append(str);
        });
        var slidesNum;
        var spaceBetween;
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { 
          slidesNum = 2;
          spaceBetween = 15;
        }else{
          slidesNum = 3;
          spaceBetween = 50;
        }
        var Swiper2 = new Swiper ('.swiper2', {
          loop: true,
          slidesPerView : slidesNum,
          spaceBetween : spaceBetween,
          observer:true,//修改swiper子元素时，自动初始化swiper
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }) 
      }
   })
}


        

