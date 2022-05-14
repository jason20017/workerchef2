//使用Joi 用來確認數據是否有效 (是否符合當初設定Schema的規則)
const Joi = require("joi");

//Register validation 驗證註冊的資訊是否有效
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(), //對應到user-model 設定的規則
    email: Joi.string().min(6).max(100).required().email(), //這邊最後在加一個.email代表，這裡的格式一定要是email
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data); //利用Joi object 建立的schema 來確認送進來的資料，是否有效
};

//Login validation 驗證登入的資訊是否有效，在登入動作時，只需要驗證email與密碼
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
