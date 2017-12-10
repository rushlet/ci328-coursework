const settingsText = {};

function mainMenu() {
    console.log('main menu');
    background = DontPanic.game.add.image(0, -20, 'home_background');
    let startButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY - 100, 'startButton', startGame, this);
    startButton.anchor.set(0.5);
    let settingsButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerX + 100, 'settingsButton', settingsMenu, this);
    settingsButton.anchor.set(0.5);
}

function settingsMenu() {
    //select difficulty on screen and update config
    DontPanic.game.world.removeAll(); //this might not be a good idea as all game assets will need to be loaded back in again?
    DontPanic.game.add.image(0, 0, 'background1');

    addText(DontPanic.game.world.centerX, 75, "Settings", 48, false, "", false);

    addText(DontPanic.game.world.centerX, 175, "Difficulty", 36);
    addText(DontPanic.game.world.centerX * 0.75, 220, "Easy", 24, true, "difficulty", true);
    addText(DontPanic.game.world.centerX * 1.25, 220, "Hard", 24, true, "difficulty");

    addText(DontPanic.game.world.centerX, 290, "Sound", 36);
    addText(DontPanic.game.world.centerX * 0.75, 335, "On", 24, true, "sound", true);
    addText(DontPanic.game.world.centerX * 1.25, 335, "Off", 24, true, "sound");

    addText(DontPanic.game.world.centerX, 405, "Ship Colour", 36);
    addText(DontPanic.game.world.centerX * 0.75, 450, "Red", 24, true, "colour", true);
    addText(DontPanic.game.world.centerX * 1.25, 450, "Blue", 24, true, "colour");

    addText(DontPanic.game.world.centerX, 580, "Back", 24, true, "back");
}

function addText(x, y, string, size, clickevent, category, selected) {
  var textOb = DontPanic.game.add.text(x, y, string, {
    font: `${size}px whoopass`,
  });
  textOb.anchor.setTo(0.5);
  textOb.align = 'center';
  textOb.fill = '#fff';
  textOb.fontSize = size;
  textOb.padding.set(16, 16);
  textOb.events.onInputDown.add(function (target) {
        colourText(textOb);
  });
  if (selected) {
    colourText(textOb);
  }
  if (clickevent) {
    textOb.inputEnabled = true;
    switch (category) {
      case "difficulty":
        textOb.events.onInputDown.add(difficultyListener, this, selected);
        console.log('selected: ', selected);
        break;
        case "back":
          textOb.events.onInputDown.add(mainMenu, this, selected);
        break;
      default: ;
    }
  }

}

function difficultyListener(input, selected) {
  console.log(input);
  console.log('hard:', settingsText);
  // var difficultyText__hard = addText(DontPanic.game.world.centerX * 1.25, 220, "Hard", 24, true, "difficulty", true);
}

function colourText(text) {
  console.log(text['style']['fill']);
  if (text['style']['fill'] == "#b8180c") {
    text.fill = "#fff";
    text.strokeThickness = 0;
  } else {
    text.fill = "#b8180c";
    text.stroke = "#f5a62a";
    text.strokeThickness = 3;
  }
}

function removeSelectedColour(text) {
  text.fill = "#fff";
  text.strokeThickness = 0;
}

function selectOption() {
  console.log(text['_text']);
}

function playAgainMenu() {
  console.log('called play again');
  DontPanic.game.world.removeAll(); //this might not be a good idea as all game assets will need to be loaded back in again?
  DontPanic.game.add.image(0, 0, 'background1');
  DontPanic.game.camera.resetFX();
  let bestDistanceText = addText(DontPanic.game.world.centerX, 190, `Best Distance: ${bestDistance}`, 30);
  let coinTotalText = addText(DontPanic.game.world.centerX, 220, `Total Coins: ${coinTotal}`, 30);
  let restartButton = DontPanic.game.add.button(DontPanic.game.world.width*0.5, DontPanic.game.world.height*0.5, 'playAgainButton', startGame, this);
  restartButton.anchor.set(0.5);
}
