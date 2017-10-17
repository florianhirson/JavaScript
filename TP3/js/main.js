/*
Exercice 1
----------
Au clic sur le lien "à propos" du menu, afficher la div de class "modal" présente dans la page HTML (mais initialement masquée).
*/

// on stocke dans des constantes les éléments HTML correspondant au lien "à propos" et à a la popin modale.
// Cela permet d'alléger la suite du code, de la rendre plus lisible mais aussi d'optimiser les performances (on ne demande pas au navigateur de rechercher à chaque fois les éléments HTML dans la page)
const aboutLink = document.querySelector('body > header .navbar-right a');
const modal = document.querySelector('.modal');
/**
 * Fonction qui affiche la popin.
 * @param      {MouseEvent}  event   évenement DOM lancé par le lien "à propos"
 */
const showModal = event => {
	// on empêche le navigateur de recharger la page
	event.preventDefault();
	// on modifie l'attribut "style" de la balise de la popin
	// pour afficher l'élément.
	// le code html qui en résulte est :
	// <div class="modal in" style="display:block">
	modal.style.display = 'block';
}
/**
 * Fonction qui masque la popin.
 * @param      {MouseEvent}  event   événement DOM lancé par le clic sur les boutson de fermeture.
 */
const hideModal = event => {
	// on empêche le navigateur de recharger la page
	event.preventDefault();
	// on modifie l'attribut "style" de la balise de la popin
	// pour masquer l'élément.
	// le code html qui en résulte est :
	// <div class="modal in" style="display:none">
	modal.style.display = 'none';
}
// le click sur le lien "à propos" ouvre la popin
aboutLink.addEventListener('click', showModal);


/*
 * Exercice 2
 * ----------
 * Au clic sur le bouton "fermer", la croix ou en dehors de la popin, la refermer.
 */
// au click sur la croix on ferme la popin
modal.querySelector('.modal-header button').addEventListener('click', hideModal);
// au click sur le bouton "fermer" on ferme la popin
modal.querySelector('.modal-footer button').addEventListener('click', hideModal);
// au clic sur le fond de la popin on la referme
modal.addEventListener('click', hideModal);
// au clic sur le fond blanc de la popin, on annule l'événement pour éviter que la popin ne se referme si on clique sur le fond blanc ou le texte.
modal.querySelector('.modal-dialog').addEventListener('click', event=>event.stopImmediatePropagation());

/*
 * Exercice 3
 * ----------
 * Au clic sur chacun des liens du menu principal (sauf "à propos"),
 * afficher le titre du lien cliqué dans la balise h1 de la section de classe "main".
 * Associer un contenu différent à chaque lien (attribut HTML data-xxxx)
 * et l'afficher dans la balise <article> lorsqu'un lien est cliqué.
 */
// on récupère la liste des liens du menu, les balises <h1> et <article>.
const menuLinks = document.querySelectorAll('body > header .navbar-nav:first-child a');
const h1 = document.querySelector('.main h1');
const article = document.querySelector('.main article');
// on parcourt les liens du menu
for (let i = 0 ; i< menuLinks.length; i++){
	let link = menuLinks[i];
	// pour chaque lien du menu, on écoute le click.
	link.addEventListener('click', event => {
		const link = event.currentTarget;
		// on empêche le navigateur de recharger la page
		event.preventDefault();
		// on remplace le contenu du <h1> par le contenu du lien sur lequel on a cliqué.
		h1.innerHTML =  link.innerHTML;
		// on remplace le contenu de <article> par le contenu de l'attribut "data-content" du lien sur lequel on a cliqué.
		article.innerHTML = link.getAttribute('data-content');
		// on repasse le lien actif du menu en inactif
		document.querySelector('body > header .navbar-nav:first-child li.active').setAttribute('class', '');
		// on passe le lien clické en actif
		link.parentNode.setAttribute('class', 'active');
	})
}

