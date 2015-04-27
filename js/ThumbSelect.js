(function($) {

    var selects = new Object();
    var tag = null;

    var methods = {
        init : function(options){
            var isSelect = tag.is("select"), 
            items = new Array(),
            id = tag.attr('id');

            var select = {
                id:null,
                tag:null,
                callback_change:null,
                multiple:false,
                selected:false    
            };

            if (isSelect){
                select.tag = tag;
                select.id = id;
                selects[id] = select;
                var options = selects[id].tag.find('option').each(function(){
                    var option = $(this);
                    items.push({value:option.val(), content:option.html()});
                });

                selects[id].tag.replaceTag('<div>', true); 
                selects[id].tag.attr('id', id);
                selects[id].tag = $('#' + id);
                selects[id].tag.html('');

                var appends = '';
                for(var i = 0; i < items.length; i++){
                    var item = items[i];
                    appends += '<span class="ThumbSelect_item" data-id="' + id + '" data-selected="false" data-value="' + item.value + '">' + item.content + '</span>'
                }

                selects[id].tag.html(appends);
                selects[id].tag.find('.ThumbSelect_item').click(function(){
                    var item = $(this);
                    var item_id = $(this).attr('data-id');
                    
                    if (!selects[item_id].multiple){
                        selects[item_id].tag.find('.ThumbSelect_item').attr('data-selected', 'false');
                        selects[item_id].tag.find('.ThumbSelect_item').removeClass('ThumbSelect_active');
                        selects[item_id].tag.find('.ThumbSelect_item').addClass('ThumbSelect_inactive');
                        if (item.attr('data-selected') == 'false'){
                            item.attr('data-selected', 'true');
                            item.removeClass('ThumbSelect_inactive');
                            item.addClass('ThumbSelect_active');
                            if (selects[item_id].callback_change){
                                selects[item_id].callback_change(item.attr('data-value'));    
                            }
                        }
                    } else {
                        selects[item_id].tag.find('.ThumbSelect_item').each(function(){
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

                        if (selects[item_id].callback_change){
                            var list = new Array();
                            selects[id].tag.find('.ThumbSelect_item').each(function(){
                                if ($(this).attr('data-selected') == 'true'){
                                    list.push($(this).attr('data-value'));
                                }
                            });
                            selects[item_id].callback_change(list);
                        }
                    }
                });

            }else{
                console.error("jQuery.ThumbSelect - The element is not a select tag")
            }
        },
        value : function(){  
            return tag.find('[data-selected="true"]').attr('data-value');
        }, 
        change : function(){},
        multiple : function(){},
        select : function(){
            id = tag.attr('id');
            if (selects[id].selected && Array.isArray(selects[id].selected) && selects[id].selected.length > 0){
                selects[id].tag.find('.ThumbSelect_item').removeClass('ThumbSelect_active');
                selects[id].tag.find('.ThumbSelect_item').addClass('ThumbSelect_inactive');
                for (var i = 0; i < selected.length; i++){
                    selects[id].tag.find('.ThumbSelect_item').each(function(){
                        if ($(this).attr('data-value') == selected[i]){
                            $(this).attr('data-selected', 'true');
                            $(this).removeClass('ThumbSelect_inactive');
                            $(this).addClass('ThumbSelect_active');
                        }
                    });    
                }
            }
        }
    };

    $.fn.ThumbSelect = function(methodOrOptions, option) {
        tag = $(this);
        id = tag.attr('id');
        if (methods[methodOrOptions]) {
            if (methodOrOptions == 'change'){
                selects[id].callback_change = option;
            } else if (methodOrOptions == 'multiple'){
                selects[id].multiple = option;
            } else if (methodOrOptions == 'select'){
                selects[id].selected = option;
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