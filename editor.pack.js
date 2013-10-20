/*function initAce(callback,data){
	data=data||{};
	addScript({src:'lib/ace-min-noconflict/ace.js'},function(){
		var T=ace.edit('eCode'),s=T.getSession();
		T.setTheme('ace/theme/github');
		T.setValueAndFocus=function(v){
			T.setValue(v);T.focus();T.gotoLine(0,0);
		};
		s.setMode('ace/mode/javascript');
		s.setUseSoftTabs(false);
		s.setUseWrapMode(true);
		s.setUseWorker(true);
		T.clearHistory=s.getUndoManager().reset;
		if(data.onchange) s.on('change',data.onchange);
		if(data.save) T.commands.addCommand({
			name:'Save',
			bindKey:{win:'Ctrl-S',mac:'Command-S'},
			exec:data.save,
			readOnly:false,
		});
		if(data.exit) T.commands.addCommand({
			name:'Exit',
			bindKey:{win:'Esc'},
			exec:data.exit,
			readOnly:true,
		});
		if(data.readonly) T.setReadOnly(data.readonly);
		callback(T);
	});
}*/

function initCodeMirror(callback,data){
	data=data||{};
	addCSS({href:'lib/CodeMirror.css'});
	addScript({src:'lib/CodeMirror.js'},function(){
		CodeMirror.keyMap.vm={'fallthrough':'default'};
		if(data.save) {
			CodeMirror.keyMap.vm['Ctrl-S']='save';
			CodeMirror.commands.save=data.save;
		}
		if(data.exit) {
			CodeMirror.keyMap.vm['Esc']='exit';
			CodeMirror.commands.exit=data.exit;
		}
		var T=CodeMirror($('eCode'),{
			continueComments:true,
			matchBrackets:true,
			autoCloseBrackets:true,
			highlightSelectionMatches:true,
			lineNumbers:true,
			mode:'javascript',
			lineWrapping:true,
			indentUnit:4,
			indentWithTabs:true,
			keyMap:'vm',
			styleActiveLine:true,
			foldGutter:true,
			gutters:['CodeMirror-linenumbers','CodeMirror-foldgutter'],
		});
		T.clearHistory=function(){T.getDoc().clearHistory();};
		T.setValueAndFocus=function(v){T.setValue(v);T.focus();};
		T.getWrapperElement().setAttribute('style','position:absolute;height:100%;width:100%;');
		if(data.onchange) T.on('change',data.onchange);
		if(data.readonly) T.setOption('readOnly',data.readonly);
		callback(T);
	});
}

var initEditor=initCodeMirror;
