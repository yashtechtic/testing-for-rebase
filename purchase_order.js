/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const purchase_order = sequelize.define(
    'purchase_order',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      purchase_order_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      vendor_id: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
        references: {
          model: 'vendor',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      shipping: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      project_id: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
        references: {
          model: 'project',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      },
      pdf_src: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
        defaultValue: false,
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
      tableName: 'purchase_order',
      timestamps: false,
    }
  );

  purchase_order.associate = (models) => {
    purchase_order.belongsTo(models.vendor, { foreignKey: { name: 'vendor_id' }, as: 'vendor' });
    purchase_order.belongsTo(models.project, { foreignKey: { name: 'project_id' }, as: 'project' });
    purchase_order.hasMany(models.purchase_order_item, {
      foreignKey: { name: 'order_id' },
      as: 'items',
    });
    purchase_order.hasMany(models.purchase_order_quote, {
      foreignKey: { name: 'purchase_order_id' },
      as: 'quotes',
    });
  };

  return purchase_order;
};
