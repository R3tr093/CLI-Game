#!/usr/bin/env node


// Placeholder dependencies and other's stuff required

const chalk = require("chalk");
const figlet = require("figlet");
const boxen = require("boxen");
const inquirer = require("inquirer");
const fs = require("fs");
const clear = require('clear');
const wait = delay=>new Promise(res=>setTimeout(res,delay))

let hero = null;

let pos = null;

let endPhase;

// JSON  exploitation 

const content = fs.readFileSync("content.json");

const Questions = fs.readFileSync("Questions.json");

const result = JSON.parse(content);

const resultQuestions = JSON.parse(Questions);



// Some const for styling, and indent the log.

const warning = chalk.keyword('orange');
const error = chalk.keyword('red');
const basic = chalk.hex('#DEADED').bold;
const log = console.log;
const newLine = "\n";
const newLineDouble = "\n\n ";





// Create a hero ** Return a new hero

const createHero = () => {

    class Hero {
        constructor() {
            this.Health = 100;
            this.Strength = 3;
            this.Weapon = ["none",0]
            this.Damage = this.Weapon[1] + this.Strength;
            this.Perception = 0;
            this.Smartness = 0;
            this.Luck = 0;
            this.Bag = ["Ring"];
        }
            
                get info() {
                    
                    
                    let infos = " Health :: " + this.Health + newLineDouble + "Strength :: " + this.Strength + newLineDouble + "Weapon :: " + this.Weapon[0] +  newLineDouble+ "Damage :: " + this.Damage;
                    let infos2 = newLineDouble + "Perception :: " + this.Perception + newLineDouble + "Smartness :: " + this.Smartness + newLineDouble + "Luck :: " + this.Luck;

                    return log(basic("  ~ ☠ ☠ ☠ Hero board ☠ ☠ ☠ ~ ") + newLine + warning(boxen(infos + infos2, {padding: 1, margin: 1, borderStyle: 'round'})));
  
                }

                get bagInfo() {
                    
                    let i = 0;

                    let strBag = "";

                    let target = this.Bag;

                    while(i < target.length)
                    {
                        
                        strBag = strBag + "- " + target[i] + "\n";
                        
                        i++;

                    }
                    

                    return log(basic("  ~ Inventory ~ ") + newLine + basic(boxen(strBag, {padding: 1, margin: 1, borderStyle: 'round','borderColor': "white"})));
  
                }
            
                set heroHealth(param){
                    
                    this.Health = param;
                
                }

                set heroStrength(param){
                    
                    this.Strength = param;
                }

                set heroSmartness(param){
                    
                    this.Smartness = param;
                }

                set heroPerception(param){
                    
                    this.Perception = param;
                }

                set heroLuck(param){
                    
                    this.Luck = param;
                }


                set heroWeapon(param){
                    
                    this.Weapon = param;
                }

                set heroDamage(param){
                    this.Damage = param ;
                }

    
    }
    
    return new Hero();
       


}




// Monster class

const createMonster = (Health,Strength,Weapon,Level,Name) => {

    let c1 = Health;
    let c2 = Strength;
    let c3 = Weapon;
    let c4 = Level;
    let c5 = Name;

    class Monster {
        constructor(Health,Strength,Weapon,Level,Name) {
            this.Health = Health;
            this.Strength = Strength;
            this.Weapon = Weapon;
            this.Level = Level;
            this.Name = Name;
            this.Damage = this.Weapon + this.Strength;
        }
            
        get info() {
                    
            const damage = this.Weapon + this.Strength;
        
            let infos = " Health :: " + this.Health + newLineDouble + "Strength :: " + this.Strength + newLineDouble + "DAMAGE :: " +  damage + newLineDouble  + "Lv :  " + this.Level;
            
            log();
    
            return log(error("   ~ ☠ ☠ ☠ " + this.Name + " ☠ ☠ ☠ ~ ") + newLine + error(boxen(infos,{padding: 1, margin: 1, 'borderColor': 'red', 'backgroundColor' :'white', borderStyle: 'classic'})));
    
        }

        set monsterHealth(param){
                    
            this.Health = param;
        
        }

    
    }
    
      


    
    return new Monster(c1,c2,c3,c4,c5);
       


}


