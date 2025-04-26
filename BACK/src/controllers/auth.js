import Auth from "../model/Auth.js";
import bcrypt from "bcrypt";

const SALT = 10;

const getStat = async (req, res) => {
  try {
    const [response] = await Auth.stat();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const [[user]] = await Auth.findOneByUsername(username);

    if (!user) {
      const hash = await bcrypt.hash(password, SALT);
      const [response] = await Auth.create({ username, hash, email });

      if (response.affectedRows === 1) {
        const [[user]] = await Auth.findOneByUsername(username);
        res.status(201).json({
          msg: "User created",
          isLogged: true,
          user: user,
        });
      } else {
        res.status(500).json({ msg: "User not created" });
      }
    } else {
      res.status(400).json({ msg: "User already exists" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [[user]] = await Auth.findOneByUsername(username);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const [[userByID]] = await Auth.findUserInfoById(user.id);
    req.session.user = { id: user.id, ...userByID };

    req.session.save((err) => {
      if (err) {
        console.error("Erreur lors de la sauvegarde de session :", err);
        return res.status(500).json({ msg: "Session error" });
      }

      res.status(200).json({
        msg: "User logged in",
        isLogged: true,
        user: userByID,
      });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: "Logout error" });
      }
      res.clearCookie("connect.sid");
      res.json({ msg: "User logged out", isLogged: false });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    // Vérifier si l'utilisateur connecté est autorisé à mettre à jour cet utilisateur
    if (req.session.user.id != id && !req.session.user.role != "admin") {
      return res.status(403).json({ msg: "Forbidden: You do not have permission to update this user" });
    }

    let hash = "";

    if (req.body.change === true && req.body.password != "") {
      hash = await bcrypt.hash(req.body.password, SALT);
    }
    const [response] = await Auth.update(
      req.body.change,
      hash,
      req.body.mail,
      req.body.username
    );
    if (!response.affectedRows) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.json({ msg: "User info changed", isChanged: true });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export { getStat, create, login, logout, update };
