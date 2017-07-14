/**
 * Created by hari on 6/12/17.
 */

//GLOBALVARIABLES
var sticyColor= "yellow";
var notesNumber = null;

$(document).ready(function(){
    //Select Color
    $("button").on('click',function(event){
        configureButton(this);
    });

    //Add Note
    $(".fa-plus").click(function(){
        addNotes();
    });

    //Delete Note
    $("ul").on("click", "#deletesticky", function(event){
        deleteNotes(this);
    });
});


    //Configure Color Button Function
    function configureButton(buffer){
            if (buffer.id==="cyan") {
                sticyColor= "cyan";
                cyanClick();
            }
            else if (buffer.id==="orange") {
                sticyColor= "orange";
                orangeClick();
            }
            else if (buffer.id==="pink") {
                sticyColor= "pink";
                pinkClick();
            }
            else if(buffer.id==="yellow") {
                sticyColor = "yellow";
            }
    }

    //Pick Notes color Function
    function  orangeClick(){
        $("input[name=stickyinput]").css("background-color", "orange");//orange color applied to the Notes
    }
    function  pinkClick(){
        $("input[name=stickyinput]").css("background-color", "pink");//pink color applied to the Notes
    }
    function  cyanClick(){
        $("input[name=stickyinput]").css("background-color", "rgb(0,255,255)");//Cyan color applied to the Notes
    }

    //Adding Notes Function
    function addNotes(){
        var newSticky = $("input[name='stickyinput']").val();
            notesNumber+=1;
            //create a new li and add to ul
            $("#boardNotes").append("<li class='post' id="+"notes"+notesNumber+"><span id='deletesticky'><i class='fa fa-trash-o'></i></span> "+newSticky+"  "+"</li>");
            $("#notes"+notesNumber).css("background-color",sticyColor);
            $("#sticky").val("");
            $("#sticky").css("background-color", "yellow");
            sticyColor="yellow";
    }

    //Delete Notes Function
    function deleteNotes(buffer){
            $(buffer).parent().remove();
    }