// Some monsters

Goblin = createMonster(30,2,1,1,"Goblin");





// Asylum

 const rand = (min, max) => {
    if (min==null && max==null)
      return 0;    
    
    if (max == null) {
        max = min;
        min = 0;
      }
      return min + Math.floor(Math.random() * (max - min + 1));
 };
 

 // Battle Phase return endPhase as result

 const battlePhase = async (player,opponent,priority) => {

   

    const battleOptions = () => {
   


        const options = [
        {
          type: "list",
          name: "O",
          message: basic(" what do you decide : "),
          choices: ["- Attack ","- Try to run away",],
        }
    
      ];
    
      return inquirer.prompt(options);
     
    };


    const resolveBattle = async (Q) => {
    
        let X = Q; 
    
        

         
    
        // Hide
        const react = async () => {
    
           
            

            if(X.O === "- Try to run away")
            {
                
                

                var escape = false;

                let tryEscape = rand(5) + 1;
                
                log();

                log(chalk` {bgBlue.white.bold >>> escape score of :: ${tryEscape} }`);

                if(tryEscape >= 5)
                {
                    log();
                    
                    log(warning("Success"));

                    log();

                    escape = true;

                    //end the battle
                    endPhase = warning(" You successfully escaped from this monster.");
                    
                    
                }

                
               

                if(!escape)
                {
                   

                    log();
                    
                    log(error(" > > > Has failed to escape and fight"));


                    log();
                }

                await wait(1500);
                clear();
                
               
            }
        

           

            if(X.O === "- Attack " || !escape)
            {
                // go to battle mode


                log(" -----------------------------------------------------------------------------------------------------  ");
                log(chalk`                                {bgRed.white.bold >>> ☠ ☠ ☠  Battle Phase ☠ ☠ ☠ <<<}`);
                log(" -----------------------------------------------------------------------------------------------------  ");

                var bowEffect = false;
                var axeEffect = false;
                var monsterMaxHealth = opponent.Health;


                while(opponent.Health > 0 && player.Health > 0 && !escape)
                {
                   

                    if(hero.Health > 0)
                    {
                       

                        if(hero.Weapon[0] === "Bow")
                        {
                           
                         

                            if(!bowEffect)
                            {
                                for (i = 0; i < 3; i++)
                              {
                                var dice = rand(5) + 1;
                                var Damage = hero.Damage + dice;
                               
                                opponent.monsterHealth = opponent.Health - Damage;
                                opponent.monsterHealth = Number(opponent.Health)

                                log()
                                log(chalk` {bgBlue.white.bold >>> bonus dice score of :: ${dice}                         }`);
                                log(chalk` {bgBlue.white.bold >>> ${dice} +  ${player.Damage} from your basic damages. you hit for >>> ${Damage} }`);
                                log(chalk` {bgBlue.white.bold >>> ${opponent.Name} life point : ${opponent.Health}                           }`);
                                log()
                              }
                           
                                

                            }

                            if (bowEffect)
                            {
                                var dice = rand(5) + 1
                                var Damage = Math.trunc((hero.Damage + dice) / 2);
                                Damage = Damage;
                               
                                opponent.monsterHealth = opponent.Health - Damage ;
                                opponent.monsterHealth = Math.trunc(opponent.Health)

                                log()
                                log(chalk` {bgBlue.white.bold >>> bonus dice score of :: ${dice}                         }`);
                                log(chalk` {bgBlue.white.bold >>> ${dice} +  ${player.Damage} divide per 50%. you hit for >>> ${Damage} }`);
                                log(chalk` {bgBlue.white.bold >>> ${opponent.Name} life point : ${opponent.Health}                           }`);
                                log()
                            }
                           
                            bowEffect = true  
                            
                        }

                        if(hero.Weapon[0] === "Sword")
                        {
                            
                            // 10% percents of total health
                            
                            let swordEffect = rand(9) + 1;
                            

                            if(swordEffect > 7)
                            {
                                
                                swordEffect = Math.trunc(monsterMaxHealth / 10);
                                log(chalk` {bgYellow.white.bold >>> bonus sword effect for : ${swordEffect}                        }`);
                            }

                            else
                            {
                                swordEffect = 0;
                            }

                            var dice = rand(5) + 1;
                            var Damage = hero.Damage + dice + swordEffect;
                           
                            opponent.monsterHealth = opponent.Health - Damage;
                            opponent.monsterHealth = Number(opponent.Health)

                            log()
                            log(chalk` {bgBlue.white.bold >>> bonus dice score of :: ${dice}                         }`);

                            if(swordEffect > 0)
                            {
                                log(chalk` {bgBlue.white.bold >>> ${dice} +  ${player.Damage} from your basic damages, with sword bonus of ${swordEffect} you hit for >>> ${Damage} }`);
                            }

                            else
                            {
                                log(chalk` {bgBlue.white.bold >>> ${dice} +  ${player.Damage} from your basic damages. you hit for >>> ${Damage} }`);
                                log(chalk` {bgBlue.white.bold >>> ${opponent.Name} life point : ${opponent.Health}                           }`);
                                log()
                                
                            }

                            
                        }
    
                        if(hero.Weapon[0] === "Hammer")
                        {
                            
                            
                            
                            let hammerEffect = rand(19) + 1;
                            

                            if(hammerEffect > 17 && opponent.Level < 3)
                            {   
                                log(chalk` {bgYellow.white.bold !!! >>> bonus hammer effect ${opponent.Name} has been executed !  }`);
                                opponent.monsterHealth = 0;
                                
                            }

                            else
                            {
                                var dice = rand(5) + 1;
                                var Damage = hero.Damage + dice;
                           
                                opponent.monsterHealth = opponent.Health - Damage;
                                opponent.monsterHealth = Number(opponent.Health)

                                log()
                                log(chalk` {bgBlue.white.bold >>> bonus dice score of :: ${dice}                         }`);
                                log(chalk` {bgBlue.white.bold >>> ${dice} +  ${player.Damage} from your basic damages. you hit for >>> ${Damage} }`);
                                log(chalk` {bgBlue.white.bold >>> ${opponent.Name} life point : ${opponent.Health}                           }`);
                                log()
                                
                            }
                            
                        }

                        if(hero.Weapon[0] === "Axe")
                        {
                            
                            
                            
                            let Axe = rand(9) + 1;
                            

                            if(Axe > 6 && opponent.Level < 3 && !axeEffect)
                            {   
                                log(chalk` {bgYellow.white.bold !!! >>> Axe effect ${opponent.Name} damages reduced by 50% !  }`);
                                axeEffect = true;
                                
                            }
                            
                                var dice = rand(5) + 1;
                                var Damage = hero.Damage + dice;
                           
                                opponent.monsterHealth = opponent.Health - Damage;
                                opponent.monsterHealth = Number(opponent.Health)

                                log()
                                log(chalk` {bgBlue.white.bold >>> bonus dice score of :: ${dice}                         }`);
                                log(chalk` {bgBlue.white.bold >>> ${dice} +  ${player.Damage} from your basic damages. you hit for >>> ${Damage} }`);
                                log(chalk` {bgBlue.white.bold >>> ${opponent.Name} life point : ${opponent.Health}                           }`);
                                log()
                                                            
                            
                        }

                        

                        if(opponent.Health > 0 && !axeEffect)
                        {
                            
                            dice = rand(5) + 1;
                            Damage = opponent.Damage + dice;

                            player.heroHealth = player.Health - Damage;
    
                            log()
                            log(chalk` {bgWhite.red.bold >>> bonus dice score of :: ${dice}                         }`);
                            log(chalk` {bgWhite.red.bold >>> ${opponent.Name} hit you for ${opponent.Damage} basic damages with a bonus dice score of :: ${dice} >> ${Damage} }`);
                            log(chalk` {bgWhite.red.bold >>> your life points have been reduced to ${hero.Health}                    }`);
                            log()
    
                            
                        
                         }

                         if(opponent.Health > 0 && axeEffect)
                         {
                             
                             dice = rand(5) + 1;
                             Damage = opponent.Damage + dice;
                             Damage = Math.trunc(Damage / 2);
 
                             player.heroHealth = player.Health - Damage;
     
                             log()
                             log(chalk` {bgWhite.red.bold >>> bonus dice score of :: ${dice}                         }`);
                             log(chalk` {bgYellow.white.bold >>> ${opponent.Name} hit you for ${opponent.Damage} basic damages with a bonus dice score of :: ${dice} reduced by 50% >> ${Damage}.  }`);
                             log(chalk` {bgWhite.red.bold >>> your life points have been reduced to ${hero.Health}                    }`);
                             log()
     
                             
                         
                         }
    
                    }




                }

                if(player.Health <= 0)
                {
                    
                    log()
                    log()
                    endPhase = [error("Vous avez perdu."),0];
                    log()
                    log()
                }

                if(opponent.Health <= 0)
                {
                    log(newLineDouble )
                    endPhase = [warning("Vous avez triomphé"),1];
                    log(newLineDouble )
                    hero.info
                }

                log(" -----------------------------------------------------------------------------------------------------  ");
                log(chalk`                                {bgRed.white.bold >>> ☠ ☠ ☠  END Battle Phase ☠ ☠ ☠ <<<}`);
                log(" -----------------------------------------------------------------------------------------------------  ");
                log()
                log()


                
            }
    

        }
    
    
        let result = await react();
      
    
    }

    let answers = await battleOptions(); 

    let Q = answers; 

    let resolved = await resolveBattle(Q);

    // Customing resolve

    if(opponent.Name === "Goblin" && endPhase[1] > 0)
    {
        log()
        return warning(endPhase[0]);
     
    }

    else
    {
        return error(endPhase[0]);
    }

    
 }

    




