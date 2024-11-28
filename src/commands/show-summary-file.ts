import * as vscode from 'vscode';
import { FILE_TYPE } from '../utils/constants';
import { SummaryFileProvider } from '../providers/file-provider';
import { getOpenFilePaths } from '../utils/open-files';


const showSummaryFileCommand = async () => {
    const openFilePaths = getOpenFilePaths();
    const uri = SummaryFileProvider.encodeUri(FILE_TYPE.SUMMARY, openFilePaths);
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);
};

export default showSummaryFileCommand;