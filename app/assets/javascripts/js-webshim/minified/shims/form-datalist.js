jQuery.webshims.register("form-datalist",function(b,f,k,j,l){f.propTypes.element=function(h){f.createPropDefault(h,"attr");if(!h.prop)h.prop={get:function(){var f=h.attr.get.call(this);f&&(f=b("#"+f)[0])&&h.propNodeName&&!b.nodeName(f,h.propNodeName)&&(f=null);return f||null},writeable:!1}};(function(){if(!Modernizr.input.list){var h=0,p={submit:1,button:1,reset:1,hidden:1,range:1,date:1},n=b.browser.msie&&7>parseInt(b.browser.version,10),m={},o=function(a){if(!a)return[];if(m[a])return m[a];var b;
try{b=JSON.parse(localStorage.getItem("storedDatalistOptions"+a))}catch(c){}m[a]=b||[];return b||[]},q={_create:function(a){if(!p[b.prop(a.input,"type")]){var d=a.datalist,c=b.data(a.input,"datalistWidget");if(d&&c&&c.datalist!==d)c.datalist=d,c.id=a.id,b(c.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",b.proxy(c,"_resetListCached")),c._resetListCached();else if(d){if(!(c&&c.datalist===d)){h++;var e=this;this.hideList=b.proxy(e,"hideList");this.timedHide=function(){clearTimeout(e.hideTimer);
e.hideTimer=setTimeout(e.hideList,9)};this.datalist=d;this.id=a.id;this.hasViewableData=!0;this._autocomplete=b.attr(a.input,"autocomplete");b.data(a.input,"datalistWidget",this);this.shadowList=b('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=a.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget",function(a){var c=b("li:not(.hidden-item)",e.shadowList),d="mousedown"==a.type||"click"==a.type;
e.markItem(c.index(a.currentTarget),d,c);"click"==a.type&&e.hideList();return"mousedown"!=a.type}).bind("focusout",this.timedHide);a.input.setAttribute("autocomplete","off");b(a.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",function(){if(!e.triggeredByDatalist)e.changedValue=!1,e.showHideOptions()}).bind("keydown.datalistWidget",function(a){var c=a.keyCode;if(40==c&&!e.showList())return e.markItem(e.index+1,!0),!1;if(e.isListVisible){if(38==c)return e.markItem(e.index-1,!0),!1;
if(!a.shiftKey&&(33==c||36==c))return e.markItem(0,!0),!1;if(!a.shiftKey&&(34==c||35==c))return a=b("li:not(.hidden-item)",e.shadowList),e.markItem(a.length-1,!0,a),!1;if(13==c||27==c)return 13==c&&e.changeValue(b("li.active-item:not(.hidden-item)",e.shadowList)),e.hideList(),!1}}).bind("focus.datalistWidget",function(){b(this).hasClass("list-focus")&&e.showList()}).bind("mousedown.datalistWidget",function(){(this==j.activeElement||b(this).is(":focus"))&&e.showList()}).bind("blur.datalistWidget",
this.timedHide);b(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",b.proxy(this,"_resetListCached"));this._resetListCached();a.input.form&&a.input.id&&b(a.input.form).bind("submit.datalistWidget"+a.input.id,function(){var c=b.prop(a.input,"value"),d=(a.input.name||a.input.id)+b.prop(a.input,"type");if(!e.storedOptions)e.storedOptions=o(d);if(c&&-1==e.storedOptions.indexOf(c)&&(e.storedOptions.push(c),c=e.storedOptions,d)){c=c||[];try{localStorage.setItem("storedDatalistOptions"+
d,JSON.stringify(c))}catch(f){}}});b(k).bind("unload",function(){e.destroy()})}}else c&&c.destroy()}},destroy:function(){var a=b.attr(this.input,"autocomplete");b(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();b(j).unbind(".datalist"+this.id);this.input.form&&this.input.id&&b(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");a===l?this.input.removeAttribute("autocomplete"):b(this.input).attr("autocomplete",
a)},_resetListCached:function(a){var b=this,c;this.needsUpdate=!0;this.lastUpdatedValue=!1;this.lastUnfoundValue="";this.updateTimer||(k.QUnit||(c=a&&j.activeElement==b.input)?b.updateListOptions(c):f.ready("WINDOWLOAD",function(){b.updateTimer=setTimeout(function(){b.updateListOptions();b=null;h=1},200+100*h)}))},updateListOptions:function(a){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:b.curCSS(this.input,"fontSize"),fontFamily:b.curCSS(this.input,
"fontFamily")});var d=[],c=[],e=[],g,f,i,h;for(f=b.prop(this.datalist,"options"),i=0,h=f.length;i<h;i++){g=f[i];if(g.disabled)return;g={value:b(g).val()||"",text:b.trim(b.attr(g,"label")||g.textContent||g.innerText||b.text([g])||""),className:g.className||"",style:b.attr(g,"style")||""};g.text?g.text!=g.value&&(g.className+=" different-label-value"):g.text=g.value;c[i]=g.value;e[i]=g}if(!this.storedOptions)this.storedOptions=o((this.input.name||this.input.id)+b.prop(this.input,"type"));this.storedOptions.forEach(function(a){-1==
c.indexOf(a)&&e.push({value:a,text:a,className:"stored-suggest",style:""})});for(i=0,h=e.length;i<h;i++)f=e[i],d[i]='<li class="'+f.className+'" style="'+f.style+'" tabindex="-1" role="listitem"><span class="option-label">'+f.text+'</span> <span class="option-value">'+f.value+"</span></li>";this.arrayOptions=e;this.shadowList.html('<ul role="list" class="'+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom">'+d.join("\n")+"</ul>");b.fn.bgIframe&&n&&this.shadowList.bgIframe();(a||this.isListVisible)&&
this.showHideOptions()},showHideOptions:function(a){var d=b.prop(this.input,"value").toLowerCase();if(!(d===this.lastUpdatedValue||this.lastUnfoundValue&&0===d.indexOf(this.lastUnfoundValue))){this.lastUpdatedValue=d;var c=!1,e=b("li",this.shadowList);d?this.arrayOptions.forEach(function(a,f){if(!("lowerText"in a))a.lowerText=a.text!=a.value?a.text.toLowerCase()+a.value.toLowerCase():a.text.toLowerCase();-1!==a.lowerText.indexOf(d)?(b(e[f]).removeClass("hidden-item"),c=!0):b(e[f]).addClass("hidden-item")}):
e.length&&(e.removeClass("hidden-item"),c=!0);this.hasViewableData=c;!a&&c&&this.showList();if(!c)this.lastUnfoundValue=d,this.hideList()}},setPos:function(){var a=f.getRelOffset(this.shadowList,this.input);a.top+=b(this.input).outerHeight();a.width=b(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);this.shadowList.css(a);return a},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();
this.showHideOptions(!0);if(!this.hasViewableData)return!1;this.isListVisible=!0;var a=this,d;a.setPos();n&&(a.shadowList.css("height","auto"),250<a.shadowList.height()&&a.shadowList.css("height",220));a.shadowList.addClass("datalist-visible");b(j).unbind(".datalist"+a.id).bind("mousedown.datalist"+a.id+" focusin.datalist"+a.id,function(c){c.target===a.input||a.shadowList[0]===c.target||b.contains(a.shadowList[0],c.target)?(clearTimeout(a.hideTimer),setTimeout(function(){clearTimeout(a.hideTimer)},
9)):a.timedHide()});b(k).unbind(".datalist"+a.id).bind("resize.datalist"+a.id+"orientationchange.datalist "+a.id+" emchange.datalist"+a.id,function(){clearTimeout(d);d=setTimeout(function(){a.setPos()},9)});clearTimeout(d);return!0},hideList:function(){if(!this.isListVisible)return!1;var a=this,d=function(){a.changedValue&&b(a.input).trigger("change");a.changedValue=!1};a.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");a.index=
-1;a.isListVisible=!1;if(a.changedValue){a.triggeredByDatalist=!0;f.triggerInlineForm&&f.triggerInlineForm(a.input,"input");if(a.input==j.activeElement||b(a.input).is(":focus"))b(a.input).one("blur",d);else d();a.triggeredByDatalist=!1}b(j).unbind(".datalist"+a.id);b(k).unbind(".datalist"+a.id);return!0},scrollIntoView:function(a){var d=b("> ul",this.shadowList),c=a.position();c.top-=(parseInt(d.css("paddingTop"),10)||0)+(parseInt(d.css("marginTop"),10)||0)+(parseInt(d.css("borderTopWidth"),10)||
0);0>c.top?this.shadowList.scrollTop(this.shadowList.scrollTop()+c.top-2):(c.top+=a.outerHeight(),a=this.shadowList.height(),c.top>a&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(c.top-a)+2))},changeValue:function(a){if(a[0]){var a=b("span.option-value",a).text(),d=b.prop(this.input,"value");if(a!=d)b(this.input).prop("value",a).triggerHandler("updateInput"),this.changedValue=!0}},markItem:function(a,d,c){c=c||b("li:not(.hidden-item)",this.shadowList);if(c.length)0>a?a=c.length-1:a>=c.length&&
(a=0),c.removeClass("active-item"),this.shadowList.addClass("list-item-active"),c=c.filter(":eq("+a+")").addClass("active-item"),d&&(this.changeValue(c),this.scrollIntoView(c)),this.index=a}};(function(){f.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var a=b("select",this);a[0]?a=a[0].options:(a=b("option",this).get(),a.length&&f.warn("you should wrap you option-elements for a datalist in a select element to support IE and other old browsers."));return a}}});f.defineNodeNameProperties("input",
{selectedOption:{prop:{writeable:!1,get:function(){var a=b.prop(this,"list"),d=null,c;if(!a)return d;c=b.attr(this,"value");if(!c)return d;a=b.prop(a,"options");if(!a.length)return d;b.each(a,function(a,f){if(c==b.prop(f,"value"))return d=f,!1});return d}}},autocomplete:{attr:{get:function(){var a=b.data(this,"datalistWidget");return a?a._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(a){var d=b.data(this,"datalistWidget");d?(d._autocomplete=a,
"off"==a&&d.hideList()):"autocomplete"in this?this.autocomplete=a:this.setAttribute("autocomplete",a)}}},list:{attr:{get:function(){var a=f.contentAttr(this,"list");return null==a?l:a},set:function(a){f.contentAttr(this,"list",a);f.objectCreate(q,l,{input:this,id:a,datalist:b.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"}});if(b.event.customEvent)b.event.customEvent.updateDatalist=!0,b.event.customEvent.updateInput=!0;f.addReady(function(a,b){b.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").triggerHandler("updateDatalist")})})()}})()});
