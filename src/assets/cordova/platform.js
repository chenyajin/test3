// file: src/android/platform.js  
define("cordova/platform", function(require, exports, module) {  
  
module.exports = {  
    id: 'android',  
    // 平台启动处理(各个平台处理都不一样，比如ios就只需要触发onNativeReady)  
    bootstrap: function() {  
        var channel = require('cordova/channel'),  
            cordova = require('cordova'),  
            exec = require('cordova/exec'),  
            modulemapper = require('cordova/modulemapper');  
  
        // 把exec()的执行从WebCore线程变到UI线程上来  
        // 后台PluginManager初始化的时候默认添加了一个'PluginManager的插件  
        exec(null, null, 'PluginManager', 'startup', []);  
  
        // 触发onNativeReady事件通道，告诉JS本地代码已经完成  
        channel.onNativeReady.fire();  
  
        // app插件。现在没有被单独抽出去，没找到合适的地方。  
        modulemapper.clobbers('cordova/plugin/android/app', 'navigator.app');  
  
        // 给返回按钮注意个监听器  
        var backButtonChannel = cordova.addDocumentEventHandler('backbutton');  
        backButtonChannel.onHasSubscribersChange = function() {  
            // 如果只为返回按钮定义了1个事件监听器的话，通知后台覆盖默认行为  
            exec(null, null, "App", "overrideBackbutton", [this.numHandlers == 1]);  
        };  
  
        // 添加菜单和搜素的事件监听  
        cordova.addDocumentEventHandler('menubutton');  
        cordova.addDocumentEventHandler('searchbutton');  
  
        // 启动完成后，告诉本地代码显示WebView  
        channel.onCordovaReady.subscribe(function() {  
            exec(null, null, "App", "show", []);  
        });  
    }  
};  
  
});  