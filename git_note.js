/**
 * 2017/12/4
 *
 * 对于git中 head，branch，master的理解
 * 1、head是引用对于 commit 的一种指向，并且在一个 git 仓库中 是唯一的，永远会指向 当前 工作目录中最新的 commit；或者指向 当前 工作 的 branch 间接
 *  也指向 最新的 commit
 *                   head
 *                     |
 *                  master
 *                     |
 *          commit-commit
 * 2、branch 是分支 也是一种 引用方式
 *     命令： git branch 名称  //创建分支但是没有指向
 *            git checkout 名称 //指向对应的分支
 *            git checkout -b 名称  //创建并且指向当前分支
 *            git branch -d 名称 //删除指定分支，但是git在默认情况下，如果代码没有合并到 master，不允许用它 删除 用 git branch -D 名称
 */