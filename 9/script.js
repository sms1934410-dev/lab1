$(function() {

    var logo1 = $("#logo");
    var logo2 = $("img[id='logo']");

    logo1.hide(2000).show(2000);

    $("img[src*='moto']").not(":first").hide(5000);
    $("img[id='moto2']").show(500);

    function changeAttr(id, attr, value) {
        $("#" + id).attr(attr, value);
    }

    changeAttr("moto1", "width", "500");

    $("img[id='moto2']")
        .css({
            "border-style": "solid",
            "border-color": "#333333",
            "border-width": "1px"
        })
        .animate({
            "border-width": "5px"
        }, 5000)
        .fadeOut(5000);

    $("body")
        .append("<p id='newparagraph'>Новый абзац</p>")
        .find("#newparagraph")
        .css({
            "background": "black",
            "color": "white"
        });
});