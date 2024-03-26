const unitDict = {
    'in': '英寸',
    'cm': '厘米',
}

function getSelectedOption() {
    var selectElement = document.getElementById("toUnit");
    var selectedIndex = selectElement.selectedIndex;
    var selectedOption = selectElement.options[selectedIndex];
    var selectedOptionText = selectedOption.text; // 或者 selectedOption.textContent
    return selectedOptionText;
}


function convertUnits() {
    var inputText = document.getElementById("inputText").value;
    var fromUnit = document.getElementById("fromUnit").value;
    var toUnit = document.getElementById("toUnit").value;

    
    if (unitDict[fromUnit]) {
        inputText = inputText.replaceAll(unitDict[fromUnit], fromUnit)
    }
    
    // 定义正则表达式，匹配单位值
    var regex = new RegExp("(\\d+(\\.\\d+)?)(\\s+)?" + fromUnit + "\\b", "gi");
    // var regex = /(\d+(\.\d+)?)\s*(inches|inch|in|centimeters|cm)\b/gi;
    console.log(regex)
    
    console.log(inputText.match(regex))
    // 替换匹配的单位值
    var result = inputText.replace(regex, function(match, p1, p2, p3) {
        var value = parseFloat(p1);
        console.log(value)
        // 进行单位转换
        var convertedValue = 0;
        if (fromUnit === "in" && toUnit === "cm") {
            convertedValue = value * 2.54;
        } else if (fromUnit === "cm" && toUnit === "in") {
            convertedValue = value / 2.54;
        } else {
            // 添加其他单位的转换逻辑
            // 如果没有匹配的单位，则返回原值
            convertedValue = value;
        }
        // 返回转换后的值
        return convertedValue.toFixed(2) + `${p3 ? p3 : ''}` + getSelectedOption();
    });
    
    // 显示转换结果
    document.getElementById("outputText").value = result;
}


function highlightMatches() {
    var inputText = document.getElementById("inputText").value;
    var fromUnit = document.getElementById("fromUnit").value;
    var toUnit = document.getElementById("toUnit").value;

    var regex = new RegExp("(\\d+(\\.\\d+)?)\\s*" + fromUnit + "\\b", "gi");

    var highlightedText = inputText.replace(regex, function(match) {
        return '<span style="background-color: yellow;">' + match + '</span>';
    });

    document.getElementById("inputText").innerHTML = highlightedText;
}