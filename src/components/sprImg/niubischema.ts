/**
 * 热点调起通用mixin
 */
/* eslint-disable no-var */
/* eslint-disable fecs-use-method-definition */
/* eslint-disable fecs-prefer-destructure */
/* eslint-disable no-redeclare */
define(function (require) {
    var _ = require('@baidu/ala-util/lodash');
    var Util = require('@baidu/ala-util');
    var AlaUtil = require('@baidu/ala-util/ala');
    var Box = require('uiamd/bdbox/base');
    var ua = require('@searchfe/user-agent');
    var Invokebox = require('modules/invoke/invokebox');
    var utils = require('./utils');

    return {
        methods: {
            /**
             * 调起端能力协议
             */
            invoke: function (scheme) {
                var $node = document.createElement('iframe');
                $node.style.display = 'none';
                $node.src = scheme;
                var body = document.body || document.getElementsByTagName('body')[0];
                body.appendChild($node);
                // 销毁 iframe
                setTimeout(function () {
                    body.removeChild($node);
                    $node = null;
                }, 0);
            },
            /**
             * 基于openBox调起手百
             */
            invokeBaiduApp: function (options) {
                var openScheme = options.openScheme;
                var failUrl = options.failUrl;
                var sourceOptions = options.sourceOptions;
                var invokeOptions = {
                    from: sourceOptions.from,
                    channel: sourceOptions.channel,
                    notUseIdm: true,
                    failUrl: failUrl,
                    iosScheme: openScheme,
                    /* eslint-disable fecs-camelcase */
                    androidCommand: openScheme,
                    failCallback: function () {
                        window.location.href = failUrl;
                    }
                };
                var openBox = new Invokebox();
                openBox.ready(function () {
                    openBox.open(invokeOptions);
                });
            },
            /**
             * 端外调起、短视频na、直播na的点击处理
             */
            clickLink: function (e, obj, isbtn) {
                // 暂时的trick逻辑，防止按钮的点击事件冒泡过程中被外层方法拦截，导致无法被结果页绑定的点击事件监听
                // 长线，dom结构优化，跳转区域划分
                if (!isbtn && this.btnLength > 0) {
                    var pathDom = e.composedPath();
                    var connectDom = [pathDom[0], pathDom[1]];
                    var flag = false;
                    for (var i = 0; i < this.btnLength; i++) {
                        if (this.$refs.button[i] && connectDom.includes(this.$refs.button[i].$el)) {
                            flag = true;
                        }
                    }
                    if (flag) {
                        return;
                    }
                }

                e.stopPropagation();

                // 端外调起
                if (obj.openBox) {
                    e.preventDefault();
                    var target = AlaUtil.makeTcLink({
                        src: obj.invokeFailUrl
                    }, this.tplInfo);
                    var options = {
                        openScheme: obj.invokeScheme,
                        androidCommand: obj.invokeScheme,
                        failUrl: target,
                        sourceOptions: {
                            from: '1024136l',
                            channel: '1024136u'
                        }
                    };
                    if (obj.sourceOptions && obj.sourceOptions.from && obj.sourceOptions.channel) {
                        options.sourceOptions = obj.sourceOptions;
                    }
                    this.invokeBaiduApp(options);
                    return;
                }
                // 11.13以上，解析端能力协议，添加xpath，用于视频分发统计
                if (obj.isNew && obj.isNa) {
                    e.preventDefault();
                    var data = this.formatschema(obj.scheme);
                    this.dspOpenNa(e, data, obj.na_invoke_type, obj.scheme);
                    return;
                }
                // 直播也算入视频分发，需添加xpath
                if (obj.isNew && obj.isLiveNa) {
                    e.preventDefault();
                    var data = this.formatschema(obj.scheme);
                    this.liveOpenNa(e, data);
                    return;
                }

                // 兼容当前逻辑日志处理逻辑的trick方案，这里需要重构
                if (obj.isTiebaRoomNa) {
                    e.preventDefault();
                    var data = this.formatschema(obj.scheme);
                    this.openTiebaRoomNa(e, data);
                    return;
                }

                var options = {
                    type: 'na',
                    action: obj.action,
                    xpath: utils.getXpath(e.target),
                    cyc: '1'
                };

                // 添加直播打点参数 http://wiki.baidu.com/pages/viewpage.action?pageId=1089223743
                if (obj.baidulive_param && obj.baidulive_param.id) {
                    options.live_room_id = obj.baidulive_param.id;
                }
                AlaUtil.sendLog(options, this.tplInfo);
                this.invoke(obj.scheme);
            },
            /**
             * 格式化端能力协议
             */
            formatschema: function (schema) {
                // 点击时 处理 schema，为了在 tc 日志中拼接xpath
                var params = schema.split('?')[1].split('&');
                var formattedParams = {};
                for (var i = 0; i < params.length; i++) {
                    formattedParams[params[i].split('=')[0]] = params[i].split('=')[1];
                }
                var searchParams = JSON.parse(decodeURIComponent(formattedParams.searchParams));
                var baiduappParams = JSON.parse(decodeURIComponent(formattedParams.params));
                var log = searchParams.logUrl;
                var loglist =  log.split('?')[1].split('&');
                var logParams = {};
                loglist.map(function (item) {
                    var objArr = item.split('=');
                    logParams[objArr[0]] = objArr[1];
                });
                return {
                    baiduappParams: baiduappParams,
                    logParams: logParams,
                    searchParams: searchParams
                };
            },
            /**
             * 短视频na协议拼接
             */
            dspOpenNa: function (e, data, natype, iosSchema) {
                data.searchParams.logUrl = this._makeTcLog(e, data);
                var schema = '';
                natype = parseInt(natype, 10);
                if (iosSchema) {
                    Box.schema(iosSchema);
                    return;
                }
                // 短线na调起
                if (natype === 1) {
                    schema = 'baiduboxapp://v43/browserVideo/invokeVideoLandingPage?';
                }
                else if (natype === 3) {
                    if (ua.isAndroid()) {
                        schema = 'baiduboxapp://video/invokeVideoDetail?';
                        schema += 'toolbaricons={"toolids":["2","3"]}&';
                    }
                }
                schema = schema + 'params=' + encodeURIComponent(JSON.stringify(data.baiduappParams))
                        + '&searchParams=' + encodeURIComponent(JSON.stringify(data.searchParams));
                Box.schema(schema);
            },
            /**
             * 直播na协议拼接
             */
            liveOpenNa: function (e, data) {
                data.searchParams.logUrl = this._makeTcLog(e, data);
                var schema = 'baiduboxapp://v11/live/enterRoom?';
                schema = schema + 'params=' + encodeURIComponent(JSON.stringify(data.baiduappParams))
                        + '&searchParams=' + encodeURIComponent(JSON.stringify(data.searchParams));
                Box.schema(schema);
            },
            /**
             * 秀场贴吧直播
             */
            openTiebaRoomNa: function (e, data) {
                data.searchParams.logUrl = this._makeTcLog(e, data);
                var schema = 'baiduboxapp://v33/live/enterTiebaRoom?';
                schema = schema + 'params=' + encodeURIComponent(JSON.stringify(data.baiduappParams))
                        + '&searchParams=' + encodeURIComponent(JSON.stringify(data.searchParams));
                Box.schema(schema);
            },
            /**
             * 拼接tcLog，添加xpath
             */
            _makeTcLog: function (e, data){ // eslint-disable-line
                var t = +new Date();
                var xpath = utils.getXpath(e.target);
                var originLogParams = data.logParams || {};
                /* eslint-disable fecs-camelcase */
                originLogParams.clk_info = decodeURIComponent(originLogParams.clk_info);
                originLogParams.src = decodeURIComponent(originLogParams.src);
                var clkInfo = _.assign({}, JSON.parse(originLogParams.clk_info), {
                    t: t,
                    xpath: xpath
                });
                return 'https://m.baidu.com/tc?' + Util.URL.params(_.assign(originLogParams, {
                    clk_info: JSON.stringify(clkInfo), // eslint-disable-line
                    ala_clk_t: $(e.target).text().substr(0,20) // eslint-disable-line
                }));
            }
        }
    };
});
