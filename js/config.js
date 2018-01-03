const config = {
  currentLevel: 'easy',
  playerColour: 'red',
  soundOn: true,
  easy: {
    coinSpawnRate: 1.25,
    enemySpawnRate: 4,
    lifeSpawnRate: 0.5,
    whaleDelay: 50,
    petuniaSpeed: 60,
    infiniteImprobabilityDelay: 12,
    infiniteImprobabilityDuration: 6,
    enemySpeedHorizontal: 1,
    enemySpeedVertical: 1.5,
    extraLifeSpawnRate: 4,
  },
  hard: {
    coinSpawnRate: 2,
    enemySpawnRate: 2,
    whaleDelay: 100,
    petuniaSpeed: 120,
    lifeSpawnRate: 0.3,
    infiniteImprobabilityDelay: 18,
    infiniteImprobabilityDuration: 5,
    enemySpeedHorizontal: 1.5,
    enemySpeedVertical: 2,
    extraLifeSpawnRate: 5,
  },
  style: {
    textColour: '#fff',
    textColour_highlight: '#b8180c',
    textColour_highlightOutline: '#f5a62a',
    font: 'whoopass',
    fontSize_score: '16px',
    fontSize_default: '24px',
    fontSize_bestDistance: '30px',
    fontSize_heading: '36px',
    fontSize_title: '48px',
  }
}
