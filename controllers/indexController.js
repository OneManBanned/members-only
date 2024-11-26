import db from "../config/db/queries.js";

const indexController = {
    get: async (req, res) => {
        const { rows } = await db.findMessages()

        const signedIn = req.isAuthenticated();

        res.render("index.html", { signedIn: signedIn, status: req.user, messages: rows });
    },

};

export default indexController;
