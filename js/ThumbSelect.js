(function($) {
    var select;
    var callback_change = null;
    var multiple = false;

    var methods = {
        init : function(options){
            var isSelect = select.is("select"), 
            items = new Array(),
            id = select.attr('id');

            if (isSelect){
                var options = select.find('option').each(function(){
                    var option = $(this);
                    items.push({value:option.val(), content:option.html()});
                });

                select.replaceTag('<div>', true); 
                select.attr('id', id);
                select = $('#' + id);
                select.html('');

                var appends = '';
                for(var i = 0; i < items.length; i++){
                    var item = items[i];
                    appends += '<span class="ThumbSelect_item" data-selected="false" data-value="' + item.value + '">' + item.content + '</span>'
                }

                select.html(appends);
                $('.ThumbSelect_item').click(function(){
                    var item = $(this);
                    if (!multiple){
                        $('.ThumbSelect_item').attr('data-selected', 'false');
                        $('.ThumbSelect_item').removeClass('ThumbSelect_active');
                        $('.ThumbSelect_item').addClass('ThumbSelect_inactive');
                        if (item.attr('data-selected') == 'false'){
                            item.attr('data-selected', 'true');
                            item.removeClass('ThumbSelect_inactive');
                            item.addClass('ThumbSelect_active');
                            if (callback_change){
                                callback_change(item.attr('data-value'));    
                            }
                        }
                    } else {
                        $('.ThumbSelect_item').each(function(){
                            if ($(this).attr('data-selected') == 'false'){
                                $(this).addClass('ThumbSelect_inactive');
                            }
                        });

                        if (item.attr('data-selected') == 'false'){
                            item.attr('data-selected', 'true');
                            item.removeClass('ThumbSelect_inactive');
                            item.addClass('ThumbSelect_active');
                        } else {
                            item.attr('data-selected', 'false');
                            item.removeClass('ThumbSelect_active');
                            item.addClass('ThumbSelect_inactive');
                        }

                        if (callback_change){
                            var list = new Array();
                            $('.ThumbSelect_item').each(function(){
                                if ($(this).attr('data-selected') == 'true'){
                                    list.push($(this).attr('data-value'));
                                }
                            });
                            callback_change(list);
                        }
                    }
                });

            }else{
                console.error("jQuery.ThumbSelect - The element is not a select tag")
            }
        },
        value : function(){  
            return select.find('[data-selected="true"]').attr('data-value');
        }, 
        change : function(){},
        multiple : function(){}
    };

    $.fn.ThumbSelect = function(methodOrOptions, callback) {
        select = $(this);
        if (methods[methodOrOptions]) {
            if (methodOrOptions == 'change'){
                callback_change = callback;
            }

            if (methodOrOptions == 'multiple'){
                multiple = callback;
            }

            return methods[methodOrOptions].apply(this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            return methods.init.apply(this, arguments);            
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.ThumbSelect' );
        }    
    };
}(jQuery));

$.extend({
    replaceTag: function (currentElem, newTagObj, keepProps) {
        var $currentElem = $(currentElem);
        var i, $newTag = $(newTagObj).clone();
        if (keepProps) {
            newTag = $newTag[0];
            newTag.className = currentElem.className;
            newTag.id = currentElem.id;
            $.extend(newTag.classList, currentElem.classList);
            $.extend(newTag.attributes, currentElem.attributes);
        }
        $currentElem.wrapAll($newTag);
        $currentElem.contents().unwrap();
        return this;
    }
});

$.fn.extend({
    replaceTag: function (newTagObj, keepProps) {
        return this.each(function() {
            jQuery.replaceTag(this, newTagObj, keepProps);
        });
    }
});