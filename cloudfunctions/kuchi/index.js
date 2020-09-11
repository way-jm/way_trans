// 云函数入口文件
const cloud = require('wx-server-sdk')

const tencentcloud = require("tencentcloud-sdk-nodejs");

const FmuClient = tencentcloud.fmu.v20191213.Client;
const models = tencentcloud.fmu.v20191213.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential("", "");

let httpProfile = new HttpProfile();
httpProfile.endpoint = "fmu.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new FmuClient(cred, "ap-shanghai", clientProfile);

let req = new models.TryLipstickPicRequest();

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const {Url,LipColorInfo}= event;
  const json_params = {
    RspImgType:'url',
    Url,
    LipColorInfos:[LipColorInfo]
  }
  const params = JSON.stringify(json_params);
  req.from_json_string(params);

  return new Promise((resolve,reject)=>{
    client.TryLipstickPic(req, function(errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      }
      const res = response.to_json_string();
      resolve(res)
  });
  })
}