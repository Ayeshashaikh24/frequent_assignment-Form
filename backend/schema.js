
const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    country:{
        type: String, required: true ,enum:[]
    },
state:{
    type: String, required: true, enum:[]
},

city:{
    type: String, required: true, enum:[]
},
gender:{
    type: String, required: true, enum:[]
},

 dateofbirth:{
    type: Date,required:true
 }  ,

 age: { type: Number },

  });

  userSchema.pre('save', function (next) {
    if (this.dateofbirth) {
      const today = new Date();
      const birthDate = new Date(this.dateofbirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.age = age;
    }
    next();
  });
 

  module.exports=mongoose.model('user',userSchema)