/*clearHashListener();
window.location.hash = "login";
setHashChangeListener();*/

//When all the images are ready...
$("img").ready(function(){ //a hack for now to center everything
	setTimeout(centerForm, 200);
});

$(window).resize(function() {
	centerForm();
});

function centerForm(){
	var loginFormContainer = $(".loginFormContainer");

	loginFormContainer.animate({
		"opacity": "1"
	}, 250);

	loginFormContainer.css({
		"top": $(window).height()/2 - loginFormContainer.outerHeight()/2,
		"left": $(window).width()/2 - loginFormContainer.width()/2
	});
}

function formSubmit(){
	$(".loginFormContainer").fadeTo(250, 0.25);
	$("input").attr("disabled","true");

	var email = $("input[type=text]").val();
	var password = $("input[type=password]").val();

	request("/login", { email: email, password: password }, function(data){
		if(data.status == true){
			//switchView

			$(".loginFormContainer").fadeOut(240, function(){
				window.location.hash = "search";
			});


		}
		else{
			$(".loginFormContainer").stop().fadeIn();
			$("input").removeAttr("disabled");
			$("input").val("");
			$(".error").fadeIn();
		}
	});
}

$('input:first').on("keydown",function(event){
	if (event.keyCode == 13) {
		//you got enter i.e "GO" Btn
		$(this).next().focus();
	}
});
$('input:first').next().on("keydown",function(event){
	if (event.keyCode == 13) {
		//you got enter i.e "GO" Btn
		formSubmit();
	}
});

$("input").on("keydown", function(event){
	$(".error").fadeOut();
});