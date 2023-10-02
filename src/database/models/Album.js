module.exports = (sequelize, DataTypes) => {
    const alias = "Album"

    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_artista: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }
    }

    const config = {
        tableName: "albumes",
        timestamps: false
    }

    const Album = sequelize.define(alias, cols, config);

    return Album
}