# `Git`操作总结

## 生成`ssh`公钥

- `cd ~/.ssh`
- `ssh-keygen`
- `cat ~/.ssh/id_rsa.pub`

## `Git`配置

- 全局配置用户信息

  ```
  git config --global user.name 'daidai'
  git config --global user.email 571143755@qq.com
  ```

- 单个项目单独配置用户信息

  ```
  git config user.name 'daidai'
  git config user.email 571143755@qq.com
  ```

- 检查配置信息

  - 所有配置信息：`git config --list`
  - 某一项配置信息：`git config user.name`

## `Git`基础操作

### 获取`Git`仓库

- 在现有仓库中进行初始化：`git clone`
- 从已存在的`Git`仓库中克隆：`git clone <remote_url> [local_project_name]`

### 记录每次更新到仓库

`Git`项目中文件状态：

- `untracked`：未追踪文件，也就是未添加到`git`追踪列表中的文件
- `unmodified`：未修改的文件
- `modified`：已被修改的文件
- `staged`：已将修改放入暂存区的文件

![image-20181116215520894](https://github.com/MyDAIDAI/StudyGit/blob/master/image-20181116215520894.png)

- 查看当前文件状态：`git status`

- 跟踪新文件，也就是将`Git`未追踪文件放入追踪列表：`git add <file>`
- 状态概览：`git status -s`
- 忽略文件
  - 添加文件`.gitignore`，在文件中添加需要忽略的文件
  - `git rm --cached <fie>`，忽略已经追踪的文件
- 查看已暂存和未暂存的修改：`git diff`
- 提交更新：`git commit`
- 跳过使用暂存区：`git commit -a`
- 移除文件
  - 需要将文件删除：`git rm <file>` `rm <file>`
  - 只删除`git`追踪记录：`git rm --cached <file>`
- 移动文件：`git mv file_from file_to`

### 查看提交历史

查看提交历史`git log`，其常用的参数选项

| 选项                 | 说明                                             |
| -------------------- | ------------------------------------------------ |
| `-p`                 | 按补丁格式显示每个更新之间的差异                 |
| `--stat`             | 显示每次更新的文件修改统计信息                   |
| `--shortstat`        | 只显示`--stat`中最后行数修改添加移除统计         |
| `--name-only`        | 仅在提交信息后显示已修改的文件清单               |
| `--name-status`      | 显示新增、修改、删除的文件清单                   |
| `--abbrev-commit`    | 仅显示`SHA-1`的前几个字符，而非所有40个          |
| `--relative-date`    | 使用较短的相对时间显示                           |
| `graph`              | 显示`ASCII`图形表示的分支合并历史                |
| `--pretty`           | 使用其他格式显示历史提交信息                     |
| `-(n)`               | 仅显示最近的`n`条提交                            |
| `--since`,`--after`  | 仅显示指定时间之后的提交                         |
| `--until`,`--before` | 仅显示指定时间之前的提交                         |
| `--author`           | 仅显示指定作者相关的提交                         |
| `--committer`        | 仅显示指定提交者相关的提交                       |
| `--grep`             | 仅显示含指定关键字（提交说明中的）的提交         |
| `-S`                 | 仅显示添加或移除了某个关键字（文件内容中）的提交 |

### 撤销操作

- 修改`commit`中的提交信息或者添加遗漏的文件：`git commit --amend`
- 取消添加到暂存区中的文件：`git reset HEAD <file>`
- 撤销对文件的修改：`git checkout -- <file>` (**不可恢复**)

### 远程仓库的使用

- 查看远程仓库：`git remote -v`
- 添加远程仓库：`git remote add <shortname> <url>` ，`shortname`--远程仓库简写
- 从远程仓库中抓取与拉取：`git fetch [remote-name]`
  - 与`git pull `区别
    - `git fetch`是抓取远程中的所有数据，包括所有的分支的引用
    - `git pull`只是抓取远程仓库中的某一个分支并且合并到当前分支
- 推送到远程：`git push [remote-name] [branch-name]`
- 查看远程仓库：`git remote show [remote-name]`
- 远程仓库移除：`git remote rm [remote-name]`
- 远程仓库重命名：`git remote rename [name_from] [name_to]`

### 打标签

### `Git`别名



# `Git`使用中遇到的问题：

- `fatal: refusing to merge unrelated histories`
  - 发生背景：本地仓库与远程仓库合并时
  - 原因：本地仓库与远程仓库是两个互相独立的仓库，如果使用`git clone`克隆岛本地则不会有这个错误
  - 解决办法：`git pull origin master --allow-unrelated-histories`

# `git rebase` 变基
