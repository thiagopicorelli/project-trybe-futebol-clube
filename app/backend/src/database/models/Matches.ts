import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Team';

class Matches extends Model {
  // declare <campo>: <tipo>;
  public id!: number;
  public homeTeamId!: number;
  public homeTeamGoals!: number;
  public awayTeamId!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Matches.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matches.hasMany(Teams, { foreignKey: 'id', as: 'homeTeamId' });
Matches.hasMany(Teams, { foreignKey: 'id', as: 'awayTeamId' });

Teams.belongsTo(Matches, { foreignKey: 'id', as: 'homeTeamId' });
Teams.belongsTo(Matches, { foreignKey: 'id', as: 'awayTeamId' });

export default Matches;