// Start a chapter ** Take as parameter some title in a String format

const init = (param) => { 
    
    return new Promise((resolve,reject)=>{

        figlet.text(param, {
            font: 'Slant',
            horizontalLayout: 'fitted',
            verticalLayout: 'fitted' 
            }, function(err, data) {
            
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    
                }
            
            resolve(log(basic(data)));
            log()
       
        });
      
       

      }); 
}



// Loading some text from .json ** take as parameter result.p1 ( Where p1 is the property we need to display from the json file.)

const jsonCast = (param) => {
 
    let render = String(param);

    return log(basic(boxen(render, {padding: 1, margin: 1, backgroundColor: 'black',borderStyle: 'classic', 'align' : 'center'})));
    
}

// Use these function to ask something and get response from user. ** Take as parameters a string message, and four string choices (C1,C2,C3,C4)

const askQuestions = (message,C1,C2,C3,C4) => {
   


    const questions = [
    {
      type: "list",
      name: "R",
      message: error(message),
      choices: ["1-" + C1,"2-" + C2,"3-" + C3,"4-" + C4,],
    }

  ];

  return inquirer.prompt(questions);
 
};


const resolveAnswer = (Output,Response,key) => {
    
    let Q = Response; // Get the answer of user 

    let value = Number(Q.R.charAt(0)) - 1;

    // Hide
    function react ()
    {
        if(Q.R === "1-Sword")
        {
            hero.heroWeapon = ["Sword",2];
            hero.heroDamage = hero.Strength + hero.Weapon[1];
            log()
            log(chalk` {bgWhite.red.bold > > > the sword can make a critical strike that removes 10 percent of the opponent's HP < < < }`);
            log()
            hero.info
        }

        if(Q.R === "2-Bow")
        {
            hero.heroWeapon = ["Bow",2]
            hero.heroDamage = hero.Strength + hero.Weapon[1];
            log()
            log(chalk` {bgWhite.red.bold  > > > the bow allows you to hit the opponent 3 times before it hits you, after your moves lose half their damage. < < < }`);
            log()
            hero.info
        }

        if(Q.R === "3-Hammer")
        {
            hero.Weapon = ["Hammer",4]
            hero.heroDamage = hero.Strength + hero.Weapon[1];
            log()
            log(chalk` {bgWhite.red.bold  > > > the hammer can assominate your opponents, and allow you to execute them. < < < }`);
            log()
            hero.info
        }

        if(Q.R === "4-Axe")
        {
            hero.heroWeapon = ["Axe",3]
            hero.heroDamage = hero.Strength + hero.Weapon[1];
            log()
            log(chalk` {bgWhite.red.bold  > > >  the axe can dismember your opponents and reduce their damage by 20%. < < < }`);
            log()
            hero.info
        }

        if(Q.R === "1-Smart")
        {
            hero.heroSmartness = hero.Smartness + 2;
            
        }

        if(Q.R === "2-Lucky")
        {
            hero.heroLuck = hero.Luck + 2;
            
        }

        if(Q.R === "3-Strong")
        {
            hero.heroStrength = hero.Strength + 2;
            
        }

        if(Q.R === "4-Safe")
        {
            hero.heroHealth = hero.Health + 25;
            
        }
    }


    react();
    
    
    

    return log(warning(Output[value]));


}

