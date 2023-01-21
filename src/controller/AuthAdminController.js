module.exports ={
    index: (req, res) => {

        return res.render("login", {
            css1: "/stylesheets/menu-footer.css",
            css2: "/stylesheets/login.css",
        })
    }
}

   