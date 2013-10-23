/**
 * Created with JetBrains WebStorm.
 * User: progoney
 * Date: 13-9-16
 * Time: 下午6:05
 * To change this template use File | Settings | File Templates.
 *
 *
 * Modified with JetBrains WebStorm
 * User:ty4z2008
 * Date:13-10-16
 * Time:
 * modified : toolbar position
 */
(function($){
    var _paste = function(html, selectPastedContent) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // only relatively recently standardized and is not supported in
                // some browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                var firstNode = frag.firstChild;
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    if (selectPastedContent) {
                        range.setStartBefore(firstNode);
                    } else {
                        range.collapse(true);
                    }
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if ( (sel = document.selection) && sel.type != "Control") {
            // IE < 9
            var originalRange = sel.createRange();
            originalRange.collapse(true);
            sel.createRange().pasteHTML(html);
            var range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
        }
    };



    $.fn.editable = function(cfg){
        var _this = this;
        if(cfg && cfg.autosave){

        }
        _this.start = function(){
            _this.find("#editor").attr("contenteditable",true);
            _this.find("#toolbar").show();
        };

        _this.stop = function(){
            _this.find("#editor").attr("contenteditable",false);
            _this.find("#toolbar").hide();

        };

        _this.set_html = function(htmls){
            _this.find("#editor").html(htmls);
        };

        _this.get_html = function(){
            return _this.find("#editor").html();
        };

        _this.set_form_name = function(name){
            _this.find("#editor_text").attr("name",name);
        };

        if(_this.attr("init")) {
            _this.start();
            return _this;
        }

        var editors ='<div id="toolbar">' +
            '<a href="#" id="bold"  class="edt icon-bold"></a>' +
            '<a href="#" id="italic"  class="edt icon-italic"></a> ' +
            '<a href="#" id="JustifyCenter" class="edt icon-align-center"></a> ' +
            '<a href="#" id="JustifyLeft" class=" edt icon-align-left"></a> ' +
            '<a href="#" id="Justifyright" class="edt icon-align-right"></a> ' +
            '<a href="#" id="InsertOrderedList" class="edt icon-list-ol"></a>' +
            '<a href="#" id="InsertUnorderedList" class=" edt icon-list-ul"></a>' +
            '<a href="#" id="underline" class="edt icon-underline"></a> ' +
            '<a href="#" id="StrikeThrough" class="edt icon-strikethrough"></a> ' +
            '<a href="#" id="CreateLink" class="edt icon-link"></a>' +
            '<a href="#" id="unlink" class="edt icon-unlink"></a>' +
            '<a href="#" id="image" class="edt icon-picture" title="insert picture"></a>' +
            '<a href="#" id="undo" class="edt icon-undo"></a>' +
            '<a href="#" id="redo" class="edt icon-repeat"></a>'+
            '</div><div id="editor"></div><input type="text" id="editor_text" >';

        _this.attr("init","editing");
        var s = _this.html();
        _this.html(editors);
        _this.find("#editor_text").hide();
        _this.find("#editor").html(s);
        _this.find("#editor_text").val(s);

        _this.find("#toolbar a").each(function(){
            $(this).css({
                "textAlign":"center",
                "position": "relative",
                "paddingLeft":"8px"
            });
            $(this).click(function(){
                var toolid = this.id;
                _this.find("#editor").focus();
                switch(toolid){
                    case 'img':
                        _paste("<b>ff</b>",false);
                        break;
                    default :
                        document.execCommand(toolid,false,null);
                }
            })
        });

        _this.keyup(function(){

            _this.find("#editor_text").val(_this.find("#editor").html());
        });
        _this.start();

        return _this;
    }
})(jQuery);
