
var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;


function setup() {
  // bestPhrase = select('#best');
  // allPhrases = select('#all');
  // stats = select('#stats');

  bestPhrase = createP("Best phrase:");
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  stats.class("stats");

  target = "To be or not to be.";
  popmax = 200;
  mutationRate = 0.01;

  population = new Population(target, mutationRate, popmax);
}


function draw() {

  population.naturalSelection();

  population.generate();

//wow, the real problem was calling this at the beginning, as seems entirely natural to do....how strange!!!
  population.calcFitness();


//where is this coming from?
  population.evaluate();

  if (population.isFinished()) {
    noLoop();
    console.log('aha!');
  }

  displayInfo();
}

function displayInfo() {
  var answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  var statstext = "total generations:     " + population.getGenerations() + "<br>";
  statstext += "average fitness:      " + nf(population.getAverageFitness()) + "<br>";
  statstext += "total population:      " + popmax + "<br>";
  statstext += "mutation rate:     " + floor(mutationRate * 100) + "%, hoss";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases());
}
