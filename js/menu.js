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

function settingsMenu(startButton, settingsButton) {
  console.log('settings');
  //select difficulty on screen and update config
  DontPanic.game.world.removeAll(); //this might not be a good idea as all game assets will need to be loaded back in again?
  DontPanic.game.add.image(0, 0, 'background1');
  var settingsTitle = addText(DontPanic.game.world.centerX, 75, "Settings", 36, false, "bold");

  var difficultyText = addText(DontPanic.game.world.centerX, 175, "Difficulty", 30);
  var difficultyText__easy = addText(DontPanic.game.world.centerX * 0.75, 220, "Easy", 24, true);
  var difficultyText__hard = addText(DontPanic.game.world.centerX * 1.25, 220, "Hard", 24);

  var soundText = addText(DontPanic.game.world.centerX, 290, "Sound", 30);
  var soundText__on = addText(DontPanic.game.world.centerX * 0.75, 335, "On", 24, true);
  var soundText__off = addText(DontPanic.game.world.centerX * 1.25, 335, "Off", 24);

  var customiseText = addText(DontPanic.game.world.centerX, 405, "Ship Colour", 30);
  var customiseText__red = addText(DontPanic.game.world.centerX * 0.75, 450, "Red", 24, true);
  var customiseText__blue = addText(DontPanic.game.world.centerX * 1.25, 450, "Blue", 24);
}

function addText(x, y, string, size, selected, weight) {
  var textOb = DontPanic.game.add.text(x, y, string);
  textOb.anchor.setTo(0.5);
  textOb.align = 'center';
  textOb.fill = '#fff';
  textOb.fontSize = size;
  textOb.fontWeight = weight;
  if (selected) {
    colourSelectedText(textOb);
  }
}

function colourSelectedText(text) {
  text.fill = '#ff6a07';
}

function selectOption() {

}

function playAgainMenu() {
  console.log('called play again');
  DontPanic.game.world.removeAll(); //this might not be a good idea as all game assets will need to be loaded back in again?
  DontPanic.game.add.image(0, 0, 'background1');
  DontPanic.game.camera.resetFX();
  let restartButton = DontPanic.game.add.button(DontPanic.game.world.width*0.5, DontPanic.game.world.height*0.5, 'playAgainButton', startGame, this);
  restartButton.anchor.set(0.5);
}
