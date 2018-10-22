2018-10-22  
/* 
    1、用 loop（循环） 替换 if-else
    比如:大家可能会遇到类似下面的需求：比如某平台的信用分数评级，超过700-950，就是Lv5，650-700为Lv4，600-650为Lv3，550-600为Lv2，350-550为Lv1。
        用 ifElse的写法：略 （这个可配置性低，代码也比较冗余）

        正解： 灵活运用 some 这个 数组的 方法；
        function fun(match){
            let range = [700,650,600,550,350];
            let grade = ["lv5","lv4","lv3","lv2","lv1"];
            let result = "";
            range.some((v,i)=>{
                if(match >= v){
                    result = grade[i];
                    return ;
                }
            });
            return result
        }
*/