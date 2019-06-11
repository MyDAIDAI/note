# 用户身份与文件权限

## 用户身份
- 管理员`UID`为`0`: 系统的管理员用户
- 系统用户`UID`为`1~999`: `Linux`系统为了避免因某个服务程序出现漏洞而被黑客提权至整个服务器，默认服务程序会有独立的系统用户负责运行，进而有效控制被破坏范围
- 普通用户`UID`从`1000`开始: 由管理员创建的用于维护日常工作的用户

`UID`是不能冲突的，由管理员创建的普通用户的`UID`默认是从`1000`开始的

用户组：
可以把多个用户加入到同一个组中，从而方便为组中的用户统一规划权限或者指定任务，在系统中创建每个用户时，将自动创建一个与其同名的基本用户组，且这个基本用户组只有该用户一个人。如果用户以后被纳入其他用户组，则这个其他用户组称之为扩展用户组

一个用户只有一个基本用户组，但是可以有多个扩展用户组

### `useradd`
创建新的用户，格式为`useradd [选项] 用户名`
- `-d`: 指定用户的主目录
- `-e`: 指定账户的到期时间，格式为`YYYY-MM-DD`
- `-u`: 指定该用户的默认`UID`
- `-g`: 指定一个初始的用户基本组（必须已存在）
- `-G`: 指定一个或者多个扩展用户组
- `-N`: 不创建与用户同名的基本用户组
- `-s`: 指定该用户的默认`shell`解释器
  
```
useradd -d /home/dp -u 8888 -s /sbin/nologin nologinUser
id nologinUser
uid=8888(nologinUser) gid=8888(nologinUser) 组=8888(nologinUser)
```

### `groupadd`命令
用于创建用户组，格式为`groupadd [选项] 群组名`

### `usermod`命令
用于修改用户的属性，格式为`usermod [选项] 用户名`
- `-c`: 填写用户账户的备注信息
- `-d -m`: 参数`-m`与`-d`连用，可重新指定用户的主目录并自动把旧的数据转移过去
- `-e`: 账户的到期时间，格式为`YYYY-MM-DD`
- `-g`: 变更所属用户组
- `-G`: 变更扩展用户组
- `-L`: 锁定用户禁止其登录系统
- `-U`: 解锁用户，允许其登录系统
- `-s`: 变更默认终端
- `-u`: 修改用户的`UID`

### `passwd`命令
用于修改用户密码，过期时间，认证信息等，格式为`passwd [选项] [用户名]`

普通用户只能使用`passwd`命令修改自身的系统密码，而`root`管理员则有权限修改其他所有人的密码，并且`root`修改自己以及其他人的密码时不需要验证旧密码

- `-l`: 锁定用户，禁止其登录
- `-u`: 解除锁定，允许用户登录
- `--stdin`: 允许通过标准输入修改用户密码，如`echo "newpassword" | passwd --stdin username`
- `-d`: 使该用户可用空密码登录系统
- `-e`: 强制用户在下次登录时修改密码
- `-S`: 显示用户的密码是否被锁定，以及密码所采用的加密算法名称

### `userdel`命令
`userdel`命令用于删除用户，格式为`userdel [选项] 用户名`
- `-f`: 强制删除用户
- `-r`: 同时删除用户以及用户的主目录

## 文件权限与归属
`linux`文件类型
- `-`: 普通文件
- `d`: 目录文件
- `l`: 链接文件
- `b`: 块设备文件
- `c`: 字符设备文件
- `p`: 管道文件

在`linux`系统中，每个文件都有所属的所有者和所有组，并且规定了文件的所有者，所有组以及其他人对文件所拥有的可读(`r`), 可写(`w`), 可执行(`x`)等权限

对于一般文件来说，“可读”表示能够读取文件的实际内容，“可写”表示能够编辑、新增、修改、删除文件的实际内容，“可执行”则表示能够运行一个脚本程序。但对于目录文件其权限设置则比较困难呢

目录文件的“可读”表示能够读取目录内的文件列表，“可写”表示能够在目录内新增、删除、重命名文件，“可执行”则表示能够进入该目录

