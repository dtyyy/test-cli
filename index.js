const program = require("commander");
const Inquirer = require("inquirer");
const create = require("./lib/create");
const createTemplate = require("./lib/createTemplate");

// 创建项目
program
  .command("create <path>")
  .description("create a new project") //用来描述create命令干啥的
  // 第一参数为可选项的简写可全写，第二个参数是对第一参数的描述信息，用来描述这个option是干啥的
  // 执行create project-name --force的时候，如果当前目录有个叫project-name的目录就直接强制替换
  .option("-f,--force", "overwrite target directory if it exists")
  .action((path, cmd) => {
    //执行完这个命令后的回调函数
    console.log(path, cmd);

    new Inquirer.prompt([
      {
        name: "value",
        type: "checkbox",
        message: "Check the features needed for your project",
        choices: [{ name: "从github拉取模版" }, { name: "从本地生成模版" }],
      },
    ]).then((data) => {
      console.info("data", data);

      if (data?.value?.[0] === "从github拉取模版") {
        create(path, cmd);
      } else if (data?.value?.[0] === "从本地生成模版") {
        createTemplate(path);
      }
    });
  });

program.parse(process.argv);
