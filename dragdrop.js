/**
 * Created by coney on 13-10-22.
 */
/**
 * Created by coney on 13-10-22.
 * cfg = {drop_class:"thedrop",
 * callback:function(obj,e){},
 * hover_class:}
 */
(function($){
    $.fn.dragdrop = function(cfg){
        var _this = this;
        cfg = $.extend({drop_class:"drop",hover_class:"hover"},cfg)

        var mousemove = function(ev){
                ev.data.dragging.offset({
                    left:ev.pageX+1,
                    top:ev.pageY+1
                })

            },
            mouseup = function(e){
                if($.isFunction(e.data && e.data.callback)){
                    e.data.callback($(this),e);
                }

            },
            mouseup_win = function(e){
                e.data.dragging.remove();
                $(window).off("mousemove",mousemove);
                $(window).off("mouseup",mouseup_win);
                e.data.drop_items.off("mouseup",mouseup);
                e.data.drop_items.off("mouseleave", mouseleave);
                e.data.drop_items.off("mouseover", mouseover);
            },
            mouseover = function(e){
                if(e.data && e.data.dragging){
                    $(this).addClass(cfg.hover_class);
                }

            },
            mouseleave = function(e){
                if(e.data && e.data.dragging){
                    $(this).removeClass(cfg.hover_class);
                }
            };

        _this.mousedown(function(e){
            var d ={};
            d.src = $(this);
            d.dragging = $("<div></div>");
            d.dragging.html(d.src.html());
            d.dragging.appendTo($("body"));
            d.dragging.css({width:cfg.width || "200px",position:"absolute","z-index":1000});

            d.callback = cfg.callback || false;

            d.drop_items = $("."+cfg.drop_class);
            d.drop_items.on("mouseup",d, mouseup);
            d.drop_items.on("mouseleave",d, mouseleave);
            d.drop_items.on("mouseover",d, mouseover);
            $(window).on("mousemove",d, mousemove);
            $(window).on("mouseup",d, mouseup_win);
            return false;

        })



    }
})();
