// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FilterProvider } from './filterprovider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "logexpert" is now active!');

	// Create a new instance of the FilterProvider
	const filterProvider = new FilterProvider();
	vscode.window.createTreeView("logexpert-filters", { "treeDataProvider": filterProvider });


	let disposable = vscode.commands.registerCommand('logexpert.OpenFile', async () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			vscode.window.showWarningMessage('No opened file');
			return;
		}

		const document = activeEditor.document;

		const options: vscode.TextDocumentShowOptions = {
			preview: false,
			viewColumn: vscode.ViewColumn.Active,
			selection: activeEditor.selection,
			preserveFocus: true
		};

		const uri = document.uri;
		vscode.workspace.openTextDocument(uri).then((doc) => {
			vscode.window.showTextDocument(doc, options);
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
