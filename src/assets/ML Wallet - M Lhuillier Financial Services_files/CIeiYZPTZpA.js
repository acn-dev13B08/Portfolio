if (self.CavalryLogger) { CavalryLogger.start_js(["m+NqbnA"]); }

__d("ChannelConstants",[],(function(a,b,c,d,e,f){var g="channel/";a={CHANNEL_MANUAL_RECONNECT_DEFER_MSEC:2e3,MUTE_WARNING_TIME_MSEC:25e3,WARNING_COUNTDOWN_THRESHOLD_MSEC:15e3,ON_SHUTDOWN:g+"shutdown",ON_INVALID_HISTORY:g+"invalid_history",ON_CONFIG:g+"config",ON_ENTER_STATE:g+"enter_state",ON_EXIT_STATE:g+"exit_state",ATTEMPT_RECONNECT:g+"attempt_reconnect",RTI_SESSION:g+"new_rti_address",CONSOLE_LOG:g+"message:console_log",GET_RTI_SESSION_REQUEST:g+"rti_session_request",SKYWALKER:g+"skywalker",CHANNEL_ESTABLISHED:g+"established",OK:"ok",ERROR:"error",ERROR_MAX:"error_max",ERROR_MISSING:"error_missing",ERROR_MSG_TYPE:"error_msg_type",ERROR_SHUTDOWN:"error_shutdown",ERROR_STALE:"error_stale",SYS_OWNER:"sys_owner",SYS_NONOWNER:"sys_nonowner",SYS_ONLINE:"sys_online",SYS_OFFLINE:"sys_offline",SYS_TIMETRAVEL:"sys_timetravel",HINT_AUTH:"shutdown auth",HINT_CONN:"shutdown conn",HINT_DISABLED:"shutdown disabled",HINT_INVALID_STATE:"shutdown invalid state",HINT_MAINT:"shutdown maint",HINT_UNSUPPORTED:"shutdown unsupported",reason_Unknown:0,reason_AsyncError:1,reason_TooLong:2,reason_Refresh:3,reason_RefreshDelay:4,reason_UIRestart:5,reason_NeedSeq:6,reason_PrevFailed:7,reason_IFrameLoadGiveUp:8,reason_IFrameLoadRetry:9,reason_IFrameLoadRetryWorked:10,reason_PageTransitionRetry:11,reason_IFrameLoadMaxSubdomain:12,reason_NoChannelInfo:13,reason_NoChannelHost:14,CAPABILITY_VOIP_INTEROP:8,CAPABILITY_ACTIVE_ON_DESKTOP_APP:16384,CAPABILITY_PLAYING_INSTANT_GAME:2097152,FANTAIL_SERVICE:"WebchatClient",SUBSCRIBE:"subscribe",UNSUBSCRIBE:"unsubscribe",FAKE_DFF:"fake_dff",THROTTLED:g+"throttled",JUMPSTART:g+"jumpstart",ENTITY_PRESENCE_ACTIVE_PING:"entity_presence/active_ping",ENTITY_PRESENCE_SKIPPED_PING:"entity_presence/skipped_ping",SUBSCRIPTION_STATE:{SUBSCRIBE:"s",MUTATE_CONTEXT:"m",UNSUBSCRIBE:"u"},DEFAULT_MAX_SUBSCRIPTIONS:300,DEFAULT_EVICTION_BATCH_SIZE:20,DEFAULT_MAX_SUBSCRIPTION_FLUSH_BATCH_SIZE:300,DEFAULT_MAX_CONSECUTIVE_FLUSH_FAILURES:3,getArbiterType:function(a){return g+"message:"+a},getRTISkywalkerArbiterType:function(a,b){return g+"skywalker:"+a+":"+b}};e.exports=a}),null);
__d("AvailableListConstants",[],(function(a,b,c,d,e,f){a=Object.freeze({ON_AVAILABILITY_CHANGED:"buddylist/availability-changed",ON_UPDATE_ERROR:"buddylist/update-error",ON_UPDATED:"buddylist/updated",ON_CHAT_NOTIFICATION_CHANGED:"chat-notification-changed",OFFLINE:0,IDLE:1,ACTIVE:2,MOBILE:3,WEB_STATUS:"webStatus",FB_APP_STATUS:"fbAppStatus",MESSENGER_STATUS:"messengerStatus",OTHER_STATUS:"otherStatus",STATUS_ACTIVE:"active",STATUS_IDLE:"idle",STATUS_OFFLINE:"offline"});f["default"]=a}),66);
__d("PresenceConfig",["PresenceConfigInitialData"],(function(a,b,c,d,e,f,g){var h=babelHelpers["extends"]({},c("PresenceConfigInitialData"));function a(a,b){return a in h?h[a]:b}g.get=a}),98);
__d("XLynxAsyncCallbackControllerRouteBuilder",["jsRouteBuilder"],(function(a,b,c,d,e,f,g){a=c("jsRouteBuilder")("/si/linkclick/ajax_callback/",Object.freeze({}),void 0);b=a;g["default"]=b}),98);
__d("FBLynxLogging",["AsyncRequest","ODS","XLynxAsyncCallbackControllerRouteBuilder"],(function(a,b,c,d,e,f,g){"use strict";function a(a){var b=c("XLynxAsyncCallbackControllerRouteBuilder").buildURL({});new(c("AsyncRequest"))(b).setData({lynx_uri:a}).setErrorHandler(function(a){a=a.getError();d("ODS").bumpEntityKey(3861,"linkshim","click_log.post.fail."+a)}).setTransportErrorHandler(function(a){a=a.getError();d("ODS").bumpEntityKey(3861,"linkshim","click_log.post.transport_fail."+a)}).send()}g.log=a}),98);
__d("FBLynxBase",["$","FBLynxLogging","LinkshimHandlerConfig","URI","isLinkshimURI"],(function(a,b,c,d,e,f){"use strict";var g;function h(a){if(!b("isLinkshimURI")(a))return null;a=a.getQueryData().u;return!a?null:a}var i={logAsyncClick:function(a){i.swapLinkWithUnshimmedLink(a);a=a.getAttribute("data-lynx-uri");if(!a)return;b("FBLynxLogging").log(a)},originReferrerPolicyClick:function(a){var c=b("$")("meta_referrer");c.content=b("LinkshimHandlerConfig").switched_meta_referrer_policy;i.logAsyncClick(a);setTimeout(function(){c.content=b("LinkshimHandlerConfig").default_meta_referrer_policy},100)},swapLinkWithUnshimmedLink:function(a){var c=a.href,d=h(new(g||(g=b("URI")))(c));if(!d)return;a.setAttribute("data-lynx-uri",c);a.href=d},revertSwapIfLynxURIPresent:function(a){var b=a.getAttribute("data-lynx-uri");if(!b)return;a.removeAttribute("data-lynx-uri");a.href=b}};e.exports=i}),null);
__d("FBLynx",["Base64","Event","FBLynxBase","LinkshimHandlerConfig","Parent","URI"],(function(a,b,c,d,e,f){"use strict";var g,h=(g||(g=b("URI"))).goURIOnWindow,i={alreadySetup:!1,setupDelegation:function(a){a===void 0&&(a=!1);if(!document.documentElement)return;if(document.body==null){if(a)return;window.setTimeout(function(){i.setupDelegation(!0)},100);return}if(i.alreadySetup)return;i.alreadySetup=!0;var c=function(a){var c=i.getMaybeLynxLink(a.target);if(!c)return;var d=c[0];c=c[1];var e=c,f=new(g||(g=b("URI")))(c.href),j;if(b("LinkshimHandlerConfig").ghl_param_link_shim&&d!=="hover"&&(c.dataset&&c.dataset.attributes)){j=b("Base64").decodeObject(c.dataset.attributes);if(j&&j.open_link){var k;for(k in j)k!=="open_link"&&f.addQueryData(k,j[k]);k=c.cloneNode(!0);k.href=f.toString();e=k}}switch(d){case"async":case"asynclazy":b("FBLynxBase").logAsyncClick(e);break;case"origin":b("FBLynxBase").originReferrerPolicyClick(e);break;case"hover":i.hoverClick(e);break}b("LinkshimHandlerConfig").ghl_param_link_shim&&d!=="hover"&&j&&j.open_link&&(a.preventDefault(),h(f,window.open("",e.target),!0))};b("Event").listen(document.body,"click",c);b("LinkshimHandlerConfig").middle_click_requires_event&&b("Event").listen(document.body,"mouseup",function(a){a.button==1&&c(a)});b("Event").listen(document.body,"mouseover",function(a){a=i.getMaybeLynxLink(a.target);if(!a)return;var b=a[0];a=a[1];switch(b){case"async":case"asynclazy":case"origin":case"hover":i.mouseover(a);break}});b("Event").listen(document.body,"contextmenu",function(a){a=i.getMaybeLynxLink(a.target);if(!a)return;var b=a[0];a=a[1];switch(b){case"async":case"hover":case"origin":i.contextmenu(a);break;case"asynclazy":break}})},getMaybeLynxLink:function(a){a=b("Parent").byAttribute(a,"data-lynx-mode");if(a instanceof HTMLAnchorElement){var c=a.getAttribute("data-lynx-mode");switch(c){case"async":case"asynclazy":case"hover":case"origin":return[c,a];default:return null}}return null},hoverClick:function(a){b("FBLynxBase").revertSwapIfLynxURIPresent(a)},mouseover:function(a){b("FBLynxBase").swapLinkWithUnshimmedLink(a)},contextmenu:function(a){b("FBLynxBase").revertSwapIfLynxURIPresent(a)}};e.exports=i}),null);
__d("DOMControl",["$","DataStore"],(function(a,b,c,d,e,f){a=function(){"use strict";function a(a){this.root=b("$").fromIDOrElement(a),this.updating=!1,b("DataStore").set(a,"DOMControl",this)}var c=a.prototype;c.getRoot=function(){return this.root};c.beginUpdate=function(){if(this.updating)return!1;this.updating=!0;return!0};c.endUpdate=function(){this.updating=!1};c.update=function(a){if(!this.beginUpdate())return this;this.onupdate(a);this.endUpdate()};c.onupdate=function(a){};a.getInstance=function(a){return b("DataStore").get(a,"DOMControl")};return a}();e.exports=a}),null);
__d("FBIDCheck",[],(function(a,b,c,d,e,f){"use strict";var g=/^[1-9]\d*$/;function a(a){if(!a||typeof a==="string"&&!g.test(a))return!1;a=parseInt(a,10);return!a?!1:a>0&&a<22e8||a>=1e14&&a<=100099999989999||a>=89e12&&a<=89999999999999||a>=6000001e7&&a<=60000019999999}f.isUser_deprecated=a}),66);
__d("FocusEvent",["Event","Run","ge","getOrCreateDOMID"],(function(a,b,c,d,e,f,g){"use strict";var h={},i=!1;function j(a,b){if(h[a]){b=h[a].indexOf(b);b>=0&&h[a].splice(b,1);h[a].length===0&&delete h[a]}}function k(a){var b=a.getTarget();if(h[b.id]&&h[b.id].length>0){var c=a.type==="focusin"||a.type==="focus";h[b.id].forEach(function(a){a(c)})}}function l(){if(i)return;c("Event").listen(document.documentElement,"focusout",k);c("Event").listen(document.documentElement,"focusin",k);i=!0}function a(a,b){l();var e=c("getOrCreateDOMID")(a);h[e]||(h[e]=[]);h[e].push(b);var f=!1;function g(){f||(j(e,b),i&&(i.remove(),i=null),f=!0)}var i=d("Run").onLeave(function(){c("ge")(e)||g()});return{remove:function(){g()}}}g.listen=a}),98);
__d("tooltipPropsFor",[],(function(a,b,c,d,e,f){"use strict";function a(a,b,c){if(!a)return{};a={"data-tooltip-content":a,"data-hover":"tooltip"};b&&(a["data-tooltip-position"]=b);c&&(a["data-tooltip-alignh"]=c);return a}f["default"]=a}),66);
__d("TooltipData",["DOM","DataStore","FBLogger","URI","getElementText","ifRequired","isStringNullOrEmpty","isTextNode","killswitch","tooltipPropsFor"],(function(a,b,c,d,e,f){var g;function h(a){var c=a.getAttribute("data-tooltip-delay");c=c?parseInt(c,10)||1e3:0;if(b("killswitch")("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT"))return babelHelpers["extends"]({className:a.getAttribute("data-tooltip-root-class"),content:a.getAttribute("data-tooltip-content"),delay:c,position:a.getAttribute("data-tooltip-position")||"above",alignH:a.getAttribute("data-tooltip-alignh")||"left",offsetY:a.getAttribute("data-tooltip-offsety")||0,suppress:!1,overflowDisplay:a.getAttribute("data-tooltip-display")==="overflow",persistOnClick:a.getAttribute("data-pitloot-persistonclick"),textDirection:a.getAttribute("data-tooltip-text-direction")},b("DataStore").get(a,"tooltip"));else{var d;d=(d=b("DataStore").get(a,"tooltip"))!=null?d:{};var e=d.content;d=babelHelpers.objectWithoutPropertiesLoose(d,["content"]);var f=a.getAttribute("data-tooltip-content");!b("isStringNullOrEmpty")(e)&&!b("isStringNullOrEmpty")(f)&&b("FBLogger")("tooltip").warn('Getting DataStore tooltip content on an element that has both a "data-tooltip-content" attribute value (set to %s) and a value coming from the DataStore',a.getAttribute("data-tooltip-content"));return babelHelpers["extends"]({className:a.getAttribute("data-tooltip-root-class"),delay:c,position:a.getAttribute("data-tooltip-position")||"above",alignH:a.getAttribute("data-tooltip-alignh")||"left",offsetY:a.getAttribute("data-tooltip-offsety")||0,suppress:!1,overflowDisplay:a.getAttribute("data-tooltip-display")==="overflow",persistOnClick:a.getAttribute("data-pitloot-persistonclick"),textDirection:a.getAttribute("data-tooltip-text-direction"),content:(a=(c=f)!=null?c:e)!=null?a:null},d)}}function i(a,c){var d=h(a);if(b("killswitch")("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT"))b("DataStore").set(a,"tooltip",{content:c.content||d.content,position:c.position||d.position,alignH:c.alignH||d.alignH,suppress:c.suppress!==void 0?c.suppress:d.suppress,overflowDisplay:c.overflowDisplay||d.overflowDisplay,persistOnClick:c.persistOnClick||d.persistOnClick});else{!b("isStringNullOrEmpty")(c.content)&&!b("isStringNullOrEmpty")(a.getAttribute("data-tooltip-content"))&&b("FBLogger")("tooltip").warn('Setting DataStore tooltip content on an element that already has the "data-tooltip-content" attribute (set to %s) is invalid',a.getAttribute("data-tooltip-content"));b("DataStore").set(a,"tooltip",{content:c.content||((a=b("DataStore").get(a,"tooltip"))!=null?a:{}).content,position:c.position||d.position,alignH:c.alignH||d.alignH,suppress:c.suppress!==void 0?c.suppress:d.suppress,overflowDisplay:c.overflowDisplay||d.overflowDisplay,persistOnClick:c.persistOnClick||d.persistOnClick})}}function j(a,b){i(a,b),a.setAttribute("data-hover","tooltip")}function k(a,b){}var l={remove:function(a,c){c=c===void 0?{}:c;c=c.onlyCleanupDataStore;c=c===void 0?!1:c;b("DataStore").remove(a,"tooltip");c||(a.removeAttribute("data-hover"),a.removeAttribute("data-tooltip-position"),a.removeAttribute("data-tooltip-alignh"),b("ifRequired")("Tooltip",function(b){b.isActive(a)&&b.hide()}))},set:function(a,c,d,e){k(a,c);if(c instanceof(g||(g=b("URI"))))a.setAttribute("data-tooltip-uri",c),b("ifRequired")("Tooltip",function(b){b.isActive(a)&&b.fetchIfNecessary(a)});else if(b("killswitch")("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")){var f=l._store({context:a,content:c,position:d,alignH:e});typeof f.content!=="string"?a.setAttribute("data-tooltip-content",b("getElementText")(f.content)):a.setAttribute("data-tooltip-content",f.content);l.refreshIfActive(a)}else a.removeAttribute("data-tooltip-content"),l._store({context:a,content:c,position:d,alignH:e}),l.refreshIfActive(a)},refreshIfActive:function(a){b("ifRequired")("Tooltip",function(b){b.isActive(a)&&b.show(a)})},_store:function(a){var c=a.context,d=a.content,e=a.position;a=a.alignH;k(c,d);b("isTextNode")(d)&&(d=b("getElementText")(d));var f=!1;typeof d!=="string"?d=b("DOM").create("div",{},d):f=d==="";a={alignH:a,content:d,position:e,suppress:f};j(c,a);return a},propsFor:b("tooltipPropsFor"),enableDisplayOnOverflow:function(a){a.removeAttribute("data-tooltip-display"),j(a,{overflowDisplay:!0})},enablePersistOnClick:function(a){a.removeAttribute("data-pitloot-persistOnClick"),j(a,{persistOnClick:!0})},suppress:function(a,b){i(a,{suppress:b})},_get:h};e.exports=l}),null);
__d("Focus",["cx","CSS","Event","FocusEvent","KeyStatus","TooltipData","ifRequired"],(function(a,b,c,d,e,f,g,h){function a(a,b){b===void 0&&(b=!1);if(a){var e=c("ifRequired")("VirtualCursorStatus",function(a){return a.isVirtualCursorTriggered()},function(){return!1});b||d("KeyStatus").isKeyDown()||e?j(a):i(a)}}function i(a){if(a){d("CSS").addClass(a,"_5f0v");var b=c("Event").listen(a,"blur",function(){a&&d("CSS").removeClass(a,"_5f0v"),b.remove()});d("TooltipData").suppress(a,!0);j(a);d("TooltipData").suppress(a,!1)}}function b(a,b){d("CSS").addClass(a,"_5f0v");return d("FocusEvent").listen(a,this.performRelocation.bind(this,a,b))}function e(a,b,e){d("CSS").addClass(a,"_5f0v");a=c("ifRequired")("FocusRing",function(a){return a.usingKeyboardNavigation()},function(){return!0});e=e&&a;d("CSS").conditionClass(b,"_3oxt",e);d("CSS").conditionClass(b,"_16jm",e)}function j(a){try{a.tabIndex=a.tabIndex,a.focus()}catch(a){}}g.set=a;g.setWithoutOutline=i;g.relocate=b;g.performRelocation=e}),98);
__d("Input",["CSS","DOMControl","DOMQuery"],(function(a,b,c,d,e,f,g){function h(a){return!/\S/.test(a||"")}function i(a){return h(a.value)}function a(a){return i(a)?"":a.value}function b(a){return a.value}function e(a,b){a.value=b||"";b=c("DOMControl").getInstance(a);b&&b.resetHeight&&b.resetHeight()}function f(a,b){b||(b=""),a.setAttribute("aria-label",b),a.setAttribute("placeholder",b)}function j(a){a.value="",a.style.height=""}function k(a,b){d("CSS").conditionClass(a,"enter_submit",b)}function l(a){return d("CSS").hasClass(a,"enter_submit")}function m(a,b){b>0?a.setAttribute("maxlength",b.toString()):a.removeAttribute("maxlength")}g.isWhiteSpaceOnly=h;g.isEmpty=i;g.getValue=a;g.getValueRaw=b;g.setValue=e;g.setPlaceholder=f;g.reset=j;g.setSubmitOnEnter=k;g.getSubmitOnEnter=l;g.setMaxLength=m}),98);
__d("Form",["DOM","DOMQuery","DTSG","DTSGUtils","DataStore","Input","LSD","PHPQuerySerializer","Random","SprinkleConfig","URI","getElementPosition","isFacebookURI","isNode"],(function(a,b,c,d,e,f){var g,h,i="FileList"in window,j="FormData"in window;function k(a){var c={};(g||(g=b("PHPQuerySerializer"))).serialize(a).split("&").forEach(function(a){if(a){a=/^([^=]*)(?:=(.*))?$/.exec(a);var d=(h||(h=b("URI"))).decodeComponent(a[1]),e=a[2]!==void 0;e=e?(h||(h=b("URI"))).decodeComponent(a[2]):null;c[d]=e}});return c}var l={getInputs:function(a){a===void 0&&(a=document);return[].concat(b("DOMQuery").scry(a,"input"),b("DOMQuery").scry(a,"select"),b("DOMQuery").scry(a,"textarea"),b("DOMQuery").scry(a,"button"))},getInputsByName:function(a){var b={};l.getInputs(a).forEach(function(a){var c=b[a.name];b[a.name]=typeof c==="undefined"?a:[a].concat(c)});return b},getSelectValue:function(a){return a.options[a.selectedIndex].value},setSelectValue:function(a,b){for(var c=0;c<a.options.length;++c)if(a.options[c].value==b){a.selectedIndex=c;break}},getRadioValue:function(a){for(var b=0;b<a.length;b++)if(a[b].checked)return a[b].value;return null},getElements:function(a){return a.tagName=="FORM"&&a.elements!=a?Array.from(a.elements):l.getInputs(a)},getAttribute:function(a,b){return(a.getAttributeNode(b)||{}).value||null},setDisabled:function(a,c){l.getElements(a).forEach(function(a){if(a.disabled!==void 0){var d=b("DataStore").get(a,"origDisabledState");c?(d===void 0&&b("DataStore").set(a,"origDisabledState",a.disabled),a.disabled=c):d===!1&&(a.disabled=!1)}})},forEachValue:function(a,c,d){l.getElements(a).forEach(function(a){if(!a.name||a.disabled)return;if(a.type==="submit")return;if(a.type==="reset"||a.type==="button"||a.type==="image")return;if((a.type==="radio"||a.type==="checkbox")&&!a.checked)return;if(a.nodeName==="SELECT"){for(var c=0,e=a.options.length;c<e;c++){var f=a.options[c];f.selected&&d("select",a.name,f.value)}return}if(a.type==="file"){if(i){f=a.files;for(var c=0;c<f.length;c++)d("file",a.name,f.item(c))}return}d(a.type,a.name,b("Input").getValue(a))}),c&&c.name&&c.type==="submit"&&b("DOMQuery").contains(a,c)&&b("DOMQuery").isNodeOfType(c,["input","button"])&&d("submit",c.name,c.value)},createFormData:function(a,c){if(!j)return null;var d=new FormData();if(a)if(b("isNode")(a))l.forEachValue(a,c,function(b,a,c){d.append(a,c)});else{c=k(a);for(var e in c)c[e]==null?d.append(e,""):d.append(e,c[e])}return d},serialize:function(a,b){var c={};l.forEachValue(a,b,function(a,b,d){if(a==="file")return;l._serializeHelper(c,b,d)});return l._serializeFix(c)},_serializeHelper:function(a,b,c){var d=Object.prototype.hasOwnProperty,e=/([^\]]+)\[([^\]]*)\](.*)/.exec(b);if(e){if(!a[e[1]]||!d.call(a,e[1])){a[e[1]]=d={};if(a[e[1]]!==d)return}d=0;if(e[2]==="")while(a[e[1]][d]!==void 0)d++;else d=e[2];e[3]===""?a[e[1]][d]=c:l._serializeHelper(a[e[1]],d.concat(e[3]),c)}else a[b]=c},_serializeFix:function(a){for(var b in a)a[b]instanceof Object&&(a[b]=l._serializeFix(a[b]));var c=Object.keys(a);if(c.length===0||c.some(isNaN))return a;c.sort(function(a,b){return a-b});var d=0,e=c.every(function(a){return+a===d++});return e?c.map(function(b){return a[b]}):a},post:function(a,c,d,e){e===void 0&&(e=!0);a=new(h||(h=b("URI")))(a);var f=document.createElement("form");f.action=a.toString();f.method="POST";f.style.display="none";var g=!b("isFacebookURI")(a);if(d){if(g){f.rel="noopener";if(d==="_blank"){d=btoa(b("Random").uint32());var i=window.open("about:blank",d);i===void 0||(i.opener=null)}}f.target=d}if(e&&(!g&&a.getSubdomain()!=="apps")){i=b("DTSG").getToken();i&&(c.fb_dtsg=i,b("SprinkleConfig").param_name&&(c[b("SprinkleConfig").param_name]=b("DTSGUtils").getNumericValue(i)));b("LSD").token&&(c.lsd=b("LSD").token,b("SprinkleConfig").param_name&&!i&&(c[b("SprinkleConfig").param_name]=b("DTSGUtils").getNumericValue(b("LSD").token)))}l.createHiddenInputs(c,f);b("DOMQuery").getRootElement().appendChild(f);f.submit();return!1},createHiddenInputs:function(a,c,d,e){e===void 0&&(e=!1);d=d||{};a=k(a);for(var f in a){if(a[f]===null)continue;if(d[f]&&e)d[f].value=a[f];else{var g=b("DOM").create("input",{type:"hidden",name:f,value:a[f]});d[f]=g;c.appendChild(g)}}return d},getFirstElement:function(a,c){c===void 0&&(c=['input[type="text"]',"textarea",'input[type="password"]','input[type="button"]','input[type="submit"]']);var d=[];for(var e=0;e<c.length;e++){d=b("DOMQuery").scry(a,c[e]);for(var f=0;f<d.length;f++){var g=d[f];try{var h=b("getElementPosition")(g);if(h.y>0&&h.x>0)return g}catch(a){}}}return null},focusFirst:function(a){a=l.getFirstElement(a);if(a){a.focus();return!0}return!1}};e.exports=l}),null);
__d("debounceAcrossTransitions",["debounce"],(function(a,b,c,d,e,f,g){function a(a,b,d){return c("debounce")(a,b,d,!0)}g["default"]=a}),98);
__d("Button",["csx","cx","invariant","CSS","DOM","DataStore","Event","Parent","emptyFunction","isNode"],(function(a,b,c,d,e,f,g,h,i,j){var k="uiButtonDisabled",l="uiButtonDepressed",m="_42fr",n="_42fs",o="button:blocker",p="href",q="ajaxify";function r(a,b){var e=d("DataStore").get(a,o);b?e&&(e.remove(),d("DataStore").remove(a,o)):e||d("DataStore").set(a,o,c("Event").listen(a,"click",c("emptyFunction").thatReturnsFalse,c("Event").Priority.URGENT))}function s(a){a=d("Parent").byClass(a,"uiButton")||d("Parent").bySelector(a,"._42ft");if(!a)throw new Error("invalid use case");return a}function t(a){return c("DOM").isNodeOfType(a,"a")}function u(a){return c("DOM").isNodeOfType(a,"button")}function v(a){return d("CSS").matchesSelector(a,"._42ft")}var w={getInputElement:function(a){a=s(a);if(t(a))throw new Error("invalid use case");if(u(a)){a instanceof HTMLButtonElement||j(0,21261);return a}return c("DOM").find(a,"input")},isEnabled:function(a){return!(d("CSS").hasClass(s(a),k)||d("CSS").hasClass(s(a),m))},setEnabled:function(a,b){a=s(a);var c=v(a)?m:k;d("CSS").conditionClass(a,c,!b);if(t(a)){c=a.getAttribute("href");var e=a.getAttribute("ajaxify"),f=d("DataStore").get(a,p,"#"),g=d("DataStore").get(a,q);b?(c||a.setAttribute("href",f),!e&&g&&a.setAttribute("ajaxify",g),a.removeAttribute("tabIndex")):(c&&c!==f&&d("DataStore").set(a,p,c),e&&e!==g&&d("DataStore").set(a,q,e),a.removeAttribute("href"),a.removeAttribute("ajaxify"),a.setAttribute("tabIndex","-1"));r(a,b)}else{f=w.getInputElement(a);f.disabled=!b;r(f,b)}},setDepressed:function(a,b){a=s(a);var c=v(a)?n:l;d("CSS").conditionClass(a,c,b)},isDepressed:function(a){a=s(a);var b=v(a)?n:l;return d("CSS").hasClass(a,b)},setLabel:function(a,b){a=s(a);if(v(a)){var e=[];b&&e.push(b);var f=c("DOM").scry(a,".img");for(var g=0;g<f.length;g++){var h=f[g],i=h.parentNode;i.classList&&(i.classList.contains("_4o_3")||i.classList.contains("_-xe"))?a.firstChild===i?e.unshift(i):e.push(i):a.firstChild==h?e.unshift(h):e.push(h)}c("DOM").setContent(a,e)}else if(t(a)){i=c("DOM").find(a,"span.uiButtonText");c("DOM").setContent(i,b)}else w.getInputElement(a).value=b;h=v(a)?"_42fv":"uiButtonNoText";d("CSS").conditionClass(a,h,!b)},getIcon:function(a){a=s(a);return c("DOM").scry(a,".img")[0]},setIcon:function(a,b){if(b&&!c("isNode")(b))return;var e=w.getIcon(a);if(!b){e&&c("DOM").remove(e);return}d("CSS").addClass(b,"customimg");e!=b&&(e?c("DOM").replace(e,b):c("DOM").prependContent(s(a),b))}};a=w;g["default"]=a}),98);
__d("oz-player/parsers/getMIMECodecs",[],(function(a,b,c,d,e,f){"use strict";function a(a,b){return a+'; codecs="'+b+'"'}f["default"]=a}),66);
__d("getUnboundedScrollPosition",["Scroll"],(function(a,b,c,d,e,f){"use strict";function a(a){if(a===window){var c;return{x:(c=window.pageXOffset)!=null?c:b("Scroll").getLeft(document.documentElement),y:(c=window.pageYOffset)!=null?c:b("Scroll").getTop(document.documentElement)}}return{x:b("Scroll").getLeft(a),y:b("Scroll").getTop(a)}}e.exports=a}),null);
__d("keyMirror",["unrecoverableViolation"],(function(a,b,c,d,e,f,g){"use strict";function a(a){var b={};if(!(a instanceof Object&&!Array.isArray(a)))throw c("unrecoverableViolation")("keyMirror(...): Argument must be an object.","comet_infra");for(var d in a){if(!Object.prototype.hasOwnProperty.call(a,d))continue;b[d]=d}return b}g["default"]=a}),98);
__d("XThisControllerNoLongerExistsController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/dcb/tcnle/",{t:{type:"String"}})}),null);
__d("ThisControllerNoLongerExists",["XControllerURIBuilder","XThisControllerNoLongerExistsController"],(function(a,b,c,d,e,f,g){"use strict";var h=function(b){babelHelpers.inheritsLoose(a,b);function a(a){var c;c=b.call(this,"/dcb/tcnle/",{})||this;c.$XControllerURIBuilderNoOpDead1=a;return c}var d=a.prototype;d.__validateRequiredParamsExistence=function(){};d.__assertParamExists=function(a){};d.__setParam=function(a,b,c){return this};d.__setParamInt=function(a,b){};d.getRequest_LEGACY_UNTYPED=function(a){return a.setURI(this.getURI())};d.getURI=function(){return c("XThisControllerNoLongerExistsController").getURIBuilder().setString("t",this.$XControllerURIBuilderNoOpDead1).getURI()};d.getLookasideURI=function(){return this.getURI()};return a}(c("XControllerURIBuilder"));function a(a){return c("XThisControllerNoLongerExistsController").getURIBuilder().setString("t",a).getURI()}function b(a){return new h(a)}g.__DEADURI__=a;g.__DEADBUILDER__=b}),98);
__d("fbjs/lib/ExecutionEnvironment",["ExecutionEnvironment"],(function(a,b,c,d,e,f){"use strict";e.exports=b("ExecutionEnvironment")}),null);
__d("validatePhoneNumber",[],(function(a,b,c,d,e,f){"use strict";function a(a,b){b=(b=b)!=null?b:7;return/^[+]?[0-9()\s-.#]{7,25}$/.test(a)&&a.replace(/[^0-9]/g,"").length>=b}f["default"]=a}),66);
__d("QPLAddBlueRequestHeaders",["Arbiter","QuickPerformanceLogger"],(function(a,b,c,d,e,f,g){"use strict";function a(){c("Arbiter").subscribe("AsyncRequest/will_send",function(a,b){a=b.request;b=c("QuickPerformanceLogger").getActiveMarkerIds({type:2});b.length>0&&a.setRequestHeader("X-FB-QPL-Active-Flows",b.sort().join(","))})}g["default"]=a}),98);
__d("getContextualParent",["ge"],(function(a,b,c,d,e,f,g){function a(a,b){b===void 0&&(b=!1);var d=!1;a=a;do{if(a instanceof Element){var e=a.getAttribute("data-ownerid");if(e){a=c("ge")(e);d=!0;continue}}a=a.parentNode}while(b&&a&&!d);return a}g["default"]=a}),98);
__d("setByPath",["invariant"],(function(a,b,c,d,e,f,g){"use strict";function a(a,b,c){a=a;for(var d=0;d<b.length;d++){var e=b[d];if(d===b.length-1){a[e]=c;return}!Object.prototype.hasOwnProperty.call(a,e)?a[e]={}:a[e]==null?a[e]={}:Array.isArray(a[e])||Object.prototype.toString.call(a[e])==="[object Object]"||g(0,1041,a[e]);a=a[e]}}f["default"]=a}),66);
__d("sumOfArray",[],(function(a,b,c,d,e,f){function a(a){var b=0,c=a.length;for(var d=0;d<c;++d)b+=a[d];return b}f["default"]=a}),66);
__d("XEventsPermalinkController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/events/{?location_slug}/{?name_slug}/{event_id}/",{privacy_mutation_token:{type:"String"},event_id:{type:"FBID",required:!0},location_slug:{type:"String"},name_slug:{type:"String"},event_time_id:{type:"FBID"},acontext:{type:"String"},active_tab:{type:"Enum",defaultValue:"about",enumType:1},end_cursor:{type:"String"},filter:{type:"String"},multi_permalinks:{type:"String"},post_id:{type:"Int"},view:{type:"Enum",enumType:1},ticket_order_id:{type:"FBID"},ref_page_id:{type:"FBID"},ti:{type:"String"},after_load_action:{type:"Enum",enumType:0}})}),null);