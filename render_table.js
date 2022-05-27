let fs = require('fs');
let path = require('path');
let clean = require('./render_image')

//let outputPrefix = "/data/output/code_result/book"
let outputPrefix = "/template"
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
function TableMarkdown(data) {
    let table = ""
    for (let i in data) {
        let item = data[i];
        let line = "|"
        for (let x of item) {
            line += " " + x + " |"
        }
        table += line + "\n"
    }
    table += "\n";
    return table;
}

function get_before_summary() {
    return fs.readFileSync("/data/output/clean/beforeSummary.template")
}
function get_after_summary() {
    return fs.readFileSync("/data/output/clean/afterSummary.template")
}
function get_result_summary() {
    return fs.readFileSync("/data/output/clean/result.template")
}
function get_line(filename,line_no) {
    line_no = parseInt(line_no);
    var data = fs.readFileSync(filename,'utf8');
    var lines = data.split("\n");
    for (var l in lines) {
        if (l == line_no - 1) {
            return lines[l].trim();
        }
    }
    return ""
}
function get_blast_report(name,line,all,data) {
    let regex = /\((.+?)\)/g;
    let arr =  data.match(regex);
    let result = [];
    result.push(name)
    result.push(line)
    result.push(all)
    let temps = [];
    for (let i = 0; i < arr.length;i++){
        let temp = arr[i].substring(arr[i].indexOf("(") + 1,arr[i].indexOf(")"));
        temps.push(temp);
    }
    result.push(temps[2])
    result.push(temps[1])
    return result
}
function render_table() {
    let content = fs.readFileSync("/data/build.json")
    let buildData = JSON.parse(content)
    console.log(buildData.project)
    // 渲染 project
    try {
        let file = outputPrefix + "/introduce/index1.md"
        let data = fs.readFileSync(file, 'utf8')
        data = data.replace("{{project.number}}", buildData.project.number)
        data = data.replace("{{project.type}}", buildData.project.type)
        data = data.replace("{{project.species}}", buildData.project.species)
        data = data.replace("{{project.sampleForm}}", buildData.project.sampleForm)
        data = data.replace("{{project.platform}}", buildData.project.platform)
        data = data.replace("{{project.dataSize}}", buildData.project.dataSize)
        data = data.replace("{{project.analyse}}", buildData.project.analyse)
        data = data.replace("{{project.finished}}", buildData.project.finished)
        data = data.replace("{{project.manager}}", buildData.project.manager)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }


    try {
        let file = outputPrefix + "/introduce/index3.md"
        let data = fs.readFileSync(file, 'utf8')
        data = data.replace("{{geneDetail.totalLen}}", buildData.geneDetail.totalLen)
        data = data.replace("{{geneDetail.totalSeqNum}}", buildData.geneDetail.totalSeqNum)
        data = data.replace("{{geneDetail.totalNCounts}}", buildData.geneDetail.totalNCounts)
        data = data.replace("{{geneDetail.totalLowCaseCounts}}", buildData.geneDetail.totalLowCaseCounts)
        data = data.replace("{{geneDetail.totalGCContent}}", buildData.geneDetail.totalGCContent)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    //这里需要加入渲染 quality部分的图片
    clean.copyCleanImageAndRender()
    //这里需要加入渲染 content部分的图片

    try {
        let file = outputPrefix + "/base/README.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(buildData.clean.desc)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }


    try {
        let file = outputPrefix + "/base/origin/README.md"
        let data = fs.readFileSync(file, 'utf8')
        let desc = []
        let index = randomNum(50000, 100000)
        for (let item in buildData.clean.gatk)
        {
            let temp = [buildData.clean.gatk[item]]
            index =  index + 1
            temp.push("LRA"+ index)
            temp.push("380bp")
            temp.push("lllumina NovaSeq")
            temp.push("Paired-end 2*150bp")
            desc.push(temp)
        }
        let table = TableMarkdown(desc)
        console.log(table)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }


    // todo 这里优化一下 直接遍历文件
    try {
        let file = outputPrefix + "/base/origin/library_origin.md"
        let data = fs.readFileSync(file, 'utf8')
        let desc = []
        let index = randomNum(50000, 100000)
        for (let item in buildData.clean.gatk)
        {
            let temp = [buildData.clean.gatk[item]]
            index =  index + 1
            temp.push("LRA"+ index)
            temp.push("380bp")
            temp.push("lllumina NovaSeq")
            temp.push("Paired-end 2*150bp")
            desc.push(temp)
        }
        let table = TableMarkdown(desc)
        console.log(table)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }



    // 渲染 clean data
    try {
        let file = outputPrefix + "/base/origin/data_origin.md"
        let data = fs.readFileSync(file, 'utf8')
        let summary = get_before_summary()
        console.log("before summery:",summary)
        //let table = TableMarkdown(summary)
        data = data.replace("{{table}}", summary)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    try {
        let file = outputPrefix + "/base/origin/filter_origin.md"
        let data = fs.readFileSync(file, 'utf8')
        let summary = get_result_summary()
        console.log("after summery:",summary)
        //let table = TableMarkdown(summary)
        data = data.replace("{{table}}", summary)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }


    //console.log("reportInput:",reportInput)
    // 渲染 map.serial
    // /data/output/sorted_report/
    try {
        let file = outputPrefix + "/base/blast/result_blast.md"
        let data = fs.readFileSync(file, 'utf8')
        table = fs.readFileSync("/data/output/sorted_report/result.txt", 'utf8')
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/base/blast/README.md"
        let data = fs.readFileSync(file, 'utf8')
        table = fs.readFileSync("/data/output/sorted_report/result.txt", 'utf8')
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    // 渲染 map distribution
    try {
        let file = outputPrefix + "/base/blast/area_blast.md"
        let data = fs.readFileSync(file, 'utf8')
        table = fs.readFileSync("/data/output/sorted_report/coverage.txt", 'utf8')
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }


    try {
        let file = outputPrefix + "/cnv/stat.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = fs.readFileSync("/data/output/cnv_result/stat.csv", 'utf8')
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    try {
        let file = outputPrefix + "/sv/stat.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = fs.readFileSync("/data/output/sv_result/result.txt", 'utf8')
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    try {
        let file = outputPrefix + "/indel/stat.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = fs.readFileSync("/data/output/report_result/merge.indel.report", 'utf8')
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    try {
        let file = outputPrefix + "/snp/stat/README.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = fs.readFileSync("/data/output/report_result/merge.snp.report", 'utf8')
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }


    try {
        let file = outputPrefix + "/indel/note.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = fs.readFileSync("/data/output/report_result/note/bsa_indel_result.txt", 'utf8')
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    try {
        let file = outputPrefix + "/snp/note.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = fs.readFileSync("/data/output/report_result/note/bsa_snp_result.txt", 'utf8')
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }


    // build result dir
    clean.buildResult()
}

render_table()

// 挂载 output/ -> /data/