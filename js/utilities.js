function randomInt(max, min) {
  max = Math.floor(max);
  min = Math.ceil(min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resizeSprite(sprite, factor) {
  sprite.scale.x = factor;
  sprite.scale.y = factor;
}

function addGenericPropertiesForFallingObjects(entity, gravity) {
  DontPanic.game.physics.arcade.enable(entity);
  entity.body.collideWorldBounds = false;
  entity.body.gravity.y = gravity;
}

function eventOnLatestChildAdded(children, callback) {
  var triggered = false;
  for (var i = children.length - 1; i >= 0 ; i--) {
    if (children[i].alive && !triggered) {
      callback(children[i]);
      triggered = true;
    }
  }
}

function disableButtons(button) {
  button.input.stop();
}
