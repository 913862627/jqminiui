(function($){
    $.fn.dialog = function(cfg){

        cfg = $.extend({},cfg);
        var _this = this,
            tpl = '<div class="drag_handle">{{{title}}}</div><div id="body">{{{html}}}</div>';
        if(_this.attr("dlg")) return _this;
        _this.attr("dlg",true);
        _this.html(Mustache.render(tpl,{html:_this.html(),title:cfg.title||"对话框"}));
        _this.css({
            "z-index":1000,
            "postion":"absolute",
            "width":cfg.width || "400px",
            "height":cfg.height || "300px"


        })
        _this.find(".drag_handle").css({"cursor":"move"});
        var mousemove = function(ev){
            _this.offset({
                left:ev.data.start_x+ev.pageX-ev.data.ev_start_x,
                top:ev.data.start_y+ev.pageY-ev.data.ev_start_y
            })

        }

        _this.find(".drag_handle").mousedown(function(e){

            // 记录_this的初始位置
            // 记录e的位置
            // 作为参数传入到mousemove事件中
            var pos ={};
            pos.start_x = _this.offset().left;
            pos.start_y = _this.offset().top;
            pos.ev_start_x = e.pageX;
            pos.ev_start_y = e.pageY;

            $(window).on("mousemove",pos,mousemove);


        })
        _this.find(".drag_handle").mouseup(function(e){
            $(window).off("mousemove",mousemove);
        })

        return _this;


    }

})(jQuery)
