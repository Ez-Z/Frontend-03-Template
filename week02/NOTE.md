学习笔记

部分笔记见图片

## 有限状态机
- 每个状态都是一个机器
    - 在每个机器里，我们可以计算、存储、输出……
    - 所有的机器接收的输入是一致的
    - 状态机的每个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数。（无副作用）
- 每个机器自动下一个状态
    - 每个机器都有确定的下一个状态（Moore）
    - 每个机器根据输入决定下一个状态（Mealy）

## JS中的有限状态机（Mealy）
```
// 每个函数是一个状态机
function state() {
    // 在函数中，可以自由地编写代码，处理每个状态的逻辑
    return next;
}

// 调用

while(input) {
    // 获取输入
    state = state(input)
}

```

```javascript
// kmp 算法的JavaScript实现;算法复杂度O(n+m)
 function getNext(p) {
    const next = [-1];
    let k = -1;
    let j = 0;
    let pLen=p.length;
 
    while (j < pLen-1) {
        // p[k]表示前缀，p[j]表示后缀
        if (k == -1 || p[j] == p[k])
        {
            ++j;
            ++k;
            // 较之前next数组求法，改动在下面4行
            if (p[j] != p[k])
                next[j] = k;   //之前只有这一行
            else
            // 因为不能出现p[j] = p[ next[j ]]，所以当出现时需要继续递归，k = next[k] = next[next[k]]
                next[j] = next[k];
        }
        else
        {
            k = next[k];
        }
    }
 
    return next;
 
}
 
function KmpSearch(s, p) {
    let i = 0;
    let j = 0;
 
    const sLen = s.length;
    const pLen = p.length;
 
    const next = getNext(p);
 
    while (i < sLen && j < pLen) {
        // ①如果j = -1，或者当前字符匹配成功（即S[i] == P[j]），都令i++，j++
        if (j === -1 || s[i] === p[j]) {
            i++;
            j++;
        } else {
            // ②如果j != -1，且当前字符匹配失败（即S[i] != P[j]），则令 i 不变，j = next[j]
            // next[j]即为j所对应的next值
            j = next[j];
        }
    }
 
    return j === pLen ? i - j : -1;
}

console.log(KmpSearch('asdfasdfsadf','sdfsd'))
```

