# dockerhub.qingcloud.com/zqzoffice/bsa:code     
```
docker run  -v /path/to/bsa/:/data/ dockerhub.qingcloud.com/zqzoffice/bsa:code 
```
运行上面的命令会在 /path/to/bsa/output/code_result/book 生成gitbook源码，并将相关图片复制进去

# dockerhub.qingcloud.com/zqzoffice/bsa:code     
先将 bsa.json 放至 /data/output/code_result/book/bsa.json 
运行下面的命令，会在 /path/to/bsa/output/docs_result/ 生成渲染好的html文件
```
docker run  -v /path/to/bsa/:/data/ dockerhub.qingcloud.com/zqzoffice/bsa:docs 
```