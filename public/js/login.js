$(document).ready(function(){
	var email,pass;
	$("#submit").click(function(){
		console.log("submit");
		email=$("#email").val();
		pass=$("#password").val();
		/*
		* Perform some validation here.
		*/
		$.post("http://localhost:8080/login",{email:email,pass:pass},function(data){
			if(data==='admin')
			{
				window.location.href="/admin";
			}else if(data==='grad')
			{
				window.location.href="/grad";
			}
		});
	});


});

function login(){

	email=$("#email").val();
	pass=$("#password").val();
	/*
	* Perform some validation here.
	*/
	$.post("http://localhost:8080/login",{email:email,pass:pass},function(data){
		if(data==='admin')
		{
			window.location.href="/admin";
		}else if(data==='grad')
		{
			window.location.href="/grad";
		}
	});
}

function loginAdmin(){
	email="a@a.com";
	pass=$("#password").val();
	/*
	* Perform some validation here.
	*/
	$.post("http://localhost:8080/login",{email:email,pass:pass},function(data){
		if(data==='admin')
		{
			window.location.href="/admin";
		}else if(data==='grad')
		{
			window.location.href="/grad";
		}
	});

}
