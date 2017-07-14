QUnit.begin(function( details ) {
    console.log( "Test amount:", details.totalTests );
});
QUnit.module( "Module A:Build Notes");
    QUnit.test( "Test case 1: Check Notes Empty", function( assert ) {
        var list= $('.post').length;
        console.log(list);
        assert.equal( list,0, "Notes empty" );
    });
    QUnit.test("Test Case 2: Default color of Post-it Notes",function (assert) {
        assert.equal( sticyColor,'yellow', "Default Color is Yellow" );
    });
    QUnit.test("Test Case 3: Check the Placeholder Default value",function (assert) {
        assert.equal( $('#sticky').attr('placeholder'),'Add New Notes', "Default Placeholder value is correct" );
    });
    QUnit.test("Test Case 4: Color Control System",function (assert) {
        assert.expect(3);
        orangeClick();
        assert.equal( $("input[name=stickyinput]").css('background-color'),'rgb(255, 165, 0)', "orange Function passed !" );
        pinkClick();
        assert.equal( $("input[name=stickyinput]").css('background-color'),'rgb(255, 192, 203)', "Pink Function passed !" );
        cyanClick();
        assert.equal( $("input[name=stickyinput]").css('background-color'),'rgb(0, 255, 255)', "Cyan Function passed !" );
    });
    QUnit.test("Test Case 5: Ensuring Button Functionality",function (assert) {
        assert.expect(3);
        $('#orange').on( "click", function() {
	    orangeClick();
	    assert.equal( $("input[name=stickyinput]").css('background-color'),'rgb(255, 165, 0)', "orange Button Working Fine" );
        });
        $('#orange').trigger( "click" );
        $('#pink').on( "click", function() {
	    pinkClick();
	    assert.equal( $("input[name=stickyinput]").css('background-color'),'rgb(255, 192, 203)', "Pink Button Working Fine" );
        });
        $('#pink').trigger( "click" );
        $('#cyan').on( "click", function() {
	    cyanClick();
	    assert.equal( $("input[name=stickyinput]").css('background-color'),'rgb(0, 255, 255)', "Cyan Button Working Fine" );
        });
        $('#cyan').trigger( "click" );
    });

QUnit.module( "Module B:Add Notes");
QUnit.test("Test Case 6: Add Notes Test",function (assert) {
        //assert.expect(1);
        assert.expect(2);
        addNotes();
        assert.equal($('.post').length,1, "1st Notes Added Successfully" );
        addNotes();
        assert.equal($('.post').length,2, "2nd Notes Added Successfully" );
    });

QUnit.module( "Module C:Delete Notes" );
QUnit.test( "test case 6:Delete Functionality check", function( assert ) {
    assert.expect(2);
    addNotes();
    console.log($('.post'));
    assert.equal($('.post').length,1, "Notes1 Added Successfully for Deletion" );
    deleteNotes('#deletesticky');
    assert.equal($('.post').length,0, "Notes1 Successfully deleted" );
});
QUnit.done(function( details ) {
    console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
});