module.exports = (sequelize, DataTypes) => {
    const Disciplina = sequelize.define(
      "Disciplina", {
        nome: {
          type: DataTypes.STRING,
          allowNull: false
        },
      }
    );
  
    Disciplina.associate = (models) => {
      Disciplina.belongsTo(models.Professor, {
        foreignKey: 'professorId',
        onDelete: 'CASCADE',
      });
  
      Disciplina.belongsTo(models.Curso, {
        foreignKey: 'cursoId',
        onDelete: 'CASCADE',
      });
    };
  
    return Disciplina;
  };
  