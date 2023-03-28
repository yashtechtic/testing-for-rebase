/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const purchase_order_cart_vendor_fee = sequelize.define(
    'purchase_order_cart_vendor_fee',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      purchase_order_cart_vendor_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'purchase_order_cart_vendor',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      fee: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      amount: {
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
      tableName: 'purchase_order_cart_vendor_fee',
      timestamps: false,
    }
  );

  purchase_order_cart_vendor_fee.associate = (models) => {
    purchase_order_cart_vendor_fee.belongsTo(models.purchase_order_cart_vendor, {
      foreignKey: 'purchase_order_cart_vendor_id',
      as: 'fees',
    });
  };
  return purchase_order_cart_vendor_fee;
};
