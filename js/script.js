$(document).ready(function () {
    //Create ThumbSelect
    $('#select').ThumbSelect();

    //Event change item
    $('#select').ThumbSelect('change', function (value) {
        console.log("Item selected: " +  value);
    });
    
    //Get value
    //var value = $('#select').ThumbSelect('value');
});