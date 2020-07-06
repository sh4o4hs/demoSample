/* ************************************************************************
 *
 *   Copyright:
 *
 *   License:
 *
 *   Authors:
 *
 ************************************************************************ */

import m from 'mithril';
import * as comGame from 'component/gamePIXI';
import comAV from 'component/av';

let objList = [];

export function add (obj, index = 0) {
  objList[index] = obj;
  m.redraw();
}

export function remove (index = 0) {
  objList[index] = null;
  let last = objList.pop();
  if (index < objList.length) {
    objList[index] = last;
  }
  m.redraw();
}

let visibleVideo = false;
export function showVideo () {
  visibleVideo = true;
  m.redraw();
}

// 預設值
let videoSetting = {
  source: 'wss://lcsvd001001wss.streamingvds.com:18074/'
};
export function setVideoSource (src) {
  console.log('setVideoSource : ' + src);
  videoSetting.source = src;
  if (videoSetting.setSource) {
    videoSetting.setSource(src);
  }
}

// 設定最大顯示畫面
export let style = {
  position: 'absolute',
  left: '0%',
  top: '0%',
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0)'
};

/**
 * 啟動程式
 * @returns {void}
 */
export async function run () {


  let Application = {
    view () {
      return m('.',
        {
          style: {
            position: 'absolute',
            left: '0%',
            top: '0%',
            width: style.width,
            height: style.height
          }
        },
        objList.map(obj => {
          return m(obj.com, obj.attrs);
        }),

        visibleVideo ? m(comAV, {
          style: {
            position: 'absolute',
            zIndex: 1_000,
            left: '30%',
            top: '30%',
            width: '40%',
            height: '40%'
          },
          setting: videoSetting
        }) : null
      );
    }
  };

  m.mount(document.body, Application);

  // 初始化
  await comGame.init();
}
