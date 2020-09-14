// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs");
const config = require('./config.json')

const NlpClient = tencentcloud.nlp.v20190408.Client;
const models = tencentcloud.nlp.v20190408.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential(config.sid, config.skey);

let httpProfile = new HttpProfile();
httpProfile.endpoint = "nlp.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new NlpClient(cred, "ap-guangzhou", clientProfile);

let req = new models.ChatBotRequest()

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const {text}= event;

  const json_params = {
    Flag:0,
    Query:text
  }
  const params = JSON.stringify(json_params);
  req.from_json_string(params);

  return new Promise((resolve,reject)=>{
    client.ChatBot(req, function(errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      }
      const res = response.to_json_string();
      resolve(res)
  });
  })
}