/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const purchase_order_cart = sequelize.define(
    'purchase_order_cart',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      project_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'project',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
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
      tableName: 'purchase_order_cart',
      timestamps: false,
    }
  );

  purchase_order_cart.associate = (models) => {
    purchase_order_cart.belongsTo(models.user, {
      foreignKey: 'user_id',
    });
    purchase_order_cart.belongsTo(models.project, {
      foreignKey: 'project_id',
    });
    purchase_order_cart.hasMany(models.purchase_order_cart_item, {
      foreignKey: 'purchase_order_cart_id',
      as: 'items',
    });
    purchase_order_cart.hasMany(models.purchase_order_cart_vendor, {
      foreignKey: 'purchase_order_cart_id',
      as: 'vendors',
    });
  };
  return purchase_order_cart;
};
