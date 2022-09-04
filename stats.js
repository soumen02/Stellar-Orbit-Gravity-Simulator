//Statsitics class to keep track of the data
class Stats{
  constructor(){
    this.score = 0;
    this.bodycounter = 0;
    this.rocks = 0;
    this.moons = 0;
    this.planets = 0;
    this.crash = 0;
    
    this.maxscore = 0;
  }
  
  //uses a metrics to calculate the in-game score 
  calculate(){
    this.score = (this.planets * 3 + this.moons * 2 + this.rocks * 1) - 2*this.crash;
    
    this.bodycounter = this.rocks + this.moons + this.planets;
    
    if (this.maxscore < this.score){
      this.maxscore = this.score;
    }
  }
  
  //resets score on game reset
  resetscore(){
    this.score = 0;
    this.bodycounter = 0;
    this.rocks = 0;
    this.moons = 0;
    this.planets = 0;
    this.crash = 0;
    
    this.maxscore = 0;
  }
  
  display(){
  textAlign(RIGHT, CENTER);
  text('Score : ' + this.score, width-2*(width/100), 5*(height/100));
    text('Crashes : ' + this.crash, width-2*(width/100), 5*(height/100) + 25);
    
  }
}