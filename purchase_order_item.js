/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const purchase_order_item = sequelize.define(
    'purchase_order_item',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
        references: {
          model: 'purchase_order',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      item_id: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
        references: {
          model: 'item',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      cost: {
        allowNull: false,
        type: DataTypes.DOUBLE,
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
      tableName: 'purchase_order_item',
      timestamps: false,
    }
  );

  purchase_order_item.associate = (models) => {
    purchase_order_item.belongsTo(models.purchase_order, { foreignKey: { name: 'order_id' } });
    purchase_order_item.belongsTo(models.item, { foreignKey: { name: 'item_id' } });
  };

  return purchase_order_item;
};
