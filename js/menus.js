var settingsText;
var settingsText__difficulty;
var settingsText__sound;
var settingsText__colour;

function mainMenu() {
    console.log('main menu');
    background = DontPanic.game.add.image(0, -20, 'home_background');
    let startButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY - 120, 'startButton', startGame, this);
    startButton.anchor.set(0.5);
    let settingsButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY - 60, 'settingsButton', settingsMenu, this);
    settingsButton.anchor.set(0.5);
}

function settingsMenu() {
    DontPanic.game.world.removeAll(); //this might not be a good idea as all game assets will need to be loaded back in again?
    DontPanic.game.add.image(0, 0, 'background1');
    settingsText = DontPanic.game.add.group();

    const currentSettings = getCurrentSettings();

    addText(DontPanic.game.world.centerX, 75, "Settings", 48, false, "", false);

    settingsText__difficulty = DontPanic.game.add.group();
    addText(DontPanic.game.world.centerX, 175, "Difficulty", 36);
    addText(DontPanic.game.world.centerX * 0.75, 220, "Easy", 24,  true, "difficulty", currentSettings.easy);
    addText(DontPanic.game.world.centerX * 1.25, 220, "Hard", 24,  true, "difficulty", !currentSettings.easy);

    settingsText__sound = DontPanic.game.add.group();
    addText(DontPanic.game.world.centerX, 290, "Sound", 36);
    addText(DontPanic.game.world.centerX * 0.75, 335, "On", 24, true, "sound", currentSettings.soundOn);
    addText(DontPanic.game.world.centerX * 1.25, 335, "Off", 24,  true, "sound", !currentSettings.soundOn);

    settingsText__colour = DontPanic.game.add.group();
    addText(DontPanic.game.world.centerX, 405, "Ship Colour", 36);
    addText(DontPanic.game.world.centerX * 0.75, 450, "Red", 24, true, "colour", currentSettings.red);
    addText(DontPanic.game.world.centerX * 1.25, 450, "Blue", 24, true, "colour", !currentSettings.red);

    addText(DontPanic.game.world.centerX, 580, "Back", 24, true, "back");

    settingsText.add(settingsText__difficulty);
    settingsText.add(settingsText__sound);
    settingsText.add(settingsText__colour);

    console.log(settingsText);
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
  // textOb.events.onInputDown.add(function (target) {
  //       colourText(textOb);
  // });
  addToGroup(textOb, category);
  if (selected) {
    colourText(textOb);
  }
  if (clickevent) {
    textOb.inputEnabled = true;
    switch (category) {
      case "difficulty":
        textOb.events.onInputDown.add(difficultyListener, this);
        break;
      case "sound":
        textOb.events.onInputDown.add(soundListener, this);
        break;
      case "colour":
        textOb.events.onInputDown.add(colourListener, this);
        break;
      case "back":
        textOb.events.onInputDown.add(mainMenu, this);
        break;
      default: ;
    }
  }
}

function addToGroup(textOb, category) {
  switch (category) {
    case "difficulty":
      settingsText__difficulty.add(textOb);
      break;
    case "sound":
      settingsText__sound.add(textOb);
      break;
    case "colour":
      settingsText__colour.add(textOb);
      break;
    default: ;
  }
}

function getCurrentSettings() {
  const currentSettings = {};
  var level = config.currentLevel;
  if (level == "easy") {
    currentSettings["easy"] = true;
  }
  else {
    currentSettings["easy"] = false;
  }
  currentSettings["soundOn"] = config.soundOn;
  var playerColour = config.playerColour;
  if (playerColour == "red") {
    currentSettings["red"] = true;
  }
  else {
    currentSettings["red"] = false;
  }

  return currentSettings;
}

function difficultyListener(input) {
  let previousSelection = config.currentLevel;
  config.currentLevel = input["_text"].toLowerCase();
  if (config.currentLevel != previousSelection) {
    for (var i = 0; i < settingsText__difficulty.children.length; i++) {
      colourText(settingsText__difficulty.children[i]);
    }
  }
  getCurrentSettings();
}

function soundListener(input) {
  let previousSelection = config.soundOn; //true or false
  if (input["_text"].toLowerCase() == "on") {
    config.soundOn = true;
  } else {
    config.soundOn = false;
  }
  if (config.soundOn != previousSelection) {
    for (var i = 0; i < settingsText__sound.children.length; i++) {
      colourText(settingsText__sound.children[i]);
    }
  }
  getCurrentSettings();
}

function colourListener(input) {
  let previousSelection = config.playerColour;
  config.playerColour = input["_text"].toLowerCase();
  if (config.playerColour != previousSelection) {
    for (var i = 0; i < settingsText__colour.children.length; i++) {
      colourText(settingsText__colour.children[i]);
    }
  }
  getCurrentSettings();
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

function playAgainMenu() {
  DontPanic.game.world.removeAll(); //this might not be a good idea as all game assets will need to be loaded back in again?
  DontPanic.game.add.image(0, 0, 'background1');
  DontPanic.game.camera.resetFX();
  const bestDistanceText = addText(DontPanic.game.world.centerX, 190, `Best Distance: ${bestDistance}`, 30);
  const coinTotalText = addText(DontPanic.game.world.centerX, 220, `Total Coins: ${coinTotal}`, 30);
  const restartButton = DontPanic.game.add.button(DontPanic.game.world.width*0.5, DontPanic.game.world.height*0.5, 'playAgainButton', startGame, this);
  restartButton.anchor.set(0.5);
  const settingsButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY + 100, 'settingsButton', settingsMenu, this);
  settingsButton.anchor.set(0.5);
}
