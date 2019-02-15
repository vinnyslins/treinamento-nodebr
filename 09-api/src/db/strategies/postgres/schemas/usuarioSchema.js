const Sequelize = require('sequelize');

const UsuarioSchema = {
  name: 'usuarios',
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      required: true,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      required: true
    }
  },
  options: {
    tableName: 'TB_USUARIOS',
    freezeTableName: false,
    timestamps: false
  }
}

module.exports = UsuarioSchema;
