import Mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends Mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends Mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform(doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next();
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = Mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
