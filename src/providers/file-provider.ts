import * as vscode from 'vscode';
import { FILE_SCHEMA, FILE_TYPE } from '../utils/constants';

export class SummaryFileProvider implements vscode.TextDocumentContentProvider{

    static scheme = FILE_SCHEMA;
    static seq = 0;

    dispose = () => {
        console.log("Disposing SummaryFileProvider");
    };

    provideTextDocumentContent = async (uri: vscode.Uri) => {
        const openFilesPaths = JSON.parse(uri.query) as vscode.Uri[];
        return await SummaryFileProvider.getSummaryFileContent(openFilesPaths);
    };

    static getSummaryFileMarkdownContent = async (sources: vscode.Uri[]) => {
        let content = '';
        for (const filePath of sources) {
            const document = await vscode.workspace.openTextDocument(filePath);
            const fileContent = document.getText(new vscode.Range(0, 0, document.lineCount, 0));
            content += `path: \`${filePath.fsPath}\``;
            content += '\n\n';
            content += `\`\`\`${document.languageId}\n${fileContent}\n\`\`\``;
            content += '\n\n\n\n\n';
        }
        return content;
    };

    static getSummaryFileContent = async (sources: vscode.Uri[]) => {
        let content = '';
        for (const filePath of sources) {
            const document = await vscode.workspace.openTextDocument(filePath);
            const fileContent = document.getText(new vscode.Range(0, 0, document.lineCount, 0));
            content += `path: ${filePath.fsPath}`;
            content += '\n\n';
            content += fileContent;
            content += '\n\n\n\n\n';
        }
        return content;
    };



    

    static encodeUri = (type: FILE_TYPE, sources: vscode.Uri[]) => {
        const sourcesJsonQuery = JSON.stringify(sources);
        return vscode.Uri.parse(`${SummaryFileProvider.scheme}:${type}?${sourcesJsonQuery}#${SummaryFileProvider.seq++}`);
    };
}