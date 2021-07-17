'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'user_game_histories',{
        fields: ['user_id'],
        type: 'foreign key',
        name: 'usr_game_his_user_id',
        references: { //Required field
          table: 'user_games',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('user_game_histories', 'usr_game_his_user_id')
  }
};
