// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs");
const config = require('./config.json')

const TmtClient = tencentcloud.tmt.v20180321.Client;
const models = tencentcloud.tmt.v20180321.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential(config.sid, config.skey);
let httpProfile = new HttpProfile();
httpProfile.endpoint = "tmt.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new TmtClient(cred, "ap-shanghai", clientProfile);

let req = new models.TextTranslateRequest();

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {text,lan}= event;
  const json_params = {
    SourceText:text,
    Source:'auto',
    Target:lan,
    ProjectId:0
  }
  const params = JSON.stringify(json_params);
  req.from_json_string(params);

  return new Promise((resolve,reject)=>{
   client.TextTranslate(req, function(errMsg, response) {
      if (errMsg) {
          reject(errMsg)
      }

      response.origin=text
      const res = response.to_json_string()
      resolve(res)
  });
  })


}