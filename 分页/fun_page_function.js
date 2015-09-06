function pageinput(){

		var _this = $("#pageinput").val();
		_this=_this.replace(/[^\d]/g,'');
		 $("#pageinput").val(_this);
	}
	function page_now_function(page_now,pages,url){ 	
		var page_pre = page_now - 1;    //上一页
		var page_next = page_now + 1;  //下一页
		if(page_now <= 1 ){
            var new_page_shouye = "<span class='wenzidisabled'>首页</span>";
            var new_page_pre = "<span class='disabled'>&lt;</span>";
        }else{
            var new_page_shouye = "<a class='wenzia' href='"+url+"1'>首页</a>";
            var new_page_pre = "<a class='pagea' href='"+url+page_pre+"'>&lt;</a>";
        }
        if ( page_next> pages) {
            var new_page_moye = "<span class='wenzidisabled'>末页</span>";
            var new_page_next = "<span class='disabled'>&gt;</span>";

        } else {
            var new_page_moye = "<a class='wenzia' href='"+url+pages+"'>末页</a>";
            var new_page_next = "<a class='pagea' href='"+url+page_next+"'>&gt;</a>";
        }
		if(pages <=5){
			var str ="";
			var new_page_shouye = "";
			for(var i = 1;i <= pages;i++){
				str += i == page_now ? "<span class='active'>"+i+"</span>" : "<a class='pagea' href='"+url+i+"'>"+i+"</a>" ;
			}
			var new_page_moye = "";
			var fun_page_width = (pages+2)*36;
		}else if(pages == 6){
			var str = "";
			var fun_page_width = (9+2)*36+24;
			if(page_now > 3){
				str  +=  "<a class='pagea' href='1'>1</a>";
				str  +=   "<span class='disabled'>...</span>";
				for(var i = 2;i<=6;i++){
					if(i == page_now){
						str +="<span class='active'>"+i+"</span>";
					}else{
						str +="<a class='pagea' href='"+url+i+"'>"+i+"</a>";
					}
				}
			}else{ 
				for(var i=1;i<=5;i++){
					str += i == page_now ? "<span class='active'>"+i+"</span>" : "<a class='pagea' href='"+url+i+"'>"+i+"</a>" ;
				}
				str += "<span class='disabled'>...</span>";
				str += "<a class='pagea' href='"+url+"6'>"+6+"</a>";
			}
		}else if(pages>=7){
			if(page_now >3 && page_now<pages-2){ //7个数以上 并且当前
				var str = "";
				str  +=  "<a class='pagea' href='"+url+"1'>1</a>";
				str  +=   "<span class='disabled'>...</span>";
				for(var i=page_now-2;i<page_now;i++){
					str +="<a class='pagea' href='"+url+i+"'>"+i+"</a>";
				}
				str +="<span class='active'>"+page_now+"</span>";
				for(var i=page_now+1;i<page_now+3;i++){
					str +="<a class='pagea' href='"+url+i+"'>"+i+"</a>";
				}
				str += "<span class='disabled'>...</span>";
				str += "<a class='pagea' href='"+url+pages+"'>"+pages+"</a>";
				var fun_page_width = (11+2)*36+24;
			}else if(0<page_now && page_now <=3){
				var str = "";

				for(var i=1;i<=5;i++){
					str += i == page_now ? "<span class='active'>"+i+"</span>" : "<a class='pagea' href='"+url+i+"'>"+i+"</a>" ;
				}
				str += "<span class='disabled'>...</span>";
				str += "<a class='pagea' href='"+url+pages+"'>"+pages+"</a>";
				var fun_page_width = (9+2)*36+24;
			}else{
				var str = "";
				str  +=  "<a class='pagea' href='"+url+"1'>1</a>";
				str  +=   "<span class='disabled'>...</span>";
				for(var i=pages-4;i<=pages;i++){
					str += i == page_now ? "<span class='active'>"+i+"</span>" : "<a class='pagea' href='"+url+i+"'>"+i+"</a>" ;
				}
				var fun_page_width = (9+2)*36+24;
			}
			
		}
		var arrayObj = new Array(new_page_shouye,new_page_pre,str,new_page_next,new_page_moye,fun_page_width+136); //首页，上一页，循环中间数字链接，下一页，末页，当前宽度
		return arrayObj;
	}

	function pagesubmit(pages){  //首页跳转函数
		var this_go_page = document.getElementById("pageinput").value; //跳转的页面的page数
		if(this_go_page == '' || this_go_page == null || this_go_page == undefined){
                        //this_go_page = 1;
			return;
		}
		this_go_page = parseInt(this_go_page);
		var this_go_url = document.getElementById("page_url").value; //跳转的URL
		this_go_page = this_go_page < 1 ? 1 : this_go_page;
		this_go_page = this_go_page > pages ? pages : this_go_page;
		 ajaxData(this_go_url+this_go_page+"");
	}	
	
	function pagesubmitss(pages){  //收藏跳转函数
                var this_go_page = document.getElementById("pageinput").value; //跳转的页面的page数
		if(this_go_page == '' || this_go_page == null || this_go_page == undefined){
                        //this_go_page = 1;
			return ;
		}
		this_go_page = parseInt(this_go_page);
                var this_go_url = document.getElementById("page_url").value; //跳转的URL
                this_go_page = this_go_page < 1 ? 1 : this_go_page;
				this_go_page = this_go_page > pages ? pages : this_go_page;
                pageAjax(this_go_url+this_go_page);
        }

    function pagesubmitsss(pages){  //高级搜索跳转函数    ajaxPage（）跳转
                var this_go_page = document.getElementById("pageinput").value; //跳转的页面的page数
		if(this_go_page == '' || this_go_page == null || this_go_page == undefined){
                        //this_go_page = 1;
			return ;
                }
		this_go_page = parseInt(this_go_page);
                var this_go_url = document.getElementById("page_url").value; //跳转的URL
                this_go_page = this_go_page < 1 ? 1 : this_go_page;
				this_go_page = this_go_page > pages ? pages : this_go_page;
                ajaxPage(this_go_url+this_go_page);
        }

	function pagesubmits(pages){  //其他跳转函数
		var this_go_page = document.getElementById("pageinput").value; //跳转的页面的page数
		if(this_go_page == '' || this_go_page == null || this_go_page == undefined){
			//this_go_page = 1;
			return ;
		}
		this_go_page = parseInt(this_go_page);
		var this_go_url = document.getElementById("page_url").value; //跳转的URL
		this_go_page = this_go_page < 1 ? 1 : this_go_page;
		this_go_page = this_go_page > pages ? pages : this_go_page;
		window.location.href = this_go_url+this_go_page;
	}	