const askQuestions2 = (message,C1,C2) => {
   


    const questions = [
    {
      type: "list",
      name: "R",
      message: error(message),
      choices: ["1-" + C1,"2-" + C2,],
    }

  ];

  return inquirer.prompt(questions);
 
};

const resolveAnswer2 = async (Output,Response,key) => {
    
    let report = -1; 

    let Q = Response; // Get the answer of user 

    let value = Number(Q.R.charAt(0)) - 1;

     jsonCast(Output[value]);

    // Hide
    const react = async () => {
    
       
        if(key === 3)
        {
         
            log(chalk` {bgWhite.red.bold !!! > > >  Goblin incoming < < < !!! }`);

            Goblin.info

            report = await battlePhase(hero,Goblin,true)
 
            Q = report;

            return log(Q)
            
        }
    }

    var resume = await react();

    if(endPhase[1] > 0)
    {
        return "Chapitre suivant."
    }

    else
    return "Prout";

    


}


// Let's run 

const run = async () => {




    hero = await createHero();   

    hero.info = await init("A difficult awakening");
    
    hero.info

    //hero.Bag.push("prout")

    hero.bagInfo

    

   

    // Chapter , answer , stocking answers , resolve. 

    let chapter = await jsonCast(result.p1);

    let answers = await askQuestions(warning("Define your style :  "),"Smart","Lucky","Strong","Safe"); 

    let Q = answers; 

    await wait(0500);

    clear();

    let resolved = await resolveAnswer(resultQuestions.Q1,Q,1);


     log();

    // Chapter , answer , stocking answers , resolve. 

     chapter = await jsonCast(result.p2);

     answers = await askQuestions(warning("Pick a weapon :  "),"Sword","Bow","Hammer","Axe"); 
 
     Q = answers;

     await wait(0500);

     clear();

     resolved = await resolveAnswer(resultQuestions.Q2,Q,2);

     
     
 

     resolved = await resolveAnswer2(resultQuestions.Q3,Q,3);

     Q = resolved;

     if(Q === "Chapitre suivant.")
     {
         chapter = await jsonCast(result.p4);

         await wait(2500);

         chapter = await jsonCast(result.p5);

         // duo choices

         answers = await askQuestions2(warning(" What do you decide ? :  "), " Run away "," Look at the corpse to fill your curiosity."); 
     
         Q = answers;

         if(Q.R === " Run away ")
         {
            chapter = await jsonCast(result.p7);
            answers = await askQuestions2(warning(" What do you decide ? :  "), "Let chance guide you through the forest."," Go in the opposite direction of the strange creature."); 
         }

         else
         {
            chapter = await jsonCast(result.p6);
            log(error("Health decreased 5."))
            hero.heroHealth = hero.Health - 5;
            hero.info
            chapter = await jsonCast(result.p7);
            answers = await askQuestions2(warning(" What do you decide ? :  "), "Let chance guide you through the forest."," Go in the opposite direction of the strange creature."); 
         }

         clear();
       
         Q = answers;
    
         await wait(0500);

         if(Q.R === "Let chance guide you through the forest.")
         {
            log("Hasard")
         }

         else
         {
             log("Not hasard")
         }
        
    
         
     }







    
     



    

  };
  
  run();
