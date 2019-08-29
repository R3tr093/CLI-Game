
// Placeholder dependencies and other's stuff required

const chalk = require("chalk");
const figlet = require("figlet");
const boxen = require("boxen");
const inquirer = require("inquirer");
const fs = require("fs");
const clear = require('clear');

let hero = null;


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
        }
            
                get info() {
                    
                    //clear();
                    let infos = " Health :: " + this.Health + newLineDouble + "Strength :: " + this.Strength + newLineDouble + "Weapon :: " + this.Weapon[0] +  newLineDouble+ "Damage :: " + this.Damage;
                    let infos2 = newLineDouble + "Perception :: " + this.Perception + newLineDouble + "Smartness :: " + this.Smartness + newLineDouble + "Luck :: " + this.Luck;

                    return log(basic("  ~ ☠ ☠ ☠ Hero board ☠ ☠ ☠ ~ ") + newLine + warning(boxen(infos + infos2, {padding: 1, margin: 1, borderStyle: 'round'})));
  
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
        }
            
        get info() {
                    
            const damage = this.Weapon + this.Strength;
        
            let infos = " Health :: " + this.Health + newLineDouble + "Strength :: " + this.Strength + newLineDouble + "DAMAGE :: " +  damage + newLineDouble  + "Lv :  " + this.Level;
            
            log();
    
            return log(error("   ~ ☠ ☠ ☠ " + this.Name + " ☠ ☠ ☠ ~ ") + newLine + error(boxen(infos,{padding: 1, margin: 1, 'borderColor': 'red', 'backgroundColor' :'white', borderStyle: 'classic'})));
    
        }

    
    }
    
      


    
    return new Monster(c1,c2,c3,c4,c5);
       


}


// Some monsters

Lizard = createMonster(30,2,1,1,"Lizard");





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
 

 // Battle Phase

 const battlePhase = async (player,opponent,priority) => {


 

    const battleOptions = () => {
   


        const options = [
        {
          type: "list",
          name: "O",
          message: basic("Que faîtes vous ? : "),
          choices: ["- Attaquer ","- Fuir",],
        }
    
      ];
    
      return inquirer.prompt(options);
     
    };


    const resolveBattle = async (Q) => {
    
        let X = Q; 
    
      
    
        // Hide
        const react = () => {
    
            if(X.O === "- Attaquer ")
            {
                log(" Une attaque");
                return "Kill"
                
                
            }
    
            if(X.O === "- Fuir")
            {
                let tryEscape = rand(5) + 1;
                
                if(tryEscape >= 5)
                {
                    log(warning("Success"))
                    
                }

                else
                {
                    log(error("Fail"));
                }
                
                return "Escape"
            }
        }
    
    
        let result = await react();

    
    }

    let answers = await battleOptions(); 

    let Q = answers; 

    let resolved = await resolveBattle(Q);





    // while oppponent or player health is > 0

    // if player  or opponent life > 70 % add damage bonus

    // Effect probility calcul

    //Do a random asylum to get damage

    // Substract health

    // Do the same for the next

    // where opponent or monster health < 1 : end


    // defined who play in first and call the function
    
    
   /* if(priority)
    {

    }

    else
    {
        
    }
    */


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


const resolveAnswer2 = (Output,Response,key) => {
    
   

    let Q = Response; // Get the answer of user 

    let value = Number(Q.R.charAt(0)) - 1;

    log(warning(Output[value]));

    // Hide
    function react ()
    {
       
        if(key === 3)
        {
            log(error("Lizard incoming"));

            Lizard.info

            log(rand(5) + 1); 

            return battlePhase(hero,Lizard,true)

            
        }
    }

    react();




}


// Let's run 

const run = async () => {




    hero = await createHero();   

    hero.info = await init("A difficult awakening");
    
    hero.info

    // Chapter , answer , stocking answers , resolve. 

    let chapter = await jsonCast(result.p1);

    let answers = await askQuestions(warning("Define your style :  "),"Smart","Lucky","Strong","Safe"); 

    let Q = answers; 

    let resolved = await resolveAnswer(resultQuestions.Q1,Q,1);

     //clear();

     log();

    // Chapter , answer , stocking answers , resolve. 

     chapter = await jsonCast(result.p2);

     answers = await askQuestions(warning("Pick a weapon :  "),"Sword","Bow","Hammer","Axe"); 
 
     Q = answers;

     resolved = await resolveAnswer(resultQuestions.Q2,Q,2);

     
     
     // Duo question Example

     chapter = await jsonCast(result.p3);

     answers = await askQuestions2(warning(" Are you sure :  "),"Yes","Nope"); 
 
     Q = answers;

     resolved = await resolveAnswer2(resultQuestions.Q3,Q,3);

     



    

  };
  
  run();
