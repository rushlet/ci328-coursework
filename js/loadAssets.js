function loadMainImages() {
  DontPanic.game.load.image('background1', 'assets/img/space_background.png');
  DontPanic.game.load.image('home_background', 'assets/img/game_screen.jpg');
  DontPanic.game.load.spritesheet('rocket_red', 'assets/img/rocket_spritesheet1.png', 115, 175);
  DontPanic.game.load.spritesheet('rocket_blue', 'assets/img/rocket_spritesheet_blue1.png', 115, 175);
  DontPanic.game.load.spritesheet('enemyShip', 'assets/img/enemy_ship_spritesheet1.png', 440, 1140);
  DontPanic.game.load.image('coin', 'assets/img/coin_2.png');
  DontPanic.game.load.image('extraLife', 'assets/img/extra_life.png');
}

function loadUIAssets() {
  DontPanic.game.load.image('startButton', 'assets/img/button_start.png'); // placeholders for now
  DontPanic.game.load.image('settingsButton', 'assets/img/button_settings.png'); // placeholders for now
  DontPanic.game.load.image('playAgainButton', 'assets/img/button_play-again.png'); // placeholders for now
  DontPanic.game.load.image('heart', 'assets/img/life.png');
  DontPanic.game.load.image('pauseIcon', 'assets/img/pause-button.png');
  DontPanic.game.load.image('playIcon', 'assets/img/play-button.png');
}

function loadImprobabilityDriveImages() {
  DontPanic.game.load.spritesheet('red_button', 'assets/img/iid/iid-button1.png', 152, 119);
  DontPanic.game.load.image('IID_background1', 'assets/img/iid/iid_bg.png');
  DontPanic.game.load.spritesheet('IID_enemy1', 'assets/img/iid/iid_enemy1.png', 440, 1140);
  DontPanic.game.load.spritesheet('IID_player1', 'assets/img/iid/iid_player1.png', 115, 175);
  DontPanic.game.load.image('IID_teacup', 'assets/img/iid/tea.png');
  DontPanic.game.load.image('whale', 'assets/img/iid/whale.png');
  DontPanic.game.load.image('petunias', 'assets/img/iid/flowers.png');
  DontPanic.game.load.image('IID_background2', 'assets/img/iid/iid_bg2.png');
  DontPanic.game.load.spritesheet('IID_enemy2', 'assets/img/iid/iid_enemy3.png', 440, 1140);
  DontPanic.game.load.spritesheet('IID_player2', 'assets/img/iid/iid_player2.png', 115, 175);
  DontPanic.game.load.image('IID_coin2', 'assets/img/iid/iid_coin1.png');
  DontPanic.game.load.image('IID_background3', 'assets/img/iid/iid_bg1.png');
  DontPanic.game.load.spritesheet('IID_enemy3', 'assets/img/iid/iid_enemy.png', 440, 1140);
  DontPanic.game.load.spritesheet('IID_player3', 'assets/img/iid/iid_player3.png', 115, 175);
  DontPanic.game.load.image('IID_coin3', 'assets/img/iid/diamond.png');
}

function loadAudio() {
  DontPanic.game.load.audio('coinPing', 'assets/audio/coin_collection.wav');
  DontPanic.game.load.audio('backgroundMusic', 'assets/audio/background_music.wav');
  DontPanic.game.load.audio('abduction', 'assets/audio/abduction.wav');
  DontPanic.game.load.audio('abductionFail', 'assets/audio/abduction-fail.wav');
  DontPanic.game.load.audio('lifePing', 'assets/audio/extra-life.mp3');
  DontPanic.game.load.audio('obstacleWhoosh', 'assets/audio/obstacle-fall.mp3');
  DontPanic.game.load.audio('obstacleCollision', 'assets/audio/obstacle-collision.wav');
  DontPanic.game.load.audio('gameOver', 'assets/audio/game-over.wav');
}
