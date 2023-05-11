import { DataTypes, Model } from 'sequelize';
import db from '.';
import Matches from './Matches';

class Teams extends Model {
  // declare <campo>: <tipo>;
  public id!: number;
  public teamName!: string;
}

Teams.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Teams.belongsTo(Matches, { foreignKey: 'id', as: 'homeTeamId' });
Teams.belongsTo(Matches, { foreignKey: 'id', as: 'awayTeamId' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Teams;
