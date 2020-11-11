var BASE_URL = 'http://localhost:3000';

function mostrarAlunos() {
    readAll(function (status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("alunos").innerHTML = "Erro ao carregar os dados";
            return;
        }
        
        document.getElementById("alunos").innerHTML = "";
        
        for(var i=0; i<dados.length; i++) {
            aluno = dados[i];

            document.getElementById("alunos").innerHTML += "<article> <img src='" + aluno.foto + "'/> " +
            "<h1>" + aluno.nome + "</h1>" +
            "<p>tia: " + aluno.tia + "</p>" +
            "<p>cruso: " + aluno.curso + "</p>" +
            "</article>";
        }
    });
}

function mostrarAlunosUpdate() {
    readAll(function (status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("alunos").innerHTML += "Erro ao carregar os dados";
            return;
        }
        
        var tabela = "<table>";
        for(var i=0; i<dados.length; i++) {
            var aluno = dados[i];
            tabela += "<tr>";
            
            tabela += "<td>" + aluno.tia + "</td>" +
                "<td>" + aluno.nome + "</td>" +
                "<td><button onclick=\"atualizarForm('" + aluno.tia + "')\">Atualizar</button></td>";
            
            tabela += "</tr>";
        }
        tabela += "</table>";
        document.getElementById('alunos').innerHTML = tabela;
    });
}

function mostrarAlunosDelete() {
    readAll(function (status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("alunos").innerHTML += "Erro ao carregar os dados";
            return;
        }
        
        var tabela = "<table>";
        for(var i=0; i<dados.length; i++) {
            var aluno = dados[i];
            tabela += "<tr>";
            
            tabela += "<td>" + aluno.tia + "</td>" +
                "<td>" + aluno.nome + "</td>" +
                "<td><button onclick=\"apagarAluno('" + aluno.tia + "')\">Apagar</button></td>";
            
            tabela += "</tr>";
        }
        tabela += "</table>";
        document.getElementById('alunos').innerHTML = tabela;
    });
}

function atualizarForm(tia) {
    readByTia(tia,function (status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p>Erro ao carregar os dados</p>";
            return;
        }
        
        document.getElementById("formTia").value = dados.tia;
        document.getElementById("formNome").value = dados.nome;
        document.getElementById("formCurso").value = dados.curso;
        document.getElementById("formFoto").value = dados.foto;
        
        document.getElementById("foto").src = dados.foto;
    });
}

function atualizarAluno() {
    // Ler campos do formulário
    var aluno = {
        tia: document.getElementById('formTia').value,
        nome: document.getElementById('formNome').value,
        curso: document.getElementById('formCurso').value,
        foto: document.getElementById('formFoto').value,
    }
    
    update(aluno, function(status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p>Erro ao atualizar dados do aluno: " + status + "</p>";
            return;
        }
        
        document.getElementById("mensagem").innerHTML += "<p>aluno " + dados.nome + " atualizado com sucesso</p>"
        
        document.getElementById("formTia").value = '';
        document.getElementById("formNome").value = '';
        document.getElementById("formCurso").value = '';
        document.getElementById("formFoto").value = '';
        
        mostrarAlunosUpdate();
    });
}


function adiconarAluno() {
    // Ler campos do formulário
    var aluno = {
        tia: document.getElementById('formTia').value,
        nome: document.getElementById('formNome').value,
        curso: document.getElementById('formCurso').value,
        foto: document.getElementById('formFoto').value,
    }
    
    //Validação
    // ToDo
    
    create(aluno, function(status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p>Erro ao adicionar um novo alunos: " + status + "</p>";
            return;
        }
        
        document.getElementById("mensagem").innerHTML += "<p>aluno " + dados.nome + " adicionado</p>"
        
        document.getElementById("formTia").value = '';
        document.getElementById("formNome").value = '';
        document.getElementById("formCurso").value = '';
        document.getElementById("formFoto").value = '';
    });
}

function apagarAluno(tia) {
    if(confirm("Deseja apagar dados do aluno com TIA " + tia + "?")) {
        deleteAluno(tia, function(status, dados) {
            if(status < 200 || status > 299 ) {
                document.getElementById("mensagem").innerHTML += "<p>Erro ao apagar dados do alunos: " + status + "</p>";
                return;
            }
            
            document.getElementById("mensagem").innerHTML += "<p>Aluno " + 
                dados.nome + " foi retirado do sistema";
            mostrarAlunosDelete();
        });
    }
}


/////////////////////////////////
// Requisições WEB à nossa API
// Vamos implementar o CRUD
/////////////////////////////////

///////////////////////////
// ******  CREATE  ******//
///////////////////////////
function create(aluno, callback) {
    var url = BASE_URL + '/alunos';
    var xhr = new XMLHttpRequest();
    
    dados = JSON.stringify(aluno);
    
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            console.log('Aluno registrado com sucesso!');
        } else {
            console.error('Problema ao registrar aluno!' + status);
        }
        callback(status, xhr.response);
    }
    xhr.send(dados);
}

///////////////////////////
// *******  READ  *******//
///////////////////////////
function readAll(callback) {
    var url = BASE_URL + '/alunos';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            console.log('Lista de alunos carregado com sucesso!');
        } else {
            console.error('Problema ao carregar lista de alunos!' + status);
        }
        callback(status, xhr.response);
    }
    xhr.send();
}

function readByTia(tia,callback) {
    var url = BASE_URL + '/alunos/' + tia;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            console.log('Alunos carregado com sucesso!');
        } else {
            console.error('Problema ao carregar dados do aluno!' + status);
        }
        callback(status, xhr.response);
    }
    xhr.send();
}


///////////////////////////
// ******  UPDATE  ******//
///////////////////////////
function update(aluno, callback) {
    var url = BASE_URL + '/alunos/' + aluno.tia;
    var xhr = new XMLHttpRequest();
    
    dados = JSON.stringify(aluno);
    
    xhr.open('PUT', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            console.log('Aluno atualizado com sucesso!');
        } else {
            console.error('Problema ao atualizar dados do aluno!' + status);
        }
        callback(status, xhr.response);
    }
    xhr.send(dados);
}


///////////////////////////
// ******  DELETE  ******//
///////////////////////////
function deleteAluno(tia, callback) {
    var url = BASE_URL + '/alunos/' + tia;
    var xhr = new XMLHttpRequest();
    
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            console.log('Aluno apagado com sucesso!');
        } else {
            console.error('Problema ao apagar dados do aluno!' + status);
        }
        callback(status, xhr.response);
    }
    xhr.send();
}