/*
 * Exercice 4
 * ----------
 * Dans la page "accueil", reprendre le code html présent dans "formulaire.html.tpl"
 * et mettre en place (en JavaScript) une vérification de la saisie de l'utilisateur
 * avec les règles de gestion suivantes :
 * - le lieu est obligatoire
 * - la date de début doit être supérieure ou égale à la date du jour
 * - la date de fin doit être supérieure à la date de début
 */
// on remplit l'attribut "data-content" du lien "accueil" avec le contenu de la page html (formulaire)
// Permet d'éviter de saisir 2 fois le code HTML de la page (une fois dans le contenu, une fois dans l'attribut data-content)
menuLinks[0].setAttribute('data-content', article.innerHTML);

// on sotcke les éléments HTML nécessaires à la suite du code (formulaire, champs input, et conteneur d'erreur)
const form = document.querySelector('.main article form');
const locationInput = form.querySelector('input[name=location]');
const checkinInput = form.querySelector('input[name=checkin]');
const checkoutInput = form.querySelector('input[name=checkout]');
const errorContainer = form.querySelector('.errorContainer');

/**
 * Gestion de la soumission du formulaire.
 *
 * @param      {Event}  event   événement lancé par le formulaire lors de la soumission
 */
const validateForm = event => {
    let err = document.querySelector('#err');
    let lieu = document.querySelector('input[name="location"]').value;
    let du = document.querySelector('input[name="checkin"]').value;
    let au = document.querySelector('input[name="checkout"]').value;
    let prix_min = document.querySelector('input[name="price_min"]').value;
    let prix_max = document.querySelector('input[name="price_man"]').value;
    let guests = document.querySelector('input[name="guests"]').value;

	// on empêche le navigateur de recharger la page
	event.preventDefault();
	// on vide les messages d'erreur précédents
    errorContainer.innerHTML = '';
	// on va répertorier la liste des erreurs de saisie dans un tableau
	let errors = [];
	// le lieu est obligatoire
	if ( locationInput.value == '' ){
		errors.push('le champ "Lieu" est obligatoire');
	}
	// la date de début doit être supérieure ou égale à la date du jour
	const now = new Date(),
		  checkinDate = new Date( checkinInput.value ),
		  checkoutDate = new Date( checkoutInput.value );
	if ( checkinDate > checkoutDate ){
		errors.push('La date "Du" doit être inférieure à celle du champ "Au".');
	}
	// la date de fin doit être supérieure à la date de début
	if ( checkinDate < now ){
		errors.push('La date "Du" doit être supérieure à àujourd\'hui.');
	}
	// s'il y a des erreurs
	if ( errors.length > 0 ){
		// on affiche les messages d'erreur
		errorContainer.innerHTML = errors.join('<br/>');
    } else {
        du = new Date(du);
        au = new Date(au);
        let link = 'http://km-dev.com/temp/iut/proxy.php';
        link += '?client_id=3092nxybyb0otqw18e8nh5nty&locale=fr-FR&currency=EUR&_format=for_search_results_with_minimal_pricing&guests=' + guests;
        link += '&location=' + lieu + '&chekin=' + new Date(du).getDate() + '%2F' + du.getMonth() + '%2F' + du.getFullYear() + '&checkout=' + au.getDate() + '%2F' + au.getMonth() + '%2F' + au.getFullYear();
        link += '&min_num_pic_urls=10&price_max=' + prix_max + '&price_min=' + prix_min + '&sort=1';

		// sinon tout s'est bien passé, le formulaire est prêt à être envoyé.
        $.ajax(link).done(function (data) {
            let size = data.results_json.search_results.length
            let tab = data.results_json.search_results;
            for (let i = 0; i < size; i++) {
                console.log(tab[i]);
                let li = `<li class=\"list-group-item\">
                            <img style="width:100%" src="`+ tab[i].listing.picture_url + `" />
                           <h4>`+ tab[i].listing.name + `</h4>
                            </li>`;
                $('.results').append(li);
            }
        });
    }
}
// on écoute la soumission du formulaire
form.addEventListener('submit', validateForm);
