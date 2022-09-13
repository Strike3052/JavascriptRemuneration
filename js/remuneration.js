const fixe = 1100;
const prixS20 = 140;
const pourcentageS20 = 0.02;

function calculAncien(Anciennete)
{
    const ancien5ans = 1.03;
    const ancien10ans = 1.06;
    
    if (Anciennete >= 5 && Anciennete < 10)
    {
        return ancien5ans;
    }
    else if (Anciennete >= 10)
    {
        return ancien10ans;
    }
}

function calculXSpirit(nbCasques)
{
    const prixXSpirit = 350;
    const pourcentageXSpirit = 0.06;
    
    if (nbCasques >= 50)
    {
        return ((nbCasques-50)*prixXSpirit) * pourcentageXSpirit;
    }
}

function calculMultitec(nbCasques)
{
    const prixMultitec = 180;
    const pourcentage0_20 = 0.04;
    const pourcentage20_50 = 0.06;
    const pourcentage50plus = 0.1;
    
    if (nbCasques <= 20)
    {
        return (nbCasques*prixMultitec) * pourcentage0_20;
    } else if (nbCasques > 20 && nbCasques <= 50)
    {
        return (20*prixMultitec) * pourcentage0_20 + ((nbCasques-20)*prixMultitec) * pourcentage20_50;
    } else if (nbCasques > 50)
    {
        return (20*prixMultitec) * pourcentage0_20 + (30*prixMultitec) * pourcentage20_50 + ((nbCasques-50)*prixMultitec) * pourcentage50plus;
    }
}

function calculKmParcouru(kmParcouru)
{
    if (kmParcouru*0.15 <= 350)
    {
        return kmParcouru*0.15;
    }
    else if (kmParcouru*0.15 > 350)
    {
        return 350;
    }
}


function calculRemu() {
    let nbAncien = parseInt(window.document.querySelector("#i_anciennete").value); // Int
    let nbS20 = parseInt(window.document.querySelector("#i_s20").value); // Int
    let nbXSpirit = parseInt(window.document.querySelector("#i_xspirit").value); // Int
    let nbMultitec = parseInt(window.document.querySelector("#i_multitec").value); // Int
    let nbKmParcouru = parseInt(window.document.querySelector("#i_kmparcouru").value); // Int
    
    let primeS20 = (nbS20 * prixS20) * pourcentageS20;
    let primeXSpirit = calculXSpirit(nbXSpirit);
    let primeMultitec = calculMultitec(nbMultitec);
    let primeKmParcouru = calculKmParcouru(nbKmParcouru);
    
    window.document.querySelector("#p_remu").innerHTML = "La rémunération sera de : " + (fixe*calculAncien(nbAncien) + primeS20 + primeXSpirit + primeMultitec + primeKmParcouru) + " €";

}

window.addEventListener("load", function() {
 window.document.querySelector("#btn_envoyer").addEventListener("click", calculRemu);
});