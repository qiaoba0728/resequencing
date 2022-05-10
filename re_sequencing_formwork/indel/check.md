# 4.1 InDel 检测

<font face="微软雅黑" >&emsp;&emsp;InDel 是小型的插入（Insertion）和缺失（Deletion）的总称。我们采用 GenomeAnalysisTK v4.0 来鉴定 InDel 突变信息。为了保证 InDel 结果的可靠性，进一步对 InDel 位点进行过滤， 过滤标准如下：</font><br />

- Fisher Test of Strand Bias(FS)≤200；
- Quality Depth (QD)≥2；
- ReadPosRankSum ≥ -20