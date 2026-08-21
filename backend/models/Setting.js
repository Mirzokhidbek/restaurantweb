import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    isRestaurantOpen: {
      type: Boolean,
      default: true,
    },
    closingMessage: {
      type: String,
      default: 'Restoran hozirda yopilgan. Xizmat ko‘rsatish vaqtincha to‘xtatilgan.',
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
