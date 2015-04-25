$(document).ready(function () {
    //Create ThumbSelect
    $('#select').ThumbSelect();

    //Select multiple items
    //$('#select').ThumbSelect('multiple', true);

    //Event change item
    $('#select').ThumbSelect('change', function(value) {
        console.log("Item selected: " +  value);
    });
    
    //Get value
    //var value = $('#select').ThumbSelect('value');
});