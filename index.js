  /*
    1 - obter um usuario 
    2 - obter um telefone atraves do idUsuario
    3 - obter um endereço pelo id usuario
 */
//  importamos o módulo interno do node.js
const util = require ('util')
const getEnderecoAsyinc = util.promisify(getEndereco)
const getTelefoneAsync = util.promisify(getTelefone)
function getUsuario(){
    // Quando der um problema  -> reject 
    // quand sucess -> resolve
    return new Promise (function resolvePromise(resolve, reject){
        setTimeout (function() {
             return resolve({
                id:1,
                name: 'Belo',
                date: new Date()
             }) 
         },1000)
    })   
}

function getTelefone(idUsuario, callback){
     setTimeout (function() {
        return callback (null,{
            telefone: '40028922',
            ddd: 11            
            })
     },2000)
}

function getEndereco(idUsuario, callback){
    setTimeout (function() {
        return callback(null, {
            rua: 'Reiventar' ,
            numero: '10'
            })
     },2000)
}
//1 passo adicionar a palabra async -> automaticamente ela retornará uma promisse
main()
async function main(){
    try{
        console.time('Medida-Promise')
        const usuario = await getUsuario()
        const resultado = await Promise.all([
            getTelefoneAsync(usuario.id),
            getEnderecoAsyinc(usuario.id)
        ])
        const endereco = resultado [1]
        const telefone = resultado [0]
        console.log(`
            Nome: ${usuario.name}
            Endereco ${endereco.rua}, ${endereco.numero}
            Telefone (${telefone.ddd}), ${telefone.telefone}
            `)
        console.timeEnd('Medida-Promise')
    }catch(error){
        console.error('DEU RUIM', error)
    }
}
/*const usuarioPromise = getUsuario()
// para manipular sucesso usamos a função .then
// para manipular erros, usamos o .catch
usuarioPromise
    .then(function(usuario){
        return getTelefone(usuario.id)
            .then(function resolverUsuario(result){
                return{
                    DadosDoUsuario:{
                        nome: usuario.name,
                        id: usuario.id,
                        DataNasci: usuario.date                      
                    },
                    telefone: result
                }
            })
    })
    .then(function(resultado){
        const endereco = getEnderecoAsyinc(resultado.usuario)
        return endereco.then(function resolverEndereco(result){
            return{
                usuario: resultado.DadosDoUsuario,
                telefone: resultado.telefone,
                endereco: result
        }
        })
    })
        .then(function(resultado){
            console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone (${resultado.telefone.ddd}), ${resultado.telefone.telefone}
            `)
        })
    .catch(function(error){
        console.log("Deu Ruim", error)
    })



/* function resolverUsuario(error, usuario){
    console.log('usuario', usuario)
}

/* getUsuario(function resolverUsuario (error, usuario){
    if(error){
        console.error('Erro no usuario', error)
        return; 
    }
    getTelefone(usuario.id, function resolverTelefone (error1, telefone){
        if (error1){
            console.error('Erro no Telefone', error)
            return; 
        }   
        getEndereco(usuario.id, function resolverEndereco(error2, endereço){
            if (error2){
                console.error('Erro no Telefone', error)
                return; 
            }
            console.log(`
                Nome: ${usuario.name},
                Endereço: ${endereço.rua}, ${endereço.numero}
                Telefone: (${telefone.ddd}), ${telefone.telefone}
            `)
        })
    })
}) */


// const telefone = getTelefone(usuario.id)
// console.log('telefone', telefone)
   