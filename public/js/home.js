var columnCount = 3;
var marginPercentage = 2;

var dragging = false;

function initCircles(){
	$(".circle").each(function(i){
		console.log(i);
		$(this).height($(this).width());
		$(this).animate({
			"left": ((i%columnCount) * $("body").width()/columnCount) + "px",
			"top": (Math.floor(i/columnCount) * ($(this).height() + $("body").height() * (marginPercentage/100))) + "px"
		}, 500);

		$(this).attr("data-count", i);

		console.log($(this).css("top"));
	});


	$(".circle").draggable({
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
					"borderRadius": "60px"
				},250,"easeOutExpo");
			}
		},
		stop: function(e){
			dragging = false;
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
	});
}

function mouseInsideDragBox(mouseX, mouseY){
	var dragBoxX = $("#dragBox").offset().left;
	var dragBoxY = $("#dragBox").offset().top;
	var dragBoxWidth = $("#dragBox").width();
	var dragBoxHeight = $("#dragBox").height();
	return mouseX >= dragBoxX && mouseX <= dragBoxX + dragBoxWidth && mouseY >= dragBoxY && mouseY <= dragBoxY + dragBoxHeight;
}

initCircles();