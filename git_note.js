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
 *            git branch -d 名称 //删除指定分支,分支删除但是对应的 commit 是不会被删除，相当于只是少了个工作分支而已，
 *                                  但是git在默认情况下，如果代码没有合并到 master，不允许用它 删除 用 git branch -D 名称
 *            删除远程 分支：
 *            git push origin --delete 名称 (用 -d 这个版本上没用)
 *
 *            在一个仓库删除了本地和远程分支后，在另一个工作目录里其实识别不到，查看的话用
 *            使用命令   git remote show origin   ，可以查看remote地址，远程分支，还有本地分支与之相对应关系等信息；
 *            用   git remote prune origin    更新 “远程”分支 信息，本地工作分支信息 需要手动删除
 */
/**
 * 2017/12/5
 * 1、merge合并分支
 *      git merge 分支名称
 *      当然合并过程中就会出现 修改同一个文件的同一个位置的时候，会产生 conflict（冲突），这里出现两种选择：
 *          1）还是要合并，去解决对应文件冲突，add 再 commit；（冲突是由于 git 不知道 你想用 哪一种方式，叫你自己选择）
 *          2）放弃这次 分支的合并 git merge --abort (这里要注意 如果 分支合并没有 conflict 这个 放弃合并是无效的)
 * 2、在第一次 clone的时候，只会 clone 默认的 master 分支的代码；如果想 拉取 其他分支的代码：
 *      git checkout -b 名称 origin/master
 * 3、git log 查看 commit 的记录
 *      查看详细历史,改动的代码和位置用： git log --patch ( git log -p)
 *
 * 摘录：
 * 1、查看历史中的多个 commit：log
     1、查看详细改动： git log -p
     2、查看大致改动：git log --stat
   2、查看具体某个 commit：show
     1、要看最新 commit ，直接输入 git show ；要看指定 commit ，输入 git show commit的引用或SHA-1
     2、如果还要指定文件，在 git show 的最后加上文件名
   3、查看未提交的内容：diff
     1、查看暂存区和上一条 commit 的区别：git diff --staged（或 --cached）
     2、查看工作目录和暂存区的区别：git diff 不加选项参数
     3、查看工作目录和上一条 commit 的区别：git diff HEAD...
 */