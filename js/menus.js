var settingsText;
var settingsText__difficulty;
var settingsText__sound;
var settingsText__colour;

function mainMenu() {
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
  textOb.inputEnabled = true;
  addCategorySpecifics(textOb, category);
  if (selected) {
    colourText(textOb);
  }
}

function addCategorySpecifics(textOb, category) {
  switch (category) {
    case "difficulty":
      settingsText__difficulty.add(textOb);
      textOb.events.onInputDown.add(difficultyListener, this);
      textOb.input.useHandCursor = true;
      break;
    case "sound":
      settingsText__sound.add(textOb);
      textOb.events.onInputDown.add(soundListener, this);
      textOb.input.useHandCursor = true;
      break;
    case "colour":
      settingsText__colour.add(textOb);
      textOb.events.onInputDown.add(colourListener, this);
      textOb.input.useHandCursor = true;
      break;
    case "back":
      textOb.events.onInputDown.add(mainMenu, this);
      textOb.input.useHandCursor = true;
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
  DontPanic.game.gameOver.destroy();
  DontPanic.game.camera.resetFX();
  const restartButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY, 'playAgainButton', startGame, this);
  restartButton.anchor.set(0.5);
  const settingsButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY + 100, 'settingsButton', settingsMenu, this);
  settingsButton.anchor.set(0.5);
  if (newBestScore) {
    const bestDistanceText = addText(DontPanic.game.world.centerX, 190, `New Best Distance!!\n${bestDistance}`, 30);
  } else {
    const bestDistanceText = addText(DontPanic.game.world.centerX, 190, `Best Distance: ${bestDistance}`, 30);
  }
}
