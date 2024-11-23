import db from "../config/db/queries.js";

const loginController = {
  get: async (req, res) => {
    
      const { rows } = await db.findUserByEmail('brendanlawless@hotmail.com')     
      console.log(rows[0])
      res.render("login.html", { errors: {}, values: {} })},

};

export default loginController;
