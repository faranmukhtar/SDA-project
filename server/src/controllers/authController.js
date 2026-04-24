const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userQueries = require("../db/user_queries");
const roleQueries = require("../db/roles_queries");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userQueries.getUserByUsername(username);
  if (!user || !(await bcrypt.compare(user.password, password))) {
    res.status(401).json({ error: "Invalid credentials" });
  }

  const role = await roleQueries.getRole(user.role_id);
  if (!role) {
    res.status(401).json({ error: "Invalid role" });
  }

  const payload = {
    id: user.id,
    username: user.username,
    role: role.role_name,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  res.json({ accessToken, refreshToken });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(402).json({ error: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const payload = {
      id: decoded.id,
      username: decoded.username,
      password: decoded.password,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken });
  } catch {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

const signup = async (req, res) => {
  const user = req.body;
  const fields = [
    "username",
    "password",
    "name",
    "city",
    "address",
    "phone_number",
  ];

  for (const field of fields) {
    if (!user[field]) {
      res.status(400).json({ error: `${field} is required!` });
    }
  }

  let result = await userQueries.getUserByUsername(user.username);
  if (result) {
    res.status(409).json({ error: "Username already in use!" });
  }

  const hashedPassword = bcrypt.hash(user.password, 10);

  const userData = fields.reduce((acc, field) => {
    acc[field] = field === "password" ? hashedPassword : user[field];
    return acc;
  }, {});

  try {
    const result = await userQueries.insertUser({ ...userData, role_id: 1 });
    const roleName = await roleQueries.getRole(result.role_id).role_name;

    const payload = {
      id: result.id,
      username: result.username,
      role: roleName,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ accessToken, refreshToken });
  } catch {
    res.status(400).json({ error: "Something went wrong!" });
  }
};

module.exports = {
  login,
  signup,
  refresh,
};
