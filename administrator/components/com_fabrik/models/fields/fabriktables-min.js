var fabriktablesElement=new Class({Implements:[Options,Events],options:{conn:null,connInRepeat:true,container:""},initialize:function(b,a){this.el=b;this.setOptions(a);this.elements=[];this.elementLists=$H({});this.waitingElements=$H({});if(typeOf(document.id(this.options.conn))==="null"){this.periodical=this.getCnn.periodical(500,this)}else{this.setUp()}},getCnn:function(){if(typeOf(document.id(this.options.conn))==="null"){return}this.setUp();clearInterval(this.periodical)},registerElement:function(a){this.elements.push(a);this.updateElements()},setUp:function(){this.el=document.id(this.el);this.cnn=document.id(this.options.conn);if(this.cnn==="null"){return}this.loader=document.id(this.el.id+"_loader");this.cnn.addEvent("change",function(b){this.updateMe(b)}.bind(this));this.el.addEvent("change",function(b){this.updateElements(b)}.bind(this));var a=this.cnn.get("value");if(a!==""&&a!==-1){this.updateMe()}},updateMe:function(b){if(b){b.stop()}var c=this.cnn.get("value");if(!c){return}if(this.loader){this.loader.show()}var a=new Request({url:"index.php",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",g:"element",plugin:"field",method:"ajax_tables",showf:"1",cid:c.toInt()},onSuccess:function(e){var d=JSON.decode(e);if(typeOf(d)!=="null"){if(d.err){alert(d.err)}else{this.el.empty();d.each(function(f){var g={value:f.id};if(f.id===this.options.value){g.selected="selected"}new Element("option",g).appendText(f.label).inject(this.el)}.bind(this));if(this.loader){this.loader.hide()}this.updateElements()}}}.bind(this),onFailure:function(d){console.log("fabriktables request failure",d.getResponseHeader("Status"))}.bind(this),onException:function(e,d){console.log("fabriktables request exception",e,d)}.bind(this)});Fabrik.requestQueue.add(a)},updateElements:function(){this.elements.each(function(c){var e=c.getOpts();var d=this.el.get("value");if(d===""){return}if(this.loader){this.loader.show()}var b=e.getValues().toString()+","+d;if(!this.waitingElements.has(b)){this.waitingElements[b]=$H({})}if(this.elementLists[b]!==undefined){if(this.elementLists[b]===""){this.waitingElements[b][c.el.id]=c}else{this.updateElementOptions(this.elementLists[b],c)}}else{var g=this.cnn.get("value");this.elementLists.set(b,"");var a={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",g:"element",plugin:"field",method:"ajax_fields",cid:g.toInt(),showf:"1",k:"2",t:d};e.each(function(i,h){a[h]=i});var f=new Request({url:"index.php",data:a,onComplete:function(h){this.elementLists.set(b,h);this.updateElementOptions(h,c);this.waitingElements.get(b).each(function(k,j){this.updateElementOptions(h,k);this.waitingElements[b].erase(j)}.bind(this))}.bind(this),onFailure:function(h){this.waitingElements.get(b).each(function(k,j){this.updateElementOptions("[]",k);this.waitingElements[b].erase(j)}.bind(this));if(this.loader){this.loader.hide()}alert(h.status+": "+h.statusText)}.bind(this)}).send()}}.bind(this))},updateElementOptions:function(r,element){var target;if(r===""){return}var table=document.id(this.el).get("value");var key=element.getOpts().getValues().toString()+","+table;var opts=eval(r);if(element.el.get("tag")==="textarea"){target=element.el.getParent().getElement("select")}else{target=element.el}target.empty();var o={value:""};if(element.options.value===""){o.selected="selected"}new Element("option",o).appendText("-").inject(target);opts.each(function(opt){var v=opt.value.replace("[]","");var o={value:v};if(v===element.options.value){o.selected="selected"}new Element("option",o).set("text",opt.label).inject(target)}.bind(this));if(this.loader){this.loader.hide()}},cloned:function(b,a){if(this.options.connInRepeat===true){var c=this.options.conn.split("-");c.pop();this.options.conn=c.join("-")+"-"+a}this.el=b;this.elements=[];this.elementLists=$H({});this.waitingElements=$H({});this.setUp();FabrikAdmin.model.fields.fabriktable[this.el.id]=this}});