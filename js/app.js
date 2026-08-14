/* Index */

function showDescription() {
    document.getElementById("description").style.display = "block";
    document.getElementById("btnCloseDesc").style.display = "block";
    document.getElementById("btnOpenDesc").style.display = "none";
}
function closeDescription() {
    document.getElementById("description").style.display = "none";
    document.getElementById("btnOpenDesc").style.display = "block";
    document.getElementById("btnCloseDesc").style.display = "none";
}

/* Invite Form JS */
/* On créer des variables pour les elements de la page qu'on va utiliser */
const form = document.querySelector('#invite-form');
const input = document.querySelector('input');
const ul = document.querySelector('#invited-list')
const main = document.querySelector('.main')

/* 
    1. Create li 
    Cette fonction un element à la liste d'invités
*/
function createLi()
{
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = input.value;
    const label = document.createElement('label');
    label.textContent = 'confirmed'
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit'
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove'
    
    li.appendChild(span);
    li.appendChild(label);
    label.appendChild(checkbox);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    return li;
}

/* ajoutes un element quand on clique sur 'Submit' */
form.addEventListener('submit', () => {
    event.preventDefault();

    const li = createLi();

    if(input.value === ''){
        alert('Enter a name before submiting'); //Empêche de soumettre si input est vide
    } else{
        ul.appendChild(li);
    }
});

/* 
    2. Add responded class 
    Ajoute la classe 'responded' si la checkbox est cochée
    retire cette classe quand la checkbox est décochée
*/

ul.addEventListener('change', (event) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const li = checkbox.parentNode.parentNode;
    if(checked){
        li.className = 'responded';
    } else{
        li.className = '';
    }
});

/* 
    3. Edit and remove buttons
    Gère les interaction avec les buttons edit et remove
*/
ul.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        const button = event.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        if (button.textContent === 'Remove'){
            ul.removeChild(li);
        }
        else if (button.textContent === 'Edit'){ //Créé un text input pour changer le nom de la personne invitée et remplace le nom par ce formulaire
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = 'Save'; //Change le bouton 'Edit' en 'Save'
        }
        else if (button.textContent === 'Save'){ //Créé un span avec le nom dans le text input et remplace le text input par le span
            const input = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            button.textContent = 'Edit'; //Change le bouton 'Save' en 'Edit'
        }
    } 
});

/* 
    4. a) Filter checkbox creation
    On ajoute une checkbox pour faire disparaitre les invitation non confirmée
*/
const div = document.createElement('div');
div.className = 'show-hide';
const filterLabel = document.createElement('label');
filterLabel.textContent = 'Hide those who have not responded';
const filterCheckbox = document.createElement('input');
filterCheckbox.type = 'checkbox';

div.appendChild(filterLabel);
filterLabel.appendChild(filterCheckbox);
main.insertBefore(div, ul);

/*
    4. b) Filter checkbox use
    Quand on clique sur la checkbox, les personnes n'ayant pas confirmée sont cachée
    On peut cliquer à nouveaux pour les faire réapparaitre.
*/
filterCheckbox.addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    const lis = ul.children;

    if (isChecked){
        for(var i = 0; i<lis.length; i++)
        {
            var li = lis[i];
            if (li.className === 'responded'){
                li.style.display = ''; //On laisse ou fait réapparaitre la personne dans la liste
            } else { 
                li.style.display = 'none'; //On cache la personne dans liste
            }
        }
    } else{
        for(var i = 0; i<lis.length; i++)
        {
            var li = lis[i];
            li.style.display = '';//On laisse ou fait réapparaitre la personne dans la liste
        }
    }
});

