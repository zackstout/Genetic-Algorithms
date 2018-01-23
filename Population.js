
function Population(p, m, num) {
  this.population = [];
  this.matingPool = [];
  this.generations = 0;
  this.finished = false;
  this.target = p;
  this.mutationRate = m;
  this.perfectScore = 1;

  this.best = "";

  for (var i=0; i<num; i++) {
    this.population[i] = new DNA(this.target.length);
  }

  // this.matingPool = [];

  this.calcFitness = function() {
    for (var i=0; i < this.population.length; i++) {
      this.population[i].calcFitness();
    }
  };
  this.calcFitness();

  this.naturalSelection = function() {
    this.matingPool = [];

    var maxFitness = 0;
    for (var i=0; i<this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    for (var j=0; j<this.population.length; j++) {
      //to normalize fitness values, so they sum to 1. But is it uniform?
      var fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      var n = floor(fitness * 100);

      for (var k=0; k< n; k++) {
        this.matingPool.push(this.population[i]);
      }
    }
  };

  //make a new generation:
  this.generate = function() {

    for (var i=0; i<this.population.length; i++) {
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  };


  this.getBest = function() {
    var worldrecord = 0;
    var index = 0;
    for (var i=0; i< population.length; i++) {
      if (population[i].fitness > worldrecord) {
        worldrecord = population[i].fitness;
        index = i;
      }
    }

    if (worldrecord == perfectScore) {
      this.finished = true;
    }
    return population[index].getPhrase();
  };

  this.done = function() {
    return this.finished;
  };

  this.getGenerations = function() {
    return generations;
  };

  this.getAverageFitness = function() {
    var total = 0;
    for (var i=0; i < population.length; i++) {
      total += population[i].fitness;
    }
    return total / population.length;
  };

  this.allPhrases = function() {
    var everything = "";
    var displayLimit = min(population.length, 50);

    for (var i=0; i<displayLimit; i++) {
      everything += population[i].getPhrase() + '<br>';
    }

    return everything;
  };
}
