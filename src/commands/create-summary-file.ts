import * as vscode from "vscode";
import { getOpenFilePaths } from "../utils/open-files";
import { SummaryFileProvider } from "../providers/file-provider";
import { FILE_TYPE_FORMAT } from "../utils/constants";

const createSummaryFileCommand = async () => {
    const openFilePaths = getOpenFilePaths();
    const format = await vscode.window.showQuickPick(Object.values(FILE_TYPE_FORMAT));
    const format_extension = format === FILE_TYPE_FORMAT.MARKDOWN ? 'md' : 'txt';
    let summaryContent;
    if (format === FILE_TYPE_FORMAT.MARKDOWN) {
        summaryContent = await SummaryFileProvider.getSummaryFileMarkdownContent(openFilePaths);
    }
    else {
        summaryContent = await SummaryFileProvider.getSummaryFileContent(openFilePaths);
    }
    console.log(summaryContent.length);
    const workspaceFolder = vscode.workspace.workspaceFolders?.at(0)?.uri.fsPath;
    const summaryUri = vscode.Uri.file(`${workspaceFolder}/.bridgeit/summary.${format_extension}`);
    await vscode.workspace.fs.createDirectory(vscode.Uri.file(`${workspaceFolder}/.bridgeit`));
    await vscode.workspace.fs.writeFile(summaryUri, Buffer.from(summaryContent));
    const command = await vscode.window.showInformationMessage(`Summary file is created in in ${summaryUri.fsPath}`, 'Open File');
    if (command === 'Open File') {
        await vscode.window.showTextDocument(summaryUri);
    }
};

export default createSummaryFileCommand;