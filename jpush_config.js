//启动极光推送服务
            try {
                if (window.plugins.jPushPlugin) {
                    window.plugins.jPushPlugin.init();
                    window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                    window.plugins.jPushPlugin.setBadge(0);
                    document.addEventListener("jpush.openNotification", function (event) {
                        var alertContent, url, params, id, target = {};
                        if (device.platform == "Android") {
                            alertContent = window.plugins.jPushPlugin.openNotification.alert;
                            var extras = window.plugins.jPushPlugin.openNotification.extras['cn.jpush.android.EXTRA'];
                            url = extras.url;
                            params = extras.params;
                            id = extras.id;
                        } else {
                            url = event.url;
                            params = event.params;
                            id = event.id;
                            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                            window.plugins.jPushPlugin.setBadge(0);
                        }
                        target[params] = id;
                        $state.go(url, target);
                    }, false);
                    document.addEventListener("jpush.receiveNotification", function (event) {
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                        window.plugins.jPushPlugin.setBadge(0);
                    });
                }
            } catch (ex) {
                console.log(ex);
            }
/*极光推送推送不了，有一个方法，就是把插件放到 package.js中*/
/*ionig命令行*/
/*cordova plugin --save*/