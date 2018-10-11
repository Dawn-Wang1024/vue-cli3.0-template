const Client = require('ssh2-sftp-client');
const ora = require('ora');
const path = require('path');
const glob = require('glob');
const sftp = new Client();

// 本地目录
const localPath = path.join(__dirname, '../dist').replace(/\\/g, '/');
// 远程目录
const remotePath = '';
// 允许上传的文件扩展名
const allowFiles = ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'eot', 'svg', 'ttf', 'woff'];

const spinner = ora('开始上传...').start();

// 连接 sftp
sftp.connect({
    host: '',   // 测试服务器ip
    port: '22', // 端口 默认22
    username: '',   // 权限账号
    password: ''    // 密码
}).then(() => {
    /**
     * 先删除目录
     * ！注意：首次上传如服务器没有该文件夹会上传失败
     * 解决方法：首次不执行删除或首次手动ftp上传
     */
    return sftp.rmdir(`${remotePath}/static`, true);
}).then(() => {
    // 再创建目录
    return Promise.all([
        // 自行参考打包目录修改
        sftp.mkdir(`${remotePath}/static/img`, true),
        sftp.mkdir(`${remotePath}/static/css`, true),
        sftp.mkdir(`${remotePath}/static/js`, true)
    ]);
}).then(() => {
    // 上传所有匹配到的文件
    const files = glob.sync(`${localPath}/**/*.{${allowFiles.join(',')}}`);
    return Promise.all(
        files.map(localFile => {
            const remoteFile = localFile.replace(localPath, remotePath);
            return sftp.put(localFile, remoteFile);
        })
    );
}).then(() => {
    spinner.succeed('上传完成');
    process.exit();
}).catch(err => {
    spinner.fail('上传失败');
    process.exit();
})
