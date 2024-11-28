import * as vscode from 'vscode';

export const getOpenFilePaths = () => {
    const openFilePaths = vscode.window.tabGroups.all.flatMap<vscode.Uri, vscode.TabGroup>(({ tabs }) => {
        const tabUris = tabs.map((tab) => {
            if (tab.input instanceof vscode.TabInputText) {
                return tab.input.uri;
            }
            return null;
        });
        console.log("tabUris", tabUris);
        const filteredTabUris = tabUris.filter(uri => uri !== null );
        const filteredFileUris = filteredTabUris.filter(uri => uri.scheme === 'file');
        console.log("filteredFileUris", filteredFileUris);
        return filteredFileUris;
    });
    return openFilePaths;
};