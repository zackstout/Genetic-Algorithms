
//using ASCII table:
function newChar() {
  var c = floor(random(63, 122));
  if (c == 63) {
    c = 32;
  }
  if (c == 64) {
    c = 46;
  }
  return String.fromCharCode(c);
}


function DNA(num) {
  this.genes = [];
  this.fitness = 0;


// this is pretty simplistic too -- the question is how to encode the data in DNA:
  for (var i=0; i<num; i++) {
    this.genes[i] = newChar();
  }

  this.getPhrase = function() {
    return this.genes.join("");
  };


// a pretty simplistic fitness function, but it works for the basic case:
  this.calcFitness = function(target) {
    var score = 0;
    for (var i=0; i <this.genes.length; i++) {
      if (this.genes[i] == target.charAt(i)) {
        score++;
      }
    }
    this.fitness = score / target.length;
  };


  this.crossover = function(partner) {
    var child = new DNA(this.genes.length);

    var midpoint = floor(random(this.genes.length));

    for (var i=0; i<this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
      return child;
    }
  };

  this.mutate = function(mutationRate) {
    for (var i=0; i< this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  };
}
