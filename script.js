var classJson;
var classIndex = 0;


$(document).ready(function() {

  // $('#getJSONajax' ).click( function(){
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
  // }); // end click getJSONAjax button



});



function docReady() {

  createClassmate();

}

function createClassmate() {
  console.log("Classmate Created!");
  $('#profiles').append("<div><img style='height:500px; width: 375px' id='imgClassmate'><p id='infoClassmate'></p><button id='previousClassmate'>Previous Classmate</button><button id='nextClassmate'>Next Classmate</button></div>");
  $('#imgClassmate').ready().css("background-image", "url('http://www.fillmurray.com/375/500')");
  $('#infoClassmate').text(classJson.students[classIndex].first_name + " " + classJson.students[classIndex].last_name);

  $('#previousClassmate').click(function() {
    if (classIndex == 0) {return;}
    $(this).parent().remove();
    classIndex--;
    createClassmate();
  });

  $('#nextClassmate').click(function() {
    if (classIndex == classJson.students.length-1) {return;}
    $(this).parent().remove();
    classIndex++;
    createClassmate();
  });
}
