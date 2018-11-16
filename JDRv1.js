// nouveau jeu :) !!!
var niveauPlus = false
// creation de constructeurs pour les objet specifique aux personnages et creatures
function BonusMalus(bonusForce,malusForce,bonusAgil,malusAgil,bonusIntel,malusIntel){
     this.bonusForce = bonusForce;
     this.malusForce = malusForce;
     this.bonusAgil  = bonusAgil;
     this.malusAgil  = malusAgil;
     this.bonusIntel = bonusIntel;
     this.malusIntel = malusIntel;
   };
function Stat(baseForce,baseAgil,baseIntel,bonusMalus){
     this.baseForce  = baseForce;
     this.baseAgil   = baseAgil;
     this.baseIntel  = baseIntel;
     this.bonus = bonusMalus;
   };
function Equipement(arme,armure,bouclier,bottes,bracelet1,bracetet2,collier){
    this.arme      = arme;
    this.armure    = armure;
    this.bouclier  = bouclier;
    this.bottes    = bottes;
    this.bracelet1 = bracelet1;
    this.bracelet2 = bracetet2;
    this.collier   = collier;
};
function RealStats(force,agilite,intellect){
    this.force      = force;
    this.agil       = agilite;
    this.intel      = intellect;
};

// creation de propriétés pour le personnage Aurora
var bonMalStatAurora = new BonusMalus(0,0,0,0,0,0);
var statAurora = new Stat(25,20,20,bonMalStatAurora)
var equipementAurora = new Equipement("Hache d'arme","tunique de novice"," ", "chaussons de novice", "","","");

//  personage Aurora /**************************************************
var perso = {

    nom: "Aurora",

    type : "guerrier",

    sexe : "elle",

    niveau : 0,

    levelLimit : 100,

    exp : 0,

    sante: 150,

    santeMax: 150,

    stat : statAurora,

    equipement : equipementAurora,
  // renvoi les statistiques réels apres calcul
//    realStats : Realstats(calcForce(),calcAgil(),calcIntel()),
  // description du type de personnage
    specialite : function () {

        var caractere = this.nom + " est un hero de type " + this.type + ", "+ this.sexe+ " est donc plus agile avec un(e) " +

            this.equipement.arme + " pour combattre";

        return caractere;

    },
// renvoie la description du personnage
    decrire: function () {

        var description = this.nom + " a " + this.sante + "/" + this.santeMax + " points de vie \n " +
        this.realStats.force + " en force, "+ this.realStats.agil + " en agilité et " + this.realStats.intel + " en intelligence \n" +
          this.sexe + " est un "+ this.type + " de niveaux " + this.niveau;

        return description;
     }

};
// fonction pour le calcul des stats reels
function calcForce(){
//force
  var bonus = 0
  if(perso.type === "guerrier" && (perso.equipement.arme === "Hache" || perso.equipement.arme === "Hache d'arme" || perso.equipement.arme ==="Hache de guerre" )){
    var bonus = 0.1 * perso.stat.baseForce
  }
  var calcForce = perso.stat.baseForce + perso.stat.bonus.bonusForce - perso.stat.bonus.malusForce + bonus
  return calcForce
};
function calcAgil(){
  var bonus = 0
//agilite
  if(perso.type === "guerrier" && (perso.equipement.arme === "Hache" || perso.equipement.arme === "Hache d'arme" || perso.equipement.arme ==="Hache de guerre" )){
     bonus = 0.2 * perso.stat.baseAgil
  }
  if (perso.equipement.bouclier === ""){
     bonus = perso.stat.baseAgil * 0.3
  }
  var calcAgil = perso.stat.baseAgil + perso.stat.bonus.bonusAgil - perso.stat.bonus.malusAgil + bonus
  return calcAgil
};
// intelligence
function calcIntel(){
  var bonus = 0
  if(perso.sexe === "elle" && (perso.equipement.armure === "Robe" || perso.equipement.armure === "Robe de mage" )){
   bonus = 0.2 * perso.stat.baseIntel
  }
  var calcIntel = perso.stat.baseIntel + perso.stat.bonus.bonusIntel - perso.stat.bonus.malusIntel + bonus
  return calcIntel
};
var realStats = new RealStats(calcForce(),calcAgil(),calcIntel());



perso.realStats = realStats;


// calcul du niveau (experience necessaire progressive ! ) et renvoi d'un commentaire fonction du gain de niveau ou non
function calcNiveau(){
    var ancienNiveau = perso.niveau
    while (perso.exp > perso.levelLimit){
      perso.exp = perso.exp - perso.levelLimit
      perso.levelLimit = Math.round(perso.levelLimit * 1.5)
      perso.niveau++
      niveauPlus = true
      gainDeNiveau()
    }

    if (niveauPlus){
      var message = "Aurora a gagné " + (perso.niveau - ancienNiveau) + " niveau !!!"
      niveauPlus = false
    }else {
      var message = "aurora a gagné " + perso.exp + " pts d'experience"
    }
    return message
}
function gainDeNiveau(){
perso.stat.baseForce = Math.round(perso.stat.baseForce + (perso.stat.baseForce*0.12))
perso.realStats.force = calcForce()
perso.stat.baseAgil = Math.round(perso.stat.baseAgil + (perso.stat.baseAgil*0.1))
perso.realStats.Agil = calcAgil()
perso.stat.baseIntel = Math.round(perso.stat.baseIntel + (perso.stat.baseIntel*0.09))
perso.realStats.Intel = calcIntel()
perso.santeMax = perso.santeMax + (perso.santeMax*0.1)
}
function gainDeSante(potion){
  var gainDeVie = potion
  if (perso.santeMax >= (perso.sante + potion) ){
    perso.sante = perso.sante + potion
  } else {
      gainDeVie = perso.santeMax - perso.sante;
      perso.sante = perso.santeMax;
         }
  gainDeVie = "aurora gagne " + gainDeVie + " pts de vie"
  return gainDeVie
}



//***********************************Le jeu commence ************************
// intro
console.log(perso.specialite());
console.log(perso.decrire());
console.log(perso.realStats.force)
alert(" debut du JDR")

alert("Aurora est blessée par une flèche")

perso.sante = perso.sante - 20;


alert("Aurora trouve un bracelet de force");
perso.equipement.bracelet1 = "bracelet de force (+10)";
perso.stat.bonus.bonusForce += 10;
perso.realStats.force = calcForce();
console.log(perso.equipement);

console.log(perso.decrire());

alert("Aurora attaque un nain et lui tranche la tete");

perso.exp = perso.exp + 150;
console.log(calcNiveau());

console.log("aurora est maintenant niveau : " + perso.niveau);
console.log(perso.decrire());
alert("aurora trouve une potion sur le nain et la boit");
console.log(gainDeSante());
console.log(perso.decrire());
alert ("aurora se pense superpuissante et frappe un rocher");
// variables combat
  var resistanceRocher = 1.75;
  var degats =Math.round(perso.realStats.force/resistanceRocher);
//
console.log("rocher subit " + degats + "dégat");

alert ("aurora se blesse en frapant le rocher \n elle recoit " + (Math.round(degats*0.75)) +" pts de dégats en retour et une blessure legere au poignet");
// blessure legere :
perso.stat.bonus.malusForce += 0.12* perso.stat.baseForce;
perso.realStats.force = calcForce();
perso.sante = Math.round(perso.sante - calcForce);

console.log(" la blessure d'aurora lui inflige un malus de " + perso.stat.bonus.malusForce + " en force")
console.log(perso.decrire())
