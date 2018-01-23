
//using ASCII table:
function newChar() {
  var c = floor(random(63, 122));
  // if (c == 63) {
  //   c = 32;
  // }
  // if (c == 64) {
  //   c = 46;
  // }
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}


function DNA(num) {
  this.genes = [];
  this.fitness = 0;


// this is pretty simplistic too -- the question is how to encode the data in DNA:
  for (var i=0; i<num; i++) {
    this.genes[i] = newChar();
  }

// genotype and phenotype are essentially the same in this case. i.e. layer between what is encoded and what encodes it is very thin:
  this.getPhrase = function() {
    return this.genes.join("");
  };


// a pretty simplistic fitness function, but it works for the basic case:
// in a distance-to-target case, could use 1/d.
// would be nice to have an exponential shape: if n is number of chars correct, could use 2^n.

  this.calcFitness = function(target) {
    var score = 0;
    for (var i=0; i <this.genes.length; i++) {
      if (this.genes[i] == target.charAt(i)) {
        score++;
      }
    }
    this.fitness = score / target.length;
    //ok it *does* show the fitnesses getting bigger.....so what happens to void them?
    // console.log(this.fitness);

    //interesting -- we cannot do 2^n in this way.
    this.fitness = pow(this.fitness, 4);
  };


  this.crossover = function(partner) {
    var child = new DNA(this.genes.length);

    var midpoint = floor(random(this.genes.length));

    for (var i=0; i<this.genes.length; i++) {
      // if (i > midpoint) {
      //   child.genes[i] = this.genes[i];
      // } else {
      //   child.genes[i] = partner.genes[i];
      // }
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    //must be outside for loop!
    return child;
  };

  this.mutate = function(mutationRate) {
    for (var i=0; i< this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  };
}
