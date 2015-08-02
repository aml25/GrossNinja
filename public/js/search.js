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
	$("#searchBar").val($("#searchBar").val() + letter);
}

var interval = setInterval(function(){
	addLetter(string[i]);
	i++;
	if(i >= string.length){
		clearInterval(interval);
	}
}, 100);

$("#searchBar").click(function(){
	if(!firstClick){
		$(this).val("");
		firstClick = true;
	}
});