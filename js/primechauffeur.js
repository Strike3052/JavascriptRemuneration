const prixKm = 0.01;
const maxPrimeKm = 900;
const ancienneteMini = 4;
const anciennete4ans = 300;
const ancienneteEvolution = 30;

window.addEventListener("load", function () {
    let i;
    let tabInputs = window.document.querySelectorAll("input");
    for (i = 0; i < tabInputs.length; i++) {
        tabInputs[i].addEventListener("keyup", calcRemu);
    }
});

function calcRemu()
{
    let nbAncien = recupValeur("#num_ancien");
    let nbKm = recupValeur("#num_km");
    let nbAccidents = recupValeur("#num_accidents");
    let prime = primeAnciennete(nbAncien) + primeKilometre(nbKm);
    
    affichePrime(prime, nbAccidents);
}

function affichePrime(prime, nbAccidents)
{
    let primeAvecAccidents = primeAccidents(prime, nbAccidents);
    
    if (prime === primeAvecAccidents)
    {
        window.document.querySelector(" ration").innerHTML =
            "Votre prime sera de : " + Math.round(primeAvecAccidents)  + " €";
    } else if (nbAccidents === 1) {
        window.document.querySelector("#remuneration").innerHTML =
            "Votre prime sera de : " + Math.round(primeAvecAccidents)  + " €"
             + "<br><br> Sans " + nbAccidents + " accident votre prime aurais été de : " + Math.round(prime) + " €";
    } else {
        window.document.querySelector("#remuneration").innerHTML =
            "Votre prime sera de : " + Math.round(primeAvecAccidents)  + " €"
             + "<br><br> Sans " + nbAccidents + " accidents votre prime aurais été de : " + Math.round(prime) + " €";
    }
}

function recupValeur(id) {
    var valeur = parseInt(window.document.querySelector(id).value);
    if (isNaN(valeur)) {
        window.document.querySelector(id).value = 0;
        return 0;
    } else {
        return valeur;
    }
}

function primeAnciennete(nbAncien) {
    if (nbAncien === ancienneteMini) {
        return anciennete4ans;
    } else if (nbAncien > 4) {
        return anciennete4ans+(nbAncien-4)*ancienneteEvolution;
    } else {
        return 0;
    }
}

function primeKilometre(nbKilometre) {
    if(nbKilometre * prixKm <= 900) {
        return nbKilometre * prixKm;
    } else {
        return 900;
    }
}

function primeAccidents(prime, nbAccidents)
{
    if (nbAccidents > 3)
    {
        return 0;
    } 
    else {
        return prime / (nbAccidents+1);
    }
}

function tests()
{
    console.log("==========Tests Primes Anciennetes==========");
    untest("Prime anciennete", 3, 0, primeAnciennete(3));
    untest("Prime anciennete", 4, 300, primeAnciennete(4));
    untest("Prime anciennete", 5, 330, primeAnciennete(5));
    untest("Prime anciennete", 6, 360, primeAnciennete(6));
    untest("Prime anciennete", 6, 390, primeAnciennete(6));

    console.log("==========Tests Primes Kilometres==========");
    untest("Prime kilometre", 10000, 100, primeKilometre(10000));
    untest("Prime kilometre", 20000, 200, primeKilometre(20000));
    untest("Prime kilometre", 50000, 500, primeKilometre(50000));
    untest("Prime kilometre", 70000, 700, primeKilometre(70000));
    untest("Prime kilometre", 100000, 900, primeKilometre(100000));
    untest("Prime kilometre", 100000, 1000, primeKilometre(100000));
    
    console.log("==========Tests Primes Accidents==========");
    untest("Prime avec accidents", 1500, 1500, primeAccidents(1500, 0));
    untest("Prime avec accidents", 1500, 750, primeAccidents(1500, 1));
    untest("Prime avec accidents", 1500, 500, primeAccidents(1500, 2));
    untest("Prime avec accidents", 1500, 375, primeAccidents(1500, 3));
    untest("Prime avec accidents", 1500, 0, primeAccidents(1500, 4));
    untest("Prime avec accidents", 1500, 120, primeAccidents(1500, 4));
}

function untest(text, valeurEntree, valeurPrevu, resultat){
    console.log((resultat === valeurPrevu ? "✅" : "❌") + text 
            + " | Valeur entrée : " + valeurEntree 
            + " | " + " Valeur attendu : " + valeurPrevu 
            + " | " + " Valeur obtenu : " + resultat);
}