var columnCount = 3;
var marginPercentage = 2;

var dragging = false;

function initIcons(){
	$(".icons").each(function(i){
		console.log(i);
		$(this).height($(this).width());
		$(this).animate({
			"left": ((i%columnCount) * $("body").width()/columnCount) + "px",
			"top": (Math.floor(i/columnCount) * ($(this).height() + $("body").height() * (marginPercentage/100))) + "px"
		}, 500);

		$(this).attr("data-count", i);

		console.log($(this).css("top"));
	});


	$(".icons").draggable({
		start: function(e){
			dragging = true;
			console.log(e);

			$("#dragBox").css({
				"background": "#e0e0e0"
			});
		},
		drag: function(e){
			if(mouseInsideDragBox(e.clientX, e.clientY)){
				$("#dragBox").css({
					"background": "#a1a1a1"
				});
				$("#dragBox").stop().animate({
					"borderRadius": "10px"
				},250,"easeOutExpo");
			}
			else{
				$("#dragBox").css({
					"background": "#e0e0e0"
				});
				$("#dragBox").stop().animate({
					"borderRadius": map(distance(e.clientX,e.clientY,$(document).width()/2, $(document).height()), 0, $(document).height(), 20, 90)
				},150,"easeOutExpo");
			}
		},
		stop: function(e){
			dragging = false;

			if(mouseInsideDragBox(e.clientX, e.clientY)){
				$(this).animate({
					width: $(document).height()*1.5,
					height: "150%",
					borderRadius: "50%",
					left: ($(document).width()/2) - ($(document).height()*1.5)/2,
					top: ($(document).height()/2) - ($(document).height()*1.5)/2
				}, {
					duration: 1000,
					queue: false,
					easing: "easeInOutExpo"
				});

				var selected = this;
				$('body').children().fadeOut({
					duration: 500,
					easing: "easeInOutCubic"
				}); //hide all nodes directly under the body
				$(this).appendTo('body');			
			}
			else{
				$(this).animate({
					"left": (($(this).attr("data-count")%columnCount) * $("body").width()/columnCount) + "px",
					"top": (Math.floor($(this).attr("data-count")/columnCount) * ($(this).height() + $("body").height() * (marginPercentage/100))) + "px"
				}, 500);;

				$("#dragBox").css({
					"background": "rgba(255,255,255,0)"
				});
				$("#dragBox").stop().animate({
					"borderRadius": "90px"
				},250, "easeOutExpo");
			}
		}
	});
}

function mouseInsideDragBox(mouseX, mouseY){
	var dragBoxX = $("#dragBox").offset().left;
	var dragBoxY = $("#dragBox").offset().top;
	var dragBoxWidth = $("#dragBox").width();
	var dragBoxHeight = $("#dragBox").height();
	return mouseX >= dragBoxX && mouseX <= dragBoxX + dragBoxWidth && mouseY >= dragBoxY && mouseY <= dragBoxY + dragBoxHeight;
}

function distance(xa,ya,xb,yb){
	return Math.sqrt(Math.pow(xa-xb, 2) + Math.pow(ya-yb,2));
}

function map(val,amin,amax,bmin,bmax){
	return (val-amin)/(amax-amin) * (bmax-bmin) + bmin;
}

initIcons();