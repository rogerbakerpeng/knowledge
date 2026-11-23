# Claude Code 虚拟机：代理原理与绕过激活

> 来源：本地文件 `D:\Downloads\claude-vm-proxy.html`（Devin artifact 页，构建于 2026-11-23）。
> 性质：VMware 虚拟机里 Claude Code 代理链路的排查笔记与自建指南。原始 HTML 存于 [原始材料/claude-vm-proxy.html](原始材料/claude-vm-proxy.html)，以下为全文转录（命令可照抄）。

## 核心结论

**setup-proxy 只是激活门槛，真正干活的是 gost + 代理环境变量，换成自己的 SOCKS5 即可不再依赖作者。**

链路：`Claude → gost(127.0.0.1:8080) → 静态住宅 SOCKS5 → Anthropic`。只需改 `gost.service` 里的 `-F socks5://` 上游，其他不动；setup-proxy 不常驻，可改名停用。

Claude Code 只支持 HTTP/HTTPS 代理，所以需要 gost 把 SOCKS5 转成本机 HTTP 代理。

## 流量图

```text
VMware 虚拟机 (192.168.88.128)
  claude (~/.local/bin/claude，官方原版)
    → HTTPS_PROXY → gost 服务 (127.0.0.1:8080, HTTP 转 SOCKS5)
      → 静态住宅 IP 代理 (SOCKS5 45.43.4.134:20146，固定住宅 IP 出口)
        → Anthropic (api.anthropic.com) → 写入账号
setup-proxy 只在激活时运行一次，不在流量路径上。
```

## 各组件位置

| 组件 | 位置 | 作用 |
|---|---|---|
| setup-proxy | `/usr/local/bin/setup-proxy` | shc 加密的 shell 脚本（19KB ELF）。校验激活码后写好下面两处，然后退出，不在流量路径上。 |
| gost 服务 | `/etc/systemd/system/gost.service` | 开机自启，以 root 运行：`gost -L http://127.0.0.1:8080 -F socks5://<作者账号>@45.43.4.134:20146` |
| 代理环境变量 | `~/.bashrc` 第 121-124 行 | `HTTP_PROXY` / `HTTPS_PROXY` / `http_proxy` / `https_proxy` = `http://127.0.0.1:8080` |
| Claude Code | `~/.local/bin/claude` | 官方原版安装，没有改动，也没有限制工作目录。 |

## 1. 换成自己的静态 IP（当前虚拟机）

```bash
sudo cp /etc/systemd/system/gost.service ~/gost.service.bak
sudo nano /etc/systemd/system/gost.service
#   ExecStart 里 -F socks5:// 后面改成 你的用户:密码@IP:端口
sudo systemctl daemon-reload && sudo systemctl restart gost
curl -s https://ipinfo.io                  # 出口应为你自己的静态 IP
```

之后不要再运行 setup-proxy，否则可能被改回作者的账号。

## 2. 不激活：在干净的 Ubuntu 上自己搭

```bash
wget https://github.com/ginuerzh/gost/releases/download/v2.11.5/gost-linux-amd64-2.11.5.gz
gunzip gost-linux-amd64-2.11.5.gz && sudo install -m755 gost-linux-amd64-2.11.5 /usr/local/bin/gost
sudo tee /etc/systemd/system/gost.service <<'X'
[Unit]
Description=Gost Local Forwarder
After=network-online.target
[Service]
ExecStart=/usr/local/bin/gost -L http://127.0.0.1:8080 -F socks5://用户:密码@IP:端口
Restart=always
[Install]
WantedBy=multi-user.target
X
sudo systemctl daemon-reload && sudo systemctl enable --now gost
cat >> ~/.bashrc <<'X'
export HTTP_PROXY="http://127.0.0.1:8080"
export HTTPS_PROXY="http://127.0.0.1:8080"
export http_proxy="http://127.0.0.1:8080"
export https_proxy="http://127.0.0.1:8080"
X
source ~/.bashrc
curl -fsSL https://claude.ai/install.sh | bash
cd ~/workspace && claude
```

SOCKS5 无认证时写成 `socks5://IP:端口`。也可以不用 gost，直接把环境变量指向 Windows Clash Verge 的局域网端口（开启 Allow LAN，`http://VMnet8 IP:7897`）。

## 3. 停用 setup-proxy

```bash
pgrep -a setup-proxy                       # 无输出 = 没在运行
sudo mv /usr/local/bin/setup-proxy /usr/local/bin/setup-proxy.disabled
```

## 4. 怎样自己排查代理链路

```bash
sudo ss -tnp | grep claude                 # claude 连到 127.0.0.1:8080
sudo ss -lntp | grep 8080                  # 8080 由 gost 监听
ps -o pid,user,cmd -p <gost的PID>          # 看到 -F socks5://... 上游地址
systemctl status <gost的PID>               # 服务文件 /etc/systemd/system/gost.service
grep -rn 127.0.0.1:8080 ~/.bashrc          # 环境变量位置
```

## 5. Windows 与虚拟机共享文件夹

```bash
# VMware：虚拟机 → 设置 → 选项 → 共享文件夹 → 总是启用，添加 git = D:\git
sudo mkdir -p /mnt/hgfs
sudo vmhgfs-fuse .host:/ /mnt/hgfs -o allow_other -o uid=1000 -o gid=1000
echo '.host:/ /mnt/hgfs fuse.vmhgfs-fuse allow_other,uid=1000,gid=1000,defaults 0 0' | sudo tee -a /etc/fstab
ln -s /mnt/hgfs/git ~/workspace        # ~/workspace 指向 D:\git
```

Claude 不限制目录，在哪个目录启动就用哪个。`D:\git` 里名为 `nul` 的文件是 Windows 保留名，`ls` 会报 I/O 错误，可在 cmd 用 `del "\\?\D:\git\nul"` 删除。

## 尾注（原文）

依据本次会话中虚拟机上 ss / ps / systemctl / grep 的实际输出整理。作者的 SOCKS5 账号属于其付费服务，请使用你自己的代理。
