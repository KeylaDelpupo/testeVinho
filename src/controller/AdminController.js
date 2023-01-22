const s = require ("../database/produtos.json")
const fs = require('fs')
const path = require("path");
const produtosJson = fs.readFileSync(
    // Caminho do arquivo
    path.join(__dirname, "..", "database", "produtos.json"),
    // Formato de leitura
    "utf-8"
);

const produtos = JSON.parse(produtosJson);


module.exports = {
    index: (req, res) => {
            return res.render("adminListar", {
            produtos,
            css1: "/stylesheets/menu-footer.css",
            css2: "/stylesheets/adminListar.css",
        })
    },
    //exibir tela de criação
    create:(req, res)=>{
        console.log("chegou aqui pagina criar")
        
        res.render('cadastro-prod', { produto:null,
            css1: "/stylesheets/menu-footer.css",
            css2: "/stylesheets/adminListar.css",
            
        });

    },

    // Criar novo produto
    store:(req, res)=>{
        
        //virá a lógica
        res.redirect("/admin/produto")
       

    },

    edit: (req, res) => {
        const { id } = req.params;
        var produto = produtos.filter((prod) => prod.id == id);
        produto = produto[0]
        var arrayImg = produto.imagem;
        var img = arrayImg[0]
        console.log(img)
        produto.imagem = img
        var titulo = "EDITAR PRODUTO";
       return res.render('cadastro-prod', {
            produto, titulo,
            css1: "/stylesheets/menu-footer.css",
            css2: "/stylesheets/cadastro-prod.css",
        });

    },
    //Atualizar item no banco de dados
    update:(req, res)=>{
        //logica para atualizar
        res.redirect("/admin/produto")
    },
    //exibir a tela para mostrar o produto
    delete:(req, res)=>{
        const { id } = req.params;
        var produto = produtos.filter((prod) => prod.id == id);
        produto = produto[0]
        var arrayImg = produto.imagem;
        var img = arrayImg[0]
      
        produto.imagem = img
            return res.render('deletar-prod', {
            produto,
            css1: "/stylesheets/menu-footer.css",
            css2: "/stylesheets/cadastro-prod.css",
        });


    },
    //apagar o item do banco
    destroy:(req, res)=>{
        //Pego id do produto atraves do parametro da url
        const { id } = req.params;

        //Faço filtro para criar um novo array sem o produto com o id correspondente
        var produto = produtos.filter((prod) => prod.id != id);

        //crio variavél que vai guardar o caminho onde quero salvar o novo array
        var caminho = path.join(__dirname, "..", "database", "produtos.json")
       
        // uso metodo whiteFile do FS para escrever o novo arquivo json (ira substiuir o exesitente)
        fs.writeFile(caminho, JSON.stringify(produto), 'utf-8', (error, result)=>{
            if (error){
                console.log (error);
                return;
            }

        });
       //renderizo novamente a pagina que lista produtos para tabela vir atualizada
        return res.render("adminListar", {
            produtos:produto,
            css1: "/stylesheets/menu-footer.css",
            css2: "/stylesheets/adminListar.css",
        })
        

    }

    

}
