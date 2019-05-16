//connect to server
function auth(){
    
    let user = JSON.stringify({ token: document.cookie});
  console.log(user)
    let request = new XMLHttpRequest();
    request.open("POST", '/userdata', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        var resp = request.response//.substring(1, request.response.length - 1);
        console.log(resp)
        
        var resp = JSON.parse(resp)
        
        document.querySelector(".user-name").innerHTML = resp.uname;
        //document.querySelector(".btn-logout").style ='display:block';
        });
    request.send(user);
}
function clearCookies(){
    window.location.href ="/";
    document.cookie = "token=;";
}