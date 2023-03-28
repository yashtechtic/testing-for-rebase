/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const purchase_order_cart_item = sequelize.define(
    'purchase_order_cart_item',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      purchase_order_cart_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'purchase_order_cart',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      item_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'item',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      quantity: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
      },

      cost: {
        type: DataTypes.DECIMAL(10, 2),
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
      tableName: 'purchase_order_cart_item',
      timestamps: false,
    }
  );

  purchase_order_cart_item.associate = (models) => {
    purchase_order_cart_item.belongsTo(models.purchase_order_cart, {
      foreignKey: 'purchase_order_cart_id',
    });
    purchase_order_cart_item.belongsTo(models.item, {
      foreignKey: 'item_id',
      as: 'item',
    });
  };
  return purchase_order_cart_item;
};
