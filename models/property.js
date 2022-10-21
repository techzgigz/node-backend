module.exports = (sequelize, Sequelize) => {
  const Property = sequelize.define("property", {
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING
    },
    // published: {
    //   type: Sequelize.BOOLEAN
    // },
    country: {
      allowNull: false,
      type: Sequelize.STRING
    },
    state: {
      allowNull: false,
      type: Sequelize.STRING
    },
    location: {
      allowNull: false,
      type: Sequelize.STRING
    },
    pincode: {
      allowNull: false,
      type: Sequelize.STRING
    },
    category: {
      allowNull: false,
      type: Sequelize.STRING
    },
    size: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    sizeType: {
      allowNull: false,
      type: Sequelize.STRING
    },
    prppertyType: {
      allowNull: false,
      type: Sequelize.STRING
    },
    price: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    bedroom:{
      allowNull: false,
      type: Sequelize.INTEGER
    },
    bathroom:{
      allowNull: false,
      type: Sequelize.INTEGER
    },
    parking:{
      allowNull: false,
      type: Sequelize.INTEGER
    },
    contactName:{
      allowNull: false,
      type: Sequelize.STRING
    },
    contactINTEGER:{
      allowNull: false,
      type: Sequelize.STRING
    },
    contactemail:{
      allowNull: false,
      type: Sequelize.STRING
    },
    image1:{
      type: Sequelize.STRING
    },
    image2:{
      type: Sequelize.STRING
    },image3:{
      type: Sequelize.STRING
    },image4:{
      type: Sequelize.STRING
    },image5:{
      type: Sequelize.STRING
    },
    status:{
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
    subscibe:{
      allowNull: false,
      type: Sequelize.STRING
    },
    subscibeTimestamp: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  });

  return Property;
};