/**
 * Created by coney on 13-10-19.
 */
(function($){
    $.fn.popover = function(cfg){
        cfg = $.extend({pos:"buttom",klass:"popover"},cfg);
        var _this = this;
        if(!_this.attr("popover")){
            _this.attr("popover",true);

        }else{
            return;
        }
        var _id = "zpopover_" + Date.now();
        $('<div id="'+_id+'" class="'+cfg.klass+'">popover</div>').appendTo($("body"));
        var pop = $("#"+_id);
        pop.mouseleave(function(){
            $(this).hide();
        });


        var t = _this.offset().top,
            l = _this.offset().left;

        _this.mouseenter(function(){
            pop.show();

        })
        if(!cfg || !cfg.pos || cfg.pos=="bottom"){
            pop.offset({top:t+_this.height()+1,left:l});

        }else if(cfg.pos=="left"){

            pop.offset({top:t-1,left:l-pop.width()-1});

        }else if(cfg.pos=="right"){
            pop.offset({top:t,left:l+_this.width()+1});

        }else if(cfg.pos=="top"){
            pop.offset({top:t-pop.height()-1,left:l});

        }
        return _this;

    }
})();
