import * as vscode from 'vscode';
import showSummaryFileCommand from './commands/show-summary-file';
import { FILE_SCHEMA } from './utils/constants';
import { SummaryFileProvider } from './providers/file-provider';
import createSummaryFileCommand from './commands/create-summary-file';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "bridgeit-helper" is now active!');

	const summaryFileProvider = new SummaryFileProvider();

	// Register the commands
	const showSummaryFile = vscode.commands.registerCommand('bridgeit-helper.show-summary-file', showSummaryFileCommand);
	const createSummaryFile = vscode.commands.registerCommand('bridgeit-helper.create-summary-file', createSummaryFileCommand);


	// Register the file system provider
	const documentProvider = vscode.workspace.registerTextDocumentContentProvider(FILE_SCHEMA, summaryFileProvider);


	context.subscriptions.push(
		summaryFileProvider,
		showSummaryFile,
		createSummaryFile,
		documentProvider
	);

}

export function deactivate() {}
