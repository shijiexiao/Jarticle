import {
    Atom_Wise_Utils as alaUtil,
    numberic,
    UrlParams
} from '@baidu/vui-utils';
import { FormatFn } from '../../dataModifier';
import { PageDataSub } from '../../interface';
import { AlaData, BaiduappParam } from '../../shared/type/commonVuiType';
interface CommonData {
    sfIsSfLink: string;
    poster: string;
    duration: string;
    baijiahao_id?: string;
    loc: string;
    log_loc?: string;
    vid?: string;
    sfUrl?: string;
    url: string;
}
export interface ZkCardInputVideo extends CommonData {
    title: string;
    src?: string;
    jsy?: string;
    na_share_url?: string;
    nid?: string;
    jumpUrl?: string;
    cambrian_id?: string;
    na_invoke_type?: numberic;
    // 手百na调起 相关
    baiduapp_param?: BaiduappParam;
}
export interface ZkCardOutputVideo extends CommonData {
    urlParams: UrlParams;
    videoSrc: string;
    jsy: numberic;
    naInvokeType: number;
    srcid: numberic;
    baiduappParam?: BaiduappParam;
    oriduration: numberic;
    isSfLink?: number;
    simplifyUrl: boolean;
}
export function zkCardVideoProcess(video: ZkCardInputVideo): ZkCardOutputVideo | undefined {
    if (!video) {
        return;
    }
    const pageData = alaUtil.getTemplateVars('pageData') as PageDataSub;
    const alaData = alaUtil.getTemplateVars('alaData') as AlaData;
    const slimType = pageData.queryDispInfo ? +pageData.queryDispInfo.slim_type : 0;
    const simplifyUrlDegrade = slimType === 3 || slimType === 4;
    // 系统信息
    const isAndroid = alaUtil.getUserAgentInfo('isAndroid');
    const sop = {
        view: {
            _hold: 2
        },
        useWebview: isAndroid
    };
    const _sf_options = JSON.stringify(sop);
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    let output = {} as ZkCardOutputVideo;
    const itemUrl = video.jumpUrl;
    let urlParams: UrlParams = {
        type: 'tc',
        tcUrl: ''
    };
    // 跳转na标记，是否能调NA，后端已判断版本号，前端无需判断，11.13及以上机制
    const naInvokeType = parseInt(video.na_invoke_type as string, 10);
    const isSfLink = parseInt(video.sfIsSfLink, 10);
    const {
        baijiahao_id,
        loc = '',
        log_loc = '',
        jsy
    } = video;
    const extra: {
        loc: string;
        log_loc: string;
        jsy: string;
        baijiahao_id: string;
        hejiLoc?: string;
    } = {
        loc: encodeURIComponent(loc),
        log_loc: encodeURIComponent(log_loc),
        jsy,
        baijiahao_id
    };
    const invokeImmersiveMatch = naInvokeType === 3 || naInvokeType === 5 || naInvokeType === 4;
    // 点击宣发视频进入极速页/沉浸式时，传fr0=A9，fr1=A9，frsrcid=具体资源号。
    if (invokeImmersiveMatch) {
        video.jumpUrl = `${video.jumpUrl}&fr0=A9&fr1=A9`;
        if (!video.baiduapp_param.extRequest) {
            video.baiduapp_param.extRequest = { fr0: 'A9', fr1: 'A9' };
        }
        video.baiduapp_param.extRequest.fr0 = video.baiduapp_param.extRequest.fr0 || 'A9';
        video.baiduapp_param.extRequest.fr1 = video.baiduapp_param.extRequest.fr1 || 'A9';
        video.baiduapp_param.videoInfo.ext_log.fr0 = video.baiduapp_param.videoInfo.ext_log.fr0 || 'A9';
        video.baiduapp_param.videoInfo.ext_log.fr1 = video.baiduapp_param.videoInfo.ext_log.fr1 || 'A9';
        const {
            na_invoke_type,
            jumpUrl,
            cambrian_id,
            baijiahao_id,
            sfUrl,
            baiduapp_param
        } = video;
        const canInvokeImmersive = true;
        const vidNaData = {
            na_invoke_type,
            jumpUrl,
            cambrian_id,
            baijiahao_id,
            sfUrl,
            baiduapp_param,
            loc: loc,
            log_loc: log_loc,
            jsy,
            simplifyUrlDegrade,
            title: video.title,
            canInvokeImmersive,
            nid: video.nid
        };
        urlParams = alaUtil.makeVidNaLink(vidNaData);
    } else if (isSfLink == 1) {
        // 标记C页面来源
        video.sfUrl = `${video.sfUrl}&fr0=A9&fr1=A9`;
        urlParams = alaUtil.makeSfLink(video.sfUrl, {
            options: _sf_options,
            cyc: 1,
            undecode: '1',
            hwj: video.cambrian_id,
            delTitle: simplifyUrlDegrade,
            extra: simplifyUrlDegrade ? JSON.stringify(extra) : ''
        });
    } else {
        urlParams = alaUtil.makeTcLink(itemUrl, {
            undecode: 1,
            cyc: 1,
            hwj: video.cambrian_id,
            extra: simplifyUrlDegrade && jsy === '1' ? JSON.stringify(extra) : ''
        });
    }
    const data = {
        // 未加转义，不可用于a-html
        isSfLink,
        urlParams: urlParams,
        poster: video.poster,
        srcid: alaData.aladdinResourceId,
        duration: FormatFn.Vid_Format_DurTime(video.duration),
        oriduration: video.duration,
        videoSrc: video.src,
        baiduappParam: video.baiduapp_param,
        naInvokeType: naInvokeType,
        vid: video.nid,
        baijiahao_id: video.baijiahao_id,
        loc: video.loc,
        log_loc: video.log_loc,
        jsy: +video.jsy,
        simplifyUrl: simplifyUrlDegrade,
        jumpUrl: video.sfUrl
    };
    output = { ...output, ...data };
    return output;
}