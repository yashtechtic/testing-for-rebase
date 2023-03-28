/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const purchase_order_quote = sequelize.define(
    'purchase_order_quote',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      purchase_order_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'purchase_order',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      quote: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      src: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('current_timestamp'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('current_timestamp'),
      },
    },
    {
      tableName: 'purchase_order_quote',
      timestamps: false,
    }
  );

  purchase_order_quote.associate = (models) => {
    purchase_order_quote.belongsTo(models.purchase_order, {
      foreignKey: 'purchase_order_id',
      as: 'quotes',
    });
  };
  return purchase_order_quote;
};
