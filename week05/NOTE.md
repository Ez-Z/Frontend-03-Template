学习笔记

部分笔记见xmind

为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？（提交至 GitHub）
first-line 本身表示第一行，不代表某个元素，或者某个块，float又代表了某个元素在行内的表现形式，line是行，行本身就没有float的必要。
first-letter表示第一个字符，它相当于一个行内元素，自然可以使用float。