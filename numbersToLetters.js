/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */

define(['N/currentRecord'], function (currentRecord) {

  function numberToWords(num) {
    var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var scales = ['hundred', 'thousand', 'million', 'billion', 'trillion'];
  
    var words = [];
    var numString = num.toString();
  
    // Pad the number with leading zeros if necessary
    while (numString.length < 3) {
      numString = '0' + numString;
    }
  
    // Process hundreds
    if (numString.substr(0, 1) !== '0') {
      words.push(ones[numString.substr(0, 1)]);
      words.push(scales[0]);
    }
  
    // Process tens and ones
    var tensNum = numString.substr(1);
    if (tensNum !== '00') {
      if (tensNum < 10) {
        words.push(ones[tensNum]);
      } else if (tensNum < 20) {
        words.push(teens[tensNum - 10]);
      } else {
        words.push(tens[tensNum.substr(0, 1)]);
        words.push(ones[tensNum.substr(1, 1)]);
      }
    }
  
    // Return the words as a string
    return words.join(' ');
  }
  
    function pageInit(context) {
      var currentRec = context.currentRecord;
      
      if (context.fieldId === 'usertotal') {
        // Get the value of the number field
        var numberValue = currentRec.getValue({
          fieldId: 'usertotal'
        });
        
        log.debug({
            title: "numberValue ",
            details: numberValue
         });
        // Convert the number to words
        var wordsValue = numberToWords(numberValue);
        log.debug({
          title: "wordsValue ",
          details: wordsValue
       });
        
        // Set the value of the words field
        currentRec.setValue({
          fieldId: 'custbody3',
          value: wordsValue
        });
      }
    }
  
    return {
      pageInit: pageInit
    };
  });
  