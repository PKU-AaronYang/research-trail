# GitHub 网页版更新到 v4.0

## 已有网站：按这 6 步更新

1. 在原网站“更多 → 备份与恢复”导出全部项目 JSON，保存到电脑。不要把私人备份上传仓库。
2. 解压 `research-trail-v4-github.zip`。应直接看到 `index.html` 等文件。
3. 打开原仓库的发布目录 → **Add file → Upload files**。上传解压后的所有文件，覆盖同名文件，提交到原发布分支。上传文件本身，不上传 ZIP，也不再套文件夹。
4. 在 GitHub 删除旧的 **`workflow-v2.js`** 和 **`UPDATE-v2.md`**：分别打开文件，通过文件菜单选择 Delete file，再提交。新版已不引用这两个文件。不要删除其他项目资料。
5. 等待仓库 **Actions** 中本次 Pages 部署成功。原网站正常、发布分支/目录未改时，**不必重新设置 Pages**。
6. 打开原网址，按 **Ctrl+F5**（Mac：Command+Shift+R）。确认显示 **v4.0 · 做当前这一步**，首页项目仍在。

本包共 13 个文件：

`index.html`、`styles.css`、`app.js`、`stages.js`、`prompts.js`、`prompt-engine.js`、`state.js`、`translations.js`、`favicon.svg`、`.nojekyll`、`README.md`、`CHANGELOG.md`、`DEPLOY.md`。

## .nojekyll 无法上传

仓库发布目录已经有 `.nojekyll` 时，保留即可，内容不影响功能。没有时：**Add file → Create new file**，文件名准确填写 `.nojekyll`，内容写 `Static site; bypass Jekyll.`，提交。不要写成 `.nojekyll.txt`。本包中的该文件非空，便于上传。

## 第一次部署

创建公开仓库并上传上述文件。在 **Settings → Pages** 选择 **Deploy from a branch → main → / (root)**，保存并等待部署。若你原本使用 `/docs` 发布，则整包放入 `/docs`，继续使用该目录。

发布目录和入口文件应对应，参见 [GitHub 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)；发布分支设置见 [官方配置说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 更新后仍是旧版

先确认本次部署成功，再确认 `index.html` 与全部 JS/CSS 都覆盖在同一个发布目录；最后强制刷新。不要为刷新界面清理 localStorage，否则会清掉本地项目。
