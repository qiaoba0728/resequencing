let fs = require('fs');
let path = require('path');

let outputPrefix = "/template"

//all action
function copyCleanImageAndRender() {
    let filePath = "/data/output/clean_result"
    console.log("copy clean images")
    let qualityNames = [];
    let contentNames = [];
    let readsNames = [];
    console.log(filePath)
    let files = fs.readdirSync(filePath)
    console.log(files)
    files.forEach(filename => {
        console.log(filePath,filename)
        let cleanPath = path.join(filePath, filename);
        let stat = fs.statSync(cleanPath);
        if (stat.isDirectory() && filename.endsWith(".clean_fastqc")) {
            fileCleanPath = path.join(cleanPath,"Images")
            let resultFiles = fs.readdirSync(fileCleanPath);
            resultFiles.forEach(resultFileName => {
                let prefixName = filename.replace(".clean_fastqc", "");
                let filedir = path.join(fileCleanPath, resultFileName);
                if (resultFileName == "per_base_quality.png") {
                    let name = prefixName + "_"+resultFileName;
                    qualityNames.push(prefixName);
                    // base asset
                    fs.writeFileSync(outputPrefix + "/base/asset/" + name, fs.readFileSync(filedir));
                }
                if (resultFileName == "per_base_sequence_content.png") {
                    let name = prefixName + "_"+resultFileName;
                    contentNames.push(prefixName);
                    fs.writeFileSync(outputPrefix + "/base/asset/" + name, fs.readFileSync(filedir));
                }
                if (resultFileName == "per_sequence_quality.png") {
                    let name = prefixName + "_"+resultFileName;
                    readsNames.push(prefixName);
                    fs.writeFileSync(outputPrefix + "/base/asset/" + name, fs.readFileSync(filedir));
                }
            })
        }
    });

    console.log(qualityNames)
    console.log(contentNames)
    console.log(readsNames)
    renderImageDetail(qualityNames,outputPrefix + "/base/origin/quality_origin.md","_per_base_quality.png","{{quality}}")
    renderImageDetail(contentNames,outputPrefix + "/base/origin/content_origin.md","_per_base_sequence_content.png","{{content}}")
    renderImageDetail(readsNames,outputPrefix + "/base/origin/reads_origin.md","_per_sequence_quality.png","{{reads}}")

    filePath = "/data/output/report_result"
    files = fs.readdirSync(filePath);
    snpNames = [];
    indelNames = [];
    files.forEach(filename => {
        let filedir = path.join(filePath, filename);
        if (filename.endsWith("-snps.png")) {
            let name = filename.replace("-snps.png", "");
            snpNames.push(name);
            fs.writeFileSync(outputPrefix + "/snp/asset/" + filename, fs.readFileSync(filedir));
        }
        if (filename.endsWith("-indel.png")) {
            let name = filename.replace("-indel.png", "");
            indelNames.push(name);
            fs.writeFileSync(outputPrefix + "/indel/asset/" + filename, fs.readFileSync(filedir));
        }
    })
    renderImageDetail(snpNames,outputPrefix + "/snp/stat/analyse.md","-snps.png","{{detail}}")
    renderImageDetailEx(indelNames,outputPrefix + "/indel/stat.md","-indel.png","{{detail}}")

    // names = [];
    // files.forEach(filename => {
    //     let filedir = path.join(filePath, filename);
    //     if (filename.endsWith(".geneBodyCoverage.curves.png")) {
    //         let name = filename.replace(".geneBodyCoverage.curves.png", "");
    //         if (name != "all") {
    //             names.push(name);
    //         }
    //         // 2.2 比对区域分布统计
    //         fs.writeFileSync(outputPrefix + "/base/asset/" + filename, fs.readFileSync(filedir));
    //     }
    // })
    // try{
    //     fs.writeFileSync(outputPrefix + "/base/asset/all.geneBodyCoverage.curves.png" , fs.readFileSync(filePath + "/all.geneBodyCoverage.curves.png"));
    // } catch (err) {
    //     console.error(err)
    // }
    // renderImageDetail(names,outputPrefix + "/base/blast/cover_blast.md",".geneBodyCoverage.curves.png","{{details}}")
    names = [];

}




