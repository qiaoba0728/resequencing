# 1.3 参考基因组


<p>&emsp;&emsp;下载参考基因组序列。参考基因组的统计结果如表1。</p>

<center><b>表1 参考基因组</b></center>
<style>
table th:first-of-type {
    width: 30%;
}
table th:nth-of-type(2) {
    width: 70%;
}
</style>

| 类别 | 数目 |
| :---: | :---: |
| Total_Len | {{geneDetail.totalLen}} |
| Total_Seq_Num | {{geneDetail.totalSeqNum}} |
| Total_N_Counts | {{geneDetail.totalNCounts}} |
| Total_LowCase_Counts | {{geneDetail.totalLowCaseCounts}} |
| Total_GC_content | {{geneDetail.totalGCContent}} |

- Total_Len: 基因组长度
- Total_Seq_Num: 基因组染色体数
- Total_N_Counts: 未测通的碱基数
- Total_LowCase_Counts: 重复序列的标志
- Total_GC_content: GC含量
