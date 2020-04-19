//封装函数（随机颜色）
function randomColor(){
    var r=parseInt(Math.random()*256);
    var g=parseInt(Math.random()*256);
    var b=parseInt(Math.random()*256);
    var rgb="rgb("+r+","+g+","+b+")";
    return rgb;
}
