# 6.1 CNV 检测

<font face="微软雅黑" >&emsp;&emsp;生物的染色体结构是相对稳定的，但在自然或人为条件影响下，染色体结构可能发生变 异。染色体结构变异主要包括缺失(Deletion, DEL)，插入 (Insertion, INS)，倒位(Inversion, INV)，染色体内易位(intra-chromosomal translocation, ITX)，染色体间易位(Inter-chromosomal translocation, CTX)等。采用 BreakDancer（v1.1）（Chen et al., 2009）软件检测基因组中存在 的染色体结构变异，该软件检测染色体结构变异的原理是基于 Pair-end mapping，利用 pair end read 插入片段长度异常来进行检测。</font><br />