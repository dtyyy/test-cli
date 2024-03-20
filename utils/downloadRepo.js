const download = require("download-git-repo");
const ora = require("ora");
module.exports = async (repoUrl, targetPath) => {
  const loading = ora({
    text: "您的资源正在加载中",
    //color: "red",
  });

  return new Promise((resolve, reject) => {
    loading.start();
    download(repoUrl, targetPath, function (err) {
      if (err) {
        reject(err);
        loading.fail("您的资源加载失败", err);
      } else {
        resolve();
        loading.succeed("恭喜，您已成功加载");
      }
    });
  });
};
