import { Schema, model } from "mongoose";

const lectureSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Lecture title is required'],
  },
  description: {
    type: String,
    required: [true, 'Lecture description is required'],
  },
  video: {
    public_id: {
      type: String,
      required: [true, 'Video public_id is required'],
    },
    secure_url: {
      type: String,
      required: [true, 'Video URL is required'],
    },
  },
  thumbnail: {
    public_id: {
      type: String,
      required: [true, 'Thumbnail public_id is required'],
    },
    secure_url: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
    },
  }
});

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    maxLength: [59, 'Title should be less than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxLength: [200, 'Description should be less than 200 characters'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  lectures: [lectureSchema],
  numbersOfLectures: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: [true, 'Creator is required'],
  }
}, {
  timestamps: true,
});

const Course = model('Course', courseSchema);

export default Course;
