var classJson;
var classIndex = 0;
var slideShowTimer = 10000;
var timer;


$(document).ready(function() {

     $.ajax({
       url: 'https://raw.githubusercontent.com/devjanaprime/2.4-jQueryAjaxJSON/master/students.json',
       dataType: 'json',
       success: function( data ){
          console.log( 'in ajax success' );
          console.log( data );
          classJson = data;
          docReady();
         }, // end success
       statusCode: {
          404: function(){
             alert( 'error connecting to server' );
          } // end 404
         } // end statusCode
       }); // end ajax  object

});



function docReady() {

  createClassmate();

}

function createClassmate() {
  console.log("Classmate Created!");

  $('#profile').append("<div id='newDiv'><img id='imgClassmate' class='img-responsive'><p id='infoClassmate'></p><p id='currentClassmate'></p><button id='previousClassmate'>Previous Classmate</button><button id='nextClassmate'>Next Classmate</button></div>");
  $('#imgClassmate').ready().css("background-image", "url(Nu/" + classJson.students[classIndex].first_name + classJson.students[classIndex].last_name + ".jpg)");
  $('#infoClassmate').text(classJson.students[classIndex].first_name + " " + classJson.students[classIndex].last_name);
  $('#currentClassmate').text("(" + Number(classIndex + 1) + "/20)");

  timer = setTimeout(function() {
    console.log("Timer End");
    if (classIndex == classJson.students.length-1) {classIndex = -1;}
    $('#newDiv').remove();
    classIndex++;
    createClassmate();
  }, slideShowTimer);

  $('#previousClassmate').click(function() {

    $('#imgClassmate').fadeOut(1000, function() {
      if (classIndex == 0) {classIndex = classJson.students.length;}
      $('#newDiv').remove();
      classIndex--;
      clearTimeout(timer);
      createClassmate();
    });

  });

  $('#nextClassmate').click(function() {

    $('#imgClassmate').fadeOut(1000, function() {
      if (classIndex == classJson.students.length-1) {classIndex = -1;}
      $('#newDiv').remove();
      classIndex++;
      clearTimeout(timer);
      createClassmate();

    });

  });
}
