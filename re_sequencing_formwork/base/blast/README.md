# 2.2 比对分析

## 2.2.1 比对结果基本统计

<font face="微软雅黑" >&emsp;&emsp;使用 TopHat2的升级版HISAT2（http://ccb.jhu.edu/software/hisat2/index.shtml ) 软件将过滤后的 Reads 比对到参考基因组上。HISAT2使用改进的BWT算法（Sirén et al. 2014）具有更快的速度并且资源占用较少。 HISAT2比对时，对于非链特异性文库使用默认参数，链特异性文库需要指定文库类型（即first 使用 --rna-strandness RF，second 使用--rna-strandness FR）。若参考基因组选择合适，且相关实验不存在污染，测序序列的 Mapping 比例一般会高于70%。</font><br />
<font face="微软雅黑" >&emsp;&emsp;Mapping 比例较低时的原因可能是：</font><br />

- 参考基因组组装不好，或者所测物种与参考基因组的亲缘关系较远；
- 样品的特殊前处理或者相对于参考基因组此样品本身的变异太大，导致 Mapping Rate 相对较低。


<font face="微软雅黑" >&emsp;&emsp;比对结果为Bam文件。序列比对的基本信息统计：</font><br />

<center>表4 序列比对基本信息</center>

|  Sample  | Total pairs  |Total Mapped|Multiple Mapped|Uniquely Mapped|
| :--------: | :--------: | :--------: | :--------: | :--------: |
{{table}}

**注**：
- Sample：样品；
- Total pairs：用于比对的序列对总数；
- Total Mapped：比对上参考基因组的序列对/测序序列对总数；
- Multiple Mapped：比对到多个位置的序列对数目，百分比为比对到多个位置的序列对/比对序列对总数；
- Uniquely Mapped：只比对到一个位置的序列对数目，百分比为比对到一个位置的序列对/比对序列对总数。

{{table}}