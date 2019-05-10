$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "query.php",
        dataType: "JSON",
        data: "action=select",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
              $("#delete_input").val(data[i][1]);
                $("#hidden_delete").val(data[i][0]);
              $("#update_input").val(data[i][1]);
              $("#hidden").val(data[i][0]);
              var temp=("<ul style='display: flex'><li style='list-style: none'><a style='font-size: 25px'>"+data[i][1]+"</a></li><li style='list-style: none;margin-left: 20px'><button onclick='update()' style='background: #f46e42;margin-right: 20px;padding: 0.8em 1.5em;color: #fff;font-weight: 400;border: none;outline: none;    cursor: pointer;font-size: 1em;    transition: 0.1s all;-webkit-transition: 0.1s all;-moz-transition: 0.1s all;-o-transition: 0.1s all;'>Update</button></li><li style='list-style: none;margin-left: 20px'><button style='background: #f46e42;margin-right: 20px;padding: 0.8em 1.5em;color: #fff;font-weight: 400;border: none;outline: none;    cursor: pointer;font-size: 1em;    transition: 0.1s all;-webkit-transition: 0.1s all;-moz-transition: 0.1s all;-o-transition: 0.1s all;' onclick='del()'>Delete</button></li></ul>");
              var temp2=("<ul style='display: flex'><li style='list-style: none'><a style='font-size: 15px;margin-right: 20px'>Content:</a></li><li style='list-style: none'>"+data[i][1]+"</li><li style='list-style: none;margin-left: 20px'></li></ul>");
                $("#div").append(temp);
                $("#response").append(temp2);

            }
        }
    });
});

$("#insert").click(function (e) {
    e.preventDefault();
    var content = $("#content").val();
    if (content !== ""){
    $.ajax({
        type: "POST",
        url: "query.php",
        dataType: "JSON",
        data: "content=" + content + '&action=insert',
        success: function (data) {
            if(data="Success insert data"){
                location.reload();
            }else {
                $("#div").append("Duplicate Text");
            }
        }
    })
    }
});

$(".divs").hide();
$(".dives").hide();
function update() {
    $(".divs").toggle();
}
$("#update").click(function (e) {
    e.preventDefault();
    var id = $("#hidden").val();
    var content2 = $("#update_input").val();
    if (content2 !== "") {
        $.ajax({
            type: "POST",
            url: "query.php",
            data: "id=" + id + "&content2=" + content2 + '&action=update',
            success: function () {
                location.reload();
            }
        })
    }
});
function del() {
    $(".dives").toggle();
$("#delete_no").click(function () {
    $(".dives").hide();
})
}
$("#delete_yes").click(function (e) {
    e.preventDefault();
    var hidden_id = $("#hidden_delete").val();
    $.ajax({
        type: "POST",
        url: "query.php",
        data: "hidden_id=" + hidden_id  + '&action=delete',
        success: function () {
            location.reload();
        }
    })
});
