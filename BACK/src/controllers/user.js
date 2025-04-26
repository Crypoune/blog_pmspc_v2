import User from "../model/User.js";

// Stat sur les utilisateurs
const getStat = async (req, res) => {
    try {
        const [response] = await User.stat();
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Contrôleur pour récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const [users] = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Contrôleur pour récupérer un utilisateur spécifique par nom
const getUserByName = async (req, res) => {
    try {
        const { name } = req.params;
        const [[user]] = await User.findOneName(name);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Contrôleur pour récupérer un utilisateur spécifique par id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [[user]] = await User.findOne(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Contrôleur pour mettre à jour un utilisateur
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const [result] = await User.update(id, data);
        if (result.affectedRows === 1) {
            res.status(200).json({ msg: "User updated" });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Contrôleur pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await User.delete(id);
        if (result.affectedRows === 1) {
            res.status(200).json({ msg: "User deleted" });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export { getStat, getAllUsers, getUserByName, getUserById, updateUser, deleteUser };
