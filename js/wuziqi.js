$(function(){
	// var isAi=true;	
	var wuziqi=function(){
	var kongbai={};
	for (var i = 0; i < 15; i++) {		
		$('<b>').addClass('heng').appendTo('.qipan');
		$('<i>').addClass('shu').appendTo('.qipan');
		for (var j = 0; j < 15; j++) {
			kongbai[i+'_'+j]={x:i,y:j};
			$('<div>')
			.addClass('qizi')
			.attr('id',i+'_'+j)
			.data('pos',{'x':i,'y':j})
			.appendTo('.qipan');
		}		
	}

	//黑点
	for(var i=0;i<5;i++){
		$('<span>').addClass('heidian').appendTo('.qipan')
	}
	
    //判断的函数
    function join(n1,n2){
    	return n1+'_'+n2;
    }
    function panduan(pos,biao){
    	 var h=1,s=1,zx=1,yx=1;
    	 var tx,ty;

    	 //横排
    	 tx=pos.x; ty=pos.y;
    	 while(biao[join(tx,ty-1)]){
    	 	h++;
    	 	ty--;
    	 }
    	 tx=pos.x; ty=pos.y;
    	 while(biao[join(tx,ty+1)]){
    	 	h++;
    	 	ty++;
    	 }
    	
    	 //竖排
    	 tx=pos.x;	 ty=pos.y;
    	 while(biao[join(tx-1,ty)]){
    	 	s++;
    	 	tx--;
    	 }
    	 tx=pos.x;	 ty=pos.y;
    	 while(biao[join(tx+1,ty)]){
    	 	s++;
    	 	tx++;
    	 }
    	 
         //左斜
    	 tx=pos.x;
    	 ty=pos.y;
    	 while(biao[join(tx-1,ty-1)]){
    	 	zx++;
    	 	ty--;
    	 	tx--;
    	 }
    	 tx=pos.x;
    	 ty=pos.y;
    	 while(biao[join(tx+1,ty+1)]){
    	 	zx++;
    	 	ty++;
    	 	tx++;
    	 }    	
    	
         //右斜
    	 tx=pos.x;
    	 ty=pos.y;
    	 while(biao[join(tx-1,ty+1)]){
    	 	yx++;

    	 	ty++;
    	 	tx--;
    	 }
    	 tx=pos.x;
    	 ty=pos.y;
    	 while(biao[join(tx+1,ty-1)]){
    	 	yx++;
    	 	ty--;
    	 	tx++;
    	 }
    	 return Math.max(h,s,zx,yx)


    }



	var flag=true;
	var hei={};
	var bai={};
	var ai=function(){
		var max=-Infinity;
		var zuobaio1;
		for(var i in kongbai){
			var weixie=panduan(kongbai[i],bai);
			if(weixie>max){
				max=weixie;
				zuobiao1=kongbai[i];
				
			}
		}
		var max2=-Infinity;
		var zuobaio2;
		for(var i in kongbai){
			var weixie2=panduan(kongbai[i],hei);
			if(weixie2>max2){
				max2=weixie2;
				zuobiao2=kongbai[i];
				
			}
		}
		return (max>max2)?zuobiao1:zuobiao2
	}
	//moveqi

	$('.qizi').on('click',function(){
		$('.moveqi').remove();
		$('<div class="moveqi"></div>').appendTo('.zhuozi');
		if($(this).hasClass('bai')||$(this).hasClass('hei')){
			return;
		}
		$('.xianxingqi').remove();
        var pos=$(this).data('pos');
		if (flag) {
			$('.zhuozi').on('mousemove',function(e){

				var Lweizhi=e.pageX-$('.zhuozi').offset().left-15;
				var Tweizhi=e.pageY-$('.zhuozi').offset().top-20;
				var Lbianjie=$('.qipan').offset().left;
				var Tbianjie=$('.qipan').offset().top;
				if(e.pageX<Lbianjie || e.pageY<Tbianjie){Lweizhi=Lbianjie; Tweizhi=Tbianjie}
			    if(e.pageX>Lbianjie+500 || e.pageY>Tbianjie+500 ){Lweizhi=Lbianjie; Tweizhi=Tbianjie}
				if(!isAi){
		        $('.moveqi').css({'left':Lweizhi,top:Tweizhi,'backgroundImage':'url(img/heiqi.png)'});
                }else{
          	$('.moveqi').css({'left':Lweizhi,top:Tweizhi,'backgroundImage':'url(img/baiqi.png)'});
          }
	})
			$('<div>').addClass('xianxingqi').appendTo('.guan')
		    $('.xianxingqi').addClass('addhei')
			$(this).addClass('bai');
			delete kongbai[join(pos.x,pos.y)]
			bai[pos.x+'_'+pos.y]=true;
			if(panduan(pos,bai)>=5){
				$('.moveqi').remove();
				tishi();
				$tit.html('恭喜你!!!')
				$fon.html('玩家1，白棋，赢了')
				zailai();
				$('.tishi .zailai').on('click',function(){		
	      	$('.meau .lable-again').trigger('click')
	      	$(this).remove();
	      })
				$('.qizi').off('click');
				return;
			}          
			flag=false;
          if(isAi){
          	var pos=ai();
          	$('<div>').addClass('xianxingqi').appendTo('.guan')
		    $('.xianxingqi').addClass('addbai')
          	
          	delete kongbai[join(pos.x,pos.y)]
			hei[pos.x+'_'+pos.y]=true;
			if(panduan(pos,hei)>=5){
				$('.moveqi').remove();
				tishi();
				$tit.html('很遗憾!!!')
				$fon.html('你输了，真菜')
				zailai();
				$('.tishi .zailai').on('click',function(){		
	      	$('.meau .lable-again').trigger('click')
	        $(this).remove();
	      })
				$('.qizi').off('click');
			}
			 $('#'+join(pos.x,pos.y)).addClass('hei');
			 flag=!flag;
          	 return;
			
          }

		}else{
			$('.zhuozi').on('mousemove',function(e){
				var Lweizhi=e.pageX-$('.zhuozi').offset().left-15;
				var Tweizhi=e.pageY-$('.zhuozi').offset().top-20;
				var Lbianjie=$('.qipan').offset().left;
				var Tbianjie=$('.qipan').offset().top;
				if(e.pageX<Lbianjie || e.pageY<Tbianjie){Lweizhi=Lbianjie; Tweizhi=Tbianjie}
			    if(e.pageX>Lbianjie+500 || e.pageY>Tbianjie+500 ){Lweizhi=Lbianjie; Tweizhi=Tbianjie}
		$('.moveqi').css({'left':Lweizhi,top:Tweizhi,'backgroundImage':'url(img/baiqi.png)'});

	})
			$('<div>').addClass('xianxingqi').appendTo('.guan')
		    $('.xianxingqi').addClass('addbai')
			$(this).addClass('hei');
			hei[pos.x+'_'+pos.y]=true;
			if(panduan(pos,hei)>=5){
				$('.moveqi').remove();
				tishi();
				$tit.html('恭喜你!!!')
				$fon.html('玩家2，黑棋，赢了')
				zailai();
				$('.tishi .zailai').on('click',function(){		
	      	      $('.meau .lable-again').trigger('click')
	      	      $(this).remove();
	      })
				$('.qizi').off('click');
			}            
			flag=!flag;
		}		
	})}
	//tishi的函数
	var $tit=$('.zhuozi .tishi .title')
	var $fon=$('.zhuozi .tishi .font')
	var tishi=function(){
		clearTimeout(t);
		$('.zhuozi .tishi').animate({top:0,opacity:1},500)
	} 
	var xiaoshi=function(){
		$('.zhuozi .tishi').animate({top:-800,opacity:0},500)
	}
     tishi();
     $('.zhuozi .tishi .chahao').on('click',function(){
     	t=setTimeout(xiaoshi,200)
     })
      var t;
      var zailai=function(){
      	$('<div>').addClass('zailai').html('再来一次').appendTo('.tishi');
      	
      }
    // 开始游戏
    $(".xuanze  .renren input").on('click',function(){
    	console.log($('.xuanze .renren input:checked'))
    	$('.xuanze .renren input:checkbox').prop('checked',true)
    		$('.xuanze .renji input:checkbox').prop('checked',false)
    		// isAi=true;	
    	})
     $(".xuanze  .renji input").on('click',function(){
    	$('.xuanze .renji input:checkbox').prop('checked',true)
    		$('.xuanze .renren input:checkbox').prop('checked',false)
    		isAi=false;	
    		// alert(isAi)
    	})
	$('.meau .lable-kaishi').on('click',function(){
		if($('.heidian').length==0){
			$fon.html('请选择游戏类型');
		$('.xuanze').slideDown(500);
		$('.queding').on('click',function(){
			if(isAi){
					$('.qipan').empty();
					       t=setTimeout(xiaoshi,200);
						   	$('.xuanze').slideUp(500);
						    $('<div class="wanjia"><span>玩家1</span><div class="tu"></div></div>').appendTo('.zhuozi')
						     $('<div class="wanjia2"><span></span><div class="tu"></div></div>').appendTo('.zhuozi')
						   	$('.wanjia2 span').html('玩家2')
						   	$('.wanjia').animate({top:100},2000);
						   	$('.wanjia2').animate({bottom:160},2000);
								      wuziqi();
								   // isAi=false;	


			}else{
					$('.qipan').empty();
					       t=setTimeout(xiaoshi,200);
						   	$('.xuanze').slideUp(500);
						   	$('<div class="wanjia"><span>玩家1</span><div class="tu"></div></div>').appendTo('.zhuozi')
						     $('<div class="wanjia2"><span></span><div class="tu"></div></div>').appendTo('.zhuozi')
						   	$('.wanjia').animate({top:100},2000);
						   	$('.wanjia2 span').html('电脑')
						   	$('.wanjia2').animate({bottom:160},2000);
						      wuziqi();
						   // isAi=true;	

			}
		})
		}else{
		     tishi();
             $fon.html('正在进行游戏，如需开始，请点击重新开始按钮');
              t=setTimeout(xiaoshi,2000);
		}
		
	})
	//重新开始
	$('.meau .lable-again').on('click',function(){
		$('.heng').empty();
		$('.shu').empty();			
		$('.moveqi').remove();
		$('.xianxingqi').remove();
		$('.wanjia').empty();
		$('.wanjia2').empty();
		$('.zhuozi .qipan').empty();
		$('.meau .lable-kaishi').trigger('click');
	})
   $('.meau .lable-jieshao').on('click',function(){
		$('.meau .jieshao').slideToggle(500);
	})
    //再来一次

    $('.meau .lable-tuichu').on('click',function(){
      window.close();
    })


})