function renderResultDetail(file,files,renderTemplate) {
    try {
        let data = fs.readFileSync(file, 'utf8');
        let detail = "";
        files.forEach(function(v,i,a){
            detail += `${v}<br />`
        })
        result = `<details><summary><b><u>结果文件</u></b></summary>${detail}</details>`
        console.log(result)
        data = data.replace(renderTemplate, result)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
}
function buildResult() {
    let qualityFiles = []
    let contentFiles = []
    let readFiles = []
    let readBlast = []
    let reportBlast = []
    let coverageBlast = []
    let filePath = "/data/output/report_result"
    let files = fs.readdirSync(filePath);
    files.forEach(filename => {
        if (filename.endsWith("_read_distribution_plot.txt") || filename.endsWith("_read_distribution_plot.png")){
            let name = "./result/blast/" + filename
            readBlast.push(name)
        }
        if (filename.endsWith(".report")) {
            let name = "./result/blast/" + filename
            reportBlast.push(name)
        }
        if (filename.includes("geneBodyCoverage")) {
            let name = "./result/blast/" + filename
            coverageBlast.push(name)
        }
    })

    renderResultDetail(outputPrefix + "/base/blast/result_blast.md",reportBlast,"{{result}}")
    renderResultDetail(outputPrefix + "/base/blast/cover_blast.md",coverageBlast,"{{result}}")
    renderResultDetail(outputPrefix + "/base/blast/area_blast.md",readBlast,"{{result}}")

    filePath = "/template/base/asset"
    files = fs.readdirSync(filePath);
    files.forEach(filename => {
        if (filename.endsWith("per_base_quality.png")){
            let name = "./result/origin/" + filename
            qualityFiles.push(name)
        }
        if (filename.endsWith("per_base_sequence_content.png")){
            let name = "./result/origin/" + filename
            contentFiles.push(name)
        }
        if (filename.endsWith("per_sequence_quality.png")){
            let name = "./result/origin/" + filename
            readFiles.push(name)
        }
    })
    renderResultDetail(outputPrefix + "/base/origin/quality_origin.md",qualityFiles,"{{result}}")
    renderResultDetail(outputPrefix + "/base/origin/content_origin.md",contentFiles,"{{result}}")
    renderResultDetail(outputPrefix + "/base/origin/reads_origin.md",contentFiles,"{{result}}")
}

function renderImageDetail(names,file,lastIndex,renderTemplate) {
    console.log("render details:", names,lastIndex,renderTemplate)
    try {
        //let file = outputPrefix + "/base/blast/area_blast.md"
        let data = fs.readFileSync(file, 'utf8');
        let detail = "";
        // for (let name of names) {
        //     detail += `<details open><summary>${name}</summary><center><img src='../asset/${name}${lastIndex}'></center></details>\n`
        // }
        names.forEach(function(v,i,a){
            if (i == 0){
                detail += `<details open><summary>${v}</summary><center><img src='../asset/${v}${lastIndex}'></center></details>\n`
            }else {
                detail += `<details><summary>${v}</summary><center><img src='../asset/${v}${lastIndex}'></center></details>\n`
            }
        })
        data = data.replace(renderTemplate, detail)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
}
function renderImageDetailEx(names,file,lastIndex,renderTemplate) {
    console.log("render details:", names,lastIndex,renderTemplate)
    try {
        //let file = outputPrefix + "/base/blast/area_blast.md"
        let data = fs.readFileSync(file, 'utf8');
        let detail = "";
        // for (let name of names) {
        //     detail += `<details open><summary>${name}</summary><center><img src='../asset/${name}${lastIndex}'></center></details>\n`
        // }
        names.forEach(function(v,i,a){
            if (i == 0){
                detail += `<details open><summary>${v}</summary><center><img src='./asset/${v}${lastIndex}'></center></details>\n`
            }else {
                detail += `<details><summary>${v}</summary><center><img src='./asset/${v}${lastIndex}'></center></details>\n`
            }
        })
        data = data.replace(renderTemplate, detail)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
}
module.exports = {
    copyCleanImageAndRender,
    buildResult
}
//copyImage("/data/output/report_result")
//暂时注释
//copyDiff("/data/output/diff")
// 挂载 output/ -> /data/output/

