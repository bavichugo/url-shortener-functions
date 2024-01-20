import mongoose, { Schema, Document } from "mongoose";

interface IUrlRecord extends Document {
  long_url: string;
  short_url: string;
  user: Schema.Types.ObjectId;
}

const urlRecordSchema = new Schema(
  {
    long_url: {
      type: String,
      require: true,
    },
    short_url: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const UrlRecord = mongoose.model<IUrlRecord>("UrlRecord", urlRecordSchema);

export default UrlRecord;
