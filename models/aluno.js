module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define(
        "Aluno",{
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            data_nascimento: {
                type: DataTypes.DATEONLY
            }
        });

        Aluno.associate = (models) => {
            Aluno.belongsToMany(models.Curso, { through: 'AlunoCurso' });
          };
          
        return Aluno;
};