文件权限的数字法表示基于字符表示（`rwx`）的权限计算而来，其值分别为`4 2 1`

```
[root@izm5e3ysu09m3fsttcfydjz ~]# ls -l index.html
-rw-r--r-- 1 root root 230 4月  29 09:34 index.html
文件类型 所有者权限 所有者权限 其他人权限 ...
```

## 文件的特殊权限
由于单纯设置文件的`rwx`权限无法满足对安全和灵活性的需求，所有有了`SUID`、`SGID`、`SBIT`的特殊权限位

### `SUID`
`SUID`是一种对二进制程序进行设置的特殊权限，可以让二进制程序的执行者临时拥有属主的权限（仅对拥有执行权限的二进制程序有效）
- `rwx -> rws`

- `rw- -> rwS`（没有执行权限时转换为大写形式）

### `SGID`
`SGID`主要实现如下两种功能：
- 让执行者临时拥有属组的权限（对拥有执行权限的二进制程序进行设置）
- 在某个目录中创建的文件自动继承该目录的用户组（只可以对目录进行设置）

#### 设置文件或者目录的权限
`chmod`: 格式为`chmod [参数] 权限 文件或者目录名称`
`chown`: 何时为`chown [参数] 所有者:所属组 文件或者目录名称`
`-R`: 对于目录操作时需要加上该参数

### `SBIT`
`SBIT`可以确保用户只能删除自己的文件，而不能删除其他用户的文件。也就是说，当对某个目录设置了`SBIT`粘滞位权限之后，那么该目录的文件就只能被其所有者执行删除
```
drwxrwxrwt.  9 root root 4096 6月   8 03:48 .
```
当目录被设置`SBIT`特殊权限位之后，文件的其他权限位部分的`x`会被替换为`t/T`(原本有`x`权限被替换为`t`,没有`x`权限被替换为`T`)

设置`SBIT`, `chmod -R o+t 目录名`

## 文件的隐藏属性
`linux`系统中的文件除了具备一般权限和特殊权限之外，还有一种隐藏权限，即被隐藏起来的权限，默认情况下不能直接被用户发觉

### `chattr`命令
`chattr` - `change file attributes on a linux file system`, 格式为`chattr [参数] 文件`
- 如果想要把某个隐藏功能添加到文件上，则需要在命令后面追加“+参数”
- 如果想要把某个功能移出文件，则需要追加“-参数”

参数：
- `i`: 无法对文件进行修改，若对目录设置了该参数，则仅能修改其中的子文件内容而不能新建或删除文件
- `a`: 仅允许追加内容，无法覆盖，删除内容
- `S`: 文件内容在变更后立即同步到硬盘
- `s`: 彻底从硬盘删除，不可恢复
- `A`: 不再修改这个文件或目录的最后访问时间`atime`
- `b`: 不再修改文件或目录的存取时间
- `D`: 检查压缩文件中的错误
- `d`: 使用`dump`命令备份时忽略本文件/目录
- `c`: 默认将文件或目录压缩
- `u`: 当删除该文件后依然保留其在硬盘中的数据，方便日后恢复
- `t`: 让文件系统支持尾部合并
- `X`: 可以直接访问压缩文件内容
  
```
chattr +a testfile
lsattr testfile
// -----a-------e-- testfile
rm testfile
// rm：是否删除普通文件 "testfile"？yes
// rm: 无法删除"testfile": 不允许的操作
```

### `lsattr`命令
`lsattr` - `list file attributes on a linux second extended file system`, 用于显示文件的隐藏权限，格式为`lsattr [参数] 文件`
```
lsattr testfile
// -----a-------e-- testfile
chattr -a testfile
lsattr testfile
// -------------e-- testfile
```

## 文件访问控制列表
前面讲解的一般权限、特殊权限以及隐藏权限都会针对某一类用户设置的，如果需要对某个指定的用户进行单独的权限控制，就需要用到文件的访问控制列表。基于普通文件或目录设置`ACL`就是针对指定用户或用户组设置文件或目录的操作权限

