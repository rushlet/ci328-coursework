var settingsText;
var settingsText__difficulty;
var settingsText__sound;
var settingsText__colour;

function mainMenu() {
    DontPanic.background = DontPanic.game.add.image(0, -40, 'home_background');
    DontPanic.startButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY - 120, 'startButton', startGame, this);
    DontPanic.startButton.anchor.set(0.5);
    DontPanic.settingsButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY - 60, 'settingsButton', settingsMenu, this);
    DontPanic.settingsButton.anchor.set(0.5);
}

function settingsMenu() {
    DontPanic.game.world.removeAll();
    DontPanic.game.add.image(0, 0, 'background1');
    DontPanic.settingsText = DontPanic.game.add.group();

    const currentSettings = getCurrentSettings();

    addText(DontPanic.game.world.centerX, 75, "Settings", config.style.fontSize_title, false, "", false);

    settingsText__difficulty = DontPanic.game.add.group();
    addText(DontPanic.game.world.centerX, 175, "Difficulty", config.style.fontSize_heading);
    addText(DontPanic.game.world.centerX * 0.75, 220, "Easy", config.style.fontSize_default,  true, "difficulty", currentSettings.easy);
    addText(DontPanic.game.world.centerX * 1.25, 220, "Hard", config.style.fontSize_default,  true, "difficulty", !currentSettings.easy);

    settingsText__sound = DontPanic.game.add.group();
    addText(DontPanic.game.world.centerX, 290, "Sound", config.style.fontSize_heading);
    addText(DontPanic.game.world.centerX * 0.75, 335, "On", config.style.fontSize_default, true, "sound", currentSettings.soundOn);
    addText(DontPanic.game.world.centerX * 1.25, 335, "Off", config.style.fontSize_default,  true, "sound", !currentSettings.soundOn);

    settingsText__colour = DontPanic.game.add.group();
    addText(DontPanic.game.world.centerX, 405, "Ship Colour", config.style.fontSize_heading);
    addText(DontPanic.game.world.centerX * 0.75, 450, "Red", config.style.fontSize_default, true, "colour", currentSettings.red);
    addText(DontPanic.game.world.centerX * 1.25, 450, "Blue", config.style.fontSize_default, true, "colour", !currentSettings.red);

    addText(DontPanic.game.world.centerX, 550, "Play", config.style.fontSize_default, true, "play");

    DontPanic.settingsText.add(settingsText__difficulty);
    DontPanic.settingsText.add(settingsText__sound);
    DontPanic.settingsText.add(settingsText__colour);
}

function addText(x, y, string, size, clickevent, category, selected) {
  var textOb = DontPanic.game.add.text(x, y, string, {
    font: `${size} ${config.style.font}`,
  });
  textOb.anchor.setTo(0.5);
  textOb.align = 'center';
  textOb.fill = config.style.textColour;
  textOb.fontSize = size;
  textOb.padding.set(16, 16);
  textOb.inputEnabled = true;
  textOb.input.useHandCursor = clickevent;
  addCategorySpecifics(textOb, category);
  if (selected) {
    colourText(textOb);
  }
  return textOb;
}

function addCategorySpecifics(textOb, category) {
  switch (category) {
    case "difficulty":
      settingsText__difficulty.add(textOb);
      textOb.events.onInputDown.add(difficultyListener, this);
      break;
    case "sound":
      settingsText__sound.add(textOb);
      textOb.events.onInputDown.add(soundListener, this);
      break;
    case "colour":
      settingsText__colour.add(textOb);
      textOb.events.onInputDown.add(colourListener, this);
      break;
    case "play":
      DontPanic.settingsText.add(textOb);
      textOb.events.onInputDown.add(startGame, this);
      break;
    default: ;
  }
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
  let previousSelection = config.soundOn;
  config.soundOn = (input["_text"].toLowerCase() == "on") ?  true : false;
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

function getCurrentSettings() {
  const currentSettings = {};
  currentSettings["easy"] = (config.currentLevel == "easy") ?  true : false;
  currentSettings["soundOn"] = config.soundOn;
  currentSettings["red"] = (config.playerColour == "red") ?  true : false;
  return currentSettings;
}

function colourText(text) {
  if (text['style']['fill'] == config.style.textColour_highlight) {
    text.fill = config.style.textColour;
    text.strokeThickness = 0;
  } else {
    text.fill = config.style.textColour_highlight;
    text.stroke = config.style.textColour_highlightOutline;
    text.strokeThickness = 3;
  }
}

function playAgainMenu() {
  DontPanic.game.gameOver.kill();
  DontPanic.game.camera.resetFX();
  DontPanic.playAgain = DontPanic.game.add.group();
  const restartButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY, 'playAgainButton', startGame, this);
  restartButton.anchor.set(0.5);
  const settingsButton = DontPanic.settingsButton;
  settingsButton.y = DontPanic.game.world.centerY + 100;
  DontPanic.playAgain.add(restartButton);
  DontPanic.playAgain.add(settingsButton);
  if (DontPanic.newBestScore) {
    const bestDistanceText = addText(DontPanic.game.world.centerX, 190, `New Best Distance!!\n${DontPanic.bestDistance}`, config.style.fontSize_bestDistance);
  } else {
    const bestDistanceText = addText(DontPanic.game.world.centerX, 190, `Best Distance: ${DontPanic.bestDistance}`, config.style.fontSize_bestDistance);
  }
  DontPanic.pauseButton.kill();
}

function pauseMenu() {
  if (!DontPanic.game.paused) {
    DontPanic.game.paused = true;
    DontPanic.paused = DontPanic.game.add.group();
    const pausedText = addText(DontPanic.game.world.centerX, 190, 'Paused', config.style.fontSize_title);
    const settingsButton = DontPanic.settingsButton;
    settingsButton.y = DontPanic.game.world.centerY;
    DontPanic.paused.add(pausedText);
    DontPanic.paused.add(settingsButton);
    DontPanic.pauseButton.loadTexture('playIcon');
  } else {
    DontPanic.paused.kill();
    DontPanic.game.paused = false;
    DontPanic.pauseButton.loadTexture('pauseIcon');
  }
}
