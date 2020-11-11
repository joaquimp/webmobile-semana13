///////////////////////////
//         CREATE        //
///////////////////////////
function adiconarAluno() {
    // Ler campos do formulário
    var aluno = {
        tia: document.getElementById('formTia').value,
        nome: document.getElementById('formNome').value,
        curso: document.getElementById('formCurso').value,
        foto: document.getElementById('formFoto').value,
    }
    
    
    // Validação dos dados
    // :- ToDo
    
    // Chamada à API
    createAluno(aluno, function(status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao adicionar um novo alunos: " + status + " - " + dados.message + "</p>";
            return;
        }
        
        document.getElementById("mensagem").innerHTML += "<p class='success_message'>aluno " + dados.nome + " adicionado</p>"
        
        // Limpa o formulário
        document.getElementById("formTia").value = '';
        document.getElementById("formNome").value = '';
        document.getElementById("formCurso").value = '';
        document.getElementById("formFoto").value = '';
    });
}

///////////////////////////
//          READ         //
///////////////////////////
function mostrarAlunos() {
    readAll(function (status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("alunos").innerHTML = "<p class='error_message'>Erro ao carregar os dados - " + dados.message + "<p>";
            return;
        }
        
        document.getElementById("alunos").innerHTML = "";
        
        for(var i=0; i<dados.length; i++) {
            var aluno = dados[i];

            document.getElementById("alunos").innerHTML += "<article> <img src='" + aluno.foto + "'/> " +
            "<h1>" + aluno.nome + "</h1>" +
            "<p>tia: " + aluno.tia + "</p>" +
            "<p>cruso: " + aluno.curso + "</p>" +
            "</article>";
        }
    });
}


///////////////////////////
//         UPDATE        //
///////////////////////////
function mostrarAlunosUpdate() {
    readAll(function (status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("alunos").innerHTML += "<p class='error_message'>Erro ao carregar os dados - " + dados.message + "</p>";
            return;
        }
        
        var tabela = "<table>";
        for(var i=0; i<dados.length; i++) {
            var aluno = dados[i];
            tabela += "<tr>";
            
            tabela += 
                "<td class='image-cell'><img src='" + aluno.foto + "' width='40px' /></td>" +
                "<td>" + aluno.tia + "</td>" +
                "<td>" + aluno.nome + "</td>" +
                "<td><button onclick=\"atualizarForm('" + aluno.tia + "')\">Atualizar</button></td>";
            
            tabela += "</tr>";
        }
        tabela += "</table>";
        document.getElementById('alunos').innerHTML = tabela;
    });
}

function atualizarForm(tia) {
    readByTia(tia,function (status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao carregar os dados - " + dados.message + "</p>";
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
    
    updateAluno(aluno, function(status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao atualizar dados do aluno: " + status + " - " + dados.message + "</p>";
            return;
        }
        
        document.getElementById("mensagem").innerHTML += "<p class='success_message'>aluno " + dados.nome + " atualizado com sucesso</p>"
        
        document.getElementById("formTia").value = '';
        document.getElementById("formNome").value = '';
        document.getElementById("formCurso").value = '';
        document.getElementById("formFoto").value = '';
        document.getElementById("foto").src = ' ';
        
        mostrarAlunosUpdate();
    });
}



///////////////////////////
//         DELETE        //
///////////////////////////
function mostrarAlunosDelete() {
    readAll(function (status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("alunos").innerHTML += "<p class='error_message'>Erro ao carregar os dados - " + dados.message + "</p>";
            return;
        }
        
        var tabela = "<table>";
        
        for(var i=0; i<dados.length; i++) {
            var aluno = dados[i];
            tabela += "<tr>";
            
            tabela += 
                "<td class='image-cell'><img src='" + aluno.foto + "' width='40px' /></td>" +
                "<td>" + aluno.tia + "</td>" +
                "<td>" + aluno.nome + "</td>" +
                "<td><button onclick=\"apagarAluno('" + aluno.tia + "')\">Apagar</button></td>";
            
            tabela += "</tr>";
        }
        
        tabela += "</table>";
        document.getElementById('alunos').innerHTML = tabela;
    });
}

function apagarAluno(tia) {
    if(confirm("Deseja apagar dados do aluno com TIA " + tia + "?")) {
        deleteAluno(tia, function(status, dados) {
            if(status < 200 || status > 299 ) {
                document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao apagar dados do alunos: " + status + " - " + dados.message + "</p>";
                return;
            }
            
            document.getElementById("mensagem").innerHTML += "<p class='success_message'>Aluno " + 
                dados.nome + " foi retirado do sistema";
            mostrarAlunosDelete();
        });
    } else {
        document.getElementById("mensagem").innerHTML += "<p class='success_message'>Ação de apagar foi cancelada</p>";
    }
}