对某个目录设置了`ACL`,则目录中的文件会继承`ACL`;若针对文件设置了`ACL`,则文件不再继承所在目录的`ACL`

```
[root@izm5e3ysu09m3fsttcfydjz ~]# su dp
[dp@izm5e3ysu09m3fsttcfydjz root]$ ls
ls: 无法打开目录.: 权限不够
[dp@izm5e3ysu09m3fsttcfydjz root]$ cd /root/
bash: cd: /root/: 权限不够
[dp@izm5e3ysu09m3fsttcfydjz root]$ cd ~
[dp@izm5e3ysu09m3fsttcfydjz ~]$ cd /root/
bash: cd: /root/: 权限不够
```
切换到普通用户之后，不能进入`root`文件

### `setfacl`命令
`setfacl` - `set file access control lists`, 格式为`setfacl [参数] 文件名称`

文件的`ACL`提供的是所有者，所属组，其他人的读/写/执行权限之外的特殊权限，使用`setfacl`命令可以针对单一用户或用户组，单一文件或目录类进行读/写/执行权限的控制

- `-R`: 针对目录文件
- `-m`: 针对普通文件
- `-b`: 删除文件的`ACL`

```
setfacl -Rm u:dp:rwx /root
[dp@izm5e3ysu09m3fsttcfydjz ~]$ ls -ld /root/     // 修改之后可以游行
dr-xrwx---+ 13 root root 4096 6月  10 09:24 /root/
```
文件权限后的`.`变成了`+`，意味着该文件已经设置了`ACL`

`ACL`类型：
- `ACL_USER_OBJ`: 相当于`Linux`里`file_owner`的权限
- `ACL_USER`: 定义了额外的用户可以对此文件拥有的权限
- `ACL_GROUP_OBJ`: `Linux`里`Group`的权限
- `ACL_GROUP`: 定义了额外的组可以对此文件拥有的权限
- `ACL_MASK`: 定义了`ACL_USER`、`ACL_GROUP_OBJ`和`ACL_GROUP`的最大权限
- `ACL_OTHER`: 定义了`other`的权限

### `getfacl`命令
`getfacl` - `get file access control lists`， 格式`getfacl 文件名称`
```
[dp@izm5e3ysu09m3fsttcfydjz ~]$ getfacl /root/
getfacl: Removing leading '/' from absolute path names
# file: root/
# owner: root
# group: root
user::r-x  定义了 ACL_USER_OBJ, 说明文件所有者拥有读和执行的权限
user:dp:rwx 定义了 ACL_USER, 这样用户 dp 就拥有了读，写，执行的权限
group::r-x 定义了 ACL_GROUP_OBJ, 文件的用户组拥有读与执行的权限
mask::rwx 定义了 ACL_MASK, 其权限为读，写，执行
other::--- 定义了 ACL_OTHER的权限
```

当为文件设置了`ACL`之后，使用`ls -l`命令中的用户组权限就显示的为`mask`的权限，而具体的用户组权限需要使用`getfacl`查看
```
[root@izm5e3ysu09m3fsttcfydjz ~]# ls -l index.html
-rw-rwxr--+ 1 root root 230 4月  29 09:34 index.html
[root@izm5e3ysu09m3fsttcfydjz ~]# getfacl index.html
# file: index.html
# owner: root
# group: root
user::rw-
user:dp:rwx
group::r--
mask::rwx
other::r--
```

`mask`规定了`ACL_USER`,`ACL_GROUP`,`ACL_GROUP_OBJ`的最大值
```
[root@localhost ~]# setfacl -m mask::r-- ./test.sh
[root@localhost ~]# getfacl --omit-header ./test.sh
user::rwx
user:john:rwx   #effective:r--
group::rw-      #effective:r--
mask::r--
other::r--
```
它规定了`ACL_USER`，`ACL_GROUP_OBJ`和`ACL_GROUP`的最大权限。那么在我们这个例子中他们的最大权限也就是`read only`。虽然我们这里给`ACL_USER`和`ACL_GROUP_OBJ`设置了其他权限，但是他们真正有效果的只有read权限。