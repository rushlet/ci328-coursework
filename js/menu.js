class MainMenu {
  constructor() {
    console.log('main menu');
    DontPanic.game.add.image(0, 0, 'background1');
    let startButton = DontPanic.game.add.button(DontPanic.game.world.width*0.5, DontPanic.game.world.height*0.25, 'startButton', startGame, this);
    startButton.anchor.set(0.5);
    let settingsButton = DontPanic.game.add.button(DontPanic.game.world.width*0.5, DontPanic.game.world.height*0.5, 'settingsButton', settingsMenu, this);
    settingsButton.anchor.set(0.5);
  }
}

function settingsMenu() {
  console.log('settings');
  //select difficulty on screen and update config
}
