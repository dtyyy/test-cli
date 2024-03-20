const path = require("path");
const fse = require("fs-extra");
const inquirer = require("inquirer");
const downloadRepo = require("../utils/downloadRepo.js");

module.exports = async (projectName, options) => {
  const cwd = process.cwd(); // 获取当前命令行所在目录

  const targetPath = path.join(cwd, projectName); // 生成项目路径

  console.info("cwd", cwd);
  console.info("targetPath", targetPath);

  if (fse.existsSync(targetPath)) {
    if (options.force) {
      await fse.remove(targetPath);
    } else {
      // 否则选择覆盖还是退出
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Target directory already exists,please choose an action:",
          choices: [
            { name: "Overwrite", value: "overwrite" },
            { name: "Cancel", value: false },
          ],
        },
      ]);
      console.info("action", action);

      if (!action) return; // 取消，就直接退出
      else {
        // 移除旧页面

        console.info("\r\nRemoving...");
        await fse.remove(targetPath);
      }
    }
  } else {
    // 从github下载文件
    downloadRepo("github:dtyyy/You-Dont-Know-JS", projectName);
  }
};
