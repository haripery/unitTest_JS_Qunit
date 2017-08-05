console.log(' -----------------------------');
console.log('| UNIT TEST FOR POST IT NOTES |');
console.log(' -----------------------------');
//Loading index.html components
$('#qunit-dom-testing').load('../index.html #main-wrap',function(responseText, statusText, xhr)
{
        if(statusText === "success"){
            $.get( "../lib/main.css", function( data ) {
                $('head').append("<style>"+data+"</style>");
                runTests();                                           //Loading CSS File and Run QUnit Test function
            });
        }
        if(statusText === "error")
                console.log("An error occurred: " + xhr.status + " - " + xhr.statusText);
});
function runTests () {
    //Declaring variables
    var inputSticky;
    var post;
    //START OF THE TEST SUITE
    QUnit.module( "Module A:Build Notes",{                                                                              //Module A Test cases
        beforeEach: function () {
            inputSticky = $(".stickyclass");
        }
    });
        //Selecting Necessary Components
        QUnit.test( "Test case 1: Check Notes Empty", function( assert ) {
            assert.equal($('.post').length,1, "Notes empty" );                                                       // verifying whether the length of li(Notes) is zero
        });

        QUnit.test("Test Case 2: Default color of Post-it Notes",function (assert) {
            assert.equal(inputSticky.css('background-color'),'rgb(255, 255, 0)', "Default Color is Yellow" );           //Default sticky input value is Zero
        });

        QUnit.test("Test Case 3: Check the Placeholder Default value",function (assert) {
            var done = assert.async();                                                                                  //Implementing Async Function using Ajax Jquery get()
            $.get( "../index.html", function( data ) {
                var buffer =null;
                buffer = ($(data).find('#sticky').attr('placeholder'));
                assert.equal( buffer,'Add New Notes', "Default Placeholder value is correct" );
                done();
            });
        });
        QUnit.test("Test Case 4: Color Control System",function (assert) {
            assert.expect(3);
            orangeClick();                                                                                              //Validating Color Functions
            assert.equal(inputSticky.css('background-color'),'rgb(255, 165, 0)', "orange Function passed !" );
            pinkClick();
            assert.equal(inputSticky.css('background-color'),'rgb(255, 192, 203)', "Pink Function passed !" );
            cyanClick();
            assert.equal(inputSticky.css('background-color'),'rgb(0, 255, 255)', "Cyan Function passed !" );
        });
        QUnit.test("Test Case 5: Ensuring Button Functionality",function (assert) {
            //Validating Color Buttons
            assert.expect(3);
            var orange = $('#orange');
            var pink = $('#pink');
            var cyan = $('#cyan');
            orange.on( "click", function() {
            orangeClick();
            assert.equal(inputSticky.css('background-color'),'rgb(255, 165, 0)', "orange Button Working Fine" );
            });
            orange.trigger( "click" );
            pink.on( "click", function() {
            pinkClick();
            assert.equal(inputSticky.css('background-color'),'rgb(255, 192, 203)', "Pink Button Working Fine" );
            });
            pink.trigger( "click" );
            cyan.on( "click", function() {
            cyanClick();
            assert.equal(inputSticky.css('background-color'),'rgb(0, 255, 255)', "Cyan Button Working Fine" );
            });
            cyan.trigger( "click" );
        });
    QUnit.module( "Module B:Add Notes");
        QUnit.test("Test Case 6: Add Notes Test",function (assert) {
            addNotes();                                                                                                 //Module B: Adding Notes
            assert.equal($('.post').length,1, "1st Notes Added Successfully" );
            });
    QUnit.module( "Module C:Delete Notes");                                                                             //Module C: Delete Notes
        QUnit.test( "test case 6:Delete Functionality check", function( assert ) {
            assert.expect(2);
            addNotes();                                                                                                 //Adding Notes for Selection
            assert.equal($('.post').length,1, "Notes1 Added Successfully for Deletion" );
            deleteNotes('.post');                                                                                       //Deleting Notes
            assert.equal($('.post').length,0, "Notes1 Successfully deleted" );
        });

    //CONSOLE LOG CODE
    QUnit.begin(function( details ) {                                                                                   //Notify the total no. of tests to be done
        console.log( "TOTAL TEST AMOUNT:", details.totalTests ,'\n');
    });
    QUnit.moduleStart(function( details ) {                                                                             //Notify which test module is currently running
        console.log( "NOW RUNNING: ", details.name );
    });
    QUnit.moduleDone(function( details ) {                                                                              //Notify end of the module
    if (details.failed>0){
        console.log(' --------------------------------------------------------------------');
        console.log('| ABORTING UNIT TEST : TEST CASE FAILED : REMAINING TEST CASES SKIPPED |');
        console.log(' --------------------------------------------------------------------');
        QUnit.config.queue.length = 0;
    }
    else{
            console.log( "Finished running: ", details.name, "Failed/total: ", details.failed, details.total );
        }
    });

    QUnit.log(function( details ) {                                                                                     //Provides each and every assertion log
        console.log( "Log: ", details.result, details.message );
    });
    QUnit.log(function( details ) {                                                                                     //This code will intimate if there is any errors in Test Case in console
      if ( details.result ) {
        return;
      }
      var loc = details.module + ": " + details.name + ": ",
        output = "FAILED TEST DESCRIPTION: \n"+ loc + ( details.message ? details.message + ", " : "" );

      if ( details.actual ) {
        output += '\n'+"Expected: "+details.expected+'\n'+"Actual: "+details.actual;
      }
      if ( details.source ) {
        output += "\n" +"Location:\n"+details.source;
      }
      console.log( output );
    });
    QUnit.done(function( details ) {                                                                                    //Summary of the Test Suite
        console.log( 'SUMMARY:\n',"Total assertions: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
    });
}