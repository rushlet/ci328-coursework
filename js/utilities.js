function randomNumber(x, y) {
  return Math.floor(Math.random() * x) + y;
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
