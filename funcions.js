function carregaDades(json) {

    for (var i = 0; i < json.webs.length; i++) {

        if(json.webs[i].subMenu == ""){

            var pag = $("<li>");
            var enllas = $("<a/>");
            enllas.text(json.webs[i].nom);
            enllas.attr("href", json.webs[i].url);
            enllas.appendTo(pag);
            pag.appendTo("#menu");

        }else{
            var menuDesp = $("<li>");
            menuDesp.addClass("dropdown");
            var nom = $("<a>");
            nom.text(json.webs[i].nom + " +");
            nom.attr("href", "#");
            nom.addClass("dropdown-toggle");
            nom.bind("click", function() {$('.dropdown-menu').toggle();});
            var subMenu = $("<ul>");
            subMenu.addClass("dropdown-menu");
            var subs = json.webs[i].subMenu;
            $.each(eval(subs), function( key, value ) {
                var entrada = $("<li>");
                var textEntrada = $("<a>");
                textEntrada.text(key);
                textEntrada.attr("href", value);
                textEntrada.appendTo(entrada);
                entrada.appendTo(subMenu);
            });

            nom.appendTo(menuDesp);
            subMenu.appendTo(menuDesp);
            menuDesp.appendTo("#menu");
        }
    };

    for (var i = 0; i < json.employees.length; i++) {
        console.log("empleat: " + i);
        var empleat = $("<li>");
        empleat.attr("id", i);
        empleat.addClass("slide");
        empleat.css('background-image', 'url(' + json.employees[i].pic + ')');
        var nom =  $("<h3>");
        nom.text(json.employees[i].firstName + " " + json.employees[i].lastName);
        var descripcio = $("<p>");
        descripcio.text(json.employees[i].titular);
        descripcio.appendTo(empleat);
        nom.appendTo(empleat);
        empleat.appendTo("#emp");
        Stotal+=1;
        if (i!=0) {
            empleat.hide();
        };

        var noticia = $("<p>");
        noticia.attr("id", "n" + i);
        noticia.text(json.employees[i].noticia);
        noticia.appendTo("#noticies");
        noticia.hide();
    };

}

function main() {

    var SlidActiu = 0;
    Stotal = -1; //al no tenir "var" la variable es crea com a global
    var primera = false;
    var postNum = 0;

    $.ajax({

        // The URL for the request
        url: "dades.json",

        // The data to send (will be converted to a query string)
        data: {
            id: 123
        },

        // Whether this is a POST or GET request
        type: "GET",

        // The type of data we expect back
        dataType: "json",

        // Code to run if the request succeeds;
        // the response is passed to the function
        success: function(json) {
            carregaDades(json);
        },

        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: function(xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        },

        // Code to run regardless of success or failure
        complete: function(xhr, status) {
            console.log("The request is complete!");
        }
    });

    $('#anarDreta').on('click', function() {
        $("#n" + SlidActiu.toString()).slideUp(600);
        $('#' + SlidActiu.toString()).fadeOut(600);
        if(SlidActiu<Stotal){
            SlidActiu+=1;
            $("#" + SlidActiu.toString()).fadeIn(600);
        }else{
            SlidActiu=0;
            $("#" + SlidActiu.toString()).fadeIn(600);
        }
    });

    $('#anarEsquerra').on('click', function() {
        $("#n" + SlidActiu.toString()).slideUp(600);
        $('#' + SlidActiu.toString()).fadeOut(600);
        if(SlidActiu!=0){
            SlidActiu-=1;
            $("#" + SlidActiu.toString()).fadeIn(600);
        }else{
            SlidActiu=Stotal;
            $("#" + SlidActiu.toString()).fadeIn(600);
        }
        $("#n" + SlidActiu.toString()).slideUp(600);
    });

    $("#emp").on("click", function(){
        if (primera) {
            $("#n" + SlidActiu.toString()).slideDown(600);
        }else{
            $("#n" + SlidActiu.toString()).slideToggle(600);
        };
    });

    $("#btnGuardar").on("click", function(){
        if($("#entrada").val()!=""){
            var item = $("<li>");
            var text = $("<p>");
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            text.text(time + " - " + $("#entrada").val());
            $("#entrada").val("");
            text.appendTo(item);
            if(postNum % 2 != 1){
                item.addClass("parell");
            }
            item.attr("id", "postNum" + postNum);
            item.appendTo("#llistaGuardat");
            postNum++;
        }
    });
};


$(document).ready(main);