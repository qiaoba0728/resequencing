# 5.1 CNV 检测

<font face="微软雅黑" >&emsp;&emsp;拷贝数变异（Copy Number Variation，CNV）是一种复杂的现象，一般是由基因组发生 重排导致的，一般指长度为 1 kb 以上的基因组大片段的拷贝数增加或者减少。采用 CNVnator （version 0.2.7）（Abyzov A, et al. 2011）来检测全基因组中存在的 CNV，其中 bin_size 设置 为 100，同时对 CNVnator 获得的结果进行筛选，将基因组中多拷贝区域去除，同时设置 Read Depth 值(将染色体正常区域的的 Read Depth 定义为 1)，保留 RD 值<=0.05 或>=1.8 的区域。</font><br />