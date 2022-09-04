# Stellar Orbit : A Gravity Simulator 
![Start Screen](https://user-images.githubusercontent.com/38569809/157738055-7ffe9140-1cc8-4ba0-83c8-7ed0ba3a3fb9.png)

## How to Play
### Controls 

- Body Controls
  - left mouse click : place body
  - drag : sligshot body
  - scroll up : increase size
  - scroll down : decrease size
- Camera Controls
  - **space bar : toggle camera follow (Make sure you use this!)
  - arrow keys : move camera manually
- Game Controls
  - R : restart game  
 
 ### Objective 
 
The objective of the game is to create as many orbits as you can while having the least number of crashes. Play around on your universal playground by placing heavier bodies, and catapulting rocks and other smaller bodies into orbit around these ones. ![image](https://user-images.githubusercontent.com/38569809/157738972-1b2876fe-924a-4222-a9ad-e5408a54094c.png)

The default crashes is set to 50, making the game end when you crash 50 bodies togather. But, since its a simulation game, make sure you're using all the creativity you have in you and test out all the possibilities that come to your mind. It's not the destination that makes it fun but the journey!

<img src="https://user-images.githubusercontent.com/38569809/157739367-40191ff2-ade7-4804-b917-aaf50c12529d.png" width="50%" />


## Game Link:

[Stellar Orbit : A Gravity Simulator - p5js.org ](https://editor.p5js.org/soumen02/full/nbZCqGCj9)


## Codes:

[Game Code - p5js Editor](https://editor.p5js.org/soumen02/sketches/nbZCqGCj9)

## Inspiration 

Back in 2007, the first games I ever played were on [Cool Math Games](https://www.coolmathgames.com/). The website used to come up with new games every week or so, adding on to a never ending collection of flash player games (which has now been discontinued). My favourite ones were the ones where some level of physics was involved, and it was in fact the source of my interest in the subject of physics as it gave me an unlimited playground to test out my imagination. In fact, that was where my love for the subject of physics started!

## Concept and Game Physics

The game uses the Universal Law of Gravitation and other related Laws of Motion for its physics. It has been tweaked to make the game user friendly - in terms of the ratio of sizes, masses and force applied. 

![Universal Law of Gravitation](https://user-images.githubusercontent.com/38569809/156557073-a1aa6ff5-657a-4a23-82d6-35d25b1460bb.png)

THe game has mechanics similar to the simulation game shown below.

![PhET Gravity and Orbits](https://user-images.githubusercontent.com/38569809/156557743-602185bc-6116-42e8-bd1e-5b29c7bd9225.png)

Although the gameplay is quite different from the game above, both use the law of gravitation for their physics. 


## Development
### Initial Attempt 

I first started by trying to figure out the Physics. The Physics of attraction and gravity requires the use of vectors. 
I found the following nature of Code videos by The Coding Train to be immensly useful for understand how displacement, vectors and acceetarion works :
  - [The Acceleration Vector](https://www.youtube.com/watch?v=T84AWnntxZA&t=76s)
  - [Gravitataion Attraction](https://www.youtube.com/watch?v=EpgB3cNhKPM&t=522s)


### Important and Interesting Functionalities

#### Body Class

The game includes a _Body_ class which enables the bodies to have properties like mass, initial velocity, acceleration and force. The objects of this class are stored in _bodies_array_. 

#### Background Class

The starry backgorund of the game is created by this class and is loaded once at the start of the game in _setup()_

#### Stats Class

This class keeps track of the statistics of the game using the this class which has various counters like _moons_, _planets_, _rocks_, _crashes_ ...

The score is calculated by using the function,
    **score = (number of planets * 3) + (number of moons * 2) + (number of rocks * 1) - (number of planets crashed * 2)**
    it is displayed in the top right for the user to keep track. 

![image](https://user-images.githubusercontent.com/38569809/157739598-e82715e6-0f1b-432c-9248-a49bf3a6a845.png)

  
_maxscore_ keeps track of the highest score that the playet gets and stores it till endgame. 

The stats are briefly displayed at the end of the game for the player to have a look at!
![image](https://user-images.githubusercontent.com/38569809/157739442-2058f58f-9966-4092-897e-b5867eb106c7.png)


##### Camera Follow Functions

_camerafollow()_ was one of the trickiest (and most interesting) functions to code. I made it as a result of the need for something that keeps track of the bodies, or restricts them to our playground. But, restricting them wasn't the best option as I would be commiting a sin by breaking the laws of physics. So, the best option was to make the camera follow the bodies. This too was an illusion, as what is really happening is the body with the maximum mass is made to move to the center and that movement vector is also added to every other body in the game. This creates an illusion of the camera following the body. The beauty of relativity!

The arrow keys use a similar concept, except its more manual as the camera velocity is added only as many times as the user presses the keys and in the desired direction, hence giving some control but not very useful in all cases. 

#### Slingshot velocity

Giving the planets an initial velocity was also a very interesting (and of course, necessary) addition to the game. Creating the guide arrow and limiting it to a maximum velocity felt satisfying as it reminded me of the catapult in angry birds. The planets were given a velogity along the direction of this arrow vector. 

![image](https://user-images.githubusercontent.com/38569809/157740291-93bfda51-a5f6-4929-a0ed-2eb8491a2120.png)


#### Dynamic Mass with Scroll Wheel

This functionality was implemented right after the initial stage of coding the N body attraction. It was added to allow the player to create bodies of different masses. The mass of a body is a function of the radius of the planet, since mass is just an illusion of size of the body. 
![image](https://user-images.githubusercontent.com/38569809/157739694-8ba5b001-34d9-4286-b426-e2cdf31079b7.png)
![image](https://user-images.githubusercontent.com/38569809/157739716-0efd3bbe-89d8-4bcf-89ce-dc703217d04c.png)
![image](https://user-images.githubusercontent.com/38569809/157739732-03722db6-0437-47bb-ac2c-3959c1165142.png)


#### Randomized Planet Images

Why not give our gravity system a personality by randomizing the body skins!

![image](https://user-images.githubusercontent.com/38569809/157740455-5ff60b8d-3c7b-419e-b7ff-0f15751a569b.png) ![image](https://user-images.githubusercontent.com/38569809/157740495-7f9ad331-f939-4aad-a872-1d5bcc51afce.png) ![image](https://user-images.githubusercontent.com/38569809/157740537-7dac7951-3aea-4edd-b147-84bc53d10934.png)


#### Music Choice 

The music used in this game was a looped clip of Stay composed by Hans Zimmer. It was one of the soundtracks of my favourite movie Interstellar by Christopher Nolan. It's space movie about human endurance, love and science!

I find the sound tracks of interstellar to perfectly describe what I feel when I think of space, physics and the vastness of the universe. 


## Challenges

1. Firstly, the challenge at the start was to deploy N body attraction using code. Daniel Shiffman's videos were immensly helpful in overcoming this by using Vecotrs. 
2. Camera follow was another challenge I had to overcome to make the game more play-able. It was a challenge as figuring the right velocities to add and subtract took some time to figure out, especially as they were vecotrs with directions. 
3. Adding the music was a difficult task as my browser seemed to keep running out of memory due to a memory leak. I fixed it by using a p5.sound function and adding the same to the html files. 

## Future Improvements

The game can be further improved in a lot of ways. I'm listing a few ways below.
1. Smoother camera movement using arrow keys - one that is relative to the maximum velocity of the bodies
2. Long disappearing trails - the bodies would form beautiful patterns if they were given a more lasting trail which didnt use transparency of the background
3. Zoom in and out - would be a great feature if implemented, although it will be a challenge doing it.


### Sketch Files
- Assets Folder : 
  - Planet Images
  - Rock Image
  - Stay : background musc for the game
- background.js : contains the class that creates the starry background 
- stats.js : the statistics class for the game that keeps the score 
- sketch.js : the game

### References 
Music : [Stay - Hans Zimmer](https://www.youtube.com/watch?v=N4o0qnSeVQQ)
p5js Tutorails : [The Coding Train](https://thecodingtrain.com/)
p5js Documentation : [reference - p5js](https://p5js.org/reference/)
