var i = 0;
var string = "Pink Floyd";

var firstClick = false;

string = string.split("");
addLetter(string[i]);
i++;

/*clearHashListener();
console.log("listner should be cleared");
window.location.hash = "search";
setHashChangeListener();*/

function addLetter(letter){
	//console.log(letter);
	var txt = "";
	for(var u=0;u<=i;u++){
		txt += string[u];
	}
	$("#searchBar").val(txt);
}

var interval = setInterval(function(){
	if(string[i] != undefined){
		addLetter(string[i]);
		i++;
		if(i >= string.length){
			clearInterval(interval);
		}
	}
}, 200);

$("#searchBar").click(function(){
	if(!firstClick){
		$(this).val("");
		firstClick = true;
	}
});