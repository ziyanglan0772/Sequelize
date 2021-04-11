export default (database, DataTypes) => {
  const DiningHall = database.define(
    "Dining_Hall",
    {
      hall_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      hall_name: {
        type: DataTypes.STRING,
      },
      hall_address: {
        type: DataTypes.STRING,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
  return DiningHall;
};
