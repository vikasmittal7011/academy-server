import { Schema, model } from 'mongoose';

const locationSchema = new Schema({
  mapLocation: String,
  address: String,
  state: String,
  zipCode: String,
  country: String,
});

const speakerSchema = new Schema({
  name: String,
  bio: String,
  title: String,
});

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  location: locationSchema,
  speakers: [speakerSchema],
  tags: [String]
});


eventSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Event = model('Event', eventSchema);

export default Event;