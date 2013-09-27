SMSBackupRestore
================

SMS Backup and Restore for Firefox OS

Create backup-messages.xml in your SD card.

Each messages are store as xml regarding the scheme below :

<message>

	<type>sms</type>
	<id>1</id>
	<threadId >1</threadId>
	<body>Test </body>
	<delivery>received</delivery>
	<read>true</read>
	<receiver>xxxxxxxxxx</receiver>
	<sender>xxxxxxxxxx</sender>
	<timestamp>Tue Jul 23 2013 11:54:09 GMT+0200 (CEST)</timestamp>
	<messageClass>normal</messageClass>
	
</message>


Restore not implemented yet.

