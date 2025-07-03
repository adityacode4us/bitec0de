import { sequelConnection, DataTypes } from "../database/index.js";

const Contacts = sequelConnection.define(
  "contacts",
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "contacts",
        key: "id",
      },
    },
    linkedPrecedence: {
      type: DataTypes.ENUM("primary", "secondary"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Contacts;
