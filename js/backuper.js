'use strict';

/***
 This class handles the activity regarding
 the messages exports to the SD memory card

 Refer to:
 https://developer.mozilla.org/en-US/docs/Web/API/MozSmsManager -- windows.navigator.MozSmsManager
 https://developer.mozilla.org/en-US/docs/Web/API/MozMobileMessageManager -- window.navigator.mozMobileMessage 
 https://developer.mozilla.org/en-US/docs/Web/API/MozSmsMessage

 **/

function MessagesBackupRestoreApp() {

  //-------------------------------------------------------------------------------------
  // OBJET INITIALISATION
  //-------------------------------------------------------------------------------------
  alert('toto');
  var global = this;
  var messages = [];

  var backupSMSButton = document.getElementById("backupSMS");
  backupSMSButton.addEventListener('click', function onMessagesBackupHandler() {
      window.setTimeout(global.BackupMessages, 0);
  });

  var restoreSMSButton = document.getElementById("restoreSMS");
  restoreSMSButton.addEventListener('click', function onMessagesRestoreHandler() {
      window.setTimeout(global.RestoreMessages, 0);
  });

  

  //-------------------------------------------------------------------------------------
  // BACKUP MESSAGES
  //-------------------------------------------------------------------------------------

  /**
   * Backup messages
   */ 
  this.BackupMessages = function() {

    alert('Starting BackupMessages!');

    // Get message manager
     var smsManager = window.navigator.mozSms || window.navigator.mozMobileMessage;

    // Get read messages
    var request = smsManager.getMessages(null, false);


    // Process messages
    var foundSmsCount = 0;
    request.onsuccess = function() {
      // Get cursor
      var domCursor = request;
      if (!domCursor.result) {
        console.log('End of message');
        global.ExportMessages(foundSmsCount);
        return;
      }

      console.warn('domCursor=' + domCursor);

      var xmlMessage = global.BuildXMLMessage(domCursor.result);
      messages.push(xmlMessage);
      foundSmsCount++;
      
      // Now get next message in the list
      domCursor.continue();
    };

    // Ctach error(s)
    request.onerror = function() {
      alert("Received 'onerror' smsrequest event.");
      alert("sms.getMessages error: " + request.error.name);
    };
    

  };

  /**
   * Build message xml string
   */
  this.BuildXMLMessage = function(message) {
    var xml = '<message>\n';
    xml += '\t<type>' + message.type + '</type>\n';
    xml += '\t<id>' + message.id + '</id>\n';
    xml += '\t<threadId >' + message.threadId + '</threadId>\n';
    xml += '\t<body>' + message.body + '</body>\n';
    xml += '\t<delivery>' + message.delivery + '</delivery>\n';
    xml += '\t<read>' + message.read + '</read>\n';
    xml += '\t<receiver>' + message.receiver + '</receiver>\n';
    xml += '\t<sender>' + message.sender + '</sender>\n';
    xml += '\t<timestamp>' + message.timestamp + '</timestamp>\n';
    xml += '\t<messageClass>' + message.messageClass + '</messageClass>\n';
    xml += '</message>\n';

    return xml;
  };

  /**
   * Export messages in output file (sdcard/backup-messages.xml)
   */
  this.ExportMessages = function(foundSmsCount) {
    
    alert(foundSmsCount + " messages found.\n Start exporting...");
    var oMyBlob = new Blob(messages, { "type" : "text\/xml" }); // the blob

    var sdcard = navigator.getDeviceStorage("sdcard");
    var request = sdcard.addNamed(oMyBlob, "backup-messages.xml");

    request.onsuccess = function() {
      alert('Messages successfully wrote on the sdcard storage area in backup-messages.xml');
    }

    // An error typically occur if a file with the same name already exist
    request.onerror = function() {
      alert('Unable to write the file backup-messages.xml: ' + this.error);
    }
    
    return 0;

  };


  //-------------------------------------------------------------------------------------
  // RESTORE MESSAGES
  //-------------------------------------------------------------------------------------
  
  /**
   * Import messages from input file (sdcard/backup-messages.xml)
   */ 
  this.RestoreMessages = function() {
    
  }
  

 }

window.addEventListener('DOMContentLoaded', function() {
  var backuper = new MessagesBackupRestoreApp();
});