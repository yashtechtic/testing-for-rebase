/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const purchase_order_cart_vendor = sequelize.define(
    'purchase_order_cart_vendor',
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
      vendor_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'vendor',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      notes: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
      tableName: 'purchase_order_cart_vendor',
      timestamps: false,
    }
  );

  purchase_order_cart_vendor.associate = (models) => {
    purchase_order_cart_vendor.belongsTo(models.purchase_order_cart, {
      foreignKey: 'purchase_order_cart_id',
      as: 'vendors',
    });
    purchase_order_cart_vendor.belongsTo(models.vendor, {
      foreignKey: 'vendor_id',
      as: 'vendor',
    });
    purchase_order_cart_vendor.hasMany(models.purchase_order_cart_vendor_quote, {
      foreignKey: 'purchase_order_cart_vendor_id',
      as: 'quotes',
    });
    purchase_order_cart_vendor.hasMany(models.purchase_order_cart_vendor_fee, {
      foreignKey: 'purchase_order_cart_vendor_id',
      as: 'fees',
    });
  };
  return purchase_order_cart_vendor;
};
