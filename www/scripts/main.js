window.onload = function() {
    document.getElementById("tweet").style.visibility="hidden";
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = ( '00' + time.getMinutes() ).slice( -2 );
    if (hours < 12) {
        var ampm = "午前";
    } else {
        var ampm = "午後";
    }
    if (hours >= 12) {
        hours -= 12;
    }
    var displayTime = ampm + hours + ":" + minutes + "・" + year + "年" + month + "月" + date + "日";
    document.getElementById("time").innerHTML = displayTime;
    const url = axios.get("https://api.giratina.net/v1/raika");
    url.then(function(response) {
        document.getElementById("tweet-text").innerHTML = response.data.text;
        document.getElementById("tweet").style.visibility="visible";
    }
    )   
}
const share = document.getElementById("share");
const dot = document.getElementById("dot");
function twitter_share(){
    const url = "https://twitter.com/intent/tweet?text=" + document.getElementById("tweet-text").innerHTML+ "%20%0a" + "https://raika.giratina.net";
    window.open(url, '_blank');
}
function raika(){
    const url = "https://twitter.com/M_aaruaika";
    window.open(url, '_blank');
}
