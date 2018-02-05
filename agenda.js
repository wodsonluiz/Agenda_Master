(function () {
    //user interface
    var ui = {
        fields : document.querySelectorAll('input'),
        button: document.querySelector('.pure-button-primary'),
        table: document.querySelector('.pure-table tbody')
    }

    //actions
    var validateFields = function (event) {
 
        event.preventDefault();
        let errors = 0;
        let data = {};

        ui.fields.forEach(
            function(field){
                if(field.value.trim().length === 0){
                    field.classList.add('error');
                    errors++;
                }
                else{
                    field.classList.remove('error');
                    data[field.id] = field.value.trim();
                }
            }
        );

        if(errors == 0){
            addContact(data);
        }
        else{
            document.querySelector('.error').focus();
        }

    };

    var addContactSuccass = function(){
        cleanFields();
        getContact();
    }

    var getContactSuccass = function(contacts){
        let html = [];
        
        contacts.forEach(function(item){
            let line = `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone}</td>
                        <td><a href="#" data-action="delete" data-id="${item.id}">Excluir</a></td>
                        </tr>`;

                        html.push(line);

        });
        //console.log(html.join(''));

        ui.table.innerHTML = html.join('');
    }
    
    var genericError = function(){
        console.error('Falha de conexão');
    }
     //arrow function
    var cleanFields = function(){
        ui.fields.forEach(field=>field.value = '')
    }

    //var cleanFields = function(){
      //  ui.fields.forEach(function(field){
         //   field.value = '';

        //})
    //}

    var addContact = function (contact) {
        const headers = new Headers();
        const config = {method: 'Post', body: JSON.stringify(contact)};
        const endpoint = 'http://localhost:8080/schedule';

        headers.append('Content-Type','application/json; charset=utf-8');
     
        fetch(endpoint,Object.assign({headers:headers},headers,config))
        .then(addContactSuccass)
        .catch(genericError)

    };

    var getContact = function () {
        const headers = new Headers();
        const config = {method: 'GET'};
        const endpoint = 'http://localhost:8080/schedule';

        headers.append('Content-Type','application/json; charset=utf-8');
     
        fetch(endpoint,Object.assign({headers:headers},headers,config))
        .then(function(resp){return resp.json()})
        .then(getContactSuccass)
        .catch(genericError)

    };
    var actionContact = function(event){
        event.preventDefault();
        
        if(event.target.dataset.action === "delete"){
            removeContact(event.target.dataset.id)
        }
    };

    var removeContact = function(id){
        const headers = new Headers();
        const config = {method: 'DELETE'};
        const endpoint = `http://localhost:8080/schedule/${id}`;

        headers.append('Content-Type','application/json; charset=utf-8');
     
        fetch(endpoint,Object.assign({headers:headers},headers,config))
        .then(getContact)
        .catch(genericError);
   
    }

    var init = function(){
        //ui.button.onclick = validateFields;
        ui.button.addEventListener('click',validateFields);
        getContact();

        ui.table.addEventListener('click', actionContact);
    }();
})();

