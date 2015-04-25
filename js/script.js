$(document).ready(function () {
    //Create ThumbSelect
    $('#select').ThumbSelect();

    //Select multiple items
    //$('#select').ThumbSelect('multiple', true);

    //Select items previously
    //$('#select').ThumbSelect('select', ["Linux"]); //Single select
    //$('#select').ThumbSelect('select', ["Linux", "OSX"]); //Multiple select

    //Event change item
    $('#select').ThumbSelect('change', function(value) {
        console.log("Item selected: " +  value);
    });
    
    //Get value
    //var value = $('#select').ThumbSelect('value');
});