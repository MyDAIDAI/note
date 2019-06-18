# 使用`ssh`服务管理远程主机

`SSH`(`Secure Shell`)是一种能够以安全的方式提供远程登录的协议

两种验证方法：
- 基于口令的验证 -- 用账户和密码来验证登录
- 基于密钥的验证 -- 需要在本地生成密钥对，然后把密钥对中的公钥上传至服务器，并与服务器中的公钥进行比较，该方式相对来说更安全

`sshd`服务的配置信息保存在`/etc/ssh/sshd_config`文件中

格式， `ssh [参数] 主机IP地址`，退出登录执行`exit`命令。如果禁止以`root`管理员的身份远程登录到服务器，则可以大大降低被黑客破解密码的几率，在`/etc/ssh/sshd_config`文件中将`PermitRootLogin`该为`no`，这样就不再允许`root`管理员远程登录了。

`systemctl` -- `Control the systemed system and service manage`
重启`sshd`服务，`systemctl restart sshd`
使能`sshd`服务，`systemctl enable sshd`

### 安全秘钥验证
密钥即使密文的钥匙，有私钥和公钥之分。在传输数据时，如果担心被其他人监听或截获，可以在传输前先使用公钥对数据加密处理，然后再进行传送，这样，只有掌握了私钥的用户才能够解密这段数据，除此之外的其他人即便截获了数据，一般也很难将其破译
- 客户端生成密钥对：`ssh-keygen`
- 将客户端主机生成的公钥文件传送至远程主机：`ssh-copy-id -i .ssh/id_rsa.pub root@www.dpdaidai.top`
- 设置服务器，使其只允许密钥验证，拒绝传统的口令验证，修改配置文件并重启`sshd`服务程序：`vim /etc/ssh/sshd_config`, `PasswordAuthentication no`, `systemctl restart sshd`, `systemctl enable sshd`


### 远程传输命令
`scp` -- `secure copy`(`remote file copy program`), 是一个基于`SSH`协议在网络之间进行安全传输的命令，其格式为`scp [参数] 本地文件 远程账户@远程地址：远程目录`，`scp [参数] 远程账户@远程地址：远程文件 本地目录`
- `-v`: 显示详细的连接进度
- `-P`: 指定远程主机的`sshd`端口号
- `-r`: 用于传送文件夹
- `-6`: 使用`IPv6`协议