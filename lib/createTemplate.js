const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const chalk = require("chalk");
const ora = require("ora");

module.exports = async (src) => {
  const dirname = path.dirname(src);
  const existDir = fs.existsSync(dirname);
  const existFile = fs.existsSync(src);
  const spinner = ora("Loading").start();

  if (!existDir) {
    fs.mkdirSync(dirname, { recursive: true });
  }

  if (!existFile) {
    const templatePath = path.join(__dirname, "../templates/list.ejs");

    const str = ejs.render(fs.readFileSync(templatePath, "utf-8"));

    fs.writeFileSync(path.join(src), str);

    spinner.color = "yellow";
    spinner.text = "Loading rainbows";
    spinner.stop();
    console.log(chalk.blue(src, "文件已生成"));
  } else {
    spinner.stop();
    console.log(chalk.red("文件已存在"));
  }
};
