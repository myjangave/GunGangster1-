var player, playerAni, playerAni2, playerimggmor;
var bgimg, bgchop, bgbg, bgbg2, b2;
var gundp1, gundp2, gunGroup, ob;
var bullet, sound;
var storygg, ddg1, ddg2, ddg3, ddg4, ddg5, ddg6;
var storyggs, ddg1s, ddg2s, ddg3s, ddg4s, ddg5s,ddg6s,ddgGroup;
var monk,heroimg,lokmat,lomat2;
var monks,heroimgs;
var introsound,gmorsound,winsound,mkingimg2;
var gmorimg, gmor, temp, tempimg, enemyGroup, enemy, monster, monsterImage;
var score,phealth,ehealth;
var gameState = "serve"

function preload() {
  bgimg = loadImage("gungamebg1o.jpg");
  playerAni = loadAnimation("Picture1charac.png",
    "Picture1charc2.png", "Picture2charac3.png");

  playerimggmor = loadAnimation("Picture1charac.png");

  playerAni2 = loadAnimation("Picture3charc4.png",
    "Picture2charc5.png",
    "Picture2charc6.png");

  monsterImage = loadAnimation("alien-1.png", "alien-2.png")

  heroimg = loadImage("hero.png");
  monk = loadImage("oldmonk.png");

  bgchop = loadImage("Picture1chop2.png");
  bgbg = loadImage("gungamecroppedqbg1.jpg");

  gundp1 = loadImage("gunak47.png");
  gundp2 = loadImage("gunawm.png");

  ob = loadImage("ob111.png");

  gmorimg = loadImage("gameoverimg.png");

  lokmat = loadImage("assetis.png");

  tempimg = loadImage("templategungame1.jpg");

  ddg1 = loadImage("dg1.png");
  ddg2 = loadImage("dg2.png");
  ddg3 = loadImage("dg3.png");
  ddg4 = loadImage("dg4.png");
  ddg5 = loadImage("dg5.png");
  ddg6 = loadImage("dg6.png");
  storygg = loadImage("storyimg.png");
  mkingimg2 = loadImage("enemy3.png");
}

function setup() {
  createCanvas(650, 370);
  player = createSprite(120, 275, 100, 100);
  player.addAnimation("1running", playerAni);
  player.addAnimation("2running", playerAni2);
  player.addAnimation("3stop", playerimggmor);
  player.scale = 0.3;

  temp = createSprite(325, 145, 0, 0);
  temp.addImage(tempimg);
  temp.scale = temp.scale + 0.5;
  temp.visible = false;

  lomat2 = createSprite(300,300,10,10);
  lomat2.addImage(lokmat);
  lomat2.visible = false;

  bgbg2 = createSprite(400, 335, 0, 0);
  bgbg2.velocityX = -4;
  bgbg2.addImage(bgbg);
  bgbg2.scale = 0.6;

  b2 = createSprite(325, 310, 650, 5);
  b2.visible = false;

  gmor = createSprite(325, 180);
  gmor.addImage(gmorimg);
  gmor.visible = false;

  gunGroup = new Group();
  obgroup = new Group();
  chopgroup = new Group();
  enemyGroup = new Group();
  bulletGroup = new Group();
  ddgGroup = new Group();

  score = 0;
}

function draw() {
  background(bgimg);
  createEdgeSprites();
  textSize(20);
  fill("black");
  stroke("white");
  text("Score: " + score, 300, 50);

  if (gameState === "serve") {
    lomat2.visible = true;
    temp.visible = true;
    temp.depth = bgbg2.depth + 1;
    bgbg2.velocityX = 0;
    player.velocityX = 0;
    player.velocityY = 0;
    player.changeAnimation("3stop", playerimggmor);

    storytell();

    if (mousePressedOver(temp)) {
      gameState = "play";
      player.changeAnimation("1running", playerAni);
    }
  }

  if (gameState === "play") {
    lomat2.visible = false;
    temp.visible = false;
    ddgGroup.destroyEach();

    bgbg2.velocityX = -(2 + 2 * score / 100)

    if (bgbg2.x < 325) {
      bgbg2.x = bgbg2.width / 2;
    }

    if (keyDown("space") && player.y >= 270) {
      player.velocityY = player.velocityY - 16;
    }

    player.velocityY = player.velocityY + 0.8;

    score = score + Math.round(getFrameRate() / 60);

    player.collide(b2);

    if (player.isTouching(gunGroup)) {
      gunGroup.destroyEach();
      player.changeAnimation("2running", playerAni2);
    }

    if (bulletGroup.isTouching(enemyGroup)) {
      enemyGroup.destroyEach();
      score = score + 10;
    } 

    Enemyr();
    obdrop();
    shoot();
    chop();
    gundrop();

    if (score > 1000) {
      score = 1001
      textSize(30);
      stroke("white");
      fill("black")
      text("you win",300,200);
      bgbg2.velocityX = 0;
      player.velocityX = 0;
      player.velocityY = 0;
      enemyGroup.setVelocityXEach(0);
      enemyGroup.setLifetimeEach(-1);
      obgroup.setVelocityXEach(0);
      chopgroup.setVelocityXEach(0);
      obgroup.setLifetimeEach(-1);
      chopgroup.setLifetimeEach(-1);
      gunGroup.setVelocityXEach(0);
      gunGroup.setLifetimeEach(-1);
      bulletGroup.destroyEach();
      player.changeAnimation("3stop",playerimggmor)

      textSize(30);
      text("press t to play again",300,150);
      if(keyDown("t")){
        reset();
      }
    }

    if (player.isTouching(obgroup) || (player.isTouching(enemyGroup))) {
      player.changeAnimation("3stop", playerimggmor);
      gameState = "end";
    }

  }
  else if (gameState === "end") {
    text("click on gameover to play again", 200, 75);
    temp.visible = false;
    gmor.visible = true;
    bgbg2.velocityX = 0;
    player.velocityX = 0;
    player.velocityY = 0;
    obgroup.setVelocityXEach(0);
    chopgroup.setVelocityXEach(0);
    obgroup.setLifetimeEach(-1);
    chopgroup.setLifetimeEach(-1);
    gunGroup.setVelocityXEach(0);
    gunGroup.setLifetimeEach(-1);
    bulletGroup.destroyEach();
    if (mousePressedOver(gmor)) {
      reset();
    }

  }

  drawSprites();
}

