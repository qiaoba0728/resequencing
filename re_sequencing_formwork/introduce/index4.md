# 1.4 有参转录组分析流程

<font face="微软雅黑" >&emsp;&emsp;首先对原始下机数据（Raw Data）进行过滤，将过滤后得到的高质量序列(Clean Data)比对到该物种的参考基因组上。</font><br />

<font face="微软雅黑" >&emsp;&emsp;根据比对结果，计算每个基因的表达量。在此基础上，进一步对样品进行表达差异分析、富集分析和聚类分析。对比对上的 Reads 进行拼接，还原出转录本序列。</font><br />

<div align=center><img src="../images/flow.png"/></div>
<center>图2 数据分析流程</center>