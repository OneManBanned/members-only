const loginController = {
    get: async (req, res) => res.render("login.html", { errors: {}, values: {} })
};

export default loginController;