function reset() {
  temp.visible = false;
  score = 0;
  gameState = "play";
  bgbg2.velocityX = -4;
  gmor.visible = false;
  chopgroup.destroyEach();
  obgroup.destroyEach();
  gunGroup.destroyEach();
  player.changeAnimation("1running", playerAni);
}

function storytell() {
  storyggs = createSprite(300,50,0,0);
  storyggs.addImage(storygg);
  storyggs.scale = 0.6;

  monks = createSprite(50,50,0,0);
  monks.addImage(monk);
  monks.scale = 0.2;

  heroimgs = createSprite(550,80,0,0);
  heroimgs.addImage(heroimg);
  heroimgs.scale = 0.5;

  ddg1s = createSprite(120,120,0,0);
  ddg1s.addImage(ddg1);
  ddg1s.scale = 0.4;

  ddg2s = createSprite(520,150,0,0);
  ddg2s.addImage(ddg2);
  ddg2s.scale = 0.4;
  
  ddg3s = createSprite(540,180,0,0);
  ddg3s.addImage(ddg3);
  ddg3s.scale = 0.4;

  ddg4s = createSprite(135,200,0,0);
  ddg4s.addImage(ddg4);
  ddg4s.scale = 0.4;
  
  ddg5s = createSprite(110,330,0,0);
  ddg5s.addImage(ddg5);
  ddg5s.scale = 0.4;

  ddg6s = createSprite(90,280,0,0);
  ddg6s.addImage(ddg6);
  ddg6s.scale = 0.4; 
  
   ddgGroup.add(ddg1s);
   ddgGroup.add(ddg2s);
   ddgGroup.add(ddg3s);
   ddgGroup.add(ddg4s);
   ddgGroup.add(ddg5s);
   ddgGroup.add(ddg6s);
   ddgGroup.add(monks);
   ddgGroup.add(storyggs);
   ddgGroup.add(heroimgs);
}

function chop() {
  if (frameCount % 100 === 0) {
    var chopr = createSprite(600, 290, 10, 10);
    chopr.addImage(bgchop);
    chopr.scale = random(0.1, 0.2);
    chopr.velocityX = -4;
    chopr.lifetime = 150;
    chopgroup.add(chopr);
  }
}

function obdrop() {
  if (frameCount % 170 === 0) {
    var obs = createSprite(600, 290, 10, 10);
    obs.addImage(ob);
    obs.scale = 0.3;
    obs.setCollider("rectangle",0,0,obs.width,obs.height);
    obs.debug = false;
    obs.velocityX = -(5 + score / 100);
    obs.lifetime = 120;
    obgroup.add(obs);
  }
} 

function gundrop() {
  if (frameCount % 360 === 0) {
    var ggdrop = createSprite(600, 120, 0, 0);
    ggdrop.y = Math.round(random(100, 150));
    ggdrop.velocityX = -5;

    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: ggdrop.addImage(gundp1);
        break;
      case 2: ggdrop.addImage(gundp2);
        break;
      default: break;
    }

    ggdrop.scale = 0.2;
    ggdrop.lifetime = 120;

    gunGroup.add(ggdrop);
  }
}

function shoot() {
  if (keyDown("enter")) {
    bullet = createSprite(player.x + 25, player.y - 4, 8, 3);
    bullet.velocityX = 15;
    bullet.shapeColor = "black";
    bulletGroup.add(bullet);
  }
}

function Enemyr() {
  if (World.frameCount % 200 === 0) {
    enemy = createSprite(600, 300, 20, 20);
    enemy.addAnimation("moving", monsterImage);
    enemy.y = Math.round(random(100, 300));
    enemy.velocityX = -(1 + (score / 10));
    enemy.setLifetime = 50;
    enemyGroup.add(enemy);
  }
}
