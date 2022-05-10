#!/bin/sh
echo "start build docs"

if [ ! -f "/data/build.json" ]; then
echo "file '/data/build.json don't' exists, exit"
exit 1
fi


cd /template

node render_table.js

gitbook build

# 替换 url 为 $1/index.html
grep -P "<a href=\"(.+?)/\">" -rl ./_book | xargs sed -i 's/<a href\(.*\)\/"/<a href\1\/index.html"/g'
# 逆向操作
#grep -P "<a href=\"(.+?)/index.html\"" -rl ./_book | xargs sed -i 's/<a href\(.*\)\/index.html"/<a href\1\/"/g'

# 去除powered by gitbook
grep "all right reserved&#xFF0C;powered by Gitbook" -rl ./_book | xargs sed -i 's/all right reserved&#xFF0C;powered by Gitbook//g'


# 去除Introduction
grep "Introduction" -rl ./_book | xargs sed -i 's/Introduction/项目结题报告/g'

# 去除时间
grep -P "[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}" -rl ./_book | xargs sed -i 's/[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\} [0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}//g'

# 替换 if(m)
sed -i 's/if(m)/if(false)/g' _book/gitbook/theme.js

# 替换箭头点击跳转链接
# grep  "<a href=\"./index.html\" class" -rl ./_book | xargs sed -i 's/<a href=".\/index.html" class/<a href=".\/2\/index.html" class/g'

# 单独处理首页的箭头url
sed -i 's/<a href=".\/2\/index.html"/<a href=".\/1\/2\/index.html"/g' _book/index.html

gitbook pdf . 

if [ "$?" = "0" ]; then
   echo "gitbook pdf build success!"
else
   echo "gitbook pdf build fail!"
fi



if [ -d "/data/output/code_result" ];then
rm -rf /data/output/code_result
fi

mkdir -p /data/output/code_result/book

cp -rf /template/* /data/output/code_result/book/


if [ -d "/data/output/docs_result" ];then
rm -rf /data/output/docs_result
fi

mkdir /data/output/docs_result

cp -rf /data/output/code_result/book/_book/* /data/output/docs_result/

cp -rf /data/output/code_result/book/book.pdf /data/output/docs_result/

cd /data/output/docs_result/

# ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓删除多余文件↓↓↓↓↓↓↓↓↓↓↓↓↓↓
rm Dockerfile render_table.js render_image.js


   # 生成result文件夹
mkdir -p /data/output/docs_result/result
mkdir -p /data/output/docs_result/result/origin
cp -r /data/output/clean/*.html /data/output/docs_result/result/origin
cp -r /data/output/clean/*.csv /data/output/docs_result/result/origin
cp -r /template/base/asset/* /data/output/docs_result/result/origin

mkdir -p /data/output/docs_result/result/blast
cp -r /data/output/report_result/*.geneBodyCoverage.* /data/output/docs_result/result/blast
cp -r /data/output/report_result/*.report /data/output/docs_result/result/blast
cp -r /data/output/report_result/*_read_distribution_plot.png /data/output/docs_result/result/blast
cp -r /data/output/report_result/*_read_distribution_plot.txt /data/output/docs_result/result/blast

mkdir -p /data/output/docs_result/result/count 
cp -r /data/output/report_result/*_freq_count.png /data/output/docs_result/result/count
cp -r /data/output/report_result/fpkm* /data/output/docs_result/result/count
cp -r /data/output/report_result/heatmap_count* /data/output/docs_result/result/count
cp -r /data/output/report_result/pca_count* /data/output/docs_result/result/count
cp -r /data/output/report_result/*.saturation.pdf /data/output/docs_result/result/count
cp -r /data/output/report_result/*.saturation.png /data/output/docs_result/result/count

mkdir -p /data/output/docs_result/result/diff

cp -r /data/output/report_result/cluster.png /data/output/docs_result/result/diff
cp -r /data/output/report_result/cluster.pdf /data/output/docs_result/result/diff
cp -r /data/output/report_result/mfuzz.png /data/output/docs_result/result/diff
cp -r /data/output/report_result/mfuzz.pdf /data/output/docs_result/result/diff
cp -r /data/output/report_result/all_down_up.png /data/output/docs_result/result/diff
cp -r /data/output/report_result/all_down_up.pdf /data/output/docs_result/result/diff
# cp -r /data/output/diff/*_down_up.* /data/output/docs_result/result/diff
# cp -r /data/output/diff/veen* /data/output/docs_result/result/diff
cp -r /data/output/diff/diffexpr-* /data/output/docs_result/result/diff
cp -r /data/output/diff/*_top10.pdf /data/output/docs_result/result/diff
cp -r /data/output/diff/*_top10.png /data/output/docs_result/result/diff
cp -r /data/output/diff/*_MAplot.png /data/output/docs_result/result/diff
cp -r /data/output/diff/*_MAplot.pdf /data/output/docs_result/result/diff
cp -r /data/output/diff/*_PCA.png /data/output/docs_result/result/diff
cp -r /data/output/diff/*_PCA.pdf /data/output/docs_result/result/diff
cp -r /data/output/diff/*_volcano.png /data/output/docs_result/result/diff
cp -r /data/output/diff/*_volcano.pdf /data/output/docs_result/result/diff
cp -r /data/output/diff/*_volcano.png /data/output/docs_result/result/diff
cp -r /data/output/diff/*_volcano.pdf /data/output/docs_result/result/diff

cp -r /data/output/diff/*_go_enrich_q_0.05.png /data/output/docs_result/result/diff
cp -r /data/output/diff/*_go_enrich_q_0.05.pdf /data/output/docs_result/result/diff


mkdir -p /data/output/docs_result/result/struct
cp -r /data/output/report_result/build_stat.png /data/output/docs_result/result/struct


cd /data/output
tar -czf docs.tar.gz docs_result


echo "build docs success!!"
