import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true }, // e.g. Executive Chef, Head Pastry Chef
    bio: { type: String, required: true },
    image: { type: String, required: true },
    experienceYears: { type: Number, default: 5 },
    specialties: [{ type: String }],
    socialLinks: {
      instagram: { type: String, default: '#' },
      facebook: { type: String, default: '#' },
      twitter: { type: String, default: '#' },
    },
    rating: { type: Number, default: 4.9 },
  },
  { timestamps: true }
);

const Chef = mongoose.model('Chef', chefSchema);
export default Chef;
