'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'posts',
          'format',
          {
              type: Sequelize.STRING,
              defaultValue: 'HTML',
              allowNull: false
          }
      );
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('posts', 'format');
  }
};
