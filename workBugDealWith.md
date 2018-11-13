2018/11/12
1、在 做 antd的 树结构的时候，对于 dropdown 和 menu 组合其中的时候，发现一个问题：
    就是在 一个 滚动元素中 运用 absolute 这种 脱离 文本流定位 的 bug；

    I、当在  滚动元素上  有  relative 或者 absolute(这里在x、y上都 对应边设置 hidden 和 scroll) 的时候，里面 不管是不是 直接父级，加上 absolute，当 超出 滚动元素的 范围 就会被 隐藏；
    II、当 滚动元素没有，只要是 设置了 absolute 的 父级元素有 relative 都会隐藏在 滚动元素 中，超出部分不会显示

    .情况I1{
        position:relative;
    }
    .情况II2{
        position:absolute;
        overflow-x:hidden;
    }

    .情况II{
        position:relative;
    }
    <div style="width:100px;height:200px;border:1px solid #ddd;overflow-y:scroll;">
        <div>
            <div>
                <div style="width:40px;height:40px;position:absolute;left:50px;background-color:#ff0;"></div>
            </div>
        </div>
    </div>
    就是一定要 注意 absolute 对应的 祖先级 的 范围，有relative的就看relative，没有就按照 body来，一层一层的 确定 目标元素 的 显示范围