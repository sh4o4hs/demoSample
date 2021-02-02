import app from 'entity/app';
import Main from 'entity/main';


/**
 * 建立遊戲 (舊版)
 */
let Command = {
  async handle (obj) {

    console.log('[收到] create :' + JSON.stringify(obj));


    app.decimal = 2;
    let main = Main.getSingleton();
    if (main) {
      let mainSet = await import('entity/mainSet');
      main.setInitMap(mainSet.normal);
      main.eventFinish();
      main.addToScene();
    }
    app.game.play();

    if (app.game.scene.setOverviewVisible) {
      app.game.scene.setOverviewVisible(false);
    }

    // 歷程 開始遊戲
    if (app.game.report) {
      app.game.report.loadEnd(app.recordStart);
      app.game.report.log('開始遊戲');
    }
  }
};

export default Command;


/**
 * 建立遊戲 (新版)
 */
export async function send () {
  let net = await import('net/network');

  // 傳送
  let netCmd = net.getCommand();
  const CMD = netCmd.CMD;
  let dataObj = {};

  console.log('[傳送] 建立遊戲');
  let result = await net.sendCommand(CMD.CREATE, dataObj);

  // 判斷是否是舊版
  if ((typeof result === 'number') || (typeof result === 'boolean')) {
    return;
  }

  console.log('[收到] 建立遊戲');
  console.log(result);

  app.decimal = 2;
  let main = Main.getSingleton();
  if (main) {
    let mainSet = await import('entity/mainSet');
    main.setInitMap(mainSet.normal);
    main.eventFinish();
    main.addToScene(app.game);
  }
  app.game.play();
}
