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
 *            用   git remote prune origin    更新删除“远程”分支 信息，本地工作分支信息 需要手动删除
 *            git fetch origin  //从远程仓库更新信息
 */
/**
 * 2017/12/5
 * 1、merge合并分支
 *      git merge 分支名称
 *      当然合并过程中就会出现 修改同一个文件的同一个位置的时候，会产生 conflict（冲突），这里出现两种选择：
 *          1）还是要合并，去解决对应文件冲突，add 再 commit；（冲突是由于 git 不知道 ，你想用 哪一种方式叫你自己选择）
 *          2）放弃这次 分支的合并 git merge --abort (这里要注意 如果 分支合并没有 conflict 这个 放弃合并是无效的)
 * 2、在第一次 clone的时候，只会 clone 默认的 master 分支的代码；如果想 拉取 其他分支的代码：
 *      git checkout -b 名称 origin/名称
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
/**
 * 2017/12/6
 * 1、对于rebase的理解： 就是指 可以 基于当前 的参照物，把当前分支 提交的 commit 以 参照物为 基点，依次在 提交 一遍
 *  git rebase 参照点(参照分支的 head指向的 commit)
 *这里的图解解释很清楚：https://juejin.im/book/5a124b29f265da431d3c472e/section/5a1422a4f265da432b4a73cf
 *
 * git merge test
 * 等价于
 * 1）git checkout test
 * 2）git rebase master （可以这样理解：把 test 分支 的 基础点 放到了 master 的 head（最新 commit）引用的 commit 上）
 * 3）git checkout master
 * 4）git merge test
 *2、对于 amend：就是修改的意思，在 commit 的时候 会 替换掉当前 最新的 commit 的记录，不会生成新的
 *  git commit --amend  (这个是 修改最新的提交)
 */
/**
 * 2017/12/7
 * 两个偏移字符：
 *^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。例如：master^ 表示 master 指向的 commit 之前的那个 commit；
 *  HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。
 *
 *~~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。例如：HEAD~5 表示 HEAD 指向的 commit往前数 5 个 commit。
 *
 * ???????????????????????????????????对于 rebase 的 运用，还有问题??????????????????????????????????????????
 *
 * git rebase commit某一个
 *  一般的 rebase，告诉 Git 的是「我要把当前 commit 以及它之前的 commits 重新提交到目标 commit 上去，这其中，
 *  rebase 的「起点」是自动判定的：选取当前 commit 和目标 commit 在历史上的交叉点作为起点。但是 在用 --onto 可以指定 作用目标，提交起始点（不包含），提交终点
 *
 *
 * 1、reset：就是 撤销 到 指定的 commit，撤销指定前面的 所有 commit （但是要注意 就是 push 到 远程仓库的，如果执行，由于 会比对 对应的commit，导致 撤销后不能 push，push后的 代码 就不能用这个命令了）
 * git reset --hard 指定的commit (如 head^ 撤销最新的)
 *
 * 2、如果是想撤销 除了 最新 ，前面的 某一个 commit，直接 丢弃，有两种方法：
 *      方法一：用 rebase的 交互式 git rebase -i head^^  （就是 从当前 最新提交 往回走两次,原理是显示从往回位置 后的所有 提交内容，我在编辑页面 删除需要删除的页面）
 *      方法二：用 git rebase --onto 目标基点 起始点（不包含） 终点 （git rebase --onto HEAD^^ HEAD^ branch1）
 *
 */