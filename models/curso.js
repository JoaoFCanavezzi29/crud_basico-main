module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define(
        "Curso",{
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
        });
    Curso.associate = (models) => {
        Curso.belongsToMany(models.Aluno, {
            through: 'AlunoCurso'
        });
    };

    return Curso;
};