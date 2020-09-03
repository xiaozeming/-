 
	//获取绘制工具

	var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    /*ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(450,450);
    ctx.stroke();
    */
 
    var snake = [];//定义一条蛇，画蛇的身体
    var snakeCount = 6;//初始化蛇的长度
	var foodx = 0;
	var foody = 0;
    var togo = 0;
	function drawtable() {//画地图的函数
		
    	for(var i = 0; i < 60; i++) {//画竖线
    		ctx.strokeStyle="black";
    		ctx.beginPath();
    		ctx.moveTo(15*i,0);
    		ctx.lineTo(15*i,600);
    		ctx.closePath();
    		ctx.stroke();
		}
		
        for(var j=0; j<40; j++) {//画横线
    		ctx.strokeStyle="black";
    		ctx.beginPath();
    		ctx.moveTo(0,15*j);
    		ctx.lineTo(600,15*j);
    		ctx.closePath();
    		ctx.stroke();
    	}
    	
    	for(var k = 0; k < snakeCount; k++) {
			
			ctx.fillStyle = "black";
			if (k == snakeCount-1) {
				ctx.fillStyle = "red"; //蛇头的颜色与身体区分开
			}
			ctx.fillRect(snake[k].x,snake[k].y,15,15); //画蛇的身体
			
		}
		//绘制食物		
    	ctx.fillStyle = "black";
	    ctx.fillRect(foodx,foody,15,15);
	    ctx.fill();
    	
    }
 
    
    function start() { //游戏初始化
    	//var snake =[];//定义一条蛇，画蛇的身体
        //var snakeCount = 6;//初始化蛇的长度
		
		for(var k = 0; k < snakeCount; k++) {  //定义蛇的坐标 
    			snake[k] = {x:k*15,y:0};	
            }
			
		drawtable();
        addfood();
 
    }
 
	function addfood() { //食物掉落
		
		//食物坐标
		foodx = Math.floor(Math.random()*40)*15; 
		foody = Math.floor(Math.random()*40)*15;
		
		for (var k = 0;k < snake; k++){
			if (foodx == snake[k].x && foody == sanke[k].y) {//防止产生的随机食物落在蛇身上	
			addfood();
			}
		}
	
	}	
    		
   function move() { 
	   switch (togo) {
		   case 1: snake.push({x:snake[snakeCount-1].x-15,y:snake[snakeCount-1].y}); break;//向左走
		   case 2: snake.push({x:snake[snakeCount-1].x,y:snake[snakeCount-1].y-15}); break;//向上走
		   case 3: snake.push({x:snake[snakeCount-1].x+15,y:snake[snakeCount-1].y}); break;//向右走
		   case 4: snake.push({x:snake[snakeCount-1].x,y:snake[snakeCount-1].y+15}); break;//向下走
		   case 5: snake.push({x:snake[snakeCount-1].x-15,y:snake[snakeCount-1].y-15}); break;//左上
		   case 6: snake.push({x:snake[snakeCount-1].x+15,y:snake[snakeCount-1].y+15}); break;//右下
		   case 7: snake.push({x:snake[snakeCount-1].x-15,y:snake[snakeCount-1].y+15}); break;//左下
		   case 8: snake.push({x:snake[snakeCount-1].x+15,y:snake[snakeCount-1].y-15}); break;//右上
		   default: snake.push({x:snake[snakeCount-1].x+15,y:snake[snakeCount-1].y});//默认
		}
		snake.shift();//删除数组第一个元素
		ctx.clearRect(0,0,600,600);//清除画布重新绘制
		isEat();
		isDead();
		drawtable();
	} 			
   
	function keydown(e) {
	   switch(e.keyCode) {
		   case 65: togo=1; break;
		   case 87: togo=2; break;
		   case 68: togo=3; break;
		   case 83: togo=4; break;
		   case 81: togo=5; break;
		   case 67: togo=6; break;
		   case 90: togo=7; break;
		   case 69: togo=8; break;
		}
   }
   
    function isEat() {//吃到食物后长度加1
	
		if(snake[snakeCount-1].x == foodx && snake[snakeCount-1].y == foody){
			addfood();
			snakeCount++;
			snake.unshift({x:-15,y:-15});
		}
    }
   
    function isDead() {
		if (snake[snakeCount-1].x>c.width-15||snake[snakeCount-1].y>c.height-15||snake[snakeCount-1].x<0||snake[snakeCount-1].y<0) {
		   alert("GAME OVER!!!");
		   window.location.reload();
		}
    }
   
    document.onkeydown = function(e) {
		keydown(e); 
	} 
	window.onload = function() {//调用函数
		start();
		setInterval(move,100);//蛇的移动速度
		drawtable();
	}
           
 

