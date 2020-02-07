var express = require('express');
var router = express.Router();
// 处理上传下载的插件
var multiparty = require('multiparty');
var path = require('path');
var fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/upload', function (req, res, next) {
  console.log('开始上传');
  console.log(req);
  /* 解析文件并上传 */
  var form = new multiparty.Form();
  // 设置文件路径
  form.uploadDir = "static/test/";
  // 文件大小限制
  // form.maxFilesSize = 2*1024*1024;
  // 设置所有文件大小的综总和
  // form.maxFields = 10000;
  // 解析表单
  form.parse(req, function (err, filds, files) {
    console.log(files.originalFilename);
    console.log(files.path);
    // 文件重命名
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      console.log('重命名失败');
    });

  });

});


module.exports = router;