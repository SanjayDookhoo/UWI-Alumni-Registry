function a(){
	var email,pass;
	console.log("test");
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
