
var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;


function setup() {
  bestPhrase = selectAll('#best');
  allPhrases = selectAll('#all');
  stats = selectAll('#stats');

  // bestPhrase = createP("Best phrase:");
  // bestPhrase.class("best");
  //
  // allPhrases = createP("All phrases:");
  // allPhrases.position(600, 10);
  // allPhrases.class("all");
  //
  // stats = createP("Stats");
  // stats.class("stats");

  target = "To be or not to be.";
  popmax = 200;
  mutationRate = 0.01;

  population = new Population(target, mutationRate, popmax);
}


function draw() {
  population.calcFitness();

  population.naturalSelection();

  population.generate();

  // population.evaulate();

  if (population.isFinished()) {
    noLoop();
    console.log('aha!');
  }

  // displayInfo();
}

function displayInfo() {
  var answer = population.getBest();

  bestPhrase.append("Best phrase:<br>" + answer);

  var statstext = "total generations:     " + population.getGenerations();
  statstext += "average fitness:      " + floor(100 * population.getAverageFitness());
  statstext += "total population:      " + popmax + "<br>";
  statstext += "mutation rate:     " + floor(mutationRate * 100) + "%, hoss";

  stats.append(statstext);

  allPhrases.append("All phrases:<br>" + population.allPhrases());
}
